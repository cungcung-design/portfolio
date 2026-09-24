/**
 * Shared contact-mail helpers for Vercel `/api/contact` and Vite dev middleware.
 * Secrets stay server-side only (never VITE_*).
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(body) {
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (name.length < 2 || name.length > 100) {
    return { ok: false, error: "Please enter your name (2–100 characters)." };
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 120) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (message.length < 10 || message.length > 2000) {
    return { ok: false, error: "Please write a message between 10 and 2000 characters." };
  }

  return { ok: true, data: { name, email, message } };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailContent({ name, email, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  return {
    subject: `Portfolio contact from ${name}`,
    text: `New portfolio contact message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
    html: `
      <div style="font-family:Geist,Segoe UI,Arial,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 12px">New portfolio contact</h2>
        <p style="margin:0 0 8px"><strong>Name:</strong> ${safeName}</p>
        <p style="margin:0 0 8px"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p style="margin:16px 0 8px"><strong>Message:</strong></p>
        <p style="margin:0;padding:12px;border-radius:8px;background:#f4f4f5">${safeMessage}</p>
      </div>
    `,
  };
}

/**
 * Sends via Resend. Returns { ok, id } or { ok:false, error, status }.
 */
export async function sendContactEmail({ name, email, message, env = process.env }) {
  const apiKey = String(env.RESEND_API_KEY || "").trim();
  const to = String(env.CONTACT_TO_EMAIL || "").trim();
  const from =
    String(env.CONTACT_FROM_EMAIL || "").trim() || "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      error: "Email service is not configured (missing RESEND_API_KEY).",
    };
  }
  if (!to) {
    return {
      ok: false,
      status: 503,
      error: "Email service is not configured (missing CONTACT_TO_EMAIL).",
    };
  }

  const content = buildEmailContent({ name, email, message });

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: content.subject,
      text: content.text,
      html: content.html,
    }),
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const apiMessage =
      typeof payload?.message === "string"
        ? payload.message
        : Array.isArray(payload?.message)
          ? payload.message.join(", ")
          : null;
    return {
      ok: false,
      status: response.status >= 400 && response.status < 600 ? response.status : 502,
      error: apiMessage || "Email provider rejected the request.",
    };
  }

  const id = typeof payload?.id === "string" ? payload.id : null;
  if (!id) {
    return {
      ok: false,
      status: 502,
      error: "Email provider did not confirm delivery.",
    };
  }

  return { ok: true, id };
}

export async function readJsonBody(req) {
  if (req.body != null) {
    if (typeof req.body === "string") {
      const trimmed = req.body.trim();
      return trimmed ? JSON.parse(trimmed) : {};
    }
    if (typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
      return req.body;
    }
  }

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};
  return JSON.parse(raw);
}
