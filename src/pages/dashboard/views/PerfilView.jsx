import { useState, useRef } from 'react'

const TABS = [
  { id: 'empresa',      label: 'Datos de la Empresa',   icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { id: 'billing',      label: 'Plan & Suscripción',    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { id: 'api',          label: 'Conectividad & API',    icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
  { id: 'equipo',       label: 'Mi Equipo',             icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
]

const TEAM = [
  { name:'Ricardo Torres',  email:'r.torres@arca.com.pe',  rol:'Admin de Ventas',      status:'active' },
  { name:'Claudia Mendoza', email:'c.mendoza@arca.com.pe', rol:'Facturador / Contador', status:'active' },
  { name:'Jorge Pinto',     email:'j.pinto@arca.com.pe',   rol:'Tesorero',             status:'active' },
  { name:'Sandra López',    email:'s.lopez@arca.com.pe',   rol:'Facturador / Contador', status:'invited' },
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
      badge: 'Plan actual',
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
        { txt:'Conexión directa con tu sistema (API OC)' },
        { txt:'Soporte por email (48h)' },
      ],
      cta: null,
    },
    {
      id: 'pro',
      label: 'Professional',
      precio: 'S/ 2,900',
      period: '/ mes · Sin IGV',
      badge: 'Recomendado',
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
        { txt:'Conexión OSE/SUNAT (Nubefact)' },
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
      desc: 'Módulos personalizados para tu operación. Integraciones ERP, Factoring, EDI y más.',
      accent: '#F59E0B',
      accentLight: '#FFF7ED',
      dark: false,
      features: [
        { txt:'Integración ERP (SAP / Oracle / Odoo)' },
        { txt:'Módulo Factoring / Cobro inmediato' },
        { txt:'EDI con retail específico' },
        { txt:'Reportes analíticos avanzados' },
        { txt:'Webhooks + API Keys Enterprise' },
        { txt:'Dashboard personalizado' },
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
            {s.id === 'starter' && (
              <span style={{ marginLeft:'6px', fontSize:'9px', fontWeight:600, padding:'2px 6px', borderRadius:'8px', background:'#EEF5FF', color:'#0E4D92', verticalAlign:'middle' }}>Activo</span>
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
              <div style={{ fontSize:'12px', color:'#94A3B8' }}>Este es tu plan actual</div>
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


function TabAPI() {
  const [showToken, setShowToken] = useState(false)
  const [copied, setCopied] = useState(false)
  const token = 'nxo_live_sk_4f8e2a1b9c3d7f6e5a2b8c4d1e9f3a7b'
  const copy = () => { navigator.clipboard?.writeText(token); setCopied(true); setTimeout(()=>setCopied(false),2000) }

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px' }}>
      <div>
        <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A', marginBottom:'16px', paddingBottom:'8px', borderBottom:'1px solid rgba(14,77,146,0.08)' }}>Credenciales SUNAT / OSE</div>

        <div style={{ padding:'10px 12px', background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:'8px', fontSize:'11px', color:'#166534', marginBottom:'16px', lineHeight:1.5 }}>
          ✓ Conexión con Nubefact activa · Última sincronización hace 3 min
        </div>

        <Field label="Proveedor OSE" value="Nubefact"/>
        <Field label="Token de API Nubefact" value="nubefact_tk_••••••••••••3f8a" hint="Ingresa el token de tu cuenta en nubefact.com"/>
        <Field label="RUC secundario SUNAT" value="20100128954" locked/>
        <Field label="Clave SOL (solo lectura)" value="••••••••" hint="Usada para consultar CDR automáticamente"/>
        <SaveBtn label="Guardar credenciales"/>
      </div>

      <div>
        <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A', marginBottom:'16px', paddingBottom:'8px', borderBottom:'1px solid rgba(14,77,146,0.08)', display:'flex', alignItems:'center', gap:'8px' }}>
          API Keys & Webhooks
          <span style={{ fontSize:'10px', background:'#F5F3FF', color:'#7C3AED', padding:'2px 7px', borderRadius:'6px', fontWeight:500 }}>Enterprise</span>
        </div>

        <div style={{ background:'#F8FAFC', border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', padding:'16px', marginBottom:'16px' }}>
          <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'10px' }}>API Key de producción</div>
          <div style={{ display:'flex', gap:'8px' }}>
            <div style={{ flex:1, padding:'8px 12px', background:'#fff', border:'1px solid rgba(14,77,146,0.12)', borderRadius:'7px', fontSize:'11px', fontFamily:'monospace', color:'#0B1F3A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {showToken ? token : 'nxo_live_sk_••••••••••••••••••••••••••••••'}
            </div>
            <button onClick={()=>setShowToken(!showToken)} style={{ padding:'8px 10px', border:'1px solid rgba(14,77,146,0.12)', borderRadius:'7px', background:'#fff', cursor:'pointer', fontSize:'12px' }}>
              {showToken?'🙈':'👁'}
            </button>
            <button onClick={copy} style={{ padding:'8px 12px', border:'none', borderRadius:'7px', background: copied?'#166534':'#0B1F3A', color:'#fff', fontSize:'11px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'background .2s' }}>
              {copied?'✓':'Copiar'}
            </button>
          </div>
          <div style={{ fontSize:'10px', color:'#94A3B8', marginTop:'6px' }}>Úsala en el header: <code style={{ background:'#F1F5F9', padding:'1px 5px', borderRadius:'3px' }}>Authorization: Bearer &lt;API_KEY&gt;</code></div>
        </div>

        <div style={{ background:'#F8FAFC', border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', padding:'16px' }}>
          <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'10px' }}>Webhook URL</div>
          <Field label="Endpoint de notificaciones" value="https://erp.arcacontinental.pe/nexo/webhook" hint="Recibirás un POST cuando el Retail apruebe una Orden de Pago"/>
          <div style={{ display:'flex', gap:'8px', marginTop:'-8px' }}>
            <SaveBtn label="Guardar webhook"/>
            <button style={{ padding:'9px 14px', border:'1px solid rgba(14,77,146,0.15)', borderRadius:'8px', background:'transparent', color:'#0E4D92', fontSize:'12px', fontWeight:500, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              Probar envío
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ROL_INFO = {
  'Admin de Ventas':      { desc:'Acceso completo a todos los módulos', modules:['Catálogo','OCs','Despachos','Financiero','Reportes','API','Billing','Usuarios'], color:'#7C3AED', bg:'#F5F3FF' },
  'Facturador / Contador':{ desc:'Emite y gestiona documentos fiscales', modules:['Ver OCs entrantes','Generar XML factura','Subir a SUNAT','Ver estado documentos'], color:'#0E4D92', bg:'#EEF5FF' },
  'Tesorero':             { desc:'Gestiona pagos y factoring', modules:['Ver Órdenes de Pago','Cobro Inmediato','Factoring','Reportes financieros'], color:'#166534', bg:'#F0FDF4' },
}

function RolSelect({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [tooltip, setTooltip] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ top:0, left:0 })
  const btnRef = useRef(null)

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

function InviteModal({ onClose }) {
  const [form, setForm] = useState({ name:'', email:'', rol:'Facturador / Contador' })
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
                <RolSelect value={form.rol} onChange={v=>setForm(f=>({...f,rol:v}))}/>
                <div style={{ marginTop:'8px', padding:'8px 10px', background:ROL_INFO[form.rol].bg, borderRadius:'7px', border:`1px solid ${ROL_INFO[form.rol].color}20` }}>
                  <div style={{ fontSize:'10px', fontWeight:600, color:ROL_INFO[form.rol].color, marginBottom:'4px' }}>Accesos del rol seleccionado</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'4px' }}>
                    {ROL_INFO[form.rol].modules.map(m => (
                      <span key={m} style={{ fontSize:'9px', padding:'2px 7px', background:'rgba(255,255,255,0.7)', borderRadius:'10px', color:ROL_INFO[form.rol].color, fontWeight:500 }}>{m}</span>
                    ))}
                  </div>
                </div>
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
            <div style={{ fontSize:'11px', color:'#94A3B8', marginBottom:'20px' }}>Rol asignado: <strong style={{ color:ROL_INFO[form.rol].color }}>{form.rol}</strong></div>
            <button onClick={onClose} style={{ padding:'9px 24px', background:'#0B1F3A', border:'none', borderRadius:'8px', color:'#fff', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Listo</button>
          </div>
        )}
      </div>
    </>
  )
}

function TabEquipo() {
  const [hovRow, setHovRow] = useState(null)
  const [showInvite, setShowInvite] = useState(false)
  const [team, setTeam] = useState(TEAM.map(u => ({...u})))

  return (
    <div>
      <style>{`@keyframes lspin{to{transform:rotate(360deg)}} @keyframes fadeUp{from{opacity:0;transform:translate(-50%,-46%)}to{opacity:1;transform:translate(-50%,-50%)}}`}</style>
      {showInvite && <InviteModal onClose={() => setShowInvite(false)}/>}

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
            <RolSelect value={u.rol} onChange={v => setTeam(t => t.map((x,j) => j===i?{...x,rol:v}:x))}/>
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
          {[
            { rol:'Facturador / Contador', perms:['Ver OCs entrantes','Generar XML factura','Subir factura a SUNAT','Ver estado de documentos'], color:'#0E4D92', bg:'#EEF5FF' },
            { rol:'Tesorero', perms:['Todo lo anterior','Ver Órdenes de Pago','Solicitar Cobro Inmediato','Acceder a Factoring'], color:'#166534', bg:'#F0FDF4' },
            { rol:'Admin de Ventas', perms:['Acceso completo','Gestionar usuarios','Configurar API','Ver billing'], color:'#7C3AED', bg:'#F5F3FF' },
          ].map(r => (
            <div key={r.rol} style={{ background:r.bg, border:`1px solid ${r.color}20`, borderRadius:'8px', padding:'12px' }}>
              <div style={{ fontSize:'11px', fontWeight:700, color:r.color, marginBottom:'8px' }}>{r.rol}</div>
              {r.perms.map(p => (
                <div key={p} style={{ fontSize:'10px', color:'#4B5563', marginBottom:'4px', display:'flex', gap:'5px' }}>
                  <span style={{ color:r.color, flexShrink:0 }}>✓</span>{p}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PerfilView({ role }) {
  const [tab, setTab] = useState('empresa')
  const isProv = role === 'prov'

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
        {tab === 'billing'  && <TabBilling/>}
        {tab === 'api'      && <TabAPI/>}
        {tab === 'equipo'   && <TabEquipo/>}
      </div>
    </div>
  )
}
