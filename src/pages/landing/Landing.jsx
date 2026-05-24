import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'

function LiveBadge() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const hours = time.getHours().toString().padStart(2, '0')
  const mins = time.getMinutes().toString().padStart(2, '0')
  const secs = time.getSeconds().toString().padStart(2, '0')

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '7px 18px', borderRadius: '100px', border: '1px solid rgba(0,245,160,0.2)', background: 'rgba(0,245,160,0.05)', fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px', fontWeight: 400, letterSpacing: '0.3px' }}>
      <span style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
        <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#00F5A0', animation: 'dotPulse 1.5s ease-in-out infinite' }} />
        <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#00F5A0' }} />
      </span>
      <span style={{ color: '#00F5A0', fontWeight: 600 }}>Sistema activo</span>
      <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
      <span>Lima, Perú</span>
      <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
      <span style={{ fontFamily: 'monospace', fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>{hours}:{mins}:{secs}</span>
    </div>
  )
}

const t = {
  es: {
    badge: 'Plataforma O2P para Latinoamérica',
    h1a: 'De la orden al cobro,',
    h1b: 'sin fricción.',
    sub: 'Conectamos proveedores y cadenas comerciales en un único flujo digital. Trazabilidad total, cero papel, cero errores manuales.',
    cta1: 'Explorar plataforma',
    cta2: 'Solicitar reunión',
    chains: 'Conectando las principales cadenas del Perú',
    why: 'Por qué NEXO',
    whyTitle: 'Todo lo que necesitas.\nNada de lo que no.',
    features: [
      ['Catálogo inteligente', 'Gestiona SKUs y precios diferenciados por cadena. Datos visibles de entrada, sin búsqueda obligatoria.', 'Sin búsqueda obligatoria'],
      ['Trazabilidad completa', 'Timeline visual en lenguaje de negocio. Sin jerga técnica.', '9 etapas trazadas'],
      ['Reportes sin expiración', 'Descarga cualquier reporte cuando quieras. Sin correos, sin links que vencen.', 'Siempre disponibles'],
      ['Integración ERP nativa', 'Compatible con SAP, Oracle y Odoo. Cero doble digitación.', 'API REST + EDI'],
      ['Dos roles, una plataforma', 'Vista completa para proveedores. Vista enfocada para retails.', 'Proveedor + Retail'],
      ['Onboarding en minutos', 'Sin manuales PDF. La plataforma te guía desde el primer login.', 'vs Carvajal'],
    ],
    model: 'Modelo de red',
    modelTitle: 'Un ecosistema.\nDos experiencias.',
    provBadge: 'Proveedor', retBadge: 'Retail',
    provTitle: 'Arca Continental', retTitle: 'Retail · Mayoristas · Institucional',
    provSub: 'Vista completa de operaciones', retSub: 'Vista enfocada en sus pedidos',
    provItems: ['Catálogo + listas de precios por cadena', 'OCs entrantes de todos los retails', 'Gestión de despachos y recepciones', 'Documentos financieros y facturación', 'Reportes analíticos sin expiración', 'Trazabilidad completa por documento'],
    retItems: ['Creación de órdenes de compra', 'Estado en tiempo real de sus pedidos', 'Confirmación de recepciones', 'Gestión de devoluciones', 'Facturas y estado de pagos', 'Centro de ayuda integrado'],
    statsLabel: 'NEXO en números',
    statsTitle: 'Resultados que\nse miden.',
    stats: [['96%', 'Fill rate promedio'], ['< 3s', 'Procesamiento EDI'], ['0', 'Reportes con expiración'], ['100%', 'Trazabilidad total']],
    ctaTitle: 'La plataforma O2P\nque tu operación merece.',
    ctaSub: 'Trazabilidad total, cero fricción, dos roles en una sola plataforma.',
    ctaBtn: 'Entrar al dashboard',
    footer: 'NEXO powered by instamovil.com 2025',
    privacy: 'Política de privacidad',
    terms: 'Términos y condiciones',
    flowItems: [['OC', 'Orden de Compra'], ['ASN', 'Aviso de Despacho'], ['AR', 'Aviso de Recibo'], ['DEV', 'Devoluciones'], ['FAC', 'Facturación'], ['PAG', 'Cobro']],
  },
  en: {
    badge: 'O2P Platform for Latin America',
    h1a: 'From order to payment,',
    h1b: 'without friction.',
    sub: 'We connect suppliers and retail chains in a single digital flow. Full traceability, zero paper, zero manual errors.',
    cta1: 'Explore platform',
    cta2: 'Request a meeting',
    chains: 'Connecting the leading chains in Peru',
    why: 'Why NEXO',
    whyTitle: 'Everything you need.\nNothing you don\'t.',
    features: [
      ['Smart Catalog', 'Manage SKUs and differentiated prices per chain. All products visible upfront.', 'No mandatory search'],
      ['Full Traceability', 'Visual timeline in business language. No technical jargon.', '9 tracked stages'],
      ['Reports without expiry', 'Download any report whenever you want. No emails, no expiring links.', 'Always available'],
      ['Native ERP Integration', 'Compatible with SAP, Oracle and Odoo. Zero double entry.', 'API REST + EDI'],
      ['Two roles, one platform', 'Full view for suppliers. Focused view for retailers.', 'Supplier + Retail'],
      ['Onboarding in minutes', 'No PDF manuals. The platform guides you from first login.', 'vs Carvajal'],
    ],
    model: 'Network model',
    modelTitle: 'One ecosystem.\nTwo experiences.',
    provBadge: 'Supplier', retBadge: 'Retail',
    provTitle: 'Arca Continental', retTitle: 'Retail · Mayoristas · Institucional',
    provSub: 'Full operations view', retSub: 'Focused on their orders',
    provItems: ['Catalog + price lists per chain', 'Incoming POs from all retailers', 'Dispatch and receipt management', 'Financial documents and invoicing', 'Analytics reports without expiry', 'Full traceability per document'],
    retItems: ['Purchase order creation', 'Real-time status of their orders', 'Receipt confirmation', 'Returns management', 'Invoices and payment status', 'Integrated help center'],
    statsLabel: 'NEXO in numbers',
    statsTitle: 'Results that\nare measured.',
    stats: [['96%', 'Average fill rate'], ['< 3s', 'EDI processing'], ['0', 'Reports with expiry'], ['100%', 'Full traceability']],
    ctaTitle: 'The O2P platform\nyour operation deserves.',
    ctaSub: 'Full traceability, zero friction, two roles in one platform.',
    ctaBtn: 'Enter dashboard',
    footer: 'NEXO powered by instamovil.com 2025',
    privacy: 'Privacy policy',
    terms: 'Terms and conditions',
    flowItems: [['PO', 'Purchase Order'], ['ASN', 'Shipping Notice'], ['AR', 'Receipt Notice'], ['RET', 'Returns'], ['INV', 'Invoicing'], ['PAY', 'Payment']],
  }
}

export default function Landing() {
  const navigate = useNavigate()
  const [lang, setLang] = useState('es')
  const [dark, setDark] = useState(true)
  const [hovCta1, setHovCta1] = useState(false)
  const [hovCta2, setHovCta2] = useState(false)
  const tx = t[lang]

  const bg = dark ? '#060C16' : '#F8FAFF'
  const fg = dark ? '#fff' : '#0B1F3A'
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(11,31,58,0.55)'
  const card = dark ? 'rgba(255,255,255,0.03)' : '#fff'
  const cardBorder = dark ? 'rgba(255,255,255,0.07)' : 'rgba(14,77,146,0.1)'
  const sectionBg = dark ? 'rgba(255,255,255,0.02)' : 'rgba(14,77,146,0.02)'
  const sectionBorder = dark ? 'rgba(255,255,255,0.06)' : 'rgba(14,77,146,0.08)'

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: bg, color: fg, overflowX: 'hidden', transition: 'background .3s, color .3s' }}>
      <style>{`
        @keyframes shimmer {
          0% { box-shadow: 0 0 20px rgba(0,194,168,0.3), 0 0 0px rgba(0,194,168,0); }
          50% { box-shadow: 0 0 40px rgba(0,194,168,0.6), 0 0 80px rgba(0,194,168,0.2); }
          100% { box-shadow: 0 0 20px rgba(0,194,168,0.3), 0 0 0px rgba(0,194,168,0); }
        }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes dotPulse { 0%{transform:scale(1);opacity:1} 100%{transform:scale(2.5);opacity:0} }
        @keyframes pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
        .btn-primary { animation: shimmer 3s ease-in-out infinite; }
        .mockup-float { animation: float 4s ease-in-out infinite; }
        .dot-pulse { animation: pulse 1.5s ease-in-out infinite; }
        @media(max-width:768px) {
          .hero-btns { flex-direction: column !important; align-items: stretch !important; }
          .flow-bar { flex-wrap: wrap !important; justify-content: center !important; gap: 6px !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .roles-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-inner { flex-direction: column !important; gap: 12px !important; align-items: flex-start !important; }
          .hide-mobile { display: none !important; }
          .hero-section { padding: 100px 20px 60px !important; }
          .section-pad { padding: 60px 20px !important; }
        }
      `}</style>

      <Navbar lang={lang} setLang={setLang} dark={dark} setDark={setDark} tx={tx} />

      {/* HERO */}
      <section className="hero-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', position: 'relative', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,194,168,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: dark ? 0.4 : 0.15, backgroundImage: 'linear-gradient(rgba(0,194,168,0.05) 1px, transparent 1px), linear-gradient(90deg,rgba(0,194,168,0.05) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '860px' }}>
          <LiveBadge />

          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(40px, 6vw, 76px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2px', margin: '0 0 24px' }}>
            {tx.h1a}<br /><span style={{ color: '#00F5A0' }}>{tx.h1b}</span>
          </h1>

          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: fg2, lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 40px', fontWeight: 300 }}>
            {tx.sub}
          </p>

          <div className="hero-btns" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '64px' }}>
            <button
              className="btn-primary"
              onClick={() => navigate('/dashboard')}
              onMouseEnter={() => setHovCta1(true)}
              onMouseLeave={() => setHovCta1(false)}
              style={{ padding: '14px 32px', background: hovCta1 ? '#00A891' : '#00F5A0', border: 'none', borderRadius: '12px', color: '#060C16', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'background .2s', position: 'relative', overflow: 'hidden' }}>
              {tx.cta1}
            </button>
            <button
              onMouseEnter={() => setHovCta2(true)}
              onMouseLeave={() => setHovCta2(false)}
              style={{ padding: '14px 32px', background: 'transparent', border: `1px solid ${hovCta2 ? 'rgba(0,194,168,0.6)' : 'rgba(255,255,255,0.15)'}`, borderRadius: '12px', color: hovCta2 ? '#00F5A0' : fg, fontSize: '15px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all .2s' }}>
              {tx.cta2}
            </button>
          </div>

          {/* Dashboard mockup */}
          <div className="mockup-float" style={{ background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(14,77,146,0.04)', border: `1px solid ${cardBorder}`, borderRadius: '16px', padding: '6px', maxWidth: '900px', margin: '0 auto', boxShadow: dark ? '0 40px 100px rgba(0,0,0,0.5)' : '0 40px 100px rgba(14,77,146,0.15)' }}>
            <div style={{ background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(14,77,146,0.03)', borderRadius: '10px 10px 0 0', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: `1px solid ${cardBorder}` }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['#FF5F57','#FFBD2E','#28CA41'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
              </div>
              <div style={{ flex: 1, background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(14,77,146,0.06)', borderRadius: '6px', padding: '4px 12px', fontSize: '11px', color: fg2, maxWidth: '300px', margin: '0 auto' }}>
                app.nexo.pe/dashboard
              </div>
            </div>
            <div style={{ background: dark ? '#0D1929' : '#F0F7FF', borderRadius: '0 0 10px 10px', padding: '16px', display: 'flex', gap: '12px', minHeight: '220px' }}>
              <div style={{ width: '120px', background: dark ? '#0B1F3A' : '#fff', borderRadius: '10px', padding: '12px', flexShrink: 0, border: `1px solid ${cardBorder}` }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: '14px', fontWeight: 900, color: dark ? '#fff' : '#0B1F3A', marginBottom: '14px' }}>NEX<span style={{ color: '#00F5A0' }}>O</span></div>
                {['Dashboard','Catálogo','Órd. Compra','Despacho','Financiero','Reportes'].map((item, i) => (
                  <div key={item} style={{ padding: '5px 8px', borderRadius: '6px', fontSize: '10px', marginBottom: '2px', background: i === 0 ? (dark ? 'rgba(0,194,168,0.1)' : '#EEF5FF') : 'transparent', color: i === 0 ? '#00F5A0' : fg2, fontWeight: i === 0 ? 600 : 400, borderLeft: i === 0 ? '2px solid #00F5A0' : '2px solid transparent' }}>{item}</div>
                ))}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px' }}>
                  {[['OC Activas','38','#0E4D92'],['En Tránsito','14','#F59E0B'],['SKUs Activos','50','#16A34A'],['Pend. Pago','S/143K','#E05252']].map(([l,v,c]) => (
                    <div key={l} style={{ background: dark ? 'rgba(255,255,255,0.05)' : '#fff', borderRadius: '8px', padding: '10px 12px', border: `1px solid ${cardBorder}` }}>
                      <div style={{ fontSize: '9px', color: fg2, marginBottom: '3px', textTransform: 'uppercase' }}>{l}</div>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', fontWeight: 900, color: c }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: dark ? 'rgba(255,255,255,0.05)' : '#fff', borderRadius: '8px', border: `1px solid ${cardBorder}`, overflow: 'hidden', flex: 1 }}>
                  <div style={{ background: dark ? 'rgba(255,255,255,0.03)' : '#F8FBFF', padding: '7px 12px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '8px', borderBottom: `1px solid ${cardBorder}` }}>
                    {['Documento','Cadena','Monto','Estado'].map(h => (
                      <div key={h} style={{ fontSize: '9px', color: fg2, fontWeight: 600, textTransform: 'uppercase' }}>{h}</div>
                    ))}
                  </div>
                  {[
                    ['OC-2025-0841','Wong','S/48,320','Confirmada','#1D4ED8','#DBEAFE'],
                    ['OC-2025-0840','Plaza Vea','S/32,150','En despacho','#065F46','#D1FAE5'],
                    ['OC-2025-0839','Tottus','S/61,480','Recibida','#166534','#EAF3DE'],
                  ].map(([id,cli,amt,est,tc,bg2]) => (
                    <div key={id} style={{ padding: '6px 12px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '8px', borderBottom: `1px solid ${cardBorder}`, alignItems: 'center' }}>
                      <div style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 700, color: fg }}>{id}</div>
                      <div style={{ fontSize: '10px', color: fg }}>{cli}</div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: fg }}>{amt}</div>
                      <div style={{ fontSize: '9px', fontWeight: 600, color: tc, background: bg2, padding: '2px 6px', borderRadius: '100px', display: 'inline-block' }}>{est}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOW BAR */}
      <div style={{ borderTop: `1px solid ${sectionBorder}`, borderBottom: `1px solid ${sectionBorder}`, background: sectionBg, padding: '20px 24px' }}>
        <div className="flow-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', overflowX: 'auto' }}>
          {tx.flowItems.map(([e,l], i, arr) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: '7px 14px', background: 'rgba(0,194,168,0.08)', border: '1px solid rgba(0,194,168,0.2)', borderRadius: '100px', fontSize: '12px', color: '#00F5A0', whiteSpace: 'nowrap', fontWeight: 500 }}>{e} {l}</div>
              {i < arr.length - 1 && <span style={{ padding: '0 8px', color: fg2, fontSize: '12px' }}>→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* LOGOS */}
      <div style={{ padding: '40px 24px 0', textAlign: 'center' }}>
        <div style={{ fontSize: '11px', color: fg2, marginBottom: '20px', letterSpacing: '1px', textTransform: 'uppercase' }}>{tx.chains}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
          {['Wong','Tottus','Plaza Vea','Metro','Vivanda','Arca Continental'].map(l => (
            <div key={l} style={{ fontSize: '13px', fontWeight: 700, color: fg2, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{l}</div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section className="section-pad" style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ fontSize: '11px', color: '#00F5A0', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 500 }}>{tx.why}</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: '48px', lineHeight: 1.1, whiteSpace: 'pre-line' }}>{tx.whyTitle}</h2>
        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
          {tx.features.map(([title, desc, tag]) => (
            <div key={title} style={{ background: card, border: `1px solid ${cardBorder}`, borderRadius: '16px', padding: '24px', transition: 'all .25s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,194,168,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = cardBorder; e.currentTarget.style.transform = 'translateY(0)' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 700, marginBottom: '8px', color: fg }}>{title}</div>
              <div style={{ fontSize: '13px', color: fg2, lineHeight: 1.7, marginBottom: '14px' }}>{desc}</div>
              <span style={{ fontSize: '11px', padding: '3px 10px', background: 'rgba(0,194,168,0.1)', borderRadius: '100px', color: '#00F5A0' }}>{tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ROLES */}
      <section className="section-pad" style={{ padding: '80px 24px', background: sectionBg, borderTop: `1px solid ${sectionBorder}`, borderBottom: `1px solid ${sectionBorder}` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', color: '#00F5A0', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 500 }}>{tx.model}</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: '48px', lineHeight: 1.1, whiteSpace: 'pre-line' }}>{tx.modelTitle}</h2>
          <div className="roles-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[
              { badge: tx.provBadge, bc: '#00F5A0', bb: 'rgba(0,194,168,0.1)', bbr: 'rgba(0,194,168,0.3)', title: tx.provTitle, sub: tx.provSub, bg2: 'linear-gradient(135deg,#0B1F3A,#0E2D52)', border: 'rgba(0,194,168,0.15)', dot: '#00F5A0', items: tx.provItems },
              { badge: tx.retBadge, bc: '#4ADE80', bb: 'rgba(74,222,128,0.1)', bbr: 'rgba(74,222,128,0.3)', title: tx.retTitle, sub: tx.retSub, bg2: 'linear-gradient(135deg,#052E16,#064E3B)', border: 'rgba(74,222,128,0.15)', dot: '#4ADE80', items: tx.retItems },
            ].map(r => (
              <div key={r.title} style={{ borderRadius: '20px', padding: '36px', background: r.bg2, border: `1px solid ${r.border}` }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, color: r.bc, background: r.bb, border: `1px solid ${r.bbr}`, marginBottom: '16px' }}>{r.badge}</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 900, marginBottom: '6px', color: '#fff' }}>{r.title}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginBottom: '24px' }}>{r.sub}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {r.items.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: r.dot, flexShrink: 0 }} />{item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARATIVA */}
      <section className="section-pad" style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ fontSize: '11px', color: '#00F5A0', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 500 }}>
          {lang === 'es' ? 'Por qué cambiar' : 'Why switch'}
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: '48px', lineHeight: 1.1 }}>
          {lang === 'es' ? <>NEXO vs la <span style={{ color: '#00F5A0' }}>plataforma anterior.</span></> : <>NEXO vs your <span style={{ color: '#00F5A0' }}>previous platform.</span></>}
        </h2>

        <div style={{ background: card, border: `1px solid ${cardBorder}`, borderRadius: '16px', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(14,77,146,0.03)', borderBottom: `1px solid ${cardBorder}` }}>
            <div style={{ padding: '16px 24px', fontSize: '12px', color: fg2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {lang === 'es' ? 'Característica' : 'Feature'}
            </div>
            <div style={{ padding: '16px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: fg2, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                {lang === 'es' ? 'Plataforma anterior' : 'Previous platform'}
              </div>
              <div style={{ width: '32px', height: '3px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', margin: '0 auto' }} />
            </div>
            <div style={{ padding: '16px 24px', textAlign: 'center', background: 'rgba(0,194,168,0.05)', borderLeft: '1px solid rgba(0,194,168,0.15)' }}>
              <div style={{ fontSize: '11px', color: '#00F5A0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: 700 }}>NEXO</div>
              <div style={{ width: '32px', height: '3px', background: '#00F5A0', borderRadius: '2px', margin: '0 auto' }} />
            </div>
          </div>

          {/* Rows */}
          {[
            {
              feature: lang === 'es' ? 'Descarga de documentos' : 'Document download',
              old: lang === 'es' ? 'Correo con link que expira en 4 días' : 'Email with link expiring in 4 days',
              neo: lang === 'es' ? 'Descarga directa, siempre disponible' : 'Direct download, always available',
              oldBad: true
            },
            {
              feature: lang === 'es' ? 'Trazabilidad del documento' : 'Document traceability',
              old: lang === 'es' ? 'Tabla plana con estados técnicos' : 'Flat table with technical statuses',
              neo: lang === 'es' ? 'Timeline visual en lenguaje de negocio' : 'Visual timeline in business language',
              oldBad: true
            },
            {
              feature: lang === 'es' ? 'Reportes' : 'Reports',
              old: lang === 'es' ? 'Generados bajo demanda, link expira' : 'Generated on demand, link expires',
              neo: lang === 'es' ? 'Siempre disponibles, descarga inmediata' : 'Always available, instant download',
              oldBad: true
            },
            {
              feature: lang === 'es' ? 'Validación de OC' : 'PO validation',
              old: lang === 'es' ? 'Manual o semi-automática' : 'Manual or semi-automatic',
              neo: lang === 'es' ? '100% automática en segundos' : '100% automatic in seconds',
              oldBad: true
            },
            {
              feature: lang === 'es' ? 'Roles de usuario' : 'User roles',
              old: lang === 'es' ? 'Un solo perfil para todos' : 'Single profile for everyone',
              neo: lang === 'es' ? 'Proveedor + Retail diferenciados' : 'Differentiated Supplier + Retail',
              oldBad: true
            },
            {
              feature: lang === 'es' ? 'Integración ERP' : 'ERP integration',
              old: lang === 'es' ? 'Limitada, requiere configuración compleja' : 'Limited, requires complex setup',
              neo: lang === 'es' ? 'API REST + SAP + EDI nativo' : 'Native API REST + SAP + EDI',
              oldBad: true
            },
            {
              feature: lang === 'es' ? 'Experiencia mobile' : 'Mobile experience',
              old: lang === 'es' ? 'No optimizada para móvil' : 'Not optimized for mobile',
              neo: lang === 'es' ? 'App para móvil, tablet y desktop' : 'App for mobile, tablet and desktop',
              oldBad: true
            },
            {
              feature: lang === 'es' ? 'Soporte técnico' : 'Technical support',
              old: lang === 'es' ? 'Tickets con tiempo indefinido' : 'Tickets with undefined response time',
              neo: lang === 'es' ? 'SLA garantizado: 30min crítico' : 'Guaranteed SLA: 30min critical',
              oldBad: true
            },
          ].map((row, i) => (
            <div key={row.feature} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', borderBottom: i < 7 ? `1px solid ${cardBorder}` : 'none', transition: 'background .15s' }}
              onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.02)' : 'rgba(14,77,146,0.02)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ padding: '14px 24px', fontSize: '13px', fontWeight: 600, color: fg, display: 'flex', alignItems: 'center' }}>{row.feature}</div>
              <div style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '8px', borderLeft: `1px solid ${cardBorder}` }}>
                <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '10px' }}>✕</span>
                <span style={{ fontSize: '12px', color: fg2 }}>{row.old}</span>
              </div>
              <div style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,194,168,0.04)', borderLeft: '1px solid rgba(0,194,168,0.15)' }}>
                <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '10px', color: '#166534' }}>✓</span>
                <span style={{ fontSize: '12px', color: fg, fontWeight: 500 }}>{row.neo}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,194,168,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, letterSpacing: '-2px', marginBottom: '16px', lineHeight: 1.05, whiteSpace: 'pre-line' }}>{tx.ctaTitle}</h2>
          <p style={{ fontSize: '16px', color: fg2, marginBottom: '36px' }}>{tx.ctaSub}</p>
          <button
            className="btn-primary"
            onClick={() => navigate('/dashboard')}
            style={{ padding: '16px 36px', background: '#00F5A0', border: 'none', borderRadius: '12px', color: '#060C16', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            {tx.ctaBtn}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${sectionBorder}`, padding: '24px 24px' }}>
        <div className="footer-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1100px', margin: '0 auto', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '16px', fontWeight: 900, color: fg }}>NEX<span style={{ color: '#00F5A0' }}>O</span></div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[tx.privacy, tx.terms].map(l => (
              <a key={l} href="#" style={{ fontSize: '12px', color: fg2, textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
          <div style={{ fontSize: '12px', color: fg2 }}>{tx.footer}</div>
        </div>
      </footer>

      {/* WhatsApp button */}
      <a
        href="https://wa.me/51931067775"
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 999,
          width: '56px', height: '56px', borderRadius: '50%',
          background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)', transition: 'all .2s', textDecoration: 'none'
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.6)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  )
}
