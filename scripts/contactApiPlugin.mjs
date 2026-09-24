import { validateContactPayload, sendContactEmail } from "../api/_lib/contactMail.js";

/**
 * Local `/api/contact` during `vite` so we can test without `vercel dev`.
 */
export function contactApiPlugin() {
  return {
    name: "contact-api-dev",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url !== "/api/contact" && url !== "/portofolio/api/contact") {
          next();
          return;
        }

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
          res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
          res.end();
          return;
        }

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: false, error: "Method not allowed." }));
          return;
        }

        try {
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const raw = Buffer.concat(chunks).toString("utf8");
          const body = raw ? JSON.parse(raw) : {};

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
      });
    },
  };
}
