#!/usr/bin/env node
/**
 * BitScoreCoWork — Bitsight MCP server. An asset by BitScore Cybertech LLP (bitscore.in).
 *
 * Wraps the Bitsight Security Ratings REST API (https://api.bitsighttech.com/ratings)
 * as MCP tools so Claude can look up company ratings, findings, portfolio data,
 * attack-surface assets, alerts, and rating-change insights.
 *
 * Zero runtime dependencies by design: implements the MCP stdio JSON-RPC protocol
 * directly with only Node.js built-ins, so the plugin ships without a bundled
 * node_modules tree.
 *
 * Auth: Bitsight uses HTTP Basic Auth with the API token as the username and an
 * empty password.
 *
 * By default this server holds NO token at startup and asks for one every session:
 * the user provides their token through the `bitsight_set_token` tool, and it is
 * kept ONLY in this process's memory for the life of the session. Because the MCP
 * server is (re)started each time Claude starts, the token is required again every
 * time — it is never written to disk, logged, or echoed back in any tool result.
 *
 * Optional unattended mode: if BITSIGHT_ALLOW_ENV_TOKEN is set to "1"/"true" AND
 * BITSIGHT_API_TOKEN is present in the environment, that env token is used as a
 * fallback so scheduled/headless runs don't need the interactive prompt.
 *
 * Data sensitivity: Bitsight data is confidential per Bitsight's Terms of Service
 * and often concerns third parties' security posture. Do not forward raw findings
 * or ratings outside the current conversation/report without the user's intent,
 * and never persist API tokens to disk or logs.
 */

const BASE_URL = "https://api.bitsighttech.com/ratings";

// In-memory session token — set at runtime via the bitsight_set_token tool.
// Never persisted; cleared when the process exits (i.e. every time Claude restarts).
let sessionToken = null;

// Optional escape hatch for unattended/scheduled runs only.
const ALLOW_ENV_TOKEN =
  process.env.BITSIGHT_ALLOW_ENV_TOKEN === "1" || process.env.BITSIGHT_ALLOW_ENV_TOKEN === "true";

function currentToken() {
  if (sessionToken) return sessionToken;
  if (ALLOW_ENV_TOKEN && process.env.BITSIGHT_API_TOKEN) return process.env.BITSIGHT_API_TOKEN;
  return null;
}

function basicFor(token) {
  return "Basic " + Buffer.from(`${token}:`).toString("base64");
}

function authHeader() {
  const token = currentToken();
  if (!token) {
    // Sentinel — the tools/call layer turns this into a "prompt the user" message.
    const e = new Error("NO_TOKEN");
    e.code = "NO_TOKEN";
    throw e;
  }
  return basicFor(token);
}

// Map raw HTTP status codes to the standard, user-facing guidance the
// BitScoreCoWork skills expect (401/403 -> key, 404 -> id, 429 -> backoff).
function classifyStatus(status) {
  if (status === 401 || status === 403) {
    return "Authentication failed (invalid, expired, or under-privileged Bitsight API token). Ask the user to paste a valid token and call bitsight_set_token again.";
  }
  if (status === 404) {
    return "Not found — the GUID / portfolio ID does not exist or is not in this token's portfolio.";
  }
  if (status === 429) {
    return "Rate limited by Bitsight (HTTP 429). Back off and retry after a short delay.";
  }
  return null;
}

async function bitsightGet(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url, {
    headers: {
      Authorization: authHeader(),
      Accept: "application/json",
    },
  });

  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = text;
  }

  if (!res.ok) {
    const friendly = classifyStatus(res.status);
    const detail = typeof body === "string" ? body : JSON.stringify(body);
    if (friendly) {
      throw new Error(`${friendly} (HTTP ${res.status} for ${url.pathname})`);
    }
    throw new Error(`Bitsight API error ${res.status} for ${url.pathname}: ${detail}`);
  }

  return body;
}

function textResult(data) {
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
}

function errorResult(message) {
  return { content: [{ type: "text", text: `Error: ${message}` }], isError: true };
}

// ---- Tool definitions -------------------------------------------------

const TOOLS = [
  {
    name: "bitsight_auth_status",
    description:
      "Check whether a Bitsight API token is currently set for this session. Call this FIRST, at the start of any BitScoreCoWork workflow: if it returns authenticated=false, ask the user to paste their Bitsight API token and then call bitsight_set_token before pulling any data. Never reveals the token itself.",
    inputSchema: { type: "object", properties: {} },
    handler: async () => {
      const has = !!currentToken();
      return textResult({
        authenticated: has,
        source: sessionToken ? "session" : has ? "environment" : "none",
        message: has
          ? "A Bitsight API token is set for this session."
          : "No Bitsight API token is set. Ask the user to paste their Bitsight API token, then call bitsight_set_token with it. The token is requested again every time the plugin starts.",
      });
    },
  },
  {
    name: "bitsight_set_token",
    description:
      "Store the user's Bitsight API token in memory FOR THIS SESSION ONLY (never written to disk or logs). The server verifies the token with a lightweight Bitsight call before storing it; an invalid token is rejected and not stored. Call this after the user pastes their token in response to an authentication prompt. Do NOT echo the token back to the user in your reply.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "The Bitsight API token the user provided. Held in memory only; discarded when the session ends.",
        },
      },
      required: ["token"],
    },
    handler: async ({ token }) => {
      if (!token || typeof token !== "string" || !token.trim()) {
        return errorResult("No token provided. Ask the user to paste their Bitsight API token and pass it as the `token` argument.");
      }
      const candidate = token.trim();
      try {
        const res = await fetch(`${BASE_URL}/v2/portfolio?limit=1`, {
          headers: { Authorization: basicFor(candidate), Accept: "application/json" },
        });
        if (res.status === 401 || res.status === 403) {
          return errorResult(
            `That Bitsight API token was rejected (HTTP ${res.status}) and was NOT stored. Ask the user to re-check the token and paste it again.`
          );
        }
        // Store on success; also store on a non-auth error (token may be valid but
        // this probe endpoint restricted) but flag it so the user knows.
        sessionToken = candidate;
        if (!res.ok) {
          return textResult({
            status: "stored_with_warning",
            message: `Token stored in memory for this session, but the verification call returned HTTP ${res.status}. Data calls may still work; if they fail with an auth error, re-check the token.`,
          });
        }
        return textResult({
          status: "ok",
          message:
            "Bitsight API token accepted and stored in memory for this session only. It will be required again the next time the plugin starts.",
        });
      } catch (err) {
        return errorResult(
          `Could not verify the token due to a network error (${err?.message || err}). The token was NOT stored — ask the user to retry.`
        );
      }
    },
  },
  {
    name: "bitsight_clear_token",
    description:
      "Forget the Bitsight API token held for this session (removes it from memory). Use if the user asks to log out, switch tokens, or clear their credential mid-session.",
    inputSchema: { type: "object", properties: {} },
    handler: async () => {
      sessionToken = null;
      return textResult({ status: "cleared", message: "Session Bitsight API token cleared from memory." });
    },
  },
  {
    name: "bitsight_search_portfolio_company",
    description:
      "Search for a company already monitored in the Bitsight portfolio by name or domain. Returns each match's GUID, current rating, and industry. Use this first to resolve a company name to the GUID needed by the other Bitsight tools. Only searches companies already in the portfolio (vendors, subsidiaries, or 'my company').",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Company name or domain to search for, e.g. 'Acme Corp' or 'acme.com'." },
        limit: { type: "integer", minimum: 1, maximum: 50, description: "Maximum number of results to return (default 10)." },
      },
      required: ["query"],
    },
    handler: async ({ query, limit }) => {
      const data = await bitsightGet("/v2/portfolio", {
        q: query,
        limit: limit ?? 10,
        fields: "guid,name,rating,rating_date,industry,primary_domain,tier_name",
      });
      const results = (data.results || []).map((c) => ({
        guid: c.guid,
        name: c.name,
        primary_domain: c.primary_domain,
        rating: c.rating,
        rating_date: c.rating_date,
        industry: c.industry?.name,
        tier_name: c.tier_name,
      }));
      return textResult({ count: data.count, results });
    },
  },
  {
    name: "bitsight_get_company_details",
    description:
      "Get full Bitsight details for a company by GUID: current security rating, 1 year of daily rating history, risk vector grades (the categories that make up the rating), industry, and subscription info. Optionally include the company's industry average rating and percentile rank. Backs the MyCompany skill (GET /ratings/v1/companies/{company_guid}).",
    inputSchema: {
      type: "object",
      properties: {
        company_guid: {
          type: "string",
          description: "The Bitsight company GUID (entity_guid). Use bitsight_search_portfolio_company to find it.",
        },
        include_industry_comparison: {
          type: "boolean",
          description: "If true, also fetch the industry average rating and this company's industry percentile.",
        },
      },
      required: ["company_guid"],
    },
    handler: async ({ company_guid, include_industry_comparison }) => {
      // Always fetch the full company object (current_rating, ratings history,
      // rating_details risk vectors, rating_industry_median, etc.). The Bitsight
      // `fields` param RESTRICTS the response to only the listed fields, so it
      // cannot be used to *add* industry_average/percentile — that requires a
      // second, targeted call which we then merge in.
      const path = `/v1/companies/${encodeURIComponent(company_guid)}`;
      const data = await bitsightGet(path);
      if (include_industry_comparison) {
        try {
          const cmp = await bitsightGet(path, { fields: "industry_average,industry_percentile" });
          if (cmp && typeof cmp === "object") {
            if ("industry_average" in cmp) data.industry_average = cmp.industry_average;
            if ("industry_percentile" in cmp) data.industry_percentile = cmp.industry_percentile;
          }
        } catch {
          // If the comparison call fails, still return the full company object
          // rather than failing the whole request.
        }
      }
      return textResult(data);
    },
  },
  {
    name: "bitsight_get_findings_summary",
    description:
      "Get a summarized count of a company's open security findings (e.g. exposed services, patching cadence issues, insecure systems), broken down by risk vector and severity. Use this to gauge how many and how severe a vendor's issues are without pulling every individual finding.",
    inputSchema: {
      type: "object",
      properties: {
        company_guid: { type: "string", description: "The Bitsight company GUID." },
      },
      required: ["company_guid"],
    },
    handler: async ({ company_guid }) => {
      const data = await bitsightGet(`/v1/companies/${encodeURIComponent(company_guid)}/findings/summaries`, {
        expand: "findings_severity_counts",
      });
      return textResult(data);
    },
  },
  {
    name: "bitsight_get_findings",
    description:
      "List a company's individual open Bitsight findings — the observable attack-surface issues that make up the rating (exposed/insecure services, unpatched software, expired or weak certificates, open ports, misconfigurations, botnet/malware signals). Each finding maps to a Bitsight risk vector and severity and usually names the affected asset (host/IP/domain) and evidence. This is the primary data source for the vapt-plan and security-test-plan skills. Read-only — Bitsight observes these externally; it does not scan or exploit anything.",
    inputSchema: {
      type: "object",
      properties: {
        company_guid: { type: "string", description: "The Bitsight company GUID." },
        risk_vector: {
          type: "string",
          description:
            "Filter to a single Bitsight risk vector slug, e.g. 'open_ports', 'patching_cadence', 'ssl_configurations', 'web_application_headers', 'botnet_infections'.",
        },
        severity_gte: {
          type: "number",
          description: "Only include findings at or above this severity (Bitsight severity is roughly 1=minor to 10=severe).",
        },
        affects_rating: {
          type: "boolean",
          description: "If true, only return findings that currently affect the rating.",
        },
        limit: { type: "integer", minimum: 1, maximum: 100, description: "Max results per page (default 100)." },
        offset: { type: "integer", description: "Pagination offset for subsequent pages." },
      },
      required: ["company_guid"],
    },
    handler: async ({ company_guid, risk_vector, severity_gte, affects_rating, limit, offset }) => {
      const data = await bitsightGet(`/v1/companies/${encodeURIComponent(company_guid)}/findings`, {
        risk_vector: risk_vector,
        severity_gte: severity_gte,
        affects_rating: affects_rating === undefined ? undefined : affects_rating ? "true" : "false",
        limit: limit ?? 100,
        offset,
        expand: "attributed_companies",
      });
      return textResult(data);
    },
  },
  {
    name: "bitsight_get_assets",
    description:
      "List the internet-facing assets Bitsight observes for a company (domains, subdomains, IP ranges) with their importance/criticality, running services, and country. Use this to understand the externally visible attack surface when scoping a vulnerability assessment or security-test plan. Each asset carries an `importance_category` (low/medium/high/critical); the optional `importance` filter is applied client-side to the returned page (the Bitsight assets endpoint does not filter by importance server-side, so filter across pages by paging with limit/offset). Read-only observation data — it does not represent any active scan performed by this plugin.",
    inputSchema: {
      type: "object",
      properties: {
        company_guid: { type: "string", description: "The Bitsight company GUID." },
        importance: {
          type: "string",
          enum: ["low", "medium", "high", "critical"],
          description:
            "Keep only assets whose importance_category matches this value. Applied client-side to the current page of results (not a server-side filter), so it narrows what this call returns from the fetched page.",
        },
        limit: { type: "integer", minimum: 1, maximum: 100, description: "Max results per page (default 100)." },
        offset: { type: "integer", description: "Pagination offset for subsequent pages." },
      },
      required: ["company_guid"],
    },
    handler: async ({ company_guid, importance, limit, offset }) => {
      const data = await bitsightGet(`/v1/companies/${encodeURIComponent(company_guid)}/assets`, {
        limit: limit ?? 100,
        offset,
      });
      // The assets endpoint has no server-side importance filter, so honor the
      // `importance` argument by filtering the returned page client-side. This
      // is transparent: the tool never claims a filtered count it didn't apply.
      if (importance && data && Array.isArray(data.results)) {
        const filtered = data.results.filter((a) => a.importance_category === importance);
        return textResult({
          ...data,
          results: filtered,
          filtered_by_importance: importance,
          returned_after_importance_filter: filtered.length,
          note: "importance filter applied client-side to this page only; page through with offset to cover all assets.",
        });
      }
      return textResult(data);
    },
  },
  {
    name: "bitsight_get_portfolio",
    description:
      "List companies in the Bitsight portfolio (vendors, subsidiaries, or monitored third parties), optionally filtered by rating range, industry, or tier. Handles pagination via limit/offset. Backs the MyPortfolio skill (GET /ratings/v2/portfolio). Use this for vendor/third-party risk monitoring across many companies at once, e.g. 'which vendors have a rating below 640'.",
    inputSchema: {
      type: "object",
      properties: {
        rating_lt: { type: "integer", description: "Only include companies with a rating below this value (250-900 scale)." },
        rating_gte: { type: "integer", description: "Only include companies with a rating at or above this value." },
        tier: { type: "string", description: "Filter by tier GUID (use bitsight_get_portfolio without this filter first to discover tiers)." },
        industry_slug: { type: "string", description: "Filter by industry slug name, e.g. 'technology'." },
        limit: { type: "integer", minimum: 1, maximum: 100, description: "Max results per page (default 100)." },
        offset: { type: "integer", description: "Pagination offset for subsequent pages." },
      },
    },
    handler: async ({ rating_lt, rating_gte, tier, industry_slug, limit, offset }) => {
      const data = await bitsightGet("/v2/portfolio", {
        rating_lt,
        rating_gte,
        tier,
        "industry.slug": industry_slug,
        limit: limit ?? 100,
        offset,
        fields: "guid,name,rating,rating_date,industry,tier_name,primary_domain",
      });
      return textResult(data);
    },
  },
  {
    name: "bitsight_get_alerts",
    description:
      "Get recent Bitsight alerts across the portfolio: rating drops, new findings, and other risk events, with severity (INFO/WARN/DANGER/MATERIAL). Use this to check what changed since a previous review, e.g. for periodic vendor monitoring.",
    inputSchema: {
      type: "object",
      properties: {
        company_guid: { type: "string", description: "Filter alerts to a single company GUID." },
        severity: { type: "string", enum: ["INFO", "WARN", "DANGER", "MATERIAL"], description: "Filter by alert severity." },
        alert_date_gte: { type: "string", description: "Only include alerts on or after this date, YYYY-MM-DD." },
        alert_date_lte: { type: "string", description: "Only include alerts on or before this date, YYYY-MM-DD." },
        limit: { type: "integer", minimum: 1, maximum: 100, description: "Max results (default 100)." },
      },
    },
    handler: async ({ company_guid, severity, alert_date_gte, alert_date_lte, limit }) => {
      const data = await bitsightGet("/v2/alerts", {
        company_guid,
        severity,
        alert_date_gte,
        alert_date_lte,
        limit: limit ?? 100,
      });
      return textResult(data);
    },
  },
  {
    name: "bitsight_get_rating_change_insights",
    description:
      "Get the explanation behind a significant Bitsight rating change for a company over a date range: which risk vectors drove the change, the before/after grades, and the percentile shift. Use this to explain why a vendor's score moved, for exec reporting.",
    inputSchema: {
      type: "object",
      properties: {
        company_guid: { type: "string", description: "The Bitsight company GUID." },
        start: { type: "string", description: "Start date, YYYY-MM-DD." },
        end: { type: "string", description: "End date, YYYY-MM-DD." },
      },
      required: ["company_guid"],
    },
    handler: async ({ company_guid, start, end }) => {
      const data = await bitsightGet("/v1/insights", { company: company_guid, start, end });
      return textResult(data);
    },
  },
];

const TOOLS_BY_NAME = new Map(TOOLS.map((t) => [t.name, t]));

// ---- Minimal MCP-over-stdio JSON-RPC handling -------------------------

function send(message) {
  process.stdout.write(JSON.stringify(message) + "\n");
}

function sendResult(id, result) {
  if (id === undefined || id === null) return; // notification, no response expected
  send({ jsonrpc: "2.0", id, result });
}

function sendError(id, code, message) {
  if (id === undefined || id === null) return;
  send({ jsonrpc: "2.0", id, error: { code, message } });
}

async function handleRequest(req) {
  const { id, method, params } = req;

  try {
    switch (method) {
      case "initialize":
        sendResult(id, {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: { name: "bitsight", version: "0.1.1" },
        });
        return;

      case "notifications/initialized":
      case "initialized":
        return; // notification, nothing to do

      case "ping":
        sendResult(id, {});
        return;

      case "tools/list":
        sendResult(id, {
          tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })),
        });
        return;

      case "resources/list":
        sendResult(id, { resources: [] });
        return;

      case "prompts/list":
        sendResult(id, { prompts: [] });
        return;

      case "tools/call": {
        const tool = TOOLS_BY_NAME.get(params?.name);
        if (!tool) {
          sendResult(id, errorResult(`Unknown tool: ${params?.name}`));
          return;
        }
        try {
          const result = await tool.handler(params?.arguments || {});
          sendResult(id, result);
        } catch (err) {
          if (err && err.code === "NO_TOKEN") {
            sendResult(
              id,
              errorResult(
                "No Bitsight API token is set for this session. Ask the user to paste their Bitsight API token, then call bitsight_set_token with it before retrying this call. Do not fabricate data."
              )
            );
          } else {
            sendResult(id, errorResult(err?.message || String(err)));
          }
        }
        return;
      }

      default:
        sendError(id, -32601, `Method not found: ${method}`);
    }
  } catch (err) {
    sendError(id, -32603, err?.message || String(err));
  }
}

let buffer = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  let newlineIndex;
  while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, newlineIndex).trim();
    buffer = buffer.slice(newlineIndex + 1);
    if (!line) continue;
    let req;
    try {
      req = JSON.parse(line);
    } catch (err) {
      process.stderr.write(`Failed to parse incoming message: ${err.message}\n`);
      continue;
    }
    handleRequest(req);
  }
});

process.stdin.on("end", () => process.exit(0));
