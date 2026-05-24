import { purchaseOrders } from '../../../data/mockData'
import Badge from '../../../components/Badge'
import Tooltip from '../../../components/Tooltip'
import { useIsMobile } from '../../../hooks/useMediaQuery'
import { useApp } from '../../../context/AppContext'

const kpiTooltips = {
  'OC Activas': 'Órdenes de compra recibidas y actualmente en proceso de atencion.',
  'En Transito': 'Despachos confirmados que estan en camino al centro de distribucion.',
  'SKUs Activos': 'Productos del catálogo disponibles para ser ordenados por las cadenas.',
  'Pendiente Pago': 'Facturas emitidas pendientes de cobro por parte de las cadenas.',
}

function KpiCard({ label, value, delta, up, color, tooltip }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid rgba(14,77,146,0.1)',
      borderRadius: '12px', padding: '14px 16px',
      display: 'flex', flexDirection: 'column', gap: '6px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '11px', color: '#6B8BAE', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</span>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: '28px', fontWeight: 900, color: color || '#0B1F3A', lineHeight: 1 }}>{value}</div>
      {delta && (
        <div style={{ fontSize: '11px', color: up ? '#16A34A' : '#E05252', display: 'flex', alignItems: 'center', gap: '3px' }}>
          {up ? '↑' : '↓'} {delta}
        </div>
      )}
    </div>
  )
}

export default function DashboardView({ role, setView }) {
  const isMobile = useIsMobile()
  const isProv = role === 'prov'
  const { setSelectedOCId } = useApp()

  if (!isProv) return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
        <KpiCard label="OCs Activas" value="3" delta="1 confirmada hoy" up color="#166534" tooltip="Órdenes de compra emitidas a Arca Continental actualmente activas." />
        <KpiCard label="En camino" value="1" delta="Llega manana" up color="#F59E0B" tooltip="Despachos de Arca en camino a tu centro de distribucion." />
        <KpiCard label="Por pagar" value="S/27.9K" delta="Vence en 8 dias" color="#E05252" tooltip="Facturas pendientes de pago a Arca Continental." />
        <KpiCard label="Recepciónes" value="2" delta="Este mes" up color="#0E4D92" tooltip="Total de recepciónes confirmadas en el mes actual." />
      </div>

      <div style={{ background: '#EAF3DE', border: '1px solid #86EFAC', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#166534', marginBottom: '14px' }}>
        ✓ <strong>OC-W-2025-0841</strong> confirmada por Arca — despacho estimado 23/05
      </div>

      <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
        Estado de mis órdenes
      </div>

      {[
        { id: 'OC-W-2025-0841', amt: 'S/48,320', status: 'confirmed', p: 60, date: '18/05', delivery: '23/05' },
        { id: 'OC-W-2025-0838', amt: 'S/27,900', status: 'dispatched', p: 80, date: '15/05', delivery: '20/05' },
        { id: 'OC-W-2025-0835', amt: 'S/53,210', status: 'received', p: 100, date: '12/05', delivery: '17/05' },
      ].map(o => (
        <div key={o.id} style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '12px 16px', marginBottom: '10px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>{o.id}</span>
            <Badge status={o.status} />
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#6B8BAE', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span>Arca Continental</span>
            <span>Emitida {o.date}</span>
            <span>Entrega {o.delivery}</span>
            <span style={{ fontWeight: 700, color: '#0B1F3A' }}>{o.amt}</span>
          </div>
          <div style={{ height: '4px', background: '#F0F7FF', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: o.p + '%', background: o.p === 100 ? '#22C55E' : '#0E4D92', borderRadius: '3px', transition: 'width .3s' }} />
          </div>
        </div>
      ))}

      <button style={{
        width: '100%', padding: '12px', background: '#064E3B',
        border: 'none', borderRadius: '10px', color: '#4ADE80',
        fontSize: '13px', fontWeight: 700, cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif", marginTop: '4px'
      }} onClick={() => setView('nueva-oc')}>+ Crear nueva orden de compra</button>
    </div>
  )

  return (
    <div>
      {/* KPIs 2x2 en mobile, 4 en desktop */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)',
        gap: '10px', marginBottom: '14px'
      }}>
        <KpiCard label="OC Activas" value="38" delta="+12% este mes" up color="#0E4D92" tooltip={kpiTooltips['OC Activas']} />
        <KpiCard label="En Transito" value="14" delta="5 llegan hoy" up color="#F59E0B" tooltip={kpiTooltips['En Transito']} />
        <KpiCard label="SKUs Activos" value="50" delta="3 nuevos" up color="#166534" tooltip={kpiTooltips['SKUs Activos']} />
        <KpiCard label="Pendiente Pago" value="S/143K" delta="6 vencen pronto" color="#E05252" tooltip={kpiTooltips['Pendiente Pago']} />
      </div>

      {/* Alerta */}
      <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#92400E', marginBottom: '14px' }}>
        ⚠ <strong>2 devoluciónes</strong> pendientes · <strong>Metro</strong> sin precio en catálogo
      </div>

      {/* Fill rate + OCs — columna unica en mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '10px', marginBottom: '14px'
      }}>
        <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fill rate por cadena</span>
            <Tooltip text="Fill rate = % de OCs entregadas completas vs. lo solicitado. Un fill rate bajo puede generar penalidades contractuales con las cadenas." />
          </div>
          {[['Wong',92],['Plaza Vea',88],['Tottus',95],['Metro',84],['Vivanda',90]].map(([l,v]) => {
            const color = v >= 90 ? '#0E4D92' : v >= 75 ? '#F59E0B' : '#E05252'
            return (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: '#6B8BAE', width: '72px', flexShrink: 0 }}>{l}</span>
                <div style={{ flex: 1, height: '5px', background: '#F0F7FF', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: v + '%', background: color, borderRadius: '3px' }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#0B1F3A', width: '32px', textAlign: 'right' }}>{v}%</span>
              </div>
            )
          })}
          
          {/* Leyenda */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(14,77,146,0.06)', flexWrap: 'wrap' }}>
            {[['#0E4D92','Optimo','≥ 90%'],['#F59E0B','Atencion','75–89%'],['#E05252','Critico','< 75%']].map(([color, label, range]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                <span style={{ fontSize: '10px', color: '#6B8BAE' }}>{label}</span>
                <span style={{ fontSize: '10px', color: '#9DB8D9' }}>{range}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '14px 16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>OCs recientes</div>
          {purchaseOrders.slice(0,4).map(p => {
            const borderColor = p.status === 'confirmed' ? '#1D4ED8' : p.status === 'dispatched' ? '#065F46' : p.status === 'received' ? '#166534' : '#854D0E'
            return (
              <div key={p.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 10px', marginBottom: '6px',
                borderRadius: '8px', borderLeft: '3px solid ' + borderColor,
                background: '#F8FBFF', cursor: 'pointer', transition: 'all .15s'
              }}
                onClick={() => { setSelectedOCId(p.id); setView('oc') }}
                onMouseEnter={e => e.currentTarget.style.background = '#EEF5FF'}
                onMouseLeave={e => e.currentTarget.style.background = '#F8FBFF'}
              >
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{p.client}</div>
                  <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#6B8BAE' }}>{p.id}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <Badge status={p.status} />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#0B1F3A' }}>{p.amount}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Actividad reciente — cards en mobile, tabla en desktop */}
      <div style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
        Actividad reciente
      </div>

      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {purchaseOrders.map(p => {
            const borderColor = p.status === 'confirmed' ? '#1D4ED8' : p.status === 'dispatched' ? '#065F46' : p.status === 'received' ? '#166534' : '#854D0E'
            return (
              <div key={p.id} style={{
                background: '#fff', borderRadius: '12px',
                borderLeft: '4px solid ' + borderColor,
                border: '1px solid rgba(14,77,146,0.1)',
                borderLeftWidth: '4px', borderLeftColor: borderColor,
                padding: '12px 14px', cursor: 'pointer'
              }} onClick={() => { setSelectedOCId(p.id); setView('oc') }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#0B1F3A' }}>{p.id}</span>
                  <Badge status={p.status} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#6B8BAE' }}>{p.client} · {p.date}</span>
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: '14px', fontWeight: 900, color: '#0B1F3A' }}>{p.amount}</span>
                </div>
                <div style={{ height: '3px', background: '#F0F7FF', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: p.progress + '%', background: borderColor, borderRadius: '3px' }} />
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
                {['Documento','Cadena','Fecha','Monto','Estado','Trazabilidad'].map(h => (
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
                  <td style={{ padding: '9px 12px' }}>
                    <button onClick={() => setView('trazabilidad')} style={{ padding: '4px 10px', background: '#EEF5FF', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#0E4D92', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
