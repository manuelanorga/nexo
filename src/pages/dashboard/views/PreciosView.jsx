import { useState, useMemo } from 'react'
import * as XLSX from 'xlsx'
import { priceLists, catalogData } from '../../../data/mockData'
import Badge from '../../../components/Badge'
import { useApp } from '../../../context/AppContext'

const priceDetails = {
  'Retail-Wong': [
    { ean: '07702459082090', name: 'Inca Kola 1.5L', basePrice: 'S/60.00', price: 'S/62.40', promo: '' },
    { ean: '07702459082014', name: 'Coca-Cola 500ml', basePrice: 'S/45.00', price: 'S/48.00', promo: '' },
    { ean: '07702459082021', name: 'Coca-Cola 1.5L', basePrice: 'S/56.00', price: 'S/58.80', promo: '' },
    { ean: '07702459082038', name: 'Coca-Cola Zero 500ml', basePrice: 'S/45.00', price: 'S/48.00', promo: '' },
    { ean: '07702459082045', name: 'Sprite 500ml', basePrice: 'S/44.00', price: 'S/46.80', promo: '' },
  ],
  'Retail-Tottus': [
    { ean: '07702459082090', name: 'Inca Kola 1.5L', basePrice: 'S/60.00', price: 'S/61.80', promo: '' },
    { ean: '07702459082014', name: 'Coca-Cola 500ml', basePrice: 'S/45.00', price: 'S/47.50', promo: '' },
    { ean: '07702459082021', name: 'Coca-Cola 1.5L', basePrice: 'S/56.00', price: 'S/58.20', promo: '' },
    { ean: '07702459082038', name: 'Coca-Cola Zero 500ml', basePrice: 'S/45.00', price: 'S/47.50', promo: '' },
    { ean: '07702459082045', name: 'Sprite 500ml', basePrice: 'S/44.00', price: 'S/46.20', promo: '' },
  ],
  'Retail-PlazaVea': [
    { ean: '07702459082090', name: 'Inca Kola 1.5L', basePrice: 'S/60.00', price: 'S/61.50', promo: '' },
    { ean: '07702459082014', name: 'Coca-Cola 500ml', basePrice: 'S/45.00', price: 'S/47.80', promo: '' },
    { ean: '07702459082038', name: 'Coca-Cola Zero 500ml', basePrice: 'S/45.00', price: 'S/47.80', promo: '' },
  ],
  'Retail-Metro': [
    { ean: '07702459082090', name: 'Inca Kola 1.5L', basePrice: 'S/60.00', price: '', promo: '' },
    { ean: '07702459082014', name: 'Coca-Cola 500ml', basePrice: 'S/45.00', price: '', promo: '' },
  ],
  'Retail-Vivanda': [
    { ean: '07702459082090', name: 'Inca Kola 1.5L', basePrice: 'S/60.00', price: 'S/62.00', promo: '' },
    { ean: '07702459082014', name: 'Coca-Cola 500ml', basePrice: 'S/45.00', price: 'S/48.20', promo: '' },
    { ean: '07702459082045', name: 'Sprite 500ml', basePrice: 'S/44.00', price: 'S/46.50', promo: '' },
  ],
}

function EditPreciosModal({ lista, onClose, onSave }) {
  const items = priceDetails[lista.code] || []
  const [rows, setRows] = useState(items.map(i => ({ ...i })))

  const updateRow = (idx, field, val) => {
    setRows(prev => prev.map((r, i) => i === idx ? { ...r, [field]: val } : r))
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '720px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>

        <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 900, color: '#0B1F3A' }}>Editar lista de precios</div>
            <div style={{ fontSize: '12px', color: '#6B8BAE', marginTop: '2px' }}>{lista.chain} · <span style={{ fontFamily: 'monospace', color: '#0E4D92' }}>{lista.code}</span></div>
          </div>
          <button onClick={onClose} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', cursor: 'pointer', color: '#6B8BAE', fontSize: '14px' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {lista.code === 'Retail-Metro' && (
            <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#92400E', marginBottom: '14px' }}>
              ⚠ Esta lista tiene precios sin configurar. Completa todos los precios para activarla.
            </div>
          )}

          <div style={{ overflow: 'hidden', border: '1px solid rgba(14,77,146,0.08)', borderRadius: '10px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
                  {['EAN','Producto','Precio base','Precio cadena','Precio promo',''].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={row.ean} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)' }}>
                    <td style={{ padding: '8px 12px' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '10px', background: '#F0F7FF', color: '#6B8BAE', padding: '2px 6px', borderRadius: '4px' }}>{row.ean}</span>
                    </td>
                    <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{row.name}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#9DB8D9' }}>{row.basePrice}</td>
                    <td style={{ padding: '8px 12px' }}>
                      <input
                        value={row.price}
                        onChange={e => updateRow(idx, 'price', e.target.value)}
                        placeholder="Ej: S/62.40"
                        style={{
                          width: '90px', height: '30px', border: row.price ? '1px solid rgba(14,77,146,0.15)' : '1px solid #FCA5A5',
                          borderRadius: '6px', padding: '0 8px', fontSize: '11px',
                          fontFamily: 'monospace', color: '#0B1F3A', outline: 'none',
                          background: row.price ? '#fff' : '#FFF5F5'
                        }}
                      />
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      <input
                        value={row.promo}
                        onChange={e => updateRow(idx, 'promo', e.target.value)}
                        placeholder="Opcional"
                        style={{ width: '90px', height: '30px', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '6px', padding: '0 8px', fontSize: '11px', fontFamily: 'monospace', color: '#0B1F3A', outline: 'none', background: '#fff' }}
                      />
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      {!row.price && <span style={{ fontSize: '10px', color: '#E05252', fontWeight: 600 }}>Sin precio</span>}
                      {row.price && <span style={{ fontSize: '10px', color: '#166534', fontWeight: 600 }}>✓</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ background: '#F0F7FF', borderRadius: '8px', padding: '10px 14px', fontSize: '11px', color: '#6B8BAE', marginTop: '14px' }}>
            💡 El precio cadena es lo que {lista.chain} pagará por cada producto. Debe ser mayor o igual al precio base.
          </div>
        </div>

        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(14,77,146,0.08)', display: 'flex', gap: '8px', justifyContent: 'flex-end', background: '#F8FBFF' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Cancelar</button>
          <button onClick={() => { onSave(rows); onClose() }} style={{ padding: '8px 20px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00C2A8', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  )
}

function NuevaListaModal({ onClose, onSave }) {
  const [form, setForm] = useState({ code: '', chain: '', type: 'Retail' })

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '420px', boxShadow: '0 24px 80px rgba(0,0,0,0.2)', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 900, color: '#0B1F3A' }}>Nueva lista de precios</div>
          <button onClick={onClose} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', cursor: 'pointer', color: '#6B8BAE', fontSize: '14px' }}>✕</button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          {[['Código de lista', 'code', 'Ej: Retail-Makro'], ['Cadena comercial', 'chain', 'Ej: Makro']].map(([label, key, placeholder]) => (
            <div key={key} style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '5px' }}>{label}</label>
              <input
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                style={{ width: '100%', height: '34px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '0 12px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', outline: 'none' }}
              />
            </div>
          ))}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '5px' }}>Tipo</label>
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={{ width: '100%', height: '34px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '0 12px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', outline: 'none', background: '#fff' }}>
              <option>Retail</option>
              <option>Institucional</option>
              <option>Mayorista</option>
            </select>
          </div>
          <div style={{ background: '#F0F7FF', borderRadius: '8px', padding: '10px 14px', fontSize: '11px', color: '#6B8BAE' }}>
            💡 Después de crear la lista podrás agregar los productos y sus precios desde el botón Editar.
          </div>
        </div>
        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(14,77,146,0.08)', display: 'flex', gap: '8px', justifyContent: 'flex-end', background: '#F8FBFF' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Cancelar</button>
          <button onClick={() => { onSave(form); onClose() }} style={{ padding: '8px 20px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00C2A8', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            Crear lista
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PreciosView() {
  const { searchQuery } = useApp()
  const [data, setData] = useState(priceLists)
  const [editLista, setEditLista] = useState(null)
  const [showNueva, setShowNueva] = useState(false)

  const filtered = useMemo(() => {
    if (!searchQuery) return data
    const q = searchQuery.toLowerCase()
    return data.filter(p =>
      p.code.toLowerCase().includes(q) ||
      p.chain.toLowerCase().includes(q)
    )
  }, [searchQuery, data])

  const handleDescargar = (lista) => {
    const items = priceDetails[lista.code] || []
    const rows = items.map(i => ({
      'EAN Producto': i.ean,
      'Producto': i.name,
      'Precio Base': i.basePrice,
      'Precio Cadena': i.price,
      'Precio Promo': i.promo,
    }))
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, lista.code)
    const fecha = new Date().toISOString().slice(0,10)
    XLSX.writeFile(wb, 'Lista_' + lista.code + '_' + fecha + '.xlsx')
  }

  const handleCrear = (form) => {
    setData(prev => [...prev, {
      code: form.code, chain: form.chain,
      points: 0, products: 0,
      updated: new Date().toLocaleDateString('es-PE'),
      status: 'pending'
    }])
  }

  return (
    <div>
      {editLista && <EditPreciosModal lista={editLista} onClose={() => setEditLista(null)} onSave={() => {}} />}
      {showNueva && <NuevaListaModal onClose={() => setShowNueva(false)} onSave={handleCrear} />}

      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', justifyContent: 'flex-end' }}>
        <button onClick={() => setShowNueva(true)} style={{ padding: '7px 16px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00C2A8', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>+ Nueva lista</button>
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              {['Código lista','Cadena','Puntos de venta','Productos','Última actualización','Estado','Acciones'].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.code} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)', transition: 'background .15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8FBFF'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#0B1F3A' }}>{p.code}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{p.chain}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', color: '#0B1F3A', textAlign: 'center' }}>{p.points}</td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A', textAlign: 'center' }}>{p.products}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{p.updated}</td>
                <td style={{ padding: '9px 12px' }}><Badge status={p.status} /></td>
                <td style={{ padding: '9px 12px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => setEditLista(p)} style={{ padding: '4px 10px', background: '#EEF5FF', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#0E4D92', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Editar</button>
                    <button onClick={() => handleDescargar(p)} style={{ padding: '4px 10px', background: '#F8FBFF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '6px', fontSize: '10px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Descargar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
