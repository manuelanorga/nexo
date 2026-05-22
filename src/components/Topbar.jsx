const titles = {
  dashboard: 'Dashboard', catalogo: 'Catalogo de Productos',
  precios: 'Listas de Precios', oc: 'Ordenes de Compra',
  despacho: 'Avisos de Despacho', recibo: 'Avisos de Recibo',
  devolucion: 'Devoluciones', financiero: 'Documentos Financieros',
  reportes: 'Reportes', trazabilidad: 'Trazabilidad',
  'nueva-oc': 'Nueva Orden de Compra', 'mis-ocs': 'Mis Ordenes',
  recepciones: 'Recepciones', 'mis-facturas': 'Mis Facturas', ayuda: 'Centro de Ayuda',
}

export default function Topbar({ role, view, setView }) {
  const isProv = role === 'prov'
  const accentColor = isProv ? '#0E4D92' : '#166534'
  const accentBg = isProv ? '#0B1F3A' : '#064E3B'
  const accentText = isProv ? '#00C2A8' : '#4ADE80'

  const handleNew = () => {
    if (role === 'ret') setView('nueva-oc')
  }

  return (
    <div style={{
      height: '52px', background: '#fff', borderBottom: '1px solid rgba(14,77,146,0.08)',
      display: 'flex', alignItems: 'center', padding: '0 20px', gap: '12px', flexShrink: 0
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: '15px', fontWeight: 800, color: '#0B1F3A' }}>
          {titles[view] || 'Dashboard'}
        </div>
        <div style={{ fontSize: '10px', color: '#6B8BAE' }}>
          Inicio › {titles[view] || 'Dashboard'}
        </div>
      </div>

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        background: '#F0F7FF', border: '1px solid rgba(14,77,146,0.1)',
        borderRadius: '8px', padding: '5px 12px', width: '200px'
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B8BAE" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span style={{ fontSize: '12px', color: '#6B8BAE', fontFamily: "'DM Sans', sans-serif" }}>
          Buscar...
        </span>
      </div>

      {/* Role tag */}
      <span style={{
        padding: '4px 12px', borderRadius: '100px', fontSize: '10px', fontWeight: 700,
        letterSpacing: '0.5px', background: accentBg, color: accentText
      }}>
        {isProv ? 'Proveedor' : 'Retail'}
      </span>

      {/* CTA */}
      <button onClick={handleNew} style={{
        display: 'flex', alignItems: 'center', gap: '5px',
        padding: '7px 16px', border: 'none', borderRadius: '8px',
        background: accentBg, color: accentText,
        fontSize: '12px', fontWeight: 700, cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif"
      }}>
        + Nuevo
      </button>
    </div>
  )
}
