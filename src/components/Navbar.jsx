import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <div style={{
      position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 100, width: '90%', maxWidth: '860px',
    }}>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 12px 10px 20px',
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '100px',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}>

        {/* Logo */}
        <div style={{
          fontFamily: "'Fraunces', serif",
          fontSize: '18px', fontWeight: 900,
          letterSpacing: '-0.5px', color: '#fff',
          flexShrink: 0
        }}>
          NEX<span style={{ color: '#00C2A8' }}>O</span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {['Características', 'Roles', 'Métricas'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
              fontSize: '13px', fontWeight: 500, padding: '6px 14px',
              borderRadius: '100px', transition: 'all .2s',
              fontFamily: "'DM Sans', sans-serif"
            }}
              onMouseEnter={e => {
                e.target.style.color = '#fff'
                e.target.style.background = 'rgba(255,255,255,0.08)'
              }}
              onMouseLeave={e => {
                e.target.style.color = 'rgba(255,255,255,0.55)'
                e.target.style.background = 'transparent'
              }}
            >{l}</a>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => navigate('/dashboard')} style={{
            padding: '8px 18px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '100px',
            color: 'rgba(255,255,255,0.75)',
            fontSize: '13px', fontWeight: 500, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'all .2s'
          }}
            onMouseEnter={e => {
              e.target.style.borderColor = 'rgba(255,255,255,0.35)'
              e.target.style.color = '#fff'
            }}
            onMouseLeave={e => {
              e.target.style.borderColor = 'rgba(255,255,255,0.15)'
              e.target.style.color = 'rgba(255,255,255,0.75)'
            }}
          >Iniciar sesión</button>

          <button onClick={() => navigate('/dashboard')} style={{
            padding: '8px 20px',
            background: '#00C2A8',
            border: 'none', borderRadius: '100px',
            color: '#060C16', fontSize: '13px', fontWeight: 700,
            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            boxShadow: '0 0 20px rgba(0,194,168,0.3)',
            transition: 'all .2s'
          }}
            onMouseEnter={e => {
              e.target.style.background = '#00A891'
              e.target.style.boxShadow = '0 0 30px rgba(0,194,168,0.45)'
            }}
            onMouseLeave={e => {
              e.target.style.background = '#00C2A8'
              e.target.style.boxShadow = '0 0 20px rgba(0,194,168,0.3)'
            }}
          >Ver demo →</button>
        </div>

      </nav>
    </div>
  )
}
