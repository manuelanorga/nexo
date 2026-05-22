import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = () => {
    if (!form.email || !form.password) {
      setError('Completa todos los campos para continuar.')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1200)
  }

  const demoAccess = (role) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#060C16',
      display: 'flex', fontFamily: "'DM Sans', sans-serif",
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Background effects */}
      <div style={{
        position: 'absolute', top: '-200px', left: '-200px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,194,168,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-200px', right: '-200px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,77,146,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.3,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '48px 48px', pointerEvents: 'none'
      }} />

      {/* Panel izquierdo — branding */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '60px',
        position: 'relative', zIndex: 1
      }} className="login-left">
        <div style={{ maxWidth: '480px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '60px' }}>
            <img src="/logo.png" alt="NEXO" style={{ height: '44px', width: '44px', borderRadius: '12px', objectFit: 'contain' }} />
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>NEXO</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase' }}>O2P Platform</div>
            </div>
          </div>

          <h1 style={{
            fontFamily: "'Fraunces', serif", fontSize: 'clamp(36px,4vw,52px)',
            fontWeight: 900, color: '#fff', lineHeight: 1.05,
            letterSpacing: '-1.5px', marginBottom: '20px', margin: '0 0 20px'
          }}>
            Bienvenido<br />de vuelta.
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '48px', fontWeight: 300 }}>
            Gestiona tus órdenes de compra, catálogo y documentos financieros en un solo lugar.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '32px' }}>
            {[['241', 'OCs activas'], ['96.4%', 'Fill rate'], ['S/2.4M', 'Ventas YTD']].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: '22px', fontWeight: 900, color: '#00C2A8' }}>{val}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div style={{
        width: '460px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px', position: 'relative', zIndex: 1,
        borderLeft: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>

          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '26px', fontWeight: 900, color: '#fff', marginBottom: '6px' }}>Iniciar sesión</h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>Ingresa tus credenciales para continuar</p>
          </div>

          {/* Acceso demo */}
          <div style={{ background: 'rgba(0,194,168,0.06)', border: '1px solid rgba(0,194,168,0.15)', borderRadius: '12px', padding: '14px', marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', color: '#00C2A8', fontWeight: 600, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Acceso demo</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => demoAccess('prov')} style={{
                flex: 1, padding: '8px', background: '#0B1F3A', border: '1px solid rgba(0,194,168,0.2)',
                borderRadius: '8px', fontSize: '12px', color: '#00C2A8', cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, transition: 'all .15s'
              }}
                onMouseEnter={e => e.target.style.background = '#0E2D52'}
                onMouseLeave={e => e.target.style.background = '#0B1F3A'}
              >
                Proveedor (Arca)
              </button>
              <button onClick={() => demoAccess('ret')} style={{
                flex: 1, padding: '8px', background: '#064E3B', border: '1px solid rgba(74,222,128,0.2)',
                borderRadius: '8px', fontSize: '12px', color: '#4ADE80', cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, transition: 'all .15s'
              }}
                onMouseEnter={e => e.target.style.background = '#065F46'}
                onMouseLeave={e => e.target.style.background = '#064E3B'}
              >
                Retail (Wong)
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>o con tu cuenta</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Formulario */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Correo electrónico</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="usuario@empresa.com"
                style={{
                  width: '100%', height: '44px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px', padding: '0 14px',
                  fontSize: '13px', color: '#fff',
                  fontFamily: "'DM Sans', sans-serif", outline: 'none',
                  transition: 'border-color .15s',
                  boxSizing: 'border-box'
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(0,194,168,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Contraseña</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="••••••••"
                  style={{
                    width: '100%', height: '44px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px', padding: '0 44px 0 14px',
                    fontSize: '13px', color: '#fff',
                    fontFamily: "'DM Sans', sans-serif", outline: 'none',
                    transition: 'border-color .15s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,194,168,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: '14px', padding: '4px' }}>
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.remember} onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))} style={{ accentColor: '#00C2A8', cursor: 'pointer' }} />
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>Recordarme</span>
            </label>
            <button style={{ background: 'none', border: 'none', fontSize: '12px', color: '#00C2A8', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {error && (
            <div style={{ background: 'rgba(229,82,82,0.1)', border: '1px solid rgba(229,82,82,0.3)', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#FCA5A5', marginBottom: '16px' }}>
              ⚠ {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%', height: '46px',
              background: loading ? 'rgba(0,194,168,0.5)' : '#00C2A8',
              border: 'none', borderRadius: '10px',
              fontSize: '14px', fontWeight: 700, color: '#060C16',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all .2s',
              boxShadow: loading ? 'none' : '0 0 30px rgba(0,194,168,0.2)',
            }}
            onMouseEnter={e => { if (!loading) e.target.style.background = '#00A891' }}
            onMouseLeave={e => { if (!loading) e.target.style.background = '#00C2A8' }}
          >
            {loading ? 'Ingresando...' : 'Ingresar a NEXO →'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
            ¿No tienes cuenta?{' '}
            <button style={{ background: 'none', border: 'none', color: '#00C2A8', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>
              Contacta con tu administrador
            </button>
          </div>

          <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
            NEXO · Plataforma O2P · powered by instamovil.com
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .login-left { display: none !important; }
        }
      `}</style>
    </div>
  )
}
