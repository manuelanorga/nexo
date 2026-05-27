import { useState, useEffect, useRef } from 'react'

const SERVICES = [
  { id:'api',      name:'API NEXO',          url:'api.nexo.pe',           status:'ok',   latency:42,  uptime:99.98 },
  { id:'sunat',    name:'SUNAT / SBS',        url:'api.apis.net.pe',       status:'ok',   latency:180, uptime:99.71 },
  { id:'supabase', name:'Base de datos',      url:'supabase.nexo.pe',      status:'ok',   latency:18,  uptime:100   },
  { id:'storage',  name:'Storage',            url:'storage.nexo.pe',       status:'ok',   latency:24,  uptime:99.99 },
  { id:'sap',      name:'SAP Arca (webhook)', url:'sap.arcacontinental.pe',status:'warn', latency:890, uptime:97.40 },
  { id:'email',    name:'Email / SMTP',       url:'smtp.nexo.pe',          status:'ok',   latency:95,  uptime:99.95 },
]

const LOGS_INIT = [
  { id:1, ts:'10:42:31', level:'warn',  service:'SAP',    msg:'Webhook timeout — retry 1/3', tenant:'Arca Continental' },
  { id:2, ts:'10:41:15', level:'ok',    service:'API',    msg:'OC-2025-0841 procesada OK', tenant:'Wong S.A.' },
  { id:3, ts:'10:40:52', level:'ok',    service:'SUNAT',  msg:'TC actualizado S/ 3.73', tenant:'Sistema' },
  { id:4, ts:'10:39:20', level:'error', service:'SAP',    msg:'Connection refused — host unreachable', tenant:'Arca Continental' },
  { id:5, ts:'10:38:05', level:'ok',    service:'API',    msg:'OC-2025-0840 procesada OK', tenant:'Tottus Perú' },
  { id:6, ts:'10:37:44', level:'warn',  service:'Email',  msg:'SMTP queue delay >2s', tenant:'Sistema' },
  { id:7, ts:'10:35:12', level:'ok',    service:'DB',     msg:'Backup diario completado', tenant:'Sistema' },
  { id:8, ts:'10:30:01', level:'ok',    service:'API',    msg:'Deploy v1.4.2 completado', tenant:'Sistema' },
]

const ALERTS_INIT = [
  { id:1, name:'API Latencia alta',      condition:'latencia > 500ms',    channel:'email', active:true,  triggered:false },
  { id:2, name:'SAP Webhook caído',      condition:'timeout > 3 reintentos', channel:'whatsapp', active:true,  triggered:true  },
  { id:3, name:'Error rate > 5%',        condition:'errors/min > 5',      channel:'email', active:true,  triggered:false },
  { id:4, name:'DB conexiones agotadas', condition:'connections > 95%',   channel:'email', active:false, triggered:false },
  { id:5, name:'Uptime < 99%',           condition:'uptime < 99%',        channel:'whatsapp', active:true,  triggered:false },
]

const LC = { ok:'#10B981', warn:'#F59E0B', error:'#EF4444' }
const LB = { ok:'#F0FDF4', warn:'#FFFBEB', error:'#FEF2F2' }
const LT = { ok:'#166534', warn:'#92400E', error:'#991B1B' }

function Pulse({ color }) {
  return (
    <div style={{ position:'relative', width:'10px', height:'10px', flexShrink:0 }}>
      <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:color, opacity:.3, animation:'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }}/>
      <div style={{ position:'absolute', inset:'2px', borderRadius:'50%', background:color }}/>
    </div>
  )
}

function Sparkline({ data, color }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 80, h = 28
  const points = data.map((v,i) => `${(i/(data.length-1))*w},${h-((v-min)/range)*(h-4)+2}`).join(' ')
  return (
    <svg width={w} height={h} style={{ overflow:'visible' }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".8"/>
      <circle cx={parseFloat(points.split(' ').pop().split(',')[0])} cy={parseFloat(points.split(' ').pop().split(',')[1])} r="2.5" fill={color}/>
    </svg>
  )
}

export default function SistemaView({ accent, accentBg, text, text2, text3, border, white, bg }) {
  const [services, setServices]   = useState(SERVICES)
  const [logs, setLogs]           = useState(LOGS_INIT)
  const [alerts, setAlerts]       = useState(ALERTS_INIT)
  const [showNewAlert, setShowNewAlert] = useState(false)
  const [newAlert, setNewAlert]   = useState({ name:'', condition:'', channel:'email', active:true })
  const [latencyHistory]          = useState(() => SERVICES.map(() => Array.from({length:20}, () => Math.floor(Math.random()*100+20))))
  const [txnsHistory]             = useState(() => Array.from({length:20}, (_,i) => Math.floor(50+Math.sin(i/3)*20+Math.random()*10)))
  const [tick, setTick]           = useState(0)
  const logsRef                   = useRef(null)

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1)
      // Simular nuevo log ocasional
      if (Math.random() > 0.7) {
        const samples = [
          { level:'ok',   service:'API',   msg:'OC procesada OK',           tenant:'Wong S.A.' },
          { level:'ok',   service:'DB',    msg:'Query completada en 12ms',  tenant:'Sistema' },
          { level:'warn', service:'SAP',   msg:'Latencia alta 820ms',       tenant:'Arca Continental' },
          { level:'ok',   service:'SUNAT', msg:'RUC validado OK',           tenant:'Plaza Vea' },
        ]
        const sample = samples[Math.floor(Math.random()*samples.length)]
        const now = new Date()
        const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`
        setLogs(l => [{id: Date.now(), ts, ...sample}, ...l.slice(0,19)])
      }
      // Fluctuar latencias
      setServices(svcs => svcs.map(s => ({
        ...s,
        latency: Math.max(10, s.latency + (Math.random()-0.5)*20 | 0)
      })))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const allOk = services.every(s => s.status === 'ok')
  const hasWarn = services.some(s => s.status === 'warn')
  const hasError = services.some(s => s.status === 'error')
  const overallStatus = hasError ? 'error' : hasWarn ? 'warn' : 'ok'
  const overallLabel = { ok:'Todos los sistemas operativos', warn:'Degradación parcial detectada', error:'Incidente activo' }

  const card = { background:white, border:`1px solid ${border}`, borderRadius:'10px' }

  return (
    <div style={{ fontFamily:"'Inter',sans-serif" }}>
      <style>{`
        @keyframes ping { 0%{transform:scale(1);opacity:.3} 75%,100%{transform:scale(2);opacity:0} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>

      {/* Header status */}
      <div style={{ ...card, padding:'16px 20px', marginBottom:'14px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <Pulse color={LC[overallStatus]}/>
          <div>
            <div style={{ fontSize:'14px', fontWeight:600, color:text }}>{overallLabel[overallStatus]}</div>
            <div style={{ fontSize:'11px', color:text3, marginTop:'1px' }}>
              Última verificación: hace {tick % 3 === 0 ? '1' : tick % 3 === 1 ? '2' : '3'}s · {new Date().toLocaleDateString('es-PE', { weekday:'long', day:'numeric', month:'long' })}
            </div>
          </div>
        </div>
        <div style={{ display:'flex', gap:'8px' }}>
          {[
            { label:'Uptime global', val:'99.7%', color:'#10B981' },
            { label:'OCs hoy', val:'1,241', color:accent },
            { label:'Errores 24h', val:'3', color:'#F59E0B' },
          ].map(m => (
            <div key={m.label} style={{ textAlign:'center', padding:'8px 16px', background:bg, borderRadius:'8px', border:`1px solid ${border}` }}>
              <div style={{ fontSize:'9px', color:text3, textTransform:'uppercase', letterSpacing:'.6px', marginBottom:'2px' }}>{m.label}</div>
              <div style={{ fontSize:'16px', fontWeight:700, color:m.color, fontFamily:"'Fraunces',serif" }}>{m.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid principal */}
      <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:'14px', marginBottom:'14px' }}>

        {/* Servicios */}
        <div style={{ ...card, overflow:'hidden' }}>
          <div style={{ padding:'12px 16px', borderBottom:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ fontSize:'12px', fontWeight:600, color:text }}>Servicios</div>
            <div style={{ fontSize:'10px', color:text3 }}>{services.filter(s=>s.status==='ok').length}/{services.length} operativos</div>
          </div>
          {services.map((s,i) => (
            <div key={s.id} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'10px 16px', borderBottom: i<services.length-1?`1px solid ${border}`:'none', animation:'fadeIn .3s ease' }}>
              <Pulse color={LC[s.status]}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'12px', fontWeight:500, color:text }}>{s.name}</div>
                <div style={{ fontSize:'10px', color:text3, fontFamily:'monospace' }}>{s.url}</div>
              </div>
              <Sparkline data={latencyHistory[i]} color={LC[s.status]}/>
              <div style={{ textAlign:'right', minWidth:'60px' }}>
                <div style={{ fontSize:'12px', fontWeight:600, color: s.latency>500?'#EF4444':s.latency>200?'#F59E0B':'#10B981' }}>{s.latency}ms</div>
                <div style={{ fontSize:'9px', color:text3 }}>{s.uptime}% up</div>
              </div>
              <span style={{ fontSize:'10px', fontWeight:600, padding:'2px 7px', borderRadius:'10px', background:LB[s.status], color:LT[s.status], minWidth:'44px', textAlign:'center' }}>
                {s.status==='ok'?'OK':s.status==='warn'?'WARN':'ERROR'}
              </span>
            </div>
          ))}
        </div>

        {/* Métricas */}
        <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          {/* Transacciones */}
          <div style={{ ...card, padding:'14px 16px' }}>
            <div style={{ fontSize:'12px', fontWeight:600, color:text, marginBottom:'10px' }}>Transacciones / min</div>
            <div style={{ display:'flex', alignItems:'flex-end', gap:'8px', marginBottom:'8px' }}>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:'24px', fontWeight:700, color:text }}>{txnsHistory[txnsHistory.length-1 - (tick%5)]}</div>
              <div style={{ fontSize:'11px', color:'#10B981', marginBottom:'4px' }}>↑ 12%</div>
            </div>
            <Sparkline data={txnsHistory} color={accent}/>
          </div>

          {/* Cola de docs */}
          <div style={{ ...card, padding:'14px 16px' }}>
            <div style={{ fontSize:'12px', fontWeight:600, color:text, marginBottom:'12px' }}>Cola de documentos</div>
            {[
              { label:'OCs pendientes',    val:3,  color:'#0E4D92' },
              { label:'En procesamiento', val:1,  color:'#F59E0B' },
              { label:'Reintentos',        val:2,  color:'#EF4444' },
              { label:'Completados hoy',   val:1241, color:'#10B981' },
            ].map(m => (
              <div key={m.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 0', borderBottom:`1px solid ${border}` }}>
                <span style={{ fontSize:'11px', color:text2 }}>{m.label}</span>
                <span style={{ fontSize:'13px', fontWeight:700, color:m.color, fontFamily:"'Fraunces',serif" }}>{m.val.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alertas */}
      <div style={{ ...card, overflow:'hidden', marginBottom:'14px' }}>
        <div style={{ padding:'12px 16px', borderBottom:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize:'12px', fontWeight:600, color:text }}>Alertas configuradas</div>
            <div style={{ fontSize:'10px', color:text3, marginTop:'1px' }}>{alerts.filter(a=>a.active).length} activas · {alerts.filter(a=>a.triggered).length} disparadas</div>
          </div>
          <button onClick={() => setShowNewAlert(true)}
            style={{ display:'flex', alignItems:'center', gap:'5px', padding:'6px 14px', border:'none', background:accent, color:'#fff', borderRadius:'7px', fontSize:'12px', fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
            + Nueva alerta
          </button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0' }}>
          {alerts.map((a,i) => (
            <div key={a.id} style={{ padding:'12px 16px', borderBottom: i<alerts.length-2?`1px solid ${border}`:'none', borderRight: i%2===0?`1px solid ${border}`:'none', display:'flex', alignItems:'center', gap:'12px' }}>
              <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: a.triggered?'#EF4444':a.active?'#10B981':'#E5E7EB', flexShrink:0, ...(a.triggered?{animation:'ping 1s infinite'}:{}) }}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'12px', fontWeight:500, color:text, display:'flex', alignItems:'center', gap:'6px' }}>
                  {a.name}
                  {a.triggered && <span style={{ fontSize:'9px', background:'#FEF2F2', color:'#DC2626', padding:'1px 6px', borderRadius:'8px', fontWeight:600 }}>DISPARADA</span>}
                </div>
                <div style={{ fontSize:'10px', color:text3, marginTop:'1px', fontFamily:'monospace' }}>{a.condition} · {a.channel}</div>
              </div>
              <button onClick={() => setAlerts(al => al.map(x => x.id===a.id?{...x,active:!x.active}:x))}
                style={{ width:'36px', height:'20px', borderRadius:'10px', border:'none', background:a.active?accent:'#E5E7EB', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}>
                <div style={{ width:'14px', height:'14px', borderRadius:'50%', background:'#fff', position:'absolute', top:'3px', transition:'left .2s', left:a.active?'19px':'3px', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }}/>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Log en tiempo real */}
      <div style={{ ...card, overflow:'hidden' }}>
        <div style={{ padding:'12px 16px', borderBottom:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#10B981', animation:'ping 1.5s infinite' }}/>
            <div style={{ fontSize:'12px', fontWeight:600, color:text }}>Log en tiempo real</div>
          </div>
          <div style={{ fontSize:'10px', color:text3 }}>Actualizando cada 2.5s</div>
        </div>
        <div ref={logsRef} style={{ maxHeight:'240px', overflowY:'auto', fontFamily:'monospace' }}>
          {logs.map((log,i) => (
            <div key={log.id} style={{ display:'grid', gridTemplateColumns:'70px 50px 60px 1fr auto', gap:'8px', padding:'7px 16px', borderBottom:`1px solid ${border}`, fontSize:'11px', background: i===0?`${LB[log.level]}`:white, animation: i===0?'fadeIn .3s ease':'none', alignItems:'center' }}>
              <span style={{ color:text3 }}>{log.ts}</span>
              <span style={{ fontWeight:700, color:LC[log.level] }}>{log.level.toUpperCase()}</span>
              <span style={{ color:text2, background:bg, padding:'1px 5px', borderRadius:'4px', fontSize:'10px' }}>{log.service}</span>
              <span style={{ color:text }}>{log.msg}</span>
              <span style={{ color:text3, fontSize:'10px', whiteSpace:'nowrap' }}>{log.tenant}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal nueva alerta */}
      {showNewAlert && (
        <>
          <div onClick={() => setShowNewAlert(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.3)', zIndex:60, backdropFilter:'blur(2px)' }}/>
          <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'440px', background:white, borderRadius:'14px', zIndex:70, boxShadow:'0 24px 64px rgba(0,0,0,0.15)', overflow:'hidden' }}>
            <div style={{ padding:'18px 24px 14px', borderBottom:`1px solid ${border}` }}>
              <div style={{ fontSize:'15px', fontWeight:600, color:text }}>Nueva alerta</div>
              <div style={{ fontSize:'11px', color:text3, marginTop:'2px' }}>Te notificamos cuando se cumpla la condición</div>
            </div>
            <div style={{ padding:'20px 24px' }}>
              {[
                { label:'Nombre de la alerta', key:'name', placeholder:'Ej: API caída' },
                { label:'Condición', key:'condition', placeholder:'Ej: latencia > 1000ms' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom:'14px' }}>
                  <label style={{ fontSize:'11px', fontWeight:600, color:text2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>{f.label}</label>
                  <input value={newAlert[f.key]} onChange={e => setNewAlert(a=>({...a,[f.key]:e.target.value}))} placeholder={f.placeholder}
                    style={{ width:'100%', padding:'8px 12px', border:`1px solid ${border}`, borderRadius:'8px', fontSize:'13px', fontFamily:"'Inter',sans-serif", color:text, outline:'none', boxSizing:'border-box' }}/>
                </div>
              ))}
              <div style={{ marginBottom:'20px' }}>
                <label style={{ fontSize:'11px', fontWeight:600, color:text2, textTransform:'uppercase', letterSpacing:'.5px', display:'block', marginBottom:'5px' }}>Canal de notificación</label>
                <div style={{ display:'flex', gap:'8px' }}>
                  {['email','whatsapp','ambos'].map(ch => (
                    <button key={ch} onClick={() => setNewAlert(a=>({...a,channel:ch}))}
                      style={{ flex:1, padding:'8px', border:`1px solid ${newAlert.channel===ch?accent:border}`, borderRadius:'8px', background: newAlert.channel===ch?accentBg:white, color: newAlert.channel===ch?accent:text2, fontSize:'12px', fontWeight: newAlert.channel===ch?600:400, cursor:'pointer', fontFamily:"'Inter',sans-serif", textTransform:'capitalize' }}>
                      {ch === 'email' ? '📧 Email' : ch === 'whatsapp' ? '💬 WhatsApp' : '🔔 Ambos'}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display:'flex', gap:'8px' }}>
                <button onClick={() => setShowNewAlert(false)} style={{ flex:1, padding:'10px', border:`1px solid ${border}`, borderRadius:'8px', background:bg, color:text2, fontSize:'13px', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Cancelar</button>
                <button onClick={() => {
                  if (!newAlert.name || !newAlert.condition) return
                  setAlerts(al => [...al, { id:Date.now(), ...newAlert, triggered:false }])
                  setNewAlert({ name:'', condition:'', channel:'email', active:true })
                  setShowNewAlert(false)
                }} style={{ flex:2, padding:'10px', border:'none', borderRadius:'8px', background:accent, color:'#fff', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                  Crear alerta
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
