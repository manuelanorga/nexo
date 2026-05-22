import { useIsMobile } from '../hooks/useMediaQuery'

const titles = {
  dashboard: 'Dashboard', catalogo: 'Catalogo',
  precios: 'Listas de Precios', oc: 'Ordenes de Compra',
  despacho: 'Aviso Despacho', recibo: 'Aviso de Recibo',
  devolucion: 'Devoluciones', financiero: 'Doc. Financieros',
  reportes: 'Reportes', trazabilidad: 'Trazabilidad',
  'nueva-oc': 'Nueva OC', 'mis-ocs': 'Mis Ordenes',
  recepciones: 'Recepciones', 'mis-facturas': 'Mis Facturas', ayuda: 'Ayuda',
}

export default function Topbar({ role, view, setView, onMenuClick }) {
  const isMobile = useIsMobile()
  const isProv = role === 'prov'
  const accentBg = isProv ? '#0B1F3A' : '#064E3B'
  const accentText = isProv ? '#00C2A8' : '#4ADE80'

  return (
    <div style={{
      height: '52px', background: '#fff', borderBottom: '1px solid rgba(14,77,146,0.08)',
      display: 'flex', alignItems: 'center', padding: '0 16px', gap: '10px', flexShrink: 0
    }}>
      {isMobile && (
        <button onClick={onMenuClick} style={{
          width: '36px', height: '36px', borderRadius: '8px',
          border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF',
          cursor: 'pointer', fontSize: '18px', color: '#0B1F3A',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>☰</button>
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: isMobile ? '13px' : '15px', fontWeight: 800, color: '#0B1F3A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {titles[view] || 'Dashboard'}
        </div>
        {!isMobile && <div style={{ fontSize: '10px', color: '#6B8BAE' }}>Inicio › {titles[view] || 'Dashboard'}</div>}
      </div>

      {!isMobile && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: '#F0F7FF', border: '1px solid rgba(14,77,146,0.1)',
          borderRadius: '8px', padding: '5px 12px', width: '180px'
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B8BAE" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{ fontSize: '12px', color: '#6B8BAE', fontFamily: "'DM Sans', sans-serif" }}>Buscar...</span>
        </div>
      )}

      <span style={{
        padding: '4px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 700,
        letterSpacing: '0.5px', background: accentBg, color: accentText, flexShrink: 0
      }}>
        {isProv ? 'Prov.' : 'Retail'}
      </span>

      <button onClick={() => role === 'ret' && setView('nueva-oc')} style={{
        display: 'flex', alignItems: 'center', gap: '4px',
        padding: '7px 12px', border: 'none', borderRadius: '8px',
        background: accentBg, color: accentText,
        fontSize: '12px', fontWeight: 700, cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif", flexShrink: 0
      }}>
        + {!isMobile && 'Nuevo'}
      </button>
    </div>
  )
}
