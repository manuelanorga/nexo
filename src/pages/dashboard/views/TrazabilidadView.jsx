import { traceSteps } from '../../../data/mockData'

export default function TrazabilidadView() {
  return (
    <div>
      <div style={{ background: '#EEF5FF', border: '1px solid #93C5FD', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#1E40AF', marginBottom: '16px' }}>
        Trazabilidad de <strong>OC-2025-0841</strong> · Wong Supermercados · S/ 48,320 · 12 SKUs
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
            Flujo del documento
          </div>
          {traceSteps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', paddingBottom: i < traceSteps.length - 1 ? '16px' : '0', position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '28px', flexShrink: 0 }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0,
                  background: step.status === 'done' ? '#EAF3DE' : step.status === 'active' ? '#DBEAFE' : '#F0F7FF',
                  color: step.status === 'done' ? '#166534' : step.status === 'active' ? '#1D4ED8' : '#6B8BAE',
                }}>
                  {step.status === 'done' ? '✓' : step.status === 'active' ? '→' : '○'}
                </div>
                {i < traceSteps.length - 1 && (
                  <div style={{ width: '2px', flex: 1, marginTop: '4px', background: step.status === 'done' ? '#BBF7D0' : '#E5EFFF', minHeight: '16px' }} />
                )}
              </div>
              <div style={{ paddingTop: '4px', flex: 1 }}>
                <div style={{
                  fontSize: '12px', fontWeight: 600, marginBottom: '2px',
                  color: step.status === 'done' ? '#0B1F3A' : step.status === 'active' ? '#1D4ED8' : '#6B8BAE'
                }}>{step.label}</div>
                <div style={{ fontSize: '11px', color: '#6B8BAE' }}>{step.desc}</div>
                <div style={{ fontSize: '10px', color: '#9DB8D9', fontFamily: 'monospace', marginTop: '2px' }}>{step.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Detalle del documento</div>
            {[
              ['N° Orden','OC-2025-0841'],
              ['Cadena','Wong Supermercados'],
              ['Proveedor','Arca Continental'],
              ['Fecha emision','18/05/2026'],
              ['Entrega estimada','23/05/2026'],
              ['SKUs','12 productos'],
              ['Monto total','S/ 48,320'],
              ['Estado actual','En transito'],
            ].map(([k,v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(14,77,146,0.05)', fontSize: '12px' }}>
                <span style={{ color: '#6B8BAE' }}>{k}</span>
                <span style={{ fontWeight: 600, color: '#0B1F3A' }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Tiempo entre etapas</div>
            {[
              ['OC recibida → Validado','1 seg'],
              ['Validado → Entregado','3 segs'],
              ['Entregado → Confirmado','14h 52m'],
              ['Confirmado → ASN','5h 15m'],
              ['ASN → En transito','17h 30m'],
            ].map(([e,t]) => (
              <div key={e} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(14,77,146,0.05)', fontSize: '11px' }}>
                <span style={{ color: '#6B8BAE' }}>{e}</span>
                <span style={{ fontWeight: 700, color: '#0E4D92' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
