import { useState } from 'react'
import { catalogData } from '../../../data/mockData'

const initialProductos = [
  { ean: '07702459082090', nombre: 'Inca Kola 1.5L', presentacion: 'Pack x12', cantidad: 24, precio: 62.40 },
  { ean: '07702459082014', nombre: 'Coca-Cola 500ml', presentacion: 'Pack x24', cantidad: 48, precio: 48.00 },
  { ean: '07702459082038', nombre: 'Coca-Cola Zero 500ml', presentacion: 'Pack x24', cantidad: 36, precio: 48.00 },
  { ean: '07702459082045', nombre: 'Sprite 500ml', presentacion: 'Pack x24', cantidad: 24, precio: 46.80 },
]

function AgregarProductoModal({ onClose, onAgregar, productosActuales }) {
  const [buscar, setBuscar] = useState('')
  const disponibles = catalogData.filter(p =>
    p.status === 'active' &&
    !productosActuales.find(x => x.ean === p.ean) &&
    (p.name.toLowerCase().includes(buscar.toLowerCase()) || p.ean.includes(buscar))
  )

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '560px', maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 900, color: '#0B1F3A' }}>Agregar producto</div>
          <button onClick={onClose} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', cursor: 'pointer', color: '#6B8BAE', fontSize: '14px' }}>✕</button>
        </div>
        <div style={{ padding: '14px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F0F7FF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', padding: '6px 12px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B8BAE" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input value={buscar} onChange={e => setBuscar(e.target.value)} placeholder="Buscar por nombre o EAN..." autoFocus
              style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '12px', color: '#0B1F3A', width: '100%', fontFamily: "'DM Sans', sans-serif" }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {disponibles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', color: '#6B8BAE', fontSize: '13px' }}>
              No hay productos disponibles para agregar
            </div>
          ) : disponibles.map(p => (
            <div key={p.ean} onClick={() => { onAgregar(p); onClose() }} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 24px', cursor: 'pointer', transition: 'background .15s'
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#F0F7FF'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A', marginBottom: '2px' }}>{p.name}</div>
                <div style={{ fontSize: '10px', color: '#6B8BAE' }}>{p.presentation} · EAN: {p.ean}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>{p.basePrice}</div>
                <div style={{ fontSize: '10px', color: '#166534' }}>+ Agregar</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function NuevaOCView({ setView }) {
  const [productos, setProductos] = useState(initialProductos)
  const [showAgregar, setShowAgregar] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [form, setForm] = useState({
    sitio: 'CD Wong Ate', fechaMin: '2026-05-25', fechaMax: '2026-05-28', nota: ''
  })

  const updateCantidad = (ean, val) => {
    setProductos(prev => prev.map(p => p.ean === ean ? { ...p, cantidad: Math.max(1, parseInt(val) || 1) } : p))
  }

  const quitar = (ean) => setProductos(prev => prev.filter(p => p.ean !== ean))

  const agregar = (p) => {
    setProductos(prev => [...prev, { ean: p.ean, nombre: p.name, presentacion: p.presentation, cantidad: 1, precio: parseFloat(p.basePrice.replace('S/','')) }])
  }

  const subtotal = productos.reduce((s, p) => s + p.cantidad * p.precio, 0)
  const igv = subtotal * 0.18
  const total = subtotal + igv

  const handleEnviar = () => {
    setEnviado(true)
    setTimeout(() => setView('mis-ocs'), 2000)
  }

  if (enviado) return (
    <div style={{ textAlign: 'center', paddingTop: '80px' }}>
      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 16px' }}>✓</div>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: 900, color: '#0B1F3A', marginBottom: '8px' }}>¡OC enviada exitosamente!</div>
      <div style={{ fontSize: '13px', color: '#6B8BAE', marginBottom: '4px' }}>Arca Continental recibirá tu orden en segundos.</div>
      <div style={{ fontSize: '12px', color: '#9DB8D9' }}>Redirigiendo a Mis Órdenes...</div>
    </div>
  )

  return (
    <div>
      {showAgregar && <AgregarProductoModal onClose={() => setShowAgregar(false)} onAgregar={agregar} productosActuales={productos} />}

      <div style={{ background: '#EAF3DE', border: '1px solid #86EFAC', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#166534', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        ✓ NEXO enviará la OC automáticamente a Arca Continental al confirmar — sin correos ni llamadas.
      </div>

      {/* Info del pedido */}
      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '20px', marginBottom: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>Información del pedido</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '5px' }}>Proveedor</label>
            <div style={{ height: '34px', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', padding: '0 12px', fontSize: '12px', color: '#0B1F3A', background: '#F8FBFF', display: 'flex', alignItems: 'center', fontWeight: 600 }}>
              Arca Continental
            </div>
          </div>
          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '5px' }}>Sitio de entrega</label>
            <select value={form.sitio} onChange={e => setForm(f => ({ ...f, sitio: e.target.value }))} style={{ width: '100%', height: '34px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '0 12px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', background: '#fff', outline: 'none' }}>
              <option>CD Wong Ate</option>
              <option>CD Wong Miraflores</option>
              <option>CD Wong San Miguel</option>
              <option>CD Wong La Molina</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '5px' }}>Fecha mínima entrega</label>
            <input type="date" value={form.fechaMin} onChange={e => setForm(f => ({ ...f, fechaMin: e.target.value }))} style={{ width: '100%', height: '34px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '0 12px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', outline: 'none' }} />
          </div>
          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '5px' }}>Fecha máxima entrega</label>
            <input type="date" value={form.fechaMax} onChange={e => setForm(f => ({ ...f, fechaMax: e.target.value }))} style={{ width: '100%', height: '34px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '0 12px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', outline: 'none' }} />
          </div>
        </div>
        <div style={{ marginTop: '12px' }}>
          <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '5px' }}>Nota para el proveedor (opcional)</label>
          <textarea value={form.nota} onChange={e => setForm(f => ({ ...f, nota: e.target.value }))} placeholder="Ej: Entregar en horario de 8am-12pm, contactar a almacén..." style={{ width: '100%', height: '60px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', outline: 'none', resize: 'none' }} />
        </div>
      </div>

      {/* Productos */}
      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Productos — {productos.length} items
          </div>
          <button onClick={() => setShowAgregar(true)} style={{ padding: '6px 14px', background: '#EEF5FF', border: 'none', borderRadius: '8px', fontSize: '11px', color: '#0E4D92', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
            + Agregar producto
          </button>
        </div>

        <div style={{ border: '1px solid rgba(14,77,146,0.08)', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
                {['EAN','Producto','Presentación','Cantidad','Precio unit.','Subtotal',''].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.ean} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)' }}>
                  <td style={{ padding: '8px 12px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '10px', background: '#F0F7FF', color: '#6B8BAE', padding: '2px 6px', borderRadius: '4px' }}>{p.ean}</span>
                  </td>
                  <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{p.nombre}</td>
                  <td style={{ padding: '8px 12px', fontSize: '11px', color: '#6B8BAE' }}>{p.presentacion}</td>
                  <td style={{ padding: '8px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button onClick={() => updateCantidad(p.ean, p.cantidad - 1)} style={{ width: '24px', height: '24px', borderRadius: '6px', border: '1px solid rgba(14,77,146,0.15)', background: '#F8FBFF', cursor: 'pointer', fontSize: '14px', color: '#6B8BAE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                      <input type="number" value={p.cantidad} onChange={e => updateCantidad(p.ean, e.target.value)} style={{ width: '50px', height: '28px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '6px', textAlign: 'center', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', outline: 'none' }} />
                      <button onClick={() => updateCantidad(p.ean, p.cantidad + 1)} style={{ width: '24px', height: '24px', borderRadius: '6px', border: '1px solid rgba(14,77,146,0.15)', background: '#F8FBFF', cursor: 'pointer', fontSize: '14px', color: '#6B8BAE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                    </div>
                  </td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#0B1F3A' }}>S/{p.precio.toFixed(2)}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>S/{(p.cantidad * p.precio).toLocaleString('es-PE', { minimumFractionDigits: 2 })}</td>
                  <td style={{ padding: '8px 12px' }}>
                    <button onClick={() => quitar(p.ean)} style={{ padding: '3px 8px', background: '#FEE2E2', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#B91C1C', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Quitar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totales */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontSize: '11px', color: '#6B8BAE', maxWidth: '400px', lineHeight: 1.6 }}>
            💡 Los precios corresponden a tu lista de precios negociada con Arca Continental. La OC será validada automáticamente al enviarse.
          </div>
          <div style={{ minWidth: '240px' }}>
            {[
              ['Subtotal sin IGV', 'S/' + subtotal.toLocaleString('es-PE', { minimumFractionDigits: 2 })],
              ['IGV (18%)', 'S/' + igv.toLocaleString('es-PE', { minimumFractionDigits: 2 })],
            ].map(([k,v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(14,77,146,0.05)', fontSize: '12px' }}>
                <span style={{ color: '#6B8BAE' }}>{k}</span>
                <span style={{ color: '#0B1F3A' }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 0' }}>
              <span style={{ fontWeight: 700, color: '#0B1F3A', fontSize: '14px' }}>Total</span>
              <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, color: '#0B1F3A', fontSize: '22px' }}>
                S/{total.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(14,77,146,0.08)' }}>
          <button style={{ padding: '9px 18px', background: '#F8FBFF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', fontSize: '13px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            Guardar borrador
          </button>
          <button onClick={handleEnviar} disabled={productos.length === 0} style={{
            padding: '9px 22px', background: productos.length > 0 ? '#064E3B' : '#F3F4F6',
            border: 'none', borderRadius: '8px', fontSize: '13px',
            color: productos.length > 0 ? '#4ADE80' : '#9CA3AF',
            fontWeight: 700, cursor: productos.length > 0 ? 'pointer' : 'not-allowed',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Enviar orden a Arca →
          </button>
        </div>
      </div>
    </div>
  )
}
