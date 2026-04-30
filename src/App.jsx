import { useState, useCallback, useRef } from 'react'
import { DotLottieReact, setWasmUrl } from '@lottiefiles/dotlottie-react'
import './index.css'

setWasmUrl('/dotlottie-player.wasm')

const BTN_W  = 120
const BTN_H  = 52
const MARGIN = 20

function randomPos() {
  const maxX = Math.max(window.innerWidth  - BTN_W  - MARGIN, MARGIN)
  const maxY = Math.max(window.innerHeight - BTN_H  - MARGIN, MARGIN)
  return {
    top:  Math.floor(Math.random() * (maxY - MARGIN) + MARGIN),
    left: Math.floor(Math.random() * (maxX - MARGIN) + MARGIN),
  }
}

export default function App() {
  const [accepted, setAccepted] = useState(false)
  const [yesPos,   setYesPos]   = useState(null)
  const yesBtnRef = useRef(null)

  const handleYes = useCallback(() => {
    const btn = yesBtnRef.current
    if (btn) {
      btn.classList.remove('wiggle')
      void btn.offsetWidth
      btn.classList.add('wiggle')
    }
    setYesPos(randomPos())
  }, [])

  const handleNo = useCallback(() => setAccepted(true), [])

  /* ── shared styles ── */
  const page = {
    position:        'fixed',
    inset:           0,
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    padding:         '16px',
    background:      'linear-gradient(160deg, #fff0f5 0%, #fce4ec 50%, #f3e5f5 100%)',
    overflow:        'hidden',
  }

  const card = {
    width:           '100%',
    maxWidth:        '400px',
    borderRadius:    '28px',
    padding:         '36px 28px 32px',
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    gap:             '20px',
    textAlign:       'center',
    background:      'rgba(255,255,255,0.75)',
    backdropFilter:  'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow:       '0 8px 32px rgba(180,50,100,0.15), 0 1px 0 rgba(255,255,255,0.9) inset',
    border:          '1px solid rgba(255,255,255,0.85)',
  }

  const btnBase = {
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    gap:             '6px',
    height:          BTN_H + 'px',
    flex:            '1 1 0',
    maxWidth:        '148px',
    borderRadius:    '9999px',
    border:          'none',
    cursor:          'pointer',
    fontFamily:      'Nunito, sans-serif',
    fontWeight:      800,
    fontSize:        '1rem',
    color:           '#fff',
    userSelect:      'none',
    WebkitUserSelect:'none',
    transition:      'transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.15s',
  }

  return (
    <div style={page}>

      {/* ══ QUESTION STATE ══ */}
      {!accepted && (
        <div className="scale-in" style={card}>

          {/* sad → crying emoji */}
          <div className="emoji-pulse">
            <DotLottieReact
              src="/Sad emoji to Crying emoji.lottie"
              autoplay
              loop
              style={{ width: 180, height: 180 }}
            />
          </div>

          {/* text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <h1
              style={{
                fontFamily:  'Nunito, sans-serif',
                fontWeight:  900,
                fontSize:    'clamp(1.55rem, 7vw, 2rem)',
                lineHeight:  1.2,
                color:       '#b5294e',
                margin:      0,
              }}
            >
              Are you still mad?
            </h1>
            <p
              style={{
                fontFamily:    'Nunito, sans-serif',
                fontWeight:    700,
                fontSize:      '0.82rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color:         '#d81b60',
                margin:        0,
              }}
            >
              Please say no 🥺
            </p>
          </div>

          {/* thin divider */}
          <div
            style={{
              width:        '48px',
              height:       '3px',
              borderRadius: '9999px',
              background:   'linear-gradient(90deg,#f48fb1,#ce93d8)',
            }}
          />

          {/* buttons */}
          <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>

            {/* NO */}
            <button
              id="btn-no"
              onClick={handleNo}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
              onMouseDown={e  => { e.currentTarget.style.transform = 'scale(0.94)' }}
              style={{
                ...btnBase,
                background: 'linear-gradient(135deg,#34d399,#06b6d4)',
                boxShadow:  '0 6px 20px rgba(52,211,153,0.45)',
              }}
            >
              No 💚
            </button>

            {/* YES – in flow */}
            {!yesPos && (
              <button
                id="btn-yes-inline"
                ref={yesBtnRef}
                onClick={handleYes}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                onMouseDown={e  => { e.currentTarget.style.transform = 'scale(0.94)' }}
                style={{
                  ...btnBase,
                  background: 'linear-gradient(135deg,#fb7185,#f97316)',
                  boxShadow:  '0 6px 20px rgba(251,113,133,0.45)',
                }}
              >
                Yes 😅
              </button>
            )}
          </div>

          {/* hint shown after Yes is clicked */}
          {yesPos && (
            <p
              className="fade-in-up"
              style={{
                fontFamily:  'Nunito, sans-serif',
                fontWeight:  700,
                fontSize:    '0.8rem',
                color:       '#c2185b',
                margin:      0,
                opacity:     0.8,
              }}
            >
              Can't catch me! 🏃‍♂️
            </p>
          )}
        </div>
      )}

      {/* ── YES floating button – runs away ── */}
      {!accepted && yesPos && (
        <button
          id="btn-yes"
          ref={yesBtnRef}
          onClick={handleYes}
          className="wiggle"
          style={{
            ...btnBase,
            position:    'fixed',
            top:         yesPos.top  + 'px',
            left:        yesPos.left + 'px',
            width:       BTN_W + 'px',
            height:      BTN_H + 'px',
            flex:        'none',
            maxWidth:    'none',
            zIndex:      9999,
            background:  'linear-gradient(135deg,#fb7185,#f97316)',
            boxShadow:   '0 6px 24px rgba(251,113,133,0.55)',
          }}
        >
          Yes 😅
        </button>
      )}

      {/* ══ SUCCESS STATE ══ */}
      {accepted && (
        <div className="scale-in" style={card}>

          {/* rose */}
          <div className="float-rose">
            <DotLottieReact
              src="/Rose.lottie"
              autoplay
              style={{ width: 220, height: 220 }}
            />
          </div>

          <h2
            className="fade-in-up"
            style={{
              fontFamily:  'Nunito, sans-serif',
              fontWeight:  900,
              fontSize:    'clamp(1.35rem, 6vw, 1.85rem)',
              color:       '#b5294e',
              margin:      0,
              lineHeight:  1.3,
              animationDelay: '0.2s',
            }}
          >
            Have a nice trip Home 😚
          </h2>

          <div
            style={{
              width:        '48px',
              height:       '3px',
              borderRadius: '9999px',
              background:   'linear-gradient(90deg,#86efac,#c4b5fd)',
            }}
          />

          <p
            className="fade-in-up"
            style={{
              fontFamily:    'Nunito, sans-serif',
              fontWeight:    700,
              fontSize:      '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         '#d81b60',
              margin:        0,
              animationDelay: '0.4s',
            }}
          >
            You're forgiven 🌹
          </p>

          <p
            className="fade-in-up"
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 600,
              fontStyle:  'italic',
              fontSize:   '0.82rem',
              color:      '#e57fa3',
              margin:     0,
              animationDelay: '0.55s',
            }}
          >
            Drive safe, okay? 🚗💨
          </p>
        </div>
      )}
    </div>
  )
}
