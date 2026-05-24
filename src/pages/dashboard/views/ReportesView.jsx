import { useState, useMemo } from 'react'
import { useIsMobile } from '../../../hooks/useMediaQuery'
import * as XLSX from 'xlsx'
import { useApp } from '../../../context/AppContext'

const initialReportes = [
  { id: 1, name: 'Catálogo completo Arca', cat: 'Catálogo', gen: '21/05 14:32', size: '245 KB', registros: 50 },
  { id: 2, name: 'OCs Mayo 2026 — Todas las cadenas', cat: 'Órdenes', gen: '21/05 10:00', size: '1.2 MB', registros: 241 },
  { id: 3, name: 'Fill rate Q2 2026', cat: 'Analitica', gen: '20/05 09:15', size: '380 KB', registros: 90 },
  { id: 4, name: 'Devoluciónes Abril-Mayo', cat: 'Devoluciónes', gen: '18/05 16:40', size: '128 KB', registros: 12 },
  { id: 5, name: 'Facturas pendientes Mayo', cat: 'Financiero', gen: '17/05 11:20', size: '210 KB', registros: 8 },
  { id: 6, name: 'ASN generados Mayo 2026', cat: 'Despacho', gen: '16/05 09:00', size: '95 KB', registros: 24 },
]

const categorias = ['Todas', 'Catálogo', 'Órdenes', 'Analitica', 'Devoluciónes', 'Financiero', 'Despacho']

const catColors = {
  Catálogo:    { color: '#0E4D92', bg: '#EEF5FF' },
  Órdenes:     { color: '#065F46', bg: '#D1FAE5' },
  Analitica:   { color: '#1D4ED8', bg: '#DBEAFE' },
  Devoluciónes:{ color: '#B91C1C', bg: '#FEE2E2' },
  Financiero:  { color: '#166534', bg: '#EAF3DE' },
  Despacho:    { color: '#92400E', bg: '#FEF3C7' },
}

function DescargarModal({ reporte, onClose }) {
  const [formato, setFormato] = useState('xlsx')

  const handleDescargar = () => {
    const rows = Array.from({ length: Math.min(reporte.registros, 5) }, (_, i) => ({
      'ID': i + 1,
      'Reporte': reporte.name,
      'Categoria': reporte.cat,
      'Generado': reporte.gen,
      'Registros': reporte.registros,
    }))
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte')
    const fecha = new Date().toISOString().slice(0,10)
    XLSX.writeFile(wb, reporte.name.replace(/ /g,'_') + '_' + fecha + '.' + formato)
    onClose()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 24px 80px rgba(0,0,0,0.2)', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 900, color: '#0B1F3A' }}>Descargar reporte</div>
          <button onClick={onClose} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', cursor: 'pointer', color: '#6B8BAE', fontSize: '14px' }}>✕</button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          <div style={{ background: '#F8FBFF', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A', marginBottom: '3px' }}>{reporte.name}</div>
            <div style={{ fontSize: '11px', color: '#6B8BAE' }}>{reporte.registros} registros · {reporte.size} · Generado {reporte.gen}</div>
          </div>

          <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Formato de descarga</div>
          {[['xlsx','Excel (.xlsx) — recomendado'],['csv','CSV (.csv)'],['pdf','PDF (.pdf)']].map(([val, label]) => (
            <div key={val} onClick={() => setFormato(val)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '6px', border: formato === val ? '1.5px solid #0E4D92' : '1px solid rgba(14,77,146,0.1)', background: formato === val ? '#EEF5FF' : '#fff' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid', borderColor: formato === val ? '#0E4D92' : '#D1DCF0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {formato === val && <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0E4D92' }} />}
              </div>
              <span style={{ fontSize: '13px', color: '#0B1F3A', fontWeight: formato === val ? 600 : 400 }}>{label}</span>
            </div>
          ))}

          <div style={{ background: '#EAF3DE', border: '1px solid #86EFAC', borderRadius: '8px', padding: '8px 12px', fontSize: '11px', color: '#166534', marginTop: '14px' }}>
            ✓ Descarga inmediata · Sin correos · Sin links que expiran
          </div>
        </div>
        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(14,77,146,0.08)', display: 'flex', gap: '8px', justifyContent: 'flex-end', background: '#F8FBFF' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Cancelar</button>
          <button onClick={handleDescargar} style={{ padding: '8px 20px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00F5A0', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Descargar ahora</button>
        </div>
      </div>
    </div>
  )
}

function NuevoReporteModal({ onClose, onCrear }) {
  const [form, setForm] = useState({ name: '', cat: 'Órdenes', cadena: 'Todas', desde: '', hasta: '' })
  const field = (label, key, placeholder) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</label>
      <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder}
        style={{ height: '34px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '0 10px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', outline: 'none', background: '#fff' }} />
    </div>
  )
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '480px', boxShadow: '0 24px 80px rgba(0,0,0,0.2)', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 900, color: '#0B1F3A' }}>Generar nuevo reporte</div>
          <button onClick={onClose} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', cursor: 'pointer', color: '#6B8BAE', fontSize: '14px' }}>✕</button>
        </div>
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {field('Nombre del reporte', 'name', 'Ej: OCs Wong Junio 2026')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Categoría</label>
            <select value={form.cat} onChange={e => setForm(f => ({ ...f, cat: e.target.value }))} style={{ height: '34px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '0 10px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', outline: 'none', background: '#fff' }}>
              {['Órdenes','Catálogo','Analitica','Devoluciónes','Financiero','Despacho'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Cadena</label>
            <select value={form.cadena} onChange={e => setForm(f => ({ ...f, cadena: e.target.value }))} style={{ height: '34px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '0 10px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', outline: 'none', background: '#fff' }}>
              {['Todas','Wong','Tottus','Plaza Vea','Metro','Vivanda'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {field('Fecha desde', 'desde', 'DD/MM/YYYY')}
            {field('Fecha hasta', 'hasta', 'DD/MM/YYYY')}
          </div>
          <div style={{ background: '#F0F7FF', borderRadius: '8px', padding: '8px 12px', fontSize: '11px', color: '#6B8BAE' }}>
            💡 El reporte estará disponible inmediatamente para descarga. Sin correos.
          </div>
        </div>
        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(14,77,146,0.08)', display: 'flex', gap: '8px', justifyContent: 'flex-end', background: '#F8FBFF' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Cancelar</button>
          <button onClick={() => { onCrear(form); onClose() }} style={{ padding: '8px 20px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00F5A0', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Generar reporte →</button>
        </div>
      </div>
    </div>
  )
}

const KPI = ({ label, value, delta, up }) => (
  <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '14px 16px' }}>
    <div style={{ fontSize: '10px', color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>{label}</div>
    <div style={{ fontFamily: "'Fraunces', serif", fontSize: '26px', fontWeight: 900, color: '#0B1F3A', lineHeight: 1, marginBottom: '4px' }}>{value}</div>
    {delta && <div style={{ fontSize: '10px', color: up ? '#16A34A' : '#E05252' }}>{up ? '↑' : '↓'} {delta}</div>}
  </div>
)

export default function ReportesView() {
  const { searchQuery } = useApp()
  const [reportes, setReportes] = useState(initialReportes)
  const [catFilter, setCatFilter] = useState('Todas')
  const [selectedReporte, setSelectedReporte] = useState(null)
  const [showNuevo, setShowNuevo] = useState(false)
  const isMobile = useIsMobile()

  const filtered = useMemo(() => {
    let result = reportes
    if (catFilter !== 'Todas') result = result.filter(r => r.cat === catFilter)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(r => r.name.toLowerCase().includes(q) || r.cat.toLowerCase().includes(q))
    }
    return result
  }, [reportes, catFilter, searchQuery])

  const handleCrear = (form) => {
    const now = new Date()
    const hora = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0')
    setReportes(prev => [{
      id: prev.length + 1,
      name: form.name || 'Reporte ' + form.cat + ' ' + form.cadena,
      cat: form.cat, gen: '22/05 ' + hora,
      size: '—', registros: Math.floor(Math.random() * 200) + 10
    }, ...prev])
  }

  return (
    <div>
      {selectedReporte && <DescargarModal reporte={selectedReporte} onClose={() => setSelectedReporte(null)} />}
      {showNuevo && <NuevoReporteModal onClose={() => setShowNuevo(false)} onCrear={handleCrear} />}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '14px' }}>
        <KPI label="Ventas YTD" value="S/2.4M" delta="18% vs 2024" up />
        <KPI label="Fill rate" value="96.4%" delta="2.1pp" up />
        <KPI label="SKUs rotando" value="47/50" delta="94% del catálogo" up />
        <KPI label="OTD" value="91.2%" delta="0.8pp" up />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {categorias.map(cat => (
            <div key={cat} onClick={() => setCatFilter(cat)} style={{
              padding: '4px 12px', borderRadius: '100px', fontSize: '11px', cursor: 'pointer',
              background: catFilter === cat ? (catColors[cat]?.bg || '#EEF5FF') : '#fff',
              color: catFilter === cat ? (catColors[cat]?.color || '#0E4D92') : '#6B8BAE',
              border: catFilter === cat ? ('1px solid ' + (catColors[cat]?.color || '#0E4D92')) : '1px solid rgba(14,77,146,0.1)',
              fontWeight: catFilter === cat ? 600 : 400,
            }}>{cat}</div>
          ))}
        </div>
        <button onClick={() => setShowNuevo(true)} style={{ padding: '7px 16px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00F5A0', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>
          + Nuevo reporte
        </button>
      </div>

      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map(r => {
            const cfg = catColors[r.cat] || { color: '#0E4D92', bg: '#EEF5FF' }
            return (
              <div key={r.id} style={{ background: '#fff', borderRadius: '12px', border: '1px solid rgba(14,77,146,0.1)', padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 600, background: cfg.bg, color: cfg.color }}>{r.cat}</span>
                  <span style={{ fontSize: '11px', color: '#166534', fontWeight: 600, background: '#EAF3DE', padding: '2px 8px', borderRadius: '100px' }}>✓ Siempre disponible</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0B1F3A', marginBottom: '4px' }}>{r.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', color: '#6B8BAE', fontFamily: 'monospace' }}>{r.gen}</span>
                  <span style={{ fontSize: '11px', color: '#6B8BAE' }}>{r.registros} registros</span>
                </div>
                <button onClick={() => setSelectedReporte(r)} style={{ width: '100%', padding: '8px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00F5A0', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
                  Descargar
                </button>
              </div>
            )
          })}
        </div>
      ) : (
      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              {['Reporte','Categoría','Registros','Tamaño','Generado','Disponibilidad',''].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => {
              const cfg = catColors[r.cat] || { color: '#0E4D92', bg: '#EEF5FF' }
              return (
                <tr key={r.id} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)', transition: 'background .15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F8FBFF'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{r.name}</td>
                  <td style={{ padding: '9px 12px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, background: cfg.bg, color: cfg.color }}>{r.cat}</span>
                  </td>
                  <td style={{ padding: '9px 12px', fontSize: '12px', color: '#0B1F3A', textAlign: 'center' }}>{r.registros}</td>
                  <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{r.size}</td>
                  <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE', fontFamily: 'monospace' }}>{r.gen}</td>
                  <td style={{ padding: '9px 12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#166534', background: '#EAF3DE', padding: '3px 10px', borderRadius: '100px' }}>✓ Siempre disponible</span>
                  </td>
                  <td style={{ padding: '9px 12px' }}>
                    <button onClick={() => setSelectedReporte(r)} style={{ padding: '4px 12px', background: '#0B1F3A', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#00F5A0', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>Descargar</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '12px', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
          ✓ En NEXO los reportes no expiran — siempre disponibles, descarga directa sin correos.
        </div>
        <div style={{ fontSize: '11px', color: '#6B8BAE' }}>
          Mostrando {filtered.length} de {reportes.length} reportes
        </div>
      </div>
    </div>
  )
}
