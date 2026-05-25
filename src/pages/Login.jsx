import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function O2PDiagram() {
  return (
    <div style={{ position: 'relative', width: '320px', height: '320px', margin: '0 auto 28px' }}>
      <style>{`
        @keyframes spin  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)}  }
        @keyframes spinR { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
        @keyframes glowP { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes nodeP { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.1)} }
        .lspin  { animation: spin  24s linear infinite; transform-origin:160px 160px; }
        .lspinr { animation: spinR 18s linear infinite; transform-origin:160px 160px; }
        .lglow  { animation: glowP 2s ease-in-out infinite; }
        .lnode  { position:absolute; transform:translate(-50%,-50%); animation:nodeP 3s ease-in-out infinite; }
        .lnode:nth-child(1){animation-delay:0s}   .lnode:nth-child(2){animation-delay:.5s}
        .lnode:nth-child(3){animation-delay:1s}   .lnode:nth-child(4){animation-delay:1.5s}
        .lnode:nth-child(5){animation-delay:2s}   .lnode:nth-child(6){animation-delay:2.5s}
      `}</style>
      <svg width="320" height="320" viewBox="0 0 320 320" style={{ position:'absolute', inset:0, overflow:'visible' }}>
        <g className="lspin">
          <circle cx="160" cy="160" r="134" fill="none" stroke="rgba(0,194,168,0.06)" strokeWidth="1"/>
          <circle cx="160" cy="160" r="134" fill="none" stroke="rgba(0,194,168,0.14)" strokeWidth="1" strokeDasharray="4 16" strokeLinecap="round"/>
        </g>
        <circle cx="160" cy="160" r="112" fill="none" stroke="rgba(14,77,146,0.2)" strokeWidth="1"/>
        <g className="lspinr">
          <circle cx="160" cy="160" r="112" fill="none" stroke="rgba(0,194,168,0.5)" strokeWidth="2" strokeDasharray="60 643" strokeLinecap="round"/>
        </g>
        <circle cx="160" cy="160" r="64" fill="none" stroke="rgba(0,194,168,0.07)" strokeWidth="1"/>
        {[[160,48,160,96],[256,104,216,130],[256,216,216,190],[160,272,160,224],[64,216,104,190],[64,104,104,130]].map(([x1,y1,x2,y2],i)=>(
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,194,168,0.08)" strokeWidth="1" strokeDasharray="3 4"/>
        ))}
        <circle cx="160" cy="160" r="46" fill="rgba(0,194,168,0.05)" stroke="rgba(0,194,168,0.25)" strokeWidth="1.5" className="lglow"/>
        <circle cx="160" cy="160" r="33" fill="rgba(6,12,22,0.95)" stroke="rgba(0,194,168,0.12)" strokeWidth="1"/>
      </svg>
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center' }}>
        <div style={{ fontFamily:"'Fraunces',serif", fontSize:'18px', fontWeight:900, color:'#fff', lineHeight:1 }}>NEX<span style={{color:'#00F5A0'}}>O</span></div>
        <div style={{ fontSize:'7px', color:'rgba(0,194,168,0.5)', letterSpacing:'2.5px', textTransform:'uppercase', marginTop:'2px' }}>O2P</div>
      </div>
      {[
        { x:160, y:48,  border:'rgba(0,194,168,0.5)',  stroke:'#00F5A0', label:'OC',        icon:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></> },
        { x:256, y:104, border:'rgba(14,77,146,0.5)',  stroke:'#378ADD', label:'ASN',       icon:<><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></> },
        { x:256, y:216, border:'rgba(14,77,146,0.5)',  stroke:'#378ADD', label:'AR',        icon:<><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></> },
        { x:160, y:272, border:'rgba(14,77,146,0.5)',  stroke:'#378ADD', label:'DEV',       icon:<><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></> },
        { x:64,  y:216, border:'rgba(14,77,146,0.5)',  stroke:'#378ADD', label:'FAC',       icon:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></> },
        { x:64,  y:104, border:'rgba(0,194,168,0.5)',  stroke:'#00F5A0', label:'PAG',       icon:<><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></> },
      ].map((n,i)=>(
        <div key={i} className="lnode" style={{ left:n.x, top:n.y }}>
          <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:'rgba(6,12,22,0.95)', border:`1.5px solid ${n.border}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={n.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{n.icon}</svg>
          </div>
          <div style={{ textAlign:'center', marginTop:'4px', fontSize:'8px', color:'rgba(255,255,255,0.35)', fontWeight:600, letterSpacing:'.5px' }}>{n.label}</div>
        </div>
      ))}
    </div>
  )
}

const ROLES = {
  proveedor: {
    label:      'Proveedor',
    sublabel:   'Vendedor / Fabricante',
    desc:       'Gestiona órdenes de compra, despachos y facturación hacia tus retails.',
    accent:     '#00F5A0',
    accentBg:   'rgba(0,245,160,0.08)',
    accentBorder:'rgba(0,245,160,0.25)',
    demo:       { email:'arca@nexo.pe', password:'demo1234' },
    demoLabel:  'Arca Continental',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  retail: {
    label:      'Retail',
    sublabel:   'Comprador / Cadena',
    desc:       'Emite órdenes de compra, confirma recepciones y gestiona pagos a proveedores.',
    accent:     '#60A5FA',
    accentBg:   'rgba(96,165,250,0.08)',
    accentBorder:'rgba(96,165,250,0.25)',
    demo:       { email:'wong@nexo.pe', password:'demo1234' },
    demoLabel:  'Wong S.A.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
}

export default function Login() {
  const navigate  = useNavigate()
  const [role, setRole]       = useState(null)           // null | 'proveedor' | 'retail'
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const r = role ? ROLES[role] : null

  const fillDemo = () => {
    if (!r) return
    setEmail(r.demo.email)
    setPassword(r.demo.password)
  }

  const handleLogin = () => {
    if (!role)              { setError('Selecciona tu tipo de acceso primero.'); return }
    if (!email || !password){ setError('Completa todos los campos.'); return }
    setError(''); setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard', { state: { role, company: r.demoLabel } })
    }, 1200)
  }

  return (
    <div style={{ minHeight:'100vh', background:'#060C16', display:'flex', fontFamily:"'DM Sans',sans-serif", position:'relative', overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes roleIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .login-anim  { animation: fadeUp .6s ease both; }
        .role-anim   { animation: roleIn .25s ease both; }
        .login-left  { flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:40px; position:relative; z-index:1; border-right:1px solid rgba(255,255,255,0.04); }
        .login-right { width:460px; flex-shrink:0; display:flex; align-items:center; justify-content:center; padding:40px; position:relative; z-index:1; }
        @media(max-width:768px){.login-left{display:none!important} .login-right{width:100%}}
        input::placeholder{color:rgba(255,255,255,0.2)}
        .role-card { cursor:pointer; border-radius:12px; padding:14px 16px; border:1.5px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02); transition:all .2s; display:flex; align-items:center; gap:12px; }
        .role-card:hover { background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.12); }
      `}</style>

      {/* BG */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize:'48px 48px', pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'-200px', left:'20%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,194,168,0.05) 0%,transparent 70%)', pointerEvents:'none' }} />

      {/* LEFT */}
      <div className="login-left">
        <div style={{ marginBottom:'8px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px' }}>
            <img src="/logo.png" alt="NEXO" style={{ height:'34px', width:'34px', borderRadius:'8px' }} />
            <div>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:'20px', fontWeight:900, color:'#fff', lineHeight:1 }}>NEXO</div>
              <div style={{ fontSize:'8px', color:'rgba(255,255,255,0.25)', letterSpacing:'2px', textTransform:'uppercase' }}>O2P Platform · Perú</div>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', padding:'4px 10px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'20px', width:'fit-content' }}>
            <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#00F5A0', flexShrink:0 }} />
            <span style={{ fontSize:'9px', color:'rgba(255,255,255,0.35)', letterSpacing:'.5px' }}>Una solución de</span>
            <span style={{ fontSize:'9px', color:'rgba(255,255,255,0.6)', fontWeight:600, letterSpacing:'.5px' }}>instamovil.com</span>
          </div>
          <div style={{ marginTop:'12px', textAlign:'center', fontSize:'9px', color:'rgba(255,255,255,0.18)', lineHeight:1.6 }}>
            NEXO es la plataforma O2P de instamovil<br/>para conectar proveedores y retails en Latinoamérica
          </div>
        </div>

        <O2PDiagram />

        {/* Stats */}
        <div style={{ fontSize:'8px', color:'rgba(255,255,255,0.2)', letterSpacing:'1.5px', textTransform:'uppercase', textAlign:'center', marginBottom:'8px', fontWeight:500 }}>instamovil en números</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1px', background:'rgba(255,255,255,0.05)', borderRadius:'10px', overflow:'hidden', width:'320px', marginBottom:'16px' }}>
          {[['10M+','Transacciones digitales'],['+ 12','Servicios integrados']].map(([v,l])=>(
            <div key={l} style={{ background:'#060C16', padding:'12px', textAlign:'center' }}>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:'17px', fontWeight:900, color:'#00F5A0' }}>{v}</div>
              <div style={{ fontSize:'8px', color:'rgba(255,255,255,0.25)', marginTop:'2px', textTransform:'uppercase', letterSpacing:'.5px' }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Regions */}
        <div style={{ width:'320px' }}>
          <div style={{ fontSize:'8px', color:'rgba(255,255,255,0.2)', letterSpacing:'1.5px', textTransform:'uppercase', textAlign:'center', marginBottom:'10px', fontWeight:500 }}>Presencia global</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'6px' }}>
            {[
              { region:'Latinoamérica', icon:'🌎', color:'rgba(0,245,160,0.15)', border:'rgba(0,245,160,0.2)', text:'#00F5A0' },
              { region:'Medio Oriente', icon:'🌍', color:'rgba(251,191,36,0.1)',  border:'rgba(251,191,36,0.2)',  text:'#FBBF24' },
              { region:'África',        icon:'🌍', color:'rgba(96,165,250,0.1)',  border:'rgba(96,165,250,0.2)',  text:'#60A5FA' },
              { region:'Asia',          icon:'🌏', color:'rgba(167,139,250,0.1)', border:'rgba(167,139,250,0.2)', text:'#A78BFA' },
            ].map(r => (
              <div key={r.region} style={{ background:r.color, border:`1px solid ${r.border}`, borderRadius:'8px', padding:'8px 6px', textAlign:'center' }}>
                <div style={{ fontSize:'18px', marginBottom:'4px', lineHeight:1 }}>{r.icon}</div>
                <div style={{ fontSize:'8px', color:r.text, fontWeight:600, lineHeight:1.3, letterSpacing:'.2px' }}>{r.region}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="login-right">
        <div style={{ width:'100%', maxWidth:'380px' }} className="login-anim">

          {/* Header */}
          <div style={{ marginBottom:'28px' }}>
            <div style={{ fontSize:'10px', color:'rgba(0,194,168,0.7)', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'6px', fontWeight:600 }}>Acceso seguro</div>
            <div style={{ fontFamily:"'Fraunces',serif", fontSize:'26px', fontWeight:900, color:'#fff', marginBottom:'4px', lineHeight:1.1 }}>
              {role ? `Hola, ${r.label}` : 'Iniciar sesión'}
            </div>
            <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.3)' }}>
              {role ? r.desc : 'Selecciona tu tipo de acceso para continuar'}
            </div>
          </div>

          {/* ── STEP 1: Role selector ── */}
          {!role && (
            <div className="role-anim">
              <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'24px' }}>
                {Object.entries(ROLES).map(([key, cfg]) => (
                  <div key={key} className="role-card" onClick={() => { setRole(key); setError('') }}
                    style={{ cursor:'pointer', borderRadius:'12px', padding:'16px 18px', border:`1.5px solid rgba(255,255,255,0.07)`, background:'rgba(255,255,255,0.02)', transition:'all .2s', display:'flex', alignItems:'center', gap:'14px' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = cfg.accentBorder; e.currentTarget.style.background = cfg.accentBg }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                  >
                    <div style={{ width:'40px', height:'40px', borderRadius:'10px', background: cfg.accentBg, border:`1px solid ${cfg.accentBorder}`, display:'flex', alignItems:'center', justifyContent:'center', color:cfg.accent, flexShrink:0 }}>
                      {cfg.icon}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'14px', fontWeight:600, color:'#fff', marginBottom:'2px' }}>{cfg.label}</div>
                      <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.35)' }}>{cfg.sublabel}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                ))}
              </div>

              <div style={{ textAlign:'center', fontSize:'11px', color:'rgba(255,255,255,0.15)' }}>
                NEXO · Plataforma O2P · powered by instamovil.com
              </div>
            </div>
          )}

          {/* ── STEP 2: Form ── */}
          {role && (
            <div className="role-anim">

              {/* Role badge */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', padding:'6px 12px', borderRadius:'20px', background: r.accentBg, border:`1px solid ${r.accentBorder}` }}>
                  <div style={{ color: r.accent, display:'flex' }}>{r.icon}</div>
                  <span style={{ fontSize:'12px', fontWeight:600, color: r.accent }}>{r.label}</span>
                  <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)' }}>· {r.sublabel}</span>
                </div>
                <button onClick={() => { setRole(null); setEmail(''); setPassword(''); setError('') }}
                  style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', background:'none', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                  Cambiar ↩
                </button>
              </div>

              {/* Demo banner */}
              <div style={{ background: r.accentBg, border:`1px solid ${r.accentBorder}`, borderRadius:'10px', padding:'10px 14px', marginBottom:'20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div>
                  <div style={{ fontSize:'9px', color: r.accent, fontWeight:600, letterSpacing:'1px', textTransform:'uppercase', marginBottom:'2px' }}>Acceso demo</div>
                  <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)' }}>{r.demoLabel}</div>
                </div>
                <button onClick={fillDemo}
                  style={{ fontSize:'11px', fontWeight:600, padding:'5px 12px', borderRadius:'7px', border:`1px solid ${r.accentBorder}`, background:'rgba(255,255,255,0.05)', color: r.accent, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                  Autocompletar
                </button>
              </div>

              {/* Divider */}
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'18px' }}>
                <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.06)' }} />
                <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.2)', letterSpacing:'1px', textTransform:'uppercase' }}>o con tu cuenta</span>
                <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.06)' }} />
              </div>

              {/* Email */}
              <div style={{ marginBottom:'12px' }}>
                <label style={{ fontSize:'10px', fontWeight:600, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'6px' }}>Correo electrónico</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} placeholder={`usuario@${role==='proveedor'?'arca':'wong'}.com.pe`}
                  style={{ width:'100%', height:'44px', background:'rgba(255,255,255,0.04)', border:`1px solid ${email ? r.accentBorder : 'rgba(255,255,255,0.08)'}`, borderRadius:'10px', padding:'0 14px', fontSize:'13px', color:'#fff', fontFamily:"'DM Sans',sans-serif", outline:'none', boxSizing:'border-box', transition:'border-color .15s' }}
                  onFocus={e=>e.target.style.borderColor=r.accentBorder}
                  onBlur={e=>e.target.style.borderColor=email?r.accentBorder:'rgba(255,255,255,0.08)'} />
              </div>

              {/* Password */}
              <div style={{ marginBottom:'16px' }}>
                <label style={{ fontSize:'10px', fontWeight:600, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'6px' }}>Contraseña</label>
                <div style={{ position:'relative' }}>
                  <input type={showPass?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} placeholder="••••••••"
                    style={{ width:'100%', height:'44px', background:'rgba(255,255,255,0.04)', border:`1px solid ${password?r.accentBorder:'rgba(255,255,255,0.08)'}`, borderRadius:'10px', padding:'0 44px 0 14px', fontSize:'13px', color:'#fff', fontFamily:"'DM Sans',sans-serif", outline:'none', boxSizing:'border-box', transition:'border-color .15s' }}
                    onFocus={e=>e.target.style.borderColor=r.accentBorder}
                    onBlur={e=>e.target.style.borderColor=password?r.accentBorder:'rgba(255,255,255,0.08)'} />
                  <button onClick={()=>setShowPass(!showPass)} style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.25)', fontSize:'13px' }}>
                    {showPass?'🙈':'👁'}
                  </button>
                </div>
              </div>

              {/* Remember / forgot */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
                <label style={{ display:'flex', alignItems:'center', gap:'7px', cursor:'pointer' }}>
                  <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} style={{ accentColor: r.accent, cursor:'pointer' }} />
                  <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.3)' }}>Recordarme</span>
                </label>
                <button style={{ background:'none', border:'none', fontSize:'12px', color: r.accent, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>¿Olvidaste tu contraseña?</button>
              </div>

              {/* Error */}
              {error && (
                <div style={{ background:'rgba(229,82,82,0.08)', border:'1px solid rgba(229,82,82,0.2)', borderRadius:'8px', padding:'10px 14px', fontSize:'12px', color:'#FCA5A5', marginBottom:'14px' }}>⚠ {error}</div>
              )}

              {/* Submit */}
              <button onClick={handleLogin} disabled={loading}
                style={{ width:'100%', height:'46px', background: loading ? `${r.accent}80` : r.accent, border:'none', borderRadius:'10px', fontSize:'14px', fontWeight:700, color:'#060C16', cursor: loading?'not-allowed':'pointer', fontFamily:"'DM Sans',sans-serif", transition:'all .2s', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>
                {loading
                  ? <><span style={{ width:'14px', height:'14px', border:'2px solid rgba(0,0,0,0.3)', borderTopColor:'#060C16', borderRadius:'50%', display:'inline-block', animation:'lspin .7s linear infinite' }} />Ingresando...</>
                  : `Ingresar como ${r.label} →`
                }
              </button>

              <div style={{ textAlign:'center', marginTop:'24px', fontSize:'11px', color:'rgba(255,255,255,0.12)' }}>
                NEXO · Plataforma O2P · powered by instamovil.com
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
