import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open WhatsApp contact options"
      className="group fixed bottom-24 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#25D366]/35 bg-[#0f1410]/90 text-[#25D366] shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#25D366]/70 hover:bg-[#132016] hover:text-[#3dff8a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] active:scale-95 sm:bottom-28 sm:right-5"
    >
      <FaWhatsapp
        size={24}
        className="transition-transform duration-200 group-hover:scale-105"
        aria-hidden="true"
      />
    </button>
  );
}
