import { useNavigate } from 'react-router-dom'

const navConfig = {
  prov: [
    { sec: 'Principal', items: [{ id: 'dashboard', label: 'Dashboard' }] },
    { sec: 'Catalogo', items: [
      { id: 'catalogo', label: 'Adm. Catalogo' },
      { id: 'precios', label: 'Listas de Precios' },
    ]},
    { sec: 'Documentos', items: [
      { id: 'oc', label: 'Ordenes de Compra', badge: '4' },
      { id: 'despacho', label: 'Aviso Despacho' },
      { id: 'recibo', label: 'Aviso de Recibo' },
      { id: 'devolucion', label: 'Devoluciones', badge: '2' },
    ]},
    { sec: 'Finanzas', items: [
      { id: 'financiero', label: 'Doc. Financieros' },
    ]},
    { sec: 'Inteligencia', items: [
      { id: 'reportes', label: 'Reportes' },
      { id: 'trazabilidad', label: 'Trazabilidad' },
    ]},
  ],
  ret: [
    { sec: 'Principal', items: [{ id: 'dashboard', label: 'Dashboard' }] },
    { sec: 'Mis Pedidos', items: [
      { id: 'nueva-oc', label: 'Nueva Orden', badge: 'NEW', badgeGreen: true },
      { id: 'mis-ocs', label: 'Mis Ordenes', badge: '3' },
      { id: 'recepciones', label: 'Recepciones' },
    ]},
    { sec: 'Finanzas', items: [
      { id: 'mis-facturas', label: 'Mis Facturas' },
    ]},
    { sec: 'Soporte', items: [
      { id: 'ayuda', label: 'Centro de Ayuda' },
    ]},
  ],
}

const users = {
  prov: { initials: 'AC', name: 'Arca Continental', role: 'Proveedor' },
  ret:  { initials: 'WG', name: 'Wong Supermercados', role: 'Retail' },
}

export default function Sidebar({ role, setRole, view, setView }) {
  const navigate = useNavigate()
  const nav = navConfig[role]
  const user = users[role]

  return (
    <aside style={{
      width: '210px', background: '#fff', flexShrink: 0,
      borderRight: '1px solid rgba(14,77,146,0.1)',
      display: 'flex', flexDirection: 'column', height: '100vh',
      position: 'sticky', top: 0
    }}>

      {/* Logo */}
      <div style={{ padding: '18px 16px', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', fontWeight: 900, color: '#0B1F3A' }}>
          NEX<span style={{ color: '#00C2A8' }}>O</span>
        </div>
        <div style={{ fontSize: '9px', color: '#6B8BAE', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '1px' }}>
          O2P Platform
        </div>
      </div>

      {/* Role switch */}
      <div style={{ margin: '10px', display: 'flex', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
        {['prov', 'ret'].map(r => (
          <button key={r} onClick={() => { setRole(r); setView('dashboard') }} style={{
            flex: 1, padding: '7px 0', fontSize: '11px', fontWeight: 700,
            border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            transition: 'all .15s',
            background: role === r ? (r === 'prov' ? '#0B1F3A' : '#064E3B') : 'transparent',
            color: role === r ? (r === 'prov' ? '#00C2A8' : '#4ADE80') : '#6B8BAE',
          }}>
            {r === 'prov' ? 'Proveedor' : 'Retail'}
          </button>
        ))}
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
        {nav.map(group => (
          <div key={group.sec}>
            <div style={{
              padding: '8px 14px 3px', fontSize: '9px', letterSpacing: '1px',
              textTransform: 'uppercase', color: '#9DB8D9', fontWeight: 600
            }}>{group.sec}</div>
            {group.items.map(item => {
              const isActive = view === item.id
              return (
                <div key={item.id} onClick={() => setView(item.id)} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '7px 14px', cursor: 'pointer', fontSize: '12px',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'all .15s',
                  borderLeft: isActive ? `2px solid ${role === 'prov' ? '#0E4D92' : '#22C55E'}` : '2px solid transparent',
                  background: isActive ? (role === 'prov' ? '#EEF5FF' : '#EAF3DE') : 'transparent',
                  color: isActive ? (role === 'prov' ? '#0E4D92' : '#166534') : '#6B8BAE',
                  fontWeight: isActive ? 600 : 400,
                }}>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      fontSize: '9px', padding: '1px 6px', borderRadius: '100px', fontWeight: 700,
                      background: item.badgeGreen ? '#EAF3DE' : '#FEE2E2',
                      color: item.badgeGreen ? '#166534' : '#B91C1C',
                    }}>{item.badge}</span>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* User */}
      <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(14,77,146,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '10px', fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
            background: role === 'prov' ? '#EEF5FF' : '#EAF3DE',
            color: role === 'prov' ? '#0E4D92' : '#166534',
          }}>{user.initials}</div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#0B1F3A' }}>{user.name}</div>
            <div style={{ fontSize: '10px', color: '#6B8BAE' }}>{user.role}</div>
          </div>
        </div>
        <button onClick={() => navigate('/')} style={{
          width: '100%', padding: '6px', background: 'transparent',
          border: '1px solid rgba(14,77,146,0.1)', borderRadius: '6px',
          fontSize: '11px', color: '#6B8BAE', cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif"
        }}>← Volver a la landing</button>
      </div>

    </aside>
  )
}
