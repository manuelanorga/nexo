import { useState } from 'react'

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

function TabBilling() {
  const used = 45
  const limit = 200
  const pct = Math.round((used/limit)*100)
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px' }}>
      <div>
        <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A', marginBottom:'16px', paddingBottom:'8px', borderBottom:'1px solid rgba(14,77,146,0.08)' }}>Plan actual</div>

        <div style={{ background:'linear-gradient(135deg,#0B1F3A,#0E4D92)', borderRadius:'12px', padding:'20px', marginBottom:'16px', color:'#fff' }}>
          <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.5)', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'4px' }}>Plan activo</div>
          <div style={{ fontFamily:"'Fraunces',serif", fontSize:'22px', fontWeight:900, marginBottom:'2px' }}>Enterprise</div>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)' }}>Hasta 10,000 documentos / mes · API REST + SAP</div>
          <div style={{ marginTop:'16px', paddingTop:'16px', borderTop:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.4)' }}>Monto mensual</div>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:'20px', fontWeight:900, color:'#00F5A0' }}>S/ 2,500</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.4)' }}>Próximo cobro</div>
              <div style={{ fontSize:'13px', fontWeight:600 }}>01 Jun 2025</div>
            </div>
          </div>
        </div>

        <div style={{ background:'#F8FAFC', border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', padding:'16px', marginBottom:'16px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
            <span style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A' }}>Uso del mes</span>
            <span style={{ fontSize:'12px', color:'#6B8BAE' }}>{used} / {limit} documentos</span>
          </div>
          <div style={{ height:'6px', background:'#E2E8F0', borderRadius:'3px', overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${pct}%`, background:'#0E4D92', borderRadius:'3px', transition:'width .4s' }}/>
          </div>
          <div style={{ fontSize:'10px', color:'#94A3B8', marginTop:'4px' }}>{pct}% utilizado · {limit-used} documentos restantes</div>
        </div>

        <div style={{ background:'#F8FAFC', border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', padding:'16px' }}>
          <div style={{ fontSize:'12px', fontWeight:600, color:'#0B1F3A', marginBottom:'12px' }}>Método de pago</div>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ width:'40px', height:'26px', background:'#1A1F71', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:'8px', color:'#fff', fontWeight:700, letterSpacing:'.5px' }}>VISA</span>
            </div>
            <div>
              <div style={{ fontSize:'12px', fontWeight:500, color:'#0B1F3A' }}>•••• •••• •••• 4242</div>
              <div style={{ fontSize:'10px', color:'#94A3B8' }}>Vence 12/2026</div>
            </div>
            <button style={{ marginLeft:'auto', fontSize:'11px', color:'#0E4D92', background:'none', border:'1px solid rgba(14,77,146,0.2)', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Cambiar</button>
          </div>
        </div>
      </div>

      <div>
        <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A', marginBottom:'16px', paddingBottom:'8px', borderBottom:'1px solid rgba(14,77,146,0.08)' }}>Historial de facturas</div>
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
      </div>
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

function TabEquipo() {
  const [hovRow, setHovRow] = useState(null)
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px', paddingBottom:'8px', borderBottom:'1px solid rgba(14,77,146,0.08)' }}>
        <div>
          <div style={{ fontSize:'13px', fontWeight:600, color:'#0B1F3A' }}>Colaboradores</div>
          <div style={{ fontSize:'11px', color:'#6B8BAE', marginTop:'2px' }}>Gestiona accesos sin compartir tu contraseña</div>
        </div>
        <button style={{ display:'flex', alignItems:'center', gap:'5px', padding:'8px 14px', background:'#0B1F3A', border:'none', borderRadius:'8px', color:'#fff', fontSize:'12px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
          + Invitar usuario
        </button>
      </div>

      <div style={{ border:'1px solid rgba(14,77,146,0.08)', borderRadius:'10px', overflow:'hidden', marginBottom:'20px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.8fr 1.5fr 1.2fr .8fr 120px', gap:'8px', padding:'8px 16px', background:'#F8FAFC', borderBottom:'1px solid rgba(14,77,146,0.06)' }}>
          {['Nombre','Email','Rol','Estado',''].map(h => (
            <span key={h} style={{ fontSize:'9px', color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.6px', fontWeight:600 }}>{h}</span>
          ))}
        </div>
        {TEAM.map((u,i) => (
          <div key={u.email}
            onMouseEnter={()=>setHovRow(i)} onMouseLeave={()=>setHovRow(null)}
            style={{ display:'grid', gridTemplateColumns:'1.8fr 1.5fr 1.2fr .8fr 120px', gap:'8px', padding:'11px 16px', borderBottom: i<TEAM.length-1?'1px solid rgba(14,77,146,0.05)':'none', alignItems:'center', background: hovRow===i?'#F8FAFC':'#fff', transition:'background .1s' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'9px' }}>
              <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'#EEF5FF', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', fontWeight:700, color:'#0E4D92', flexShrink:0 }}>
                {u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
              </div>
              <span style={{ fontSize:'12px', fontWeight:500, color:'#0B1F3A' }}>{u.name}</span>
            </div>
            <span style={{ fontSize:'11px', color:'#6B8BAE' }}>{u.email}</span>
            <select defaultValue={u.rol} style={{ fontSize:'11px', color:'#0B1F3A', border:'1px solid rgba(14,77,146,0.12)', borderRadius:'6px', padding:'4px 8px', background:'#fff', fontFamily:"'DM Sans',sans-serif", outline:'none', cursor:'pointer' }}>
              <option>Admin de Ventas</option>
              <option>Facturador / Contador</option>
              <option>Tesorero</option>
            </select>
            <span style={{ fontSize:'10px', fontWeight:600, padding:'3px 8px', borderRadius:'20px', background: u.status==='active'?'#F0FDF4':'#FFF7ED', color: u.status==='active'?'#166534':'#C2410C', display:'inline-block' }}>
              {u.status==='active'?'Activo':'Invitado'}
            </span>
            <div style={{ display:'flex', gap:'4px', justifyContent:'flex-end' }}>
              <button style={{ fontSize:'10px', padding:'4px 8px', border:'1px solid rgba(14,77,146,0.12)', borderRadius:'6px', background:'#fff', color:'#0E4D92', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Editar</button>
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
