import { useState } from 'react'

const INTEGRACIONES = [
  {
    id: 'sunat',
    nombre: 'SUNAT / SBS',
    categoria: 'Regulatorio',
    desc: 'Tipo de cambio oficial y validación de RUC en tiempo real',
    status: 'activa',
    lastSync: 'hace 3 min',
    provider: 'apis.net.pe',
    docs: 'https://apis.net.pe',
    config: [
      { label:'Endpoint', value:'https://api.apis.net.pe/v2', readonly:true },
      { label:'API Key', value:'Gratuita — sin autenticación', readonly:true },
    ],
    badge: '🏛',
  },
  {
    id: 'sap',
    nombre: 'SAP ERP',
    categoria: 'ERP',
    desc: 'Sincronización bidireccional con SAP de Arca Continental',
    status: 'pendiente',
    lastSync: 'No configurado',
    provider: 'SAP SE',
    docs: 'https://api.sap.com',
    config: [
      { label:'Host SAP', value:'', placeholder:'https://sap.arcacontinental.pe/api', readonly:false },
      { label:'Client ID', value:'', placeholder:'SAP-CLIENT-ID', readonly:false },
      { label:'Client Secret', value:'', placeholder:'••••••••••••', readonly:false, secret:true },
    ],
    badge: '⚙',
  },
  {
    id: 'nubefact',
    nombre: 'Nubefact / OSE',
    categoria: 'Facturación',
    desc: 'Emisión y validación de facturas electrónicas ante SUNAT',
    status: 'pendiente',
    lastSync: 'No configurado',
    provider: 'Nubefact S.A.C.',
    docs: 'https://nubefact.com',
    config: [
      { label:'Token API', value:'', placeholder:'nubefact_tk_...', readonly:false, secret:true },
      { label:'RUC emisor', value:'', placeholder:'20100128954', readonly:false },
      { label:'Ambiente', value:'produccion', readonly:false },
    ],
    badge: '📄',
  },
  {
    id: 'whatsapp',
    nombre: 'WhatsApp Business',
    categoria: 'Comunicaciones',
    desc: 'Notificaciones automáticas de OCs, alertas y soporte',
    status: 'activa',
    lastSync: 'hace 1h',
    provider: 'Meta / Twilio',
    docs: 'https://developers.facebook.com/docs/whatsapp',
    config: [
      { label:'Phone Number ID', value:'51931067775', readonly:false },
      { label:'Access Token', value:'••••••••••••••••', readonly:false, secret:true },
      { label:'Webhook URL', value:'https://api.nexo.pe/webhooks/whatsapp', readonly:true },
    ],
    badge: '💬',
  },
  {
    id: 'sendgrid',
    nombre: 'SendGrid',
    categoria: 'Comunicaciones',
    desc: 'Emails transaccionales — invitaciones, alertas, facturas',
    status: 'activa',
    lastSync: 'hace 30 min',
    provider: 'Twilio SendGrid',
    docs: 'https://sendgrid.com/docs',
    config: [
      { label:'API Key', value:'SG.••••••••••••••••••••', readonly:false, secret:true },
      { label:'From Email', value:'noreply@nexo.pe', readonly:false },
      { label:'From Name', value:'NEXO O2P', readonly:false },
    ],
    badge: '📧',
  },
  {
    id: 'culqi',
    nombre: 'Culqi',
    categoria: 'Pagos',
    desc: 'Cobro de suscripciones con tarjetas peruanas e internacionales',
    status: 'pendiente',
    lastSync: 'No configurado',
    provider: 'Culqi S.A.C.',
    docs: 'https://culqi.com/docs',
    config: [
      { label:'Public Key', value:'', placeholder:'pk_live_...', readonly:false },
      { label:'Secret Key', value:'', placeholder:'sk_live_...', readonly:false, secret:true },
      { label:'Webhook Secret', value:'', placeholder:'whsec_...', readonly:false, secret:true },
    ],
    badge: '💳',
  },
  {
    id: 'supabase',
    nombre: 'Supabase',
    categoria: 'Infraestructura',
    desc: 'Base de datos PostgreSQL, autenticación y storage',
    status: 'activa',
    lastSync: 'hace 5 seg',
    provider: 'Supabase Inc.',
    docs: 'https://supabase.com/docs',
    config: [
      { label:'Project URL', value:'https://nexo.supabase.co', readonly:true },
      { label:'Anon Key', value:'eyJ••••••••••••••', readonly:true, secret:true },
      { label:'Service Role', value:'eyJ••••••••••••••', readonly:true, secret:true },
    ],
    badge: '🗄',
  },
  {
    id: 'uptimerobot',
    nombre: 'UptimeRobot',
    categoria: 'Monitoreo',
    desc: 'Monitoreo de uptime y alertas de caída de servicios',
    status: 'activa',
    lastSync: 'hace 5 min',
    provider: 'UptimeRobot',
    docs: 'https://uptimerobot.com',
    config: [
      { label:'API Key', value:'ur••••••••••••••••', readonly:false, secret:true },
      { label:'Monitor URL', value:'https://api.nexo.pe/health', readonly:false },
    ],
    badge: '📡',
  },
]

const CAT_COLORS = {
  'Regulatorio':    { color:'#166534', bg:'#F0FDF4' },
  'ERP':            { color:'#0E4D92', bg:'#EEF5FF' },
  'Facturación':    { color:'#7C3AED', bg:'#F5F3FF' },
  'Comunicaciones': { color:'#C2410C', bg:'#FFF7ED' },
  'Pagos':          { color:'#166534', bg:'#F0FDF4' },
  'Infraestructura':{ color:'#0B1F3A', bg:'#F1F5F9' },
  'Monitoreo':      { color:'#92400E', bg:'#FFFBEB' },
}

const SC = { activa:'#10B981', pendiente:'#F59E0B', error:'#EF4444' }
const SB = { activa:'#F0FDF4', pendiente:'#FFFBEB', error:'#FEF2F2' }
const ST = { activa:'#166534', pendiente:'#92400E', error:'#991B1B' }
const SL = { activa:'Activa', pendiente:'Pendiente', error:'Error' }

export default function IntegracionesView({ accent, accentBg, text, text2, text3, border, white, bg }) {
  const [selected, setSelected]   = useState(null)
  const [configs, setConfigs]     = useState({})
  const [showSecret, setShowSecret] = useState({})
  const [saved, setSaved]         = useState(false)
  const [filterCat, setFilterCat] = useState('todas')

  const cats = ['todas', ...new Set(INTEGRACIONES.map(i=>i.categoria))]
  const filtered = INTEGRACIONES.filter(i => filterCat==='todas' || i.categoria===filterCat)

  const activas   = INTEGRACIONES.filter(i=>i.status==='activa').length
  const pendientes = INTEGRACIONES.filter(i=>i.status==='pendiente').length

  const card = { background:white, border:`1px solid ${border}`, borderRadius:'10px' }
  const inp  = { width:'100%', padding:'8px 12px', border:`1px solid ${border}`, borderRadius:'8px', fontSize:'12px', fontFamily:"'Inter',sans-serif", color:text, outline:'none', boxSizing:'border-box', background:white }

  const getVal = (intId, label, def) => configs[intId]?.[label] ?? def

  const handleSave = (intId) => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (selected) {
    const integ = INTEGRACIONES.find(i=>i.id===selected)
    const catStyle = CAT_COLORS[integ.categoria] || { color:accent, bg:accentBg }
    return (
      <div style={{ fontFamily:"'Inter',sans-serif" }}>
        <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'16px', fontSize:'12px', color:text3 }}>
          <span onClick={()=>setSelected(null)} style={{ cursor:'pointer', color:accent }}>Integraciones</span>
          <span>›</span>
          <span style={{ color:text2, fontWeight:500 }}>{integ.nombre}</span>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
          {/* Info */}
          <div style={{ ...card, padding:'20px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
              <div style={{ fontSize:'28px' }}>{integ.badge}</div>
              <div>
                <div style={{ fontSize:'16px', fontWeight:600, color:text }}>{integ.nombre}</div>
                <span style={{ fontSize:'10px', fontWeight:600, padding:'2px 8px', borderRadius:'6px', background:catStyle.bg, color:catStyle.color }}>{integ.categoria}</span>
              </div>
            </div>
            <div style={{ fontSize:'13px', color:text2, lineHeight:1.5, marginBottom:'16px' }}>{integ.desc}</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              {[
                ['Estado', <span style={{ fontSize:'11px', fontWeight:600, padding:'2px 8px', borderRadius:'8px', background:SB[integ.status], color:ST[integ.status] }}>{SL[integ.status]}</span>],
                ['Proveedor', integ.provider],
                ['Última sync', integ.lastSync],
                ['Documentación', <a href={integ.docs} target="_blank" rel="noreferrer" style={{ color:accent, fontSize:'12px' }}>{integ.docs} ↗</a>],
              ].map(([label, val]) => (
                <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:`1px solid ${border}` }}>
                  <span style={{ fontSize:'11px', color:text3 }}>{label}</span>
                  <span style={{ fontSize:'12px', color:text }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Config */}
          <div style={{ ...card, padding:'20px' }}>
            <div style={{ fontSize:'13px', fontWeight:600, color:text, marginBottom:'16px' }}>Configuración</div>
            {integ.config.map(f => (
              <div key={f.label} style={{ marginBottom:'14px' }}>
                <label style={{ fontSize:'11px', fontWeight:600, color:text2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>{f.label}</label>
                <div style={{ display:'flex', gap:'6px' }}>
                  <input
                    type={f.secret && !showSecret[`${integ.id}-${f.label}`] ? 'password' : 'text'}
                    value={getVal(integ.id, f.label, f.value||'')}
                    onChange={e => !f.readonly && setConfigs(c => ({...c, [integ.id]:{...c[integ.id],[f.label]:e.target.value}}))}
                    placeholder={f.placeholder||''}
                    readOnly={f.readonly}
                    style={{ ...inp, flex:1, background:f.readonly?bg:white, color:f.readonly?text3:text, cursor:f.readonly?'not-allowed':'text' }}
                  />
                  {f.secret && (
                    <button onClick={() => setShowSecret(s => ({...s,[`${integ.id}-${f.label}`]:!s[`${integ.id}-${f.label}`]}))}
                      style={{ padding:'8px 10px', border:`1px solid ${border}`, borderRadius:'8px', background:white, cursor:'pointer', fontSize:'12px' }}>
                      {showSecret[`${integ.id}-${f.label}`] ? '🙈' : '👁'}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {!integ.config.every(f=>f.readonly) && (
              <button onClick={() => handleSave(integ.id)}
                style={{ width:'100%', padding:'10px', border:'none', borderRadius:'8px', background:saved?'#10B981':accent, color:'#fff', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'background .3s' }}>
                {saved ? '✓ Guardado' : 'Guardar configuración'}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily:"'Inter',sans-serif" }}>

      {/* KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'14px' }}>
        {[
          { label:'Total integraciones', val:INTEGRACIONES.length, color:accent,    icon:'🔗' },
          { label:'Activas',             val:activas,              color:'#10B981', icon:'✓' },
          { label:'Pendientes',          val:pendientes,           color:'#F59E0B', icon:'⏳' },
          { label:'Categorías',          val:cats.length-1,        color:'#7C3AED', icon:'📦' },
        ].map(m => (
          <div key={m.label} style={{ ...card, padding:'16px 18px' }}>
            <div style={{ fontSize:'18px', marginBottom:'8px' }}>{m.icon}</div>
            <div style={{ fontSize:'9px', color:text3, textTransform:'uppercase', letterSpacing:'.6px', marginBottom:'4px' }}>{m.label}</div>
            <div style={{ fontFamily:"'Fraunces',serif", fontSize:'22px', fontWeight:700, color:m.color }}>{m.val}</div>
          </div>
        ))}
      </div>

      {/* Filtros por categoría */}
      <div style={{ display:'flex', gap:'4px', marginBottom:'14px', flexWrap:'wrap' }}>
        {cats.map(cat => (
          <button key={cat} onClick={() => setFilterCat(cat)}
            style={{ padding:'5px 12px', borderRadius:'20px', border:`1px solid ${filterCat===cat?accent:border}`, background:filterCat===cat?accentBg:white, color:filterCat===cat?accent:text2, fontSize:'11px', fontWeight:filterCat===cat?600:400, cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'all .15s', textTransform:'capitalize' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de integraciones */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px' }}>
        {filtered.map(integ => {
          const catStyle = CAT_COLORS[integ.categoria] || { color:accent, bg:accentBg }
          return (
            <div key={integ.id} onClick={() => setSelected(integ.id)}
              style={{ ...card, padding:'16px 18px', cursor:'pointer', transition:'box-shadow .15s' }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'}
              onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'10px' }}>
                <div style={{ fontSize:'24px' }}>{integ.badge}</div>
                <span style={{ fontSize:'10px', fontWeight:600, padding:'2px 8px', borderRadius:'10px', background:SB[integ.status], color:ST[integ.status], display:'inline-flex', alignItems:'center', gap:'4px' }}>
                  <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:SC[integ.status], ...(integ.status==='activa'?{animation:'pulse 2s infinite'}:{}) }}/>
                  {SL[integ.status]}
                </span>
              </div>
              <div style={{ fontSize:'13px', fontWeight:600, color:text, marginBottom:'3px' }}>{integ.nombre}</div>
              <span style={{ fontSize:'9px', fontWeight:600, padding:'2px 7px', borderRadius:'6px', background:catStyle.bg, color:catStyle.color, display:'inline-block', marginBottom:'8px' }}>{integ.categoria}</span>
              <div style={{ fontSize:'11px', color:text2, lineHeight:1.4, marginBottom:'10px' }}>{integ.desc}</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:'10px', color:text3 }}>Sync: {integ.lastSync}</span>
                <span style={{ fontSize:'11px', color:accent, fontWeight:500 }}>Configurar →</span>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
    </div>
  )
}
