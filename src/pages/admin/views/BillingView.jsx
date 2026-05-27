import { useState } from 'react'

const PLANES_INIT = [
  {
    id: 'starter',
    nombre: 'Starter',
    tipo: 'prov',
    precio: 1900,
    descripcion: 'Módulo core de OC con API básica incluida',
    color: '#0E4D92', bg: '#EEF5FF',
    tenants: 0,
    mrr: 0,
    features: ['Módulo OC', 'Hasta 500 OCs/mes', 'Portal web + mobile', 'API básica OC', 'Soporte email 48h'],
    activo: true,
  },
  {
    id: 'professional',
    nombre: 'Professional',
    tipo: 'prov',
    precio: 2900,
    descripcion: 'Plataforma O2P completa con soporte prioritario',
    color: '#7C3AED', bg: '#F5F3FF',
    tenants: 1,
    mrr: 2900,
    features: ['Todo Starter', 'OCs ilimitadas', 'Trazabilidad completa', 'Módulo Financiero', 'Soporte SLA 4h', 'API avanzada'],
    activo: true,
  },
  {
    id: 'introduccion',
    nombre: 'Introducción',
    tipo: 'ret',
    precio: 399,
    descripcion: 'Precio especial de lanzamiento para retails',
    color: '#C2410C', bg: '#FFF7ED',
    tenants: 5,
    mrr: 1995,
    features: ['Hasta 50 proveedores', '2,000 OCs/mes', 'Portal web + mobile', 'API REST básica', 'Soporte email 48h'],
    activo: true,
  },
  {
    id: 'crecimiento',
    nombre: 'Crecimiento',
    tipo: 'ret',
    precio: 799,
    descripcion: 'Para retails con operación establecida',
    color: '#166534', bg: '#F0FDF4',
    tenants: 0,
    mrr: 0,
    features: ['Hasta 200 proveedores', '10,000 OCs/mes', 'PWA', 'API avanzada', 'Soporte SLA 4h', 'Ejecutivo de cuenta'],
    activo: true,
  },
  {
    id: 'enterprise',
    nombre: 'Enterprise',
    tipo: 'ret',
    precio: null,
    descripcion: 'Para grandes retails con ERP corporativo',
    color: '#7C3AED', bg: '#F5F3FF',
    tenants: 0,
    mrr: 0,
    features: ['Proveedores ilimitados', 'OCs ilimitadas', 'EDI a medida', 'ERP SAP/Oracle', 'Soporte 24/7', 'SLA por contrato'],
    activo: true,
  },
]

const CUPONES_INIT = [
  { id:1, codigo:'NEXO2025', descuento:20, tipo:'%',    plan:'todos',        usos:2,  maxUsos:10, activo:true,  vence:'31 Dic 2025' },
  { id:2, codigo:'ARCA100',  descuento:100, tipo:'S/',  plan:'Professional', usos:1,  maxUsos:1,  activo:false, vence:'31 May 2025' },
  { id:3, codigo:'RETAIL50', descuento:50, tipo:'S/',   plan:'Introducción', usos:0,  maxUsos:5,  activo:true,  vence:'31 Dic 2025' },
]

export default function BillingView({ accent, accentBg, text, text2, text3, border, white, bg }) {
  const [planes, setPlanes]   = useState(PLANES_INIT)
  const [cupones, setCupones] = useState(CUPONES_INIT)
  const [editPlan, setEditPlan] = useState(null)
  const [showNewCupon, setShowNewCupon] = useState(false)
  const [newCupon, setNewCupon] = useState({ codigo:'', descuento:'', tipo:'%', plan:'todos', maxUsos:'10', vence:'' })
  const [tab, setTab] = useState('planes')

  const totalMRR = planes.reduce((s,p) => s + p.mrr, 0)
  const totalTenants = planes.reduce((s,p) => s + p.tenants, 0)

  const card = { background:white, border:`1px solid ${border}`, borderRadius:'10px' }
  const inp = { width:'100%', padding:'8px 12px', border:`1px solid ${border}`, borderRadius:'8px', fontSize:'13px', fontFamily:"'Inter',sans-serif", color:text, outline:'none', boxSizing:'border-box', background:white }

  return (
    <div style={{ fontFamily:"'Inter',sans-serif" }}>

      {/* KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'14px' }}>
        {[
          { label:'Planes activos',   val: planes.filter(p=>p.activo).length,         color:accent,    icon:'📋' },
          { label:'Tenants activos',  val: totalTenants,                               color:'#7C3AED', icon:'🏢' },
          { label:'MRR de planes',    val:`S/ ${totalMRR.toLocaleString()}`,           color:'#10B981', icon:'💰' },
          { label:'Cupones activos',  val: cupones.filter(c=>c.activo).length,         color:'#F59E0B', icon:'🎟' },
        ].map(m => (
          <div key={m.label} style={{ ...card, padding:'16px 18px' }}>
            <div style={{ fontSize:'18px', marginBottom:'8px' }}>{m.icon}</div>
            <div style={{ fontSize:'9px', color:text3, textTransform:'uppercase', letterSpacing:'.6px', marginBottom:'4px' }}>{m.label}</div>
            <div style={{ fontFamily:"'Fraunces',serif", fontSize:'22px', fontWeight:700, color:m.color }}>{m.val}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:'2px', marginBottom:'14px', background:bg, padding:'3px', borderRadius:'9px', border:`1px solid ${border}`, width:'fit-content' }}>
        {[['planes','Planes activos'],['cupones','Cupones & Descuentos']].map(([id,lbl]) => (
          <button key={id} onClick={()=>setTab(id)}
            style={{ padding:'6px 16px', borderRadius:'7px', border:'none', background:tab===id?white:'transparent', color:tab===id?text:text3, fontSize:'12px', fontWeight:tab===id?500:400, cursor:'pointer', fontFamily:"'Inter',sans-serif", boxShadow:tab===id?'0 1px 4px rgba(0,0,0,0.06)':'none', transition:'all .15s' }}>
            {lbl}
          </button>
        ))}
      </div>

      {/* Tab Planes */}
      {tab === 'planes' && (
        <div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'14px' }}>
            <div style={{ ...card, padding:'12px 16px' }}>
              <div style={{ fontSize:'11px', color:text3, marginBottom:'8px', fontWeight:500 }}>PARA PROVEEDORES</div>
              {planes.filter(p=>p.tipo==='prov').map(p => (
                <div key={p.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:`1px solid ${border}` }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <span style={{ fontSize:'11px', fontWeight:600, padding:'2px 8px', borderRadius:'6px', background:p.bg, color:p.color }}>{p.nombre}</span>
                    <span style={{ fontSize:'11px', color:text2 }}>{p.tenants} tenant{p.tenants!==1?'s':''}</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <span style={{ fontFamily:"'Fraunces',serif", fontSize:'15px', fontWeight:700, color:p.precio?accent:text3 }}>
                      {p.precio ? `S/ ${p.precio.toLocaleString()}` : 'A medida'}
                    </span>
                    <button onClick={() => setEditPlan({...p})}
                      style={{ fontSize:'11px', padding:'4px 10px', border:`1px solid ${border}`, borderRadius:'6px', background:bg, color:text2, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ ...card, padding:'12px 16px' }}>
              <div style={{ fontSize:'11px', color:text3, marginBottom:'8px', fontWeight:500 }}>PARA RETAILS</div>
              {planes.filter(p=>p.tipo==='ret').map(p => (
                <div key={p.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:`1px solid ${border}` }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <span style={{ fontSize:'11px', fontWeight:600, padding:'2px 8px', borderRadius:'6px', background:p.bg, color:p.color }}>{p.nombre}</span>
                    <span style={{ fontSize:'11px', color:text2 }}>{p.tenants} tenant{p.tenants!==1?'s':''}</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <span style={{ fontFamily:"'Fraunces',serif", fontSize:'15px', fontWeight:700, color:p.precio?accent:text3 }}>
                      {p.precio ? `S/ ${p.precio.toLocaleString()}` : 'A medida'}
                    </span>
                    <button onClick={() => setEditPlan({...p})}
                      style={{ fontSize:'11px', padding:'4px 10px', border:`1px solid ${border}`, borderRadius:'6px', background:bg, color:text2, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detalle completo de planes */}
          <div style={{ ...card, overflow:'hidden' }}>
            <div style={{ padding:'12px 16px', borderBottom:`1px solid ${border}` }}>
              <div style={{ fontSize:'12px', fontWeight:600, color:text }}>Detalle de features por plan</div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', borderBottom:`1px solid ${border}` }}>
              {planes.map(p => (
                <div key={p.id} style={{ padding:'14px 16px', borderRight:`1px solid ${border}`, textAlign:'center' }}>
                  <span style={{ fontSize:'11px', fontWeight:600, padding:'3px 10px', borderRadius:'8px', background:p.bg, color:p.color, display:'inline-block', marginBottom:'6px' }}>{p.nombre}</span>
                  <div style={{ fontFamily:"'Fraunces',serif", fontSize:'16px', fontWeight:700, color:p.precio?accent:text3 }}>
                    {p.precio ? `S/ ${p.precio}` : 'Cotizar'}
                  </div>
                  <div style={{ fontSize:'9px', color:text3 }}>{p.tipo==='prov'?'Proveedor':'Retail'}</div>
                </div>
              ))}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)' }}>
              {planes.map(p => (
                <div key={p.id} style={{ padding:'14px 16px', borderRight:`1px solid ${border}` }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'11px', color:text2, marginBottom:'6px' }}>
                      <span style={{ color:p.color, flexShrink:0 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Cupones */}
      {tab === 'cupones' && (
        <div>
          <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:'12px' }}>
            <button onClick={() => setShowNewCupon(true)}
              style={{ display:'flex', alignItems:'center', gap:'5px', padding:'7px 16px', border:'none', background:accent, color:'#fff', borderRadius:'8px', fontSize:'12px', fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
              + Nuevo cupón
            </button>
          </div>
          <div style={{ ...card, overflow:'hidden' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr .8fr 80px', gap:'8px', padding:'8px 16px', background:'#FAFAF9', borderBottom:`1px solid ${border}` }}>
              {['Código','Descuento','Plan','Usos','Vence','Estado',''].map(h => (
                <span key={h} style={{ fontSize:'10px', color:text3, textTransform:'uppercase', letterSpacing:'.6px', fontWeight:500 }}>{h}</span>
              ))}
            </div>
            {cupones.map((cu,i) => (
              <div key={cu.id} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr .8fr 80px', gap:'8px', padding:'11px 16px', borderBottom:i<cupones.length-1?`1px solid ${border}`:'none', alignItems:'center' }}>
                <span style={{ fontFamily:'monospace', fontSize:'12px', fontWeight:700, color:accent, background:accentBg, padding:'2px 8px', borderRadius:'5px', display:'inline-block' }}>{cu.codigo}</span>
                <span style={{ fontSize:'13px', fontWeight:700, color:text, fontFamily:"'Fraunces',serif" }}>{cu.tipo==='%'?`${cu.descuento}%`:`S/ ${cu.descuento}`}</span>
                <span style={{ fontSize:'11px', color:text2 }}>{cu.plan}</span>
                <span style={{ fontSize:'11px', color:text2 }}>{cu.usos} / {cu.maxUsos}</span>
                <span style={{ fontSize:'11px', color:text2 }}>{cu.vence}</span>
                <span style={{ fontSize:'10px', fontWeight:600, padding:'2px 8px', borderRadius:'10px', background:cu.activo?'#F0FDF4':'#F3F4F6', color:cu.activo?'#166534':'#6B7280', display:'inline-block' }}>
                  {cu.activo?'Activo':'Inactivo'}
                </span>
                <div style={{ display:'flex', gap:'4px' }}>
                  <button onClick={() => setCupones(cs => cs.map(c => c.id===cu.id?{...c,activo:!c.activo}:c))}
                    style={{ fontSize:'10px', padding:'3px 8px', border:`1px solid ${border}`, borderRadius:'5px', background:bg, color:text2, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                    {cu.activo?'Pausar':'Activar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal editar plan */}
      {editPlan && (
        <>
          <div onClick={() => setEditPlan(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.3)', zIndex:60, backdropFilter:'blur(2px)' }}/>
          <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'460px', background:white, borderRadius:'14px', zIndex:70, boxShadow:'0 24px 64px rgba(0,0,0,0.15)', overflow:'hidden' }}>
            <div style={{ padding:'18px 24px 14px', borderBottom:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div>
                <div style={{ fontSize:'15px', fontWeight:600, color:text }}>Editar plan</div>
                <span style={{ fontSize:'11px', fontWeight:600, padding:'2px 8px', borderRadius:'6px', background:editPlan.bg, color:editPlan.color }}>{editPlan.nombre}</span>
              </div>
              <button onClick={() => setEditPlan(null)} style={{ width:'28px', height:'28px', borderRadius:'50%', border:`1px solid ${border}`, background:bg, cursor:'pointer', color:text2, fontSize:'14px' }}>×</button>
            </div>
            <div style={{ padding:'20px 24px' }}>
              <div style={{ marginBottom:'14px' }}>
                <label style={{ fontSize:'11px', fontWeight:600, color:text2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>Nombre del plan</label>
                <input value={editPlan.nombre} onChange={e=>setEditPlan(p=>({...p,nombre:e.target.value}))} style={inp}/>
              </div>
              <div style={{ marginBottom:'14px' }}>
                <label style={{ fontSize:'11px', fontWeight:600, color:text2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>
                  Precio mensual (S/) · Sin IGV
                </label>
                <input type="number" value={editPlan.precio||''} onChange={e=>setEditPlan(p=>({...p,precio:parseInt(e.target.value)||null}))}
                  placeholder="Dejar vacío = A medida" style={inp}/>
              </div>
              <div style={{ marginBottom:'20px' }}>
                <label style={{ fontSize:'11px', fontWeight:600, color:text2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>Descripción</label>
                <input value={editPlan.descripcion} onChange={e=>setEditPlan(p=>({...p,descripcion:e.target.value}))} style={inp}/>
              </div>
              <div style={{ padding:'10px 14px', background:'#FFFBEB', borderRadius:'8px', border:'1px solid #FDE68A', fontSize:'11px', color:'#92400E', marginBottom:'16px' }}>
                ⚠ Cambiar el precio no afecta contratos existentes — solo aplica a nuevos clientes.
              </div>
              <div style={{ display:'flex', gap:'8px' }}>
                <button onClick={() => setEditPlan(null)} style={{ flex:1, padding:'10px', border:`1px solid ${border}`, borderRadius:'8px', background:bg, color:text2, fontSize:'13px', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Cancelar</button>
                <button onClick={() => {
                  setPlanes(ps => ps.map(p => p.id===editPlan.id?editPlan:p))
                  setEditPlan(null)
                }} style={{ flex:2, padding:'10px', border:'none', borderRadius:'8px', background:text, color:'#fff', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal nuevo cupón */}
      {showNewCupon && (
        <>
          <div onClick={() => setShowNewCupon(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.3)', zIndex:60, backdropFilter:'blur(2px)' }}/>
          <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'440px', background:white, borderRadius:'14px', zIndex:70, boxShadow:'0 24px 64px rgba(0,0,0,0.15)', overflow:'hidden' }}>
            <div style={{ padding:'18px 24px 14px', borderBottom:`1px solid ${border}` }}>
              <div style={{ fontSize:'15px', fontWeight:600, color:text }}>Nuevo cupón de descuento</div>
            </div>
            <div style={{ padding:'20px 24px' }}>
              {[
                { label:'Código', key:'codigo', placeholder:'Ej: NEXO30' },
                { label:'Usos máximos', key:'maxUsos', placeholder:'Ej: 10' },
                { label:'Fecha de vencimiento', key:'vence', placeholder:'Ej: 31 Dic 2026' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom:'12px' }}>
                  <label style={{ fontSize:'11px', fontWeight:600, color:text2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>{f.label}</label>
                  <input value={newCupon[f.key]} onChange={e=>setNewCupon(c=>({...c,[f.key]:e.target.value}))} placeholder={f.placeholder} style={inp}/>
                </div>
              ))}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'12px' }}>
                <div>
                  <label style={{ fontSize:'11px', fontWeight:600, color:text2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>Descuento</label>
                  <input type="number" value={newCupon.descuento} onChange={e=>setNewCupon(c=>({...c,descuento:e.target.value}))} placeholder="Ej: 20" style={inp}/>
                </div>
                <div>
                  <label style={{ fontSize:'11px', fontWeight:600, color:text2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>Tipo</label>
                  <select value={newCupon.tipo} onChange={e=>setNewCupon(c=>({...c,tipo:e.target.value}))}
                    style={{ ...inp, cursor:'pointer' }}>
                    <option value="%">Porcentaje (%)</option>
                    <option value="S/">Monto fijo (S/)</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom:'20px' }}>
                <label style={{ fontSize:'11px', fontWeight:600, color:text2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>Aplicar a plan</label>
                <select value={newCupon.plan} onChange={e=>setNewCupon(c=>({...c,plan:e.target.value}))}
                  style={{ ...inp, cursor:'pointer' }}>
                  <option value="todos">Todos los planes</option>
                  {PLANES_INIT.map(p => <option key={p.id} value={p.nombre}>{p.nombre}</option>)}
                </select>
              </div>
              <div style={{ display:'flex', gap:'8px' }}>
                <button onClick={() => setShowNewCupon(false)} style={{ flex:1, padding:'10px', border:`1px solid ${border}`, borderRadius:'8px', background:bg, color:text2, fontSize:'13px', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Cancelar</button>
                <button onClick={() => {
                  if (!newCupon.codigo || !newCupon.descuento) return
                  setCupones(cs => [...cs, { id:Date.now(), ...newCupon, descuento:parseFloat(newCupon.descuento), maxUsos:parseInt(newCupon.maxUsos)||10, usos:0, activo:true }])
                  setNewCupon({ codigo:'', descuento:'', tipo:'%', plan:'todos', maxUsos:'10', vence:'' })
                  setShowNewCupon(false)
                }} style={{ flex:2, padding:'10px', border:'none', borderRadius:'8px', background:accent, color:'#fff', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                  Crear cupón
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
