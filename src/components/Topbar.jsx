import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIsMobile } from '../hooks/useMediaQuery'
import { useApp } from '../context/AppContext'

const titles = {
  dashboard: 'Dashboard', catálogo: 'Catálogo',
  precios: 'Listas de Precios', oc: 'Órdenes de Compra',
  despacho: 'Aviso Despacho', recibo: 'Aviso de Recibo',
  devolucion: 'Devoluciónes', financiero: 'Doc. Financieros',
  reportes: 'Reportes', trazabilidad: 'Trazabilidad',
  'nueva-oc': 'Nueva OC', 'mis-ocs': 'Mis Órdenes',
  recepciones: 'Recepciónes', 'mis-facturas': 'Mis Facturas', ayuda: 'Ayuda',
}

const placeholders = {
  dashboard: 'Buscar OC, cadena...', oc: 'Ej: OC-2025-0841 o Wong...',
  'mis-ocs': 'Ej: OC-2025-0841...', catálogo: 'Ej: Inca Kola o EAN...',
  precios: 'Ej: Retail-Wong...', despacho: 'Ej: ASN-2025-0421...',
  recibo: 'Ej: AR-2025-0291...', devolucion: 'Ej: DEV-042 o Wong...',
  financiero: 'Ej: FAC-1182...', reportes: 'Ej: Fill rate...',
  trazabilidad: 'Ej: OC-2025-0841...', 'mis-facturas': 'Ej: FAC-1182...',
  recepciones: 'Ej: AR-2025-0291...', ayuda: 'Buscar ayuda...',
  'nueva-oc': 'Buscar producto...',
}

const quickActions = [
  {
    label: 'Nueva Orden de Compra', desc: 'Emitir OC a Arca Continental',
    view: 'nueva-oc', kbd: 'O', iconColor: '#0E4D92', iconBg: '#EEF5FF',
    iconPath: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2'
  },
  {
    label: 'Nuevo SKU en Catálogo', desc: 'Agregar producto al catálogo',
    view: 'catálogo', kbd: 'S', iconColor: '#166534', iconBg: '#EAF3DE',
    iconPath: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'
  },
  {
    label: 'Nueva Lista de Precios', desc: 'Crear lista por cadena',
    view: 'precios', kbd: 'L', iconColor: '#92400E', iconBg: '#FFFBEB',
    iconPath: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01'
  },
]

function IconBox({ iconPath, iconColor, iconBg }) {
  return (
    <div style={{
      width: '32px', height: '32px', borderRadius: '8px',
      border: '1px solid rgba(14,77,146,0.1)', background: iconBg,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
    }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={iconPath} />
      </svg>
    </div>
  )
}

function Kbd({ letter }) {
  return (
    <span style={{
      fontSize: '10px', color: '#9DB8D9', background: '#F0F7FF',
      border: '1px solid rgba(14,77,146,0.1)', borderRadius: '4px',
      padding: '1px 6px', fontFamily: 'monospace', flexShrink: 0
    }}>{letter}</span>
  )
}

export default function Topbar({ role, view, setView, onMenuClick }) {
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const isMobile = useIsMobile()
  const { searchQuery, setSearchQuery } = useApp()
  const isProv = role === 'prov'
  const accentBg = isProv ? '#0B1F3A' : '#064E3B'
  const accentText = isProv ? '#00F5A0' : '#4ADE80'
  const noSearch = ['dashboard', 'nueva-oc', 'ayuda']
  const showSearch = !noSearch.includes(view)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'o' || e.key === 'O') { setView('nueva-oc'); setMenuOpen(false) }
      if (e.key === 's' || e.key === 'S') { setView('catálogo'); setMenuOpen(false) }
      if (e.key === 'l' || e.key === 'L') { setView('precios'); setMenuOpen(false) }
      if (e.key === 'd' || e.key === 'D') { setView('devolucion'); setMenuOpen(false) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div style={{
      height: '52px', background: '#fff',
      borderBottom: '1px solid rgba(14,77,146,0.08)',
      display: 'flex', alignItems: 'center',
      padding: '0 16px', gap: '10px', flexShrink: 0
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

      {showSearch && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: '#F0F7FF', border: '1px solid rgba(14,77,146,0.1)',
          borderRadius: '8px', padding: '5px 12px',
          width: isMobile ? '140px' : '200px',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B8BAE" strokeWidth="2" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={placeholders[view] || 'Buscar...'}
            style={{
              border: 'none', outline: 'none', background: 'transparent',
              fontSize: '12px', color: '#0B1F3A', width: '100%',
              fontFamily: "'DM Sans', sans-serif"
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6B8BAE', fontSize: '14px', padding: '0', lineHeight: 1 }}>×</button>
          )}
        </div>
      )}

      <div style={{ position:'relative', flexShrink:0 }}>
        <button onClick={() => setProfileOpen(!profileOpen)}
          style={{ display:'flex', alignItems:'center', gap:'8px', padding:'5px 10px 5px 5px', borderRadius:'8px', background: accentBg, border:`1px solid ${isProv?'rgba(0,245,160,0.18)':'rgba(74,222,128,0.18)'}`, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'all .15s' }}
          onMouseEnter={e=>e.currentTarget.style.opacity='.85'}
          onMouseLeave={e=>e.currentTarget.style.opacity='1'}
        >
          <div style={{ width:'26px', height:'26px', borderRadius:'6px', background: isProv?'#00F5A0':'#4ADE80', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'9px', fontWeight:800, color: isProv?'#0B1F3A':'#052E1C', flexShrink:0 }}>
            {isProv?'AC':'WG'}
          </div>
          {!isMobile && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1px' }}>
              <span style={{ fontSize:'12px', fontWeight:600, color:'#fff', lineHeight:1.2 }}>
                {isProv ? 'Arca Continental' : 'Wong S.A.'}
              </span>
              <span style={{ fontSize:'9px', color: isProv?'rgba(0,245,160,0.5)':'rgba(74,222,128,0.5)', lineHeight:1 }}>
                {isProv ? 'Proveedor' : 'Retail'}
              </span>
            </div>
          )}
          {isMobile && (
            <span style={{ fontSize:'11px', fontWeight:600, color:'#fff' }}>
              {(() => {
                const name = isProv ? 'Arca Continental' : 'Wong S.A.'
                return name.length > 12 ? name.split(' ').map(w=>w[0]).join('') : name
              })()}
            </span>
          )}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={isProv?'rgba(0,245,160,0.4)':'rgba(74,222,128,0.4)'} strokeWidth="2.5" strokeLinecap="round" style={{ transform: profileOpen?'rotate(180deg)':'none', transition:'transform .2s' }}><path d="M6 9l6 6 6-6"/></svg>
        </button>

        {profileOpen && (
          <>
            <div onClick={() => setProfileOpen(false)} style={{ position:'fixed', inset:0, zIndex:40 }}/>
            <div style={{ position:'absolute', top:'calc(100% + 8px)', right:0, width:'200px', background:'#fff', border:'1px solid rgba(14,77,146,0.1)', borderRadius:'10px', boxShadow:'0 8px 24px rgba(14,77,146,0.12)', zIndex:50, overflow:'hidden', animation:'fadeUp .15s ease' }}>
              <div style={{ padding:'12px 14px', borderBottom:'1px solid rgba(14,77,146,0.06)', background:'#F8FAFC' }}>
                <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A' }}>{isProv?'Arca Continental':'Wong S.A.'}</div>
                <div style={{ fontSize:'10px', color:'#94A3B8', marginTop:'1px' }}>{isProv?'Proveedor':'Retail'} · Plan Enterprise</div>
              </div>
              <div style={{ padding:'4px' }}>
                <button onClick={() => { setView('perfil'); setProfileOpen(false) }}
                  style={{ width:'100%', display:'flex', alignItems:'center', gap:'8px', padding:'8px 10px', borderRadius:'7px', border:'none', background:'transparent', color:'#4B5563', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'12px', textAlign:'left', transition:'background .12s' }}
                  onMouseEnter={e=>e.currentTarget.style.background='#F1F5F9'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
                  Mi Perfil
                </button>
                <button onClick={() => { setView('ayuda'); setProfileOpen(false) }}
                  style={{ width:'100%', display:'flex', alignItems:'center', gap:'8px', padding:'8px 10px', borderRadius:'7px', border:'none', background:'transparent', color:'#4B5563', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'12px', textAlign:'left', transition:'background .12s' }}
                  onMouseEnter={e=>e.currentTarget.style.background='#F1F5F9'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
                  Ayuda
                </button>
                <div style={{ height:'1px', background:'rgba(14,77,146,0.06)', margin:'4px 0' }}/>
                <button onClick={() => navigate('/login', { replace:true, state:{} })}
                  style={{ width:'100%', display:'flex', alignItems:'center', gap:'8px', padding:'8px 10px', borderRadius:'7px', border:'none', background:'transparent', color:'#DC2626', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:500, textAlign:'left', transition:'background .12s' }}
                  onMouseEnter={e=>e.currentTarget.style.background='#FEF2F2'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                  Cerrar sesión
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div style={{ position: 'relative', flexShrink: 0 }}>
        <button
          onClick={() => {
            if (!isProv) { setView('nueva-oc'); return }
            setMenuOpen(!menuOpen)
          }}
          style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            padding: '7px 12px', border: 'none', borderRadius: '8px',
            background: accentBg, color: accentText,
            fontSize: '12px', fontWeight: 700, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif"
          }}>
          {isProv
            ? <>{!isMobile && 'Acciones'} ▾</>
            : <>+ {!isMobile && 'Nueva OC'}</>
          }
        </button>

        {menuOpen && isProv && (
          <>
            <div style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={() => setMenuOpen(false)} />
            <div style={{
              position: 'absolute', top: '44px', right: 0, zIndex: 100,
              background: '#fff', borderRadius: '12px', overflow: 'hidden',
              border: '1px solid rgba(14,77,146,0.1)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              minWidth: '260px', padding: '6px'
            }}>
              <div style={{ fontSize: '10px', color: '#9DB8D9', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', padding: '4px 8px 8px' }}>
                Accesos rápidos
              </div>

              {quickActions.map(item => (
                <div key={item.view} onClick={() => { setView(item.view); setMenuOpen(false) }} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '8px 10px', cursor: 'pointer', borderRadius: '8px', transition: 'background .15s'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F0F7FF'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <IconBox iconPath={item.iconPath} iconColor={item.iconColor} iconBg={item.iconBg} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{item.label}</div>
                    <div style={{ fontSize: '10px', color: '#6B8BAE' }}>{item.desc}</div>
                  </div>
                  <Kbd letter={item.kbd} />
                </div>
              ))}

              <div style={{ height: '1px', background: 'rgba(14,77,146,0.08)', margin: '4px 0' }} />

              <div onClick={() => { setView('devolucion'); setMenuOpen(false) }} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '8px 10px', cursor: 'pointer', borderRadius: '8px', transition: 'background .15s'
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#F0F7FF'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>Nueva Devolución</div>
                  <div style={{ fontSize: '10px', color: '#6B8BAE' }}>Registrar devolucion</div>
                </div>
                <Kbd letter="D" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
