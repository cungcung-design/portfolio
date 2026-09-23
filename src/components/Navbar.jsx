import { useState, useEffect } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#project", label: "Project" },
  { href: "#contact", label: "Contact" },
];

const Navbar = ({ hidden = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [menuOpen]);

  if (hidden) return null;

  return (
    <nav className="navbar relative z-50 w-full">
      <div className="mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6">
        <div className="relative mx-auto flex w-full min-w-0 items-center justify-between py-4 md:py-5 lg:grid lg:max-w-6xl lg:grid-cols-2 lg:items-center lg:gap-6 lg:py-3 xl:gap-8">
          <div className="logo min-w-0">
            <a
              href="#home"
              className="font-display inline-flex items-center p-1 text-2xl font-semibold tracking-[-0.02em] text-[#8B5CF6] md:text-3xl lg:text-[1.75rem]"
            >
              Portofolio
            </a>
          </div>

          {/* Desktop menu — same column math/offset as the hero ProfileCard */}
          <div className="hidden min-w-0 lg:flex lg:justify-center lg:translate-x-10 xl:translate-x-12">
            <div className="flex w-full max-w-[400px] justify-end">
              <ul className="flex items-center gap-6">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-ui text-base font-medium text-white/90 transition-all duration-300 hover:text-[#A78BFA]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-white transition-transform duration-200 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-white transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] block h-0.5 w-5 rounded-full bg-white transition-transform duration-200 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>

          {menuOpen && (
            <button
              type="button"
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
          )}

          <div
            id="mobile-nav"
            className={`lg:hidden absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md transition-all duration-200 ${
              menuOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
            }`}
          >
            <ul className="flex flex-col px-2 py-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-ui flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-white/90"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
