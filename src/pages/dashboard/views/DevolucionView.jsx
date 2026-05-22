import { useState, useMemo } from 'react'
import { useApp } from '../../../context/AppContext'

const initialDevoluciones = [
  {
    id: 'DEV-042', oc: 'OC-2025-0831', asn: 'ASN-2025-0415',
    cadena: 'Wong', fecha: '20/05/2026', monto: 'S/4,200',
    motivo: 'Producto vencido', status: 'pending',
    responsable: 'Juan Quispe', cargo: 'Jefe de Almacén',
    detalle: [
      { nombre: 'Inca Kola 1.5L', bultos: 8, motivo: 'Fecha de vencimiento próxima (2 semanas)' },
      { nombre: 'Coca-Cola 500ml', bultos: 4, motivo: 'Producto vencido' },
    ]
  },
  {
    id: 'DEV-041', oc: 'OC-2025-0828', asn: 'ASN-2025-0412',
    cadena: 'Plaza Vea', fecha: '19/05/2026', monto: 'S/870',
    motivo: 'Embalaje dañado', status: 'pending',
    responsable: 'Carlos Ramos', cargo: 'Almacenero',
    detalle: [
      { nombre: 'Sprite 500ml', bultos: 2, motivo: 'Caja golpeada, producto en mal estado' },
    ]
  },
  {
    id: 'DEV-040', oc: 'OC-2025-0819', asn: 'ASN-2025-0401',
    cadena: 'Tottus', fecha: '15/05/2026', monto: 'S/6,350',
    motivo: 'Error en pedido', status: 'received',
    responsable: 'Ana López', cargo: 'Coordinadora',
    detalle: [
      { nombre: 'Fanta Naranja 1.5L', bultos: 12, motivo: 'Producto no solicitado en OC' },
      { nombre: 'Coca-Cola Zero 500ml', bultos: 5, motivo: 'Cantidad incorrecta despachada' },
    ]
  },
]

const statusConfig = {
  pending:  { label: 'Pendiente', color: '#854D0E', bg: '#FEF9C3' },
  approved: { label: 'Aprobada',  color: '#166534', bg: '#EAF3DE' },
  rejected: { label: 'Rechazada', color: '#B91C1C', bg: '#FEE2E2' },
  received: { label: 'Recibida',  color: '#065F46', bg: '#D1FAE5' },
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

function DetalleModal({ dev, onClose, onAprobar, onRechazar }) {
  const [showAprobar, setShowAprobar] = useState(false)
  const [showRechazar, setShowRechazar] = useState(false)
  const [nota, setNota] = useState('')
  const [motivo, setMotivo] = useState('')
  const motivosRechazo = ['Devolución fuera de plazo', 'Producto en buen estado', 'No corresponde a esta OC', 'Documentación incompleta', 'Otro']
  const [selectedMotivo, setSelectedMotivo] = useState('')

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.25)' }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', fontWeight: 900, color: '#0B1F3A' }}>Devolución</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#0E4D92', fontWeight: 700 }}>{dev.id}</span>
              <StatusBadge status={dev.status} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {dev.status === 'pending' && (
              <>
                <button onClick={() => setShowRechazar(true)} style={{ padding: '7px 14px', background: '#FEE2E2', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#B91C1C', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>✕ Rechazar</button>
                <button onClick={() => setShowAprobar(true)} style={{ padding: '7px 14px', background: '#D1FAE5', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#065F46', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>✓ Aprobar</button>
              </>
            )}
            <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', cursor: 'pointer', fontSize: '16px', color: '#6B8BAE' }}>✕</button>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

          <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Información general</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '20px' }}>
            {[
              ['OC de origen', dev.oc],
              ['ASN de origen', dev.asn],
              ['Cadena', dev.cadena],
              ['Fecha solicitud', dev.fecha],
              ['Monto total', dev.monto],
              ['Motivo principal', dev.motivo],
              ['Solicitante', dev.responsable],
              ['Cargo', dev.cargo],
              ['Estado', statusConfig[dev.status]?.label],
            ].map(([k,v]) => (
              <div key={k} style={{ background: '#F8FBFF', borderRadius: '8px', padding: '10px 12px' }}>
                <div style={{ fontSize: '10px', color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '3px' }}>{k}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Productos a devolver</div>
          <div style={{ border: '1px solid rgba(14,77,146,0.08)', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
                  {['Producto','Bultos','Motivo específico'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dev.detalle.map(d => (
                  <tr key={d.nombre} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)' }}>
                    <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{d.nombre}</td>
                    <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 700, color: '#B91C1C', textAlign: 'center' }}>{d.bultos}</td>
                    <td style={{ padding: '9px 12px', fontSize: '11px', color: '#92400E' }}>{d.motivo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal aprobar inline */}
          {showAprobar && (
            <div style={{ background: '#F0FFF4', border: '1px solid #86EFAC', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: '14px', fontWeight: 700, color: '#166534', marginBottom: '10px' }}>✓ Confirmar aprobación</div>
              <textarea value={nota} onChange={e => setNota(e.target.value)} placeholder="Nota para el retail (opcional)..." style={{ width: '100%', height: '60px', border: '1px solid #86EFAC', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", outline: 'none', resize: 'none', marginBottom: '10px' }} />
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button onClick={() => setShowAprobar(false)} style={{ padding: '6px 14px', background: '#fff', border: '1px solid #86EFAC', borderRadius: '8px', fontSize: '12px', color: '#166534', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Cancelar</button>
                <button onClick={() => { onAprobar(dev.id, nota); onClose() }} style={{ padding: '6px 14px', background: '#166534', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Aprobar devolución</button>
              </div>
            </div>
          )}

          {/* Modal rechazar inline */}
          {showRechazar && (
            <div style={{ background: '#FFF5F5', border: '1px solid #FECACA', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: '14px', fontWeight: 700, color: '#B91C1C', marginBottom: '10px' }}>✕ Confirmar rechazo</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
                {motivosRechazo.map(m => (
                  <div key={m} onClick={() => setSelectedMotivo(m)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', borderRadius: '8px', cursor: 'pointer', border: selectedMotivo === m ? '1.5px solid #E05252' : '1px solid #FECACA', background: selectedMotivo === m ? '#FEE2E2' : '#fff' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid', borderColor: selectedMotivo === m ? '#E05252' : '#FCA5A5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {selectedMotivo === m && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E05252' }} />}
                    </div>
                    <span style={{ fontSize: '12px', color: '#0B1F3A' }}>{m}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button onClick={() => setShowRechazar(false)} style={{ padding: '6px 14px', background: '#fff', border: '1px solid #FECACA', borderRadius: '8px', fontSize: '12px', color: '#B91C1C', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Cancelar</button>
                <button disabled={!selectedMotivo} onClick={() => { onRechazar(dev.id, selectedMotivo); onClose() }} style={{ padding: '6px 14px', background: selectedMotivo ? '#B91C1C' : '#F3F4F6', border: 'none', borderRadius: '8px', fontSize: '12px', color: selectedMotivo ? '#fff' : '#9CA3AF', fontWeight: 700, cursor: selectedMotivo ? 'pointer' : 'not-allowed', fontFamily: "'DM Sans', sans-serif" }}>Rechazar devolución</button>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(14,77,146,0.08)', display: 'flex', gap: '8px', justifyContent: 'flex-end', background: '#F8FBFF' }}>
          <button style={{ padding: '8px 16px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Descargar PDF</button>
        </div>
      </div>
    </div>
  )
}

export default function DevolucionView() {
  const { searchQuery } = useApp()
  const [data, setData] = useState(initialDevoluciones)
  const [selectedDev, setSelectedDev] = useState(null)

  const filtered = useMemo(() => {
    if (!searchQuery) return data
    const q = searchQuery.toLowerCase()
    return data.filter(d =>
      d.id.toLowerCase().includes(q) ||
      d.oc.toLowerCase().includes(q) ||
      d.cadena.toLowerCase().includes(q) ||
      d.motivo.toLowerCase().includes(q)
    )
  }, [searchQuery, data])

  const pendientes = data.filter(d => d.status === 'pending').length

  const handleAprobar = (id, nota) => {
    setData(prev => prev.map(d => d.id === id ? { ...d, status: 'approved' } : d))
  }

  const handleRechazar = (id, motivo) => {
    setData(prev => prev.map(d => d.id === id ? { ...d, status: 'rejected' } : d))
  }

  return (
    <div>
      {selectedDev && (
        <DetalleModal
          dev={selectedDev}
          onClose={() => setSelectedDev(null)}
          onAprobar={handleAprobar}
          onRechazar={handleRechazar}
        />
      )}

      {pendientes > 0 && (
        <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#92400E', marginBottom: '14px' }}>
          ⚠ <strong>{pendientes} devolución{pendientes > 1 ? 'es' : ''}</strong> pendiente{pendientes > 1 ? 's' : ''} de aprobación antes del 25/05/2026
        </div>
      )}

      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              {['N° Dev.','OC Origen','Cadena','Fecha','Motivo','Monto','Estado','Acciones'].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)', transition: 'background .15s', background: d.status === 'pending' ? '#FFFDF0' : 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8FBFF'}
                onMouseLeave={e => e.currentTarget.style.background = d.status === 'pending' ? '#FFFDF0' : 'transparent'}
              >
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#0B1F3A' }}>{d.id}</td>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#0E4D92' }}>{d.oc}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{d.cadena}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{d.fecha}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{d.motivo}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>{d.monto}</td>
                <td style={{ padding: '9px 12px' }}><StatusBadge status={d.status} /></td>
                <td style={{ padding: '9px 12px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={() => setSelectedDev(d)} style={{ padding: '4px 10px', background: '#0B1F3A', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#00C2A8', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>Ver</button>
                    {d.status === 'pending' && (
                      <>
                        <button onClick={() => { handleAprobar(d.id); }} style={{ padding: '4px 8px', background: '#D1FAE5', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#065F46', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>✓</button>
                        <button onClick={() => { handleRechazar(d.id, 'Rechazado desde tabla'); }} style={{ padding: '4px 8px', background: '#FEE2E2', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#B91C1C', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>✕</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ fontSize: '11px', color: '#6B8BAE', textAlign: 'right', marginTop: '8px' }}>
        Mostrando {filtered.length} de {data.length} devoluciones
      </div>
    </div>
  )
}
