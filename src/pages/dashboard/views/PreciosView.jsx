import { priceLists } from '../../../data/mockData'
import Badge from '../../../components/Badge'

export default function PreciosView() {
  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <button style={{ padding: '7px 16px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00C2A8', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>+ Nueva lista</button>
        <button style={{ padding: '7px 14px', background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', fontSize: '12px', color: '#0B1F3A', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Exportar</button>
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              {['Codigo Lista','Cadena','Puntos de venta','Productos','Ultima actualizacion','Estado',''].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {priceLists.map(p => (
              <tr key={p.code} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)' }}>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#0B1F3A' }}>{p.code}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{p.chain}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', color: '#0B1F3A', textAlign: 'center' }}>{p.points}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A', textAlign: 'center' }}>{p.products}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{p.updated}</td>
                <td style={{ padding: '9px 12px' }}><Badge status={p.status} /></td>
                <td style={{ padding: '9px 12px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button style={{ padding: '4px 8px', background: '#EEF5FF', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#0E4D92', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Editar</button>
                    <button style={{ padding: '4px 8px', background: '#F8FBFF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '6px', fontSize: '10px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Descargar</button>
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
