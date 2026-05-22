import { purchaseOrders } from '../../../data/mockData'
import Badge from '../../../components/Badge'

const KPI = ({ label, value, delta, up, color }) => (
  <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '14px 16px' }}>
    <div style={{ fontSize: '10px', color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>{label}</div>
    <div style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: 900, color: color || '#0B1F3A', marginBottom: '2px' }}>{value}</div>
    {delta && <div style={{ fontSize: '10px', color: up ? '#16A34A' : '#E05252' }}>{up ? 'arriba' : 'abajo'} {delta}</div>}
  </div>
)

export default function DashboardView({ role }) {
  const isProv = role === 'prov'

  if (!isProv) return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '14px' }}>
        <KPI label="OCs Activas" value="3" delta="1 confirmada hoy" up color="#166534" />
        <KPI label="En camino" value="1" delta="Llega manana" up color="#F59E0B" />
        <KPI label="Por pagar" value="S/27.9K" delta="Vence en 8 dias" color="#E05252" />
      </div>
      <div style={{ background: '#EAF3DE', border: '1px solid #86EFAC', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#166534', marginBottom: '14px' }}>
        OC-W-2025-0841 confirmada por Arca Continental - despacho estimado 23/05
      </div>
      {[
        { id: 'OC-W-2025-0841', amt: 'S/48,320', status: 'confirmed', p: 60 },
        { id: 'OC-W-2025-0838', amt: 'S/27,900', status: 'dispatched', p: 80 },
        { id: 'OC-W-2025-0835', amt: 'S/53,210', status: 'received', p: 100 },
      ].map(o => (
        <div key={o.id} style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '12px 16px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>{o.id}</span>
            <Badge status={o.status} />
          </div>
          <div style={{ height: '4px', background: '#F0F7FF', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: o.p + '%', background: o.p === 100 ? '#22C55E' : '#0E4D92', borderRadius: '3px' }} />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '14px' }}>
        <KPI label="OC Activas" value="38" delta="+12% este mes" up color="#0E4D92" />
        <KPI label="En Transito" value="14" delta="5 llegan hoy" up color="#F59E0B" />
        <KPI label="SKUs Activos" value="50" delta="3 nuevos" up color="#166534" />
        <KPI label="Pendiente Pago" value="S/143K" delta="6 facturas vencen" color="#E05252" />
      </div>

      <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#92400E', marginBottom: '14px' }}>
        2 devoluciones pendientes de aprobacion · Metro sin precio configurado en catalogo
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
        <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '14px 16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Fill rate por cadena</div>
          {[['Wong',92],['Plaza Vea',88],['Tottus',95],['Metro',84],['Vivanda',90]].map(([l,v]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
              <span style={{ fontSize: '11px', color: '#6B8BAE', width: '80px', flexShrink: 0 }}>{l}</span>
              <div style={{ flex: 1, height: '5px', background: '#F0F7FF', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: v + '%', background: '#0E4D92', borderRadius: '3px' }} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#0B1F3A', width: '30px', textAlign: 'right' }}>{v}%</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '14px 16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>OCs recientes</div>
          {purchaseOrders.slice(0,4).map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid rgba(14,77,146,0.06)' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{p.client}</div>
                <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#6B8BAE' }}>{p.id}</div>
              </div>
              <Badge status={p.status} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Actividad reciente</div>
      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              {['Documento','Cadena','Fecha','Monto','Estado'].map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)' }}>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#0B1F3A' }}>{p.id}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', color: '#0B1F3A' }}>{p.client}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{p.date}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>{p.amount}</td>
                <td style={{ padding: '9px 12px' }}><Badge status={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
