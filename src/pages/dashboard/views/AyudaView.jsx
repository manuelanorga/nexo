export default function AyudaView() {
  const cards = [
    { title: 'Crear una orden de compra', desc: 'Aprende a emitir tu primera OC en menos de 2 minutos.', btn: 'Ver guia' },
    { title: 'Entender la trazabilidad', desc: 'Como leer el estado de cada documento en tiempo real.', btn: 'Ver guia' },
    { title: 'Gestionar mis facturas', desc: 'Consulta, descarga y confirma el estado de tus pagos.', btn: 'Ver guia' },
    { title: 'Contactar soporte', desc: 'Respuesta garantizada en menos de 2 horas.\n(+51) 931 067 775', btn: 'Contactar' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
      {cards.map(c => (
        <div key={c.title} style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '14px', padding: '22px', cursor: 'pointer', transition: 'all .2s' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#22C55E'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(14,77,146,0.1)'}
        >
          <div style={{ width: '40px', height: '40px', background: '#EAF3DE', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '14px' }}>
            {c.title.includes('orden') ? '📋' : c.title.includes('trazabilidad') ? '🔍' : c.title.includes('factura') ? '🧾' : '📞'}
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '15px', fontWeight: 700, color: '#0B1F3A', marginBottom: '6px' }}>{c.title}</div>
          <div style={{ fontSize: '12px', color: '#6B8BAE', lineHeight: 1.6, marginBottom: '14px', whiteSpace: 'pre-line' }}>{c.desc}</div>
          <button style={{ padding: '7px 16px', background: '#F8FBFF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', fontSize: '12px', color: '#0B1F3A', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            {c.btn} →
          </button>
        </div>
      ))}
    </div>
  )
}
