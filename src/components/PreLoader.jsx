import { useState, useEffect } from "react"

const FADE_MS = 280

const PreLoader = () => {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    let hideTimer
    let frameTwo = 0

    const frameOne = requestAnimationFrame(() => {
      frameTwo = requestAnimationFrame(() => {
        setFadeOut(true)
        hideTimer = setTimeout(() => setVisible(false), FADE_MS)
      })
    })

    return () => {
      cancelAnimationFrame(frameOne)
      cancelAnimationFrame(frameTwo)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-[#040508] transition-opacity duration-300 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <span className="h-9 w-9 rounded-full border border-white/10 border-t-white/65 animate-spin [animation-duration:800ms]" />
    </div>
  )
}

export default PreLoader
