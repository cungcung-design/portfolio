import { useEffect, useRef, useState } from "react";
import GlassModal from "../GlassModal/GlassModal";

/** Public FormSubmit endpoint — no email password is stored in the app. */
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/nguncung65@gmail.com";

export default function ContactFormModal({ isOpen, onClose }) {
  const nameRef = useRef(null);
  const [status, setStatus] = useState({ type: "idle" });

  useEffect(() => {
    if (!isOpen) {
      setStatus({ type: "idle" });
      return;
    }
    const timer = window.setTimeout(() => nameRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus({ type: "sending" });

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      form.reset();
      setStatus({ type: "success" });
    } catch {
      setStatus({
        type: "error",
        message: "Could not send your message. Please try again or use WhatsApp.",
      });
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
        <form onSubmit={handleSubmit} className="flex w-full min-w-0 flex-col gap-4" autoComplete="off">
          <input type="hidden" name="_subject" value="Portfolio Contact" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
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
