import { useState } from 'react'

const Icon = ({ path, size=16, color='currentColor', strokeWidth=1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={path}/>
  </svg>
)

const ICONS = {
  general:  'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  security: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  notif:    'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  maint:    'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
}

function Toggle({ value, onChange, accent }) {
  return (
    <button onClick={() => onChange(!value)}
      style={{ width:'40px', height:'22px', borderRadius:'11px', border:'none', background:value?accent:'#E5E7EB', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}>
      <div style={{ width:'16px', height:'16px', borderRadius:'50%', background:'#fff', position:'absolute', top:'3px', transition:'left .2s', left:value?'21px':'3px', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }}/>
    </button>
  )
}

export default function ConfiguracionView({ accent, accentBg, text, text2, text3, border, white, bg }) {
  const [tab, setTab] = useState('general')
  const [saved, setSaved] = useState(false)

  const [general, setGeneral] = useState({
    nombre: 'NEXO',
    tagline: 'Plataforma O2P para el mercado peruano',
    url: 'nexo.instamovil.com',
    timezone: 'America/Lima (UTC-5)',
    idioma: 'Español (Perú)',
    moneda: 'PEN — Sol peruano',
    igv: '18',
  })

  const [security, setSecurity] = useState({
    minPassword: '8',
    expiracionPass: '90',
    sessionTimeout: '30',
    twoFactor: true,
    twoFactorAdminOnly: true,
    ipWhitelist: false,
    ips: '190.235.0.0/16',
  })

  const [notif, setNotif] = useState({
    emailSoporte: 'soporte@instamovil.com',
    emailBilling: 'karla@instamovil.com',
    emailNoreply: 'noreply@nexo.pe',
    notifNuevaOC: true,
    notifNuevoTenant: true,
    notifErrorSistema: true,
    notifPagoVencido: true,
    notifWhatsapp: true,
  })

  const [maint, setMaint] = useState({
    modoMantenimiento: false,
    mensajeMantenimiento: 'NEXO está en mantenimiento programado. Estaremos de vuelta en breve.',
    bannerActivo: false,
    mensajeBanner: '🚀 Nueva versión disponible — mejoras en el módulo de OCs',
    bannerColor: '#0E4D92',
    version: 'v1.4.2',
    buildDate: '26 May 2026',
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const card = { background:white, border:`1px solid ${border}`, borderRadius:'10px' }
  const inp  = { width:'100%', padding:'8px 12px', border:`1px solid ${border}`, borderRadius:'8px', fontSize:'13px', fontFamily:"'Inter',sans-serif", color:text, outline:'none', boxSizing:'border-box', background:white }

  const TABS = [
    { id:'general',  label:'General',         icon:ICONS.general  },
    { id:'security', label:'Seguridad',        icon:ICONS.security },
    { id:'notif',    label:'Notificaciones',   icon:ICONS.notif    },
    { id:'maint',    label:'Mantenimiento',    icon:ICONS.maint    },
  ]

  const Field = ({ label, hint, children }) => (
    <div style={{ marginBottom:'18px' }}>
      <label style={{ fontSize:'11px', fontWeight:600, color:text2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>{label}</label>
      {children}
      {hint && <div style={{ fontSize:'10px', color:text3, marginTop:'4px' }}>{hint}</div>}
    </div>
  )

  const Row = ({ label, hint, children }) => (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderBottom:`1px solid ${border}` }}>
      <div>
        <div style={{ fontSize:'13px', color:text, fontWeight:500 }}>{label}</div>
        {hint && <div style={{ fontSize:'10px', color:text3, marginTop:'1px' }}>{hint}</div>}
      </div>
      {children}
    </div>
  )

  return (
    <div style={{ fontFamily:"'Inter',sans-serif" }}>

      {/* Tabs verticales + contenido */}
      <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:'16px' }}>

        {/* Sidebar tabs */}
        <div style={{ ...card, padding:'8px', height:'fit-content' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ width:'100%', display:'flex', alignItems:'center', gap:'10px', padding:'10px 12px', borderRadius:'8px', border:'none', background:tab===t.id?accentBg:'transparent', color:tab===t.id?accent:text2, fontSize:'13px', fontWeight:tab===t.id?600:400, cursor:'pointer', fontFamily:"'Inter',sans-serif", marginBottom:'2px', transition:'all .15s', textAlign:'left' }}>
              <Icon path={t.icon} size={15} color={tab===t.id?accent:text3}/>
              {t.label}
            </button>
          ))}
        </div>

        {/* Contenido */}
        <div>

          {/* GENERAL */}
          {tab === 'general' && (
            <div style={{ ...card, padding:'24px' }}>
              <div style={{ fontSize:'14px', fontWeight:600, color:text, marginBottom:'20px', paddingBottom:'12px', borderBottom:`1px solid ${border}` }}>
                Configuración general
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 24px' }}>
                <Field label="Nombre de la plataforma">
                  <input value={general.nombre} onChange={e=>setGeneral(g=>({...g,nombre:e.target.value}))} style={inp}/>
                </Field>
                <Field label="Tagline">
                  <input value={general.tagline} onChange={e=>setGeneral(g=>({...g,tagline:e.target.value}))} style={inp}/>
                </Field>
                <Field label="URL del portal" hint="Sin https://">
                  <input value={general.url} onChange={e=>setGeneral(g=>({...g,url:e.target.value}))} style={inp}/>
                </Field>
                <Field label="Zona horaria">
                  <select value={general.timezone} onChange={e=>setGeneral(g=>({...g,timezone:e.target.value}))} style={{...inp,cursor:'pointer'}}>
                    <option>America/Lima (UTC-5)</option>
                    <option>America/Bogota (UTC-5)</option>
                    <option>America/Santiago (UTC-4)</option>
                  </select>
                </Field>
                <Field label="Idioma">
                  <select value={general.idioma} onChange={e=>setGeneral(g=>({...g,idioma:e.target.value}))} style={{...inp,cursor:'pointer'}}>
                    <option>Español (Perú)</option>
                    <option>English (US)</option>
                  </select>
                </Field>
                <Field label="Moneda base">
                  <select value={general.moneda} onChange={e=>setGeneral(g=>({...g,moneda:e.target.value}))} style={{...inp,cursor:'pointer'}}>
                    <option>PEN — Sol peruano</option>
                    <option>USD — Dólar americano</option>
                  </select>
                </Field>
                <Field label="IGV (%)" hint="Tasa de impuesto para cálculos automáticos">
                  <input type="number" value={general.igv} onChange={e=>setGeneral(g=>({...g,igv:e.target.value}))} style={inp}/>
                </Field>
              </div>
            </div>
          )}

          {/* SEGURIDAD */}
          {tab === 'security' && (
            <div style={{ ...card, padding:'24px' }}>
              <div style={{ fontSize:'14px', fontWeight:600, color:text, marginBottom:'20px', paddingBottom:'12px', borderBottom:`1px solid ${border}` }}>
                Seguridad
              </div>
              <div style={{ marginBottom:'20px' }}>
                <div style={{ fontSize:'11px', fontWeight:600, color:text3, textTransform:'uppercase', letterSpacing:'.5px', marginBottom:'8px' }}>Contraseñas</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 24px' }}>
                  <Field label="Longitud mínima" hint="Caracteres">
                    <input type="number" value={security.minPassword} onChange={e=>setSecurity(s=>({...s,minPassword:e.target.value}))} style={inp}/>
                  </Field>
                  <Field label="Expiración (días)" hint="0 = nunca expira">
                    <input type="number" value={security.expiracionPass} onChange={e=>setSecurity(s=>({...s,expiracionPass:e.target.value}))} style={inp}/>
                  </Field>
                </div>
              </div>
              <div style={{ marginBottom:'20px' }}>
                <div style={{ fontSize:'11px', fontWeight:600, color:text3, textTransform:'uppercase', letterSpacing:'.5px', marginBottom:'8px' }}>Sesión</div>
                <Field label="Timeout de sesión (minutos)" hint="Cierre automático por inactividad">
                  <input type="number" value={security.sessionTimeout} onChange={e=>setSecurity(s=>({...s,sessionTimeout:e.target.value}))} style={{...inp, maxWidth:'200px'}}/>
                </Field>
              </div>
              <div>
                <div style={{ fontSize:'11px', fontWeight:600, color:text3, textTransform:'uppercase', letterSpacing:'.5px', marginBottom:'8px' }}>Autenticación</div>
                <Row label="2FA obligatorio" hint="Requiere verificación en dos pasos para todos los usuarios">
                  <Toggle value={security.twoFactor} onChange={v=>setSecurity(s=>({...s,twoFactor:v}))} accent={accent}/>
                </Row>
                <Row label="2FA solo para admins" hint="Solo aplica al panel de administración">
                  <Toggle value={security.twoFactorAdminOnly} onChange={v=>setSecurity(s=>({...s,twoFactorAdminOnly:v}))} accent={accent}/>
                </Row>
                <Row label="Whitelist de IPs" hint="Restringir acceso al admin por IP">
                  <Toggle value={security.ipWhitelist} onChange={v=>setSecurity(s=>({...s,ipWhitelist:v}))} accent={accent}/>
                </Row>
                {security.ipWhitelist && (
                  <Field label="IPs permitidas" hint="Una por línea o rango CIDR">
                    <textarea value={security.ips} onChange={e=>setSecurity(s=>({...s,ips:e.target.value}))}
                      style={{ ...inp, height:'80px', resize:'none' }}/>
                  </Field>
                )}
              </div>
            </div>
          )}

          {/* NOTIFICACIONES */}
          {tab === 'notif' && (
            <div style={{ ...card, padding:'24px' }}>
              <div style={{ fontSize:'14px', fontWeight:600, color:text, marginBottom:'20px', paddingBottom:'12px', borderBottom:`1px solid ${border}` }}>
                Notificaciones
              </div>
              <div style={{ marginBottom:'20px' }}>
                <div style={{ fontSize:'11px', fontWeight:600, color:text3, textTransform:'uppercase', letterSpacing:'.5px', marginBottom:'8px' }}>Emails del sistema</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 24px' }}>
                  <Field label="Email de soporte">
                    <input value={notif.emailSoporte} onChange={e=>setNotif(n=>({...n,emailSoporte:e.target.value}))} style={inp}/>
                  </Field>
                  <Field label="Email de facturación">
                    <input value={notif.emailBilling} onChange={e=>setNotif(n=>({...n,emailBilling:e.target.value}))} style={inp}/>
                  </Field>
                  <Field label="Email noreply" hint="Para envío de emails automáticos">
                    <input value={notif.emailNoreply} onChange={e=>setNotif(n=>({...n,emailNoreply:e.target.value}))} style={inp}/>
                  </Field>
                </div>
              </div>
              <div>
                <div style={{ fontSize:'11px', fontWeight:600, color:text3, textTransform:'uppercase', letterSpacing:'.5px', marginBottom:'8px' }}>Eventos a notificar</div>
                <Row label="Nueva OC recibida" hint="Notifica al proveedor cuando llega una OC">
                  <Toggle value={notif.notifNuevaOC} onChange={v=>setNotif(n=>({...n,notifNuevaOC:v}))} accent={accent}/>
                </Row>
                <Row label="Nuevo tenant registrado" hint="Alerta al equipo cuando se une una empresa">
                  <Toggle value={notif.notifNuevoTenant} onChange={v=>setNotif(n=>({...n,notifNuevoTenant:v}))} accent={accent}/>
                </Row>
                <Row label="Error de sistema" hint="Alerta inmediata por email y WhatsApp">
                  <Toggle value={notif.notifErrorSistema} onChange={v=>setNotif(n=>({...n,notifErrorSistema:v}))} accent={accent}/>
                </Row>
                <Row label="Pago vencido" hint="Recordatorio a tenants con facturas vencidas">
                  <Toggle value={notif.notifPagoVencido} onChange={v=>setNotif(n=>({...n,notifPagoVencido:v}))} accent={accent}/>
                </Row>
                <Row label="Notificaciones por WhatsApp" hint="Además del email, envía por WhatsApp Business">
                  <Toggle value={notif.notifWhatsapp} onChange={v=>setNotif(n=>({...n,notifWhatsapp:v}))} accent={accent}/>
                </Row>
              </div>
            </div>
          )}

          {/* MANTENIMIENTO */}
          {tab === 'maint' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>

              {/* Modo mantenimiento */}
              <div style={{ ...card, padding:'24px' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px', paddingBottom:'12px', borderBottom:`1px solid ${border}` }}>
                  <div>
                    <div style={{ fontSize:'14px', fontWeight:600, color:text }}>Modo mantenimiento</div>
                    <div style={{ fontSize:'11px', color:text3, marginTop:'2px' }}>Los tenants verán una pantalla de mantenimiento al intentar acceder</div>
                  </div>
                  <Toggle value={maint.modoMantenimiento} onChange={v=>setMaint(m=>({...m,modoMantenimiento:v}))} accent='#EF4444'/>
                </div>
                {maint.modoMantenimiento && (
                  <div style={{ padding:'10px 14px', background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:'8px', fontSize:'11px', color:'#DC2626', marginBottom:'14px' }}>
                    ⚠ Modo mantenimiento activo — los tenants no pueden acceder a la plataforma ahora mismo
                  </div>
                )}
                <Field label="Mensaje de mantenimiento">
                  <textarea value={maint.mensajeMantenimiento} onChange={e=>setMaint(m=>({...m,mensajeMantenimiento:e.target.value}))}
                    style={{ ...inp, height:'80px', resize:'none' }}/>
                </Field>
              </div>

              {/* Banner de anuncio */}
              <div style={{ ...card, padding:'24px' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px', paddingBottom:'12px', borderBottom:`1px solid ${border}` }}>
                  <div>
                    <div style={{ fontSize:'14px', fontWeight:600, color:text }}>Banner de anuncio</div>
                    <div style={{ fontSize:'11px', color:text3, marginTop:'2px' }}>Muestra un banner informativo en el dashboard de todos los tenants</div>
                  </div>
                  <Toggle value={maint.bannerActivo} onChange={v=>setMaint(m=>({...m,bannerActivo:v}))} accent={accent}/>
                </div>
                {maint.bannerActivo && (
                  <div style={{ padding:'10px 14px', background:maint.bannerColor, borderRadius:'8px', fontSize:'12px', color:'#fff', marginBottom:'14px', fontWeight:500 }}>
                    {maint.mensajeBanner || 'Vista previa del banner...'}
                  </div>
                )}
                <Field label="Mensaje del banner">
                  <input value={maint.mensajeBanner} onChange={e=>setMaint(m=>({...m,mensajeBanner:e.target.value}))} style={inp}/>
                </Field>
                <Field label="Color del banner">
                  <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
                    <input type="color" value={maint.bannerColor} onChange={e=>setMaint(m=>({...m,bannerColor:e.target.value}))}
                      style={{ width:'40px', height:'36px', border:`1px solid ${border}`, borderRadius:'8px', cursor:'pointer', padding:'2px' }}/>
                    <input value={maint.bannerColor} onChange={e=>setMaint(m=>({...m,bannerColor:e.target.value}))}
                      style={{ ...inp, flex:1, fontFamily:'monospace' }}/>
                    {['#0E4D92','#166534','#C2410C','#7C3AED','#0B1F3A'].map(color => (
                      <div key={color} onClick={() => setMaint(m=>({...m,bannerColor:color}))}
                        style={{ width:'24px', height:'24px', borderRadius:'6px', background:color, cursor:'pointer', border:maint.bannerColor===color?`2px solid ${accent}`:'2px solid transparent', flexShrink:0 }}/>
                    ))}
                  </div>
                </Field>
              </div>

              {/* Info del sistema */}
              <div style={{ ...card, padding:'24px' }}>
                <div style={{ fontSize:'14px', fontWeight:600, color:text, marginBottom:'16px', paddingBottom:'12px', borderBottom:`1px solid ${border}` }}>
                  Información del sistema
                </div>
                {[
                  ['Versión', maint.version],
                  ['Build date', maint.buildDate],
                  ['Entorno', 'Producción'],
                  ['Node.js', 'v20.11.0'],
                  ['React', 'v18.3.1'],
                  ['Base de datos', 'PostgreSQL 15 (Supabase)'],
                ].map(([label, val]) => (
                  <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${border}` }}>
                    <span style={{ fontSize:'12px', color:text3 }}>{label}</span>
                    <span style={{ fontSize:'12px', fontWeight:500, color:text, fontFamily:'monospace' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botón guardar */}
          {tab !== 'maint' && (
            <div style={{ marginTop:'14px', display:'flex', justifyContent:'flex-end' }}>
              <button onClick={handleSave}
                style={{ padding:'10px 28px', border:'none', borderRadius:'8px', background:saved?'#10B981':accent, color:'#fff', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'background .3s', display:'flex', alignItems:'center', gap:'6px' }}>
                {saved ? <><span>✓</span> Guardado</> : 'Guardar cambios'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
