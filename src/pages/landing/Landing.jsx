import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#060C16', color: '#fff', overflowX: 'hidden' }}>

      <Navbar />

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 24px 80px', position: 'relative', textAlign: 'center', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,194,168,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.4,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px', pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '100px',
            border: '1px solid rgba(0,194,168,0.3)', background: 'rgba(0,194,168,0.08)',
            fontSize: '12px', color: '#00C2A8', marginBottom: '32px', fontWeight: 500
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00C2A8' }} />
            Plataforma O2P para Latinoamérica
          </div>

          <h1 style={{
            fontFamily: "'Fraunces', serif", fontSize: 'clamp(44px, 6vw, 76px)',
            fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2px', margin: '0 0 24px'
          }}>
            De la orden al cobro,<br />
            <span style={{ color: '#00C2A8' }}>sin fricción.</span>
          </h1>

          <p style={{
            fontSize: '18px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7,
            maxWidth: '540px', margin: '0 auto 40px', fontWeight: 300
          }}>
            Conectamos proveedores y cadenas comerciales en un único flujo digital.
            Trazabilidad total, cero papel, cero errores manuales.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '64px' }}>
            <button onClick={() => navigate('/dashboard')} style={{
              padding: '14px 32px', background: '#00C2A8', border: 'none', borderRadius: '10px',
              color: '#060C16', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", boxShadow: '0 0 40px rgba(0,194,168,0.25)'
            }}>Explorar plataforma</button>
            <button style={{
              padding: '14px 32px', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px',
              color: 'rgba(255,255,255,0.8)', fontSize: '15px', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif"
            }}>Solicitar reunion</button>
          </div>

          {/* Product screenshot mock */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px', padding: '6px', maxWidth: '900px', margin: '0 auto',
            boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.05)', borderRadius: '10px 10px 0 0',
              padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px',
              borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
                  <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{
                flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: '6px',
                padding: '4px 12px', fontSize: '11px', color: 'rgba(255,255,255,0.3)',
                maxWidth: '300px', margin: '0 auto'
              }}>app.nexo.pe/dashboard</div>
            </div>
            <div style={{
              background: '#F0F7FF', borderRadius: '0 0 10px 10px',
              padding: '16px', display: 'flex', gap: '12px', minHeight: '260px'
            }}>
              <div style={{
                width: '130px', background: '#fff', borderRadius: '10px', padding: '12px',
                flexShrink: 0, border: '1px solid rgba(14,77,146,0.1)'
              }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: '14px', fontWeight: 900, color: '#0B1F3A', marginBottom: '16px' }}>
                  NEX<span style={{ color: '#00C2A8' }}>O</span>
                </div>
                {['Dashboard','Catálogo','Órd. Compra','Despacho','Financiero','Reportes'].map((item, i) => (
                  <div key={item} style={{
                    padding: '6px 8px', borderRadius: '6px', fontSize: '10px', marginBottom: '2px',
                    background: i === 0 ? '#EEF5FF' : 'transparent',
                    color: i === 0 ? '#0E4D92' : '#6B8BAE',
                    fontWeight: i === 0 ? 600 : 400,
                    borderLeft: i === 0 ? '2px solid #0E4D92' : '2px solid transparent'
                  }}>{item}</div>
                ))}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px' }}>
                  {[['OC Activas','38','#0E4D92'],['En Transito','14','#F59E0B'],['SKUs Activos','50','#16A34A'],['Pend. Pago','S/143K','#E05252']].map(([l,v,c]) => (
                    <div key={l} style={{ background: '#fff', borderRadius: '8px', padding: '10px 12px', border: '1px solid rgba(14,77,146,0.1)' }}>
                      <div style={{ fontSize: '9px', color: '#6B8BAE', marginBottom: '3px', textTransform: 'uppercase' }}>{l}</div>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', fontWeight: 900, color: c }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', overflow: 'hidden', flex: 1 }}>
                  <div style={{ background: '#F8FBFF', padding: '8px 12px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '8px', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
                    {['Documento','Cadena','Fecha','Monto','Estado'].map(h => (
                      <div key={h} style={{ fontSize: '9px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase' }}>{h}</div>
                    ))}
                  </div>
                  {[
                    ['OC-2025-0841','Wong','18/05','S/48,320','Confirmada','#1D4ED8','#DBEAFE'],
                    ['OC-2025-0840','Plaza Vea','17/05','S/32,150','En despacho','#065F46','#D1FAE5'],
                    ['OC-2025-0839','Tottus','16/05','S/61,480','Recibida','#166534','#EAF3DE'],
                    ['OC-2025-0838','Metro','15/05','S/27,900','Pendiente','#854D0E','#FEF9C3'],
                  ].map(([id,cli,f,amt,est,tc,bg]) => (
                    <div key={id} style={{
                      padding: '7px 12px', display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '8px',
                      borderBottom: '1px solid rgba(14,77,146,0.05)', alignItems: 'center'
                    }}>
                      <div style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 700, color: '#0B1F3A' }}>{id}</div>
                      <div style={{ fontSize: '10px', color: '#0B1F3A' }}>{cli}</div>
                      <div style={{ fontSize: '10px', color: '#6B8BAE' }}>{f}</div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#0B1F3A' }}>{amt}</div>
                      <div style={{ fontSize: '9px', fontWeight: 600, color: tc, background: bg, padding: '2px 6px', borderRadius: '100px', display: 'inline-block' }}>{est}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOW BAR */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.02)', padding: '20px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', overflowX: 'auto'
      }}>
        {[['OC','Orden de Compra'],['ASN','Aviso de Despacho'],['AR','Aviso de Recibo'],['DEV','Devoluciones'],['FAC','Facturación'],['PAG','Cobro']].map(([e,l],i,arr) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              padding: '7px 16px', background: 'rgba(0,194,168,0.08)',
              border: '1px solid rgba(0,194,168,0.2)', borderRadius: '100px',
              fontSize: '12px', color: '#00C2A8', whiteSpace: 'nowrap', fontWeight: 500
            }}>{e} {l}</div>
            {i < arr.length - 1 && <span style={{ padding: '0 10px', color: 'rgba(255,255,255,0.2)' }}>-&gt;</span>}
          </div>
        ))}
      </div>

      {/* LOGOS */}
      <div style={{ padding: '48px 48px 0', textAlign: 'center' }}>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginBottom: '20px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Conectando las principales cadenas del Peru
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          {['Wong','Tottus','Plaza Vea','Metro','Vivanda','Arca Continental'].map(l => (
            <div key={l} style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{l}</div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section style={{ padding: '100px 48px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ fontSize: '11px', color: '#00C2A8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 500 }}>¿Por qué NEXO?</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: '64px', lineHeight: 1.1 }}>
          Todo lo que necesitas.<br />Nada de lo que no.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {[
            ['Catálogo inteligente','Gestiona SKUs y precios diferenciados por cadena. Datos visibles de entrada, sin búsqueda obligatoria.','Sin búsqueda obligatoria'],
            ['Trazabilidad completa','Timeline visual en lenguaje de negocio. Sin jerga técnica. Sin "Moviendo a bucket de servicio".','9 etapas trazadas'],
            ['Reportes sin expiración','Descarga cualquier reporte en cualquier momento. Sin correos, sin links que vencen.','Siempre disponibles'],
            ['Integracion ERP nativa','Compatible con SAP, Oracle y Odoo. Cero doble digitacion entre sistemas.','API REST + EDI'],
            ['Dos roles, una plataforma','Vista completa para proveedores. Vista enfocada para retails. Cada uno ve lo que necesita.','Proveedor + Retail'],
            ['Onboarding en minutos','Sin manuales PDF. La plataforma te guia desde el primer login hasta tu primera OC.','vs Carvajal'],
          ].map(([title, desc, tag]) => (
            <div key={title} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px', padding: '28px', transition: 'all .25s', cursor: 'default',
            }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>{title}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '16px' }}>{desc}</div>
              <span style={{ fontSize: '11px', padding: '3px 10px', background: 'rgba(0,194,168,0.1)', borderRadius: '100px', color: '#00C2A8' }}>{tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ROLES */}
      <section style={{ padding: '100px 48px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', color: '#00C2A8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 500 }}>Modelo de red</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: '64px', lineHeight: 1.1 }}>
            Un ecosistema.<br />Dos experiencias.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[
              {
                badge: 'Proveedor', bc: '#00C2A8', bb: 'rgba(0,194,168,0.1)', bbr: 'rgba(0,194,168,0.3)',
                title: 'Arca Continental', sub: 'Vista completa de operaciones',
                bg: 'linear-gradient(135deg,#0B1F3A,#0E2D52)', border: 'rgba(0,194,168,0.15)', dot: '#00C2A8',
                items: ['Catálogo + listas de precios por cadena','OCs entrantes de todos los retails','Gestión de despachos y recepciones','Documentos financieros y facturación','Reportes analíticos sin expiración','Trazabilidad completa por documento']
              },
              {
                badge: 'Retail', bc: '#4ADE80', bb: 'rgba(74,222,128,0.1)', bbr: 'rgba(74,222,128,0.3)',
                title: 'Wong - Tottus - Metro', sub: 'Vista enfocada en sus pedidos',
                bg: 'linear-gradient(135deg,#052E16,#064E3B)', border: 'rgba(74,222,128,0.15)', dot: '#4ADE80',
                items: ['Creación de órdenes de compra','Estado en tiempo real de sus pedidos','Confirmación de recepciones','Gestión de devoluciones','Facturas y estado de pagos','Centro de ayuda integrado']
              }
            ].map(r => (
              <div key={r.title} style={{ borderRadius: '20px', padding: '40px', background: r.bg, border: `1px solid ${r.border}` }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px',
                  borderRadius: '100px', fontSize: '11px', fontWeight: 700, color: r.bc,
                  background: r.bb, border: `1px solid ${r.bbr}`, marginBottom: '20px'
                }}>{r.badge}</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: '26px', fontWeight: 900, marginBottom: '6px' }}>{r.title}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginBottom: '28px' }}>{r.sub}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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

      {/* STATS */}
      <section style={{ padding: '100px 48px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ fontSize: '11px', color: '#00C2A8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 500 }}>NEXO en números</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: '64px', lineHeight: 1.1 }}>
          Resultados que<br />se miden.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
          {[['96%','Fill rate promedio'],['menos 3s','Procesamiento EDI'],['0','Reportes sin expiración'],['100%','Trazabilidad total']].map(([num, label]) => (
            <div key={num} style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: '52px', fontWeight: 900, color: '#00C2A8', letterSpacing: '-2px', marginBottom: '12px' }}>{num}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,194,168,0.08) 0%, transparent 70%)', pointerEvents: 'none'
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 900, letterSpacing: '-2px', marginBottom: '16px', lineHeight: 1.05 }}>
            Listo para<br />reemplazar a Carvajal.
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', marginBottom: '36px' }}>
            Explora la plataforma completa con vista de proveedor y retail.
          </p>
          <button onClick={() => navigate('/dashboard')} style={{
            padding: '16px 36px', background: '#00C2A8', border: 'none', borderRadius: '12px',
            color: '#060C16', fontSize: '16px', fontWeight: 700, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", boxShadow: '0 0 60px rgba(0,194,168,0.3)'
          }}>Entrar al dashboard</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: '16px', fontWeight: 900 }}>NEX<span style={{ color: '#00C2A8' }}>O</span></div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Politica de privacidad','Terminos y condiciones'].map(l => (
            <a key={l} href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>NEXO powered by instamovil.com 2025</div>
      </footer>

    </div>
  )
}
