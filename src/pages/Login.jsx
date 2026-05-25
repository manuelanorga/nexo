import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ROLES = {
  proveedor: {
    label:       'Proveedor',
    sublabel:    'Vendedor / Fabricante',
    desc:        'Gestiona órdenes de compra, despachos y facturación hacia tus retails.',
    accent:      '#00F5A0',
    accentBg:    'rgba(0,245,160,0.08)',
    accentBorder:'rgba(0,245,160,0.25)',
    demo:        { email:'arca@nexo.pe', password:'demo1234' },
    demoLabel:   'Arca Continental',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  retail: {
    label:       'Retail',
    sublabel:    'Comprador / Cadena',
    desc:        'Emite órdenes de compra, confirma recepciones y gestiona pagos a proveedores.',
    accent:      '#60A5FA',
    accentBg:    'rgba(96,165,250,0.08)',
    accentBorder:'rgba(96,165,250,0.25)',
    demo:        { email:'wong@nexo.pe', password:'demo1234' },
    demoLabel:   'Wong S.A.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
}

const NODES = [
  { x:160, y:52,  delay:'0s',   accent:'#00F5A0', border:'rgba(0,245,160,0.5)', shadow:'rgba(0,245,160,0.25)', pulse:true,  label:['Orden de','Compra'],
    icon:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></> },
  { x:248, y:106, delay:'.5s',  accent:'#378ADD', border:'rgba(55,138,221,0.5)', shadow:'rgba(55,138,221,0.2)', pulse:false, label:['Aviso','Despacho'],
    icon:<><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></> },
  { x:248, y:214, delay:'1s',   accent:'#378ADD', border:'rgba(55,138,221,0.5)', shadow:'rgba(55,138,221,0.2)', pulse:false, label:['Aviso de','Recibo'],
    icon:<><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></> },
  { x:160, y:268, delay:'1.5s', accent:'#378ADD', border:'rgba(55,138,221,0.5)', shadow:'rgba(55,138,221,0.2)', pulse:false, label:['Devoluciones'],
    icon:<><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></> },
  { x:72,  y:214, delay:'2s',   accent:'#378ADD', border:'rgba(55,138,221,0.5)', shadow:'rgba(55,138,221,0.2)', pulse:false, label:['Facturación'],
    icon:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/></> },
  { x:72,  y:106, delay:'2.5s', accent:'#00F5A0', border:'rgba(0,245,160,0.5)', shadow:'rgba(0,245,160,0.25)', pulse:true,  label:['Cobro'],
    icon:<><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></> },
]

const REGIONS = [
  { region:'Latinoamérica', darkC:'#00F5A0', darkBg:'rgba(0,245,160,0.1)',   darkBd:'rgba(0,245,160,0.2)',   lightC:'#16A34A', lightBg:'rgba(22,163,74,0.06)',   lightBd:'#BBF7D0', shape:'M16 10 C14 12 13 16 14 20 C15 24 17 26 18 27 C19 25 20 22 20 19 C20 15 19 12 18 10 Z' },
  { region:'Medio Oriente', darkC:'#FBBF24', darkBg:'rgba(251,191,36,0.1)',  darkBd:'rgba(251,191,36,0.2)',  lightC:'#D97706', lightBg:'rgba(217,119,6,0.06)',    lightBd:'#FDE68A', shape:'M17 12 C19 13 21 15 21 17 C21 19 20 21 18 22 C17 21 16 19 16 17 C16 15 16 13 17 12 Z' },
  { region:'África',        darkC:'#60A5FA', darkBg:'rgba(96,165,250,0.1)',  darkBd:'rgba(96,165,250,0.2)',  lightC:'#2563EB', lightBg:'rgba(37,99,235,0.06)',    lightBd:'#BFDBFE', shape:'M16 10 C14 11 13 14 14 17 C15 20 17 23 18 25 C19 23 20 20 20 17 C20 14 19 11 18 10 Z' },
  { region:'Asia',          darkC:'#A78BFA', darkBg:'rgba(167,139,250,0.1)', darkBd:'rgba(167,139,250,0.2)', lightC:'#7C3AED', lightBg:'rgba(124,58,237,0.06)',   lightBd:'#DDD6FE', shape:'M15 11 C18 11 21 13 22 16 C23 19 21 22 19 23 C17 22 15 20 15 17 C14 15 14 12 15 11 Z' },
]

function O2PDiagram() {
  return (
    <div style={{ position:'relative', width:'320px', height:'320px', margin:'0 auto 20px' }}>
      <style>{`
        @keyframes spin        { from{transform:rotate(0deg)}   to{transform:rotate(360deg)}  }
        @keyframes spinR       { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
        @keyframes breathe     { 0%,100%{opacity:.4;transform:scale(1)}   50%{opacity:1;transform:scale(1.06)}  }
        @keyframes breatheSlow { 0%,100%{opacity:.12;transform:scale(1)}  50%{opacity:.3;transform:scale(1.03)} }
        @keyframes nodeFloat   { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-5px)} }
        @keyframes pulseRing   { 0%{transform:translate(-50%,-50%) scale(.85);opacity:.9} 100%{transform:translate(-50%,-50%) scale(2.4);opacity:0} }
        @keyframes lineFlow    { 0%{stroke-dashoffset:30} 100%{stroke-dashoffset:0} }
        @keyframes fadeLabel   { 0%,100%{opacity:.35} 50%{opacity:.85} }
        .d-node       { position:absolute; transform:translate(-50%,-50%); }
        .d-node-inner { width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center; position:relative; transition:transform .2s; }
        .d-node-inner:hover { transform:scale(1.18) !important; }
        .d-pulse      { position:absolute; inset:-5px; border-radius:16px; border:1px solid currentColor; pointer-events:none; }
        .d-label      { position:absolute; top:calc(100% + 6px); left:50%; transform:translateX(-50%); font-size:8px; font-weight:600; letter-spacing:.4px; white-space:nowrap; text-align:center; line-height:1.4; animation:fadeLabel 3s ease-in-out infinite; }
      `}</style>

      <svg width="320" height="320" viewBox="0 0 320 320" style={{ position:'absolute', inset:0, overflow:'visible' }}>
        <defs>
          <radialGradient id="cg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,194,168,0.12)"/>
            <stop offset="100%" stopColor="rgba(0,194,168,0)"/>
          </radialGradient>
          <linearGradient id="ag1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,245,160,0)"/>
            <stop offset="50%" stopColor="rgba(0,245,160,0.95)"/>
            <stop offset="100%" stopColor="rgba(0,245,160,0)"/>
          </linearGradient>
          <filter id="gl"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="gls"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        <circle cx="160" cy="160" r="145" fill="url(#cg)" style={{ animation:'breatheSlow 4s ease-in-out infinite' }}/>

        <g style={{ transformOrigin:'160px 160px', animation:'spin 40s linear infinite' }}>
          <circle cx="160" cy="160" r="142" fill="none" stroke="rgba(0,194,168,0.05)" strokeWidth="1"/>
          <circle cx="160" cy="160" r="142" fill="none" stroke="rgba(0,194,168,0.1)" strokeWidth="1" strokeDasharray="3 20" strokeLinecap="round"/>
        </g>

        <circle cx="160" cy="160" r="108" fill="none" stroke="rgba(0,194,168,0.1)" strokeWidth="1.5"/>

        <g style={{ transformOrigin:'160px 160px', animation:'spin 8s linear infinite' }}>
          <circle cx="160" cy="160" r="108" fill="none" stroke="url(#ag1)" strokeWidth="2.5" strokeDasharray="85 593" strokeLinecap="round" filter="url(#gl)"/>
        </g>

        <g style={{ transformOrigin:'160px 160px', animation:'spinR 14s linear infinite' }}>
          <circle cx="160" cy="160" r="108" fill="none" stroke="rgba(55,138,221,0.55)" strokeWidth="1.5" strokeDasharray="50 629" strokeLinecap="round" filter="url(#gl)"/>
        </g>

        <g style={{ transformOrigin:'160px 160px', animation:'spin 8s linear infinite' }}>
          <circle cx="160" cy="52" r="4.5" fill="#00F5A0" filter="url(#gls)" opacity=".95"/>
        </g>

        <g style={{ transformOrigin:'160px 160px', animation:'spinR 14s linear infinite' }}>
          <circle cx="160" cy="52" r="3" fill="#378ADD" filter="url(#gl)" opacity=".85"/>
        </g>

        <circle cx="160" cy="160" r="60" fill="none" stroke="rgba(0,194,168,0.07)" strokeWidth="1" style={{ animation:'breatheSlow 3s ease-in-out infinite' }}/>

        {[['M160,52 L160,100',0],['M248,106 L212,130',0.3],['M248,214 L212,190',0.6],['M160,268 L160,220',0.9],['M72,214 L108,190',1.2],['M72,106 L108,130',1.5]].map(([d,delay]) => (
          <path key={d} d={d} stroke="rgba(0,194,168,0.18)" strokeWidth="1" strokeDasharray="12 12" strokeLinecap="round"
            style={{ animation:`lineFlow 1.8s linear ${delay}s infinite alternate` }}/>
        ))}

        {[[160,52,160,100],[248,106,212,130],[248,214,212,190],[160,268,160,220],[72,214,108,190],[72,106,108,130]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,194,168,0.05)" strokeWidth="1"/>
        ))}

        <circle cx="160" cy="160" r="50" fill="rgba(0,194,168,0.04)" stroke="rgba(0,194,168,0.22)" strokeWidth="1.5" style={{ animation:'breathe 2.5s ease-in-out infinite' }}/>
        <circle cx="160" cy="160" r="50" fill="none" stroke="rgba(0,194,168,0.06)" strokeWidth="10" style={{ animation:'breathe 2.5s ease-in-out infinite' }}/>
        <circle cx="160" cy="160" r="35" fill="rgba(6,12,22,0.98)" stroke="rgba(0,194,168,0.18)" strokeWidth="1"/>
      </svg>

      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center', zIndex:10 }}>
        <div style={{ fontFamily:"'Fraunces',serif", fontSize:'20px', fontWeight:900, color:'#fff', lineHeight:1 }}>NEX<span style={{ color:'#00F5A0' }}>O</span></div>
        <div style={{ fontSize:'7px', color:'rgba(0,194,168,0.5)', letterSpacing:'3px', textTransform:'uppercase', marginTop:'3px' }}>O2P</div>
      </div>

      {NODES.map((n, i) => (
        <div key={i} className="d-node" style={{ left:n.x, top:n.y, animation:`nodeFloat 3.5s ease-in-out ${n.delay} infinite` }}>
          {n.pulse && <div className="d-pulse" style={{ color:n.border, animation:'pulseRing 2.4s ease-out infinite' }}/>}
          {n.pulse && <div className="d-pulse" style={{ color:n.border, animation:'pulseRing 2.4s ease-out .8s infinite' }}/>}
          <div className="d-node-inner" style={{ background:'rgba(6,12,22,0.97)', border:`1.5px solid ${n.border}`, boxShadow:`0 0 14px ${n.shadow}, inset 0 1px 0 rgba(255,255,255,0.05)` }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={n.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {n.icon}
            </svg>
          </div>
          <div className="d-label" style={{ color:n.accent, animationDelay:n.delay }}>
            {n.label.map((line, j) => <div key={j}>{line}</div>)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Login() {
  const navigate    = useNavigate()
  const [role, setRole]         = useState(null)
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [dark, setDark]         = useState(true)
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const r = role ? ROLES[role] : null

  const bg      = dark ? '#060C16'               : '#FAFAF9'
  const bgPanel = dark ? '#060C16'               : '#FFFFFF'
  const bgLeft  = dark ? '#060C16'               : '#FAFAF9'
  const fg      = dark ? '#fff'                  : '#111'
  const fg2     = dark ? 'rgba(255,255,255,0.35)': '#6B7280'
  const fg3     = dark ? 'rgba(255,255,255,0.2)' : '#9CA3AF'
  const bord    = dark ? 'rgba(255,255,255,0.08)': 'rgba(0,0,0,0.08)'
  const bordL   = dark ? 'rgba(255,255,255,0.04)': 'rgba(0,0,0,0.06)'
  const statBg  = dark ? '#060C16'               : '#FFFFFF'
  const statGrd = dark ? 'rgba(255,255,255,0.05)': 'rgba(0,0,0,0.06)'
  const inputBg = dark ? 'rgba(255,255,255,0.04)': 'rgba(0,0,0,0.03)'

  const fillDemo  = () => { if (!r) return; setEmail(r.demo.email); setPassword(r.demo.password) }

  const handleLogin = () => {
    if (!role)               { setError('Selecciona tu tipo de acceso primero.'); return }
    if (!email || !password) { setError('Completa todos los campos.'); return }
    setError(''); setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/dashboard', { state: { role, company: r.demoLabel } }) }, 1200)
  }

  return (
    <div style={{ minHeight:'100vh', background:bg, display:'flex', fontFamily:"'DM Sans',sans-serif", position:'relative', overflow:'hidden', transition:'background .3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes roleIn  { from{opacity:0;transform:translateY(6px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes lspin   { to{transform:rotate(360deg)} }
        .login-anim { animation:fadeUp .6s ease both; }
        .role-anim  { animation:roleIn .25s ease both; }
        .login-left { flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:40px; position:relative; z-index:1; }
        .login-right{ width:460px; flex-shrink:0; display:flex; align-items:center; justify-content:center; padding:40px; position:relative; z-index:1; }
        @media(max-width:768px){.login-left{display:none!important} .login-right{width:100%}}
        input::placeholder{color:rgba(255,255,255,0.2)}
      `}</style>

      <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${dark?'rgba(255,255,255,0.015)':'rgba(0,0,0,0.03)'} 1px,transparent 1px),linear-gradient(90deg,${dark?'rgba(255,255,255,0.015)':'rgba(0,0,0,0.03)'} 1px,transparent 1px)`, backgroundSize:'48px 48px', pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'-200px', left:'20%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,194,168,0.05) 0%,transparent 70%)', pointerEvents:'none' }} />

      {/* ── LEFT PANEL ── */}
      <div className="login-left" style={{ background:bgLeft, borderRight:`1px solid ${bordL}` }}>
        <div style={{ marginBottom:'8px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px' }}>
            <img src="/logo.png" alt="NEXO" style={{ height:'34px', width:'34px', borderRadius:'8px' }} />
            <div>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:'20px', fontWeight:900, color:fg, lineHeight:1 }}>NEXO</div>
              <div style={{ fontSize:'8px', color:fg3, letterSpacing:'2px', textTransform:'uppercase' }}>O2P Platform · Perú</div>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', padding:'4px 10px', background:dark?'rgba(255,255,255,0.03)':'rgba(0,194,168,0.06)', border:dark?'1px solid rgba(255,255,255,0.07)':'1px solid rgba(0,194,168,0.15)', borderRadius:'20px', width:'fit-content' }}>
            <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#00F5A0', flexShrink:0 }} />
            <span style={{ fontSize:'9px', color:fg2, letterSpacing:'.5px' }}>Una solución de</span>
            <span style={{ fontSize:'9px', color:dark?'rgba(255,255,255,0.6)':'#00C2A8', fontWeight:600, letterSpacing:'.5px' }}>instamovil.com</span>
          </div>
          <div style={{ marginTop:'10px', textAlign:'center', fontSize:'9px', color:fg3, lineHeight:1.6 }}>
            NEXO es la plataforma O2P de instamovil<br/>para conectar proveedores y retails en Latinoamérica
          </div>
        </div>

        <O2PDiagram />

        <div style={{ fontSize:'8px', color:fg3, letterSpacing:'1.5px', textTransform:'uppercase', textAlign:'center', marginBottom:'8px', fontWeight:500 }}>instamovil en números</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:statGrd, borderRadius:'10px', overflow:'hidden', width:'320px', marginBottom:'16px' }}>
          {[['+10M','Transacciones mensuales'],['+12','Servicios integrados'],['5','Soluciones digitales']].map(([v,l]) => (
            <div key={l} style={{ background:statBg, padding:'12px', textAlign:'center' }}>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:'17px', fontWeight:900, color:dark?'#00F5A0':'#00C2A8' }}>{v}</div>
              <div style={{ fontSize:'8px', color:fg3, marginTop:'2px', textTransform:'uppercase', letterSpacing:'.5px' }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ width:'320px' }}>
          <div style={{ fontSize:'8px', color:fg3, letterSpacing:'1.5px', textTransform:'uppercase', textAlign:'center', marginBottom:'10px', fontWeight:500 }}>Red global · instamovil.com</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'6px' }}>
            {REGIONS.map(reg => {
              const rc  = dark ? reg.darkC  : reg.lightC
              const rb  = dark ? reg.darkBg : reg.lightBg
              const rbd = dark ? reg.darkBd : reg.lightBd
              return (
                <div key={reg.region} style={{ background:rb, border:`1px solid ${rbd}`, borderRadius:'8px', padding:'8px 4px', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'5px' }}>
                  <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="13" stroke={rc} strokeWidth="1.2" fill={rb}/>
                    <ellipse cx="18" cy="18" rx="5.5" ry="13" stroke={rc} strokeWidth="0.9" opacity=".45"/>
                    <line x1="5" y1="18" x2="31" y2="18" stroke={rc} strokeWidth="0.9" opacity=".35"/>
                    <line x1="7" y1="12" x2="29" y2="12" stroke={rc} strokeWidth="0.7" opacity=".2"/>
                    <line x1="7" y1="24" x2="29" y2="24" stroke={rc} strokeWidth="0.7" opacity=".2"/>
                    <path d={reg.shape} fill={rc} opacity=".28"/>
                  </svg>
                  <div style={{ fontSize:'8px', color:rc, fontWeight:600, lineHeight:1.3, letterSpacing:'.2px' }}>{reg.region}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="login-right" style={{ background:bgPanel }}>

        {/* Toggle PRO */}
        <div style={{ position:'absolute', top:'20px', right:'20px', zIndex:10 }}>
          <button onClick={() => setDark(!dark)}
            style={{ display:'flex', alignItems:'center', gap:'6px', padding:'6px 10px', background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)', border:`1px solid ${bord}`, borderRadius:'100px', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'all .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = dark?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.07)'}
            onMouseLeave={e => e.currentTarget.style.background = dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)'}
          >
            <div style={{ width:'22px', height:'22px', borderRadius:'50%', background:dark?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.06)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              {dark
                ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
                : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              }
            </div>
            <span style={{ fontSize:'11px', color:dark?'rgba(255,255,255,0.4)':'#6B7280', fontWeight:500 }}>{dark ? 'Modo claro' : 'Modo oscuro'}</span>
            <span style={{ fontSize:'9px', color:fg3 }}>›</span>
          </button>
        </div>

        <div style={{ width:'100%', maxWidth:'380px' }} className="login-anim">

          <div style={{ marginBottom:'28px' }}>
            <div style={{ fontSize:'10px', color:'#00C2A8', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'6px', fontWeight:600 }}>Acceso seguro</div>
            <div style={{ fontFamily:"'Fraunces',serif", fontSize:'26px', fontWeight:900, color:fg, marginBottom:'4px', lineHeight:1.1 }}>
              {role ? `Hola, ${r.label}` : 'Iniciar sesión'}
            </div>
            <div style={{ fontSize:'13px', color:fg2 }}>
              {role ? r.desc : 'Selecciona tu tipo de acceso para continuar'}
            </div>
          </div>

          {/* STEP 1 — Selector de rol */}
          {!role && (
            <div className="role-anim">
              <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'24px' }}>
                {Object.entries(ROLES).map(([key, cfg]) => (
                  <div key={key} onClick={() => { setRole(key); setError('') }}
                    style={{ cursor:'pointer', borderRadius:'12px', padding:'16px 18px', border:`1.5px solid ${dark?'rgba(255,255,255,0.07)':bord}`, background:dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.02)', transition:'all .2s', display:'flex', alignItems:'center', gap:'14px' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=cfg.accentBorder; e.currentTarget.style.background=cfg.accentBg; e.currentTarget.style.transform='translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor=dark?'rgba(255,255,255,0.07)':bord; e.currentTarget.style.background=dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.02)'; e.currentTarget.style.transform='translateY(0)' }}
                  >
                    <div style={{ width:'40px', height:'40px', borderRadius:'10px', background:cfg.accentBg, border:`1px solid ${cfg.accentBorder}`, display:'flex', alignItems:'center', justifyContent:'center', color:cfg.accent, flexShrink:0 }}>
                      {cfg.icon}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'14px', fontWeight:600, color:fg, marginBottom:'2px' }}>{cfg.label}</div>
                      <div style={{ fontSize:'11px', color:fg2 }}>{cfg.sublabel}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={fg3} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                ))}
              </div>
              <div style={{ textAlign:'center', fontSize:'11px', color:fg3 }}>NEXO · Plataforma O2P · powered by instamovil.com</div>
            </div>
          )}

          {/* STEP 2 — Formulario */}
          {role && (
            <div className="role-anim">

              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', padding:'6px 12px', borderRadius:'20px', background:r.accentBg, border:`1px solid ${r.accentBorder}` }}>
                  <div style={{ color:r.accent, display:'flex' }}>{r.icon}</div>
                  <span style={{ fontSize:'12px', fontWeight:600, color:r.accent }}>{r.label}</span>
                  <span style={{ fontSize:'11px', color:fg2 }}>· {r.sublabel}</span>
                </div>
                <button onClick={() => { setRole(null); setEmail(''); setPassword(''); setError('') }}
                  style={{ fontSize:'11px', color:fg2, background:'none', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                  Cambiar ↩
                </button>
              </div>

              <div style={{ background:r.accentBg, border:`1px solid ${r.accentBorder}`, borderRadius:'10px', padding:'10px 14px', marginBottom:'20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div>
                  <div style={{ fontSize:'9px', color:r.accent, fontWeight:600, letterSpacing:'1px', textTransform:'uppercase', marginBottom:'2px' }}>Acceso demo</div>
                  <div style={{ fontSize:'11px', color:fg2 }}>{r.demoLabel}</div>
                </div>
                <button onClick={fillDemo} style={{ fontSize:'11px', fontWeight:600, padding:'5px 12px', borderRadius:'7px', border:`1px solid ${r.accentBorder}`, background:'rgba(255,255,255,0.05)', color:r.accent, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                  Autocompletar
                </button>
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'18px' }}>
                <div style={{ flex:1, height:'1px', background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.07)' }} />
                <span style={{ fontSize:'10px', color:fg3, letterSpacing:'1px', textTransform:'uppercase' }}>o con tu cuenta</span>
                <div style={{ flex:1, height:'1px', background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.07)' }} />
              </div>

              <div style={{ marginBottom:'12px' }}>
                <label style={{ fontSize:'10px', fontWeight:600, color:fg2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'6px' }}>Correo electrónico</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()}
                  placeholder={`usuario@${role==='proveedor'?'arca':'wong'}.com.pe`}
                  style={{ width:'100%', height:'44px', background:inputBg, border:`1px solid ${email?r.accentBorder:bord}`, borderRadius:'10px', padding:'0 14px', fontSize:'13px', color:fg, fontFamily:"'DM Sans',sans-serif", outline:'none', boxSizing:'border-box', transition:'border-color .15s' }}
                  onFocus={e=>e.target.style.borderColor=r.accentBorder}
                  onBlur={e=>e.target.style.borderColor=email?r.accentBorder:bord} />
              </div>

              <div style={{ marginBottom:'16px' }}>
                <label style={{ fontSize:'10px', fontWeight:600, color:fg2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'6px' }}>Contraseña</label>
                <div style={{ position:'relative' }}>
                  <input type={showPass?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} placeholder="••••••••"
                    style={{ width:'100%', height:'44px', background:inputBg, border:`1px solid ${password?r.accentBorder:bord}`, borderRadius:'10px', padding:'0 44px 0 14px', fontSize:'13px', color:fg, fontFamily:"'DM Sans',sans-serif", outline:'none', boxSizing:'border-box', transition:'border-color .15s' }}
                    onFocus={e=>e.target.style.borderColor=r.accentBorder}
                    onBlur={e=>e.target.style.borderColor=password?r.accentBorder:bord} />
                  <button onClick={()=>setShowPass(!showPass)} style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:fg3, fontSize:'13px' }}>
                    {showPass?'🙈':'👁'}
                  </button>
                </div>
              </div>

              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
                <label style={{ display:'flex', alignItems:'center', gap:'7px', cursor:'pointer' }}>
                  <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} style={{ accentColor:r.accent, cursor:'pointer' }} />
                  <span style={{ fontSize:'12px', color:fg2 }}>Recordarme</span>
                </label>
                <button style={{ background:'none', border:'none', fontSize:'12px', color:r.accent, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>¿Olvidaste tu contraseña?</button>
              </div>

              {error && (
                <div style={{ background:'rgba(229,82,82,0.08)', border:'1px solid rgba(229,82,82,0.2)', borderRadius:'8px', padding:'10px 14px', fontSize:'12px', color:'#FCA5A5', marginBottom:'14px' }}>⚠ {error}</div>
              )}

              <button onClick={handleLogin} disabled={loading}
                style={{ width:'100%', height:'46px', background:loading?`${r.accent}80`:r.accent, border:'none', borderRadius:'10px', fontSize:'14px', fontWeight:700, color:'#060C16', cursor:loading?'not-allowed':'pointer', fontFamily:"'DM Sans',sans-serif", transition:'all .2s', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>
                {loading
                  ? <><span style={{ width:'14px', height:'14px', border:'2px solid rgba(0,0,0,0.3)', borderTopColor:'#060C16', borderRadius:'50%', display:'inline-block', animation:'lspin .7s linear infinite' }} />Ingresando...</>
                  : `Ingresar como ${r.label} →`
                }
              </button>

              <div style={{ textAlign:'center', marginTop:'24px', fontSize:'11px', color:fg3 }}>
                NEXO · Plataforma O2P · powered by instamovil.com
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
