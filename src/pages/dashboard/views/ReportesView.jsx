const KPI = ({ label, value, delta, up }) => (
  <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '14px 16px' }}>
    <div style={{ fontSize: '10px', color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>{label}</div>
    <div style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: 900, color: '#0B1F3A', marginBottom: '2px' }}>{value}</div>
    {delta && <div style={{ fontSize: '10px', color: up ? '#16A34A' : '#E05252' }}>{up ? '↑' : '↓'} {delta}</div>}
  </div>
)

const reportes = [
  { name: 'Catalogo completo Arca', cat: 'Catalogo', gen: '21/05 14:32', status: 'Siempre disponible' },
  { name: 'OCs Mayo 2026 — Todas las cadenas', cat: 'Ordenes', gen: '21/05 10:00', status: 'Siempre disponible' },
  { name: 'Fill rate Q2 2026', cat: 'Analitica', gen: '20/05 09:15', status: 'Siempre disponible' },
  { name: 'Devoluciones Abril-Mayo', cat: 'Devoluciones', gen: '18/05 16:40', status: 'Siempre disponible' },
]

export default function ReportesView() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '16px' }}>
        <KPI label="Ventas YTD" value="S/2.4M" delta="18% vs 2024" up />
        <KPI label="Fill rate" value="96.4%" delta="2.1pp" up />
        <KPI label="SKUs rotando" value="47/50" delta="94% del catalogo" up />
        <KPI label="OTD" value="91.2%" delta="0.8pp" up />
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              {['Reporte','Categoria','Generado','Disponibilidad',''].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reportes.map(r => (
              <tr key={r.name} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)' }}>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{r.name}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{r.cat}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE', fontFamily: 'monospace' }}>{r.gen}</td>
                <td style={{ padding: '9px 12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#166534', background: '#EAF3DE', padding: '2px 8px', borderRadius: '100px' }}>✓ {r.status}</span>
                </td>
                <td style={{ padding: '9px 12px' }}>
                  <button style={{ padding: '4px 10px', background: '#EEF5FF', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#0E4D92', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Descargar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ fontSize: '12px', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
        ✓ En NEXO los reportes no expiran — siempre disponibles, descarga directa sin correos.
      </div>
    </div>
  )
}
