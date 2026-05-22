import Badge from '../../../components/Badge'
import { useApp } from '../../../context/AppContext'
import { useMemo } from 'react'

const devoluciones = [
  { id: 'DEV-042', oc: 'OC-2025-0831', cadena: 'Wong', motivo: 'Producto vencido', monto: 'S/4,200', status: 'pending' },
  { id: 'DEV-041', oc: 'OC-2025-0828', cadena: 'Plaza Vea', motivo: 'Embalaje danado', monto: 'S/870', status: 'pending' },
  { id: 'DEV-040', oc: 'OC-2025-0819', cadena: 'Tottus', motivo: 'Error en pedido', monto: 'S/6,350', status: 'received' },
]

export default function DevolucionView() {
  const { searchQuery } = useApp()

  const filtered = useMemo(() => {
    if (!searchQuery) return devoluciones
    const q = searchQuery.toLowerCase()
    return devoluciones.filter(d =>
      d.id.toLowerCase().includes(q) ||
      d.oc.toLowerCase().includes(q) ||
      d.cadena.toLowerCase().includes(q) ||
      d.motivo.toLowerCase().includes(q)
    )
  }, [searchQuery])
  return (
    <div>
      <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#92400E', marginBottom: '14px' }}>
        <strong>2 devoluciones</strong> pendientes de aprobacion antes del 25/05/2026
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              {['N° Dev.','OC Origen','Cadena','Motivo','Monto','Estado','Acciones'].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)' }}>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#0B1F3A' }}>{d.id}</td>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#0E4D92' }}>{d.oc}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', color: '#0B1F3A' }}>{d.cadena}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{d.motivo}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>{d.monto}</td>
                <td style={{ padding: '9px 12px' }}><Badge status={d.status} /></td>
                <td style={{ padding: '9px 12px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button style={{ padding: '4px 10px', background: '#EAF3DE', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#166534', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>Aprobar</button>
                    <button style={{ padding: '4px 10px', background: '#FEE2E2', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#B91C1C', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>Rechazar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
