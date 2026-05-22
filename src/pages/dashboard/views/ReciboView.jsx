import Badge from '../../../components/Badge'

const recibos = [
  { id: 'AR-2025-0291', asn: 'ASN-2025-0419', cadena: 'Tottus', fecha: '21/05', pedido: 48, recibido: 47, discrepancia: '1 bulto danado', status: 'pending' },
  { id: 'AR-2025-0290', asn: 'ASN-2025-0418', cadena: 'Vivanda', fecha: '19/05', pedido: 14, recibido: 14, discrepancia: '—', status: 'received' },
  { id: 'AR-2025-0289', asn: 'ASN-2025-0417', cadena: 'Metro', fecha: '18/05', pedido: 22, recibido: 22, discrepancia: '—', status: 'received' },
]

export default function ReciboView() {
  return (
    <div>
      <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#92400E', marginBottom: '14px' }}>
        <strong>AR-2025-0291</strong> tiene una discrepancia — 1 bulto danado en recepcion Tottus. Considera iniciar una devolucion.
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              {['N° Recibo','ASN Ref.','Cadena','F. Recibo','Bultos pedidos','Bultos recibidos','Discrepancia','Estado'].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recibos.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)' }}>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#0B1F3A' }}>{r.id}</td>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#0E4D92' }}>{r.asn}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{r.cadena}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{r.fecha}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', color: '#0B1F3A', textAlign: 'center' }}>{r.pedido}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 700, color: '#0B1F3A', textAlign: 'center' }}>{r.recibido}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: r.discrepancia === '—' ? '#6B8BAE' : '#E05252', fontWeight: r.discrepancia === '—' ? 400 : 600 }}>{r.discrepancia}</td>
                <td style={{ padding: '9px 12px' }}><Badge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
