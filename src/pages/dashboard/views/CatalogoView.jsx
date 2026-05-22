import { catalogData } from '../../../data/mockData'
import Badge from '../../../components/Badge'

export default function CatalogoView() {
  return (
    <div>
      <div style={{ background: '#EEF5FF', border: '1px solid #93C5FD', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#1E40AF', marginBottom: '14px' }}>
        <strong>50 SKUs activos</strong> · 1 SKU sin precio para Metro · Ultima sync: hoy 14:32
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', padding: '6px 12px', flex: 1 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B8BAE" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{ fontSize: '12px', color: '#6B8BAE' }}>Buscar por EAN, nombre o codigo...</span>
        </div>
        <button style={{ padding: '7px 14px', background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', fontSize: '12px', color: '#0B1F3A', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Exportar</button>
        <button style={{ padding: '7px 16px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00C2A8', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>+ Nuevo SKU</button>
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              {['EAN','Cod. Interno','Producto','Presentacion','Peso','P. Wong','P. Tottus','Estado',''].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {catalogData.map(p => (
              <tr key={p.ean} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)' }}>
                <td style={{ padding: '9px 12px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', background: '#F0F7FF', color: '#6B8BAE', padding: '2px 6px', borderRadius: '4px' }}>{p.ean}</span>
                </td>
                <td style={{ padding: '9px 12px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', background: '#F0F7FF', color: '#6B8BAE', padding: '2px 6px', borderRadius: '4px' }}>{p.code}</span>
                </td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{p.name}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{p.presentation}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{p.weight}</td>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#0B1F3A' }}>{p.priceWong}</td>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#0B1F3A' }}>{p.priceTottus}</td>
                <td style={{ padding: '9px 12px' }}>
                  <Badge status={p.status} />
                </td>
                <td style={{ padding: '9px 12px' }}>
                  <button style={{ padding: '4px 8px', background: '#F8FBFF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '6px', fontSize: '10px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
