import { useState, useEffect } from "react"

const MIN_VISIBLE_MS = 650
const FADE_MS = 450

const PreLoader = () => {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    let fadeTimer
    let hideTimer
    const started = Date.now()

    const dismiss = () => {
      const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - started))
      fadeTimer = setTimeout(() => setFadeOut(true), remaining)
      hideTimer = setTimeout(() => setVisible(false), remaining + FADE_MS)
    }

    if (document.readyState === "complete") {
      dismiss()
    } else {
      window.addEventListener("load", dismiss)
    }

    return () => {
      window.removeEventListener("load", dismiss)
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-[#040508] transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <span className="h-9 w-9 rounded-full border border-white/10 border-t-white/65 animate-spin [animation-duration:800ms]" />
    </div>
  )
}

export default PreLoader
