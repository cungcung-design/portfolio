import { FaWhatsapp } from "react-icons/fa";
import GlassModal from "../GlassModal/GlassModal";
import { WHATSAPP_MESSAGE, WHATSAPP_URL } from "../../whatsapp";

export default function WhatsAppModal({ isOpen, onClose }) {
  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title="WhatsApp" labelledBy="whatsapp-modal-title">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#25D366]/35 bg-[#25D366]/10 text-[#25D366]">
          <FaWhatsapp size={28} aria-hidden="true" />
        </div>

        <h3 className="font-display mb-3 text-lg font-semibold tracking-[-0.02em] text-white">Chat with Cruz</h3>

        <p className="text-body mb-6 max-w-sm text-zinc-300">
          &ldquo;{WHATSAPP_MESSAGE}&rdquo;
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open WhatsApp chat with Cruz"
          className="text-ui inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/15 px-6 py-3 text-sm font-semibold text-[#9dffc0] transition-colors hover:border-[#25D366]/70 hover:bg-[#25D366]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] active:scale-[0.98]"
        >
          <FaWhatsapp size={18} aria-hidden="true" />
          Open WhatsApp →
        </a>
      </div>
    </GlassModal>
  );
}
