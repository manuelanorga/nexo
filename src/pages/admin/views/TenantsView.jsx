import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TENANTS = [
  { id:1, name:'Arca Continental', slug:'arca-continental', ruc:'20100128954', razonSocial:'ARCA CONTINENTAL LINDLEY S.A.', direccion:'Av. Nicolás Arriola 589, La Victoria, Lima', type:'prov', plan:'Professional', status:'ok', txns:428, lastSeen:'hace 2 min', createdAt:'12 ene 2025', erp:'SAP',
    users:[
      { id:1, name:'Ricardo Torres',  email:'r.torres@arca.com.pe',  rol:'Admin de Ventas',       status:'active', lastAccess:'hace 5 min' },
      { id:2, name:'Claudia Mendoza', email:'c.mendoza@arca.com.pe', rol:'Facturador / Contador',  status:'active', lastAccess:'hace 1h' },
      { id:3, name:'Jorge Pinto',     email:'j.pinto@arca.com.pe',   rol:'Tesorero',              status:'active', lastAccess:'hace 3h' },
    ],
    connections:[]
  },
  { id:2, name:'Wong S.A.', slug:'wong-supermercados', ruc:'20492092313', razonSocial:'CENCOSUD RETAIL PERU S.A.', direccion:'Av. Benavides 4545, Miraflores, Lima', type:'ret', plan:'Professional', status:'ok', txns:214, lastSeen:'hace 1 min', createdAt:'15 ene 2025', erp:'Oracle',
    users:[
      { id:4, name:'Ana Flores',    email:'a.flores@wong.com.pe',  rol:'Admin de Compras',         status:'active',  lastAccess:'hace 2 min' },
      { id:5, name:'Carlos Ruiz',   email:'c.ruiz@wong.com.pe',    rol:'Comprador / Op. Logístico', status:'active',  lastAccess:'hace 30 min' },
      { id:6, name:'Patricia Vega', email:'p.vega@wong.com.pe',    rol:'Aprobador Financiero',      status:'invited', lastAccess:'Nunca' },
    ],
    connections:[
      { id:1, provId:1, provName:'Arca Continental', provSlug:'arca-continental', status:'active', ocs:214, since:'15 ene 2025', modules:['OC','Despacho','Recibo','Financiero'] },
    ]
  },
  { id:3, name:'Tottus Perú', slug:'tottus-peru', ruc:'20393638682', razonSocial:'HIPERMERCADOS TOTTUS S.A.', direccion:'Av. Defensores del Morro 1277, Chorrillos, Lima', type:'ret', plan:'Professional', status:'warn', txns:98, lastSeen:'hace 8 min', createdAt:'20 ene 2025', erp:'SAP',
    users:[
      { id:7, name:'Luis García',  email:'l.garcia@tottus.com.pe', rol:'Admin de Compras',          status:'active', lastAccess:'hace 10 min' },
      { id:8, name:'María Quispe', email:'m.quispe@tottus.com.pe', rol:'Comprador / Op. Logístico', status:'active', lastAccess:'hace 1h' },
    ],
    connections:[
      { id:2, provId:1, provName:'Arca Continental', provSlug:'arca-continental', status:'pending', ocs:0, since:'20 ene 2025', modules:['OC'] },
    ]
  },
  { id:4, name:'Plaza Vea', slug:'plaza-vea-spsa', ruc:'20331066703', razonSocial:'SUPERMERCADOS PERUANOS S.A.', direccion:'Av. Paseo de la República 3220, San Isidro, Lima', type:'ret', plan:'Starter', status:'ok', txns:176, lastSeen:'hace 4 min', createdAt:'01 feb 2025', erp:'Odoo',
    users:[
      { id:9,  name:'Roberto Silva', email:'r.silva@spsa.com.pe',  rol:'Admin de Compras',          status:'active',  lastAccess:'hace 5 min' },
      { id:10, name:'Carla Huamán',  email:'c.huaman@spsa.com.pe', rol:'Comprador / Op. Logístico', status:'active',  lastAccess:'hace 2h' },
      { id:11, name:'Diego Morales', email:'d.morales@spsa.com.pe', rol:'Aprobador Financiero',      status:'blocked', lastAccess:'hace 5 días' },
    ],
    connections:[]
  },
  { id:5, name:'Metro', slug:'metro-cencosud', ruc:'20492092313', razonSocial:'CENCOSUD RETAIL PERU S.A.', direccion:'Av. Benavides 4545, Miraflores, Lima', type:'ret', plan:'Starter', status:'ok', txns:331, lastSeen:'hace 3 min', createdAt:'10 feb 2025', erp:'Ninguno',
    users:[
      { id:12, name:'Fernando Castillo', email:'f.castillo@metro.com.pe', rol:'Admin de Compras',          status:'active', lastAccess:'hace 3 min' },
      { id:13, name:'Sofía Paredes',     email:'s.paredes@metro.com.pe',  rol:'Comprador / Op. Logístico', status:'active', lastAccess:'hace 45 min' },
    ],
    connections:[]
  },
  { id:6, name:'Vivanda', slug:'vivanda-sa', ruc:'20331066703', razonSocial:'SUPERMERCADOS PERUANOS S.A.', direccion:'Av. Paseo de la República 3220, San Isidro, Lima', type:'ret', plan:'Starter', status:'pause', txns:0, lastSeen:'hace 2h', createdAt:'24 may 2025', erp:'Ninguno',
    users:[
      { id:14, name:'Gabriela Núñez', email:'g.nunez@vivanda.com.pe', rol:'Admin de Compras', status:'invited', lastAccess:'Nunca' },
    ],
    connections:[]
  },
]

const PROVEEDORES_DISPONIBLES = [
  { id:1, name:'Arca Continental', ruc:'20100128954', plan:'Professional' },
  { id:7, name:'Alicorp S.A.A.',   ruc:'20100114421', plan:'Professional' },
  { id:8, name:'Backus y Johnston',ruc:'20600394131', plan:'Starter' },
  { id:9, name:'Nestlé Perú',      ruc:'20481569848', plan:'Professional' },
]

const MODULOS = ['OC','Despacho','Recibo','Financiero','Reportes','Catálogo']

const SC = { ok:'#10B981', warn:'#F59E0B', err:'#EF4444', pause:'#9CA3AF' }
const SL = { ok:'Operativo', warn:'1 error EDI', err:'Error crítico', pause:'En pausa' }
const CS = { active:'#10B981', pending:'#F59E0B', suspended:'#EF4444' }
const CL = { active:'Activa', pending:'Pendiente', suspended:'Suspendida' }
const US = { active:'#10B981', invited:'#F59E0B', blocked:'#EF4444' }
const UL = { active:'Activo', invited:'Invitado', blocked:'Bloqueado' }

const SUNAT_DB = {
  '20100128954': { razonSocial:'ARCA CONTINENTAL LINDLEY S.A.',    direccion:'Av. Nicolás Arriola 589, La Victoria, Lima' },
  '20393638682': { razonSocial:'HIPERMERCADOS TOTTUS S.A.',         direccion:'Av. Defensores del Morro 1277, Chorrillos, Lima' },
  '20331066703': { razonSocial:'SUPERMERCADOS PERUANOS S.A.',       direccion:'Av. Paseo de la República 3220, San Isidro, Lima' },
  '20492092313': { razonSocial:'CENCOSUD RETAIL PERU S.A.',         direccion:'Av. Benavides 4545, Miraflores, Lima' },
  '20100114421': { razonSocial:'ALICORP S.A.A.',                    direccion:'Jr. Domingo Ponte 1055, Cercado de Lima' },
  '20600394131': { razonSocial:'BACKUS Y JOHNSTON S.A.A.',          direccion:'Av. Guillermo Dansey 523, Cercado de Lima' },
  '20481569848': { razonSocial:'NESTLÉ PERÚ S.A.',                  direccion:'Calle Las Orquídeas 675, San Isidro' },
}

// ── DRAWER NUEVO TENANT ──────────────────────────────────
function DrawerNuevoTenant({ onClose, accent, accentBg, text, text2, text3, border, white, bg }) {
  const [ruc, setRuc]         = useState('')
  const [rucLoading, setRucLoading] = useState(false)
  const [rucFilled, setRucFilled]   = useState(false)
  const [form, setForm] = useState({ razonSocial:'', direccion:'', tipo:'ret', plan:'Starter', email:'' })

  const lookupRuc = () => {
    if (ruc.length !== 11) return
    setRucLoading(true); setRucFilled(false)
    setTimeout(() => {
      const data = SUNAT_DB[ruc]
      setRucLoading(false)
      if (data) { setForm(f => ({...f, razonSocial:data.razonSocial, direccion:data.direccion})); setRucFilled(true) }
      else { setForm(f => ({...f, razonSocial:'RUC no encontrado', direccion:''})) }
    }, 1200)
  }

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.15)', zIndex:40 }}/>
      <div style={{ position:'fixed', top:0, right:0, bottom:0, width:'420px', background:white, borderLeft:`1px solid ${border}`, zIndex:50, display:'flex', flexDirection:'column', boxShadow:'-8px 0 32px rgba(0,0,0,0.08)', animation:'slideIn .2s ease-out' }}>
        <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}} @keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <div style={{ padding:'20px 24px 16px', borderBottom:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize:'15px', fontWeight:600, color:text }}>Nuevo Tenant</div>
            <div style={{ fontSize:'11px', color:text3, marginTop:'2px' }}>Registra una nueva empresa en NEXO</div>
          </div>
          <button onClick={onClose} style={{ width:'28px', height:'28px', borderRadius:'50%', border:`1px solid ${border}`, background:bg, cursor:'pointer', fontSize:'14px', color:text2, display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>
          {/* RUC Magic */}
          <div style={{ marginBottom:'20px', padding:'16px', background:`rgba(0,194,168,0.04)`, border:'1px solid rgba(0,194,168,0.15)', borderRadius:'10px' }}>
            <div style={{ fontSize:'11px', fontWeight:600, color:accent, textTransform:'uppercase', letterSpacing:'.6px', marginBottom:'10px' }}>✦ Consulta automática SUNAT</div>
            <label style={{ fontSize:'11px', fontWeight:500, color:text2, display:'block', marginBottom:'5px' }}>RUC</label>
            <div style={{ display:'flex', gap:'8px' }}>
              <input value={ruc} onChange={e => { setRuc(e.target.value.replace(/\D/g,'')); setRucFilled(false) }}
                onKeyDown={e => e.key==='Enter' && lookupRuc()} maxLength={11} placeholder="20100128954"
                style={{ flex:1, padding:'8px 10px', border:`1px solid ${rucFilled?'rgba(0,194,168,0.4)':border}`, borderRadius:'7px', fontSize:'13px', fontFamily:"'Inter',sans-serif", color:text, outline:'none', background: rucFilled?'rgba(0,194,168,0.04)':white }}/>
              <button onClick={lookupRuc} disabled={ruc.length!==11||rucLoading}
                style={{ padding:'8px 14px', borderRadius:'7px', border:'none', background:ruc.length===11?accent:'#E5E7EB', color:ruc.length===11?'#fff':text3, fontSize:'12px', fontWeight:500, cursor:ruc.length===11?'pointer':'default', fontFamily:"'Inter',sans-serif", minWidth:'90px' }}>
                {rucLoading ? <span style={{ display:'flex', alignItems:'center', gap:'5px', justifyContent:'center' }}><span style={{ width:'10px', height:'10px', border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block', animation:'spin .7s linear infinite' }}/> Buscando</span> : rucFilled ? '✓ OK' : 'Consultar'}
              </button>
            </div>
            {rucFilled && (
              <div style={{ marginTop:'12px', padding:'10px', background:'rgba(0,194,168,0.06)', borderRadius:'7px', border:'1px solid rgba(0,194,168,0.2)' }}>
                <div style={{ fontSize:'11px', color:text3, marginBottom:'3px' }}>Razón Social</div>
                <div style={{ fontSize:'13px', fontWeight:600, color:text, marginBottom:'8px' }}>{form.razonSocial}</div>
                <div style={{ fontSize:'11px', color:text3, marginBottom:'3px' }}>Dirección fiscal</div>
                <div style={{ fontSize:'12px', color:text2 }}>{form.direccion}</div>
              </div>
            )}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'14px' }}>
            <div>
              <label style={{ fontSize:'11px', fontWeight:500, color:text2, display:'block', marginBottom:'5px' }}>Tipo</label>
              <select value={form.tipo} onChange={e => setForm(f=>({...f,tipo:e.target.value}))}
                style={{ width:'100%', padding:'8px 10px', border:`1px solid ${border}`, borderRadius:'7px', fontSize:'13px', fontFamily:"'Inter',sans-serif", color:text, background:white, outline:'none' }}>
                <option value="ret">Retail</option>
                <option value="prov">Proveedor</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize:'11px', fontWeight:500, color:text2, display:'block', marginBottom:'5px' }}>Plan</label>
              <select value={form.plan} onChange={e => setForm(f=>({...f,plan:e.target.value}))}
                style={{ width:'100%', padding:'8px 10px', border:`1px solid ${border}`, borderRadius:'7px', fontSize:'13px', fontFamily:"'Inter',sans-serif", color:text, background:white, outline:'none' }}>
                <option>Starter</option>
                <option>Professional</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom:'14px' }}>
            <label style={{ fontSize:'11px', fontWeight:500, color:text2, display:'block', marginBottom:'5px' }}>Email de contacto</label>
            <input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="admin@empresa.com.pe"
              style={{ width:'100%', padding:'8px 10px', border:`1px solid ${border}`, borderRadius:'7px', fontSize:'13px', fontFamily:"'Inter',sans-serif", color:text, outline:'none', background:white, boxSizing:'border-box' }}
              onFocus={e=>e.target.style.borderColor='rgba(0,194,168,0.4)'} onBlur={e=>e.target.style.borderColor=border}/>
          </div>
        </div>

        <div style={{ padding:'16px 24px', borderTop:`1px solid ${border}`, display:'flex', gap:'8px' }}>
          <button onClick={onClose} style={{ flex:1, padding:'10px', borderRadius:'8px', border:`1px solid ${border}`, background:bg, color:text2, fontSize:'13px', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Cancelar</button>
          <button style={{ flex:2, padding:'10px', borderRadius:'8px', border:'none', background:accent, color:'#fff', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Crear tenant</button>
        </div>
      </div>
    </>
  )
}

// ── MODAL CONECTAR PROVEEDOR ─────────────────────────────
function ModalConectarProveedor({ tenant, onClose, onConnect, accent, accentBg, text, text2, text3, border, white }) {
  const [search, setSearch]         = useState('')
  const [selected, setSelected]     = useState(null)
  const [modulos, setModulos]       = useState(['OC','Despacho','Recibo'])
  const [connecting, setConnecting] = useState(false)
  const [done, setDone]             = useState(false)

  const existingIds = tenant.connections.map(c => c.provId)
  const filtered = PROVEEDORES_DISPONIBLES.filter(p =>
    !existingIds.includes(p.id) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const toggleMod = (m) => setModulos(ms => ms.includes(m) ? ms.filter(x=>x!==m) : [...ms, m])

  const handleConnect = () => {
    setConnecting(true)
    setTimeout(() => { setConnecting(false); setDone(true) }, 1500)
  }

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.3)', zIndex:60, backdropFilter:'blur(2px)' }}/>
      <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'500px', background:white, borderRadius:'16px', zIndex:70, boxShadow:'0 24px 64px rgba(0,0,0,0.15)', overflow:'hidden' }}>

        {!done ? (
          <>
            <div style={{ padding:'20px 24px 16px', borderBottom:`1px solid ${border}` }}>
              <div style={{ fontSize:'15px', fontWeight:600, color:text }}>Conectar Proveedor</div>
              <div style={{ fontSize:'11px', color:text3, marginTop:'2px' }}>
                Habilitando conexión para <strong style={{ color:text }}>{tenant.name}</strong>
              </div>
            </div>

            <div style={{ padding:'20px 24px' }}>
              {/* Buscador */}
              <div style={{ marginBottom:'16px' }}>
                <label style={{ fontSize:'11px', fontWeight:500, color:text2, display:'block', marginBottom:'6px' }}>Buscar proveedor en NEXO</label>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Ej: Arca, Alicorp..."
                  style={{ width:'100%', padding:'9px 12px', border:`1px solid ${border}`, borderRadius:'8px', fontSize:'13px', fontFamily:"'Inter',sans-serif", color:text, outline:'none', boxSizing:'border-box' }}
                  onFocus={e=>e.target.style.borderColor='rgba(0,194,168,0.4)'} onBlur={e=>e.target.style.borderColor=border}/>

                {/* Resultados */}
                {search && (
                  <div style={{ marginTop:'4px', border:`1px solid ${border}`, borderRadius:'8px', overflow:'hidden', background:white }}>
                    {filtered.length === 0 ? (
                      <div style={{ padding:'12px', fontSize:'12px', color:text3, textAlign:'center' }}>No se encontraron proveedores</div>
                    ) : filtered.map(p => (
                      <div key={p.id} onClick={() => { setSelected(p); setSearch('') }}
                        style={{ padding:'10px 14px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:`1px solid ${border}`, transition:'background .1s' }}
                        onMouseEnter={e=>e.currentTarget.style.background='#F8FAFC'}
                        onMouseLeave={e=>e.currentTarget.style.background=white}>
                        <div>
                          <div style={{ fontSize:'13px', fontWeight:500, color:text }}>{p.name}</div>
                          <div style={{ fontSize:'10px', color:text3 }}>RUC {p.ruc} · {p.plan}</div>
                        </div>
                        <span style={{ fontSize:'11px', color:accent, fontWeight:600 }}>Seleccionar</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Preview de conexión */}
              {selected && (
                <div style={{ background:'#F8FAFC', border:`1px solid ${border}`, borderRadius:'10px', padding:'16px', marginBottom:'16px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
                    <div style={{ flex:1, padding:'10px 14px', background:white, borderRadius:'8px', border:`1px solid ${border}`, textAlign:'center' }}>
                      <div style={{ fontSize:'10px', color:text3, marginBottom:'3px' }}>RETAIL</div>
                      <div style={{ fontSize:'13px', fontWeight:600, color:text }}>{tenant.name}</div>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'2px' }}>
                      <div style={{ fontSize:'16px' }}>⇄</div>
                      <div style={{ fontSize:'9px', color:accent, fontWeight:600 }}>NEXO</div>
                    </div>
                    <div style={{ flex:1, padding:'10px 14px', background:white, borderRadius:'8px', border:`1px solid rgba(0,194,168,0.2)`, textAlign:'center' }}>
                      <div style={{ fontSize:'10px', color:text3, marginBottom:'3px' }}>PROVEEDOR</div>
                      <div style={{ fontSize:'13px', fontWeight:600, color:text }}>{selected.name}</div>
                    </div>
                  </div>

                  {/* Módulos */}
                  <div style={{ fontSize:'11px', fontWeight:600, color:text2, marginBottom:'8px' }}>Módulos compartidos</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                    {MODULOS.map(m => (
                      <button key={m} onClick={() => toggleMod(m)}
                        style={{ padding:'5px 12px', borderRadius:'20px', border:`1px solid ${modulos.includes(m)?'rgba(0,194,168,0.3)':border}`, background:modulos.includes(m)?accentBg:white, color:modulos.includes(m)?accent:text3, fontSize:'11px', fontWeight:modulos.includes(m)?600:400, cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'all .15s' }}>
                        {modulos.includes(m)?'✓ ':''}{m}
                      </button>
                    ))}
                  </div>
                  <div style={{ fontSize:'10px', color:text3, marginTop:'8px' }}>
                    {modulos.length} módulos seleccionados · {tenant.name} podrá ver datos de {selected.name} en estos módulos
                  </div>
                </div>
              )}

              <div style={{ display:'flex', gap:'8px' }}>
                <button onClick={onClose} style={{ flex:1, padding:'10px', border:`1px solid ${border}`, borderRadius:'8px', background:'#F8FAFC', color:text2, fontSize:'13px', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Cancelar</button>
                <button onClick={handleConnect} disabled={!selected||connecting}
                  style={{ flex:2, padding:'10px', border:'none', borderRadius:'8px', background:!selected?'#E5E7EB':accent, color:!selected?text3:'#fff', fontSize:'13px', fontWeight:600, cursor:!selected?'not-allowed':'pointer', fontFamily:"'Inter',sans-serif", display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>
                  {connecting
                    ? <><span style={{ width:'12px', height:'12px', border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block', animation:'spin .7s linear infinite' }}/> Conectando...</>
                    : selected ? `Conectar ${selected.name} →` : 'Selecciona un proveedor'
                  }
                </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ padding:'40px 24px', textAlign:'center' }}>
            <div style={{ width:'56px', height:'56px', borderRadius:'50%', background:'rgba(0,194,168,0.1)', border:'1px solid rgba(0,194,168,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:'24px' }}>✓</div>
            <div style={{ fontSize:'16px', fontWeight:700, color:text, marginBottom:'6px' }}>¡Conexión establecida!</div>
            <div style={{ fontSize:'12px', color:text2, marginBottom:'4px' }}>
              <strong>{tenant.name}</strong> ahora puede emitir OCs hacia
            </div>
            <div style={{ fontSize:'14px', fontWeight:600, color:accent, marginBottom:'8px' }}>{selected.name}</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'4px', justifyContent:'center', marginBottom:'20px' }}>
              {modulos.map(m => (
                <span key={m} style={{ fontSize:'10px', padding:'2px 8px', background:accentBg, borderRadius:'10px', color:accent, fontWeight:500 }}>{m}</span>
              ))}
            </div>
            <button onClick={onClose} style={{ padding:'9px 24px', background:text, border:'none', borderRadius:'8px', color:'#fff', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Listo</button>
          </div>
        )}
      </div>
    </>
  )
}

// ── DETALLE DE TENANT ────────────────────────────────────
function TenantDetail({ tenant, onBack, accent, accentBg, text, text2, text3, border, white, bg }) {
  const navigate = useNavigate()
  const [tab, setTab] = useState('info')
  const [hovUser, setHovUser] = useState(null)
  const [hovConn, setHovConn] = useState(null)
  const [showConectar, setShowConectar] = useState(false)
  const [impersonating, setImpersonating] = useState(null)
  const [connections, setConnections] = useState(tenant.connections)
  const [comercial, setComercial] = useState({
    monedas:    { PEN: true, USD: false },
    pagos:      { contado: true, d15: true, d30: true, d60: false, d90: false },
    montoMin:   500,
    bonificaciones: true,
  })

  const isProv = tenant.type === 'prov'

  const handleImpersonate = (user) => {
    setImpersonating(user.id)
    setTimeout(() => navigate('/dashboard', { state: { impersonating: { name:user.name, email:user.email, rol:user.rol, tenant:tenant.name } } }), 800)
  }

  const TABS = [
    { id:'info',        label:'Información',          show: true },
    { id:'usuarios',    label:'Usuarios',              show: true },
    { id:'conexiones',  label: isProv ? 'Retails conectados' : 'Proveedores conectados', show: true, badge: connections.length },
    { id:'comercial',   label:'Config. comercial',    show: isProv },
    { id:'actividad',   label:'Actividad',             show: true },
  ]

  const card = { background:white, border:`1px solid ${border}`, borderRadius:'10px' }

  return (
    <div className="fade-in">
      {showConectar && !isProv && (
        <ModalConectarProveedor
          tenant={{...tenant, connections}}
          onClose={() => setShowConectar(false)}
          onConnect={(conn) => setConnections(c => [...c, conn])}
          accent={accent} accentBg={accentBg} text={text} text2={text2} text3={text3} border={border} white={white}
        />
      )}

      {/* Breadcrumb */}
      <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'16px', fontSize:'12px', color:text3 }}>
        <span onClick={onBack} style={{ cursor:'pointer', color:accent }}>Tenants</span>
        <span>›</span>
        <span style={{ color:text2, fontWeight:500 }}>{tenant.name}</span>
      </div>

      {/* Header */}
      <div style={{ ...card, padding:'16px 20px', marginBottom:'14px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <div style={{ width:'40px', height:'40px', borderRadius:'10px', background:isProv?'#EFF6FF':'#F0FDF4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', fontWeight:700, color:isProv?'#2563EB':'#16A34A', fontFamily:"'Fraunces',serif", flexShrink:0 }}>
            {tenant.name[0]}
          </div>
          <div>
            <div style={{ fontSize:'16px', fontWeight:600, color:text, fontFamily:"'Fraunces',serif" }}>{tenant.name}</div>
            <div style={{ fontSize:'11px', color:text3, fontFamily:'monospace' }}>{tenant.slug}</div>
          </div>
          <span style={{ fontSize:'11px', fontWeight:500, padding:'3px 9px', borderRadius:'20px', background:isProv?'#EFF6FF':'#F0FDF4', color:isProv?'#2563EB':'#16A34A' }}>
            {isProv?'Proveedor':'Retail'}
          </span>
          <span style={{ fontSize:'11px', fontWeight:500, padding:'3px 9px', borderRadius:'20px', background:tenant.plan==='Professional'?'#F5F3FF':'#F3F4F6', color:tenant.plan==='Professional'?'#7C3AED':'#6B7280' }}>
            {tenant.plan}
          </span>
          <span style={{ fontSize:'11px', fontWeight:500, padding:'3px 9px', borderRadius:'20px', background:`${SC[tenant.status]}14`, color:SC[tenant.status], display:'inline-flex', alignItems:'center', gap:'4px' }}>
            <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:SC[tenant.status] }}/>{SL[tenant.status]}
          </span>
        </div>
        <div style={{ display:'flex', gap:'8px' }}>
          <button style={{ fontSize:'12px', padding:'6px 14px', borderRadius:'8px', border:`1px solid ${border}`, background:bg, color:text2, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Editar</button>
          <button style={{ fontSize:'12px', padding:'6px 14px', borderRadius:'8px', border:'1px solid #FEE2E2', background:'#FEF2F2', color:'#DC2626', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Pausar</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:'2px', marginBottom:'14px', background:bg, padding:'3px', borderRadius:'9px', border:`1px solid ${border}`, width:'fit-content' }}>
        {TABS.filter(t=>t.show).map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding:'6px 14px', borderRadius:'7px', border:'none', background:tab===t.id?white:'transparent', color:tab===t.id?text:text3, fontSize:'12px', fontWeight:tab===t.id?500:400, cursor:'pointer', fontFamily:"'Inter',sans-serif", boxShadow:tab===t.id?'0 1px 4px rgba(0,0,0,0.06)':'none', transition:'all .15s', display:'flex', alignItems:'center', gap:'5px' }}>
            {t.label}
            {t.badge > 0 && <span style={{ fontSize:'10px', fontWeight:600, padding:'1px 5px', borderRadius:'8px', background:accentBg, color:accent }}>{t.badge}</span>}
          </button>
        ))}
      </div>

      {/* Tab: Info */}
      {tab === 'info' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
          <div style={{ ...card, padding:'18px 20px' }}>
            <div style={{ fontSize:'12px', fontWeight:600, color:text, marginBottom:'14px' }}>Datos del tenant</div>
            {[['RUC', tenant.ruc],['Razón Social', tenant.razonSocial],['Dirección', tenant.direccion],['Alta en NEXO', tenant.createdAt],['ERP conectado', tenant.erp||'Ninguno']].map(([l,v]) => (
              <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${border}` }}>
                <span style={{ fontSize:'11px', color:text3 }}>{l}</span>
                <span style={{ fontSize:'12px', fontWeight:500, color:text, textAlign:'right', maxWidth:'220px' }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ ...card, padding:'18px 20px' }}>
            <div style={{ fontSize:'12px', fontWeight:600, color:text, marginBottom:'14px' }}>Métricas del mes</div>
            {[
              { label:'Transacciones', val: tenant.txns.toLocaleString(), color:accent },
              { label:'Última actividad', val: tenant.lastSeen, color:text },
              { label:'Conexiones activas', val: connections.filter(c=>c.status==='active').length.toString(), color:'#10B981' },
              { label:'Usuarios activos', val: tenant.users.filter(u=>u.status==='active').length.toString(), color:text },
            ].map(({label,val,color}) => (
              <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${border}` }}>
                <span style={{ fontSize:'11px', color:text3 }}>{label}</span>
                <span style={{ fontSize:'13px', fontWeight:600, color, fontFamily:"'Fraunces',serif" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Usuarios */}
      {tab === 'usuarios' && (
        <div style={{ ...card, overflow:'hidden' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1.8fr 1.5fr 1.2fr .8fr 140px', gap:'8px', padding:'8px 16px', background:'#FAFAF9', borderBottom:`1px solid ${border}` }}>
            {['Usuario','Rol','Estado','Último acceso',''].map(h => (
              <span key={h} style={{ fontSize:'10px', color:text3, textTransform:'uppercase', letterSpacing:'.7px', fontWeight:500 }}>{h}</span>
            ))}
          </div>
          {tenant.users.map((u,i) => (
            <div key={u.id} onMouseEnter={()=>setHovUser(u.id)} onMouseLeave={()=>setHovUser(null)}
              style={{ display:'grid', gridTemplateColumns:'1.8fr 1.5fr 1.2fr .8fr 140px', gap:'8px', padding:'11px 16px', borderBottom:i<tenant.users.length-1?`1px solid ${border}`:'none', alignItems:'center', background:hovUser===u.id?'#FAFAF9':white, transition:'background .1s' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'9px' }}>
                <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:accentBg, border:`1px solid rgba(0,194,168,0.2)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', fontWeight:600, color:accent, flexShrink:0 }}>
                  {u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                </div>
                <div>
                  <div style={{ fontSize:'12px', fontWeight:500, color:text }}>{u.name}</div>
                  <div style={{ fontSize:'10px', color:text3 }}>{u.email}</div>
                </div>
              </div>
              <span style={{ fontSize:'11px', color:text2 }}>{u.rol}</span>
              <span style={{ fontSize:'10px', fontWeight:500, padding:'2px 7px', borderRadius:'10px', background:`${US[u.status]}14`, color:US[u.status], display:'inline-block' }}>{UL[u.status]}</span>
              <span style={{ fontSize:'11px', color:text3 }}>{u.lastAccess}</span>
              <div style={{ display:'flex', justifyContent:'flex-end' }}>
                {impersonating===u.id
                  ? <span style={{ fontSize:'10px', color:accent, fontWeight:500 }}>Entrando...</span>
                  : <button onClick={() => handleImpersonate(u)}
                      style={{ fontSize:'10px', fontWeight:500, padding:'4px 9px', borderRadius:'6px', border:`1px solid rgba(0,194,168,0.25)`, background:hovUser===u.id?accentBg:'transparent', color:accent, cursor:'pointer', fontFamily:"'Inter',sans-serif", whiteSpace:'nowrap', transition:'all .15s', display:'flex', alignItems:'center', gap:'4px' }}>
                      ↗ Ingresar como
                    </button>
                }
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Conexiones */}
      {tab === 'conexiones' && (
        <div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px' }}>
            <div>
              <div style={{ fontSize:'13px', fontWeight:600, color:text }}>
                {isProv ? 'Retails que compran a este proveedor' : 'Proveedores conectados a este retail'}
              </div>
              <div style={{ fontSize:'11px', color:text3, marginTop:'1px' }}>
                {isProv ? 'Los retails pueden emitir OCs hacia este proveedor' : 'Este retail puede emitir OCs hacia estos proveedores'}
              </div>
            </div>
            {!isProv && (
              <button onClick={() => setShowConectar(true)}
                style={{ display:'flex', alignItems:'center', gap:'5px', padding:'7px 16px', border:'none', background:accent, color:'#fff', borderRadius:'8px', fontSize:'12px', fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                + Conectar Proveedor
              </button>
            )}
          </div>

          {connections.length === 0 ? (
            <div style={{ ...card, padding:'40px', textAlign:'center' }}>
              <div style={{ fontSize:'28px', opacity:.2, marginBottom:'12px' }}>⇄</div>
              <div style={{ fontSize:'14px', fontWeight:500, color:text2, marginBottom:'6px' }}>Sin conexiones aún</div>
              <div style={{ fontSize:'12px', color:text3, marginBottom:'16px' }}>
                {isProv ? 'Ningún retail está conectado a este proveedor todavía' : 'Este retail no tiene proveedores conectados'}
              </div>
              {!isProv && (
                <button onClick={() => setShowConectar(true)}
                  style={{ padding:'9px 20px', border:'none', background:accent, color:'#fff', borderRadius:'8px', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                  + Conectar primer proveedor
                </button>
              )}
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {connections.map((conn,i) => (
                <div key={conn.id} onMouseEnter={()=>setHovConn(i)} onMouseLeave={()=>setHovConn(null)}
                  style={{ ...card, padding:'16px 20px', transition:'box-shadow .15s', boxShadow:hovConn===i?'0 4px 16px rgba(0,0,0,0.06)':'none' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                      <div style={{ width:'36px', height:'36px', borderRadius:'8px', background:'#EFF6FF', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', fontWeight:700, color:'#2563EB', fontFamily:"'Fraunces',serif" }}>
                        {conn.provName[0]}
                      </div>
                      <div>
                        <div style={{ fontSize:'13px', fontWeight:600, color:text }}>{conn.provName}</div>
                        <div style={{ fontSize:'10px', color:text3 }}>Desde {conn.since}</div>
                      </div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                      <span style={{ fontSize:'11px', fontWeight:600, padding:'3px 9px', borderRadius:'20px', background:`${CS[conn.status]}14`, color:CS[conn.status], display:'inline-flex', alignItems:'center', gap:'4px' }}>
                        <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:CS[conn.status] }}/>{CL[conn.status]}
                      </span>
                      <button style={{ fontSize:'11px', padding:'4px 10px', border:`1px solid ${border}`, borderRadius:'6px', background:bg, color:text2, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                        {conn.status==='active'?'Suspender':'Activar'}
                      </button>
                    </div>
                  </div>

                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div style={{ display:'flex', gap:'5px', flexWrap:'wrap' }}>
                      {conn.modules.map(m => (
                        <span key={m} style={{ fontSize:'10px', padding:'2px 8px', borderRadius:'10px', background:accentBg, color:accent, fontWeight:500 }}>{m}</span>
                      ))}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'11px', color:text3 }}>
                      <span style={{ fontFamily:"'Fraunces',serif", fontSize:'14px', fontWeight:700, color:text }}>{conn.ocs}</span>
                      OCs este mes
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Config. comercial */}
      {tab === 'comercial' && isProv && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>

          {/* Monedas */}
          <div style={{ ...card, padding:'18px 20px' }}>
            <div style={{ fontSize:'13px', fontWeight:600, color:text, marginBottom:'4px' }}>Monedas permitidas</div>
            <div style={{ fontSize:'11px', color:text3, marginBottom:'16px' }}>El retail solo verá las monedas que habilites</div>
            {[['PEN','🇵🇪 Soles (PEN)'],['USD','🇺🇸 Dólares (USD)']].map(([key,lbl]) => (
              <div key={key} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:`1px solid ${border}` }}>
                <span style={{ fontSize:'13px', color:text }}>{lbl}</span>
                <button onClick={() => setComercial(c => ({...c, monedas:{...c.monedas,[key]:!c.monedas[key]}}))}
                  style={{ width:'40px', height:'22px', borderRadius:'11px', border:'none', background: comercial.monedas[key]?accent:'#E5E7EB', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}>
                  <div style={{ width:'16px', height:'16px', borderRadius:'50%', background:'#fff', position:'absolute', top:'3px', transition:'left .2s', left: comercial.monedas[key]?'21px':'3px', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }}/>
                </button>
              </div>
            ))}
            <div style={{ marginTop:'12px', padding:'8px 10px', background:'#FFFBEB', borderRadius:'7px', border:'1px solid #FDE68A', fontSize:'10px', color:'#D97706' }}>
              ⚠ El tipo de cambio siempre es el oficial SUNAT del día
            </div>
          </div>

          {/* Condiciones de pago */}
          <div style={{ ...card, padding:'18px 20px' }}>
            <div style={{ fontSize:'13px', fontWeight:600, color:text, marginBottom:'4px' }}>Condiciones de pago</div>
            <div style={{ fontSize:'11px', color:text3, marginBottom:'16px' }}>Plazos que el retail puede seleccionar al crear una OC</div>
            {[['contado','Contado'],['d15','15 días'],['d30','30 días'],['d60','60 días'],['d90','90 días']].map(([key,lbl]) => (
              <div key={key} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${border}` }}>
                <span style={{ fontSize:'13px', color:text }}>{lbl}</span>
                <button onClick={() => setComercial(c => ({...c, pagos:{...c.pagos,[key]:!c.pagos[key]}}))}
                  style={{ width:'40px', height:'22px', borderRadius:'11px', border:'none', background: comercial.pagos[key]?accent:'#E5E7EB', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}>
                  <div style={{ width:'16px', height:'16px', borderRadius:'50%', background:'#fff', position:'absolute', top:'3px', transition:'left .2s', left: comercial.pagos[key]?'21px':'3px', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }}/>
                </button>
              </div>
            ))}
          </div>

          {/* Monto mínimo */}
          <div style={{ ...card, padding:'18px 20px' }}>
            <div style={{ fontSize:'13px', fontWeight:600, color:text, marginBottom:'4px' }}>Monto mínimo de OC</div>
            <div style={{ fontSize:'11px', color:text3, marginBottom:'16px' }}>El retail no puede enviar una OC por debajo de este monto</div>
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <span style={{ fontSize:'14px', color:text2, fontWeight:600 }}>S/</span>
              <input type="number" value={comercial.montoMin}
                onChange={e => setComercial(c => ({...c, montoMin: parseInt(e.target.value)||0}))}
                style={{ flex:1, padding:'8px 12px', border:`1px solid ${border}`, borderRadius:'8px', fontSize:'14px', fontFamily:"'Inter',sans-serif", color:text, outline:'none', fontWeight:600 }}/>
            </div>
            <div style={{ fontSize:'10px', color:text3, marginTop:'8px' }}>
              Si la OC no alcanza el mínimo, el sistema bloquea el envío automáticamente
            </div>
          </div>

          {/* Bonificaciones */}
          <div style={{ ...card, padding:'18px 20px' }}>
            <div style={{ fontSize:'13px', fontWeight:600, color:text, marginBottom:'4px' }}>Bonificaciones</div>
            <div style={{ fontSize:'11px', color:text3, marginBottom:'16px' }}>Permite que el retail agregue unidades bonificadas en la OC</div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0' }}>
              <div>
                <div style={{ fontSize:'13px', color:text, fontWeight:500 }}>Bonificaciones habilitadas</div>
                <div style={{ fontSize:'10px', color:text3, marginTop:'2px' }}>El retail puede indicar unidades bonificadas por producto</div>
              </div>
              <button onClick={() => setComercial(c => ({...c, bonificaciones:!c.bonificaciones}))}
                style={{ width:'40px', height:'22px', borderRadius:'11px', border:'none', background: comercial.bonificaciones?accent:'#E5E7EB', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}>
                <div style={{ width:'16px', height:'16px', borderRadius:'50%', background:'#fff', position:'absolute', top:'3px', transition:'left .2s', left: comercial.bonificaciones?'21px':'3px', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }}/>
              </button>
            </div>

            <div style={{ marginTop:'16px', paddingTop:'16px', borderTop:`1px solid ${border}` }}>
              <div style={{ fontSize:'11px', fontWeight:600, color:text2, marginBottom:'8px' }}>Resumen de configuración activa</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'5px' }}>
                {Object.entries(comercial.monedas).filter(([,v])=>v).map(([k]) => (
                  <span key={k} style={{ fontSize:'10px', padding:'2px 8px', borderRadius:'10px', background:accentBg, color:accent, fontWeight:500 }}>{k}</span>
                ))}
                {Object.entries(comercial.pagos).filter(([,v])=>v).map(([k]) => (
                  <span key={k} style={{ fontSize:'10px', padding:'2px 8px', borderRadius:'10px', background:'#F3F4F6', color:text2, fontWeight:500 }}>
                    {k==='contado'?'Contado':k==='d15'?'15d':k==='d30'?'30d':k==='d60'?'60d':'90d'}
                  </span>
                ))}
                <span style={{ fontSize:'10px', padding:'2px 8px', borderRadius:'10px', background:'#F3F4F6', color:text2 }}>Min S/{comercial.montoMin}</span>
                {comercial.bonificaciones && <span style={{ fontSize:'10px', padding:'2px 8px', borderRadius:'10px', background:'#F0FDF4', color:'#16A34A' }}>Bonif. ✓</span>}
              </div>
            </div>

            <div style={{ marginTop:'14px' }}>
              <button style={{ width:'100%', padding:'10px', border:'none', borderRadius:'8px', background:text, color:'#fff', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                Guardar configuración comercial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Actividad */}
      {tab === 'actividad' && (
        <div style={{ ...card, padding:'40px', textAlign:'center' }}>
          <div style={{ fontSize:'28px', opacity:.2 }}>◈</div>
          <div style={{ fontSize:'14px', fontWeight:500, color:text2, marginTop:'12px' }}>Actividad & Logs</div>
          <div style={{ fontSize:'12px', color:text3, marginTop:'6px' }}>Disponible post-pitch · conecta con Supabase</div>
        </div>
      )}
    </div>
  )
}

// ── VISTA PRINCIPAL ──────────────────────────────────────
export default function TenantsView({ accent, accentBg, text, text2, text3, border, white, bg }) {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter]     = useState('todos')
  const [hovRow, setHovRow]     = useState(null)
  const [showDrawer, setShowDrawer] = useState(false)

  const filtered = TENANTS.filter(t => filter==='todos' ? true : filter==='prov' ? t.type==='prov' : t.type==='ret')

  if (selected) {
    return <TenantDetail tenant={selected} onBack={() => setSelected(null)} {...{accent,accentBg,text,text2,text3,border,white,bg}}/>
  }

  return (
    <div className="fade-in">
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}} .fade-in{animation:fadeUp .2s ease-out} @keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {showDrawer && <DrawerNuevoTenant onClose={() => setShowDrawer(false)} {...{accent,accentBg,text,text2,text3,border,white,bg}}/>}

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px' }}>
        <div>
          <div style={{ fontSize:'14px', fontWeight:600, color:text }}>Tenants</div>
          <div style={{ fontSize:'11px', color:text3, marginTop:'1px' }}>{TENANTS.length} empresas registradas en la plataforma</div>
        </div>
        <button onClick={() => setShowDrawer(true)}
          style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'12px', padding:'7px 16px', borderRadius:'8px', border:'none', background:accent, color:'#fff', cursor:'pointer', fontFamily:"'Inter',sans-serif", fontWeight:500 }}>
          + Nuevo tenant
        </button>
      </div>

      {/* Filtros */}
      <div style={{ display:'flex', gap:'4px', marginBottom:'12px' }}>
        {[['todos','Todos'],['ret','Retail'],['prov','Proveedor']].map(([id,lbl]) => (
          <button key={id} onClick={() => setFilter(id)}
            style={{ padding:'5px 12px', borderRadius:'7px', border:`1px solid ${filter===id?'rgba(0,194,168,0.3)':border}`, background:filter===id?accentBg:white, color:filter===id?accent:text2, fontSize:'12px', fontWeight:filter===id?500:400, cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'all .15s' }}>
            {lbl}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div style={{ background:white, border:`1px solid ${border}`, borderRadius:'10px', overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr .8fr .9fr .6fr 1fr .9fr .4fr', gap:'8px', padding:'8px 16px', background:'#FAFAF9', borderBottom:`1px solid ${border}` }}>
          {['Empresa','Tipo','Plan','Txns hoy','Estado','Últ. actividad',''].map(h => (
            <span key={h} style={{ fontSize:'10px', color:text3, textTransform:'uppercase', letterSpacing:'.7px', fontWeight:500 }}>{h}</span>
          ))}
        </div>
        {filtered.map((t,i) => (
          <div key={t.id} onMouseEnter={()=>setHovRow(t.id)} onMouseLeave={()=>setHovRow(null)} onClick={()=>setSelected(t)}
            style={{ display:'grid', gridTemplateColumns:'2fr .8fr .9fr .6fr 1fr .9fr .4fr', gap:'8px', padding:'11px 16px', borderBottom:i<filtered.length-1?`1px solid ${border}`:'none', alignItems:'center', background:hovRow===t.id?'#FAFAF9':white, cursor:'pointer', transition:'background .1s' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:SC[t.status], flexShrink:0 }}/>
              <div>
                <div style={{ fontSize:'13px', fontWeight:500, color:text }}>{t.name}</div>
                <div style={{ fontSize:'10px', color:text3, fontFamily:'monospace' }}>{t.slug}</div>
              </div>
            </div>
            <span style={{ fontSize:'11px', fontWeight:500, padding:'2px 8px', borderRadius:'20px', background:t.type==='prov'?'#EFF6FF':'#F0FDF4', color:t.type==='prov'?'#2563EB':'#16A34A', display:'inline-block' }}>
              {t.type==='prov'?'Proveedor':'Retail'}
            </span>
            <span style={{ fontSize:'11px', fontWeight:500, padding:'2px 8px', borderRadius:'20px', background:t.plan==='Professional'?'#F5F3FF':'#F3F4F6', color:t.plan==='Professional'?'#7C3AED':'#6B7280', display:'inline-block' }}>{t.plan}</span>
            <span style={{ fontSize:'13px', fontWeight:500, color:t.txns>0?text:text3 }}>{t.txns>0?t.txns.toLocaleString():'—'}</span>
            <span style={{ fontSize:'11px', fontWeight:500, padding:'3px 8px', borderRadius:'20px', background:`${SC[t.status]}14`, color:SC[t.status], display:'inline-flex', alignItems:'center', gap:'4px' }}>
              <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:SC[t.status] }}/>{SL[t.status]}
            </span>
            <span style={{ fontSize:'11px', color:text3 }}>{t.lastSeen}</span>
            <span style={{ fontSize:'12px', color:hovRow===t.id?accent:text3, textAlign:'right', transition:'color .15s' }}>→</span>
          </div>
        ))}
      </div>
    </div>
  )
}
