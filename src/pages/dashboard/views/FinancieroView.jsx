import { useState, useMemo } from 'react'
import { useApp } from '../../../context/AppContext'

const initialFacturas = [
  {
    id: 'FAC-1182', tipo: 'FAC', oc: 'OC-2025-0839', cadena: 'Tottus',
    emision: '21/05/2026', vence: '05/06/2026', diasVence: 14,
    monto: 'S/61,480', status: 'paid',
    detalle: [
      { nombre: 'Inca Kola 1.5L', cantidad: 24, precio: 'S/62.40', subtotal: 'S/1,497.60' },
      { nombre: 'Coca-Cola Zero 500ml', cantidad: 36, precio: 'S/48.00', subtotal: 'S/1,728.00' },
      { nombre: 'Sprite 500ml', cantidad: 24, precio: 'S/46.80', subtotal: 'S/1,123.20' },
    ]
  },
  {
    id: 'FAC-1181', tipo: 'FAC', oc: 'OC-2025-0837', cadena: 'Vivanda',
    emision: '19/05/2026', vence: '03/06/2026', diasVence: 12,
    monto: 'S/19,540', status: 'pending',
    detalle: [
      { nombre: 'Inca Kola 2.5L', cantidad: 48, precio: 'S/42.00', subtotal: 'S/2,016.00' },
      { nombre: 'Coca-Cola 500ml', cantidad: 144, precio: 'S/48.00', subtotal: 'S/6,912.00' },
    ]
  },
  {
    id: 'FAC-1180', tipo: 'FAC', oc: 'OC-2025-0836', cadena: 'Wong',
    emision: '18/05/2026', vence: '02/06/2026', diasVence: 5,
    monto: 'S/53,210', status: 'pending',
    detalle: [
      { nombre: 'Inca Kola 1.5L', cantidad: 48, precio: 'S/62.40', subtotal: 'S/2,995.20' },
      { nombre: 'Coca-Cola 500ml', cantidad: 96, precio: 'S/48.00', subtotal: 'S/4,608.00' },
    ]
  },
  {
    id: 'NC-042', tipo: 'NC', oc: 'OC-2025-0831', cadena: 'Wong',
    emision: '15/05/2026', vence: '—', diasVence: null,
    monto: '-S/4,200', status: 'pending', devolucion: 'DEV-042',
    detalle: [
      { nombre: 'Inca Kola 1.5L', cantidad: 8, precio: 'S/62.40', subtotal: '-S/499.20' },
      { nombre: 'Coca-Cola 500ml', cantidad: 4, precio: 'S/48.00', subtotal: '-S/192.00' },
    ]
  },
]

const statusConfig = {
  paid:    { label: 'Cobrada',  color: '#166534', bg: '#EAF3DE' },
  pending: { label: 'Pendiente', color: '#854D0E', bg: '#FEF9C3' },
  overdue: { label: 'Vencida',  color: '#B91C1C', bg: '#FEE2E2' },
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.pending
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, background: cfg.bg, color: cfg.color }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: cfg.color, flexShrink: 0 }} />
      {cfg.label}
    </span>
  )
}

function TipoBadge({ tipo }) {
  const isNC = tipo === 'NC'
  return (
    <span style={{ padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, background: isNC ? '#FEE2E2' : '#EEF5FF', color: isNC ? '#B91C1C' : '#0E4D92', fontFamily: 'monospace' }}>
      {tipo}
    </span>
  )
}

function DiasVence({ dias }) {
  if (dias === null) return <span style={{ fontSize: '11px', color: '#9DB8D9' }}>—</span>
  const color = dias <= 5 ? '#B91C1C' : dias <= 10 ? '#92400E' : '#166534'
  const bg = dias <= 5 ? '#FEE2E2' : dias <= 10 ? '#FEF3C7' : '#EAF3DE'
  return (
    <span style={{ padding: '2px 8px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, background: bg, color }}>
      {dias <= 5 ? '⚠ ' : ''}{dias}d
    </span>
  )
}

function FacturaModal({ doc, onClose, onEnviar }) {
  const [enviado, setEnviado] = useState(false)
  const isNC = doc.tipo === 'NC'

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.25)' }} onClick={e => e.stopPropagation()}>

        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <TipoBadge tipo={doc.tipo} />
              <span style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: 700, color: '#0B1F3A' }}>{doc.id}</span>
            </div>
            <div style={{ fontSize: '12px', color: '#6B8BAE' }}>{doc.cadena} · OC: {doc.oc} {doc.devolucion ? '· DEV: ' + doc.devolucion : ''}</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <StatusBadge status={doc.status} />
            <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', cursor: 'pointer', fontSize: '16px', color: '#6B8BAE' }}>✕</button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

          {doc.diasVence && doc.diasVence <= 5 && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#B91C1C', marginBottom: '16px' }}>
              ⚠ Esta factura vence en <strong>{doc.diasVence} días</strong> — envíala a {doc.cadena} para asegurar el cobro a tiempo.
            </div>
          )}

          {isNC && (
            <div style={{ background: '#FFF5F5', border: '1px solid #FECACA', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#92400E', marginBottom: '16px' }}>
              Esta nota de crédito fue generada por la devolución <strong>{doc.devolucion}</strong> de {doc.cadena}.
            </div>
          )}

          <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Información del documento</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '20px' }}>
            {[
              ['Tipo', doc.tipo === 'FAC' ? 'Factura' : 'Nota de crédito'],
              ['Emisor', 'Arca Continental'],
              ['Receptor', doc.cadena],
              ['Fecha emisión', doc.emision],
              ['Vencimiento', doc.vence],
              ['Días al vence', doc.diasVence ? doc.diasVence + ' días' : '—'],
              ['OC de origen', doc.oc],
              ['Monto total', doc.monto],
              ['Estado', statusConfig[doc.status]?.label],
            ].map(([k,v]) => (
              <div key={k} style={{ background: '#F8FBFF', borderRadius: '8px', padding: '10px 12px' }}>
                <div style={{ fontSize: '10px', color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '3px' }}>{k}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Productos facturados</div>
          <div style={{ border: '1px solid rgba(14,77,146,0.08)', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
                  {['Producto','Cantidad','Precio unit.','Subtotal'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {doc.detalle.map(d => (
                  <tr key={d.nombre} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)' }}>
                    <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{d.nombre}</td>
                    <td style={{ padding: '9px 12px', fontSize: '12px', color: '#0B1F3A', textAlign: 'center' }}>{d.cantidad}</td>
                    <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#0B1F3A' }}>{d.precio}</td>
                    <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: isNC ? '#B91C1C' : '#0B1F3A' }}>{d.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ minWidth: '240px' }}>
              {[['Subtotal sin IGV', isNC ? '-S/5,084.75' : 'S/52,101.69'],['IGV (18%)', isNC ? '-S/915.25' : 'S/9,378.30']].map(([k,v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(14,77,146,0.05)', fontSize: '12px' }}>
                  <span style={{ color: '#6B8BAE' }}>{k}</span><span>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 0' }}>
                <span style={{ fontWeight: 700, color: '#0B1F3A' }}>Total</span>
                <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '18px', color: isNC ? '#B91C1C' : '#0B1F3A' }}>{doc.monto}</span>
              </div>
            </div>
          </div>

          {enviado && (
            <div style={{ background: '#EAF3DE', border: '1px solid #86EFAC', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#166534', marginTop: '14px' }}>
              ✓ Documento enviado a <strong>{doc.cadena}</strong> exitosamente — {new Date().toLocaleString('es-PE')}
            </div>
          )}
        </div>

        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(14,77,146,0.08)', display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center', background: '#F8FBFF' }}>
          <div style={{ fontSize: '11px', color: '#9DB8D9' }}>Descarga inmediata · Sin links que expiran</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ padding: '8px 14px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Descargar PDF</button>
            <button style={{ padding: '8px 14px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Descargar Excel</button>
            {!enviado && doc.status === 'pending' && (
              <button onClick={() => { setEnviado(true); onEnviar(doc.id) }} style={{ padding: '8px 18px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00C2A8', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                Enviar a {doc.cadena} →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const KPI = ({ label, value, color, sub }) => (
  <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '14px 16px' }}>
    <div style={{ fontSize: '10px', color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>{label}</div>
    <div style={{ fontFamily: "'Fraunces', serif", fontSize: '26px', fontWeight: 900, color: color || '#0B1F3A', lineHeight: 1 }}>{value}</div>
    {sub && <div style={{ fontSize: '10px', color: '#9DB8D9', marginTop: '4px' }}>{sub}</div>}
  </div>
)

export default function FinancieroView() {
  const { searchQuery } = useApp()
  const [data, setData] = useState(initialFacturas)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [tipoFilter, setTipoFilter] = useState('all')

  const filtered = useMemo(() => {
    let result = data
    if (tipoFilter !== 'all') result = result.filter(f => f.tipo === tipoFilter)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(f =>
        f.id.toLowerCase().includes(q) ||
        f.oc.toLowerCase().includes(q) ||
        f.cadena.toLowerCase().includes(q) ||
        f.monto.toLowerCase().includes(q)
      )
    }
    return result
  }, [data, tipoFilter, searchQuery])

  const porVencer = data.filter(f => f.diasVence && f.diasVence <= 7 && f.status === 'pending')

  const handleEnviar = (id) => {
    setData(prev => prev.map(f => f.id === id ? { ...f, enviado: true } : f))
  }

  return (
    <div>
      {selectedDoc && <FacturaModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} onEnviar={handleEnviar} />}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '14px' }}>
        <KPI label="Por cobrar" value="S/143K" color="#E05252" sub="6 facturas activas" />
        <KPI label="Cobrado este mes" value="S/287K" color="#166534" sub="+18% vs mes anterior" />
        <KPI label="Notas de crédito" value="S/11K" color="#F59E0B" sub="2 NC emitidas" />
        <KPI label="Días prom. pago" value="18" color="#0E4D92" sub="Dentro del plazo" />
      </div>

      {porVencer.length > 0 && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#B91C1C', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ⚠ <strong>{porVencer.length} factura{porVencer.length > 1 ? 's' : ''} vence{porVencer.length === 1 ? '' : 'n'} en menos de 7 días</strong> — {porVencer.map(f => f.id).join(', ')} · Envíalas para asegurar el cobro.
        </div>
      )}

      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
        {[['all','Todos'],['FAC','Facturas'],['NC','Notas de crédito']].map(([val, label]) => (
          <div key={val} onClick={() => setTipoFilter(val)} style={{
            padding: '4px 14px', borderRadius: '100px', fontSize: '11px', cursor: 'pointer',
            background: tipoFilter === val ? '#EEF5FF' : '#fff',
            color: tipoFilter === val ? '#0E4D92' : '#6B8BAE',
            border: tipoFilter === val ? '1px solid #0E4D92' : '1px solid rgba(14,77,146,0.1)',
            fontWeight: tipoFilter === val ? 600 : 400,
          }}>{label}</div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              {['Tipo','Documento','OC Ref.','Cadena','Emisión','Vencimiento','Días','Monto','Estado','Acciones'].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(f => (
              <tr key={f.id} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)', transition: 'background .15s', background: f.diasVence && f.diasVence <= 5 && f.status === 'pending' ? '#FFFDF0' : 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8FBFF'}
                onMouseLeave={e => e.currentTarget.style.background = f.diasVence && f.diasVence <= 5 && f.status === 'pending' ? '#FFFDF0' : 'transparent'}
              >
                <td style={{ padding: '9px 12px' }}><TipoBadge tipo={f.tipo} /></td>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#0B1F3A' }}>{f.id}</td>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#0E4D92' }}>{f.oc}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{f.cadena}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{f.emision}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{f.vence}</td>
                <td style={{ padding: '9px 12px' }}><DiasVence dias={f.diasVence} /></td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 700, color: f.tipo === 'NC' ? '#B91C1C' : '#0B1F3A' }}>{f.monto}</td>
                <td style={{ padding: '9px 12px' }}><StatusBadge status={f.status} /></td>
                <td style={{ padding: '9px 12px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={() => setSelectedDoc(f)} style={{ padding: '4px 10px', background: '#0B1F3A', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#00C2A8', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>Ver</button>
                    <button style={{ padding: '4px 8px', background: '#EEF5FF', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#0E4D92', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>PDF</button>
                    {f.status === 'pending' && (
                      <button onClick={() => { setSelectedDoc(f) }} style={{ padding: '4px 8px', background: '#EAF3DE', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#166534', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Enviar</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ fontSize: '11px', color: '#6B8BAE', textAlign: 'right', marginTop: '8px' }}>
        Mostrando {filtered.length} de {data.length} documentos · Descarga directa sin links que expiran
      </div>
    </div>
  )
}
