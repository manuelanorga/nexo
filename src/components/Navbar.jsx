import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useIsMobile } from '../hooks/useMediaQuery'

export default function Navbar({ lang, setLang, dark, setDark, tx }) {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [hovLogin, setHovLogin] = useState(false)
  const [hovDemo, setHovDemo] = useState(false)
  const [open, setOpen] = useState(false)

  const fg    = dark ? '#fff' : '#0B1F3A'
  const fg2   = dark ? 'rgba(255,255,255,0.55)' : 'rgba(11,31,58,0.55)'
  const navBg = dark ? 'rgba(6,12,22,0.92)' : 'rgba(255,255,255,0.92)'
  const bord  = dark ? 'rgba(255,255,255,0.08)' : 'rgba(14,77,146,0.1)'
  const btnBg = dark ? 'rgba(255,255,255,0.06)' : 'rgba(14,77,146,0.04)'
  const btnHv = dark ? 'rgba(255,255,255,0.12)' : 'rgba(14,77,146,0.1)'

  return (
    <div style={{
      position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 100, width: 'calc(100% - 32px)', maxWidth: '900px'
    }}>
      <style>{`
        @keyframes shimmerBtn {
          0%{box-shadow:0 0 15px rgba(0,194,168,0.3)}
          50%{box-shadow:0 0 35px rgba(0,194,168,0.6),0 0 60px rgba(0,194,168,0.2)}
          100%{box-shadow:0 0 15px rgba(0,194,168,0.3)}
        }
        .btn-demo-nav { animation: shimmerBtn 2.5s ease-in-out infinite; }
        @keyframes playPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
        .play-icon { animation: playPulse 1.8s ease-in-out infinite; }
        @keyframes menuSlide { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        .menu-slide { animation: menuSlide .18s ease-out; }
      `}</style>

      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '8px 10px 8px 14px' : '8px 12px 8px 16px',
        background: navBg,
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderRadius: open && isMobile ? '20px 20px 0 0' : '100px',
        border: `1px solid ${bord}`,
        boxShadow: dark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(14,77,146,0.08)',
        transition: 'border-radius .2s',
      }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <img src="/logo.png" alt="NEXO" style={{ height: '30px', width: '30px', borderRadius: '8px', objectFit: 'contain' }} />
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '16px', fontWeight: 900, color: fg }}>NEXO</div>
          {!isMobile && <span style={{ fontSize: '10px', color: fg2, letterSpacing: '1px', textTransform: 'uppercase', marginLeft: '2px' }}>PLATFORM</span>}
        </div>

        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {['Características','Roles','Métricas'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                style={{ color: fg2, textDecoration: 'none', fontSize: '13px', fontWeight: 500, padding: '6px 12px', borderRadius: '100px', fontFamily: "'DM Sans', sans-serif", transition: 'all .2s' }}
                onMouseEnter={e => { e.target.style.color = fg; e.target.style.background = dark ? 'rgba(255,255,255,0.08)' : 'rgba(14,77,146,0.06)' }}
                onMouseLeave={e => { e.target.style.color = fg2; e.target.style.background = 'transparent' }}
              >{l}</a>
            ))}
          </div>
        )}

        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button onClick={() => setDark(!dark)}
              style={{ width: '32px', height: '32px', borderRadius: '50%', border: `1px solid ${bord}`, background: btnBg, cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
              onMouseEnter={e => e.currentTarget.style.background = btnHv}
              onMouseLeave={e => e.currentTarget.style.background = btnBg}
            >{dark ? '☀️' : '🌙'}</button>

            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              style={{ padding: '5px 10px', borderRadius: '100px', border: `1px solid ${bord}`, background: btnBg, cursor: 'pointer', fontSize: '11px', fontWeight: 700, color: fg, fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.5px', transition: 'all .2s' }}
              onMouseEnter={e => e.currentTarget.style.background = btnHv}
              onMouseLeave={e => e.currentTarget.style.background = btnBg}
            >{lang === 'es' ? 'EN' : 'ES'}</button>

            <button onClick={() => navigate('/login')}
              onMouseEnter={() => setHovLogin(true)}
              onMouseLeave={() => setHovLogin(false)}
              style={{ padding: '7px 16px', background: 'transparent', border: `1px solid ${dark ? `rgba(255,255,255,${hovLogin?'0.3':'0.12'})` : `rgba(14,77,146,${hovLogin?'0.3':'0.12'})`}`, borderRadius: '100px', color: hovLogin ? '#00F5A0' : fg, fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all .2s' }}
            >Iniciar sesión</button>

            <button className="btn-demo-nav" onClick={() => navigate('/dashboard')}
              onMouseEnter={() => setHovDemo(true)}
              onMouseLeave={() => setHovDemo(false)}
              style={{ padding: '7px 10px 7px 20px', background: hovDemo ? '#00A891' : '#00F5A0', border: 'none', borderRadius: '100px', color: '#060C16', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'background .2s', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Ver demo
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(6,12,22,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg className="play-icon" width="11" height="11" viewBox="0 0 24 24" fill="#060C16"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </span>
            </button>
          </div>
        )}

        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={() => setDark(!dark)}
              style={{ width: '34px', height: '34px', borderRadius: '50%', border: `1px solid ${bord}`, background: btnBg, cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >{dark ? '☀️' : '🌙'}</button>

            <button onClick={() => setOpen(!open)}
              style={{ width: '34px', height: '34px', borderRadius: '50%', border: `1px solid ${open ? 'rgba(0,194,168,0.4)' : bord}`, background: open ? 'rgba(0,194,168,0.12)' : btnBg, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
            >
              {open
                ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="15" height="11" viewBox="0 0 16 12" fill="none" stroke={fg} strokeWidth="2" strokeLinecap="round"><line x1="0" y1="1" x2="16" y2="1"/><line x1="0" y1="6" x2="16" y2="6"/><line x1="0" y1="11" x2="16" y2="11"/></svg>
              }
            </button>
          </div>
        )}
      </nav>

      {isMobile && open && (
        <div className="menu-slide" style={{
          background: navBg,
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${bord}`, borderTop: 'none',
          borderRadius: '0 0 20px 20px',
          padding: '8px 14px 18px',
          boxShadow: dark ? '0 20px 48px rgba(0,0,0,0.4)' : '0 20px 48px rgba(14,77,146,0.12)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px', paddingBottom: '12px', borderBottom: `1px solid ${bord}` }}>
            {['Características','Roles','Métricas'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                style={{ color: fg2, textDecoration: 'none', fontSize: '15px', fontWeight: 500, padding: '11px 12px', borderRadius: '10px', fontFamily: "'DM Sans', sans-serif", display: 'block', transition: 'all .15s' }}
                onMouseEnter={e => { e.target.style.color = fg; e.target.style.background = dark ? 'rgba(255,255,255,0.05)' : 'rgba(14,77,146,0.04)' }}
                onMouseLeave={e => { e.target.style.color = fg2; e.target.style.background = 'transparent' }}
              >{l}</a>
            ))}
          </div>

          <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            style={{ width: '100%', padding: '10px 12px', marginBottom: '8px', borderRadius: '10px', border: `1px solid ${bord}`, background: btnBg, cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: fg2, fontFamily: "'DM Sans', sans-serif", textAlign: 'left' }}
          >🌐 {lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}</button>

          <button onClick={() => { navigate('/login'); setOpen(false) }}
            style={{ width: '100%', padding: '12px', marginBottom: '8px', background: 'transparent', border: `1px solid ${bord}`, borderRadius: '12px', color: fg, fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
          >Iniciar sesión</button>

          <button onClick={() => { navigate('/dashboard'); setOpen(false) }}
            style={{ width: '100%', padding: '13px', background: '#00F5A0', border: 'none', borderRadius: '12px', color: '#060C16', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
          >Ver demo →</button>
        </div>
      )}
    </div>
  )
}
