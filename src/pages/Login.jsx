import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function O2PDiagram() {
  return (
    <div style={{ position: 'relative', width: '360px', height: '360px', margin: '0 auto 24px' }}>
      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinR { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes glowPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes nodePop { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.12)} }
        @keyframes dotBlink { 0%,100%{opacity:.4} 50%{opacity:1} }
        .o2p-spin { animation: spin 24s linear infinite; transform-origin: 180px 180px; }
        .o2p-spinr { animation: spinR 18s linear infinite; transform-origin: 180px 180px; }
        .o2p-glow { animation: glowPulse 2s ease-in-out infinite; }
        .o2p-node { position:absolute; transform:translate(-50%,-50%); animation: nodePop 3s ease-in-out infinite; }
        .o2p-node:nth-child(1){animation-delay:0s}
        .o2p-node:nth-child(2){animation-delay:.5s}
        .o2p-node:nth-child(3){animation-delay:1s}
        .o2p-node:nth-child(4){animation-delay:1.5s}
        .o2p-node:nth-child(5){animation-delay:2s}
        .o2p-node:nth-child(6){animation-delay:2.5s}
        .o2p-dot { animation: dotBlink 1.5s ease-in-out infinite; }
      `}</style>

      <svg width="360" height="360" viewBox="0 0 360 360" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        {/* Outer dashed spinning ring */}
        <g className="o2p-spin">
          <circle cx="180" cy="180" r="150" fill="none" stroke="rgba(0,194,168,0.06)" strokeWidth="1"/>
          <circle cx="180" cy="180" r="150" fill="none" stroke="rgba(0,194,168,0.14)" strokeWidth="1" strokeDasharray="4 18" strokeLinecap="round"/>
        </g>

        {/* Main orbit */}
        <circle cx="180" cy="180" r="126" fill="none" stroke="rgba(14,77,146,0.2)" strokeWidth="1"/>

        {/* Counter-rotating arc */}
        <g className="o2p-spinr">
          <circle cx="180" cy="180" r="126" fill="none" stroke="rgba(0,194,168,0.5)" strokeWidth="2" strokeDasharray="70 722" strokeLinecap="round"/>
        </g>

        {/* Inner ring */}
        <circle cx="180" cy="180" r="72" fill="none" stroke="rgba(0,194,168,0.07)" strokeWidth="1"/>

        {/* Spokes */}
        {[[180,54,180,108],[289,117,243,147],[289,243,243,213],[180,306,180,252],[71,243,117,213],[71,117,117,147]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,194,168,0.08)" strokeWidth="1" strokeDasharray="3 4"/>
        ))}

        {/* Center glow */}
        <circle cx="180" cy="180" r="52" fill="rgba(0,194,168,0.05)" stroke="rgba(0,194,168,0.25)" strokeWidth="1.5" className="o2p-glow"/>
        <circle cx="180" cy="180" r="38" fill="rgba(6,12,22,0.95)" stroke="rgba(0,194,168,0.12)" strokeWidth="1"/>
      </svg>

      {/* Center label */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>NEX<span style={{ color: '#00C2A8' }}>O</span></div>
        <div style={{ fontSize: '8px', color: 'rgba(0,194,168,0.5)', letterSpacing: '2.5px', textTransform: 'uppercase', marginTop: '2px' }}>O2P</div>
      </div>

      {/* Nodes */}
      {[
        { x: 180, y: 54,  border: 'rgba(0,194,168,0.5)', stroke: '#00C2A8', label: ['Orden de','Compra'],
          icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></> },
        { x: 289, y: 117, border: 'rgba(14,77,146,0.5)', stroke: '#378ADD', label: ['Aviso','Despacho'],
          icon: <><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></> },
        { x: 289, y: 243, border: 'rgba(14,77,146,0.5)', stroke: '#378ADD', label: ['Aviso de','Recibo'],
          icon: <><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></> },
        { x: 180, y: 306, border: 'rgba(14,77,146,0.5)', stroke: '#378ADD', label: ['Devoluciones',''],
          icon: <><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></> },
        { x: 71,  y: 243, border: 'rgba(14,77,146,0.5)', stroke: '#378ADD', label: ['Facturación',''],
          icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="9" y1="9" x2="8" y2="9"/></> },
        { x: 71,  y: 117, border: 'rgba(0,194,168,0.5)', stroke: '#00C2A8', label: ['Cobro',''],
          icon: <><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></> },
      ].map((n, i) => (
        <div key={i} className="o2p-node" style={{ left: n.x, top: n.y }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(6,12,22,0.95)', border: `1.5px solid ${n.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={n.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {n.icon}
            </svg>
          </div>
          <div style={{ textAlign: 'center', marginTop: '5px', fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, lineHeight: 1.4, whiteSpace: 'nowrap' }}>
            {n.label[0]}{n.label[1] && <><br/>{n.label[1]}</>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = () => {
    if (!form.email || !form.password) { setError('Completa todos los campos.'); return }
    setError(''); setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/dashboard') }, 1200)
  }

  const demoAccess = () => { setLoading(true); setTimeout(() => { setLoading(false); navigate('/dashboard') }, 800) }

  return (
    <div style={{ minHeight: '100vh', background: '#060C16', display: 'flex', fontFamily: "'DM Sans', sans-serif", position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .login-anim { animation: fadeIn .7s ease both; }
        .login-left { flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:40px; position:relative; z-index:1; border-right:1px solid rgba(255,255,255,0.04); }
        .login-right { width:440px; flex-shrink:0; display:flex; align-items:center; justify-content:center; padding:40px; position:relative; z-index:1; }
        @media(max-width:768px) { .login-left{display:none!important} .login-right{width:100%} }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>

      {/* Background grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '-200px', left: '20%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,194,168,0.05) 0%,transparent 70%)', pointerEvents: 'none' }} />

      {/* Left panel */}
      <div className="login-left">
        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.png" alt="NEXO" style={{ height: '36px', width: '36px', borderRadius: '8px' }} />
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>NEXO</div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase' }}>O2P Platform</div>
          </div>
        </div>

        <O2PDiagram />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', width: '360px' }}>
          {[['241', 'OCs activas'], ['96.4%', 'Fill rate'], ['< 2s', 'Validación']].map(([v, l]) => (
            <div key={l} style={{ background: '#060C16', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', fontWeight: 900, color: '#00C2A8' }}>{v}</div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '.5px' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="login-right">
        <div style={{ width: '100%', maxWidth: '360px' }} className="login-anim">

          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(0,194,168,0.7)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 600 }}>Acceso seguro</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '28px', fontWeight: 900, color: '#fff', marginBottom: '4px' }}>Iniciar sesión</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>Ingresa tus credenciales para continuar</div>
          </div>

          {/* Demo */}
          <div style={{ background: 'rgba(0,194,168,0.05)', border: '1px solid rgba(0,194,168,0.12)', borderRadius: '10px', padding: '12px', marginBottom: '22px' }}>
            <div style={{ fontSize: '10px', color: 'rgba(0,194,168,0.6)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Acceso demo</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <button onClick={demoAccess} style={{ padding: '8px', background: 'rgba(11,31,58,0.8)', border: '1px solid rgba(0,194,168,0.15)', borderRadius: '7px', fontSize: '11px', color: '#00C2A8', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                Proveedor (Arca)
              </button>
              <button onClick={demoAccess} style={{ padding: '8px', background: 'rgba(6,78,59,0.8)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '7px', fontSize: '11px', color: '#4ADE80', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                Retail (Wong)
              </button>
            </div>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '1px', textTransform: 'uppercase' }}>o con tu cuenta</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* Fields */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '.5px', display: 'block', marginBottom: '6px' }}>Correo electrónico</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} onKeyDown={e => e.key === 'Enter' && handleSubmit()} placeholder="usuario@empresa.com"
              style={{ width: '100%', height: '44px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '0 14px', fontSize: '13px', color: '#fff', fontFamily: "'DM Sans', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'border-color .15s' }}
              onFocus={e => e.target.style.borderColor = 'rgba(0,194,168,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '.5px', display: 'block', marginBottom: '6px' }}>Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} onKeyDown={e => e.key === 'Enter' && handleSubmit()} placeholder="••••••••"
                style={{ width: '100%', height: '44px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '0 44px 0 14px', fontSize: '13px', color: '#fff', fontFamily: "'DM Sans', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'border-color .15s' }}
                onFocus={e => e.target.style.borderColor = 'rgba(0,194,168,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.25)', fontSize: '13px' }}>
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.remember} onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))} style={{ accentColor: '#00C2A8', cursor: 'pointer' }} />
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>Recordarme</span>
            </label>
            <button style={{ background: 'none', border: 'none', fontSize: '12px', color: '#00C2A8', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>¿Olvidaste tu contraseña?</button>
          </div>

          {error && (
            <div style={{ background: 'rgba(229,82,82,0.08)', border: '1px solid rgba(229,82,82,0.25)', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#FCA5A5', marginBottom: '14px' }}>⚠ {error}</div>
          )}

          <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', height: '46px', background: loading ? 'rgba(0,194,168,0.5)' : '#00C2A8', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 700, color: '#060C16', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all .2s' }}>
            {loading ? 'Ingresando...' : 'Ingresar a NEXO →'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '11px', color: 'rgba(255,255,255,0.15)' }}>
            NEXO · Plataforma O2P · powered by instamovil.com
          </div>
        </div>
      </div>
    </div>
  )
}
