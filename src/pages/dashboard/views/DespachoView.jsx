import { useState, useMemo } from 'react'
import Badge from '../../../components/Badge'
import { useApp } from '../../../context/AppContext'

const despachos = [
  {
    id: 'ASN-2025-0421', oc: 'OC-2025-0841', destino: 'Wong Supermercados',
    direccion: 'Av. Elmer Faucett 3432, Callao', despacho: '18/05/2026',
    llegada: '23/05/2026 09:00', bultos: 32, placa: 'ABC-123',
    transportista: 'Ransa Comercial S.A.', status: 'confirmed',
    productos: [
      { nombre: 'Inca Kola 1.5L', bultos: 20, unidades: 240 },
      { nombre: 'Coca-Cola 500ml', bultos: 8, unidades: 192 },
      { nombre: 'Sprite 500ml', bultos: 4, unidades: 96 },
    ]
  },
  {
    id: 'ASN-2025-0420', oc: 'OC-2025-0840', destino: 'Plaza Vea',
    direccion: 'Av. Universitaria 1880, San Miguel', despacho: '17/05/2026',
    llegada: '22/05/2026 10:00', bultos: 24, placa: 'XYZ-456',
    transportista: 'Transvida S.A.C.', status: 'dispatched',
    productos: [
      { nombre: 'Coca-Cola 1.5L', bultos: 14, unidades: 168 },
      { nombre: 'Fanta Naranja 1.5L', bultos: 10, unidades: 120 },
    ]
  },
  {
    id: 'ASN-2025-0419', oc: 'OC-2025-0839', destino: 'Tottus',
    direccion: 'Av. La Marina 2000, San Miguel', despacho: '16/05/2026',
    llegada: '21/05/2026 08:00', bultos: 48, placa: 'DEF-789',
    transportista: 'Ransa Comercial S.A.', status: 'received',
    productos: [
      { nombre: 'Inca Kola 1.5L', bultos: 24, unidades: 288 },
      { nombre: 'Coca-Cola Zero 500ml', bultos: 14, unidades: 336 },
      { nombre: 'Sprite 500ml', bultos: 10, unidades: 240 },
    ]
  },
  {
    id: 'ASN-2025-0418', oc: 'OC-2025-0837', destino: 'Vivanda',
    direccion: 'Av. Conquistadores 510, San Isidro', despacho: '14/05/2026',
    llegada: '19/05/2026 09:00', bultos: 14, placa: 'GHI-321',
    transportista: 'Transvida S.A.C.', status: 'received',
    productos: [
      { nombre: 'Inca Kola 2.5L', bultos: 8, unidades: 48 },
      { nombre: 'Coca-Cola 500ml', bultos: 6, unidades: 144 },
    ]
  },
]

const statusConfig = {
  confirmed:  { label: 'Programado',   color: '#1D4ED8', bg: '#DBEAFE' },
  dispatched: { label: 'En tránsito',  color: '#92400E', bg: '#FEF3C7' },
  received:   { label: 'Entregado',    color: '#166534', bg: '#EAF3DE' },
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.confirmed
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, background: cfg.bg, color: cfg.color }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: cfg.color, flexShrink: 0 }} />
      {cfg.label}
    </span>
  )
}

function ASNModal({ asn, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.25)' }} onClick={e => e.stopPropagation()}>

        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', fontWeight: 900, color: '#0B1F3A' }}>Aviso de Despacho</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#0E4D92', fontWeight: 700 }}>{asn.id}</span>
              <StatusBadge status={asn.status} />
            </div>
          </div>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', cursor: 'pointer', fontSize: '16px', color: '#6B8BAE' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

          {/* Info logística */}
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Información de entrega</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '20px' }}>
            {[
              ['OC de origen', asn.oc],
              ['Destinatario', asn.destino],
              ['Dirección entrega', asn.direccion],
              ['Fecha despacho', asn.despacho],
              ['Llegada estimada', asn.llegada],
              ['Total bultos', asn.bultos + ' bultos'],
              ['Placa vehículo', asn.placa],
              ['Transportista', asn.transportista],
              ['Estado', statusConfig[asn.status]?.label],
            ].map(([k,v]) => (
              <div key={k} style={{ background: '#F8FBFF', borderRadius: '8px', padding: '10px 12px' }}>
                <div style={{ fontSize: '10px', color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '3px' }}>{k}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Productos */}
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Contenido del despacho</div>
          <div style={{ border: '1px solid rgba(14,77,146,0.08)', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
                  {['Producto','Bultos','Unidades'].map(h => (
                    <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {asn.productos.map(p => (
                  <tr key={p.nombre} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)' }}>
                    <td style={{ padding: '9px 14px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{p.nombre}</td>
                    <td style={{ padding: '9px 14px', fontSize: '12px', color: '#0B1F3A', textAlign: 'center' }}>{p.bultos}</td>
                    <td style={{ padding: '9px 14px', fontSize: '12px', fontWeight: 700, color: '#0B1F3A', textAlign: 'center' }}>{p.unidades}</td>
                  </tr>
                ))}
                <tr style={{ background: '#F8FBFF' }}>
                  <td style={{ padding: '9px 14px', fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>Total</td>
                  <td style={{ padding: '9px 14px', fontSize: '12px', fontWeight: 700, color: '#0B1F3A', textAlign: 'center' }}>{asn.bultos}</td>
                  <td style={{ padding: '9px 14px', fontSize: '12px', fontWeight: 700, color: '#0B1F3A', textAlign: 'center' }}>{asn.productos.reduce((s,p) => s+p.unidades, 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {asn.status === 'dispatched' && (
            <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#92400E' }}>
              🚛 Despacho en tránsito · Llegada estimada: <strong>{asn.llegada}</strong> · Placa: <strong>{asn.placa}</strong>
            </div>
          )}
        </div>

        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(14,77,146,0.08)', display: 'flex', gap: '8px', justifyContent: 'flex-end', background: '#F8FBFF' }}>
          <button style={{ padding: '8px 16px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Descargar PDF</button>
          {asn.status === 'confirmed' && (
            <button style={{ padding: '8px 20px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00C2A8', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              Confirmar despacho →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function NuevoASNModal({ onClose }) {
  const [form, setForm] = useState({ oc: '', destino: '', fecha: '', hora: '', placa: '', transportista: '' })
  const field = (label, key, placeholder) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</label>
      <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder}
        style={{ height: '34px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '0 10px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', outline: 'none', background: '#fff' }} />
    </div>
  )
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '500px', boxShadow: '0 24px 80px rgba(0,0,0,0.2)', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 900, color: '#0B1F3A' }}>Crear Aviso de Despacho</div>
          <button onClick={onClose} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', cursor: 'pointer', color: '#6B8BAE', fontSize: '14px' }}>✕</button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {field('OC de origen', 'oc', 'Ej: OC-2025-0841')}
            {field('Destinatario', 'destino', 'Ej: Wong Supermercados')}
            {field('Fecha de despacho', 'fecha', 'DD/MM/YYYY')}
            {field('Hora llegada estimada', 'hora', 'Ej: 09:00')}
            {field('Placa del vehículo', 'placa', 'Ej: ABC-123')}
            {field('Transportista', 'transportista', 'Ej: Ransa Comercial')}
          </div>
          <div style={{ background: '#F0F7FF', borderRadius: '8px', padding: '10px 14px', fontSize: '11px', color: '#6B8BAE', marginTop: '14px' }}>
            💡 El ASN se enviará automáticamente al destinatario para que prepare la recepción.
          </div>
        </div>
        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(14,77,146,0.08)', display: 'flex', gap: '8px', justifyContent: 'flex-end', background: '#F8FBFF' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Cancelar</button>
          <button onClick={() => { alert('ASN creado y enviado a ' + (form.destino || 'destinatario')); onClose() }} style={{ padding: '8px 20px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00C2A8', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            Crear y enviar ASN →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function DespachoView() {
  const { searchQuery } = useApp()
  const [selectedASN, setSelectedASN] = useState(null)
  const [showNuevo, setShowNuevo] = useState(false)

  const filtered = useMemo(() => {
    if (!searchQuery) return despachos
    const q = searchQuery.toLowerCase()
    return despachos.filter(d =>
      d.id.toLowerCase().includes(q) ||
      d.oc.toLowerCase().includes(q) ||
      d.destino.toLowerCase().includes(q) ||
      d.placa.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const enTransito = despachos.filter(d => d.status === 'dispatched').length
  const programados = despachos.filter(d => d.status === 'confirmed').length

  return (
    <div>
      {selectedASN && <ASNModal asn={selectedASN} onClose={() => setSelectedASN(null)} />}
      {showNuevo && <NuevoASNModal onClose={() => setShowNuevo(false)} />}

      {enTransito > 0 && (
        <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#92400E', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🚛 <strong>{enTransito} despacho{enTransito > 1 ? 's' : ''} en tránsito</strong> · {programados} programado{programados > 1 ? 's' : ''} próximamente
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', justifyContent: 'flex-end' }}>
        <button onClick={() => setShowNuevo(true)} style={{ padding: '7px 16px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00C2A8', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>+ Crear ASN</button>
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              {['N° ASN','OC Origen','Destinatario','F. Despacho','Llegada Est.','Bultos','Transportista','Estado','Acciones'].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)', transition: 'background .15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8FBFF'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#0B1F3A' }}>{d.id}</td>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#0E4D92' }}>{d.oc}</td>
                <td style={{ padding: '9px 12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{d.destino}</div>
                  <div style={{ fontSize: '10px', color: '#6B8BAE' }}>{d.direccion}</div>
                </td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{d.despacho}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{d.llegada}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 700, color: '#0B1F3A', textAlign: 'center' }}>{d.bultos}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{d.transportista}</td>
                <td style={{ padding: '9px 12px' }}><StatusBadge status={d.status} /></td>
                <td style={{ padding: '9px 12px' }}>
                  <button onClick={() => setSelectedASN(d)} style={{ padding: '4px 10px', background: '#0B1F3A', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#00C2A8', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ fontSize: '11px', color: '#6B8BAE', textAlign: 'right', marginTop: '8px' }}>
        Mostrando {filtered.length} de {despachos.length} avisos de despacho
      </div>
    </div>
  )
}
