import { useState } from 'react'
import { purchaseOrders } from '../../../data/mockData'
import Badge from '../../../components/Badge'

const productos = [
  { ean: '07702459082090', nombre: 'Inca Kola 1.5L', presentacion: 'Pack x12', cantidad: 24, bonificada: 2, precio: 62.40, subtotal: 1497.60 },
  { ean: '07702459082014', nombre: 'Coca-Cola 500ml', presentacion: 'Pack x24', cantidad: 48, bonificada: 4, precio: 48.00, subtotal: 2304.00 },
  { ean: '07702459082038', nombre: 'Coca-Cola Zero 500ml', presentacion: 'Pack x24', cantidad: 36, bonificada: 3, precio: 48.00, subtotal: 1728.00 },
  { ean: '07702459082045', nombre: 'Sprite 500ml', presentacion: 'Pack x24', cantidad: 24, bonificada: 2, precio: 46.80, subtotal: 1123.20 },
]

function OCModal({ oc, onClose, setView }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '780px',
        maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: '0 24px 80px rgba(0,0,0,0.25)'
      }} onClick={e => e.stopPropagation()}>

        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', fontWeight: 900, color: '#0B1F3A', marginBottom: '3px' }}>Orden de Compra</div>
            <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#0E4D92', fontWeight: 700 }}>{oc.id}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Badge status={oc.status} />
            <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', cursor: 'pointer', fontSize: '16px', color: '#6B8BAE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '20px' }}>
            {[
              ['Emisor','Arca Continental'],
              ['Receptor', oc.client],
              ['Socio Comercial', oc.client + ' S.A.C.'],
              ['Fecha emision', oc.date + '/2026'],
              ['Entrega minima', oc.date + '/2026'],
              ['Entrega maxima', oc.delivery + '/2026'],
              ['Tipo OC','220 - Orden de Compra'],
              ['Medio de pago','42 - Cuenta bancaria'],
              ['Lugar de entrega','7702031'],
            ].map(([k,v]) => (
              <div key={k} style={{ background: '#F8FBFF', borderRadius: '8px', padding: '10px 12px' }}>
                <div style={{ fontSize: '10px', color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '3px' }}>{k}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
            Productos — {oc.items} items
          </div>
          <div style={{ border: '1px solid rgba(14,77,146,0.08)', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
                  {['EAN','Producto','Presentacion','Cant.','Bonif.','Precio bruto','Subtotal'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productos.map(p => (
                  <tr key={p.ean} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)' }}>
                    <td style={{ padding: '9px 12px' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '10px', background: '#F0F7FF', color: '#6B8BAE', padding: '2px 6px', borderRadius: '4px' }}>{p.ean}</span>
                    </td>
                    <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{p.nombre}</td>
                    <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{p.presentacion}</td>
                    <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 700, color: '#0B1F3A', textAlign: 'center' }}>{p.cantidad}</td>
                    <td style={{ padding: '9px 12px', fontSize: '12px', color: '#166534', textAlign: 'center' }}>{p.bonificada}</td>
                    <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#0B1F3A' }}>S/{p.precio.toFixed(2)}</td>
                    <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>S/{p.subtotal.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ minWidth: '260px' }}>
              {[
                ['Total sin impuestos','S/ 5,554.57'],
                ['IGV (18%)','S/ 999.82'],
                ['Total descuentos','S/ 0.00'],
              ].map(([k,v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(14,77,146,0.05)', fontSize: '12px' }}>
                  <span style={{ color: '#6B8BAE' }}>{k}</span>
                  <span style={{ color: '#0B1F3A' }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 0', fontSize: '15px' }}>
                <span style={{ fontWeight: 700, color: '#0B1F3A' }}>Valor Total</span>
                <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, color: '#0B1F3A', fontSize: '18px' }}>{oc.amount}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(14,77,146,0.08)', display: 'flex', gap: '8px', justifyContent: 'flex-end', background: '#F8FBFF' }}>
          <button style={{ padding: '8px 16px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Descargar PDF</button>
          <button style={{ padding: '8px 16px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Descargar EDI</button>
          <button onClick={() => { onClose(); setView('trazabilidad') }} style={{ padding: '8px 16px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00C2A8', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            Ver trazabilidad →
          </button>
        </div>
      </div>
    </div>
  )
}

const ITEMS_PER_PAGE = 5

export default function OCView({ setView }) {
  const [selectedOC, setSelectedOC] = useState(null)
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(1)
  const totalRegistros = 241
  const totalPages = Math.ceil(totalRegistros / ITEMS_PER_PAGE)

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const toggleAll = () => {
    setSelected(prev => prev.length === purchaseOrders.length ? [] : purchaseOrders.map(p => p.id))
  }

  return (
    <div>
      {selectedOC && <OCModal oc={selectedOC} onClose={() => setSelectedOC(null)} setView={setView} />}

      {/* Contador */}
      <div style={{ fontSize: '12px', color: '#6B8BAE', marginBottom: '10px', display: 'flex', gap: '20px' }}>
        <span>Total de Registros Encontrados: <strong style={{ color: '#0B1F3A' }}>{totalRegistros}</strong></span>
        <span>Total Seleccionados: <strong style={{ color: '#0E4D92' }}>{selected.length}</strong></span>
      </div>

      {/* Barra de acciones masivas */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            disabled={selected.length === 0}
            style={{ padding: '6px 14px', background: selected.length > 0 ? '#0B1F3A' : '#F0F7FF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', fontSize: '11px', color: selected.length > 0 ? '#00C2A8' : '#9DB8D9', cursor: selected.length > 0 ? 'pointer' : 'default', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", transition: 'all .15s' }}>
            PDF Consolidado
          </button>
          <button
            disabled={selected.length === 0}
            style={{ padding: '6px 14px', background: selected.length > 0 ? '#0B1F3A' : '#F0F7FF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', fontSize: '11px', color: selected.length > 0 ? '#00C2A8' : '#9DB8D9', cursor: selected.length > 0 ? 'pointer' : 'default', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", transition: 'all .15s' }}>
            Generar Listado
          </button>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button style={{ padding: '6px 14px', background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', fontSize: '11px', color: '#0B1F3A', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            Descargar Consulta
          </button>
        </div>
      </div>

      {/* Chips */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
        {['Todas (241)','Pendientes (1)','Confirmadas (1)','En despacho (1)','Recibidas (2)'].map((chip, i) => (
          <div key={chip} style={{
            padding: '4px 14px', borderRadius: '100px', fontSize: '11px', cursor: 'pointer',
            background: i === 0 ? '#EEF5FF' : '#fff',
            color: i === 0 ? '#0E4D92' : '#6B8BAE',
            border: i === 0 ? '1px solid #0E4D92' : '1px solid rgba(14,77,146,0.1)',
            fontWeight: i === 0 ? 600 : 400,
            fontFamily: "'DM Sans', sans-serif"
          }}>{chip}</div>
        ))}
      </div>

      {/* Tabla */}
      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              <th style={{ padding: '9px 12px', width: '36px' }}>
                <input type="checkbox"
                  checked={selected.length === purchaseOrders.length}
                  onChange={toggleAll}
                  style={{ cursor: 'pointer', accentColor: '#0E4D92' }}
                />
              </th>
              {['N° Orden','Cadena','Emision','Entrega','Items','Monto','Estado de Procesamiento','Acciones'].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map(p => (
              <tr key={p.id}
                style={{ borderBottom: '1px solid rgba(14,77,146,0.05)', background: selected.includes(p.id) ? '#F0F7FF' : 'transparent', transition: 'background .15s' }}
                onMouseEnter={e => { if (!selected.includes(p.id)) e.currentTarget.style.background = '#F8FBFF' }}
                onMouseLeave={e => { if (!selected.includes(p.id)) e.currentTarget.style.background = 'transparent' }}
              >
                <td style={{ padding: '9px 12px' }}>
                  <input type="checkbox"
                    checked={selected.includes(p.id)}
                    onChange={() => toggleSelect(p.id)}
                    style={{ cursor: 'pointer', accentColor: '#0E4D92' }}
                  />
                </td>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#0B1F3A' }}>{p.id}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{p.client}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{p.date}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{p.delivery}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', color: '#0B1F3A', textAlign: 'center' }}>{p.items}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>{p.amount}</td>
                <td style={{ padding: '9px 12px' }}><Badge status={p.status} /></td>
                <td style={{ padding: '9px 12px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={() => setSelectedOC(p)} style={{ padding: '4px 10px', background: '#0B1F3A', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#00C2A8', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>Ver</button>
                    <button onClick={() => setView('trazabilidad')} style={{ padding: '4px 8px', background: '#EEF5FF', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#0E4D92', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Trazabilidad</button>
                    <button style={{ padding: '4px 8px', background: '#F8FBFF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '6px', fontSize: '10px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>PDF</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginacion */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '11px', color: '#6B8BAE' }}>
          Mostrando {ITEMS_PER_PAGE} de {totalRegistros} ordenes
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {['««','‹', 1, 2, 3, '...', totalPages, '›','»»'].map((p, i) => (
            <button key={i}
              onClick={() => typeof p === 'number' && setPage(p)}
              style={{
                width: typeof p === 'number' ? '32px' : 'auto',
                padding: typeof p === 'number' ? '0' : '0 8px',
                height: '32px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)',
                background: p === page ? '#0B1F3A' : '#fff',
                color: p === page ? '#00C2A8' : '#6B8BAE',
                fontSize: '12px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif',",
                fontWeight: p === page ? 700 : 400,
              }}>
              {p}
            </button>
          ))}
          <select style={{ height: '32px', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', padding: '0 8px', fontSize: '12px', color: '#0B1F3A', background: '#fff', fontFamily: "'DM Sans', sans-serif", marginLeft: '4px' }}>
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
      </div>
    </div>
  )
}
