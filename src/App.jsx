import { useState, useCallback, useRef } from 'react'
import { DotLottieReact, setWasmUrl } from '@lottiefiles/dotlottie-react'
import './index.css'

// ── Point the renderer at our locally-hosted WASM (avoids CDN cold-starts) ──
setWasmUrl('/dotlottie-player.wasm')

// ─── Layout constants ─────────────────────────────────────────────────────────
const BTN_W  = 120  // px
const BTN_H  = 52
const MARGIN = 20   // min gap from every viewport edge

function randomViewportPos() {
  const maxX = Math.max(window.innerWidth  - BTN_W  - MARGIN, MARGIN)
  const maxY = Math.max(window.innerHeight - BTN_H  - MARGIN, MARGIN)
  return {
    top:  Math.floor(Math.random() * (maxY - MARGIN) + MARGIN),
    left: Math.floor(Math.random() * (maxX - MARGIN) + MARGIN),
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [accepted, setAccepted] = useState(false)
  const [yesPos,   setYesPos]   = useState(null)   // null = in-flow; obj = fixed
  const yesBtnRef = useRef(null)

  const handleYes = useCallback(() => {
    // little wiggle on the first click via class toggle
    if (yesBtnRef.current) {
      yesBtnRef.current.classList.remove('btn-wiggle')
      void yesBtnRef.current.offsetWidth             // reflow to restart anim
      yesBtnRef.current.classList.add('btn-wiggle')
    }
    setYesPos(randomViewportPos())
  }, [])

  const handleNo = useCallback(() => setAccepted(true), [])

  return (
    <div
      className="relative min-h-dvh w-full flex items-center justify-center overflow-hidden py-8"
      style={{
        background: 'linear-gradient(145deg, #fff1f5 0%, #fce4ec 45%, #f3e5f5 80%, #ede7f6 100%)',
      }}
    >
      {/* ── Animated background blobs ─────────────────────────────────────── */}
      <div
        className="blob-1 pointer-events-none absolute rounded-full"
        style={{
          width: 'clamp(260px, 40vw, 500px)',
          height: 'clamp(260px, 40vw, 500px)',
          top: '-10%', left: '-8%',
          background: 'radial-gradient(circle at 40% 40%, rgba(244,143,177,0.55), transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
      <div
        className="blob-2 pointer-events-none absolute rounded-full"
        style={{
          width: 'clamp(300px, 45vw, 550px)',
          height: 'clamp(300px, 45vw, 550px)',
          bottom: '-12%', right: '-10%',
          background: 'radial-gradient(circle at 60% 60%, rgba(206,147,216,0.50), transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
      <div
        className="blob-3 pointer-events-none absolute rounded-full"
        style={{
          width: 'clamp(160px, 25vw, 320px)',
          height: 'clamp(160px, 25vw, 320px)',
          top: '35%', right: '-5%',
          background: 'radial-gradient(circle at 50% 50%, rgba(240,98,146,0.30), transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 'clamp(120px, 18vw, 240px)',
          height: 'clamp(120px, 18vw, 240px)',
          top: '55%', left: '-3%',
          background: 'radial-gradient(circle at 50% 50%, rgba(171,130,255,0.25), transparent 70%)',
          filter: 'blur(2px)',
        }}
      />

      {/* ════════════════ QUESTION STATE ════════════════ */}
      {!accepted && (
        <div
          className="scale-in relative z-10 w-full flex flex-col items-center px-4"
          style={{ maxWidth: 420 }}
        >
          <div className="glass-card w-full rounded-3xl overflow-hidden">

            {/* ── Card header strip ── */}
            <div
              className="w-full flex items-center justify-center pt-2 pb-1"
              style={{
                background: 'linear-gradient(90deg, rgba(244,143,177,0.18), rgba(206,147,216,0.18))',
                borderBottom: '1px solid rgba(255,255,255,0.6)',
              }}
            >
              <div className="flex gap-1.5 py-2">
                <div className="w-2 h-2 rounded-full" style={{ background: '#fca5a5' }} />
                <div className="w-2 h-2 rounded-full" style={{ background: '#fcd34d' }} />
                <div className="w-2 h-2 rounded-full" style={{ background: '#86efac' }} />
              </div>
            </div>

            {/* ── Card body ── */}
            <div className="flex flex-col items-center gap-5 px-8 pt-6 pb-8">

              {/* sparkle dots */}
              <div className="sparkle sparkle-1" />
              <div className="sparkle sparkle-2" />
              <div className="sparkle sparkle-3" />
              <div className="sparkle sparkle-4" />

              {/* lottie – sad → crying emoji */}
              <div className="heart-pulse">
                <DotLottieReact
                  src="/Sad emoji to Crying emoji.lottie"
                  autoplay
                  loop
                  style={{
                    width:  'clamp(160px, 45vw, 220px)',
                    height: 'clamp(160px, 45vw, 220px)',
                  }}
                />
              </div>

              {/* heading */}
              <div className="flex flex-col items-center gap-1">
                <h1
                  className="shimmer-text font-black tracking-tight leading-tight text-center"
                  style={{ fontSize: 'clamp(1.6rem, 6vw, 2.4rem)' }}
                >
                  Are you still mad?
                </h1>
                <p
                  className="font-bold text-center"
                  style={{
                    fontSize: 'clamp(0.78rem, 3vw, 0.92rem)',
                    color: '#c2185b',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Please say no &nbsp;🥺
                </p>
              </div>

              {/* divider */}
              <div
                className="w-16 rounded-full"
                style={{ height: 3, background: 'linear-gradient(90deg, #f48fb1, #ce93d8)' }}
              />

              {/* hint text */}
              <p
                className="text-center italic font-semibold"
                style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.85rem)', color: '#e57fa3' }}
              >
                I promise I'll make it up to you ✨
              </p>

              {/* ── Buttons ── */}
              <div className="flex gap-3 w-full justify-center mt-1">

                {/* NO button */}
                <button
                  id="btn-no"
                  onClick={handleNo}
                  className="btn"
                  style={{
                    flex: '1 1 0',
                    maxWidth: 148,
                    height: BTN_H + 'px',
                    background: 'linear-gradient(135deg, #34d399 0%, #06b6d4 100%)',
                    color: '#fff',
                    boxShadow: '0 6px 24px rgba(52,211,153,0.45), 0 2px 8px rgba(6,182,212,0.25)',
                  }}
                >
                  No 💚
                </button>

                {/* YES button – in-flow before first click */}
                {!yesPos && (
                  <button
                    id="btn-yes-inline"
                    ref={yesBtnRef}
                    onClick={handleYes}
                    className="btn"
                    style={{
                      flex: '1 1 0',
                      maxWidth: 148,
                      height: BTN_H + 'px',
                      background: 'linear-gradient(135deg, #fb7185 0%, #f97316 100%)',
                      color: '#fff',
                      boxShadow: '0 6px 24px rgba(251,113,133,0.45), 0 2px 8px rgba(249,115,22,0.25)',
                    }}
                  >
                    Yes 😅
                  </button>
                )}
              </div>

              {yesPos && (
                <p
                  className="fade-in text-center font-bold"
                  style={{ fontSize: '0.78rem', color: '#c2185b', opacity: 0.75 }}
                >
                  You can't catch me! 🏃‍♂️
                </p>
              )}
            </div>
          </div>

          {/* ── bottom tag ── */}
          <p
            className="fade-in mt-4 font-semibold text-center"
            style={{ fontSize: '0.72rem', color: 'rgba(180,50,100,0.5)', letterSpacing: '0.06em' }}
          >
            made with 💕 just for you
          </p>
        </div>
      )}

      {/* ── YES button – fixed to viewport, runs away on every click ── */}
      {!accepted && yesPos && (
        <button
          id="btn-yes"
          ref={yesBtnRef}
          onClick={handleYes}
          className="btn btn-wiggle"
          style={{
            position: 'fixed',
            top:      yesPos.top  + 'px',
            left:     yesPos.left + 'px',
            width:    BTN_W + 'px',
            height:   BTN_H + 'px',
            zIndex:   100,
            background: 'linear-gradient(135deg, #fb7185 0%, #f97316 100%)',
            color:    '#fff',
            boxShadow: '0 6px 24px rgba(251,113,133,0.55)',
            transition: 'top 0s, left 0s, transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          Yes 😅
        </button>
      )}

      {/* ════════════════ SUCCESS STATE ════════════════ */}
      {accepted && (
        <div
          className="scale-in relative z-10 w-full flex flex-col items-center px-4"
          style={{ maxWidth: 420 }}
        >
          <div className="glass-card w-full rounded-3xl overflow-hidden">

            {/* header strip */}
            <div
              className="w-full flex items-center justify-center pt-2 pb-1"
              style={{
                background: 'linear-gradient(90deg, rgba(167,243,208,0.25), rgba(196,181,253,0.25))',
                borderBottom: '1px solid rgba(255,255,255,0.6)',
              }}
            >
              <div className="flex gap-1.5 py-2">
                <div className="w-2 h-2 rounded-full" style={{ background: '#86efac' }} />
                <div className="w-2 h-2 rounded-full" style={{ background: '#a5f3fc' }} />
                <div className="w-2 h-2 rounded-full" style={{ background: '#c4b5fd' }} />
              </div>
            </div>

            {/* body */}
            <div className="flex flex-col items-center gap-5 px-8 pt-6 pb-8">

              {/* rose lottie */}
              <div className="float-rose">
                <DotLottieReact
                  src="/Rose.lottie"
                  autoplay
                  style={{
                    width:  'clamp(200px, 55vw, 280px)',
                    height: 'clamp(200px, 55vw, 280px)',
                  }}
                />
              </div>

              {/* success heading */}
              <div className="fade-in-up flex flex-col items-center gap-2" style={{ animationDelay: '0.2s' }}>
                <h2
                  className="font-black text-center leading-snug tracking-tight"
                  style={{
                    fontSize: 'clamp(1.4rem, 5.5vw, 2.1rem)',
                    color: '#b5294e',
                  }}
                >
                  Have a nice trip Home 😚
                </h2>
              </div>

              {/* divider */}
              <div
                className="fade-in-up w-20 rounded-full"
                style={{
                  height: 3,
                  background: 'linear-gradient(90deg, #86efac, #a5f3fc, #c4b5fd)',
                  animationDelay: '0.35s',
                }}
              />

              {/* sub-messages */}
              <div
                className="fade-in-up flex flex-col items-center gap-1"
                style={{ animationDelay: '0.45s' }}
              >
                <p
                  className="font-bold uppercase text-center tracking-widest"
                  style={{ fontSize: 'clamp(0.72rem, 2.5vw, 0.82rem)', color: '#d81b60' }}
                >
                  You're forgiven 🌹
                </p>
                <p
                  className="font-semibold italic text-center"
                  style={{ fontSize: 'clamp(0.72rem, 2.5vw, 0.82rem)', color: '#e57fa3' }}
                >
                  Drive safe, okay? 🚗💨
                </p>
              </div>
            </div>
          </div>

          <p
            className="fade-in mt-4 font-semibold text-center"
            style={{ fontSize: '0.72rem', color: 'rgba(180,50,100,0.5)', letterSpacing: '0.06em', animationDelay: '0.7s' }}
          >
            made with 💕 just for you
          </p>
        </div>
      )}
    </div>
  )
}
