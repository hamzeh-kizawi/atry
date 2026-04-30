import { useState, useCallback, useRef } from 'react'
import { DotLottiePlayer } from '@dotlottie/react-player'
import '@dotlottie/react-player/dist/index.css'
import './index.css'

// ─── constants ────────────────────────────────────────────────────────────────
const BTN_W  = 110
const BTN_H  = 48
const MARGIN = 20   // distance from card inner edges

function randomPosInBox(w, h) {
  const maxX = Math.max(w - BTN_W - MARGIN, MARGIN)
  const maxY = Math.max(h - BTN_H - MARGIN, MARGIN)
  return {
    top:  Math.floor(Math.random() * (maxY - MARGIN) + MARGIN),
    left: Math.floor(Math.random() * (maxX - MARGIN) + MARGIN),
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [accepted, setAccepted] = useState(false)
  const [yesPos,   setYesPos]   = useState(null)   // null = in flex row; object = floating

  // Ref on the OUTER wrapper div (position:relative, known size)
  const boxRef = useRef(null)

  const handleYes = useCallback(() => {
    const box = boxRef.current
    if (!box) return
    setYesPos(randomPosInBox(box.offsetWidth, box.offsetHeight))
  }, [])

  const handleNo = useCallback(() => setAccepted(true), [])

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fff0f5 0%, #fce4ec 55%, #f3e8ff 100%)' }}
    >
      {/* ── decorative blobs ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 rounded-full opacity-40"
           style={{ background: 'radial-gradient(circle, #f48fb1 0%, transparent 70%)' }} />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-30"
           style={{ background: 'radial-gradient(circle, #ce93d8 0%, transparent 70%)' }} />
      <div className="pointer-events-none absolute top-1/4 right-0 w-48 h-48 rounded-full opacity-20"
           style={{ background: 'radial-gradient(circle, #f06292 0%, transparent 70%)' }} />

      {/* ════════════════ QUESTION STATE ════════════════ */}
      {!accepted && (
        <div className="flex flex-col items-center gap-5 px-6 z-10 text-center max-w-sm w-full">

          {/*
            Outer box: position:relative + fixed size = the "arena" for the Yes button.
            The white card visual is a child of this, but YES uses this as its offset parent.
          */}
          <div
            ref={boxRef}
            style={{
              position: 'relative',
              width:    '100%',
              minHeight: 420,
            }}
          >
            {/* ── White card (visual, non-positioning) ── */}
            <div
              className="w-full h-full rounded-3xl p-8 flex flex-col items-center gap-5"
              style={{
                position:      'absolute',
                inset:         0,
                background:    'rgba(255,255,255,0.65)',
                backdropFilter:'blur(20px)',
                boxShadow:     '0 8px 40px rgba(180,50,100,0.12), 0 2px 8px rgba(180,50,100,0.06)',
              }}
            />

            {/* ── Card content (in flow, centered) ── */}
            <div className="relative flex flex-col items-center gap-5 w-full pt-8 pb-8 px-8">

              {/* lottie – sad / crying emoji */}
              <div className="heartbeat">
                <DotLottiePlayer
                  src="/Sad emoji to Crying emoji.lottie"
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

              {/* buttons row */}
              <div className="flex gap-4 mt-1 w-full justify-center">

                {/* NO – always in flow */}
                <button
                  id="btn-no"
                  onClick={handleNo}
                  className="
                    flex-1 max-w-[130px] py-3 rounded-full
                    font-extrabold text-base text-white shadow-lg
                    transition-transform duration-200
                    hover:scale-105 active:scale-95
                  "
                  style={{
                    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    boxShadow:  '0 6px 20px rgba(56,249,215,0.35)',
                  }}
                >
                  No 💚
                </button>

                {/* YES in-flow (only before first click) */}
                {!yesPos && (
                  <button
                    id="btn-yes-inline"
                    onClick={handleYes}
                    className="
                      flex-1 max-w-[130px] py-3 rounded-full
                      font-extrabold text-base shadow-md select-none
                      transition-transform duration-150
                      hover:scale-105 active:scale-95
                    "
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

            {/* YES floating (after first click) – absolute inside the outer box */}
            {yesPos && (
              <button
                id="btn-yes"
                onClick={handleYes}
                className="font-extrabold text-base rounded-full shadow-md select-none hover:scale-105 active:scale-95"
                style={{
                  position:   'absolute',
                  top:        yesPos.top  + 'px',
                  left:       yesPos.left + 'px',
                  width:      BTN_W + 'px',
                  height:     BTN_H + 'px',
                  zIndex:     20,
                  background: 'linear-gradient(135deg, #fda085 0%, #f6d365 100%)',
                  color:      '#7c2d12',
                  boxShadow:  '0 4px 14px rgba(253,160,133,0.4)',
                  border:     'none',
                  cursor:     'pointer',
                  transition: 'transform 0.15s',
                }}
              >
                Yes 😅
              </button>
            )}
          </div>
        </div>
      )}

      {/* ════════════════ SUCCESS STATE ════════════════ */}
      {accepted && (
        <div className="flex flex-col items-center gap-6 px-6 z-10 text-center max-w-sm w-full">
          <div
            className="w-full rounded-3xl p-8 flex flex-col items-center gap-6 fade-in-up"
            style={{
              background:    'rgba(255,255,255,0.7)',
              backdropFilter:'blur(20px)',
              boxShadow:     '0 8px 40px rgba(180,50,100,0.12)',
            }}
          >
            <div className="float-rose">
              <DotLottiePlayer
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
