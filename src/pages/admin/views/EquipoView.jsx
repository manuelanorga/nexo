import { useState } from 'react'

const ROLES_INFO = {
  'Super Admin': {
    desc: 'Acceso total a todos los módulos del panel',
    color: '#7C3AED', bg: '#F5F3FF',
    permisos: ['Dashboard', 'Tenants', 'Sistema', 'Transacciones', 'Planes & Billing', 'Mi Equipo', 'Integraciones', 'Impersonar usuarios', 'Eliminar tenants'],
  },
  'Desarrollador': {
    desc: 'Acceso técnico — sistema, logs y configuración',
    color: '#0E4D92', bg: '#EEF5FF',
    permisos: ['Dashboard', 'Sistema', 'Integraciones', 'Ver tenants (solo lectura)'],
  },
  'Comercial': {
    desc: 'Gestión de tenants y facturación',
    color: '#166534', bg: '#F0FDF4',
    permisos: ['Dashboard', 'Tenants', 'Transacciones', 'Planes & Billing'],
  },
  'Soporte': {
    desc: 'Atención a clientes e impersonación',
    color: '#C2410C', bg: '#FFF7ED',
    permisos: ['Dashboard', 'Tenants (solo lectura)', 'Impersonar usuarios', 'Ver logs Sistema'],
  },
}

const TEAM_INIT = [
  { id:1, name:'Manuel Añorga', email:'manu@instamovil.com',     rol:'Super Admin',  status:'active',  lastAccess:'hace 2 min', avatar:'MA' },
  { id:2, name:'IT',            email:'it@instamovil.com',       rol:'Desarrollador', status:'active', lastAccess:'hace 1h',    avatar:'IT' },
  { id:3, name:'Karla Acho',   email:'karla@instamovil.com',    rol:'Comercial',    status:'active',  lastAccess:'hace 3h',    avatar:'KA' },
  { id:4, name:'Soporte',      email:'soporte@instamovil.com',  rol:'Soporte',      status:'active',  lastAccess:'hace 5h',    avatar:'SP' },
]

const SC = { active:'#10B981', invited:'#F59E0B', blocked:'#EF4444' }
const SB = { active:'#F0FDF4', invited:'#FFFBEB', blocked:'#FEF2F2' }
const ST = { active:'#166534', invited:'#92400E', blocked:'#991B1B' }
const SL = { active:'Activo', invited:'Invitado', blocked:'Bloqueado' }

export default function EquipoView({ accent, accentBg, text, text2, text3, border, white, bg }) {
  const [team, setTeam]           = useState(TEAM_INIT)
  const [showInvite, setShowInvite] = useState(false)
  const [showRolTip, setShowRolTip] = useState(null)
  const [sent, setSent]           = useState(false)
  const [hovRow, setHovRow]       = useState(null)
  const [form, setForm]           = useState({ name:'', email:'', rol:'Comercial' })

  const card = { background:white, border:`1px solid ${border}`, borderRadius:'10px' }
  const inp  = { width:'100%', padding:'8px 12px', border:`1px solid ${border}`, borderRadius:'8px', fontSize:'13px', fontFamily:"'Inter',sans-serif", color:text, outline:'none', boxSizing:'border-box', background:white }

  const handleInvite = () => {
    if (!form.name || !form.email) return
    setSent(true)
    setTimeout(() => {
      setTeam(t => [...t, { id:Date.now(), ...form, status:'invited', lastAccess:'Nunca', avatar:form.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() }])
      setSent(false)
      setShowInvite(false)
      setForm({ name:'', email:'', rol:'Comercial' })
    }, 1500)
  }

  return (
    <div style={{ fontFamily:"'Inter',sans-serif" }}>

      {/* KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'14px' }}>
        {[
          { label:'Total miembros',   val:team.length,                              color:accent,    icon:'👥' },
          { label:'Activos',          val:team.filter(u=>u.status==='active').length, color:'#10B981', icon:'✓' },
          { label:'Invitados',        val:team.filter(u=>u.status==='invited').length, color:'#F59E0B', icon:'📧' },
          { label:'Roles distintos',  val:new Set(team.map(u=>u.rol)).size,         color:'#7C3AED', icon:'🔑' },
        ].map(m => (
          <div key={m.label} style={{ ...card, padding:'16px 18px' }}>
            <div style={{ fontSize:'18px', marginBottom:'8px' }}>{m.icon}</div>
            <div style={{ fontSize:'9px', color:text3, textTransform:'uppercase', letterSpacing:'.6px', marginBottom:'4px' }}>{m.label}</div>
            <div style={{ fontFamily:"'Fraunces',serif", fontSize:'22px', fontWeight:700, color:m.color }}>{m.val}</div>
          </div>
        ))}
      </div>

      {/* Tabla equipo */}
      <div style={{ ...card, overflow:'hidden', marginBottom:'14px' }}>
        <div style={{ padding:'12px 16px', borderBottom:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ fontSize:'12px', fontWeight:600, color:text }}>Miembros del equipo</div>
          <button onClick={() => setShowInvite(true)}
            style={{ display:'flex', alignItems:'center', gap:'5px', padding:'7px 16px', border:'none', background:accent, color:'#fff', borderRadius:'8px', fontSize:'12px', fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
            + Invitar miembro
          </button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 2fr 1.5fr .8fr 1fr 100px', gap:'8px', padding:'8px 16px', background:'#FAFAF9', borderBottom:`1px solid ${border}` }}>
          {['Nombre','Email','Rol','Estado','Último acceso',''].map(h => (
            <span key={h} style={{ fontSize:'10px', color:text3, textTransform:'uppercase', letterSpacing:'.6px', fontWeight:500 }}>{h}</span>
          ))}
        </div>
        {team.map((u,i) => (
          <div key={u.id}
            onMouseEnter={() => setHovRow(u.id)}
            onMouseLeave={() => setHovRow(null)}
            style={{ display:'grid', gridTemplateColumns:'2fr 2fr 1.5fr .8fr 1fr 100px', gap:'8px', padding:'11px 16px', borderBottom:i<team.length-1?`1px solid ${border}`:'none', alignItems:'center', background:hovRow===u.id?'#FAFAF9':white, transition:'background .1s' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <div style={{ width:'32px', height:'32px', borderRadius:'8px', background: ROLES_INFO[u.rol]?.bg || accentBg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:700, color: ROLES_INFO[u.rol]?.color || accent, flexShrink:0, border:`1px solid ${ROLES_INFO[u.rol]?.color || accent}20` }}>
                {u.avatar}
              </div>
              <div>
                <div style={{ fontSize:'12px', fontWeight:500, color:text }}>{u.name}</div>
                {u.id === 1 && <div style={{ fontSize:'9px', color:accent, fontWeight:600 }}>Tú · instamovil.com</div>}
              </div>
            </div>
            <span style={{ fontSize:'11px', color:text2 }}>{u.email}</span>
            <div style={{ position:'relative' }}>
              <span
                onMouseEnter={() => setShowRolTip(u.id)}
                onMouseLeave={() => setShowRolTip(null)}
                style={{ fontSize:'11px', fontWeight:600, padding:'3px 9px', borderRadius:'10px', background:ROLES_INFO[u.rol]?.bg||accentBg, color:ROLES_INFO[u.rol]?.color||accent, cursor:'help', display:'inline-flex', alignItems:'center', gap:'4px' }}>
                {u.rol} <span style={{ fontSize:'9px', opacity:.5 }}>ⓘ</span>
              </span>
              {showRolTip === u.id && ROLES_INFO[u.rol] && (
                <div style={{ position:'fixed', zIndex:200, width:'220px', background:'#0B1F3A', borderRadius:'10px', padding:'12px 14px', boxShadow:'0 8px 24px rgba(0,0,0,0.25)', pointerEvents:'none', marginTop:'4px' }}>
                  <div style={{ fontSize:'11px', fontWeight:600, color:'#fff', marginBottom:'4px' }}>{u.rol}</div>
                  <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.5)', marginBottom:'8px', lineHeight:1.4 }}>{ROLES_INFO[u.rol].desc}</div>
                  {ROLES_INFO[u.rol].permisos.map(p => (
                    <div key={p} style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'10px', color:'rgba(255,255,255,0.75)', marginBottom:'4px' }}>
                      <span style={{ color:'#00F5A0' }}>✓</span>{p}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span style={{ fontSize:'10px', fontWeight:600, padding:'2px 7px', borderRadius:'10px', background:SB[u.status], color:ST[u.status], display:'inline-block' }}>
              {SL[u.status]}
            </span>
            <span style={{ fontSize:'11px', color:text3 }}>{u.lastAccess}</span>
            <div style={{ display:'flex', gap:'4px', justifyContent:'flex-end' }}>
              {u.id !== 1 && (
                <>
                  <select value={u.rol} onChange={e => setTeam(t => t.map(x => x.id===u.id?{...x,rol:e.target.value}:x))}
                    style={{ fontSize:'10px', padding:'3px 6px', border:`1px solid ${border}`, borderRadius:'6px', background:white, color:text, fontFamily:"'Inter',sans-serif", outline:'none', cursor:'pointer' }}>
                    {Object.keys(ROLES_INFO).map(r => <option key={r}>{r}</option>)}
                  </select>
                  <button onClick={() => setTeam(t => t.filter(x => x.id!==u.id))}
                    style={{ fontSize:'10px', padding:'3px 7px', border:'1px solid #FEE2E2', borderRadius:'6px', background:'#FEF2F2', color:'#DC2626', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>×</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Permisos por rol */}
      <div style={{ ...card, overflow:'hidden' }}>
        <div style={{ padding:'12px 16px', borderBottom:`1px solid ${border}` }}>
          <div style={{ fontSize:'12px', fontWeight:600, color:text }}>Permisos por rol</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
          {Object.entries(ROLES_INFO).map(([rol, info], i) => (
            <div key={rol} style={{ padding:'16px', borderRight:i<3?`1px solid ${border}`:'none' }}>
              <div style={{ fontSize:'11px', fontWeight:700, color:info.color, marginBottom:'4px' }}>{rol}</div>
              <div style={{ fontSize:'10px', color:text3, marginBottom:'10px', lineHeight:1.4 }}>{info.desc}</div>
              {info.permisos.map(p => (
                <div key={p} style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'11px', color:text2, marginBottom:'5px' }}>
                  <span style={{ color:info.color, flexShrink:0 }}>✓</span>{p}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Modal invitar */}
      {showInvite && (
        <>
          <div onClick={() => { setShowInvite(false); setSent(false) }} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.3)', zIndex:60, backdropFilter:'blur(2px)' }}/>
          <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'440px', background:white, borderRadius:'14px', zIndex:70, boxShadow:'0 24px 64px rgba(0,0,0,0.15)', overflow:'hidden' }}>
            {!sent ? (
              <>
                <div style={{ padding:'18px 24px 14px', borderBottom:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div>
                    <div style={{ fontSize:'15px', fontWeight:600, color:text }}>Invitar miembro</div>
                    <div style={{ fontSize:'11px', color:text3, marginTop:'2px' }}>Recibirá acceso al panel de administración</div>
                  </div>
                  <button onClick={() => setShowInvite(false)} style={{ width:'28px', height:'28px', borderRadius:'50%', border:`1px solid ${border}`, background:bg, cursor:'pointer', color:text2, fontSize:'14px' }}>×</button>
                </div>
                <div style={{ padding:'20px 24px' }}>
                  {[
                    { label:'Nombre completo', key:'name', placeholder:'Ej: María García', type:'text' },
                    { label:'Correo electrónico', key:'email', placeholder:'maria@instamovil.com', type:'email' },
                  ].map(f => (
                    <div key={f.key} style={{ marginBottom:'14px' }}>
                      <label style={{ fontSize:'11px', fontWeight:600, color:text2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>{f.label}</label>
                      <input type={f.type} value={form[f.key]} onChange={e=>setForm(x=>({...x,[f.key]:e.target.value}))} placeholder={f.placeholder} style={inp}/>
                    </div>
                  ))}
                  <div style={{ marginBottom:'20px' }}>
                    <label style={{ fontSize:'11px', fontWeight:600, color:text2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>Rol asignado</label>
                    <select value={form.rol} onChange={e=>setForm(x=>({...x,rol:e.target.value}))}
                      style={{ ...inp, cursor:'pointer' }}>
                      {Object.keys(ROLES_INFO).filter(r=>r!=='Super Admin').map(r => <option key={r}>{r}</option>)}
                    </select>
                    {ROLES_INFO[form.rol] && (
                      <div style={{ marginTop:'8px', padding:'10px 12px', background:ROLES_INFO[form.rol].bg, borderRadius:'8px', border:`1px solid ${ROLES_INFO[form.rol].color}20` }}>
                        <div style={{ fontSize:'10px', fontWeight:600, color:ROLES_INFO[form.rol].color, marginBottom:'5px' }}>Accesos incluidos</div>
                        <div style={{ display:'flex', flexWrap:'wrap', gap:'4px' }}>
                          {ROLES_INFO[form.rol].permisos.map(p => (
                            <span key={p} style={{ fontSize:'9px', padding:'2px 7px', background:'rgba(255,255,255,0.7)', borderRadius:'10px', color:ROLES_INFO[form.rol].color, fontWeight:500 }}>{p}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ display:'flex', gap:'8px' }}>
                    <button onClick={() => setShowInvite(false)} style={{ flex:1, padding:'10px', border:`1px solid ${border}`, borderRadius:'8px', background:bg, color:text2, fontSize:'13px', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Cancelar</button>
                    <button onClick={handleInvite} disabled={!form.name||!form.email}
                      style={{ flex:2, padding:'10px', border:'none', borderRadius:'8px', background:!form.name||!form.email?'#E5E7EB':accent, color:!form.name||!form.email?'#9CA3AF':'#fff', fontSize:'13px', fontWeight:600, cursor:!form.name||!form.email?'not-allowed':'pointer', fontFamily:"'Inter',sans-serif" }}>
                      Enviar invitación →
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ padding:'40px 24px', textAlign:'center' }}>
                <div style={{ width:'56px', height:'56px', borderRadius:'50%', background:'#F0FDF4', border:'1px solid #BBF7D0', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:'24px' }}>✓</div>
                <div style={{ fontSize:'16px', fontWeight:700, color:text, marginBottom:'6px' }}>Invitación enviada</div>
                <div style={{ fontSize:'12px', color:text2 }}>{form.name} recibirá acceso como <strong style={{ color:ROLES_INFO[form.rol]?.color }}>{form.rol}</strong></div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
