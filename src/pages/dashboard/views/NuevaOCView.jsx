import { useState, useEffect } from 'react'
import { useIsMobile } from '../../../hooks/useMediaQuery'
import { catalogData } from '../../../data/mockData'

const STOCK_MOCK = {
  '07702459082090': { disponible: 120, unidad: 'Pack x12' },
  '07702459082014': { disponible: 200, unidad: 'Pack x24' },
  '07702459082038': { disponible: 18,  unidad: 'Pack x24' },
  '07702459082045': { disponible: 0,   unidad: 'Pack x24' },
}

const ALMACENES = [
  'CD Wong Ate', 'CD Wong Miraflores', 'CD Wong San Miguel',
  'CD Wong La Molina', 'CD Wong Chorrillos', 'CD Wong San Borja',
]

const PROVEEDORES = [
  { id:1, name:'Arca Continental', contacto:'Ricardo Torres', email:'r.torres@arca.com.pe', tel:'+51 1 618-7500' },
  { id:2, name:'Alicorp S.A.A.',   contacto:'María Flores',  email:'m.flores@alicorp.pe',  tel:'+51 1 315-0800' },
]

const TIPO_PAGO = ['Contado','15 días','30 días','60 días','90 días']
const TIPO_OC   = ['220 - Orden de Compra','221 - Orden de Reposición','222 - Orden de Urgencia']

const initialProductos = [
  { ean:'07702459082090', nombre:'Inca Kola 1.5L',       presentacion:'Pack x12', cantidad:24, precio:62.40, bonif:2 },
  { ean:'07702459082014', nombre:'Coca-Cola 500ml',       presentacion:'Pack x24', cantidad:48, precio:48.00, bonif:4 },
  { ean:'07702459082038', nombre:'Coca-Cola Zero 500ml',  presentacion:'Pack x24', cantidad:36, precio:48.00, bonif:3 },
  { ean:'07702459082045', nombre:'Sprite 500ml',          presentacion:'Pack x24', cantidad:24, precio:46.80, bonif:2 },
]

// ── MODAL AGREGAR PRODUCTO ───────────────────────────────
function AgregarProductoModal({ onClose, onAgregar, productosActuales }) {
  const [buscar, setBuscar] = useState('')
  const disponibles = catalogData.filter(p =>
    p.status === 'active' &&
    !productosActuales.find(x => x.ean === p.ean) &&
    (p.name.toLowerCase().includes(buscar.toLowerCase()) || p.ean.includes(buscar))
  )

  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(11,31,58,0.55)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }} onClick={onClose}>
      <div style={{ background:'#fff', borderRadius:'16px', width:'100%', maxWidth:'560px', maxHeight:'80vh', overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 24px 80px rgba(0,0,0,0.2)' }} onClick={e=>e.stopPropagation()}>
        <div style={{ padding:'18px 24px', borderBottom:'1px solid rgba(14,77,146,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ fontFamily:"'Fraunces',serif", fontSize:'17px', fontWeight:900, color:'#0B1F3A' }}>Agregar producto</div>
          <button onClick={onClose} style={{ width:'30px', height:'30px', borderRadius:'8px', border:'1px solid rgba(14,77,146,0.1)', background:'#F8FBFF', cursor:'pointer', color:'#6B8BAE', fontSize:'14px' }}>✕</button>
        </div>
        <div style={{ padding:'14px 24px', borderBottom:'1px solid rgba(14,77,146,0.08)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', background:'#F0F7FF', border:'1px solid rgba(14,77,146,0.1)', borderRadius:'8px', padding:'6px 12px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B8BAE" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input value={buscar} onChange={e=>setBuscar(e.target.value)} placeholder="Buscar por nombre o EAN..." autoFocus
              style={{ border:'none', outline:'none', background:'transparent', fontSize:'12px', color:'#0B1F3A', width:'100%', fontFamily:"'DM Sans',sans-serif" }}/>
          </div>
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:'8px 0' }}>
          {disponibles.length === 0
            ? <div style={{ textAlign:'center', padding:'32px', color:'#6B8BAE', fontSize:'13px' }}>No hay productos disponibles</div>
            : disponibles.map(p => {
                const stock = STOCK_MOCK[p.ean]
                return (
                  <div key={p.ean} onClick={() => { onAgregar(p); onClose() }}
                    style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 24px', cursor:'pointer', transition:'background .15s' }}
                    onMouseEnter={e=>e.currentTarget.style.background='#F0F7FF'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <div>
                      <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'2px' }}>{p.name}</div>
                      <div style={{ fontSize:'10px', color:'#6B8BAE' }}>{p.presentation} · EAN: {p.ean}</div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontFamily:'monospace', fontSize:'12px', fontWeight:700, color:'#0B1F3A' }}>{p.basePrice}</div>
                      {stock && (
                        <div style={{ fontSize:'10px', color: stock.disponible===0?'#DC2626':stock.disponible<20?'#D97706':'#166534', fontWeight:500 }}>
                          {stock.disponible===0 ? 'Sin stock' : `Stock: ${stock.disponible}`}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
          }
        </div>
      </div>
    </div>
  )
}

// ── MODAL CONFIRMACIÓN DE STOCK ──────────────────────────
function StockConfirmModal({ productos, proveedor, onConfirm, onClose }) {
  const [confirming, setConfirming] = useState(false)

  const checks = productos.map(p => {
    const stock = STOCK_MOCK[p.ean]
    if (!stock) return { ...p, status:'ok' }
    if (stock.disponible === 0) return { ...p, status:'error', msg:'Sin stock disponible' }
    if (stock.disponible < p.cantidad) return { ...p, status:'warn', msg:`Stock disponible: ${stock.disponible} (pediste ${p.cantidad})` }
    return { ...p, status:'ok', msg:`Stock disponible: ${stock.disponible}` }
  })

  const hasErrors = checks.some(c => c.status === 'error')
  const hasWarns  = checks.some(c => c.status === 'warn')

  const handleConfirm = () => {
    setConfirming(true)
    setTimeout(() => { onConfirm() }, 1500)
  }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(11,31,58,0.6)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }} onClick={onClose}>
      <div style={{ background:'#fff', borderRadius:'16px', width:'100%', maxWidth:'560px', maxHeight:'85vh', overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 24px 80px rgba(0,0,0,0.2)' }} onClick={e=>e.stopPropagation()}>

        <div style={{ padding:'18px 24px', borderBottom:'1px solid rgba(14,77,146,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontFamily:"'Fraunces',serif", fontSize:'17px', fontWeight:900, color:'#0B1F3A' }}>Confirmación de stock</div>
            <div style={{ fontSize:'11px', color:'#6B8BAE', marginTop:'2px' }}>Verificando disponibilidad con {proveedor}</div>
          </div>
          <button onClick={onClose} style={{ width:'30px', height:'30px', borderRadius:'8px', border:'1px solid rgba(14,77,146,0.1)', background:'#F8FBFF', cursor:'pointer', color:'#6B8BAE', fontSize:'14px' }}>✕</button>
        </div>

        {/* Banner estado */}
        {hasErrors && (
          <div style={{ margin:'12px 24px 0', padding:'10px 14px', background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:'8px', fontSize:'12px', color:'#DC2626', display:'flex', alignItems:'center', gap:'8px' }}>
            ⚠ Algunos productos no tienen stock suficiente. Ajusta las cantidades antes de confirmar.
          </div>
        )}
        {!hasErrors && hasWarns && (
          <div style={{ margin:'12px 24px 0', padding:'10px 14px', background:'#FFFBEB', border:'1px solid #FDE68A', borderRadius:'8px', fontSize:'12px', color:'#D97706', display:'flex', alignItems:'center', gap:'8px' }}>
            ⚠ Algunos productos tienen stock limitado. Puedes continuar o ajustar cantidades.
          </div>
        )}
        {!hasErrors && !hasWarns && (
          <div style={{ margin:'12px 24px 0', padding:'10px 14px', background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:'8px', fontSize:'12px', color:'#166534', display:'flex', alignItems:'center', gap:'8px' }}>
            ✓ Todos los productos tienen stock disponible. Lista para enviar.
          </div>
        )}

        {/* Lista de productos */}
        <div style={{ flex:1, overflowY:'auto', padding:'12px 24px' }}>
          {checks.map((p,i) => (
            <div key={p.ean} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'10px 0', borderBottom: i<checks.length-1?'1px solid rgba(14,77,146,0.06)':'none' }}>
              <div style={{ width:'28px', height:'28px', borderRadius:'50%', background: p.status==='ok'?'#F0FDF4':p.status==='warn'?'#FFFBEB':'#FEF2F2', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', flexShrink:0 }}>
                {p.status==='ok'?'✓':p.status==='warn'?'⚠':'✗'}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A' }}>{p.nombre}</div>
                <div style={{ fontSize:'10px', color:'#6B8BAE' }}>{p.presentacion} · Pedido: {p.cantidad} unidades</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:'10px', fontWeight:600, color: p.status==='ok'?'#166534':p.status==='warn'?'#D97706':'#DC2626' }}>
                  {p.status==='ok' ? `✓ ${STOCK_MOCK[p.ean]?.disponible ?? '—'} disponibles` : p.msg}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding:'16px 24px', borderTop:'1px solid rgba(14,77,146,0.08)', display:'flex', gap:'8px' }}>
          <button onClick={onClose} style={{ flex:1, padding:'10px', border:'1px solid rgba(14,77,146,0.1)', borderRadius:'8px', background:'#F8FBFF', color:'#6B8BAE', fontSize:'13px', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
            Ajustar cantidades
          </button>
          <button onClick={handleConfirm} disabled={hasErrors||confirming}
            style={{ flex:2, padding:'10px', border:'none', borderRadius:'8px', background: hasErrors?'#F3F4F6':'#064E3B', color: hasErrors?'#9CA3AF':'#4ADE80', fontSize:'13px', fontWeight:700, cursor: hasErrors?'not-allowed':'pointer', fontFamily:"'DM Sans',sans-serif", display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', transition:'all .2s' }}>
            {confirming
              ? <><span style={{ width:'12px', height:'12px', border:'2px solid rgba(74,222,128,0.3)', borderTopColor:'#4ADE80', borderRadius:'50%', display:'inline-block', animation:'spin .7s linear infinite' }}/> Enviando a {proveedor}...</>
              : `Confirmar y enviar a ${proveedor} →`
            }
          </button>
        </div>
      </div>
    </div>
  )
}

// ── VISTA PRINCIPAL ──────────────────────────────────────
export default function NuevaOCView({ setView }) {
  const [productos, setProductos]     = useState(initialProductos)
  const [showAgregar, setShowAgregar] = useState(false)
  const [showStock, setShowStock]     = useState(false)
  const [enviado, setEnviado]         = useState(false)
  const isMobile = useIsMobile()

  const [form, setForm] = useState({
    proveedor:    'Arca Continental',
    sitio:        'CD Wong Ate',
    fechaEmision: new Date().toISOString().split('T')[0],
    fechaMin:     '2026-05-25',
    fechaMax:     '2026-05-28',
    tipoPago:     '30 días',
    tipoOC:       '220 - Orden de Compra',
    moneda:       'PEN',
    ocAnterior:   '',
    nota:         '',
  })

  const [tc, setTc] = useState({ compra: null, venta: null, fecha: null, loading: false, error: false })

  useEffect(() => {
    if (form.moneda === 'USD') {
      setTc(t => ({...t, loading: true, error: false}))
      fetch('https://api.apis.net.pe/v2/tipo-cambio-sunat')
        .then(r => r.json())
        .then(d => setTc({ compra: d.compra, venta: d.venta, fecha: d.fecha, loading: false, error: false }))
        .catch(() => setTc(t => ({...t, loading: false, error: true})))
    }
  }, [form.moneda])

  const provInfo = PROVEEDORES.find(p => p.name === form.proveedor)

  const updateCantidad = (ean, val) =>
    setProductos(prev => prev.map(p => p.ean===ean ? {...p, cantidad:Math.max(1,parseInt(val)||1)} : p))

  const updateBonif = (ean, val) =>
    setProductos(prev => prev.map(p => p.ean===ean ? {...p, bonif:Math.max(0,parseInt(val)||0)} : p))

  const quitar = (ean) => setProductos(prev => prev.filter(p => p.ean!==ean))

  const agregar = (p) =>
    setProductos(prev => [...prev, { ean:p.ean, nombre:p.name, presentacion:p.presentation, cantidad:1, precio:parseFloat(p.basePrice.replace('S/','')), bonif:0 }])

  const subtotal = productos.reduce((s,p) => s + p.cantidad * p.precio, 0)
  const igv      = subtotal * 0.18
  const total    = subtotal + igv

  const handleConfirm = () => {
    setShowStock(false)
    setEnviado(true)
    setTimeout(() => setView('mis-ocs'), 2500)
  }

  const lbl = { fontSize:'10px', fontWeight:600, color:'#6B8BAE', textTransform:'uppercase', letterSpacing:'0.4px', display:'block', marginBottom:'5px' }
  const inp = { width:'100%', height:'34px', border:'1px solid rgba(14,77,146,0.15)', borderRadius:'8px', padding:'0 12px', fontSize:'12px', fontFamily:"'DM Sans',sans-serif", color:'#0B1F3A', outline:'none', boxSizing:'border-box' }
  const sel = { ...inp, background:'#fff', cursor:'pointer' }

  if (enviado) return (
    <div style={{ textAlign:'center', paddingTop:'80px' }}>
      <style>{`@keyframes pop{0%{transform:scale(0)}70%{transform:scale(1.1)}100%{transform:scale(1)}}`}</style>
      <div style={{ width:'64px', height:'64px', borderRadius:'50%', background:'#EAF3DE', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', margin:'0 auto 16px', animation:'pop .4s ease-out' }}>✓</div>
      <div style={{ fontFamily:"'Fraunces',serif", fontSize:'24px', fontWeight:900, color:'#0B1F3A', marginBottom:'8px' }}>¡OC enviada exitosamente!</div>
      <div style={{ fontSize:'13px', color:'#6B8BAE', marginBottom:'4px' }}>Arca Continental recibirá tu orden en segundos.</div>
      <div style={{ fontSize:'12px', color:'#9DB8D9', marginBottom:'16px' }}>Redirigiendo a Mis Órdenes...</div>
      <div style={{ display:'inline-flex', gap:'16px', fontSize:'12px', color:'#6B8BAE', background:'#F8FBFF', padding:'10px 20px', borderRadius:'20px', border:'1px solid rgba(14,77,146,0.08)' }}>
        <span>📦 {productos.length} productos</span>
        <span>💰 S/{total.toLocaleString('es-PE',{minimumFractionDigits:2})}</span>
        <span>📅 {form.tipoPago}</span>
      </div>
    </div>
  )

  return (
    <div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      {showAgregar && <AgregarProductoModal onClose={()=>setShowAgregar(false)} onAgregar={agregar} productosActuales={productos}/>}
      {showStock   && <StockConfirmModal productos={productos} proveedor={form.proveedor} onConfirm={handleConfirm} onClose={()=>setShowStock(false)}/>}

      {/* Banner */}
      <div style={{ background:'#EAF3DE', border:'1px solid #86EFAC', borderRadius:'8px', padding:'10px 14px', fontSize:'12px', color:'#166534', marginBottom:'16px', display:'flex', alignItems:'center', gap:'8px' }}>
        ✓ NEXO enviará la OC automáticamente a {form.proveedor} al confirmar — sin correos ni llamadas.
      </div>

      {/* SECCIÓN 1 — Info del pedido */}
      <div style={{ background:'#fff', border:'1px solid rgba(14,77,146,0.1)', borderRadius:'12px', padding:'20px', marginBottom:'12px' }}>
        <div style={{ fontSize:'11px', fontWeight:600, color:'#6B8BAE', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'14px' }}>Información del pedido</div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'12px' }}>
          {/* Proveedor */}
          <div>
            <label style={lbl}>Proveedor</label>
            <select value={form.proveedor} onChange={e=>setForm(f=>({...f,proveedor:e.target.value}))} style={sel}>
              {PROVEEDORES.map(p => <option key={p.id}>{p.name}</option>)}
            </select>
          </div>

          {/* Tipo OC */}
          <div>
            <label style={lbl}>Tipo de orden</label>
            <select value={form.tipoOC} onChange={e=>setForm(f=>({...f,tipoOC:e.target.value}))} style={sel}>
              {TIPO_OC.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* Fecha emisión */}
          <div>
            <label style={lbl}>Fecha de emisión</label>
            <input type="date" value={form.fechaEmision} onChange={e=>setForm(f=>({...f,fechaEmision:e.target.value}))} style={inp}/>
          </div>

          {/* Moneda */}
          <div>
            <label style={lbl}>Moneda</label>
            <select value={form.moneda} onChange={e=>setForm(f=>({...f,moneda:e.target.value}))} style={sel}>
              <option value="PEN">🇵🇪 Soles (PEN)</option>
              <option value="USD">🇺🇸 Dólares (USD)</option>
            </select>
          </div>

          {/* Fecha mín entrega */}
          <div>
            <label style={lbl}>Fecha mínima entrega</label>
            <input type="date" value={form.fechaMin} onChange={e=>setForm(f=>({...f,fechaMin:e.target.value}))} style={inp}/>
          </div>

          {/* Fecha máx entrega */}
          <div>
            <label style={lbl}>Fecha máxima entrega</label>
            <input type="date" value={form.fechaMax} onChange={e=>setForm(f=>({...f,fechaMax:e.target.value}))} style={inp}/>
          </div>

          {/* Almacén entrega */}
          <div>
            <label style={lbl}>Almacén de entrega</label>
            <select value={form.sitio} onChange={e=>setForm(f=>({...f,sitio:e.target.value}))} style={sel}>
              {ALMACENES.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>

          {/* Tipo de pago */}
          <div>
            <label style={lbl}>Condición de pago</label>
            <select value={form.tipoPago} onChange={e=>setForm(f=>({...f,tipoPago:e.target.value}))} style={sel}>
              {TIPO_PAGO.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* OC Anterior */}
          <div>
            <label style={lbl}>N° OC anterior (opcional)</label>
            <input value={form.ocAnterior} onChange={e=>setForm(f=>({...f,ocAnterior:e.target.value}))} placeholder="Ej: OC-2025-0840" style={inp}/>
          </div>
        </div>

        {/* Contacto del proveedor */}
        {provInfo && (
          <div style={{ background:'#F8FBFF', border:'1px solid rgba(14,77,146,0.08)', borderRadius:'8px', padding:'10px 14px', marginBottom:'12px', display:'flex', alignItems:'center', gap:'16px' }}>
            <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'#EEF5FF', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:700, color:'#0E4D92', flexShrink:0 }}>
              {provInfo.name[0]}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:'11px', fontWeight:600, color:'#0B1F3A' }}>Contacto: {provInfo.contacto}</div>
              <div style={{ fontSize:'10px', color:'#6B8BAE' }}>{provInfo.email} · {provInfo.tel}</div>
            </div>
            <div style={{ fontSize:'10px', color:'#166534', background:'#F0FDF4', padding:'3px 8px', borderRadius:'10px', border:'1px solid #BBF7D0' }}>● Conectado</div>
          </div>
        )}

        {/* Nota */}
        <div>
          <label style={lbl}>Observaciones / Nota para el proveedor (opcional)</label>
          <textarea value={form.nota} onChange={e=>setForm(f=>({...f,nota:e.target.value}))} placeholder="Ej: Entregar en horario de 8am-12pm, contactar a almacén..."
            style={{ width:'100%', height:'60px', border:'1px solid rgba(14,77,146,0.15)', borderRadius:'8px', padding:'8px 12px', fontSize:'12px', fontFamily:"'DM Sans',sans-serif", color:'#0B1F3A', outline:'none', resize:'none', boxSizing:'border-box' }}/>
        </div>
      </div>

      {/* SECCIÓN 2 — Productos */}
      <div style={{ background:'#fff', border:'1px solid rgba(14,77,146,0.1)', borderRadius:'12px', padding:'20px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px' }}>
          <div style={{ fontSize:'11px', fontWeight:600, color:'#6B8BAE', textTransform:'uppercase', letterSpacing:'0.5px' }}>
            Productos — {productos.length} items
          </div>
          <button onClick={()=>setShowAgregar(true)} style={{ padding:'6px 14px', background:'#EEF5FF', border:'none', borderRadius:'8px', fontSize:'11px', color:'#0E4D92', cursor:'pointer', fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>
            + Agregar producto
          </button>
        </div>

        {/* Tabla desktop */}
        {!isMobile && (
          <div style={{ border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', overflow:'hidden', marginBottom:'16px' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:'#F8FBFF', borderBottom:'1px solid rgba(14,77,146,0.08)' }}>
                  {['EAN','Producto','Presentación','Cantidad','Bonif.','Precio unit.','Subtotal','Stock',''].map(h => (
                    <th key={h} style={{ padding:'8px 12px', textAlign:'left', fontSize:'10px', color:'#6B8BAE', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.3px', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productos.map(p => {
                  const stock = STOCK_MOCK[p.ean]
                  const stockOk = !stock || stock.disponible >= p.cantidad
                  const stockWarn = stock && stock.disponible > 0 && stock.disponible < p.cantidad
                  const stockErr  = stock && stock.disponible === 0
                  return (
                    <tr key={p.ean} style={{ borderBottom:'1px solid rgba(14,77,146,0.05)', background: stockErr?'#FEF2F2':stockWarn?'#FFFBEB':'transparent' }}>
                      <td style={{ padding:'8px 12px' }}>
                        <span style={{ fontFamily:'monospace', fontSize:'10px', background:'#F0F7FF', color:'#6B8BAE', padding:'2px 6px', borderRadius:'4px' }}>{p.ean}</span>
                      </td>
                      <td style={{ padding:'8px 12px', fontSize:'12px', fontWeight:600, color:'#0B1F3A' }}>{p.nombre}</td>
                      <td style={{ padding:'8px 12px', fontSize:'11px', color:'#6B8BAE' }}>{p.presentacion}</td>
                      <td style={{ padding:'8px 12px' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                          <button onClick={()=>updateCantidad(p.ean,p.cantidad-1)} style={{ width:'24px', height:'24px', borderRadius:'6px', border:'1px solid rgba(14,77,146,0.15)', background:'#F8FBFF', cursor:'pointer', fontSize:'14px', color:'#6B8BAE', display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
                          <input type="number" value={p.cantidad} onChange={e=>updateCantidad(p.ean,e.target.value)} style={{ width:'50px', height:'28px', border:'1px solid rgba(14,77,146,0.15)', borderRadius:'6px', textAlign:'center', fontSize:'12px', fontFamily:"'DM Sans',sans-serif", color:'#0B1F3A', outline:'none' }}/>
                          <button onClick={()=>updateCantidad(p.ean,p.cantidad+1)} style={{ width:'24px', height:'24px', borderRadius:'6px', border:'1px solid rgba(14,77,146,0.15)', background:'#F8FBFF', cursor:'pointer', fontSize:'14px', color:'#6B8BAE', display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
                        </div>
                      </td>
                      <td style={{ padding:'8px 12px' }}>
                        <input type="number" value={p.bonif} onChange={e=>updateBonif(p.ean,e.target.value)} style={{ width:'44px', height:'28px', border:'1px solid rgba(14,77,146,0.15)', borderRadius:'6px', textAlign:'center', fontSize:'12px', fontFamily:"'DM Sans',sans-serif", color:'#166534', outline:'none', fontWeight:600 }}/>
                      </td>
                      <td style={{ padding:'8px 12px', fontFamily:'monospace', fontSize:'11px', color:'#0B1F3A' }}>
                        {form.moneda==='USD' ? `$${(p.precio/(tc.venta||3.73)).toFixed(2)}` : `S/${p.precio.toFixed(2)}`}
                      </td>
                      <td style={{ padding:'8px 12px', fontFamily:'monospace', fontSize:'12px', fontWeight:700, color:'#0B1F3A' }}>
                        {form.moneda==='USD' ? `$${(p.cantidad*p.precio/(tc.venta||3.73)).toFixed(2)}` : `S/${(p.cantidad*p.precio).toLocaleString('es-PE',{minimumFractionDigits:2})}`}
                      </td>
                      <td style={{ padding:'8px 12px' }}>
                        <span style={{ fontSize:'10px', fontWeight:600, padding:'2px 7px', borderRadius:'10px', background: stockErr?'#FEE2E2':stockWarn?'#FEF9C3':'#F0FDF4', color: stockErr?'#DC2626':stockWarn?'#D97706':'#166534' }}>
                          {stockErr ? 'Sin stock' : stockWarn ? `⚠ ${stock.disponible}` : `✓ ${stock?.disponible??'—'}`}
                        </span>
                      </td>
                      <td style={{ padding:'8px 12px' }}>
                        <button onClick={()=>quitar(p.ean)} style={{ padding:'3px 8px', background:'#FEE2E2', border:'none', borderRadius:'6px', fontSize:'10px', color:'#B91C1C', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Quitar</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Cards mobile */}
        {isMobile && (
          <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'16px' }}>
            {productos.map(p => {
              const stock = STOCK_MOCK[p.ean]
              const stockErr = stock && stock.disponible === 0
              return (
                <div key={p.ean} style={{ background: stockErr?'#FEF2F2':'#F8FBFF', borderRadius:'10px', border:`1px solid ${stockErr?'#FECACA':'rgba(14,77,146,0.08)'}`, padding:'12px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px' }}>
                    <div>
                      <div style={{ fontSize:'13px', fontWeight:700, color:'#0B1F3A', marginBottom:'2px' }}>{p.nombre}</div>
                      <div style={{ fontSize:'10px', color:'#6B8BAE' }}>{p.presentacion}</div>
                    </div>
                    <button onClick={()=>quitar(p.ean)} style={{ padding:'4px 10px', background:'#FEE2E2', border:'none', borderRadius:'6px', fontSize:'10px', color:'#B91C1C', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Quitar</button>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                      <button onClick={()=>updateCantidad(p.ean,p.cantidad-1)} style={{ width:'32px', height:'32px', borderRadius:'8px', border:'1px solid rgba(14,77,146,0.15)', background:'#fff', cursor:'pointer', fontSize:'16px', color:'#6B8BAE', display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
                      <input type="number" value={p.cantidad} onChange={e=>updateCantidad(p.ean,e.target.value)} style={{ width:'52px', height:'32px', border:'1px solid rgba(14,77,146,0.15)', borderRadius:'8px', textAlign:'center', fontSize:'13px', fontFamily:"'DM Sans',sans-serif", color:'#0B1F3A', outline:'none', background:'#fff' }}/>
                      <button onClick={()=>updateCantidad(p.ean,p.cantidad+1)} style={{ width:'32px', height:'32px', borderRadius:'8px', border:'1px solid rgba(14,77,146,0.15)', background:'#fff', cursor:'pointer', fontSize:'16px', color:'#6B8BAE', display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontSize:'10px', color: stockErr?'#DC2626':'#6B8BAE', fontWeight: stockErr?600:400, marginBottom:'2px' }}>
                        {stockErr ? 'Sin stock' : `S/${p.precio.toFixed(2)} c/u`}
                      </div>
                      <div style={{ fontFamily:'monospace', fontSize:'15px', fontWeight:700, color:'#0B1F3A' }}>S/{(p.cantidad*p.precio).toLocaleString('es-PE',{minimumFractionDigits:2})}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Totales */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          {!isMobile && (
            <div style={{ fontSize:'11px', color:'#6B8BAE', maxWidth:'400px', lineHeight:1.6 }}>
              💡 Los precios corresponden a tu lista negociada con {form.proveedor}.<br/>
              💱 Moneda: <strong>{form.moneda==='PEN'?'Soles (PEN)':'Dólares (USD)'}</strong> · Pago: <strong>{form.tipoPago}</strong>
              {form.moneda === 'USD' && (
                <div style={{ marginTop:'8px', padding:'8px 12px', background:'#F0F7FF', border:'1px solid rgba(14,77,146,0.12)', borderRadius:'8px', fontSize:'11px' }}>
                  {tc.loading && <span style={{ color:'#6B8BAE' }}>⟳ Consultando tipo de cambio SUNAT...</span>}
                  {tc.error   && <span style={{ color:'#DC2626' }}>⚠ No se pudo obtener el TC. Usando S/ 3.73</span>}
                  {!tc.loading && !tc.error && tc.venta && (
                    <div>
                      <div style={{ display:'flex', gap:'16px', marginBottom:'4px' }}>
                        <span>🏦 <strong>Compra:</strong> S/ {tc.compra}</span>
                        <span>🏦 <strong>Venta:</strong> S/ {tc.venta}</span>
                      </div>
                      <div style={{ fontSize:'10px', color:'#94A3B8' }}>
                        Tipo de cambio del día {tc.fecha} · Fuente: SUNAT / SBS
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <div style={{ minWidth:'260px' }}>
            {[
              ['Subtotal sin IGV', form.moneda==='USD' ? `$${(subtotal/(tc.venta||3.73)).toFixed(2)}` : `S/${subtotal.toLocaleString('es-PE',{minimumFractionDigits:2})}`],
              ['IGV (18%)',        form.moneda==='USD' ? `$${(igv/(tc.venta||3.73)).toFixed(2)}`      : `S/${igv.toLocaleString('es-PE',{minimumFractionDigits:2})}`],
              ['Total descuentos', form.moneda==='USD' ? '$0.00' : 'S/ 0.00'],
            ].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'4px 0', borderBottom:'1px solid rgba(14,77,146,0.05)', fontSize:'12px' }}>
                <span style={{ color:'#6B8BAE' }}>{k}</span>
                <span style={{ color:'#0B1F3A' }}>{v}</span>
              </div>
            ))}
            <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 0 0' }}>
              <span style={{ fontWeight:700, color:'#0B1F3A', fontSize:'14px' }}>Valor Total</span>
              <span style={{ fontFamily:"'Fraunces',serif", fontWeight:900, color:'#0B1F3A', fontSize:'22px' }}>
                {form.moneda==='USD' ? `$${(total/(tc.venta||3.73)).toLocaleString('en-US',{minimumFractionDigits:2})}` : `S/${total.toLocaleString('es-PE',{minimumFractionDigits:2})}`}
              </span>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div style={{ display:'flex', gap:'8px', justifyContent:'flex-end', marginTop:'16px', paddingTop:'16px', borderTop:'1px solid rgba(14,77,146,0.08)' }}>
          <button style={{ padding:'9px 18px', background:'#F8FBFF', border:'1px solid rgba(14,77,146,0.1)', borderRadius:'8px', fontSize:'13px', color:'#6B8BAE', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
            Guardar borrador
          </button>
          <button onClick={()=>setShowStock(true)} disabled={productos.length===0}
            style={{ padding:'9px 22px', background: productos.length>0?'#064E3B':'#F3F4F6', border:'none', borderRadius:'8px', fontSize:'13px', color: productos.length>0?'#4ADE80':'#9CA3AF', fontWeight:700, cursor: productos.length>0?'pointer':'not-allowed', fontFamily:"'DM Sans',sans-serif", display:'flex', alignItems:'center', gap:'6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
            Verificar stock y enviar →
          </button>
        </div>
      </div>
    </div>
  )
}
