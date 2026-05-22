import Badge from '../../../components/Badge'

const despachos = [
  { id: 'ASN-2025-0421', oc: 'OC-2025-0841', destino: 'Wong', despacho: '18/05', llegada: '23/05', bultos: 32, status: 'confirmed' },
  { id: 'ASN-2025-0420', oc: 'OC-2025-0840', destino: 'Plaza Vea', despacho: '17/05', llegada: '22/05', bultos: 24, status: 'dispatched' },
  { id: 'ASN-2025-0419', oc: 'OC-2025-0839', destino: 'Tottus', despacho: '16/05', llegada: '21/05', bultos: 48, status: 'received' },
  { id: 'ASN-2025-0418', oc: 'OC-2025-0837', destino: 'Vivanda', despacho: '14/05', llegada: '19/05', bultos: 14, status: 'received' },
]

export default function DespachoView() {
  return (
    <div>
      <div style={{ background: '#EEF5FF', border: '1px solid #93C5FD', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#1E40AF', marginBottom: '14px' }}>
        El ASN notifica al receptor el contenido exacto y horario de llegada <strong>antes</strong> del despacho. Sin sorpresas en el almacen.
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', padding: '6px 12px', flex: 1 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B8BAE" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{ fontSize: '12px', color: '#6B8BAE' }}>Buscar por ASN u orden...</span>
        </div>
        <button style={{ padding: '7px 16px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00C2A8', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
          + Crear ASN
        </button>
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              {['N° ASN','OC Ref.','Destino','F. Despacho','F. Llegada Est.','Bultos','Estado','Acciones'].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {despachos.map(d => (
              <tr key={d.id} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)' }}>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#0B1F3A' }}>{d.id}</td>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#0E4D92' }}>{d.oc}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{d.destino}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{d.despacho}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{d.llegada}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 700, color: '#0B1F3A', textAlign: 'center' }}>{d.bultos}</td>
                <td style={{ padding: '9px 12px' }}><Badge status={d.status} /></td>
                <td style={{ padding: '9px 12px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button style={{ padding: '4px 8px', background: '#EEF5FF', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#0E4D92', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Ver</button>
                    <button style={{ padding: '4px 8px', background: '#F8FBFF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '6px', fontSize: '10px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>PDF</button>
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
