import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminDashboard from './views/AdminDashboard'
import TenantsView from './views/TenantsView'
import SistemaView from './views/SistemaView'
import TransaccionesView from './views/TransaccionesView'
import BillingView from './views/BillingView'
import EquipoView from './views/EquipoView'

const NAV = [
  { sec: 'Operaciones', items: [
    { id: 'dashboard',     label: 'Dashboard',       icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'tenants',       label: 'Tenants',         icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', badge: 9 },
    { id: 'sistema',       label: 'Sistema',         icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18', badge: 2, badgeErr: true },
    { id: 'transacciones', label: 'Transacciones',   icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
  ]},
  { sec: 'Negocio', items: [
    { id: 'billing',       label: 'Planes & Billing', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { id: 'equipo',        label: 'Mi equipo',        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'integraciones', label: 'Integraciones',    icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
  ]},
  { sec: 'Configuración', items: [
    { id: 'configuracion', label: 'Configuración',    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    { id: 'roles',         label: 'Roles & Permisos', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  ]},
]

const COMING = {
  tenants: 'Gestión de Tenants', sistema: 'Monitor del Sistema',
  transacciones: 'Transacciones', billing: 'Planes & Billing',
  equipo: 'Mi Equipo', integraciones: 'Integraciones',
  configuracion: 'Configuración', roles: 'Roles & Permisos',
}

function Icon({ path, size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {path.split('M').filter(Boolean).map((d, i) => <path key={i} d={`M${d}`} />)}
    </svg>
  )
}

export default function AdminPanel() {
  const [view, setView] = useState('dashboard')
  const navigate = useNavigate()

  const bg      = '#FAFAF9'
  const sidebar = '#F7F6F3'
  const white   = '#FFFFFF'
  const border  = 'rgba(0,0,0,0.07)'
  const text    = '#1A1A1A'
  const text2   = '#6B7280'
  const text3   = '#9CA3AF'
  const accent  = '#00C2A8'
  const accentBg = 'rgba(0,194,168,0.08)'

  return (
    <div style={{ display: 'flex', height: '100vh', background: bg, fontFamily: "'Inter', sans-serif", color: text, overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 2px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeUp .2s ease-out; }
        .nav-item { transition: background .12s; }
        .nav-item:hover { background: rgba(0,0,0,0.04) !important; }
        .kpi-card { transition: box-shadow .2s, transform .2s; }
        .kpi-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06) !important; transform: translateY(-1px); }
        .t-row { transition: background .1s; cursor: pointer; }
        .t-row:hover { background: rgba(0,0,0,0.02) !important; }
      `}</style>

      {/* SIDEBAR */}
      <div style={{ width: '224px', flexShrink: 0, background: sidebar, borderRight: `1px solid ${border}`, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

        {/* Logo */}
        <div style={{ padding: '20px 16px 14px', borderBottom: `1px solid ${border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#0B1F3A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: accent, flexShrink: 0 }}>N</div>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: '15px', fontWeight: 900, color: text, letterSpacing: '-.3px' }}>NEXO</div>
              <div style={{ fontSize: '9px', color: accent, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Admin</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 8px', background: 'rgba(0,194,168,0.06)', borderRadius: '8px', border: '1px solid rgba(0,194,168,0.12)' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: accent, flexShrink: 0 }} />
            <span style={{ fontSize: '11px', color: accent, fontWeight: 500 }}>Todos los sistemas OK</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '8px 8px' }}>
          {NAV.map(({ sec, items }) => (
            <div key={sec} style={{ marginBottom: '4px' }}>
              <div style={{ fontSize: '10px', color: text3, letterSpacing: '1px', textTransform: 'uppercase', padding: '10px 8px 4px', fontWeight: 500 }}>{sec}</div>
              {items.map(({ id, label, icon, badge, badgeErr }) => {
                const active = view === id
                return (
                  <div key={id} className="nav-item"
                    onClick={() => setView(id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '7px 8px', borderRadius: '8px', cursor: 'pointer', background: active ? accentBg : 'transparent', marginBottom: '1px' }}>
                    <span style={{ color: active ? accent : text3, flexShrink: 0 }}>
                      <Icon path={icon} size={15} color={active ? accent : text3} />
                    </span>
                    <span style={{ fontSize: '13px', color: active ? accent : text2, fontWeight: active ? 500 : 400, flex: 1 }}>{label}</span>
                    {badge && (
                      <span style={{ fontSize: '10px', fontWeight: 600, padding: '1px 5px', borderRadius: '8px', background: badgeErr ? '#FEE2E2' : 'rgba(0,0,0,0.06)', color: badgeErr ? '#DC2626' : text3 }}>{badge}</span>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: accentBg, border: `1px solid rgba(0,194,168,0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 600, color: accent, flexShrink: 0 }}>MA</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '12px', fontWeight: 500, color: text }}>Manuel Añorga</div>
              <div style={{ fontSize: '10px', color: text3 }}>Super Admin</div>
            </div>
            <div onClick={() => navigate('/')} title="Ir a la plataforma"
              style={{ color: text3, cursor: 'pointer', padding: '3px', borderRadius: '4px', transition: 'color .15s', display: 'flex' }}
              onMouseEnter={e => e.currentTarget.style.color = text}
              onMouseLeave={e => e.currentTarget.style.color = text3}
            >
              <Icon path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" size={14} color="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Topbar */}
        <div style={{ padding: '0 24px', height: '54px', borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, background: white }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: text }}>
              {view === 'dashboard' ? 'Dashboard de operaciones' : (COMING[view] || view)}
            </div>
            <div style={{ fontSize: '11px', color: text3 }}>
              {new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '11px', color: accent, display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '20px', background: accentBg, border: `1px solid rgba(0,194,168,0.15)` }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: accent }} />
              Operativo · 99.97% uptime
            </div>
            <button onClick={() => navigate('/dashboard')}
              style={{ fontSize: '12px', padding: '5px 12px', borderRadius: '8px', border: `1px solid ${border}`, background: white, color: text2, cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all .15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = sidebar; e.currentTarget.style.color = text }}
              onMouseLeave={e => { e.currentTarget.style.background = white; e.currentTarget.style.color = text2 }}
            >Ver plataforma →</button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', background: bg }}>
          {view === 'dashboard'
            ? <AdminDashboard {...{ accent, accentBg, text, text2, text3, border, white, bg }} />
            : view === 'tenants'
            ? <TenantsView {...{ accent, accentBg, text, text2, text3, border, white, bg }} />
            : view === 'sistema'
            ? <SistemaView {...{ accent, accentBg, text, text2, text3, border, white, bg }} />
            : view === 'transacciones'
            ? <TransaccionesView {...{ accent, accentBg, text, text2, text3, border, white, bg }} />
            : view === 'billing'
            ? <BillingView {...{ accent, accentBg, text, text2, text3, border, white, bg }} />
            : view === 'equipo'
            ? <EquipoView {...{ accent, accentBg, text, text2, text3, border, white, bg }} />
            : <ComingSoon label={COMING[view]} {...{ accent, accentBg, text2, text3, border }} />
          }
        </div>
      </div>
    </div>
  )
}

function ComingSoon({ label, accent, accentBg, text2, text3, border }) {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '10px' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
      </div>
      <div style={{ fontSize: '15px', fontWeight: 500, color: text2 }}>{label}</div>
      <div style={{ fontSize: '12px', color: text3 }}>Módulo en construcción · próxima versión</div>
      <div style={{ marginTop: '4px', fontSize: '11px', padding: '4px 12px', borderRadius: '20px', border: `1px solid ${border}`, color: text3 }}>En el roadmap post-pitch</div>
    </div>
  )
}
