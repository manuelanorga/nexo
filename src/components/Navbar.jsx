import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar({ lang, setLang, dark, setDark, tx }) {
  const navigate = useNavigate()
  const [hovLogin, setHovLogin] = useState(false)
  const [hovDemo, setHovDemo] = useState(false)

  return (
    <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: '90%', maxWidth: '900px' }}>
      <style>{`
        @keyframes shimmerBtn {
          0%{box-shadow:0 0 15px rgba(0,194,168,0.3)}
          50%{box-shadow:0 0 35px rgba(0,194,168,0.6),0 0 60px rgba(0,194,168,0.2)}
          100%{box-shadow:0 0 15px rgba(0,194,168,0.3)}
        }
        .btn-demo { animation: shimmerBtn 2.5s ease-in-out infinite; }
      `}</style>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px 8px 16px',
        background: dark ? 'rgba(6,12,22,0.8)' : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '100px',
        border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(14,77,146,0.1)',
        boxShadow: dark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(14,77,146,0.08)',
        transition: 'all .3s'
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.png" alt="NEXO" style={{ height: '32px', width: '32px', borderRadius: '8px', objectFit: 'contain' }} />
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '16px', fontWeight: 900, letterSpacing: '-0.5px', color: dark ? '#fff' : '#0B1F3A' }}>
            NEXO
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {['Características','Roles','Métricas'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(11,31,58,0.55)',
              textDecoration: 'none', fontSize: '13px', fontWeight: 500,
              padding: '6px 12px', borderRadius: '100px',
              fontFamily: "'DM Sans', sans-serif", transition: 'all .2s'
            }}
              onMouseEnter={e => { e.target.style.color = dark ? '#fff' : '#0B1F3A'; e.target.style.background = dark ? 'rgba(255,255,255,0.08)' : 'rgba(14,77,146,0.06)' }}
              onMouseLeave={e => { e.target.style.color = dark ? 'rgba(255,255,255,0.55)' : 'rgba(11,31,58,0.55)'; e.target.style.background = 'transparent' }}
            >{l}</a>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>

          {/* Dark/Light toggle */}
          <button
            onClick={() => setDark(!dark)}
            title={dark ? 'Modo claro' : 'Modo oscuro'}
            style={{ width: '32px', height: '32px', borderRadius: '50%', border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(14,77,146,0.1)', background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(14,77,146,0.04)', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.12)' : 'rgba(14,77,146,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.06)' : 'rgba(14,77,146,0.04)'}
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {/* Lang toggle */}
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            style={{ padding: '5px 10px', borderRadius: '100px', border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(14,77,146,0.1)', background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(14,77,146,0.04)', cursor: 'pointer', fontSize: '11px', fontWeight: 700, color: dark ? 'rgba(255,255,255,0.7)' : '#0B1F3A', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.5px', transition: 'all .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.12)' : 'rgba(14,77,146,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.06)' : 'rgba(14,77,146,0.04)'}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>

          {/* Login */}
          <button
            onClick={() => navigate('/login')}
            onMouseEnter={() => setHovLogin(true)}
            onMouseLeave={() => setHovLogin(false)}
            style={{ padding: '7px 16px', background: 'transparent', border: dark ? `1px solid rgba(255,255,255,${hovLogin ? '0.3' : '0.12'})` : `1px solid rgba(14,77,146,${hovLogin ? '0.3' : '0.12'})`, borderRadius: '100px', color: hovLogin ? '#00F5A0' : (dark ? 'rgba(255,255,255,0.75)' : '#0B1F3A'), fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all .2s' }}>
            Iniciar sesión
          </button>

          {/* Demo */}
          <button
            className="btn-demo"
            onClick={() => navigate('/dashboard')}
            onMouseEnter={() => setHovDemo(true)}
            onMouseLeave={() => setHovDemo(false)}
            style={{ padding: '7px 18px', background: hovDemo ? '#00A891' : '#00F5A0', border: 'none', borderRadius: '100px', color: '#060C16', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'background .2s' }}>
            Ver demo &rarr;
          </button>
        </div>
      </nav>
    </div>
  )
}
