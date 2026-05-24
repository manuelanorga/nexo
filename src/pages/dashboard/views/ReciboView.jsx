import { useState, useMemo } from 'react'
import { useIsMobile } from '../../../hooks/useMediaQuery'
import { useApp } from '../../../context/AppContext'

const recibos = [
  {
    id: 'AR-2025-0291', asn: 'ASN-2025-0419', cadena: 'Tottus',
    fecha: '21/05/2026', hora: '08:45',
    pedido: 48, recibido: 47, status: 'observacion',
    responsable: 'Juan Quispe', cargo: 'Jefe de Almacén',
    detalle: [
      { nombre: 'Inca Kola 1.5L', pedido: 24, recibido: 24, obs: '' },
      { nombre: 'Coca-Cola Zero 500ml', pedido: 14, recibido: 13, obs: '1 bulto dañado en tránsito' },
      { nombre: 'Sprite 500ml', pedido: 10, recibido: 10, obs: '' },
    ]
  },
  {
    id: 'AR-2025-0290', asn: 'ASN-2025-0418', cadena: 'Vivanda',
    fecha: '19/05/2026', hora: '09:15',
    pedido: 14, recibido: 14, status: 'conforme',
    responsable: 'María Torres', cargo: 'Coordinadora Logística',
    detalle: [
      { nombre: 'Inca Kola 2.5L', pedido: 8, recibido: 8, obs: '' },
      { nombre: 'Coca-Cola 500ml', pedido: 6, recibido: 6, obs: '' },
    ]
  },
  {
    id: 'AR-2025-0289', asn: 'ASN-2025-0417', cadena: 'Metro',
    fecha: '18/05/2026', hora: '10:30',
    pedido: 22, recibido: 22, status: 'conforme',
    responsable: 'Carlos Mendoza', cargo: 'Almacenero Senior',
    detalle: [
      { nombre: 'Inca Kola 1.5L', pedido: 12, recibido: 12, obs: '' },
      { nombre: 'Fanta Naranja 1.5L', pedido: 10, recibido: 10, obs: '' },
    ]
  },
]

const statusConfig = {
  conforme:    { label: 'Conforme',          color: '#166534', bg: '#EAF3DE' },
  observacion: { label: 'Con observaciones', color: '#92400E', bg: '#FEF3C7' },
  pendiente:   { label: 'Pendiente',         color: '#1D4ED8', bg: '#DBEAFE' },
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.pendiente
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, background: cfg.bg, color: cfg.color }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: cfg.color, flexShrink: 0 }} />
      {cfg.label}
    </span>
  )
}

function ARModal({ ar, onClose }) {
  const tieneObs = ar.detalle.some(d => d.obs)
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.25)' }} onClick={e => e.stopPropagation()}>

        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', fontWeight: 900, color: '#0B1F3A' }}>Aviso de Recibo</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#0E4D92', fontWeight: 700 }}>{ar.id}</span>
              <StatusBadge status={ar.status} />
            </div>
          </div>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', cursor: 'pointer', fontSize: '16px', color: '#6B8BAE' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

          {tieneObs && (
            <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#92400E', marginBottom: '16px' }}>
              ⚠ Este recibo tiene observaciones. Considera iniciar una devolución por los bultos con problemas.
            </div>
          )}

          <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Información de recepción</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '20px' }}>
            {[
              ['ASN de origen', ar.asn],
              ['Cadena', ar.cadena],
              ['Fecha recepción', ar.fecha + ' ' + ar.hora],
              ['Bultos pedidos', ar.pedido],
              ['Bultos recibidos', ar.recibido],
              ['Diferencia', ar.pedido - ar.recibido === 0 ? 'Ninguna' : (ar.pedido - ar.recibido) + ' bulto(s)'],
              ['Responsable', ar.responsable],
              ['Cargo', ar.cargo],
              ['Estado', statusConfig[ar.status]?.label],
            ].map(([k,v]) => (
              <div key={k} style={{ background: k === 'Diferencia' && ar.pedido !== ar.recibido ? '#FFF5F5' : '#F8FBFF', borderRadius: '8px', padding: '10px 12px', border: k === 'Diferencia' && ar.pedido !== ar.recibido ? '1px solid #FECACA' : 'none' }}>
                <div style={{ fontSize: '10px', color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '3px' }}>{k}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: k === 'Diferencia' && ar.pedido !== ar.recibido ? '#B91C1C' : '#0B1F3A' }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Detalle por producto</div>
          <div style={{ border: '1px solid rgba(14,77,146,0.08)', borderRadius: '10px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
                  {['Producto','Pedido','Recibido','Estado','Observación'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ar.detalle.map(d => (
                  <tr key={d.nombre} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)', background: d.obs ? '#FFFBEB' : 'transparent' }}>
                    <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{d.nombre}</td>
                    <td style={{ padding: '9px 12px', fontSize: '12px', color: '#0B1F3A', textAlign: 'center' }}>{d.pedido}</td>
                    <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 700, textAlign: 'center', color: d.recibido < d.pedido ? '#B91C1C' : '#166534' }}>{d.recibido}</td>
                    <td style={{ padding: '9px 12px' }}>
                      {d.recibido === d.pedido
                        ? <span style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>✓ Conforme</span>
                        : <span style={{ fontSize: '11px', color: '#B91C1C', fontWeight: 600 }}>✕ Diferencia</span>
                      }
                    </td>
                    <td style={{ padding: '9px 12px', fontSize: '11px', color: '#92400E' }}>{d.obs || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(14,77,146,0.08)', display: 'flex', gap: '8px', justifyContent: 'flex-end', background: '#F8FBFF' }}>
          <button style={{ padding: '8px 16px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Descargar PDF</button>
          {tieneObs && (
            <button style={{ padding: '8px 20px', background: '#FEE2E2', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#B91C1C', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              Iniciar devolución ↩
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ReciboView() {
  const { searchQuery } = useApp()
  const [selectedAR, setSelectedAR] = useState(null)
  const isMobile = useIsMobile()

  const filtered = useMemo(() => {
    if (!searchQuery) return recibos
    const q = searchQuery.toLowerCase()
    return recibos.filter(r =>
      r.id.toLowerCase().includes(q) ||
      r.asn.toLowerCase().includes(q) ||
      r.cadena.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const conObs = recibos.filter(r => r.status === 'observacion').length

  return (
    <div>
      {selectedAR && <ARModal ar={selectedAR} onClose={() => setSelectedAR(null)} />}

      {conObs > 0 && (
        <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#92400E', marginBottom: '14px' }}>
          ⚠ <strong>{conObs} recibo{conObs > 1 ? 's' : ''} con observaciones</strong> — revisa y considera iniciar una devolución.
        </div>
      )}

      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map(r => {
            const diff = r.pedido - r.recibido
            const borderColor = r.status === 'observacion' ? '#92400E' : '#166534'
            return (
              <div key={r.id} style={{ background: '#fff', borderRadius: '12px', border: '1px solid rgba(14,77,146,0.1)', borderLeft: '4px solid ' + borderColor, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>{r.id}</div>
                    <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#0E4D92', marginTop: '2px' }}>{r.asn}</div>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A', marginBottom: '2px' }}>{r.cadena}</div>
                <div style={{ fontSize: '10px', color: '#6B8BAE', marginBottom: '8px' }}>{r.responsable} · {r.cargo}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                  {[['Pedido', r.pedido, '#0B1F3A'], ['Recibido', r.recibido, '#0B1F3A'], ['Diferencia', diff === 0 ? '—' : '-' + diff, diff === 0 ? '#166534' : '#B91C1C']].map(([l,v,c]) => (
                    <div key={l} style={{ background: '#F8FBFF', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '9px', color: '#6B8BAE', textTransform: 'uppercase', marginBottom: '2px' }}>{l}</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: c }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => setSelectedAR(r)} style={{ flex: 1, padding: '8px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00F5A0', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>Ver detalle</button>
                  {r.status === 'observacion' && (
                    <button style={{ padding: '8px 12px', background: '#FEE2E2', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#B91C1C', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>↩ Dev.</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              {['N° Recibo','ASN Ref.','Cadena','Fecha','Responsable','Pedido','Recibido','Diferencia','Estado','Acciones'].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => {
              const diff = r.pedido - r.recibido
              return (
                <tr key={r.id} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)', transition: 'background .15s', background: r.status === 'observacion' ? '#FFFDF0' : 'transparent' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F8FBFF'}
                  onMouseLeave={e => e.currentTarget.style.background = r.status === 'observacion' ? '#FFFDF0' : 'transparent'}
                >
                  <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#0B1F3A' }}>{r.id}</td>
                  <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#0E4D92' }}>{r.asn}</td>
                  <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{r.cadena}</td>
                  <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{r.fecha} {r.hora}</td>
                  <td style={{ padding: '9px 12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#0B1F3A' }}>{r.responsable}</div>
                    <div style={{ fontSize: '10px', color: '#6B8BAE' }}>{r.cargo}</div>
                  </td>
                  <td style={{ padding: '9px 12px', fontSize: '12px', color: '#0B1F3A', textAlign: 'center' }}>{r.pedido}</td>
                  <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 700, color: '#0B1F3A', textAlign: 'center' }}>{r.recibido}</td>
                  <td style={{ padding: '9px 12px', textAlign: 'center' }}>
                    {diff === 0
                      ? <span style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>—</span>
                      : <span style={{ fontSize: '11px', color: '#B91C1C', fontWeight: 700 }}>-{diff}</span>
                    }
                  </td>
                  <td style={{ padding: '9px 12px' }}><StatusBadge status={r.status} /></td>
                  <td style={{ padding: '9px 12px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => setSelectedAR(r)} style={{ padding: '4px 10px', background: '#0B1F3A', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#00F5A0', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>Ver</button>
                      {r.status === 'observacion' && (
                        <button style={{ padding: '4px 8px', background: '#FEE2E2', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#B91C1C', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>↩ Dev.</button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>)}
      <div style={{ fontSize: '11px', color: '#6B8BAE', textAlign: 'right', marginTop: '8px' }}>
        Mostrando {filtered.length} de {recibos.length} avisos de recibo
      </div>
    </div>
  )
}
