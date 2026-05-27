import { useState, useMemo } from 'react'

const TENANTS_BILLING = [
  { id:1, name:'Arca Continental', type:'prov', plan:'Professional', mrr:2900, status:'pagado', nextBill:'01 Jun 2026', since:'12 ene 2025', invoices:[
    { id:'INV-2026-005', fecha:'01 May 2026', monto:2900, status:'pagado' },
    { id:'INV-2026-004', fecha:'01 Abr 2026', monto:2900, status:'pagado' },
    { id:'INV-2026-003', fecha:'01 Mar 2026', monto:2900, status:'pagado' },
    { id:'INV-2026-002', fecha:'01 Feb 2026', monto:1900, status:'pagado' },
    { id:'INV-2026-001', fecha:'01 Ene 2026', monto:1900, status:'pagado' },
  ]},
  { id:2, name:'Wong S.A.',         type:'ret',  plan:'Introducción', mrr:399,  status:'pagado', nextBill:'01 Jun 2026', since:'15 ene 2025', invoices:[
    { id:'INV-2026-010', fecha:'01 May 2026', monto:399, status:'pagado' },
    { id:'INV-2026-009', fecha:'01 Abr 2026', monto:399, status:'pagado' },
    { id:'INV-2026-008', fecha:'01 Mar 2026', monto:399, status:'pagado' },
  ]},
  { id:3, name:'Tottus Perú',       type:'ret',  plan:'Introducción', mrr:399,  status:'pendiente', nextBill:'01 Jun 2026', since:'20 ene 2025', invoices:[
    { id:'INV-2026-015', fecha:'01 May 2026', monto:399, status:'pendiente' },
    { id:'INV-2026-014', fecha:'01 Abr 2026', monto:399, status:'pagado' },
  ]},
  { id:4, name:'Plaza Vea',         type:'ret',  plan:'Introducción', mrr:399,  status:'pagado', nextBill:'01 Jun 2026', since:'01 feb 2025', invoices:[
    { id:'INV-2026-020', fecha:'01 May 2026', monto:399, status:'pagado' },
    { id:'INV-2026-019', fecha:'01 Abr 2026', monto:399, status:'pagado' },
  ]},
  { id:5, name:'Metro',             type:'ret',  plan:'Introducción', mrr:399,  status:'pagado', nextBill:'01 Jun 2026', since:'10 feb 2025', invoices:[
    { id:'INV-2026-025', fecha:'01 May 2026', monto:399, status:'pagado' },
  ]},
  { id:6, name:'Vivanda',           type:'ret',  plan:'Introducción', mrr:399,  status:'vencido', nextBill:'—', since:'24 may 2025', invoices:[
    { id:'INV-2026-030', fecha:'01 May 2026', monto:399, status:'vencido' },
  ]},
]

const MRR_HISTORY = [
  { mes:'Ene', mrr:1900 },
  { mes:'Feb', mrr:3800 },
  { mes:'Mar', mrr:4597 },
  { mes:'Abr', mrr:5394 },
  { mes:'May', mrr:5793 },
]

const SC = { pagado:'#10B981', pendiente:'#F59E0B', vencido:'#EF4444' }
const SB = { pagado:'#F0FDF4', pendiente:'#FFFBEB', vencido:'#FEF2F2' }
const ST = { pagado:'#166534', pendiente:'#92400E', vencido:'#991B1B' }

function MRRChart({ data, accent }) {
  const max = Math.max(...data.map(d=>d.mrr))
  const w = 400, h = 120, pad = 30
  const xStep = (w - pad*2) / (data.length-1)
  const points = data.map((d,i) => `${pad + i*xStep},${h - pad - (d.mrr/max)*(h-pad*2)}`)
  const areaPoints = `${pad},${h-pad} ${points.join(' ')} ${pad+(data.length-1)*xStep},${h-pad}`

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow:'visible' }}>
      <defs>
        <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity=".15"/>
          <stop offset="100%" stopColor={accent} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#mrrGrad)"/>
      <polyline points={points.join(' ')} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {data.map((d,i) => {
        const x = pad + i*xStep
        const y = h - pad - (d.mrr/max)*(h-pad*2)
        return (
          <g key={d.mes}>
            <circle cx={x} cy={y} r="4" fill={accent}/>
            <text x={x} y={h-8} textAnchor="middle" fontSize="10" fill="#94A3B8">{d.mes}</text>
            <text x={x} y={y-10} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>S/{(d.mrr/1000).toFixed(1)}k</text>
          </g>
        )
      })}
    </svg>
  )
}

export default function TransaccionesView({ accent, accentBg, text, text2, text3, border, white, bg }) {
  const [selected, setSelected] = useState(null)
  const [filterStatus, setFilterStatus] = useState('todos')

  const mrr = useMemo(() => TENANTS_BILLING.reduce((s,t) => s + t.mrr, 0), [])
  const arr = mrr * 12
  const pendiente = TENANTS_BILLING.filter(t=>t.status==='pendiente').reduce((s,t)=>s+t.mrr,0)
  const vencido   = TENANTS_BILLING.filter(t=>t.status==='vencido').reduce((s,t)=>s+t.mrr,0)

  const filtered = TENANTS_BILLING.filter(t => filterStatus==='todos' || t.status===filterStatus)

  const card = { background:white, border:`1px solid ${border}`, borderRadius:'10px' }

  if (selected) {
    const tenant = TENANTS_BILLING.find(t=>t.id===selected)
    return (
      <div style={{ fontFamily:"'Inter',sans-serif" }}>
        <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'16px', fontSize:'12px', color:text3 }}>
          <span onClick={()=>setSelected(null)} style={{ cursor:'pointer', color:accent }}>Transacciones</span>
          <span>›</span>
          <span style={{ color:text2, fontWeight:500 }}>{tenant.name}</span>
        </div>

        <div style={{ ...card, padding:'16px 20px', marginBottom:'14px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize:'16px', fontWeight:600, color:text, fontFamily:"'Fraunces',serif" }}>{tenant.name}</div>
            <div style={{ fontSize:'11px', color:text3, marginTop:'2px' }}>Cliente desde {tenant.since} · {tenant.plan}</div>
          </div>
          <div style={{ display:'flex', gap:'12px' }}>
            {[
              { label:'MRR', val:`S/ ${tenant.mrr.toLocaleString()}`, color:accent },
              { label:'ARR estimado', val:`S/ ${(tenant.mrr*12).toLocaleString()}`, color:text },
              { label:'Próximo cobro', val:tenant.nextBill, color:text2 },
            ].map(m => (
              <div key={m.label} style={{ textAlign:'center', padding:'8px 16px', background:bg, borderRadius:'8px', border:`1px solid ${border}` }}>
                <div style={{ fontSize:'9px', color:text3, textTransform:'uppercase', letterSpacing:'.5px', marginBottom:'2px' }}>{m.label}</div>
                <div style={{ fontSize:'14px', fontWeight:700, color:m.color, fontFamily:"'Fraunces',serif" }}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...card, overflow:'hidden' }}>
          <div style={{ padding:'12px 16px', borderBottom:`1px solid ${border}` }}>
            <div style={{ fontSize:'12px', fontWeight:600, color:text }}>Historial de facturas</div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr .8fr 80px', gap:'8px', padding:'8px 16px', background:'#FAFAF9', borderBottom:`1px solid ${border}` }}>
            {['Factura','Fecha','Monto','Estado',''].map(h => (
              <span key={h} style={{ fontSize:'10px', color:text3, textTransform:'uppercase', letterSpacing:'.6px', fontWeight:500 }}>{h}</span>
            ))}
          </div>
          {tenant.invoices.map((inv,i) => (
            <div key={inv.id} style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr .8fr 80px', gap:'8px', padding:'11px 16px', borderBottom:i<tenant.invoices.length-1?`1px solid ${border}`:'none', alignItems:'center' }}>
              <span style={{ fontSize:'11px', fontWeight:600, color:text, fontFamily:'monospace' }}>{inv.id}</span>
              <span style={{ fontSize:'11px', color:text2 }}>{inv.fecha}</span>
              <span style={{ fontSize:'13px', fontWeight:700, color:text, fontFamily:"'Fraunces',serif" }}>S/ {inv.monto.toLocaleString()}</span>
              <span style={{ fontSize:'10px', fontWeight:600, padding:'2px 8px', borderRadius:'10px', background:SB[inv.status], color:ST[inv.status], display:'inline-block' }}>
                {inv.status.charAt(0).toUpperCase()+inv.status.slice(1)}
              </span>
              <button style={{ fontSize:'10px', color:'#0E4D92', background:'#EEF5FF', border:'none', borderRadius:'5px', padding:'4px 8px', cursor:'pointer', fontFamily:"'Inter',sans-serif", fontWeight:500 }}>PDF ↓</button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily:"'Inter',sans-serif" }}>

      {/* KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'14px' }}>
        {[
          { label:'MRR actual',      val:`S/ ${mrr.toLocaleString()}`,  sub:'Mayo 2026',         color:accent,    icon:'💰' },
          { label:'ARR estimado',    val:`S/ ${arr.toLocaleString()}`,  sub:'Proyección anual',  color:'#7C3AED', icon:'📈' },
          { label:'Cobros pendientes', val:`S/ ${pendiente}`,           sub:`${TENANTS_BILLING.filter(t=>t.status==='pendiente').length} tenant(s)`, color:'#F59E0B', icon:'⏳' },
          { label:'Cobros vencidos', val:`S/ ${vencido}`,               sub:`${TENANTS_BILLING.filter(t=>t.status==='vencido').length} tenant(s)`,   color:'#EF4444', icon:'⚠' },
        ].map(m => (
          <div key={m.label} style={{ ...card, padding:'16px 18px' }}>
            <div style={{ fontSize:'18px', marginBottom:'8px' }}>{m.icon}</div>
            <div style={{ fontSize:'9px', color:text3, textTransform:'uppercase', letterSpacing:'.6px', marginBottom:'4px' }}>{m.label}</div>
            <div style={{ fontFamily:"'Fraunces',serif", fontSize:'22px', fontWeight:700, color:m.color, lineHeight:1, marginBottom:'2px' }}>{m.val}</div>
            <div style={{ fontSize:'10px', color:text3 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* MRR Chart + Próximos cobros */}
      <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:'14px', marginBottom:'14px' }}>
        <div style={{ ...card, padding:'16px 20px' }}>
          <div style={{ fontSize:'12px', fontWeight:600, color:text, marginBottom:'4px' }}>Crecimiento MRR</div>
          <div style={{ fontSize:'10px', color:text3, marginBottom:'14px' }}>Enero — Mayo 2026</div>
          <MRRChart data={MRR_HISTORY} accent={accent}/>
        </div>
        <div style={{ ...card, padding:'16px 20px' }}>
          <div style={{ fontSize:'12px', fontWeight:600, color:text, marginBottom:'14px' }}>Próximos cobros — Junio</div>
          {TENANTS_BILLING.filter(t=>t.status!=='vencido').map((t,i) => (
            <div key={t.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 0', borderBottom:i<TENANTS_BILLING.length-2?`1px solid ${border}`:'none' }}>
              <div>
                <div style={{ fontSize:'12px', fontWeight:500, color:text }}>{t.name}</div>
                <div style={{ fontSize:'10px', color:text3 }}>{t.plan}</div>
              </div>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:'14px', fontWeight:700, color:accent }}>S/ {t.mrr.toLocaleString()}</div>
            </div>
          ))}
          <div style={{ marginTop:'12px', paddingTop:'12px', borderTop:`2px solid ${border}`, display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontSize:'12px', fontWeight:600, color:text }}>Total a cobrar</span>
            <span style={{ fontFamily:"'Fraunces',serif", fontSize:'16px', fontWeight:700, color:accent }}>S/ {mrr.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Tabla tenants */}
      <div style={{ ...card, overflow:'hidden' }}>
        <div style={{ padding:'12px 16px', borderBottom:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ fontSize:'12px', fontWeight:600, color:text }}>Detalle por tenant</div>
          <div style={{ display:'flex', gap:'4px' }}>
            {['todos','pagado','pendiente','vencido'].map(s => (
              <button key={s} onClick={()=>setFilterStatus(s)}
                style={{ padding:'4px 10px', borderRadius:'6px', border:`1px solid ${filterStatus===s?accent:border}`, background:filterStatus===s?accentBg:white, color:filterStatus===s?accent:text2, fontSize:'11px', fontWeight:filterStatus===s?600:400, cursor:'pointer', fontFamily:"'Inter',sans-serif", textTransform:'capitalize' }}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'2fr .8fr 1fr 1fr .9fr .8fr 60px', gap:'8px', padding:'8px 16px', background:'#FAFAF9', borderBottom:`1px solid ${border}` }}>
          {['Tenant','Tipo','Plan','MRR','Próximo cobro','Estado',''].map(h => (
            <span key={h} style={{ fontSize:'10px', color:text3, textTransform:'uppercase', letterSpacing:'.6px', fontWeight:500 }}>{h}</span>
          ))}
        </div>
        {filtered.map((t,i) => (
          <div key={t.id} style={{ display:'grid', gridTemplateColumns:'2fr .8fr 1fr 1fr .9fr .8fr 60px', gap:'8px', padding:'11px 16px', borderBottom:i<filtered.length-1?`1px solid ${border}`:'none', alignItems:'center', cursor:'pointer', transition:'background .1s' }}
            onMouseEnter={e=>e.currentTarget.style.background='#FAFAF9'}
            onMouseLeave={e=>e.currentTarget.style.background=white}
            onClick={()=>setSelected(t.id)}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <div style={{ width:'28px', height:'28px', borderRadius:'7px', background: t.type==='prov'?'#EFF6FF':'#F0FDF4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'9px', fontWeight:700, color:t.type==='prov'?'#2563EB':'#16A34A', flexShrink:0 }}>
                {t.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
              </div>
              <span style={{ fontSize:'12px', fontWeight:500, color:text }}>{t.name}</span>
            </div>
            <span style={{ fontSize:'11px', fontWeight:500, padding:'2px 7px', borderRadius:'10px', background:t.type==='prov'?'#EFF6FF':'#F0FDF4', color:t.type==='prov'?'#2563EB':'#16A34A', display:'inline-block' }}>
              {t.type==='prov'?'Prov':'Retail'}
            </span>
            <span style={{ fontSize:'11px', color:text2 }}>{t.plan}</span>
            <span style={{ fontSize:'13px', fontWeight:700, color:accent, fontFamily:"'Fraunces',serif" }}>S/ {t.mrr.toLocaleString()}</span>
            <span style={{ fontSize:'11px', color:text2 }}>{t.nextBill}</span>
            <span style={{ fontSize:'10px', fontWeight:600, padding:'2px 8px', borderRadius:'10px', background:SB[t.status], color:ST[t.status], display:'inline-block' }}>
              {t.status.charAt(0).toUpperCase()+t.status.slice(1)}
            </span>
            <span style={{ fontSize:'12px', color:accent, textAlign:'right' }}>→</span>
          </div>
        ))}
      </div>
    </div>
  )
}
