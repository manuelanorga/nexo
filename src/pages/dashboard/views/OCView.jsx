import { useState, useEffect, useMemo } from 'react'
import { useIsMobile } from '../../../hooks/useMediaQuery'
import { purchaseOrders } from '../../../data/mockData'
import Badge from '../../../components/Badge'
import { useApp } from '../../../context/AppContext'
import { generarOCPDF } from '../../../utils/generarOCpdf'
import { QRCodeSVG as QRCode } from 'qrcode.react'

const allStatuses = [
  { key: 'all', label: 'Todas', color: '#6B8BAE', bg: '#F0F7FF' },
  { key: 'processing', label: 'En proceso', color: '#1D4ED8', bg: '#DBEAFE' },
  { key: 'published', label: 'Publicada', color: '#0E4D92', bg: '#EEF5FF' },
  { key: 'confirmed', label: 'Confirmada', color: '#065F46', bg: '#D1FAE5' },
  { key: 'dispatched', label: 'En despacho', color: '#92400E', bg: '#FEF3C7' },
  { key: 'received', label: 'Recibida', color: '#166534', bg: '#EAF3DE' },
  { key: 'rejected', label: 'Rechazada', color: '#B91C1C', bg: '#FEE2E2' },
  { key: 'cancelled', label: 'Cancelada', color: '#6B7280', bg: '#F3F4F6' },
]

const extendedOrders = [
  { id: 'OC-2025-0841', client: 'Wong', socio: 'Hipermercados Wong S.A.', date: '18/05', delivery: '23/05', amount: 'S/ 48,320', items: 12, status: 'confirmed', progress: 60 },
  { id: 'OC-2025-0840', client: 'Plaza Vea', socio: 'Cencosud Peru Retail S.A.', date: '17/05', delivery: '22/05', amount: 'S/ 32,150', items: 8, status: 'dispatched', progress: 80 },
  { id: 'OC-2025-0839', client: 'Tottus', socio: 'Hipermercados Tottus S.A.', date: '16/05', delivery: '21/05', amount: 'S/ 61,480', items: 15, status: 'received', progress: 100 },
  { id: 'OC-2025-0838', client: 'Metro', socio: 'Cencosud Peru Retail S.A.', date: '15/05', delivery: '20/05', amount: 'S/ 27,900', items: 6, status: 'published', progress: 30 },
  { id: 'OC-2025-0837', client: 'Vivanda', socio: 'Supermercados Peruanos S.A.', date: '14/05', delivery: '19/05', amount: 'S/ 19,540', items: 4, status: 'received', progress: 100 },
  { id: 'OC-2025-0836', client: 'Wong', socio: 'Hipermercados Wong S.A.', date: '13/05', delivery: '18/05', amount: 'S/ 43,200', items: 10, status: 'processing', progress: 10 },
  { id: 'OC-2025-0835', client: 'Tottus', socio: 'Hipermercados Tottus S.A.', date: '12/05', delivery: '17/05', amount: 'S/ 28,900', items: 7, status: 'rejected', progress: 0 },
  { id: 'OC-2025-0834', client: 'Metro', socio: 'Cencosud Peru Retail S.A.', date: '11/05', delivery: '16/05', amount: 'S/ 15,600', items: 5, status: 'cancelled', progress: 0 },
]

const statusConfig = {
  processing: { label: 'En proceso', color: '#1D4ED8', bg: '#DBEAFE' },
  published:  { label: 'Publicada',  color: '#0E4D92', bg: '#EEF5FF' },
  confirmed:  { label: 'Confirmada', color: '#065F46', bg: '#D1FAE5' },
  dispatched: { label: 'En despacho',color: '#92400E', bg: '#FEF3C7' },
  received:   { label: 'Recibida',   color: '#166534', bg: '#EAF3DE' },
  rejected:   { label: 'Rechazada',  color: '#B91C1C', bg: '#FEE2E2' },
  cancelled:  { label: 'Cancelada',  color: '#6B7280', bg: '#F3F4F6' },
  pending:    { label: 'Pendiente',  color: '#854D0E', bg: '#FEF9C3' },
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.pending
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, background: cfg.bg, color: cfg.color }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: cfg.color, flexShrink: 0 }} />
      {cfg.label}
    </span>
  )
}

function ConfirmModal({ oc, onClose, onConfirm }) {
  const [partial, setPartial] = useState(false)
  const [note, setNote] = useState('')
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '440px', boxShadow: '0 24px 80px rgba(0,0,0,0.2)', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 900, color: '#0B1F3A' }}>Confirmar orden</div>
          <button onClick={onClose} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', cursor: 'pointer', color: '#6B8BAE', fontSize: '14px' }}>✕</button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          <div style={{ background: '#F0F7FF', borderRadius: '8px', padding: '12px 14px', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A', marginBottom: '4px' }}>{oc.id} · {oc.client}</div>
            <div style={{ fontSize: '11px', color: '#6B8BAE' }}>{oc.items} items · {oc.amount} · Entrega {oc.delivery}</div>
          </div>
          <div style={{ marginBottom: '14px' }}>
            <div onClick={() => setPartial(!partial)} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px 12px', borderRadius: '8px', border: partial ? '1.5px solid #F59E0B' : '1px solid rgba(14,77,146,0.1)', background: partial ? '#FFFBEB' : '#fff', marginBottom: '8px' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: '1.5px solid', borderColor: partial ? '#F59E0B' : '#D1DCF0', background: partial ? '#F59E0B' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {partial && <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>✓</span>}
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>Confirmación parcial</div>
                <div style={{ fontSize: '10px', color: '#6B8BAE' }}>Stock insuficiente para surtir todo el pedido</div>
              </div>
            </div>
          </div>
          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '5px' }}>Nota para el retail (opcional)</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Ej: Se confirma despacho para el 23/05..." style={{ width: '100%', height: '72px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', outline: 'none', resize: 'none' }} />
          </div>
        </div>
        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(14,77,146,0.08)', display: 'flex', gap: '8px', justifyContent: 'flex-end', background: '#F8FBFF' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Cancelar</button>
          <button onClick={() => { onConfirm(oc.id, partial ? 'partial' : 'full'); onClose() }} style={{ padding: '8px 20px', background: '#065F46', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#D1FAE5', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            {partial ? 'Confirmar parcial' : 'Confirmar orden'} ✓
          </button>
        </div>
      </div>
    </div>
  )
}

function RejectModal({ oc, onClose, onReject }) {
  const [motivo, setMotivo] = useState('')
  const motivos = ['Producto descontinuado', 'SKU no existe en catálogo', 'Precio no coincide con lista', 'Stock insuficiente', 'Error en la OC', 'Otro']
  const [selected, setSelected] = useState('')
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '440px', boxShadow: '0 24px 80px rgba(0,0,0,0.2)', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 900, color: '#B91C1C' }}>Rechazar orden</div>
          <button onClick={onClose} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', cursor: 'pointer', color: '#6B8BAE', fontSize: '14px' }}>✕</button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          <div style={{ background: '#FFF5F5', border: '1px solid #FECACA', borderRadius: '8px', padding: '12px 14px', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A', marginBottom: '4px' }}>{oc.id} · {oc.client}</div>
            <div style={{ fontSize: '11px', color: '#6B8BAE' }}>{oc.items} items · {oc.amount}</div>
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '8px' }}>Motivo de rechazo</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {motivos.map(m => (
                <div key={m} onClick={() => setSelected(m)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', border: selected === m ? '1.5px solid #E05252' : '1px solid rgba(14,77,146,0.1)', background: selected === m ? '#FFF5F5' : '#fff' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid', borderColor: selected === m ? '#E05252' : '#D1DCF0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {selected === m && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E05252' }} />}
                  </div>
                  <span style={{ fontSize: '12px', color: '#0B1F3A' }}>{m}</span>
                </div>
              ))}
            </div>
          </div>
          {selected === 'Otro' && (
            <div>
              <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '5px' }}>Especifica el motivo</label>
              <textarea value={motivo} onChange={e => setMotivo(e.target.value)} placeholder="Describe el motivo..." style={{ width: '100%', height: '72px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', outline: 'none', resize: 'none' }} />
            </div>
          )}
        </div>
        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(14,77,146,0.08)', display: 'flex', gap: '8px', justifyContent: 'flex-end', background: '#F8FBFF' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Cancelar</button>
          <button disabled={!selected} onClick={() => { onReject(oc.id, selected === 'Otro' ? motivo : selected); onClose() }} style={{ padding: '8px 20px', background: selected ? '#B91C1C' : '#F3F4F6', border: 'none', borderRadius: '8px', fontSize: '12px', color: selected ? '#fff' : '#9CA3AF', fontWeight: 700, cursor: selected ? 'pointer' : 'not-allowed', fontFamily: "'DM Sans', sans-serif" }}>
            Rechazar orden ✕
          </button>
        </div>
      </div>
    </div>
  )
}

const productos = [
  { ean: '07702459082090', nombre: 'Inca Kola 1.5L', presentacion: 'Pack x12', cantidad: 24, bonificada: 2, precio: 62.40, subtotal: 1497.60 },
  { ean: '07702459082014', nombre: 'Coca-Cola 500ml', presentacion: 'Pack x24', cantidad: 48, bonificada: 4, precio: 48.00, subtotal: 2304.00 },
  { ean: '07702459082038', nombre: 'Coca-Cola Zero 500ml', presentacion: 'Pack x24', cantidad: 36, bonificada: 3, precio: 48.00, subtotal: 1728.00 },
  { ean: '07702459082045', nombre: 'Sprite 500ml', presentacion: 'Pack x24', cantidad: 24, bonificada: 2, precio: 46.80, subtotal: 1123.20 },
]

function OCModal({ oc, onClose, setView, onConfirm, onReject }) {
  const isMobile = window.innerWidth < 768
  const [showConfirm, setShowConfirm] = useState(false)
  const [showReject, setShowReject] = useState(false)
  const cfg = statusConfig[oc.status] || statusConfig.pending
  const canAct = ['published', 'processing'].includes(oc.status)

  return (
    <>
      {showConfirm && <ConfirmModal oc={oc} onClose={() => setShowConfirm(false)} onConfirm={onConfirm} />}
      {showReject && <RejectModal oc={oc} onClose={() => setShowReject(false)} onReject={onReject} />}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
        <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '780px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.25)' }} onClick={e => e.stopPropagation()}>

          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', fontWeight: 900, color: '#0B1F3A', marginBottom: '3px' }}>Orden de Compra</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#0E4D92', fontWeight: 700 }}>{oc.id}</span>
                <StatusBadge status={oc.status} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {canAct && (
                <>
                  <button onClick={() => setShowReject(true)} style={{ padding: '7px 14px', background: '#FEE2E2', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#B91C1C', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>✕ Rechazar</button>
                  <button onClick={() => setShowConfirm(true)} style={{ padding: '7px 14px', background: '#D1FAE5', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#065F46', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>✓ Confirmar</button>
                </>
              )}
              <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', cursor: 'pointer', fontSize: '16px', color: '#6B8BAE' }}>✕</button>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '20px' }}>
              {[['Emisor','Arca Continental'],['Receptor',oc.client],['Socio Comercial',oc.socio || oc.client + ' S.A.C.'],['Fecha emisión',oc.date + '/2026'],['Entrega mínima',oc.date + '/2026'],['Entrega máxima',oc.delivery + '/2026'],['Tipo OC','220 - Orden de Compra'],['Medio de pago','42 - Cuenta bancaria'],['Estado',statusConfig[oc.status]?.label || 'Pendiente']].map(([k,v]) => (
                <div key={k} style={{ background: '#F8FBFF', borderRadius: '8px', padding: '10px 12px' }}>
                  <div style={{ fontSize: '10px', color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '3px' }}>{k}</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Productos — {oc.items} items</div>
            {isMobile ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0E4D92" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '.8px' }}>Productos — {productos.length} ítems</span>
                </div>
                {productos.map((p, idx) => {
                  const getBrandColors = (nombre) => {
                    const n = nombre.toLowerCase()
                    if (n.includes('inca kola')) return ['#FFD700', '#000']
                    if (n.includes('zero')) return ['#1a1a1a', '#E2001A']
                    if (n.includes('coca-cola') || n.includes('coca cola')) return ['#E2001A', '#fff']
                    if (n.includes('sprite')) return ['#00A550', '#fff']
                    if (n.includes('fanta naranja')) return ['#FF6600', '#fff']
                    if (n.includes('fanta')) return ['#FF6600', '#fff']
                    if (n.includes('schweppes')) return ['#FFD700', '#0E4D92']
                    if (n.includes('agua')) return ['#E0F4FF', '#0E4D92']
                    if (n.includes('powerade')) return ['#003DA5', '#fff']
                    if (n.includes('fuze')) return ['#6B2D8B', '#fff']
                    return ['#EEF5FF', '#0E4D92']
                  }
                  const [bg, fg] = getBrandColors(p.nombre)
                  const initials = p.nombre.split(' ').slice(0,2).map(w => w[0]).join('')
                  return (
                    <div key={p.ean} style={{ background: '#fff', borderRadius: '12px', border: '1px solid rgba(14,77,146,0.08)', padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, flexShrink: 0, letterSpacing: '.5px' }}>{initials}</div>
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#0B1F3A' }}>{p.nombre}</span>
                          <span style={{ fontSize: '10px', color: '#0E4D92', background: '#EEF5FF', padding: '1px 7px', borderRadius: '100px', whiteSpace: 'nowrap' }}>{p.presentacion}</span>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px', marginBottom: '8px' }}>
                        {[
                          ['M 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', '#0E4D92', 'Cant.', p.cantidad, '#0B1F3A'],
                          ['M9 14.25l1.75 1.75L15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', '#166534', 'Bonif.', p.bonificada || '—', '#166534'],
                          ['M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01', '#0E4D92', 'Precio', 'S/' + p.precio.toFixed(2), '#0B1F3A'],
                        ].map(([path, iconColor, label, val, valColor]) => (
                          <div key={label} style={{ background: '#F8FBFF', borderRadius: '8px', padding: '7px 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d={path}/></svg>
                            <div>
                              <div style={{ fontSize: '8px', color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '1px' }}>{label}</div>
                              <div style={{ fontSize: '14px', fontWeight: 600, color: valColor, lineHeight: 1 }}>{val}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid rgba(14,77,146,0.06)' }}>
                        <span style={{ fontSize: '10px', color: '#6B8BAE' }}>Subtotal</span>
                        <span style={{ fontSize: '16px', fontWeight: 700, color: '#0B1F3A' }}>S/{p.subtotal ? p.subtotal.toLocaleString() : (p.cantidad * p.precio).toLocaleString('es-PE', {minimumFractionDigits:2})}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
            <div style={{ border: '1px solid rgba(14,77,146,0.08)', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
                    {['EAN','Producto','Presentación','Cant.','Bonif.','Precio','Subtotal'].map(h => (
                      <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {productos.map(p => (
                    <tr key={p.ean} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)' }}>
                      <td style={{ padding: '9px 12px' }}><span style={{ fontFamily: 'monospace', fontSize: '10px', background: '#F0F7FF', color: '#6B8BAE', padding: '2px 6px', borderRadius: '4px' }}>{p.ean}</span></td>
                      <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{p.nombre}</td>
                      <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{p.presentacion}</td>
                      <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 700, color: '#0B1F3A', textAlign: 'center' }}>{p.cantidad}</td>
                      <td style={{ padding: '9px 12px', fontSize: '12px', color: '#166534', textAlign: 'center' }}>{p.bonificada}</td>
                      <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px' }}>S/{p.precio.toFixed(2)}</td>
                      <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700 }}>S/{p.subtotal.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ minWidth: '260px' }}>
                {[['Total sin impuestos','S/ 5,554.57'],['IGV (18%)','S/ 999.82'],['Total descuentos','S/ 0.00']].map(([k,v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(14,77,146,0.05)', fontSize: '12px' }}>
                    <span style={{ color: '#6B8BAE' }}>{k}</span><span>{v}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 0' }}>
                  <span style={{ fontWeight: 700, color: '#0B1F3A' }}>Valor Total</span>
                  <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, color: '#0B1F3A', fontSize: '18px' }}>{oc.amount}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(14,77,146,0.08)', display: 'flex', gap: '8px', justifyContent: 'space-between', background: '#F8FBFF', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['confirmed','dispatched','received','invoiced'].includes(oc.status) ? (
                <button onClick={() => generarOCPDF(oc)} style={{ padding: '7px 14px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00F5A0', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Descargar PDF</button>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '3px' }}>
                  <button disabled style={{ padding: '7px 14px', background: '#F8FBFF', border: '1px solid rgba(14,77,146,0.08)', borderRadius: '8px', fontSize: '12px', color: '#9DB8D9', cursor: 'not-allowed', fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9DB8D9" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    PDF
                  </button>
                  <span style={{ fontSize: '10px', color: '#9DB8D9', paddingLeft: '2px' }}>Disponible al confirmar</span>
                </div>
              )}
              {['confirmed','dispatched','received','invoiced'].includes(oc.status) && (
                <button onClick={() => {
                  const blob = new Blob([`ISA*00*          *00*          *ZZ*${oc.id}*ZZ*NEXO*260524*1432*U*00401*000000001*0*P*>
ST*850*0001
BEG*00*SA*${oc.id}**20260524
CTT*1
SE*4*0001
IEA*1*000000001`], { type: 'text/plain' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = oc.id + '.edi'
                  a.click()
                  URL.revokeObjectURL(url)
                }} style={{ padding: '7px 14px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Descargar EDI</button>
              )}

            </div>
            <button onClick={() => { onClose(); setView('trazabilidad') }} style={{ padding: '7px 16px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00F5A0', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              Ver trazabilidad →
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const ITEMS_PER_PAGE = 5
const TOTAL = 241


function QRModal({ oc, onClose }) {
  const url = `https://nexo-one-woad.vercel.app/dashboard?oc=${oc.id}`
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(11,31,58,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', maxWidth: '320px', width: '100%', textAlign: 'center', boxShadow: '0 24px 80px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 900, color: '#0B1F3A', marginBottom: '4px' }}>Código QR</div>
        <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#0E4D92', marginBottom: '16px' }}>{oc.id}</div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px', padding: '12px', background: '#F8FBFF', borderRadius: '10px', border: '1px solid rgba(14,77,146,0.1)' }}>
          <QRCode value={url} size={160} level="M" fgColor="#0B1F3A" bgColor="#F8FBFF" />
        </div>
        <div style={{ fontSize: '12px', color: '#6B8BAE', marginBottom: '14px' }}>Escanea el código QR o copia el link directo.</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => { navigator.clipboard.writeText(url); onClose() }} style={{ flex: 1, padding: '8px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00F5A0', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
            Copiar link
          </button>
          <button onClick={onClose} style={{ flex: 1, padding: '8px', background: '#F8FBFF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function OCView({ setView, role = 'prov' }) {
  const [selectedOC, setSelectedOC] = useState(null)
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(1)
  const [activeStatus, setActiveStatus] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [orders, setOrders] = useState(extendedOrders)
  const { selectedOCId, setSelectedOCId, searchQuery } = useApp()
  const isMobile = useIsMobile()
  const [showAllFilters, setShowAllFilters] = useState(false)
  const [qrOC, setQrOC] = useState(null)

  useEffect(() => {
    if (selectedOCId) {
      const oc = orders.find(p => p.id === selectedOCId)
      if (oc) setSelectedOC(oc)
      setSelectedOCId(null)
    }
  }, [selectedOCId])

  const filtered = useMemo(() => {
    let result = orders
    if (activeStatus !== 'all') result = result.filter(o => o.status === activeStatus)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.client.toLowerCase().includes(q) ||
        o.amount.toLowerCase().includes(q)
      )
    }
    return result
  }, [orders, activeStatus, searchQuery])

  const counts = useMemo(() => {
    const c = { all: orders.length }
    allStatuses.slice(1).forEach(s => { c[s.key] = orders.filter(o => o.status === s.key).length })
    return c
  }, [orders])

  const toggleSelect = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const toggleAll = () => setSelected(prev => prev.length === filtered.length ? [] : filtered.map(p => p.id))

  const handleConfirm = (id, type) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: type === 'partial' ? 'dispatched' : 'confirmed' } : o))
  }

  const handleReject = (id, motivo) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'rejected' } : o))
  }

  const canActSelected = selected.length > 0 && selected.some(id => {
    const o = orders.find(x => x.id === id)
    return o && ['published','processing'].includes(o.status)
  })

  return (
    <div>
      {qrOC && <QRModal oc={qrOC} onClose={() => setQrOC(null)} />}
      {selectedOC && <OCModal oc={selectedOC} onClose={() => setSelectedOC(null)} setView={setView} onConfirm={handleConfirm} onReject={handleReject} />}

      {/* Stats bar */}
      {isMobile ? (
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {allStatuses.slice(0, 4).map(s => (
              <div key={s.key} onClick={() => setActiveStatus(s.key)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '7px 10px', borderRadius: '8px', cursor: 'pointer', border: activeStatus === s.key ? '1.5px solid ' + s.color : '1px solid rgba(14,77,146,0.1)', background: activeStatus === s.key ? s.bg : '#fff', transition: 'all .15s' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                <span style={{ fontSize: '11px', fontWeight: activeStatus === s.key ? 700 : 400, color: activeStatus === s.key ? s.color : '#6B8BAE', whiteSpace: 'nowrap' }}>{s.label} ({counts[s.key] || 0})</span>
              </div>
            ))}
          </div>
          {showAllFilters && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '6px' }}>
              {allStatuses.slice(4).map(s => (
                <div key={s.key} onClick={() => setActiveStatus(s.key)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '7px 10px', borderRadius: '8px', cursor: 'pointer', border: activeStatus === s.key ? '1.5px solid ' + s.color : '1px solid rgba(14,77,146,0.1)', background: activeStatus === s.key ? s.bg : '#fff', transition: 'all .15s' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '11px', fontWeight: activeStatus === s.key ? 700 : 400, color: activeStatus === s.key ? s.color : '#6B8BAE', whiteSpace: 'nowrap' }}>{s.label} ({counts[s.key] || 0})</span>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => setShowAllFilters(!showAllFilters)} style={{ width: '100%', marginTop: '6px', padding: '7px', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', background: '#F8FBFF', color: '#6B8BAE', fontSize: '11px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transition: 'transform .2s', transform: showAllFilters ? 'rotate(180deg)' : 'rotate(0deg)' }}><polyline points="6 9 12 15 18 9"/></svg>
            {showAllFilters ? 'Ver menos' : 'Ver más estados'}
          </button>
        </div>
      ) : (
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '6px', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {allStatuses.map(s => (
          <div key={s.key} onClick={() => setActiveStatus(s.key)} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '6px 14px', borderRadius: '100px', cursor: 'pointer',
            border: activeStatus === s.key ? '1.5px solid ' + s.color : '1px solid rgba(14,77,146,0.1)',
            background: activeStatus === s.key ? s.bg : '#fff',
            transition: 'all .15s'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: '11px', fontWeight: activeStatus === s.key ? 700 : 400, color: activeStatus === s.key ? s.color : '#6B8BAE', whiteSpace: 'nowrap' }}>
              {s.label} ({counts[s.key] || 0})
            </span>
          </div>
        ))}
      </div>
      )}

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ fontSize: '12px', color: '#6B8BAE' }}>
          Total encontrados: <strong style={{ color: '#0B1F3A' }}>{TOTAL}</strong> · Seleccionados: <strong style={{ color: '#0E4D92' }}>{selected.length}</strong>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button disabled={!canActSelected} onClick={() => canActSelected && alert('Confirmando ' + selected.length + ' OCs seleccionadas')} style={{ padding: '6px 12px', background: canActSelected ? '#D1FAE5' : '#F0F7FF', border: 'none', borderRadius: '8px', fontSize: '11px', color: canActSelected ? '#065F46' : '#9DB8D9', cursor: canActSelected ? 'pointer' : 'default', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>✓ Confirmar selección</button>
          <button disabled={selected.length === 0} style={{ padding: '6px 12px', background: selected.length > 0 ? '#0B1F3A' : '#F0F7FF', border: 'none', borderRadius: '8px', fontSize: '11px', color: selected.length > 0 ? '#00F5A0' : '#9DB8D9', cursor: selected.length > 0 ? 'pointer' : 'default', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>PDF Consolidado</button>
          <button disabled={selected.length === 0} style={{ padding: '6px 12px', background: selected.length > 0 ? '#0B1F3A' : '#F0F7FF', border: 'none', borderRadius: '8px', fontSize: '11px', color: selected.length > 0 ? '#00F5A0' : '#9DB8D9', cursor: selected.length > 0 ? 'pointer' : 'default', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Generar Listado</button>
          <button style={{ padding: '6px 12px', background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', fontSize: '11px', color: '#0B1F3A', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Descargar Consulta</button>
        </div>
      </div>

      {/* Tabla / Cards */}
      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
          {filtered.map(p => {
            const canAct = ['published','processing'].includes(p.status)
            const borderColor = canAct ? '#F59E0B' : p.status === 'confirmed' ? '#065F46' : p.status === 'received' ? '#166534' : p.status === 'rejected' ? '#B91C1C' : '#6B7280'
            return (
              <div key={p.id} style={{ background: '#fff', borderRadius: '12px', border: '1px solid rgba(14,77,146,0.1)', borderLeft: '4px solid ' + borderColor, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>{p.id}</div>
                    <div style={{ fontSize: '11px', color: '#6B8BAE', marginTop: '2px' }}>{p.client} · {p.date}</div>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', color: '#6B8BAE' }}>Entrega: {p.delivery} · {p.items} items</span>
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: '14px', fontWeight: 900, color: '#0B1F3A' }}>{p.amount}</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => setSelectedOC(p)} style={{ flex: 1, padding: '6px', background: '#0B1F3A', border: 'none', borderRadius: '6px', fontSize: '11px', color: '#00F5A0', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>Ver detalle</button>
                  {role === 'prov' && canAct && (
                    <>
                      <button onClick={() => setSelectedOC(p)} style={{ padding: '6px 10px', background: '#D1FAE5', border: 'none', borderRadius: '6px', fontSize: '11px', color: '#065F46', cursor: 'pointer', fontWeight: 600 }}>✓</button>
                      <button onClick={() => setSelectedOC(p)} style={{ padding: '6px 10px', background: '#FEE2E2', border: 'none', borderRadius: '6px', fontSize: '11px', color: '#B91C1C', cursor: 'pointer', fontWeight: 600 }}>✕</button>
                    </>
                  )}
                  {role === 'ret' && canAct && (
                    <button onClick={() => setSelectedOC(p)} style={{ padding: '6px 10px', background: '#FEE2E2', border: 'none', borderRadius: '6px', fontSize: '11px', color: '#B91C1C', cursor: 'pointer', fontWeight: 600 }}>Cancelar</button>
                  )}
                  <button onClick={() => setView('trazabilidad')} style={{ padding: '6px 10px', background: '#EEF5FF', border: 'none', borderRadius: '6px', fontSize: '11px', color: '#0E4D92', cursor: 'pointer', fontWeight: 600 }}>⟳</button>
                  <button onClick={() => generarOCPDF(p)} style={{ padding: '6px 10px', background: '#EEF5FF', border: 'none', borderRadius: '6px', fontSize: '11px', color: '#0E4D92', cursor: 'pointer', fontWeight: 700 }}>PDF</button>
                  <button onClick={() => setQrOC(p)} style={{ padding: '6px 10px', background: '#F8FBFF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '6px', fontSize: '11px', color: '#6B8BAE', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/>
                      <rect x="3" y="16" width="5" height="5"/><path d="M16 16h2v2h-2zM18 18h2v2h-2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden', marginBottom: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              <th style={{ padding: '9px 12px', width: '36px' }}>
                <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} style={{ cursor: 'pointer', accentColor: '#0E4D92' }} />
              </th>
              {['','N° Orden','Socio Comercial','Emisión','Entrega','Monto','Estado','PDF','QR',''].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const canAct = ['published','processing'].includes(p.status)
              return (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)', background: selected.includes(p.id) ? '#F0F7FF' : 'transparent', transition: 'background .15s' }}
                  onMouseEnter={e => { if (!selected.includes(p.id)) e.currentTarget.style.background = '#F8FBFF' }}
                  onMouseLeave={e => { if (!selected.includes(p.id)) e.currentTarget.style.background = 'transparent' }}
                >
                  <td style={{ padding: '9px 10px', width: '36px' }}>
                    <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)} style={{ cursor: 'pointer', accentColor: '#0E4D92', width: '14px', height: '14px' }} />
                  </td>
                  <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#0B1F3A' }}>{p.id}</td>
                  <td style={{ padding: '9px 12px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{p.client}</div>
                    <div style={{ fontSize: '10px', color: '#6B8BAE' }}>{p.socio || p.client + ' S.A.C.'}</div>
                  </td>
                  <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{p.date}</td>
                  <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{p.delivery}</td>
                  <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>{p.amount}</td>
                  <td style={{ padding: '9px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <StatusBadge status={p.status} />
                      <button onClick={() => setSelectedOC(p)} title="Ver detalle" style={{ width: '22px', height: '22px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#6B8BAE', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/></svg>
                      </button>
                    </div>
                  </td>
                  <td style={{ padding: '9px 6px', textAlign: 'center', width: '44px' }}>
                    <button onClick={() => generarOCPDF(p)} title="Descargar PDF" style={{ width: '30px', height: '30px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', borderRadius: '6px', cursor: 'pointer', color: '#0E4D92', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
                    </button>
                  </td>
                  <td style={{ padding: '9px 6px', textAlign: 'center', width: '44px' }}>
                    <button onClick={() => setQrOC(p)} title="Código QR" style={{ width: '30px', height: '30px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', borderRadius: '6px', cursor: 'pointer', color: '#0E4D92', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="3" height="3" rx="1"/><rect x="18" y="18" width="3" height="3" rx="1"/></svg>
                    </button>
                  </td>
                  <td style={{ padding: '9px 6px', textAlign: 'center', width: '80px' }}>
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                      {role === 'prov' && canAct && <>
                        <button onClick={() => setSelectedOC(p)} title="Confirmar" style={{ width: '28px', height: '28px', border: 'none', background: '#D1FAE5', borderRadius: '6px', cursor: 'pointer', color: '#065F46', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                        <button onClick={() => setSelectedOC(p)} title="Rechazar" style={{ width: '28px', height: '28px', border: 'none', background: '#FEE2E2', borderRadius: '6px', cursor: 'pointer', color: '#B91C1C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </>}
                      {role === 'ret' && canAct && (
                        <button onClick={() => setSelectedOC(p)} title="Cancelar OC" style={{ width: '28px', height: '28px', border: 'none', background: '#FEE2E2', borderRadius: '6px', cursor: 'pointer', color: '#B91C1C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      )}
                      <button onClick={() => setView('trazabilidad')} title="Ver trazabilidad" style={{ width: '28px', height: '28px', border: '1px solid rgba(14,77,146,0.1)', background: '#EEF5FF', borderRadius: '6px', cursor: 'pointer', color: '#0E4D92', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      )}

      {/* Paginación */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '11px', color: '#6B8BAE' }}>Mostrando {filtered.length} de {TOTAL} órdenes</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {['««','‹',1,2,3,'...',49,'›','»»'].map((p, i) => (
            <button key={i} onClick={() => typeof p === 'number' && setPage(p)} style={{ width: typeof p === 'number' ? '32px' : 'auto', padding: typeof p === 'number' ? '0' : '0 8px', height: '32px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: p === page ? '#0B1F3A' : '#fff', color: p === page ? '#00F5A0' : '#6B8BAE', fontSize: '12px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: p === page ? 700 : 400 }}>
              {p}
            </button>
          ))}
          <select style={{ height: '32px', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', padding: '0 8px', fontSize: '12px', color: '#0B1F3A', background: '#fff', fontFamily: "'DM Sans', sans-serif", marginLeft: '4px' }}>
            <option>10</option><option>25</option><option>50</option>
          </select>
        </div>
      </div>
    </div>
  )
}
