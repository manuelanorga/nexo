import { useState } from 'react'

const Icon = ({ path, size=16, color='currentColor', strokeWidth=1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={path}/>
  </svg>
)

const MODULOS = [
  { id:'dashboard',      label:'Dashboard',         icon:'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id:'tenants',        label:'Tenants',            icon:'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { id:'sistema',        label:'Sistema',            icon:'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18' },
  { id:'transacciones',  label:'Transacciones',      icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { id:'billing',        label:'Planes & Billing',   icon:'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { id:'equipo',         label:'Mi Equipo',          icon:'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { id:'integraciones',  label:'Integraciones',      icon:'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
  { id:'configuracion',  label:'Configuración',      icon:'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { id:'roles',          label:'Roles & Permisos',   icon:'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' },
  { id:'impersonar',     label:'Impersonar usuarios',icon:'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id:'eliminar',       label:'Eliminar tenants',   icon:'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
]

const ACCIONES = ['ver', 'crear', 'editar', 'eliminar']

const ROLES_INIT = [
  {
    id: 1,
    nombre: 'Super Admin',
    desc: 'Acceso total sin restricciones',
    color: '#7C3AED', bg: '#F5F3FF',
    sistema: true,
    permisos: {
      dashboard:     { ver:true,  crear:true,  editar:true,  eliminar:true  },
      tenants:       { ver:true,  crear:true,  editar:true,  eliminar:true  },
      sistema:       { ver:true,  crear:true,  editar:true,  eliminar:true  },
      transacciones: { ver:true,  crear:true,  editar:true,  eliminar:true  },
      billing:       { ver:true,  crear:true,  editar:true,  eliminar:true  },
      equipo:        { ver:true,  crear:true,  editar:true,  eliminar:true  },
      integraciones: { ver:true,  crear:true,  editar:true,  eliminar:true  },
      configuracion: { ver:true,  crear:true,  editar:true,  eliminar:true  },
      roles:         { ver:true,  crear:true,  editar:true,  eliminar:true  },
      impersonar:    { ver:true,  crear:true,  editar:true,  eliminar:true  },
      eliminar:      { ver:true,  crear:true,  editar:true,  eliminar:true  },
    }
  },
  {
    id: 2,
    nombre: 'Desarrollador',
    desc: 'Acceso técnico — sistema e integraciones',
    color: '#0E4D92', bg: '#EEF5FF',
    sistema: true,
    permisos: {
      dashboard:     { ver:true,  crear:false, editar:false, eliminar:false },
      tenants:       { ver:true,  crear:false, editar:false, eliminar:false },
      sistema:       { ver:true,  crear:true,  editar:true,  eliminar:false },
      transacciones: { ver:false, crear:false, editar:false, eliminar:false },
      billing:       { ver:false, crear:false, editar:false, eliminar:false },
      equipo:        { ver:true,  crear:false, editar:false, eliminar:false },
      integraciones: { ver:true,  crear:true,  editar:true,  eliminar:false },
      configuracion: { ver:true,  crear:false, editar:true,  eliminar:false },
      roles:         { ver:true,  crear:false, editar:false, eliminar:false },
      impersonar:    { ver:false, crear:false, editar:false, eliminar:false },
      eliminar:      { ver:false, crear:false, editar:false, eliminar:false },
    }
  },
  {
    id: 3,
    nombre: 'Comercial',
    desc: 'Gestión de tenants y facturación',
    color: '#166534', bg: '#F0FDF4',
    sistema: true,
    permisos: {
      dashboard:     { ver:true,  crear:false, editar:false, eliminar:false },
      tenants:       { ver:true,  crear:true,  editar:true,  eliminar:false },
      sistema:       { ver:false, crear:false, editar:false, eliminar:false },
      transacciones: { ver:true,  crear:true,  editar:true,  eliminar:false },
      billing:       { ver:true,  crear:true,  editar:true,  eliminar:false },
      equipo:        { ver:true,  crear:false, editar:false, eliminar:false },
      integraciones: { ver:false, crear:false, editar:false, eliminar:false },
      configuracion: { ver:false, crear:false, editar:false, eliminar:false },
      roles:         { ver:false, crear:false, editar:false, eliminar:false },
      impersonar:    { ver:false, crear:false, editar:false, eliminar:false },
      eliminar:      { ver:false, crear:false, editar:false, eliminar:false },
    }
  },
  {
    id: 4,
    nombre: 'Soporte',
    desc: 'Atención a clientes e impersonación',
    color: '#C2410C', bg: '#FFF7ED',
    sistema: true,
    permisos: {
      dashboard:     { ver:true,  crear:false, editar:false, eliminar:false },
      tenants:       { ver:true,  crear:false, editar:false, eliminar:false },
      sistema:       { ver:true,  crear:false, editar:false, eliminar:false },
      transacciones: { ver:false, crear:false, editar:false, eliminar:false },
      billing:       { ver:false, crear:false, editar:false, eliminar:false },
      equipo:        { ver:true,  crear:false, editar:false, eliminar:false },
      integraciones: { ver:false, crear:false, editar:false, eliminar:false },
      configuracion: { ver:false, crear:false, editar:false, eliminar:false },
      roles:         { ver:false, crear:false, editar:false, eliminar:false },
      impersonar:    { ver:true,  crear:true,  editar:false, eliminar:false },
      eliminar:      { ver:false, crear:false, editar:false, eliminar:false },
    }
  },
]

export default function RolesView({ accent, accentBg, text, text2, text3, border, white, bg }) {
  const [roles, setRoles]       = useState(ROLES_INIT)
  const [selected, setSelected] = useState(1)
  const [showNew, setShowNew]   = useState(false)
  const [saved, setSaved]       = useState(false)
  const [newRol, setNewRol]     = useState({ nombre:'', desc:'', color:'#0E4D92', bg:'#EEF5FF' })

  const rol = roles.find(r => r.id === selected)

  const togglePerm = (modulo, accion) => {
    if (rol.sistema && rol.id === 1) return
    setRoles(rs => rs.map(r => r.id === selected ? {
      ...r,
      permisos: { ...r.permisos, [modulo]: { ...r.permisos[modulo], [accion]: !r.permisos[modulo][accion] } }
    } : r))
  }

  const toggleAll = (modulo) => {
    const allOn = ACCIONES.every(a => rol.permisos[modulo][a])
    setRoles(rs => rs.map(r => r.id === selected ? {
      ...r,
      permisos: { ...r.permisos, [modulo]: Object.fromEntries(ACCIONES.map(a => [a, !allOn])) }
    } : r))
  }

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const card = { background:white, border:`1px solid ${border}`, borderRadius:'10px' }
  const inp  = { width:'100%', padding:'8px 12px', border:`1px solid ${border}`, borderRadius:'8px', fontSize:'13px', fontFamily:"'Inter',sans-serif", color:text, outline:'none', boxSizing:'border-box', background:white }

  return (
    <div style={{ fontFamily:"'Inter',sans-serif" }}>

      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:'16px' }}>

        {/* Sidebar roles */}
        <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
          {roles.map(r => (
            <div key={r.id} onClick={() => setSelected(r.id)}
              style={{ ...card, padding:'12px 14px', cursor:'pointer', border:`1px solid ${selected===r.id?r.color+'40':border}`, background:selected===r.id?r.bg:white, transition:'all .15s' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'3px' }}>
                <div style={{ fontSize:'12px', fontWeight:600, color:selected===r.id?r.color:text }}>{r.nombre}</div>
                {r.sistema && <span style={{ fontSize:'9px', color:text3, background:bg, padding:'1px 5px', borderRadius:'4px', border:`1px solid ${border}` }}>Sistema</span>}
              </div>
              <div style={{ fontSize:'10px', color:text3, lineHeight:1.3 }}>{r.desc}</div>
              <div style={{ marginTop:'6px', fontSize:'10px', color:selected===r.id?r.color:text3, fontWeight:500 }}>
                {Object.values(r.permisos).filter(p=>p.ver).length}/{MODULOS.length} módulos
              </div>
            </div>
          ))}
          <button onClick={() => setShowNew(true)}
            style={{ padding:'10px', border:`1px dashed ${border}`, borderRadius:'10px', background:'transparent', color:text3, fontSize:'12px', cursor:'pointer', fontFamily:"'Inter',sans-serif", display:'flex', alignItems:'center', justifyContent:'center', gap:'5px', transition:'all .15s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=accent; e.currentTarget.style.color=accent}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=border; e.currentTarget.style.color=text3}}>
            <Icon path="M12 4v16m8-8H4" size={14} color="currentColor"/> Nuevo rol
          </button>
        </div>

        {/* Matriz de permisos */}
        {rol && (
          <div>
            {/* Header del rol */}
            <div style={{ ...card, padding:'16px 20px', marginBottom:'12px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <div style={{ width:'36px', height:'36px', borderRadius:'8px', background:rol.bg, display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${rol.color}30` }}>
                  <Icon path={MODULOS.find(m=>m.id==='roles')?.icon||''} size={16} color={rol.color}/>
                </div>
                <div>
                  <div style={{ fontSize:'15px', fontWeight:600, color:text }}>{rol.nombre}</div>
                  <div style={{ fontSize:'11px', color:text3 }}>{rol.desc}</div>
                </div>
              </div>
              <div style={{ display:'flex', gap:'8px' }}>
                {!rol.sistema || rol.id !== 1 ? (
                  <button onClick={handleSave}
                    style={{ padding:'8px 20px', border:'none', borderRadius:'8px', background:saved?'#10B981':accent, color:'#fff', fontSize:'12px', fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'background .3s' }}>
                    {saved ? '✓ Guardado' : 'Guardar cambios'}
                  </button>
                ) : (
                  <span style={{ fontSize:'11px', color:text3, padding:'8px 12px', background:bg, borderRadius:'8px', border:`1px solid ${border}` }}>
                    🔒 Rol protegido
                  </span>
                )}
              </div>
            </div>

            {/* Tabla de permisos */}
            <div style={{ ...card, overflow:'hidden' }}>
              {/* Header */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr repeat(4,80px) 60px', gap:'0', background:'#FAFAF9', borderBottom:`1px solid ${border}` }}>
                <div style={{ padding:'10px 16px', fontSize:'10px', color:text3, fontWeight:600, textTransform:'uppercase', letterSpacing:'.6px' }}>Módulo</div>
                {ACCIONES.map(a => (
                  <div key={a} style={{ padding:'10px 0', fontSize:'10px', color:text3, fontWeight:600, textTransform:'uppercase', letterSpacing:'.6px', textAlign:'center' }}>{a}</div>
                ))}
                <div style={{ padding:'10px 0', fontSize:'10px', color:text3, fontWeight:600, textTransform:'uppercase', letterSpacing:'.6px', textAlign:'center' }}>Todo</div>
              </div>

              {MODULOS.map((modulo, i) => {
                const perms = rol.permisos[modulo.id] || { ver:false, crear:false, editar:false, eliminar:false }
                const allOn = ACCIONES.every(a => perms[a])
                const someOn = ACCIONES.some(a => perms[a])
                const isProtected = rol.id === 1

                return (
                  <div key={modulo.id} style={{ display:'grid', gridTemplateColumns:'1fr repeat(4,80px) 60px', gap:'0', borderBottom:i<MODULOS.length-1?`1px solid ${border}`:'none', alignItems:'center',
                    background: someOn ? `${rol.bg}60` : white, transition:'background .15s' }}>
                    <div style={{ padding:'12px 16px', display:'flex', alignItems:'center', gap:'10px' }}>
                      <div style={{ width:'28px', height:'28px', borderRadius:'7px', background:someOn?rol.bg:bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:`1px solid ${someOn?rol.color+'20':border}` }}>
                        <Icon path={modulo.icon} size={13} color={someOn?rol.color:text3}/>
                      </div>
                      <span style={{ fontSize:'12px', fontWeight:someOn?500:400, color:someOn?text:text2 }}>{modulo.label}</span>
                    </div>
                    {ACCIONES.map(accion => (
                      <div key={accion} style={{ display:'flex', justifyContent:'center', padding:'12px 0' }}>
                        <button onClick={() => !isProtected && togglePerm(modulo.id, accion)}
                          style={{ width:'22px', height:'22px', borderRadius:'6px', border:`1.5px solid ${perms[accion]?rol.color:border}`, background:perms[accion]?rol.color:'transparent', cursor:isProtected?'default':'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .15s', flexShrink:0 }}>
                          {perms[accion] && <Icon path="M5 13l4 4L19 7" size={12} color="#fff" strokeWidth={2.5}/>}
                        </button>
                      </div>
                    ))}
                    <div style={{ display:'flex', justifyContent:'center', padding:'12px 0' }}>
                      <button onClick={() => !isProtected && toggleAll(modulo.id)}
                        style={{ width:'22px', height:'22px', borderRadius:'6px', border:`1.5px solid ${allOn?rol.color:someOn?rol.color+'60':border}`, background:allOn?rol.color:someOn?`${rol.color}20`:'transparent', cursor:isProtected?'default':'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .15s' }}>
                        {allOn && <Icon path="M5 13l4 4L19 7" size={12} color="#fff" strokeWidth={2.5}/>}
                        {someOn && !allOn && <span style={{ width:'8px', height:'2px', background:rol.color, display:'block', borderRadius:'1px' }}/>}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modal nuevo rol */}
      {showNew && (
        <>
          <div onClick={() => setShowNew(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.3)', zIndex:60, backdropFilter:'blur(2px)' }}/>
          <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'420px', background:white, borderRadius:'14px', zIndex:70, boxShadow:'0 24px 64px rgba(0,0,0,0.15)', overflow:'hidden' }}>
            <div style={{ padding:'18px 24px 14px', borderBottom:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ fontSize:'15px', fontWeight:600, color:text }}>Nuevo rol</div>
              <button onClick={() => setShowNew(false)} style={{ width:'28px', height:'28px', borderRadius:'50%', border:`1px solid ${border}`, background:bg, cursor:'pointer', color:text2, fontSize:'14px' }}>×</button>
            </div>
            <div style={{ padding:'20px 24px' }}>
              {[
                { label:'Nombre del rol', key:'nombre', placeholder:'Ej: Analista' },
                { label:'Descripción', key:'desc', placeholder:'Ej: Acceso de solo lectura a reportes' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom:'14px' }}>
                  <label style={{ fontSize:'11px', fontWeight:600, color:text2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>{f.label}</label>
                  <input value={newRol[f.key]} onChange={e=>setNewRol(r=>({...r,[f.key]:e.target.value}))} placeholder={f.placeholder} style={inp}/>
                </div>
              ))}
              <div style={{ marginBottom:'20px' }}>
                <label style={{ fontSize:'11px', fontWeight:600, color:text2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'8px' }}>Color</label>
                <div style={{ display:'flex', gap:'8px' }}>
                  {[
                    { color:'#7C3AED', bg:'#F5F3FF' },
                    { color:'#0E4D92', bg:'#EEF5FF' },
                    { color:'#166534', bg:'#F0FDF4' },
                    { color:'#C2410C', bg:'#FFF7ED' },
                    { color:'#0B1F3A', bg:'#F1F5F9' },
                    { color:'#92400E', bg:'#FFFBEB' },
                  ].map(opt => (
                    <div key={opt.color} onClick={() => setNewRol(r=>({...r,...opt}))}
                      style={{ width:'28px', height:'28px', borderRadius:'7px', background:opt.bg, border:`2px solid ${newRol.color===opt.color?opt.color:border}`, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <div style={{ width:'12px', height:'12px', borderRadius:'50%', background:opt.color }}/>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding:'10px 14px', background:'#F8FAFC', borderRadius:'8px', border:`1px solid ${border}`, fontSize:'11px', color:text3, marginBottom:'16px' }}>
                Después de crear el rol, podrás configurar los permisos desde la matriz.
              </div>
              <div style={{ display:'flex', gap:'8px' }}>
                <button onClick={() => setShowNew(false)} style={{ flex:1, padding:'10px', border:`1px solid ${border}`, borderRadius:'8px', background:bg, color:text2, fontSize:'13px', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Cancelar</button>
                <button onClick={() => {
                  if (!newRol.nombre) return
                  const id = Date.now()
                  const emptyPerms = Object.fromEntries(MODULOS.map(m => [m.id, Object.fromEntries(ACCIONES.map(a => [a, false]))]))
                  setRoles(rs => [...rs, { id, ...newRol, sistema:false, permisos:emptyPerms }])
                  setSelected(id)
                  setShowNew(false)
                  setNewRol({ nombre:'', desc:'', color:'#0E4D92', bg:'#EEF5FF' })
                }} style={{ flex:2, padding:'10px', border:'none', borderRadius:'8px', background:accent, color:'#fff', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                  Crear rol
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
