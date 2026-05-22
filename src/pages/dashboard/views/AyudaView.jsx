import { useState } from 'react'

const guias = [
  {
    icon: '📋', title: 'Crear una orden de compra',
    desc: 'Aprende a emitir tu primera OC en menos de 2 minutos.',
    pasos: [
      'Ve a "Nueva Orden" en el menú lateral',
      'Selecciona el sitio de entrega y las fechas',
      'Agrega los productos que necesitas',
      'Ajusta las cantidades con los botones + y −',
      'Haz clic en "Enviar orden a Arca" para confirmar',
      'Recibirás confirmación en tu módulo "Mis Órdenes"',
    ]
  },
  {
    icon: '🔍', title: 'Entender la trazabilidad',
    desc: 'Cómo leer el estado de cada documento en tiempo real.',
    pasos: [
      'Cada OC pasa por 9 etapas desde que se emite hasta que se cobra',
      'En "Mis Órdenes" puedes ver el estado actual de cada OC',
      'Los colores indican: verde = completado, azul = en proceso, gris = pendiente',
      'Haz clic en "Ver" para abrir el detalle completo de cualquier OC',
      'La sección "Tiempo entre etapas" muestra cuánto tomó cada paso',
    ]
  },
  {
    icon: '🧾', title: 'Gestionar mis facturas',
    desc: 'Consulta, descarga y confirma el estado de tus pagos.',
    pasos: [
      'Ve a "Mis Facturas" en el menú lateral',
      'Verás todas las facturas emitidas por Arca Continental',
      'El badge "FAC" indica factura, "NC" indica nota de crédito',
      'La columna "Días" indica cuántos días faltan para el vencimiento',
      'Haz clic en "Ver" para descargar el PDF o Excel de la factura',
      'Descarga directa — sin correos ni links que expiran',
    ]
  },
  {
    icon: '↩️', title: 'Registrar una devolución',
    desc: 'Qué hacer cuando recibes mercadería con problemas.',
    pasos: [
      'Ve a "Recepciónes" y busca el aviso de recibo con problemas',
      'Haz clic en "Ver" y luego en "Iniciar devolución"',
      'Describe el motivo: producto vencido, embalaje dañado, etc.',
      'Arca recibirá la solicitud y la aprobará en 24-48 horas',
      'Una nota de crédito será emitida automáticamente si se aprueba',
    ]
  },
]

const faqs = [
  { q: '¿Cuánto tiempo tarda Arca en confirmar mi OC?', a: 'El sistema valida automáticamente en segundos. Si hay alguna excepción, Arca la revisará manualmente en menos de 2 horas durante horario laboral.' },
  { q: '¿Puedo modificar una OC después de enviarla?', a: 'No. Una vez enviada, la OC no puede modificarse. Si necesitas cambios, cancela la OC desde "Mis Órdenes" y crea una nueva.' },
  { q: '¿Qué pasa si no recibo todos los productos?', a: 'Al confirmar el recibo en "Recepciónes", registra la diferencia. Esto generará automáticamente una solicitud de devolución a Arca.' },
  { q: '¿Los precios en NEXO son los mismos que mis condiciones negociadas?', a: 'Sí. Los precios que ves en NEXO corresponden exactamente a tu lista de precios negociada con Arca Continental.' },
]

export default function AyudaView() {
  const [activeGuia, setActiveGuia] = useState(null)
  const [activeFaq, setActiveFaq] = useState(null)

  return (
    <div>
      {/* Guías */}
      <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
        Guías rápidas
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        {guias.map((g, i) => (
          <div key={g.title}>
            <div style={{
              background: '#fff', border: activeGuia === i ? '1.5px solid #22C55E' : '1px solid rgba(14,77,146,0.1)',
              borderRadius: '12px', padding: '18px', cursor: 'pointer', transition: 'all .2s'
            }}
              onClick={() => setActiveGuia(activeGuia === i ? null : i)}
              onMouseEnter={e => { if (activeGuia !== i) e.currentTarget.style.borderColor = 'rgba(34,197,94,0.4)' }}
              onMouseLeave={e => { if (activeGuia !== i) e.currentTarget.style.borderColor = 'rgba(14,77,146,0.1)' }}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{g.icon}</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: '15px', fontWeight: 700, color: '#0B1F3A', marginBottom: '6px' }}>{g.title}</div>
              <div style={{ fontSize: '12px', color: '#6B8BAE', lineHeight: 1.6, marginBottom: '12px' }}>{g.desc}</div>
              <button style={{
                padding: '6px 14px', background: activeGuia === i ? '#EAF3DE' : '#F8FBFF',
                border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px',
                fontSize: '11px', color: activeGuia === i ? '#166534' : '#0B1F3A',
                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: activeGuia === i ? 600 : 400
              }}>
                {activeGuia === i ? '▲ Ocultar guía' : '▼ Ver guía →'}
              </button>
            </div>
            {activeGuia === i && (
              <div style={{ background: '#F8FBFF', border: '1px solid rgba(14,77,146,0.08)', borderRadius: '0 0 12px 12px', padding: '16px', marginTop: '-8px', borderTop: 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {g.pasos.map((paso, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#EAF3DE', color: '#166534', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>{j + 1}</div>
                      <span style={{ fontSize: '12px', color: '#0B1F3A', lineHeight: 1.6 }}>{paso}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
        Preguntas frecuentes
      </div>
      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid rgba(14,77,146,0.06)' : 'none' }}>
            <div onClick={() => setActiveFaq(activeFaq === i ? null : i)} style={{
              padding: '14px 18px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: activeFaq === i ? '#F8FBFF' : 'transparent', transition: 'background .15s'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#0B1F3A' }}>{faq.q}</span>
              <span style={{ color: '#6B8BAE', fontSize: '16px', flexShrink: 0, marginLeft: '12px' }}>{activeFaq === i ? '−' : '+'}</span>
            </div>
            {activeFaq === i && (
              <div style={{ padding: '0 18px 14px', fontSize: '12px', color: '#6B8BAE', lineHeight: 1.7 }}>{faq.a}</div>
            )}
          </div>
        ))}
      </div>

      {/* SLA */}
      <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
        Niveles de soporte
      </div>
      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
          {['Nivel','Tiempo de respuesta','Canal','Horario'].map(h => (
            <div key={h} style={{ padding: '10px 14px', fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</div>
          ))}
        </div>
        {[
          { nivel: 'Leve', desc: 'Consultas generales', dot: '#639922', slaColor: '#3B6D11', slaBg: '#EAF3DE', sla: 'menos de 4h', canal: 'WhatsApp · Email', horario: 'Lun–Vie 8–18h' },
          { nivel: 'Moderado', desc: 'Errores en datos', dot: '#BA7517', slaColor: '#854F0B', slaBg: '#FAEEDA', sla: 'menos de 2h', canal: 'WhatsApp · Llamada', horario: 'Lun–Vie 8–20h' },
          { nivel: 'Crítico', desc: 'Plataforma caída', dot: '#E24B4A', slaColor: '#A32D2D', slaBg: '#FCEBEB', sla: 'menos de 30min', canal: 'Llamada directa', horario: '24/7' },
        ].map((s, i, arr) => (
          <div key={s.nivel} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', borderBottom: i < arr.length - 1 ? '1px solid rgba(14,77,146,0.06)' : 'none', alignItems: 'center' }}>
            <div style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0B1F3A' }}>{s.nivel}</div>
                <div style={{ fontSize: '11px', color: '#6B8BAE' }}>{s.desc}</div>
              </div>
            </div>
            <div style={{ padding: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: s.slaColor, background: s.slaBg, padding: '3px 10px', borderRadius: '100px' }}>{s.sla}</span>
            </div>
            <div style={{ padding: '14px', fontSize: '12px', color: '#6B8BAE' }}>{s.canal}</div>
            <div style={{ padding: '14px', fontSize: '12px', color: '#6B8BAE' }}>{s.horario}</div>
          </div>
        ))}
      </div>

      {/* Contacto */}
      <div style={{ background: '#0B1F3A', borderRadius: '12px', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '16px', fontWeight: 900, color: '#fff', marginBottom: '4px' }}>¿Necesitas soporte ahora?</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>Para incidentes críticos llama directamente — disponible 24/7.</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <a href="tel:+51931067775" style={{ padding: '9px 18px', background: '#00F5A0', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#060C16', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
            📞 (+51) 931 067 775
          </a>
          <a href="https://wa.me/51931067775" target="_blank" rel="noreferrer" style={{ padding: '9px 18px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', fontSize: '12px', color: '#fff', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
            WhatsApp →
          </a>
        </div>
      </div>
    </div>
  )
}
