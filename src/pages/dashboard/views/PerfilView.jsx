import { useState, useRef } from 'react'

const TABS_PROV = [
  { id: 'empresa',      label: 'Datos de la Empresa',   icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { id: 'billing',      label: 'Plan & Suscripción',    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { id: 'comercial',    label: 'Config. Comercial',     icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { id: 'api',          label: 'Conectividad & API',    icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
  { id: 'equipo',       label: 'Mi Equipo',             icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
]

const TABS_RET = [
  { id: 'empresa',      label: 'Datos de la Empresa',   icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { id: 'billing',      label: 'Plan & Suscripción',    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { id: 'api',          label: 'Conectividad & API',    icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
  { id: 'equipo',       label: 'Mi Equipo',             icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
]

const TEAM_PROV = [
  { name:'Ricardo Torres',  email:'r.torres@arca.com.pe',  rol:'Admin de Ventas',      status:'active' },
  { name:'Claudia Mendoza', email:'c.mendoza@arca.com.pe', rol:'Facturador / Contador', status:'active' },
  { name:'Jorge Pinto',     email:'j.pinto@arca.com.pe',   rol:'Tesorero',             status:'active' },
  { name:'Sandra López',    email:'s.lopez@arca.com.pe',   rol:'Facturador / Contador', status:'invited' },
]

const TEAM_RET = [
  { name:'Ana Flores',    email:'a.flores@wong.com.pe',  rol:'Admin de Compras',          status:'active' },
  { name:'Carlos Ruiz',   email:'c.ruiz@wong.com.pe',    rol:'Comprador / Op. Logístico', status:'active' },
  { name:'Patricia Vega', email:'p.vega@wong.com.pe',    rol:'Aprobador Financiero',      status:'invited' },
]


const INVOICES = [
  { id:'INV-2025-005', fecha:'01 May 2025', plan:'Plan Enterprise', monto:'S/ 2,500', status:'Pagado' },
  { id:'INV-2025-004', fecha:'01 Abr 2025', plan:'Plan Enterprise', monto:'S/ 2,500', status:'Pagado' },
  { id:'INV-2025-003', fecha:'01 Mar 2025', plan:'Plan Pro',        monto:'S/ 800',   status:'Pagado' },
]

function SvgIcon({ path, size=16, color='currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={path}/>
    </svg>
  )
}

function Field({ label, value, locked, hint }) {
  return (
    <div style={{ marginBottom:'16px' }}>
      <label style={{ fontSize:'11px', fontWeight:600, color:'#6B8BAE', textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>
        {label} {locked && <span style={{ fontSize:'9px', background:'#F1F5F9', color:'#94A3B8', padding:'1px 6px', borderRadius:'4px', marginLeft:'4px', fontWeight:500 }}>Bloqueado</span>}
      </label>
      <input
        defaultValue={value}
        disabled={locked}
        style={{ width:'100%', padding:'9px 12px', border:'1px solid rgba(14,77,146,0.12)', borderRadius:'8px', fontSize:'13px', color: locked?'#94A3B8':'#0B1F3A', background: locked?'#F8FAFC':'#fff', fontFamily:"'DM Sans',sans-serif", outline:'none', boxSizing:'border-box' }}
        onFocus={e => { if(!locked) e.target.style.borderColor='#0E4D92' }}
        onBlur={e => e.target.style.borderColor='rgba(14,77,146,0.12)'}
      />
      {hint && <div style={{ fontSize:'10px', color:'#94A3B8', marginTop:'3px' }}>{hint}</div>}
    </div>
  )
}

function SaveBtn({ label='Guardar cambios' }) {
  const [saved, setSaved] = useState(false)
  const handle = () => { setSaved(true); setTimeout(()=>setSaved(false), 2000) }
  return (
    <button onClick={handle} style={{ padding:'9px 20px', background: saved?'#166534':'#0B1F3A', border:'none', borderRadius:'8px', color:'#fff', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'background .2s', display:'flex', alignItems:'center', gap:'6px' }}>
      {saved ? '✓ Guardado' : label}
    </button>
  )
}

function TabEmpresa() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px' }}>
      <div>
        <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A', marginBottom:'16px', paddingBottom:'8px', borderBottom:'1px solid rgba(14,77,146,0.08)' }}>Identidad Legal</div>
        <Field label="RUC" value="20100128954" locked hint="No editable tras el onboarding"/>
        <Field label="Razón Social" value="ARCA CONTINENTAL LINDLEY S.A." locked/>
        <Field label="Dirección Fiscal" value="Av. Nicolás Arriola 589, La Victoria, Lima"/>
        <Field label="Nombre Comercial" value="Arca Continental"/>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
          <Field label="Teléfono" value="+51 1 618-7500"/>
          <Field label="Correo corporativo" value="contacto@arcacontinental.pe"/>
        </div>
        <SaveBtn label="Guardar datos de empresa"/>
      </div>

      <div>
        <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A', marginBottom:'4px', paddingBottom:'8px', borderBottom:'1px solid rgba(14,77,146,0.08)', display:'flex', alignItems:'center', gap:'8px' }}>
          Información Bancaria
          <span style={{ fontSize:'10px', background:'#FFF7ED', color:'#C2410C', padding:'2px 7px', borderRadius:'6px', fontWeight:500 }}>Crítico para cobros</span>
        </div>
        <div style={{ padding:'10px 12px', background:'#FFF7ED', border:'1px solid #FED7AA', borderRadius:'8px', fontSize:'11px', color:'#92400E', marginBottom:'16px', lineHeight:1.5, marginTop:'16px' }}>
          ⚠ Esta información se usa para transferencias automáticas de Órdenes de Pago y Factoring. Verifica que sea correcta.
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
          <Field label="Banco" value="BCP - Banco de Crédito"/>
          <Field label="Tipo de cuenta" value="Corriente en Soles"/>
        </div>
        <Field label="Número de cuenta" value="193-12345678-0-12"/>
        <Field label="CCI (Código Interbancario)" value="00219300123456780121" hint="20 dígitos requeridos para transferencias interbancarias"/>
        <SaveBtn label="Guardar datos bancarios"/>
      </div>
    </div>
  )
}

const PLANES = {
  starter: {
    nombre: 'Starter',
    precio: 'S/ 1,900',
    periodo: '/ mes',
    desc: 'Módulo core de OC con API básica incluida',
    color: '#0B1F3A',
    accentBg: '#F1F5F9',
    features: [
      { ok:true,  txt:'Módulo Órdenes de Compra' },
      { ok:true,  txt:'Hasta 500 OCs / mes' },
      { ok:true,  txt:'Trazabilidad básica (5 etapas)' },
      { ok:true,  txt:'Portal web + mobile' },
      { ok:true,  txt:'API básica OC (REST)' },
      { ok:true,  txt:'Soporte por email (48h)' },
      { ok:false, txt:'Módulos adicionales' },
      { ok:false, txt:'Soporte prioritario' },
      { ok:false, txt:'Conexión OSE/SUNAT' },
    ]
  },
  pro: {
    nombre: 'Professional',
    precio: 'S/ 2,900',
    periodo: '/ mes',
    desc: 'Plataforma completa O2P con soporte prioritario',
    color: '#0E4D92',
    accentBg: 'linear-gradient(135deg,#0B1F3A,#0E4D92)',
    features: [
      { ok:true, txt:'Todo el plan Starter' },
      { ok:true, txt:'OCs ilimitadas' },
      { ok:true, txt:'Trazabilidad completa (9 etapas)' },
      { ok:true, txt:'Módulo Despacho + Recibo' },
      { ok:true, txt:'Módulo Financiero + Reportes' },
      { ok:true, txt:'Conexión OSE/SUNAT (Nubefact)' },
      { ok:true, txt:'Soporte prioritario (SLA 4h)' },
      { ok:true, txt:'Actualizaciones automáticas' },
    ]
  }
}

const ADDONS = [
  { icon:'⚙', nombre:'Integración ERP', desc:'SAP, Oracle u Odoo. Sincronización bidireccional.', precio:'S/ 3,500' },
  { icon:'⚡', nombre:'Factoring / Cobro inmediato', desc:'Botón de cobro anticipado con fondo financiero.', precio:'S/ 4,000' },
  { icon:'📊', nombre:'Reportes avanzados', desc:'Dashboard analítico personalizado por cadena.', precio:'S/ 2,500' },
  { icon:'🔗', nombre:'EDI Retail específico', desc:'Integración EDI dedicada con un retail.', precio:'S/ 2,800' },
]

function FeatureItem({ txt, tooltip, accent, dark }) {
  const [tip, setTip] = useState(false)

  return (
    <div style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'12px', color: dark?'rgba(255,255,255,0.75)':'#374151', position:'relative' }}>
      <span style={{ color:accent, flexShrink:0, fontSize:'14px', fontWeight:700 }}>✓</span>
      <div style={{ position:'relative', display:'inline-flex', alignItems:'center', gap:'4px' }}
        onMouseEnter={() => tooltip && setTip(true)}
        onMouseLeave={() => setTip(false)}
      >
        <span style={{ borderBottom: tooltip?`1px dashed ${dark?'rgba(255,255,255,0.35)':'rgba(14,77,146,0.35)'}`:' none', cursor: tooltip?'help':'default', lineHeight:1.6 }}>{txt}</span>
        {tooltip && <span style={{ fontSize:'10px', color: dark?'rgba(255,255,255,0.4)':'#94A3B8', lineHeight:1 }}>ⓘ</span>}

        {tip && (
          <div style={{ position:'fixed', top:'50%', right:'24px', transform:'translateY(-50%)', width:'220px', background:'#0B1F3A', borderRadius:'10px', padding:'12px 14px', zIndex:999, boxShadow:'0 8px 32px rgba(0,0,0,0.3)', pointerEvents:'none', border:'1px solid rgba(0,245,160,0.15)' }}>
            <div style={{ fontSize:'10px', fontWeight:700, color:'rgba(255,255,255,0.45)', textTransform:'uppercase', letterSpacing:'.8px', marginBottom:'10px' }}>Etapas incluidas</div>
            {tooltip.map((stage, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'7px', fontSize:'11px', color:'rgba(255,255,255,0.8)', lineHeight:1.4 }}>
                <div style={{ width:'18px', height:'18px', borderRadius:'50%', background:'rgba(0,245,160,0.12)', border:'1px solid rgba(0,245,160,0.25)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:'9px', fontWeight:700, color:'#00F5A0' }}>{i+1}</div>
                {stage}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function TabBilling() {
  const [slider, setSlider] = useState(0) // 0=Starter, 1=Pro, 2=Addon
  const [showUpgrade, setShowUpgrade] = useState(false)

  const STEPS = [
    {
      id: 'starter',
      label: 'Starter',
      precio: 'S/ 1,900',
      period: '/ mes · Sin IGV',
      badge: 'Starter',
      badgeBg: '#EEF5FF', badgeColor: '#0E4D92',
      desc: 'Todo lo que necesitas para digitalizar tus órdenes de compra con Arca.',
      accent: '#0E4D92',
      accentLight: '#EEF5FF',
      dark: false,
      features: [
        { txt:'Módulo Órdenes de Compra' },
        { txt:'Volumen de OCs según operación' },
        { txt:'Trazabilidad básica (5 etapas)', tooltip:['OC Emitida','OC Confirmada','OC en Despacho','OC Recibida','OC Cerrada'] },
        { txt:'Portal Mobile y Desktop' },
        { txt:'Acceso a API REST para integraciones' },
        { txt:'Soporte por email (48h)' },
      ],
      cta: null,
    },
    {
      id: 'pro',
      label: 'Professional',
      precio: 'S/ 2,900',
      period: '/ mes · Sin IGV',
      badge: 'Plan actual',
      badgeBg: '#00F5A0', badgeColor: '#064E3B',
      desc: 'La plataforma O2P completa. Trazabilidad total, soporte prioritario y conexión SUNAT.',
      accent: '#00F5A0',
      accentLight: 'rgba(0,245,160,0.15)',
      dark: true,
      features: [
        { txt:'Todo el plan Starter' },
        { txt:'OCs ilimitadas' },
        { txt:'Trazabilidad completa (9 etapas)', tooltip:['OC Emitida','OC Confirmada','ASN Generado (Despacho)','En tránsito','Recibido en almacén','Recepción aceptada / diferencias','Devolución gestionada','Factura validada SUNAT','Pago confirmado'] },
        { txt:'Portal Mobile, Desktop y App (PWA)' },
        { txt:'Módulo Despacho + Recibo' },
        { txt:'Módulo Financiero + Reportes' },
        { txt:'API avanzada + acompañamiento técnico' },
        { txt:'Soporte prioritario (SLA 4h)' },
        { txt:'Actualizaciones automáticas' },
      ],
      cta: 'Mejorar a Professional →',
    },
    {
      id: 'addon',
      label: 'A medida',
      precio: null,
      period: null,
      badge: 'Desarrollo',
      badgeBg: '#FFF7ED', badgeColor: '#C2410C',
      desc: 'Desarrollos a medida para tu operación. Cotización en 48h según alcance.',
      accent: '#F59E0B',
      accentLight: '#FFF7ED',
      dark: false,
      features: [
        { txt:'Integración con SAP (con acceso y docs de Arca)' },
        { txt:'Conector EDI con retail específico' },
        { txt:'Reportes analíticos por cadena o producto' },
        { txt:'Dashboard ejecutivo personalizado' },
        { txt:'Notificaciones automáticas (email / WhatsApp)' },
        { txt:'Módulo a medida (flujo personalizado)' },
      ],
      cta: null,
    },
  ]

  const step = STEPS[slider]
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`
        @keyframes planFade { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .plan-card { animation: planFade .25s ease both; }
      `}</style>

      {/* Tabs underline */}
      <div style={{ display:'flex', borderBottom:'1px solid rgba(14,77,146,0.1)', marginBottom:'24px', gap:'0' }}>
        {STEPS.map((s,i) => (
          <button key={s.id} onClick={() => setSlider(i)}
            style={{ padding:'10px 24px', border:'none', background:'transparent', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight: slider===i?600:400, color: slider===i?'#0B1F3A':'#94A3B8', borderBottom: slider===i?'2px solid #0B1F3A':'2px solid transparent', marginBottom:'-1px', transition:'all .2s', position:'relative' }}>
            {s.label}
            {s.id === 'pro' && (
              <span style={{ marginLeft:'6px', fontSize:'9px', fontWeight:600, padding:'2px 6px', borderRadius:'8px', background:'rgba(0,245,160,0.15)', color:'#065F46', verticalAlign:'middle' }}>Activo</span>
            )}
          </button>
        ))}
      </div>

      {/* Plan card */}
      <div className="plan-card" key={step.id} style={{ borderRadius:'16px', overflow:'hidden', marginBottom:'20px', boxShadow: step.dark?'0 8px 32px rgba(14,77,146,0.25)':'0 4px 16px rgba(14,77,146,0.08)', border: step.dark?'none':'1px solid rgba(14,77,146,0.1)' }}>

        {/* Header */}
        <div style={{ padding:'28px 32px 24px', background: step.dark?'linear-gradient(135deg,#0B1F3A,#0E4D92)':'#fff' }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'12px' }}>
            <div>
              <span style={{ fontSize:'10px', fontWeight:700, padding:'3px 10px', borderRadius:'10px', background:step.badgeBg, color:step.badgeColor, letterSpacing:'.5px', textTransform:'uppercase' }}>
                {step.badge}
              </span>
            </div>
  
          </div>

          <div style={{ fontFamily:"'Fraunces',serif", fontSize:'36px', fontWeight:900, color: step.dark?step.accent:'#0B1F3A', lineHeight:1, marginBottom:'4px' }}>
            {step.precio ?? (
              <span style={{ fontSize:'24px', color: step.dark?'rgba(255,255,255,0.6)':'#94A3B8' }}>Precio a medida</span>
            )}
          </div>
          {step.period && <div style={{ fontSize:'12px', color: step.dark?'rgba(255,255,255,0.4)':'#94A3B8', marginBottom:'12px' }}>{step.period} · facturación mensual</div>}

          <div style={{ fontSize:'13px', color: step.dark?'rgba(255,255,255,0.6)':'#6B7280', lineHeight:1.5, maxWidth:'480px' }}>
            {step.desc}
          </div>
        </div>

        {/* Features */}
        <div style={{ padding:'24px 32px', background: step.dark?'rgba(11,31,58,0.97)':'#FAFBFF', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px 24px' }}>
          {step.features.map((f,i) => (
            <FeatureItem key={i} txt={f.txt} tooltip={f.tooltip} accent={step.accent} dark={step.dark}/>
          ))}
        </div>

        {/* CTA */}
        <div style={{ padding:'20px 32px', background: step.dark?'rgba(11,31,58,0.97)':'#fff', borderTop:`1px solid ${step.dark?'rgba(255,255,255,0.06)':'rgba(14,77,146,0.06)'}` }}>
          {step.id === 'addon' ? (
            <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'2px' }}>¿Te interesa algún módulo adicional?</div>
                <div style={{ fontSize:'11px', color:'#6B8BAE' }}>Cuéntanos tu necesidad y te cotizamos en 48h.</div>
              </div>
              <a href="https://wa.me/51931067775?text=Hola,%20me%20interesa%20un%20módulo%20adicional%20para%20NEXO"
                target="_blank" rel="noreferrer"
                style={{ display:'flex', alignItems:'center', gap:'8px', padding:'10px 20px', background:'#25D366', border:'none', borderRadius:'10px', color:'#fff', fontSize:'13px', fontWeight:700, cursor:'pointer', textDecoration:'none', fontFamily:"'DM Sans',sans-serif", flexShrink:0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Hablar con el equipo
              </a>
            </div>
          ) : step.id === 'pro' ? (
            <button onClick={() => setShowUpgrade(true)}
              style={{ width:'100%', padding:'13px', background:'#00F5A0', border:'none', borderRadius:'10px', color:'#0B1F3A', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              {step.cta}
            </button>
          ) : (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ fontSize:'12px', color:'#94A3B8' }}>Plan anterior</div>
              <button onClick={() => setSlider(1)}
                style={{ display:'flex', alignItems:'center', gap:'6px', padding:'9px 18px', border:'1px solid rgba(14,77,146,0.2)', borderRadius:'8px', background:'#EEF5FF', color:'#0E4D92', fontSize:'12px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background='#0B1F3A'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#0B1F3A' }}
                onMouseLeave={e => { e.currentTarget.style.background='#EEF5FF'; e.currentTarget.style.color='#0E4D92'; e.currentTarget.style.borderColor='rgba(14,77,146,0.2)' }}
              >
                Ver plan Professional
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Método de pago */}
      <div style={{ marginBottom:'20px' }}>
        <div style={{ background:'#F8FAFC', border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', padding:'16px' }}>
          <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'12px' }}>Método de pago</div>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ width:'40px', height:'26px', background:'#1A1F71', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:'8px', color:'#fff', fontWeight:700 }}>VISA</span>
            </div>
            <div>
              <div style={{ fontSize:'12px', fontWeight:500, color:'#0B1F3A' }}>•••• •••• •••• 4242</div>
              <div style={{ fontSize:'10px', color:'#94A3B8' }}>Vence 12/2026</div>
            </div>
            <button style={{ marginLeft:'auto', fontSize:'11px', color:'#0E4D92', background:'none', border:'1px solid rgba(14,77,146,0.2)', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Cambiar</button>
          </div>
        </div>
      </div>

      {/* Historial */}
      <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A', marginBottom:'12px', paddingBottom:'8px', borderBottom:'1px solid rgba(14,77,146,0.08)' }}>Historial de facturas</div>
      <div style={{ border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 80px', gap:'8px', padding:'8px 14px', background:'#F8FAFC', borderBottom:'1px solid rgba(14,77,146,0.06)' }}>
          {['Factura','Fecha','Monto',''].map(h => (
            <span key={h} style={{ fontSize:'9px', color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.6px', fontWeight:600 }}>{h}</span>
          ))}
        </div>
        {INVOICES.map((inv,i) => (
          <div key={inv.id} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 80px', gap:'8px', padding:'10px 14px', borderBottom: i<INVOICES.length-1?'1px solid rgba(14,77,146,0.05)':'none', alignItems:'center' }}>
            <span style={{ fontSize:'11px', fontWeight:600, color:'#0B1F3A', fontFamily:'monospace' }}>{inv.id}</span>
            <span style={{ fontSize:'11px', color:'#6B8BAE' }}>{inv.fecha}</span>
            <span style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A' }}>{inv.monto}</span>
            <button style={{ fontSize:'10px', color:'#0E4D92', background:'#EEF5FF', border:'none', borderRadius:'5px', padding:'4px 8px', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>PDF ↓</button>
          </div>
        ))}
      </div>

      {/* Modal upgrade */}
      {showUpgrade && (
        <>
          <div onClick={() => setShowUpgrade(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.3)', zIndex:60, backdropFilter:'blur(2px)' }}/>
          <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'420px', background:'#fff', borderRadius:'14px', zIndex:70, boxShadow:'0 24px 64px rgba(0,0,0,0.15)', overflow:'hidden' }}>
            <div style={{ background:'linear-gradient(135deg,#0B1F3A,#0E4D92)', padding:'24px', textAlign:'center' }}>
              <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'6px' }}>Mejorar a</div>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:'28px', fontWeight:900, color:'#fff', marginBottom:'4px' }}>Professional</div>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:'22px', fontWeight:900, color:'#00F5A0' }}>S/ 2,900 / mes · Sin IGV</div>
            </div>
            <div style={{ padding:'20px 24px' }}>
              <div style={{ fontSize:'12px', color:'#6B8BAE', marginBottom:'16px', textAlign:'center', lineHeight:1.5 }}>
                El cambio aplica desde el próximo ciclo.<br/>Se cobrará el diferencial proporcional este mes.
              </div>
              <div style={{ display:'flex', gap:'8px' }}>
                <button onClick={() => setShowUpgrade(false)} style={{ flex:1, padding:'10px', border:'1px solid rgba(14,77,146,0.1)', borderRadius:'8px', background:'#F8FAFC', color:'#6B8BAE', fontSize:'13px', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Cancelar</button>
                <button onClick={() => setShowUpgrade(false)} style={{ flex:2, padding:'10px', border:'none', borderRadius:'8px', background:'#0B1F3A', color:'#fff', fontSize:'13px', fontWeight:700, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Confirmar upgrade →</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}


function TabAPI({ role }) {
  const [showToken, setShowToken] = useState(false)
  const [copied, setCopied] = useState(false)
  const [sapStatus, setSapStatus] = useState('ok') // ok | error | testing
  const [webhookSaved, setWebhookSaved] = useState(false)
  const isProv = role === 'prov'

  const token = 'nxo_live_sk_4f8e2a1b9c3d7f6e5a2b8c4d1e9f3a7b'
  const copy = () => { navigator.clipboard?.writeText(token); setCopied(true); setTimeout(()=>setCopied(false),2000) }
  const testSap = () => { setSapStatus('testing'); setTimeout(()=>setSapStatus('ok'),2000) }
  const saveWebhook = () => { setWebhookSaved(true); setTimeout(()=>setWebhookSaved(false),2000) }

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px' }}>

      {/* IZQUIERDA */}
      <div>
        {isProv ? (
          <>
            <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A', marginBottom:'16px', paddingBottom:'8px', borderBottom:'1px solid rgba(14,77,146,0.08)' }}>
              Conexión con SAP
            </div>

            {/* Status SAP */}
            <div style={{ padding:'10px 12px', background: sapStatus==='ok'?'#F0FDF4':sapStatus==='testing'?'#FFF7ED':'#FEF2F2', border:`1px solid ${sapStatus==='ok'?'#BBF7D0':sapStatus==='testing'?'#FED7AA':'#FECACA'}`, borderRadius:'8px', fontSize:'11px', color: sapStatus==='ok'?'#166534':sapStatus==='testing'?'#92400E':'#991B1B', marginBottom:'16px', lineHeight:1.5, display:'flex', alignItems:'center', gap:'8px' }}>
              {sapStatus==='ok' && <><span>✓</span> Conexión con SAP activa · Última sincronización hace 5 min</>}
              {sapStatus==='testing' && <><span style={{ animation:'lspin .7s linear infinite', display:'inline-block' }}>⟳</span> Probando conexión...</>}
              {sapStatus==='error' && <><span>✗</span> Error de conexión · Verifica el endpoint</>}
            </div>

            <Field label="Endpoint SAP" value="https://sap.arcacontinental.pe/api/nexo" hint="URL del servicio SAP que recibe datos de NEXO"/>
            <Field label="Token de autenticación SAP" value="sap_tk_••••••••••••••••2f9c" hint="Token proporcionado por el equipo técnico de Arca"/>
            <Field label="Ambiente" value="Producción"/>

            <div style={{ display:'flex', gap:'8px', marginTop:'4px' }}>
              <SaveBtn label="Guardar configuración"/>
              <button onClick={testSap}
                style={{ padding:'9px 14px', border:'1px solid rgba(14,77,146,0.15)', borderRadius:'8px', background:'transparent', color:'#0E4D92', fontSize:'12px', fontWeight:500, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                Probar conexión
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A', marginBottom:'16px', paddingBottom:'8px', borderBottom:'1px solid rgba(14,77,146,0.08)' }}>
              Conexión con NEXO
            </div>
            <div style={{ padding:'10px 12px', background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:'8px', fontSize:'11px', color:'#166534', marginBottom:'16px' }}>
              ✓ Conexión activa · Última actividad hace 2 min
            </div>
            <div style={{ background:'#F8FAFC', border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', padding:'16px', marginBottom:'16px' }}>
              <div style={{ fontSize:'11px', color:'#6B8BAE', marginBottom:'12px', lineHeight:1.5 }}>
                Tu sistema puede conectarse a NEXO usando esta API Key para enviar y recibir Órdenes de Compra automáticamente.
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'16px' }}>
                {[
                  { label:'OCs emitidas este mes', val:'214', color:'#0E4D92' },
                  { label:'OCs confirmadas', val:'198', color:'#166534' },
                  { label:'Tiempo promedio respuesta', val:'1.2s', color:'#92400E' },
                  { label:'Errores este mes', val:'0', color:'#94A3B8' },
                ].map(s => (
                  <div key={s.label} style={{ background:'#fff', border:'1px solid rgba(14,77,146,0.08)', borderRadius:'8px', padding:'10px 12px' }}>
                    <div style={{ fontSize:'9px', color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.5px', marginBottom:'3px' }}>{s.label}</div>
                    <div style={{ fontSize:'18px', fontWeight:700, color:s.color, fontFamily:"'Fraunces',serif" }}>{s.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* EDI */}
            <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A', marginBottom:'12px', paddingBottom:'8px', borderBottom:'1px solid rgba(14,77,146,0.08)' }}>
              Conexión EDI
            </div>
            <div style={{ background:'#F8FAFC', border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', padding:'16px' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'10px' }}>
                <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A' }}>EDI con tu sistema</div>
                <span style={{ fontSize:'10px', fontWeight:600, padding:'3px 9px', borderRadius:'20px', background:'#FFF7ED', color:'#C2410C', border:'1px solid #FED7AA' }}>
                  En configuración
                </span>
              </div>
              <div style={{ fontSize:'11px', color:'#6B8BAE', lineHeight:1.5, marginBottom:'12px' }}>
                La conexión EDI se habilita una vez que tu retail esté activo en la red NEXO. Permite recibir y enviar documentos automáticamente sin entrar al portal.
              </div>
              <a href="https://wa.me/51931067775?text=Hola,%20quiero%20activar%20la%20conexión%20EDI%20para%20mi%20retail%20en%20NEXO"
                target="_blank" rel="noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:'7px', padding:'8px 16px', background:'#25D366', border:'none', borderRadius:'8px', color:'#fff', fontSize:'12px', fontWeight:600, cursor:'pointer', textDecoration:'none', fontFamily:"'DM Sans',sans-serif" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Contacta al equipo para activar
              </a>
            </div>
          </>
        )}
      </div>

      {/* DERECHA */}
      <div>
        <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A', marginBottom:'16px', paddingBottom:'8px', borderBottom:'1px solid rgba(14,77,146,0.08)', display:'flex', alignItems:'center', gap:'8px' }}>
          API Key & Webhook
          <span style={{ fontSize:'10px', background:'#F5F3FF', color:'#7C3AED', padding:'2px 7px', borderRadius:'6px', fontWeight:500 }}>
            {isProv ? 'Professional' : 'Enterprise'}
          </span>
        </div>

        {/* API Key */}
        <div style={{ background:'#F8FAFC', border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', padding:'16px', marginBottom:'14px' }}>
          <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'6px' }}>
            {isProv ? 'Tu API Key de NEXO' : 'API Key de acceso'}
          </div>
          <div style={{ fontSize:'11px', color:'#6B8BAE', marginBottom:'10px' }}>
            {isProv ? 'Usa esta clave en SAP para autenticar las llamadas a NEXO' : 'Usa esta clave para conectar tu sistema de compras con NEXO'}
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            <div style={{ flex:1, padding:'8px 12px', background:'#fff', border:'1px solid rgba(14,77,146,0.12)', borderRadius:'7px', fontSize:'11px', fontFamily:'monospace', color:'#0B1F3A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {showToken ? token : 'nxo_live_sk_••••••••••••••••••••••'}
            </div>
            <button onClick={()=>setShowToken(!showToken)} style={{ padding:'8px 10px', border:'1px solid rgba(14,77,146,0.12)', borderRadius:'7px', background:'#fff', cursor:'pointer', fontSize:'12px' }}>
              {showToken?'🙈':'👁'}
            </button>
            <button onClick={copy} style={{ padding:'8px 12px', border:'none', borderRadius:'7px', background: copied?'#166534':'#0B1F3A', color:'#fff', fontSize:'11px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'background .2s', whiteSpace:'nowrap' }}>
              {copied?'✓ Copiado':'Copiar'}
            </button>
          </div>
          <div style={{ fontSize:'10px', color:'#94A3B8', marginTop:'6px' }}>
            Header: <code style={{ background:'#F1F5F9', padding:'1px 5px', borderRadius:'3px', fontSize:'10px' }}>Authorization: Bearer &lt;API_KEY&gt;</code>
          </div>
        </div>

        {/* Webhook */}
        <div style={{ background:'#F8FAFC', border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', padding:'16px' }}>
          <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'4px' }}>Webhook de notificaciones</div>
          <div style={{ fontSize:'11px', color:'#6B8BAE', marginBottom:'12px' }}>
            {isProv
              ? 'NEXO enviará un POST a esta URL cuando un Retail apruebe una OC o emita una Orden de Pago'
              : 'NEXO enviará un POST a esta URL cuando Arca confirme o despache tu OC'}
          </div>
          <Field
            label="URL de tu endpoint"
            value={isProv ? 'https://sap.arcacontinental.pe/nexo/events' : 'https://sistemas.wong.com.pe/nexo/webhook'}
            hint="Debe ser una URL pública que acepte POST con JSON"
          />
          <div style={{ display:'flex', gap:'8px', marginTop:'-4px' }}>
            <button onClick={saveWebhook}
              style={{ padding:'9px 16px', border:'none', borderRadius:'8px', background: webhookSaved?'#166534':'#0B1F3A', color:'#fff', fontSize:'12px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'background .2s' }}>
              {webhookSaved ? '✓ Guardado' : 'Guardar webhook'}
            </button>
            <button style={{ padding:'9px 14px', border:'1px solid rgba(14,77,146,0.15)', borderRadius:'8px', background:'transparent', color:'#0E4D92', fontSize:'12px', fontWeight:500, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              Probar envío
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ROL_INFO_PROV = {
  'Admin de Ventas':      { desc:'Acceso completo a todos los módulos', modules:['Catálogo','OCs','Despachos','Financiero','Reportes','API','Billing','Usuarios'], color:'#7C3AED', bg:'#F5F3FF' },
  'Facturador / Contador':{ desc:'Emite y gestiona documentos fiscales', modules:['Ver OCs entrantes','Generar XML factura','Subir a SUNAT','Ver estado documentos'], color:'#0E4D92', bg:'#EEF5FF' },
  'Tesorero':             { desc:'Gestiona pagos y factoring', modules:['Ver Órdenes de Pago','Cobro Inmediato','Factoring','Reportes financieros'], color:'#166534', bg:'#F0FDF4' },
}

const ROL_INFO_RET = {
  'Admin de Compras':       { desc:'Acceso completo al módulo de compras', modules:['OCs','Despachos','Recepciones','Devoluciones','Reportes','Usuarios','Billing'], color:'#0E4D92', bg:'#EEF5FF' },
  'Comprador / Op. Logístico': { desc:'Crea y gestiona órdenes de compra', modules:['Nueva OC','Ver OCs','Despachos','Recepciones','Devoluciones'], color:'#166534', bg:'#F0FDF4' },
  'Aprobador Financiero':   { desc:'Aprueba OCs y gestiona pagos', modules:['Aprobar OCs','Ver facturas','Órdenes de Pago','Reportes financieros'], color:'#7C3AED', bg:'#F5F3FF' },
}

function RolSelect({ value, onChange, rolInfo }) {
  const [open, setOpen] = useState(false)
  const [tooltip, setTooltip] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ top:0, left:0 })
  const btnRef = useRef(null)

  const ROL_INFO = rolInfo
  const handleTooltipEnter = (rol, e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltipPos({ top: rect.top, left: rect.right + 10 })
    setTooltip(rol)
  }

  return (
    <div style={{ position:'relative' }} ref={btnRef}>
      <button onClick={() => setOpen(!open)}
        style={{ display:'flex', alignItems:'center', gap:'6px', padding:'5px 10px', border:'1px solid rgba(14,77,146,0.12)', borderRadius:'6px', background:'#fff', fontFamily:"'DM Sans',sans-serif", fontSize:'11px', color:'#0B1F3A', cursor:'pointer', width:'100%', justifyContent:'space-between' }}>
        <span>{value}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
      </button>

      {open && (
        <>
          <div onClick={() => { setOpen(false); setTooltip(null) }} style={{ position:'fixed', inset:0, zIndex:40 }}/>
          <div style={{ position:'absolute', top:'calc(100% + 4px)', left:0, width:'200px', background:'#fff', border:'1px solid rgba(14,77,146,0.1)', borderRadius:'8px', boxShadow:'0 8px 24px rgba(14,77,146,0.12)', zIndex:50, overflow:'visible' }}>
            {Object.entries(ROL_INFO).map(([rol, info]) => (
              <div key={rol}
                onMouseEnter={e => handleTooltipEnter(rol, e)}
                onMouseLeave={() => setTooltip(null)}
              >
                <button onClick={() => { onChange(rol); setOpen(false); setTooltip(null) }}
                  style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'9px 12px', border:'none', background: value===rol ? info.bg : 'transparent', color: value===rol ? info.color : '#4B5563', fontSize:'12px', fontWeight: value===rol?600:400, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", textAlign:'left', transition:'background .1s' }}
                  onMouseEnter={e => { if(value!==rol) e.currentTarget.style.background='#F8FAFC' }}
                  onMouseLeave={e => { if(value!==rol) e.currentTarget.style.background='transparent' }}
                >
                  {rol}
                  <span style={{ fontSize:'10px', color:'#94A3B8' }}>ⓘ</span>
                </button>
              </div>
            ))}
          </div>

          {tooltip && ROL_INFO[tooltip] && (
            <div style={{ position:'fixed', top:tooltipPos.top, left:tooltipPos.left, width:'220px', background:'#0B1F3A', borderRadius:'8px', padding:'12px', zIndex:200, boxShadow:'0 8px 24px rgba(0,0,0,0.25)', pointerEvents:'none' }}>
              <div style={{ fontSize:'11px', fontWeight:600, color:'#fff', marginBottom:'4px' }}>{tooltip}</div>
              <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.5)', marginBottom:'8px', lineHeight:1.4 }}>{ROL_INFO[tooltip].desc}</div>
              <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
                {ROL_INFO[tooltip].modules.map(m => (
                  <div key={m} style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'10px', color:'rgba(255,255,255,0.75)' }}>
                    <span style={{ color:'#00F5A0', flexShrink:0 }}>✓</span>{m}
                  </div>
                ))}
              </div>
              <div style={{ position:'absolute', left:'-5px', top:'14px', width:'10px', height:'10px', background:'#0B1F3A', transform:'rotate(45deg)' }}/>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function InviteModal({ onClose, rolInfo }) {
  const ROL_INFO = rolInfo
  const firstRol = Object.keys(rolInfo)[1] || Object.keys(rolInfo)[0]
  const [form, setForm] = useState({ name:'', email:'', rol: firstRol })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handle = () => {
    if (!form.name || !form.email) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1200)
  }

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.3)', zIndex:60, backdropFilter:'blur(2px)' }}/>
      <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'440px', background:'#fff', borderRadius:'14px', zIndex:70, boxShadow:'0 24px 64px rgba(0,0,0,0.15)', overflow:'hidden', animation:'fadeUp .2s ease' }}>

        {!sent ? (
          <>
            <div style={{ padding:'20px 24px 16px', borderBottom:'1px solid rgba(14,77,146,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div>
                <div style={{ fontSize:'15px', fontWeight:700, color:'#0B1F3A' }}>Invitar colaborador</div>
                <div style={{ fontSize:'11px', color:'#6B8BAE', marginTop:'2px' }}>Recibirá un email con acceso a NEXO</div>
              </div>
              <button onClick={onClose} style={{ width:'28px', height:'28px', borderRadius:'50%', border:'1px solid rgba(14,77,146,0.1)', background:'#F8FAFC', cursor:'pointer', fontSize:'14px', color:'#6B8BAE', display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
            </div>

            <div style={{ padding:'20px 24px' }}>
              <div style={{ marginBottom:'14px' }}>
                <label style={{ fontSize:'11px', fontWeight:600, color:'#6B8BAE', textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>Nombre completo</label>
                <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Ej: María González"
                  style={{ width:'100%', padding:'9px 12px', border:'1px solid rgba(14,77,146,0.12)', borderRadius:'8px', fontSize:'13px', color:'#0B1F3A', fontFamily:"'DM Sans',sans-serif", outline:'none', boxSizing:'border-box' }}
                  onFocus={e=>e.target.style.borderColor='#0E4D92'} onBlur={e=>e.target.style.borderColor='rgba(14,77,146,0.12)'} />
              </div>
              <div style={{ marginBottom:'14px' }}>
                <label style={{ fontSize:'11px', fontWeight:600, color:'#6B8BAE', textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>Correo electrónico</label>
                <input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="usuario@empresa.com.pe" type="email"
                  style={{ width:'100%', padding:'9px 12px', border:'1px solid rgba(14,77,146,0.12)', borderRadius:'8px', fontSize:'13px', color:'#0B1F3A', fontFamily:"'DM Sans',sans-serif", outline:'none', boxSizing:'border-box' }}
                  onFocus={e=>e.target.style.borderColor='#0E4D92'} onBlur={e=>e.target.style.borderColor='rgba(14,77,146,0.12)'} />
              </div>
              <div style={{ marginBottom:'20px' }}>
                <label style={{ fontSize:'11px', fontWeight:600, color:'#6B8BAE', textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>Rol asignado</label>
                <RolSelect value={form.rol} onChange={v=>setForm(f=>({...f,rol:v}))} rolInfo={ROL_INFO}/>
                {ROL_INFO[form.rol] && (
                  <div style={{ marginTop:'8px', padding:'8px 10px', background:ROL_INFO[form.rol].bg, borderRadius:'7px', border:`1px solid ${ROL_INFO[form.rol].color}20` }}>
                    <div style={{ fontSize:'10px', fontWeight:600, color:ROL_INFO[form.rol].color, marginBottom:'4px' }}>Accesos del rol seleccionado</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'4px' }}>
                      {ROL_INFO[form.rol].modules.map(m => (
                        <span key={m} style={{ fontSize:'9px', padding:'2px 7px', background:'rgba(255,255,255,0.7)', borderRadius:'10px', color:ROL_INFO[form.rol].color, fontWeight:500 }}>{m}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div style={{ display:'flex', gap:'8px' }}>
                <button onClick={onClose} style={{ flex:1, padding:'10px', border:'1px solid rgba(14,77,146,0.1)', borderRadius:'8px', background:'#F8FAFC', color:'#6B8BAE', fontSize:'13px', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Cancelar</button>
                <button onClick={handle} disabled={!form.name||!form.email||loading}
                  style={{ flex:2, padding:'10px', border:'none', borderRadius:'8px', background: (!form.name||!form.email)?'#E2E8F0':'#0B1F3A', color: (!form.name||!form.email)?'#94A3B8':'#fff', fontSize:'13px', fontWeight:600, cursor: (!form.name||!form.email)?'not-allowed':'pointer', fontFamily:"'DM Sans',sans-serif", display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>
                  {loading
                    ? <><span style={{ width:'12px', height:'12px', border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block', animation:'lspin .7s linear infinite' }}/> Enviando...</>
                    : 'Enviar invitación →'
                  }
                </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ padding:'40px 24px', textAlign:'center' }}>
            <div style={{ width:'56px', height:'56px', borderRadius:'50%', background:'#F0FDF4', border:'1px solid #BBF7D0', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:'24px' }}>✓</div>
            <div style={{ fontSize:'16px', fontWeight:700, color:'#0B1F3A', marginBottom:'6px' }}>¡Invitación enviada!</div>
            <div style={{ fontSize:'12px', color:'#6B8BAE', marginBottom:'4px' }}><strong>{form.name}</strong> recibirá un email en</div>
            <div style={{ fontSize:'13px', fontWeight:600, color:'#0E4D92', marginBottom:'20px' }}>{form.email}</div>
            <div style={{ fontSize:'11px', color:'#94A3B8', marginBottom:'20px' }}>Rol asignado: <strong style={{ color: ROL_INFO[form.rol]?.color || '#0B1F3A' }}>{form.rol}</strong></div>
            <button onClick={onClose} style={{ padding:'9px 24px', background:'#0B1F3A', border:'none', borderRadius:'8px', color:'#fff', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Listo</button>
          </div>
        )}
      </div>
    </>
  )
}

function TabEquipo({ isProv }) {
  const [hovRow, setHovRow] = useState(null)
  const [showInvite, setShowInvite] = useState(false)
  const ROL_INFO = isProv ? ROL_INFO_PROV : ROL_INFO_RET
  const [team, setTeam] = useState((isProv ? TEAM_PROV : TEAM_RET).map(u => ({...u})))

  const roles = Object.keys(ROL_INFO)
  return (
    <div>
      <style>{`@keyframes lspin{to{transform:rotate(360deg)}} @keyframes fadeUp{from{opacity:0;transform:translate(-50%,-46%)}to{opacity:1;transform:translate(-50%,-50%)}}`}</style>
      {showInvite && <InviteModal onClose={() => setShowInvite(false)} rolInfo={ROL_INFO}/>}

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px', paddingBottom:'8px', borderBottom:'1px solid rgba(14,77,146,0.08)' }}>
        <div>
          <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A' }}>Colaboradores</div>
          <div style={{ fontSize:'11px', color:'#6B8BAE', marginTop:'2px' }}>Gestiona accesos sin compartir tu contraseña</div>
        </div>
        <button onClick={() => setShowInvite(true)}
          style={{ display:'flex', alignItems:'center', gap:'5px', padding:'8px 14px', background:'#0B1F3A', border:'none', borderRadius:'8px', color:'#fff', fontSize:'12px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
          + Invitar usuario
        </button>
      </div>

      <div style={{ border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', overflow:'hidden', marginBottom:'20px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.8fr 1.5fr 1.4fr .8fr 100px', gap:'8px', padding:'8px 16px', background:'#F8FAFC', borderBottom:'1px solid rgba(14,77,146,0.06)' }}>
          {['Nombre','Email','Rol','Estado',''].map(h => (
            <span key={h} style={{ fontSize:'9px', color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.6px', fontWeight:600 }}>{h}</span>
          ))}
        </div>
        {team.map((u,i) => (
          <div key={u.email}
            onMouseEnter={()=>setHovRow(i)} onMouseLeave={()=>setHovRow(null)}
            style={{ display:'grid', gridTemplateColumns:'1.8fr 1.5fr 1.4fr .8fr 100px', gap:'8px', padding:'11px 16px', borderBottom: i<team.length-1?'1px solid rgba(14,77,146,0.05)':'none', alignItems:'center', background: hovRow===i?'#F8FAFC':'#fff', transition:'background .1s' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'9px' }}>
              <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'#EEF5FF', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', fontWeight:700, color:'#0E4D92', flexShrink:0 }}>
                {u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
              </div>
              <span style={{ fontSize:'12px', fontWeight:500, color:'#0B1F3A' }}>{u.name}</span>
            </div>
            <span style={{ fontSize:'11px', color:'#6B8BAE' }}>{u.email}</span>
            <RolSelect value={u.rol} onChange={v => setTeam(t => t.map((x,j) => j===i?{...x,rol:v}:x))} rolInfo={ROL_INFO}/>
            <span style={{ fontSize:'10px', fontWeight:600, padding:'3px 8px', borderRadius:'20px', background: u.status==='active'?'#F0FDF4':'#FFF7ED', color: u.status==='active'?'#166534':'#C2410C', display:'inline-block' }}>
              {u.status==='active'?'Activo':'Invitado'}
            </span>
            <div style={{ display:'flex', gap:'4px', justifyContent:'flex-end' }}>
              <button style={{ fontSize:'10px', padding:'4px 8px', border:'1px solid #FEE2E2', borderRadius:'6px', background:'#FEF2F2', color:'#DC2626', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>×</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background:'#F8FAFC', border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', padding:'16px' }}>
        <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'8px' }}>Permisos por rol</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px' }}>
          {Object.entries(ROL_INFO).map(([rol, info]) => (
            <div key={rol} style={{ background:info.bg, border:`1px solid ${info.color}20`, borderRadius:'8px', padding:'12px' }}>
              <div style={{ fontSize:'11px', fontWeight:700, color:info.color, marginBottom:'8px' }}>{rol}</div>
              {info.modules.map(m => (
                <div key={m} style={{ fontSize:'10px', color:'#4B5563', marginBottom:'4px', display:'flex', gap:'5px' }}>
                  <span style={{ color:info.color, flexShrink:0 }}>✓</span>{m}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)}
      style={{ width:'40px', height:'22px', borderRadius:'11px', border:'none', background: value?'#00C2A8':'#E5E7EB', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}>
      <div style={{ width:'16px', height:'16px', borderRadius:'50%', background:'#fff', position:'absolute', top:'3px', transition:'left .2s', left: value?'21px':'3px', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }}/>
    </button>
  )
}

function TabComercial({ comercial, setComercial }) {
  const [retailSel, setRetailSel] = useState(comercial.retails[0]?.id || null)
  const retail = comercial.retails.find(r => r.id === retailSel)

  const updateRetail = (id, key, subkey, val) => {
    setComercial(c => ({...c, retails: c.retails.map(r =>
      r.id === id ? {...r, [key]: {...r[key], [subkey]: val}} : r
    )}))
  }

  const cardStyle = { background:'#fff', border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', padding:'18px 20px' }
  const rowStyle  = { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'9px 0', borderBottom:'1px solid rgba(14,77,146,0.06)' }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

      {/* Configuración global */}
      <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A', paddingBottom:'8px', borderBottom:'1px solid rgba(14,77,146,0.08)' }}>
        Configuración global — aplica a todos los retails salvo que configures uno específico
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>

        {/* Monedas globales */}
        <div style={cardStyle}>
          <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'4px' }}>Monedas permitidas</div>
          <div style={{ fontSize:'11px', color:'#6B8BAE', marginBottom:'14px' }}>El retail solo verá las monedas habilitadas al crear una OC</div>
          {[['PEN','🇵🇪 Soles (PEN)'],['USD','🇺🇸 Dólares (USD)']].map(([key,lbl]) => (
            <div key={key} style={rowStyle}>
              <span style={{ fontSize:'13px', color:'#0B1F3A' }}>{lbl}</span>
              <Toggle value={comercial.monedas[key]} onChange={v => setComercial(c => ({...c, monedas:{...c.monedas,[key]:v}}))}/>
            </div>
          ))}
          <div style={{ marginTop:'10px', padding:'7px 10px', background:'#FFFBEB', borderRadius:'7px', fontSize:'10px', color:'#D97706', border:'1px solid #FDE68A' }}>
            ⚠ TC siempre es el oficial SUNAT del día
          </div>
        </div>

        {/* Condiciones de pago globales */}
        <div style={cardStyle}>
          <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'4px' }}>Condiciones de pago</div>
          <div style={{ fontSize:'11px', color:'#6B8BAE', marginBottom:'14px' }}>Plazos que el retail puede seleccionar en una OC</div>
          {[['contado','Contado'],['d15','15 días'],['d30','30 días'],['d60','60 días'],['d90','90 días']].map(([key,lbl]) => (
            <div key={key} style={rowStyle}>
              <span style={{ fontSize:'13px', color:'#0B1F3A' }}>{lbl}</span>
              <Toggle value={comercial.pagos[key]} onChange={v => setComercial(c => ({...c, pagos:{...c.pagos,[key]:v}}))}/>
            </div>
          ))}
        </div>

        {/* Monto mínimo + Bonificaciones */}
        <div style={cardStyle}>
          <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'4px' }}>Monto mínimo de OC</div>
          <div style={{ fontSize:'11px', color:'#6B8BAE', marginBottom:'14px' }}>La OC se bloquea si no alcanza este monto</div>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px' }}>
            <span style={{ fontSize:'14px', color:'#6B8BAE', fontWeight:600 }}>S/</span>
            <input type="number" value={comercial.montoMin}
              onChange={e => setComercial(c => ({...c, montoMin: parseInt(e.target.value)||0}))}
              style={{ flex:1, padding:'8px 12px', border:'1px solid rgba(14,77,146,0.15)', borderRadius:'8px', fontSize:'14px', fontFamily:"'DM Sans',sans-serif", color:'#0B1F3A', outline:'none', fontWeight:600 }}/>
          </div>
          <div style={rowStyle}>
            <div>
              <div style={{ fontSize:'13px', color:'#0B1F3A', fontWeight:500 }}>Bonificaciones</div>
              <div style={{ fontSize:'10px', color:'#6B8BAE' }}>Permite unidades bonificadas por producto</div>
            </div>
            <Toggle value={comercial.bonificaciones} onChange={v => setComercial(c => ({...c, bonificaciones:v}))}/>
          </div>
        </div>

        {/* Resumen */}
        <div style={cardStyle}>
          <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'14px' }}>Configuración activa</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'5px', marginBottom:'14px' }}>
            {Object.entries(comercial.monedas).filter(([,v])=>v).map(([k]) => (
              <span key={k} style={{ fontSize:'10px', padding:'3px 9px', borderRadius:'10px', background:'rgba(0,194,168,0.08)', color:'#00C2A8', fontWeight:600 }}>{k}</span>
            ))}
            {Object.entries(comercial.pagos).filter(([,v])=>v).map(([k]) => (
              <span key={k} style={{ fontSize:'10px', padding:'3px 9px', borderRadius:'10px', background:'#F3F4F6', color:'#6B7280' }}>
                {k==='contado'?'Contado':k==='d15'?'15d':k==='d30'?'30d':k==='d60'?'60d':'90d'}
              </span>
            ))}
            <span style={{ fontSize:'10px', padding:'3px 9px', borderRadius:'10px', background:'#F3F4F6', color:'#6B7280' }}>Min S/{comercial.montoMin}</span>
            {comercial.bonificaciones && <span style={{ fontSize:'10px', padding:'3px 9px', borderRadius:'10px', background:'#F0FDF4', color:'#16A34A' }}>Bonif. ✓</span>}
          </div>
          <button style={{ width:'100%', padding:'10px', border:'none', borderRadius:'8px', background:'#0B1F3A', color:'#fff', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
            Guardar configuración global
          </button>
        </div>
      </div>

      {/* Gestión de inventario */}
      <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A', paddingBottom:'8px', borderTop:'1px solid rgba(14,77,146,0.08)', paddingTop:'16px', marginTop:'4px' }}>
        Gestión de inventario
      </div>

      <div style={{ background:'#fff', border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', padding:'18px 20px', marginBottom:'4px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' }}>
          <div>
            <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A', marginBottom:'3px' }}>
              {comercial.stockManual ? '📦 Gestión de stock manual activa' : '🔗 Stock sincronizado desde SAP'}
            </div>
            <div style={{ fontSize:'11px', color:'#6B8BAE', lineHeight:1.5 }}>
              {comercial.stockManual
                ? 'Puedes editar el stock de cada SKU directamente en el Catálogo de NEXO'
                : 'El stock se consulta automáticamente desde SAP en tiempo real. No requiere gestión manual.'}
            </div>
          </div>
          <Toggle value={comercial.stockManual} onChange={v => setComercial(c => ({...c, stockManual:v}))}/>
        </div>

        {/* Banner contextual */}
        {comercial.stockManual ? (
          <div style={{ padding:'10px 14px', background:'#FFF7ED', border:'1px solid #FED7AA', borderRadius:'8px', fontSize:'11px', color:'#C2410C', lineHeight:1.5 }}>
            ⚠ <strong>Modo manual activo</strong> — El stock en el Catálogo es editable. Recuerda mantenerlo actualizado para evitar OCs con productos sin disponibilidad.
          </div>
        ) : (
          <div style={{ padding:'10px 14px', background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:'8px', fontSize:'11px', color:'#166534', lineHeight:1.5 }}>
            ✓ <strong>Integración SAP activa</strong> — El stock se actualiza automáticamente. No necesitas hacer nada.
          </div>
        )}
      </div>

      {/* Config por retail */}
      <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A', paddingBottom:'8px', borderTop:'1px solid rgba(14,77,146,0.08)', paddingTop:'16px' }}>
        Configuración por retail — sobreescribe la configuración global para ese retail específico
      </div>

      <div style={{ display:'flex', gap:'8px', marginBottom:'4px' }}>
        {comercial.retails.map(r => (
          <button key={r.id} onClick={() => setRetailSel(r.id)}
            style={{ padding:'6px 14px', borderRadius:'8px', border:`1px solid ${retailSel===r.id?'rgba(0,194,168,0.3)':'rgba(14,77,146,0.1)'}`, background: retailSel===r.id?'rgba(0,194,168,0.08)':'#fff', color: retailSel===r.id?'#00C2A8':'#6B8BAE', fontSize:'12px', fontWeight: retailSel===r.id?600:400, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
            {r.name}
          </button>
        ))}
      </div>

      {retail && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
          <div style={cardStyle}>
            <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'14px' }}>Monedas — {retail.name}</div>
            {[['PEN','🇵🇪 Soles (PEN)'],['USD','🇺🇸 Dólares (USD)']].map(([key,lbl]) => (
              <div key={key} style={rowStyle}>
                <span style={{ fontSize:'13px', color:'#0B1F3A' }}>{lbl}</span>
                <Toggle value={retail.monedas[key]} onChange={v => updateRetail(retail.id,'monedas',key,v)}/>
              </div>
            ))}
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'14px' }}>Condiciones de pago — {retail.name}</div>
            {[['contado','Contado'],['d15','15 días'],['d30','30 días'],['d60','60 días'],['d90','90 días']].map(([key,lbl]) => (
              <div key={key} style={rowStyle}>
                <span style={{ fontSize:'13px', color:'#0B1F3A' }}>{lbl}</span>
                <Toggle value={retail.pagos[key]} onChange={v => updateRetail(retail.id,'pagos',key,v)}/>
              </div>
            ))}
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'14px' }}>Monto mínimo — {retail.name}</div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <span style={{ fontSize:'14px', color:'#6B8BAE', fontWeight:600 }}>S/</span>
              <input type="number" value={retail.montoMin}
                onChange={e => setComercial(c => ({...c, retails: c.retails.map(r => r.id===retail.id?{...r,montoMin:parseInt(e.target.value)||0}:r)}))}
                style={{ flex:1, padding:'8px 12px', border:'1px solid rgba(14,77,146,0.15)', borderRadius:'8px', fontSize:'14px', fontFamily:"'DM Sans',sans-serif", color:'#0B1F3A', outline:'none', fontWeight:600 }}/>
            </div>
          </div>
          <div style={{ ...cardStyle, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <button style={{ padding:'10px 20px', border:'none', borderRadius:'8px', background:'#0B1F3A', color:'#fff', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              Guardar config de {retail.name}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


function TabBillingRetail() {
  const [slider, setSlider] = useState(0)
  const [showContact, setShowContact] = useState(false)

  const STEPS = [
    {
      id: 'intro',
      label: 'Introducción',
      precio: 'S/ 399',
      period: '/ mes',
      badge: 'Precio de introducción',
      badgeBg: '#FFF7ED', badgeColor: '#C2410C',
      tag: '🎯 Precio especial de lanzamiento',
      tagBg: '#FFF7ED', tagColor: '#C2410C',
      desc: 'Ideal para retails en proceso de digitalización. Entra a NEXO con condiciones especiales de lanzamiento.',
      dark: false,
      accent: '#0E4D92',
      features: [
        { txt: 'Hasta 50 proveedores activos' },
        { txt: 'Hasta 2,000 OCs / mes' },
        { txt: 'S/ 0.25 por OC adicional' },
        { txt: 'Portal web + mobile' },
        { txt: 'API REST básica' },
        { txt: 'Soporte por email (48h)' },
        { txt: 'Trazabilidad básica (5 etapas)' },
      ],
      cta: null,
      note: '* Precio de introducción válido para los primeros retails que se unan a la red NEXO. Precio de mercado estimado: S/ 3,500/mes.'
    },
    {
      id: 'growth',
      label: 'Crecimiento',
      precio: 'S/ 799',
      period: '/ mes',
      badge: 'Precio estimado',
      badgeBg: 'rgba(0,245,160,0.15)', badgeColor: '#065F46',
      tag: '📈 Precio referencial de mercado',
      tagBg: 'rgba(0,245,160,0.1)', tagColor: '#00F5A0',
      desc: 'Para retails con operación establecida y múltiples proveedores. Trazabilidad completa y soporte prioritario.',
      dark: true,
      accent: '#00F5A0',
      features: [
        { txt: 'Hasta 200 proveedores activos' },
        { txt: 'Hasta 10,000 OCs / mes' },
        { txt: 'S/ 0.15 por OC adicional' },
        { txt: 'Portal web + mobile + PWA' },
        { txt: 'API avanzada + soporte integración' },
        { txt: 'Trazabilidad completa (9 etapas)' },
        { txt: 'Soporte prioritario (SLA 4h)' },
        { txt: 'Reportes y analytics' },
        { txt: 'Ejecutivo de cuenta asignado' },
      ],
      cta: 'Hablar con el equipo →',
      note: '* Precio estimado referencial. El precio final se define según volumen y requerimientos de integración.'
    },
    {
      id: 'enterprise',
      label: 'Implementación',
      precio: null,
      period: null,
      badge: 'A medida',
      badgeBg: '#F5F3FF', badgeColor: '#7C3AED',
      tag: '🏗️ Proyecto de integración',
      tagBg: '#F5F3FF', tagColor: '#7C3AED',
      desc: 'Para grandes retails con ERP corporativo (SAP, Oracle) que requieren integración EDI y soporte 24/7.',
      dark: false,
      accent: '#7C3AED',
      features: [
        { txt: 'Proveedores ilimitados' },
        { txt: 'OCs ilimitadas' },
        { txt: 'Integración EDI a medida' },
        { txt: 'Conexión ERP (SAP / Oracle)' },
        { txt: 'Soporte 24/7 con ejecutivo dedicado' },
        { txt: 'SLA garantizado por contrato' },
        { txt: 'Onboarding técnico incluido' },
        { txt: 'Setup fee: S/ 15,000 - S/ 30,000' },
      ],
      cta: null,
    },
  ]

  const step = STEPS[slider]

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@keyframes planFadeR{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}} .plan-card-r{animation:planFadeR .25s ease both}`}</style>

      {/* Tabs underline */}
      <div style={{ display:'flex', borderBottom:'1px solid rgba(14,77,146,0.1)', marginBottom:'24px' }}>
        {STEPS.map((s,i) => (
          <button key={s.id} onClick={() => setSlider(i)}
            style={{ padding:'10px 24px', border:'none', background:'transparent', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight: slider===i?600:400, color: slider===i?'#0B1F3A':'#94A3B8', borderBottom: slider===i?'2px solid #0B1F3A':'2px solid transparent', marginBottom:'-1px', transition:'all .2s' }}>
            {s.label}
            {s.id === 'intro' && (
              <span style={{ marginLeft:'6px', fontSize:'9px', fontWeight:600, padding:'2px 6px', borderRadius:'8px', background:'#FFF7ED', color:'#C2410C', verticalAlign:'middle' }}>Activo</span>
            )}
          </button>
        ))}
      </div>

      {/* Plan card */}
      <div className="plan-card-r" key={step.id} style={{ borderRadius:'16px', overflow:'hidden', marginBottom:'20px', boxShadow: step.dark?'0 8px 32px rgba(14,77,146,0.25)':'0 4px 16px rgba(14,77,146,0.08)', border: step.dark?'none':'1px solid rgba(14,77,146,0.1)' }}>

        {/* Header */}
        <div style={{ padding:'28px 32px 24px', background: step.dark?'linear-gradient(135deg,#0B1F3A,#0E4D92)':'#fff' }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'12px' }}>
            <span style={{ fontSize:'10px', fontWeight:700, padding:'3px 10px', borderRadius:'10px', background:step.badgeBg, color:step.badgeColor, letterSpacing:'.5px', textTransform:'uppercase' }}>
              {step.badge}
            </span>
            <span style={{ fontSize:'10px', fontWeight:600, padding:'3px 10px', borderRadius:'10px', background:step.tagBg, color:step.tagColor }}>
              {step.tag}
            </span>
          </div>

          {step.precio ? (
            <>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:'36px', fontWeight:900, color: step.dark?step.accent:'#0B1F3A', lineHeight:1, marginBottom:'4px' }}>
                {step.precio}
              </div>
              <div style={{ fontSize:'12px', color: step.dark?'rgba(255,255,255,0.4)':'#94A3B8', marginBottom:'12px' }}>{step.period} · Sin IGV · facturación mensual</div>
            </>
          ) : (
            <div style={{ fontFamily:"'Fraunces',serif", fontSize:'24px', fontWeight:900, color:'#7C3AED', lineHeight:1, marginBottom:'16px' }}>
              Precio a medida
            </div>
          )}

          <div style={{ fontSize:'13px', color: step.dark?'rgba(255,255,255,0.6)':'#6B7280', lineHeight:1.5 }}>
            {step.desc}
          </div>
        </div>

        {/* Features */}
        <div style={{ padding:'24px 32px', background: step.dark?'rgba(11,31,58,0.97)':'#FAFBFF', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px 24px' }}>
          {step.features.map((f,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'12px', color: step.dark?'rgba(255,255,255,0.8)':'#374151' }}>
              <span style={{ color:step.accent, flexShrink:0, fontSize:'14px', fontWeight:700 }}>✓</span>{f.txt}
            </div>
          ))}
        </div>

        {/* CTA / Note */}
        <div style={{ padding:'20px 32px', background: step.dark?'rgba(11,31,58,0.97)':'#fff', borderTop:`1px solid ${step.dark?'rgba(255,255,255,0.06)':'rgba(14,77,146,0.06)'}` }}>
          {step.id === 'enterprise' ? (
            <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'2px' }}>¿Necesitas una integración a medida?</div>
                <div style={{ fontSize:'11px', color:'#6B8BAE' }}>Cuéntanos tu infraestructura y te preparamos una propuesta en 48h.</div>
              </div>
              <a href="https://wa.me/51931067775?text=Hola,%20me%20interesa%20una%20integración%20EDI/ERP%20para%20mi%20retail%20en%20NEXO"
                target="_blank" rel="noreferrer"
                style={{ display:'flex', alignItems:'center', gap:'8px', padding:'10px 20px', background:'#25D366', border:'none', borderRadius:'10px', color:'#fff', fontSize:'13px', fontWeight:700, cursor:'pointer', textDecoration:'none', fontFamily:"'DM Sans',sans-serif", flexShrink:0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Hablar con el equipo
              </a>
            </div>
          ) : step.id === 'growth' ? (
            <div>
              <a href="https://wa.me/51931067775?text=Hola,%20me%20interesa%20el%20plan%20de%20crecimiento%20para%20mi%20retail%20en%20NEXO"
                target="_blank" rel="noreferrer"
                style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', padding:'12px', background:'#00F5A0', border:'none', borderRadius:'10px', color:'#0B1F3A', fontSize:'14px', fontWeight:700, cursor:'pointer', textDecoration:'none', fontFamily:"'DM Sans',sans-serif", marginBottom:'10px' }}>
                Hablar con el equipo →
              </a>
              {step.note && <div style={{ fontSize:'10px', color:'#94A3B8', textAlign:'center', lineHeight:1.5 }}>{step.note}</div>}
            </div>
          ) : (
            <div>
              <div style={{ fontSize:'12px', color:'#6B8BAE', textAlign:'center', lineHeight:1.6, marginBottom:'8px' }}>
                Plan activo · <span onClick={() => setSlider(1)} style={{ color:'#0E4D92', cursor:'pointer', fontWeight:600 }}>Ver plan de Crecimiento →</span>
              </div>
              {step.note && <div style={{ fontSize:'10px', color:'#94A3B8', textAlign:'center', lineHeight:1.5, padding:'8px 12px', background:'#FFF7ED', borderRadius:'8px', border:'1px solid #FED7AA' }}>{step.note}</div>}
            </div>
          )}
        </div>
      </div>

      {/* Método de pago */}
      <div style={{ background:'#F8FAFC', border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', padding:'16px', marginBottom:'20px' }}>
        <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'12px' }}>Método de pago</div>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'40px', height:'26px', background:'#1A1F71', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:'8px', color:'#fff', fontWeight:700 }}>VISA</span>
          </div>
          <div>
            <div style={{ fontSize:'12px', fontWeight:500, color:'#0B1F3A' }}>•••• •••• •••• 4242</div>
            <div style={{ fontSize:'10px', color:'#94A3B8' }}>Vence 12/2026</div>
          </div>
          <button style={{ marginLeft:'auto', fontSize:'11px', color:'#0E4D92', background:'none', border:'1px solid rgba(14,77,146,0.2)', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Cambiar</button>
        </div>
      </div>

      {/* Historial */}
      <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A', marginBottom:'12px', paddingBottom:'8px', borderBottom:'1px solid rgba(14,77,146,0.08)' }}>Historial de facturas</div>
      <div style={{ border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 80px', gap:'8px', padding:'8px 14px', background:'#F8FAFC', borderBottom:'1px solid rgba(14,77,146,0.06)' }}>
          {['Factura','Fecha','Monto',''].map(h => (
            <span key={h} style={{ fontSize:'9px', color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.6px', fontWeight:600 }}>{h}</span>
          ))}
        </div>
        {[
          { id:'INV-2025-003', fecha:'01 Mar 2025', monto:'S/ 399' },
          { id:'INV-2025-002', fecha:'01 Feb 2025', monto:'S/ 399' },
          { id:'INV-2025-001', fecha:'01 Ene 2025', monto:'S/ 399' },
        ].map((inv,i,arr) => (
          <div key={inv.id} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 80px', gap:'8px', padding:'10px 14px', borderBottom: i<arr.length-1?'1px solid rgba(14,77,146,0.05)':'none', alignItems:'center' }}>
            <span style={{ fontSize:'11px', fontWeight:600, color:'#0B1F3A', fontFamily:'monospace' }}>{inv.id}</span>
            <span style={{ fontSize:'11px', color:'#6B8BAE' }}>{inv.fecha}</span>
            <span style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A' }}>{inv.monto}</span>
            <button style={{ fontSize:'10px', color:'#0E4D92', background:'#EEF5FF', border:'none', borderRadius:'5px', padding:'4px 8px', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>PDF ↓</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PerfilView({ role }) {
  const [tab, setTab] = useState('empresa')
  const isProv = role === 'prov'
  const TABS = isProv ? TABS_PROV : TABS_RET

  const [comercial, setComercial] = useState({
    monedas:  { PEN: true, USD: false },
    pagos:    { contado: true, d15: true, d30: true, d60: false, d90: false },
    montoMin: 500,
    bonificaciones: true,
    retails: [
      { id:2, name:'Wong S.A.',   monedas:{ PEN:true, USD:false }, pagos:{ contado:true, d15:true, d30:true, d60:false, d90:false }, montoMin:500 },
      { id:3, name:'Tottus Perú', monedas:{ PEN:true, USD:false }, pagos:{ contado:false, d15:false, d30:true, d60:true, d90:false }, montoMin:1000 },
    ]
  })

  return (
    <div style={{ maxWidth:'1100px', margin:'0 auto', fontFamily:"'DM Sans',sans-serif" }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'24px', padding:'20px 24px', background:'#fff', borderRadius:'12px', border:'1px solid rgba(14,77,146,0.08)', boxShadow:'0 1px 4px rgba(14,77,146,0.06)' }}>
        <div style={{ width:'48px', height:'48px', borderRadius:'12px', background: isProv?'#EEF5FF':'#EAF3DE', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', fontWeight:700, color: isProv?'#0E4D92':'#166534', fontFamily:"'Fraunces',serif", flexShrink:0 }}>
          {isProv ? 'AC' : 'WG'}
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:'16px', fontWeight:700, color:'#0B1F3A', fontFamily:"'Fraunces',serif" }}>
            {isProv ? 'Arca Continental' : 'Wong S.A.'}
          </div>
          <div style={{ fontSize:'12px', color:'#6B8BAE', marginTop:'2px' }}>
            {isProv ? 'RUC 20100128954 · Proveedor · Plan Enterprise' : 'RUC 20492092313 · Retail · Plan Enterprise'}
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'6px', padding:'5px 12px', background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:'20px' }}>
          <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#16A34A' }}/>
          <span style={{ fontSize:'11px', color:'#166534', fontWeight:600 }}>Cuenta activa</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:'2px', marginBottom:'20px', background:'#fff', padding:'4px', borderRadius:'10px', border:'1px solid rgba(14,77,146,0.08)', width:'fit-content' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ display:'flex', alignItems:'center', gap:'7px', padding:'8px 16px', borderRadius:'7px', border:'none', background: tab===t.id?'#0B1F3A':'transparent', color: tab===t.id?'#fff':'#6B8BAE', fontSize:'12px', fontWeight: tab===t.id?600:400, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'all .15s', whiteSpace:'nowrap' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d={t.icon}/>
            </svg>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ background:'#fff', borderRadius:'12px', border:'1px solid rgba(14,77,146,0.08)', padding:'24px', boxShadow:'0 1px 4px rgba(14,77,146,0.06)' }}>
        {tab === 'empresa'  && <TabEmpresa/>}
        {tab === 'billing'   && (isProv ? <TabBilling/> : <TabBillingRetail/>)}
        {tab === 'api'      && <TabAPI role={role}/>}
        {tab === 'equipo'   && <TabEquipo isProv={isProv}/>}
        {tab === 'comercial' && isProv && <TabComercial comercial={comercial} setComercial={setComercial}/>}
      </div>
    </div>
  )
}
