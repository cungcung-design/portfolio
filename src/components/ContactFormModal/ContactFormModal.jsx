import { useEffect, useRef, useState } from "react";
import GlassModal from "../GlassModal/GlassModal";

const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL?.trim() || "nguncung65@gmail.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateFields({ name, email, message }) {
  if (name.length < 2) return "Please enter your name (at least 2 characters).";
  if (!EMAIL_PATTERN.test(email)) return "Please enter a valid email address.";
  if (message.length < 10) return "Please write a slightly longer message (at least 10 characters).";
  return null;
}

function isFormSubmitSuccess(payload) {
  if (!payload || typeof payload !== "object") return false;
  const flag = payload.success;
  return flag === true || flag === "true";
}

export default function ContactFormModal({ isOpen, onClose }) {
  const nameRef = useRef(null);
  const submittingRef = useRef(false);
  const [status, setStatus] = useState({ type: "idle" });

  useEffect(() => {
    if (!isOpen) {
      setStatus({ type: "idle" });
      submittingRef.current = false;
      return;
    }
    const timer = window.setTimeout(() => nameRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submittingRef.current || status.type === "sending") return;

    const form = event.currentTarget;
    const raw = new FormData(form);

    // Honeypot — silently accept bots without sending
    if (String(raw.get("_honey") || "").trim()) {
      setStatus({ type: "success" });
      form.reset();
      return;
    }

    const name = String(raw.get("name") || "").trim();
    const email = String(raw.get("email") || "").trim();
    const message = String(raw.get("message") || "").trim();

    const validationError = validateFields({ name, email, message });
    if (validationError) {
      setStatus({ type: "error", message: validationError });
      return;
    }

    submittingRef.current = true;
    setStatus({ type: "sending" });

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: "Portfolio Contact",
          _template: "table",
          _captcha: "false",
          _replyto: email,
        }),
      });

      let payload = null;
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        payload = await response.json();
      } else {
        const text = await response.text();
        try {
          payload = JSON.parse(text);
        } catch {
          payload = { success: false, message: text || "Unexpected response" };
        }
      }

      if (!response.ok || !isFormSubmitSuccess(payload)) {
        const apiMessage =
          typeof payload?.message === "string" && payload.message.trim()
            ? payload.message.trim()
            : null;
        throw new Error(apiMessage || "Failed to send message");
      }

      form.reset();
      setStatus({ type: "success" });
    } catch (error) {
      const detail =
        error instanceof Error && error.message && !error.message.startsWith("Failed to fetch")
          ? error.message
          : "Could not send your message. Please try again or use WhatsApp.";
      setStatus({
        type: "error",
        message: detail,
      });
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title="Contact Me" labelledBy="contact-modal-title">
      <p className="text-body mb-5 text-zinc-300">
        Let&apos;s work together.
        <br />
        I&apos;d love to hear from you.
      </p>

      {status.type === "success" ? (
        <div className="rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-5 text-center">
          <p className="text-ui text-sm font-medium text-[#9dffc0]">
            Message sent. I&apos;ll get back to you soon.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="text-ui mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex w-full min-w-0 flex-col gap-4" noValidate autoComplete="off">
          <input
            type="text"
            name="_honey"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="modal-contact-name" className="text-label text-zinc-400">
              Name
            </label>
            <input
              ref={nameRef}
              id="modal-contact-name"
              type="text"
              name="name"
              placeholder="Your name"
              required
              minLength={2}
              maxLength={100}
              disabled={status.type === "sending"}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[0.9375rem] text-white placeholder-white/40 outline-none transition-colors focus:border-violet-400/60 focus:bg-white/[0.07] disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="modal-contact-email" className="text-label text-zinc-400">
              Email
            </label>
            <input
              id="modal-contact-email"
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              maxLength={120}
              disabled={status.type === "sending"}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[0.9375rem] text-white placeholder-white/40 outline-none transition-colors focus:border-violet-400/60 focus:bg-white/[0.07] disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="modal-contact-message" className="text-label text-zinc-400">
              Message
            </label>
            <textarea
              id="modal-contact-message"
              name="message"
              rows={4}
              placeholder="I'd love to hear from you..."
              required
              minLength={10}
              maxLength={2000}
              disabled={status.type === "sending"}
              className="min-h-28 w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[0.9375rem] leading-relaxed text-white placeholder-white/40 outline-none transition-colors focus:border-violet-400/60 focus:bg-white/[0.07] disabled:opacity-60"
            />
          </div>

          {status.type === "error" && (
            <p className="text-sm text-red-300" role="alert">
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={status.type === "sending"}
            className="text-ui mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status.type === "sending" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </GlassModal>
  );
}
