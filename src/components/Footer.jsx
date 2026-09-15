import { useEffect, useState } from "react";
import {
  VscHome,
  VscAccount,
  VscArchive,
  VscMail,
  VscGithub,
} from "react-icons/vsc";
import { FaLinkedinIn } from "react-icons/fa";
import Dock from "./Dock";

const scrollToId = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const openExternal = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const items = [
  { icon: <VscHome size={18} />, label: "Home", onClick: () => scrollToId("home") },
  { icon: <VscAccount size={18} />, label: "About", onClick: () => scrollToId("about") },
  { icon: <VscArchive size={18} />, label: "Projects", onClick: () => scrollToId("project") },
  { icon: <VscMail size={18} />, label: "Contact", onClick: () => scrollToId("contact") },
  {
    icon: <VscGithub size={18} />,
    label: "GitHub",
    onClick: () => openExternal("https://github.com/cungcung-design"),
  },
  {
    icon: <FaLinkedinIn size={18} />,
    label: "LinkedIn",
    onClick: () => openExternal("https://www.linkedin.com/in/ngun-cung-7a1795413"),
  },
];

const Footer = () => {
  const [compact, setCompact] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const onResize = () => setCompact(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div className="h-20 md:h-24" aria-hidden="true" />
      <Dock
        items={items}
        panelHeight={compact ? 56 : 68}
        baseItemSize={compact ? 40 : 50}
        magnification={compact ? 52 : 70}
      />
    </>
  );
};

export default Footer;
