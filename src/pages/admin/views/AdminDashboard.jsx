import { useState } from 'react'

const TENANTS = [
  { name: 'Arca Continental', slug: 'arca-continental',  type: 'prov', plan: 'Enterprise', txns: 428, status: 'ok',    lastSeen: 'hace 2 min' },
  { name: 'Wong S.A.',        slug: 'wong-supermercados', type: 'ret',  plan: 'Enterprise', txns: 214, status: 'ok',    lastSeen: 'hace 1 min' },
  { name: 'Tottus Perú',      slug: 'tottus-peru',       type: 'ret',  plan: 'Enterprise', txns: 98,  status: 'warn',  lastSeen: 'hace 8 min' },
  { name: 'Plaza Vea',        slug: 'plaza-vea-spsa',    type: 'ret',  plan: 'Pro',        txns: 176, status: 'ok',    lastSeen: 'hace 4 min' },
  { name: 'Metro',            slug: 'metro-cencosud',    type: 'ret',  plan: 'Pro',        txns: 331, status: 'ok',    lastSeen: 'hace 3 min' },
  { name: 'Vivanda',          slug: 'vivanda-sa',        type: 'ret',  plan: 'Pro',        txns: 0,   status: 'pause', lastSeen: 'hace 2h' },
]

const LOGS = [
  { type: 'err',  text: 'Error XML · FAC-2025-00412 · Tottus · código SUNAT 2329', time: '15:33' },
  { type: 'warn', text: 'Reintento EDI pendiente · OC-2025-0849 · Tottus → Arca',  time: '15:31' },
  { type: 'ok',   text: 'Nuevo tenant · Vivanda S.A. · plan Pro activado',          time: '14:52' },
  { type: 'ok',   text: '1,000 transacciones procesadas · milestone superado',      time: '13:20' },
  { type: 'ok',   text: 'FAC-2025-00410 validada · SUNAT OK · S/ 48,320',          time: '12:05' },
]

const SC = { ok: '#10B981', warn: '#F59E0B', err: '#EF4444', pause: '#9CA3AF' }
const SL = { ok: 'Operativo', warn: '1 error EDI', err: 'Error crítico', pause: 'En pausa' }
const LC = { ok: '#10B981', warn: '#F59E0B', err: '#EF4444' }

export default function AdminDashboard({ accent, accentBg, text, text2, text3, border, white }) {
  const [hov, setHov] = useState(null)

  const card = { background: white, border: `1px solid ${border}`, borderRadius: '12px' }

  return (
    <div className="fade-in">

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '10px', marginBottom: '20px' }}>
        {[
          { label: 'API SUNAT',      val: 'Operativo', sub: 'Latencia 98ms', pct: 98,  color: '#10B981' },
          { label: 'Txns hoy',       val: '1,247',     sub: '+12% vs ayer',  pct: 74,  color: accent },
          { label: 'Errores activos',val: '2',         sub: '1 EDI · 1 XML', pct: 8,   color: '#F59E0B' },
          { label: 'Tenants online', val: '8/9',       sub: '1 en pausa',    pct: 89,  color: accent },
          { label: 'Uptime 30 días', val: '99.97%',    sub: 'SLA cumplido',  pct: 100, color: '#10B981' },
        ].map(({ label, val, sub, pct, color }) => (
          <div key={label} className="kpi-card" style={{ ...card, padding: '14px 16px', position: 'relative', overflow: 'hidden', cursor: 'default' }}>
            <div style={{ fontSize: '10px', color: text3, textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: '8px', fontWeight: 500 }}>{label}</div>
            <div style={{ fontSize: '22px', fontWeight: 500, color: val === 'Operativo' ? color : text, lineHeight: 1, marginBottom: '4px', fontFamily: "'Fraunces', serif" }}>{val}</div>
            <div style={{ fontSize: '11px', color: text3 }}>{sub}</div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', width: `${pct}%`, background: color, opacity: .6 }} />
          </div>
        ))}
      </div>

      {/* Header tabla */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 500, color: text }}>Tenants activos</div>
          <div style={{ fontSize: '11px', color: text3, marginTop: '1px' }}>Estado en tiempo real · últimos 5 min</div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', padding: '6px 14px', borderRadius: '8px', border: `1px solid rgba(0,194,168,0.25)`, background: accentBg, color: accent, cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
          + Nuevo tenant
        </button>
      </div>

      {/* Tabla */}
      <div style={{ ...card, overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr .75fr .85fr .6fr 1fr .85fr .4fr', gap: '8px', padding: '8px 16px', background: '#FAFAF9', borderBottom: `1px solid ${border}` }}>
          {['Empresa','Tipo','Plan','Txns hoy','Estado','Últ. actividad',''].map(h => (
            <span key={h} style={{ fontSize: '10px', color: text3, textTransform: 'uppercase', letterSpacing: '.7px', fontWeight: 500 }}>{h}</span>
          ))}
        </div>
        {TENANTS.map((t, i) => (
          <div key={t.slug} className="t-row"
            onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
            style={{ display: 'grid', gridTemplateColumns: '2fr .75fr .85fr .6fr 1fr .85fr .4fr', gap: '8px', padding: '10px 16px', borderBottom: i < TENANTS.length - 1 ? `1px solid ${border}` : 'none', alignItems: 'center', background: hov === i ? '#FAFAF9' : white, transition: 'background .1s' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: SC[t.status], flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: text }}>{t.name}</div>
                <div style={{ fontSize: '10px', color: text3, fontFamily: 'monospace' }}>{t.slug}</div>
              </div>
            </div>

            <span style={{ fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '20px', background: t.type === 'prov' ? '#EFF6FF' : '#F0FDF4', color: t.type === 'prov' ? '#2563EB' : '#16A34A', display: 'inline-block' }}>
              {t.type === 'prov' ? 'Proveedor' : 'Retail'}
            </span>

            <span style={{ fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '20px', background: t.plan === 'Enterprise' ? '#F5F3FF' : '#F3F4F6', color: t.plan === 'Enterprise' ? '#7C3AED' : '#6B7280', display: 'inline-block' }}>
              {t.plan}
            </span>

            <span style={{ fontSize: '13px', fontWeight: 500, color: t.txns > 0 ? text : text3 }}>{t.txns > 0 ? t.txns.toLocaleString() : '—'}</span>

            <span style={{ fontSize: '11px', fontWeight: 500, padding: '3px 8px', borderRadius: '20px', background: `${SC[t.status]}14`, color: SC[t.status], display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: SC[t.status], flexShrink: 0 }} />
              {SL[t.status]}
            </span>

            <span style={{ fontSize: '11px', color: text3 }}>{t.lastSeen}</span>

            <span style={{ fontSize: '12px', color: text3, cursor: 'pointer', textAlign: 'right' }}
              onMouseEnter={e => e.currentTarget.style.color = text}
              onMouseLeave={e => e.currentTarget.style.color = text3}
            >→</span>
          </div>
        ))}
      </div>

      {/* Log + MRR */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 210px', gap: '12px' }}>

        <div>
          <div style={{ fontSize: '13px', fontWeight: 500, color: text, marginBottom: '8px' }}>Eventos recientes</div>
          <div style={{ ...card }}>
            {LOGS.map((log, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 16px', borderBottom: i < LOGS.length - 1 ? `1px solid ${border}` : 'none' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: LC[log.type] || text3, marginTop: '5px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: text2, lineHeight: 1.5 }}>{log.text}</div>
                  <div style={{ fontSize: '10px', color: text3, marginTop: '2px' }}>{log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '13px', fontWeight: 500, color: text, marginBottom: '8px' }}>Métricas de negocio</div>
          <div style={{ ...card, padding: '14px' }}>
            {[
              { label: 'MRR',                   val: 'S/ 8,400',   trend: '↑ +18% vs mes anterior', ok: true },
              { label: 'Volumen transaccionado', val: 'S/ 2.4M',    trend: 'Mayo 2026 · acumulado',  ok: null },
              { label: 'Tenants pagos',          val: '9',          trend: '3 Enterprise · 6 Pro',   ok: null },
              { label: 'ARR proyectado',         val: 'S/ 100,800', trend: null,                     ok: null },
            ].map(({ label, val, trend, ok }, i, arr) => (
              <div key={label} style={{ paddingBottom: i < arr.length - 1 ? '12px' : 0, marginBottom: i < arr.length - 1 ? '12px' : 0, borderBottom: i < arr.length - 1 ? `1px solid ${border}` : 'none' }}>
                <div style={{ fontSize: '10px', color: text3, textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '3px' }}>{label}</div>
                <div style={{ fontSize: '20px', fontWeight: 500, color: text, fontFamily: "'Fraunces', serif", lineHeight: 1 }}>{val}</div>
                {trend && <div style={{ fontSize: '11px', color: ok ? '#10B981' : text3, marginTop: '3px' }}>{trend}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
