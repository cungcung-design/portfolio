import {
  readJsonBody,
  sendContactEmail,
  validateContactPayload,
} from "./_lib/contactMail.js";

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;
const hits = new Map();

function applyCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
}

function clientKey(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

function isRateLimited(key) {
  const now = Date.now();
  const bucket = hits.get(key) || [];
  const recent = bucket.filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > RATE_MAX;
}

export default async function handler(req, res) {
  applyCors(res);

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST, OPTIONS");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: "Method not allowed." }));
    return;
  }

  if (isRateLimited(clientKey(req))) {
    res.statusCode = 429;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: "Too many requests. Please wait a moment and try again." }));
    return;
  }

  try {
    const body = await readJsonBody(req);

    // Honeypot
    if (String(body?._honey || body?.botcheck || "").trim()) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: true }));
      return;
    }

    const validated = validateContactPayload(body);
    if (!validated.ok) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: false, error: validated.error }));
      return;
    }

    const result = await sendContactEmail({
      ...validated.data,
      env: process.env,
    });

    if (!result.ok) {
      res.statusCode = result.status || 502;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          ok: false,
          error:
            result.status === 503
              ? "Contact form is temporarily unavailable. Please try WhatsApp or email again later."
              : "Could not send your message. Please try again or use WhatsApp.",
        })
      );
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: true, id: result.id }));
  } catch {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        ok: false,
        error: "Could not send your message. Please try again or use WhatsApp.",
      })
    );
  }
}
