import { useState, useCallback } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import './index.css'

// ─── constants ────────────────────────────────────────────────────────────────
const BTN_W  = 110   // px – keeps button fully on-screen
const BTN_H  = 48
const MARGIN = 16    // min gap from viewport edges

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
  // null  → button is in the flex row (before first click)
  // {top, left} → button is fixed to viewport
  const [yesPos, setYesPos] = useState(null)

  const handleYes = useCallback(() => setYesPos(randomViewportPos()), [])
  const handleNo  = useCallback(() => setAccepted(true), [])

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fff0f5 0%, #fce4ec 55%, #f3e8ff 100%)' }}
    >
      {/* ── decorative blobs ──────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, #f48fb1 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, #ce93d8 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute top-1/4 right-0 w-48 h-48 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #f06292 0%, transparent 70%)' }}
      />

      {/* ════════════════ QUESTION STATE ════════════════ */}
      {!accepted && (
        <div className="flex flex-col items-center gap-6 px-6 z-10 text-center max-w-sm w-full">

          {/* ── glass card ── */}
          <div
            className="w-full rounded-3xl p-8 flex flex-col items-center gap-6"
            style={{
              background:     'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(20px)',
              boxShadow:      '0 8px 40px rgba(180,50,100,0.12), 0 2px 8px rgba(180,50,100,0.06)',
            }}
          >
            {/* lottie – pleading face */}
            <div className="heartbeat">
              <DotLottieReact
                src="/pleading face Emoji.lottie"
                autoplay
                loop
                style={{ width: 200, height: 200 }}
              />
            </div>

            {/* heading */}
            <h1
              className="text-3xl sm:text-4xl font-black tracking-tight leading-tight"
              style={{ color: '#b5294e' }}
            >
              Are you still mad?
            </h1>

            {/* subtitle */}
            <p
              className="text-sm font-bold tracking-wide uppercase"
              style={{ color: '#d81b60', letterSpacing: '0.08em' }}
            >
              Please say no 🥺
            </p>

            {/* button row */}
            <div className="flex gap-4 justify-center w-full">

              {/* NO – always in flow */}
              <button
                id="btn-no"
                onClick={handleNo}
                className="flex-1 max-w-[130px] py-3 rounded-full font-extrabold text-base text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  boxShadow:  '0 6px 20px rgba(56,249,215,0.35)',
                }}
              >
                No 💚
              </button>

              {/* YES – in flow before first click */}
              {!yesPos && (
                <button
                  id="btn-yes-inline"
                  onClick={handleYes}
                  className="flex-1 max-w-[130px] py-3 rounded-full font-extrabold text-base shadow-md select-none transition-transform duration-150 hover:scale-105 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #fda085 0%, #f6d365 100%)',
                    color:      '#7c2d12',
                    boxShadow:  '0 4px 14px rgba(253,160,133,0.4)',
                  }}
                >
                  Yes 😅
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* YES – fixed to viewport after first click (runs away!) */}
      {!accepted && yesPos && (
        <button
          id="btn-yes"
          onClick={handleYes}
          className="font-extrabold text-base rounded-full shadow-md select-none hover:scale-105 active:scale-95"
          style={{
            position:   'fixed',
            top:        yesPos.top  + 'px',
            left:       yesPos.left + 'px',
            width:      BTN_W + 'px',
            height:     BTN_H + 'px',
            zIndex:     50,
            background: 'linear-gradient(135deg, #fda085 0%, #f6d365 100%)',
            color:      '#7c2d12',
            boxShadow:  '0 4px 14px rgba(253,160,133,0.4)',
            border:     'none',
            cursor:     'pointer',
            transition: 'top 0s, left 0s, transform 0.15s',
          }}
        >
          Yes 😅
        </button>
      )}

      {/* ════════════════ SUCCESS STATE ════════════════ */}
      {accepted && (
        <div className="flex flex-col items-center gap-6 px-6 z-10 text-center max-w-sm w-full">
          <div
            className="w-full rounded-3xl p-8 flex flex-col items-center gap-6 fade-in-up"
            style={{
              background:     'rgba(255,255,255,0.70)',
              backdropFilter: 'blur(20px)',
              boxShadow:      '0 8px 40px rgba(180,50,100,0.12)',
            }}
          >
            {/* lottie – rose */}
            <div className="float-rose">
              <DotLottieReact
                src="/Rose.lottie"
                autoplay
                style={{ width: 260, height: 260 }}
              />
            </div>

            <h2
              className="fade-in-up text-2xl sm:text-3xl font-black tracking-tight leading-snug"
              style={{ color: '#b5294e', animationDelay: '0.25s' }}
            >
              Have a nice trip Home 😚
            </h2>

            <p
              className="fade-in-up text-sm font-bold tracking-widest uppercase"
              style={{ color: '#d81b60', animationDelay: '0.55s' }}
            >
              You're forgiven 🌹
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
