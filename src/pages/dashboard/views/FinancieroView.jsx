import Badge from '../../../components/Badge'
import { useApp } from '../../../context/AppContext'
import { useMemo } from 'react'

const facturas = [
  { id: 'FAC-1182', oc: 'OC-2025-0839', cadena: 'Tottus', emision: '21/05', vence: '05/06', monto: 'S/61,480', status: 'received' },
  { id: 'FAC-1181', oc: 'OC-2025-0837', cadena: 'Vivanda', emision: '19/05', vence: '03/06', monto: 'S/19,540', status: 'pending' },
  { id: 'FAC-1180', oc: 'OC-2025-0836', cadena: 'Wong', emision: '18/05', vence: '02/06', monto: 'S/53,210', status: 'pending' },
  { id: 'NC-042', oc: 'OC-2025-0831', cadena: 'Wong', emision: '15/05', vence: '—', monto: '-S/4,200', status: 'pending' },
]

const KPI = ({ label, value, color }) => (
  <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '14px 16px' }}>
    <div style={{ fontSize: '10px', color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>{label}</div>
    <div style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: 900, color: color || '#0B1F3A' }}>{value}</div>
  </div>
)

export default function FinancieroView() {
  const { searchQuery } = useApp()

  const filtered = useMemo(() => {
    if (!searchQuery) return facturas
    const q = searchQuery.toLowerCase()
    return facturas.filter(f =>
      f.id.toLowerCase().includes(q) ||
      f.oc.toLowerCase().includes(q) ||
      f.cadena.toLowerCase().includes(q) ||
      f.monto.toLowerCase().includes(q)
    )
  }, [searchQuery])
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '16px' }}>
        <KPI label="Por cobrar" value="S/143K" color="#E05252" />
        <KPI label="Cobrado este mes" value="S/287K" color="#166534" />
        <KPI label="Notas de credito" value="S/11K" color="#F59E0B" />
        <KPI label="Dias prom. pago" value="18" color="#0E4D92" />
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              {['Documento','OC Ref.','Cadena','Emision','Vencimiento','Monto','Estado',''].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(f => (
              <tr key={f.id} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)' }}>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#0B1F3A' }}>{f.id}</td>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#0E4D92' }}>{f.oc}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', color: '#0B1F3A' }}>{f.cadena}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{f.emision}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{f.vence}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 700, color: f.monto.startsWith('-') ? '#E05252' : '#0B1F3A' }}>{f.monto}</td>
                <td style={{ padding: '9px 12px' }}><Badge status={f.status} /></td>
                <td style={{ padding: '9px 12px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button style={{ padding: '4px 8px', background: '#EEF5FF', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#0E4D92', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>PDF</button>
                    <button style={{ padding: '4px 8px', background: '#F8FBFF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '6px', fontSize: '10px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Enviar</button>
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
