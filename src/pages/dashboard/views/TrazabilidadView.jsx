import { useState, useMemo } from 'react'
import { useIsMobile } from '../../../hooks/useMediaQuery'
import { useApp } from '../../../context/AppContext'

const ocList = [
  {
    id: 'OC-2025-0841', client: 'Wong Supermercados', amount: 'S/ 48,320', items: 12,
    emisión: '18/05/2026', entrega: '23/05/2026', status: 'transit', progress: 70,
    steps: [
      { label: 'OC recibida', desc: 'Documento ingresó al canal NEXO', time: '21/05/2026 18:22:40', status: 'done' },
      { label: 'Validación de reglas', desc: 'Catálogo, precios y condiciones verificadas', time: '21/05/2026 18:22:41', status: 'done' },
      { label: 'Procesado en plataforma', desc: 'Documento disponible para Arca Continental', time: '21/05/2026 18:22:43', status: 'done' },
      { label: 'Entregado al proveedor', desc: 'Arca recibió la OC en su bandeja', time: '21/05/2026 18:22:44', status: 'done' },
      { label: 'Confirmación de Arca', desc: 'Arca confirmó disponibilidad de todos los SKUs', time: '22/05/2026 09:15:00', status: 'done' },
      { label: 'ASN generado y enviado', desc: 'Aviso de despacho enviado a Wong', time: '22/05/2026 14:30:00', status: 'done' },
      { label: 'En tránsito', desc: 'Mercadería en camino al CD Wong Ate', time: '23/05/2026 08:00:00', status: 'active' },
      { label: 'Recibo confirmado', desc: 'Wong confirma recepción completa', time: 'Pendiente', status: 'pending' },
      { label: 'Factura emitida', desc: 'Factura electrónica enviada a Wong', time: 'Pendiente', status: 'pending' },
    ],
    tiempos: [
      ['OC recibida → Validado', '1 seg'],
      ['Validado → Entregado', '3 segs'],
      ['Entregado → Confirmado', '14h 52m'],
      ['Confirmado → ASN', '5h 15m'],
      ['ASN → En tránsito', '17h 30m'],
    ]
  },
  {
    id: 'OC-2025-0840', client: 'Plaza Vea', amount: 'S/ 32,150', items: 8,
    emisión: '17/05/2026', entrega: '22/05/2026', status: 'received', progress: 100,
    steps: [
      { label: 'OC recibida', desc: 'Documento ingresó al canal NEXO', time: '17/05/2026 09:10:00', status: 'done' },
      { label: 'Validación de reglas', desc: 'Catálogo, precios y condiciones verificadas', time: '17/05/2026 09:10:02', status: 'done' },
      { label: 'Procesado en plataforma', desc: 'Documento disponible para Arca Continental', time: '17/05/2026 09:10:05', status: 'done' },
      { label: 'Entregado al proveedor', desc: 'Arca recibió la OC en su bandeja', time: '17/05/2026 09:10:06', status: 'done' },
      { label: 'Confirmación de Arca', desc: 'Arca confirmó disponibilidad de todos los SKUs', time: '17/05/2026 14:30:00', status: 'done' },
      { label: 'ASN generado y enviado', desc: 'Aviso de despacho enviado a Plaza Vea', time: '18/05/2026 08:00:00', status: 'done' },
      { label: 'En tránsito', desc: 'Mercadería en camino al CD Plaza Vea', time: '20/05/2026 07:00:00', status: 'done' },
      { label: 'Recibo confirmado', desc: 'Plaza Vea confirmó recepción completa', time: '22/05/2026 10:30:00', status: 'done' },
      { label: 'Factura emitida', desc: 'Factura electrónica enviada a Plaza Vea', time: 'Pendiente', status: 'pending' },
    ],
    tiempos: [
      ['OC recibida → Validado', '2 segs'],
      ['Validado → Confirmado', '5h 20m'],
      ['Confirmado → ASN', '17h 30m'],
      ['ASN → En tránsito', '23h 00m'],
      ['En tránsito → Recibo', '2d 03h'],
    ]
  },
  {
    id: 'OC-2025-0839', client: 'Tottus', amount: 'S/ 61,480', items: 15,
    emisión: '16/05/2026', entrega: '21/05/2026', status: 'invoiced', progress: 100,
    steps: [
      { label: 'OC recibida', desc: 'Documento ingresó al canal NEXO', time: '16/05/2026 10:00:00', status: 'done' },
      { label: 'Validación de reglas', desc: 'Todo verificado automáticamente', time: '16/05/2026 10:00:03', status: 'done' },
      { label: 'Procesado en plataforma', desc: 'Disponible para Arca Continental', time: '16/05/2026 10:00:05', status: 'done' },
      { label: 'Entregado al proveedor', desc: 'Arca recibió la OC', time: '16/05/2026 10:00:06', status: 'done' },
      { label: 'Confirmación de Arca', desc: 'Confirmado con disponibilidad total', time: '16/05/2026 15:45:00', status: 'done' },
      { label: 'ASN generado y enviado', desc: 'Aviso enviado a Tottus', time: '17/05/2026 09:00:00', status: 'done' },
      { label: 'En tránsito', desc: 'Mercadería despachada', time: '18/05/2026 07:30:00', status: 'done' },
      { label: 'Recibo confirmado', desc: 'Tottus confirmó recepción — 48/48 bultos', time: '21/05/2026 09:15:00', status: 'done' },
      { label: 'Factura emitida', desc: 'FAC-1182 enviada a Tottus · S/61,480', time: '21/05/2026 14:00:00', status: 'done' },
    ],
    tiempos: [
      ['OC recibida → Validado', '3 segs'],
      ['Validado → Confirmado', '5h 45m'],
      ['Confirmado → ASN', '17h 15m'],
      ['ASN → En tránsito', '22h 30m'],
      ['En tránsito → Recibo', '3d 01h'],
    ]
  },
  {
    id: 'OC-2025-0838', client: 'Metro', amount: 'S/ 27,900', items: 6,
    emisión: '15/05/2026', entrega: '20/05/2026', status: 'published', progress: 25,
    steps: [
      { label: 'OC recibida', desc: 'Documento ingresó al canal NEXO', time: '15/05/2026 11:00:00', status: 'done' },
      { label: 'Validación de reglas', desc: 'Verificando catálogo y precios', time: '15/05/2026 11:00:04', status: 'done' },
      { label: 'Procesado en plataforma', desc: 'Disponible para Arca Continental', time: '15/05/2026 11:00:08', status: 'done' },
      { label: 'Entregado al proveedor', desc: 'Arca recibió la OC en su bandeja', time: '15/05/2026 11:00:10', status: 'active' },
      { label: 'Confirmación de Arca', desc: 'Esperando confirmación de Arca', time: 'Pendiente', status: 'pending' },
      { label: 'ASN generado y enviado', desc: 'Pendiente de despacho', time: 'Pendiente', status: 'pending' },
      { label: 'En tránsito', desc: 'Pendiente', time: 'Pendiente', status: 'pending' },
      { label: 'Recibo confirmado', desc: 'Pendiente', time: 'Pendiente', status: 'pending' },
      { label: 'Factura emitida', desc: 'Pendiente', time: 'Pendiente', status: 'pending' },
    ],
    tiempos: [
      ['OC recibida → Validado', '4 segs'],
      ['Validado → Entregado', '2 segs'],
    ]
  },
  {
    id: 'OC-2025-0837', client: 'Vivanda', amount: 'S/ 19,540', items: 4,
    emisión: '14/05/2026', entrega: '19/05/2026', status: 'received', progress: 90,
    steps: [
      { label: 'OC recibida', desc: 'Documento ingresó al canal NEXO', time: '14/05/2026 08:00:00', status: 'done' },
      { label: 'Validación de reglas', desc: 'Todo verificado', time: '14/05/2026 08:00:02', status: 'done' },
      { label: 'Procesado en plataforma', desc: 'Disponible para Arca', time: '14/05/2026 08:00:04', status: 'done' },
      { label: 'Entregado al proveedor', desc: 'Arca recibió la OC', time: '14/05/2026 08:00:05', status: 'done' },
      { label: 'Confirmación de Arca', desc: 'Confirmado', time: '14/05/2026 13:00:00', status: 'done' },
      { label: 'ASN generado y enviado', desc: 'Aviso enviado a Vivanda', time: '15/05/2026 08:00:00', status: 'done' },
      { label: 'En tránsito', desc: 'Mercadería despachada', time: '17/05/2026 07:00:00', status: 'done' },
      { label: 'Recibo confirmado', desc: 'Vivanda confirmó recepción — 14/14 bultos', time: '19/05/2026 09:30:00', status: 'done' },
      { label: 'Factura emitida', desc: 'Pendiente de emisión SAP', time: 'Pendiente', status: 'pending' },
    ],
    tiempos: [
      ['OC recibida → Validado', '2 segs'],
      ['Validado → Confirmado', '5h 00m'],
      ['Confirmado → ASN', '19h 00m'],
      ['ASN → En tránsito', '2d 23h'],
      ['En tránsito → Recibo', '2d 02h'],
    ]
  },
]

const statusConfig = {
  published:  { label: 'Publicada',    color: '#0E4D92', bg: '#EEF5FF' },
  confirmed:  { label: 'Confirmada',   color: '#065F46', bg: '#D1FAE5' },
  transit:    { label: 'En tránsito',  color: '#92400E', bg: '#FEF3C7' },
  received:   { label: 'Recibida',     color: '#166534', bg: '#EAF3DE' },
  invoiced:   { label: 'Facturada',    color: '#1D4ED8', bg: '#DBEAFE' },
  rejected:   { label: 'Rechazada',    color: '#B91C1C', bg: '#FEE2E2' },
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.published
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, background: cfg.bg, color: cfg.color }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: cfg.color, flexShrink: 0 }} />
      {cfg.label}
    </span>
  )
}

function Timeline({ oc, isMobile }) {
  const stepColor = (s) => s === 'done' ? '#166534' : s === 'active' ? '#1D4ED8' : '#9DB8D9'
  const stepBg = (s) => s === 'done' ? '#EAF3DE' : s === 'active' ? '#DBEAFE' : '#F0F7FF'
  const stepIcon = (s) => s === 'done' ? '✓' : s === 'active' ? '→' : '○'

  const nextAction = oc.steps.find(s => s.status === 'pending')

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px' }}>
      {/* Timeline */}
      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '16px' }}>
        <div style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>Flujo del documento</div>

        {nextAction && (
          <div style={{ background: '#EEF5FF', border: '1px solid #93C5FD', borderRadius: '8px', padding: '8px 12px', fontSize: '11px', color: '#1E40AF', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Próximo paso: <strong>{nextAction.label}</strong></span>
            {oc.status === 'received' && (
              <button style={{ padding: '4px 10px', background: '#0B1F3A', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#00F5A0', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
                Emitir factura →
              </button>
            )}
            {oc.status === 'transit' && (
              <button style={{ padding: '4px 10px', background: '#065F46', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#D1FAE5', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
                Confirmar recibo →
              </button>
            )}
          </div>
        )}

        {oc.steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', paddingBottom: i < oc.steps.length - 1 ? '14px' : '0', position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '26px', flexShrink: 0 }}>
              <div style={{
                width: '26px', height: '26px', borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0,
                background: stepBg(step.status), color: stepColor(step.status), fontWeight: 700
              }}>
                {stepIcon(step.status)}
              </div>
              {i < oc.steps.length - 1 && (
                <div style={{ width: '2px', flex: 1, marginTop: '4px', background: step.status === 'done' ? '#BBF7D0' : '#E5EFFF', minHeight: '14px' }} />
              )}
            </div>
            <div style={{ paddingTop: '3px', flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: step.status === 'done' ? '#0B1F3A' : step.status === 'active' ? '#1D4ED8' : '#9DB8D9', marginBottom: '2px' }}>{step.label}</div>
              <div style={{ fontSize: '10px', color: '#6B8BAE' }}>{step.desc}</div>
              <div style={{ fontSize: '10px', color: '#9DB8D9', fontFamily: 'monospace', marginTop: '1px' }}>{step.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Detalle */}
        <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Detalle del documento</div>
          {[
            ['N° Orden', oc.id],
            ['Cadena', oc.client],
            ['Proveedor', 'Arca Continental'],
            ['Fecha emisión', oc.emisión],
            ['Entrega estimada', oc.entrega],
            ['SKUs', oc.items + ' productos'],
            ['Monto total', oc.amount],
            ['Estado actual', statusConfig[oc.status]?.label || oc.status],
          ].map(([k,v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(14,77,146,0.05)', fontSize: '12px' }}>
              <span style={{ color: '#6B8BAE' }}>{k}</span>
              <span style={{ fontWeight: 600, color: '#0B1F3A' }}>{v}</span>
            </div>
          ))}
          {/* Progress bar */}
          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6B8BAE', marginBottom: '4px' }}>
              <span>Progreso del flujo</span>
              <span>{oc.progress}%</span>
            </div>
            <div style={{ height: '6px', background: '#F0F7FF', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: oc.progress + '%', background: oc.progress === 100 ? '#22C55E' : '#0E4D92', borderRadius: '3px', transition: 'width .3s' }} />
            </div>
          </div>
        </div>

        {/* Tiempos */}
        <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Tiempo entre etapas</div>
          {oc.tiempos.map(([e,t]) => (
            <div key={e} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(14,77,146,0.05)', fontSize: '11px' }}>
              <span style={{ color: '#6B8BAE' }}>{e}</span>
              <span style={{ fontWeight: 700, color: '#0E4D92', fontFamily: 'monospace' }}>{t}</span>
            </div>
          ))}
        </div>

        {/* Acciones */}
        <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '14px 16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button style={{ padding: '7px 14px', background: '#EEF5FF', border: 'none', borderRadius: '8px', fontSize: '11px', color: '#0E4D92', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Descargar PDF</button>
          {false && <button style={{ padding: '7px 14px', background: '#F8FBFF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', fontSize: '11px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Descargar EDI</button>} {/* oculto — activar por tenant desde admin */}
          <button style={{ padding: '7px 14px', background: '#F8FBFF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', fontSize: '11px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Compartir link</button>
        </div>
      </div>
    </div>
  )
}

export default function TrazabilidadView() {
  const { searchQuery } = useApp()
  const isMobile = useIsMobile()
  const [selectedOC, setSelectedOC] = useState(ocList[0])
  const [mobileView, setMobileView] = useState('list')

  const filtered = useMemo(() => {
    if (!searchQuery) return ocList
    const q = searchQuery.toLowerCase()
    return ocList.filter(o =>
      o.id.toLowerCase().includes(q) ||
      o.client.toLowerCase().includes(q) ||
      o.amount.toLowerCase().includes(q)
    )
  }, [searchQuery])

  if (isMobile) return (
    <div>
      {mobileView === 'list' ? (
        <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(14,77,146,0.08)', fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Órdenes de compra</span>
            <span style={{ background: '#EEF5FF', color: '#0E4D92', padding: '2px 8px', borderRadius: '100px', fontSize: '10px', fontWeight: 700 }}>{filtered.length}</span>
          </div>
          {filtered.map(oc => {
            const cfg = statusConfig[oc.status] || statusConfig.published
            return (
              <div key={oc.id} onClick={() => { setSelectedOC(oc); setMobileView('detail') }} style={{ padding: '12px 14px', cursor: 'pointer', borderBottom: '1px solid rgba(14,77,146,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#0B1F3A', marginBottom: '3px' }}>{oc.id}</div>
                  <div style={{ fontSize: '11px', color: '#6B8BAE' }}>{oc.client} · {oc.amount}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: cfg.color, background: cfg.bg, padding: '2px 7px', borderRadius: '100px' }}>{cfg.label}</span>
                  <span style={{ fontSize: '10px', color: '#9DB8D9' }}>{oc.progress}% →</span>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div>
          <button onClick={() => setMobileView('list')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', fontSize: '12px', color: '#0B1F3A', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", marginBottom: '12px' }}>
            ← Volver a lista
          </button>
          <div style={{ background: '#EEF5FF', border: '1px solid #93C5FD', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#1E40AF', marginBottom: '12px' }}>
            <strong>{selectedOC.id}</strong> · {selectedOC.client} · {selectedOC.amount}
          </div>
          <Timeline oc={selectedOC} isMobile={true} />
        </div>
      )}
    </div>
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '14px', alignItems: 'start' }}>

      {/* Lista de OCs */}
      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(14,77,146,0.08)', fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Órdenes de compra</span>
          <span style={{ background: '#EEF5FF', color: '#0E4D92', padding: '2px 8px', borderRadius: '100px', fontSize: '10px', fontWeight: 700 }}>{filtered.length}</span>
        </div>
        {filtered.map(oc => {
          const isSelected = selectedOC?.id === oc.id
          const cfg = statusConfig[oc.status] || statusConfig.published
          return (
            <div key={oc.id} onClick={() => setSelectedOC(oc)} style={{
              padding: '12px 14px', cursor: 'pointer', transition: 'background .15s',
              borderLeft: isSelected ? '3px solid #0E4D92' : '3px solid transparent',
              background: isSelected ? '#EEF5FF' : 'transparent',
              borderBottom: '1px solid rgba(14,77,146,0.05)'
            }}
              onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#F8FBFF' }}
              onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#0B1F3A' }}>{oc.id}</span>
                <span style={{ fontSize: '10px', fontWeight: 600, color: cfg.color, background: cfg.bg, padding: '2px 7px', borderRadius: '100px' }}>{cfg.label}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#6B8BAE', marginBottom: '6px' }}>{oc.client} · {oc.amount}</div>
              <div style={{ height: '3px', background: '#F0F7FF', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: oc.progress + '%', background: oc.progress === 100 ? '#22C55E' : isSelected ? '#0E4D92' : '#93C5FD', borderRadius: '3px' }} />
              </div>
              <div style={{ fontSize: '10px', color: '#9DB8D9', marginTop: '3px', textAlign: 'right' }}>{oc.progress}%</div>
            </div>
          )
        })}
      </div>

      {/* Detalle */}
      <div>
        {selectedOC ? (
          <>
            <div style={{ background: '#EEF5FF', border: '1px solid #93C5FD', borderRadius: '8px', padding: '10px 16px', fontSize: '12px', color: '#1E40AF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Trazabilidad de <strong>{selectedOC.id}</strong> · {selectedOC.client} · {selectedOC.amount} · {selectedOC.items} SKUs
            </div>
            <Timeline oc={selectedOC} isMobile={false} />
          </>
        ) : (
          <div style={{ textAlign: 'center', paddingTop: '80px', color: '#6B8BAE' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', fontWeight: 700, color: '#0B1F3A', marginBottom: '6px' }}>Selecciona una OC</div>
            <div style={{ fontSize: '13px' }}>Haz clic en cualquier orden de la lista para ver su trazabilidad completa</div>
          </div>
        )}
      </div>
    </div>
  )
}
