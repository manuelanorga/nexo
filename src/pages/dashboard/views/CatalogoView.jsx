import { useState, useMemo } from 'react'
import * as XLSX from 'xlsx'
import { catalogData } from '../../../data/mockData'
import Badge from '../../../components/Badge'
import { useApp } from '../../../context/AppContext'

function ProductModal({ product, onClose, onSave, isNew }) {
  const empty = {
    ean: '', code: '', name: '', brand: '', presentation: '',
    weight: '', volume: '', basePrice: '', category: 'Bebidas gaseosas',
    iva: '18', status: 'active',
  }

  const [form, setForm] = useState(isNew ? empty : {
    ean: product.ean, code: product.code, name: product.name,
    brand: product.brand || '', presentation: product.presentation,
    weight: product.weight, volume: product.volume,
    basePrice: product.basePrice || '', category: product.category || 'Bebidas gaseosas',
    iva: product.iva || '18', status: product.status,
  })

  const field = (label, key, readOnly = false) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</label>
      <input
        type="text" value={form[key]}
        onChange={e => !readOnly && setForm(f => ({ ...f, [key]: e.target.value }))}
        style={{
          height: '34px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px',
          padding: '0 10px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif",
          color: readOnly ? '#9DB8D9' : '#0B1F3A', outline: 'none',
          background: readOnly ? '#F8FBFF' : '#fff',
          cursor: readOnly ? 'not-allowed' : 'text'
        }}
      />
    </div>
  )

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '620px',
        maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: '0 24px 80px rgba(0,0,0,0.2)'
      }} onClick={e => e.stopPropagation()}>

        <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 900, color: '#0B1F3A' }}>
              {isNew ? 'Nuevo SKU' : 'Editar producto'}
            </div>
            {!isNew && <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#0E4D92', marginTop: '2px' }}>{product.ean}</div>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#6B8BAE' }}>Estado:</span>
              <div onClick={() => setForm(f => ({ ...f, status: f.status === 'active' ? 'discontinued' : 'active' }))} style={{ width: '40px', height: '22px', borderRadius: '100px', cursor: 'pointer', background: form.status === 'active' ? '#22C55E' : '#D1D5DB', position: 'relative', transition: 'background .2s' }}>
                <div style={{ position: 'absolute', top: '3px', left: form.status === 'active' ? '21px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: form.status === 'active' ? '#166534' : '#6B8BAE' }}>
                {form.status === 'active' ? 'Activo' : 'Descontinuado'}
              </span>
            </div>
            <button onClick={onClose} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', cursor: 'pointer', color: '#6B8BAE', fontSize: '14px' }}>✕</button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Información general</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            {field('EAN Producto', 'ean', !isNew)}
            {field('Código interno proveedor', 'code')}
            {field('Descripción del producto', 'name')}
            {field('Marca', 'brand')}
            {field('Presentación', 'presentation')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Categoría</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ height: '34px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '0 10px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', outline: 'none', background: '#fff' }}>
                <option>Bebidas gaseosas</option>
                <option>Bebidas sin azúcar</option>
                <option>Bebidas hidratantes</option>
                <option>Aguas</option>
                <option>Otros</option>
              </select>
            </div>
            {field('Peso (kg)', 'weight')}
            {field('Volumen (L)', 'volume')}
            {field('IVA (%)', 'iva')}
          </div>

          <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Precio base</div>
          <div style={{ marginBottom: '12px' }}>
            {field('Precio base (S/)', 'basePrice')}
          </div>
          <div style={{ background: '#F0F7FF', borderRadius: '8px', padding: '10px 14px', fontSize: '11px', color: '#6B8BAE' }}>
            💡 El precio base es el precio referencial. Los precios específicos por cadena se configuran en <strong style={{ color: '#0E4D92' }}>Listas de Precios</strong>.
          </div>
        </div>

        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(14,77,146,0.08)', display: 'flex', gap: '8px', justifyContent: 'flex-end', background: '#F8FBFF' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Cancelar</button>
          <button onClick={() => { onSave(form); onClose() }} style={{ padding: '8px 20px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00C2A8', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            {isNew ? 'Crear SKU' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CatalogoView() {
  const { searchQuery } = useApp()
  const [editProduct, setEditProduct] = useState(null)
  const [showNew, setShowNew] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [exportFormat, setExportFormat] = useState('xlsx')
  const [includePrices, setIncludePrices] = useState(true)
  const [includeStatus, setIncludeStatus] = useState(true)
  const [data, setData] = useState(catalogData)

  const filtered = useMemo(() => {
    if (!searchQuery) return data
    const q = searchQuery.toLowerCase()
    return data.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.ean.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.presentation.toLowerCase().includes(q)
    )
  }, [searchQuery, data])

  const handleSave = (form) => {
    setData(prev => prev.map(p => p.ean === editProduct.ean ? { ...p, ...form } : p))
  }

  const handleCreate = (form) => {
    setData(prev => [...prev, { ...form }])
  }

  const handleExport = () => {
    const rows = data.map(p => {
      const row = {
        'EAN Producto': p.ean,
        'Codigo Interno': p.code,
        'Descripcion': p.name,
        'Marca': p.brand,
        'Presentacion': p.presentation,
        'Peso': p.weight,
        'Volumen': p.volume,
        'Categoria': p.category,
      }
      if (includePrices) row['Precio Base'] = p.basePrice
      if (includeStatus) row['Estado'] = p.status === 'active' ? 'Activo' : 'Descontinuado'
      return row
    })
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Catalogo')
    const fecha = new Date().toISOString().slice(0,10)
    XLSX.writeFile(wb, 'Catalogo_Arca_' + fecha + '.' + exportFormat)
    setShowExport(false)
  }

  return (
    <div>
      {showExport && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowExport(false)}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '380px', boxShadow: '0 24px 80px rgba(0,0,0,0.2)', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(14,77,146,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 900, color: '#0B1F3A' }}>Exportar catálogo</div>
              <button onClick={() => setShowExport(false)} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid rgba(14,77,146,0.1)', background: '#F8FBFF', cursor: 'pointer', color: '#6B8BAE', fontSize: '14px' }}>✕</button>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Formato</div>
              {[['xlsx','Excel (.xlsx) — recomendado'],['csv','CSV (.csv)']].map(([val, label]) => (
                <div key={val} onClick={() => setExportFormat(val)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '6px', border: exportFormat === val ? '1.5px solid #0E4D92' : '1px solid rgba(14,77,146,0.1)', background: exportFormat === val ? '#EEF5FF' : '#fff' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid', borderColor: exportFormat === val ? '#0E4D92' : '#D1DCF0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {exportFormat === val && <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0E4D92' }} />}
                  </div>
                  <span style={{ fontSize: '13px', color: '#0B1F3A', fontWeight: exportFormat === val ? 600 : 400 }}>{label}</span>
                </div>
              ))}
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '16px 0 10px' }}>Incluir</div>
              {[['includePrices', includePrices, setIncludePrices, 'Precio base'],['includeStatus', includeStatus, setIncludeStatus, 'Estado del producto']].map(([key, val, setter, label]) => (
                <div key={key} onClick={() => setter(!val)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', cursor: 'pointer' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: '1.5px solid', borderColor: val ? '#0E4D92' : '#D1DCF0', background: val ? '#0E4D92' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {val && <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: '13px', color: '#0B1F3A' }}>{label}</span>
                </div>
              ))}
              <div style={{ background: '#F0F7FF', borderRadius: '8px', padding: '8px 12px', fontSize: '11px', color: '#6B8BAE', marginTop: '14px' }}>
                Se exportarán <strong style={{ color: '#0B1F3A' }}>{data.length} productos</strong> · Descarga inmediata.
              </div>
            </div>
            <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(14,77,146,0.08)', display: 'flex', gap: '8px', justifyContent: 'flex-end', background: '#F8FBFF' }}>
              <button onClick={() => setShowExport(false)} style={{ padding: '8px 16px', background: '#fff', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Cancelar</button>
              <button onClick={handleExport} style={{ padding: '8px 20px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00C2A8', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Descargar ahora</button>
            </div>
          </div>
        </div>
      )}

      {editProduct && <ProductModal product={editProduct} onClose={() => setEditProduct(null)} onSave={handleSave} isNew={false} />}
      {showNew && <ProductModal product={null} onClose={() => setShowNew(false)} onSave={handleCreate} isNew={true} />}

      <div style={{ background: '#EEF5FF', border: '1px solid #93C5FD', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#1E40AF', marginBottom: '14px' }}>
        <strong>{data.filter(p => p.status === 'active').length} SKUs activos</strong> · {data.filter(p => p.status === 'discontinued').length} descontinuados · Última sync: hoy 14:32
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', justifyContent: 'flex-end' }}>
        <button onClick={() => setShowExport(true)} style={{ padding: '7px 14px', background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', fontSize: '12px', color: '#0B1F3A', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Exportar</button>
        <button onClick={() => setShowNew(true)} style={{ padding: '7px 16px', background: '#0B1F3A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#00C2A8', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>+ Nuevo SKU</button>
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
              {['EAN','Cód. Interno','Producto','Presentación','Peso','Precio Base','Estado',''].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.ean} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)', transition: 'background .15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8FBFF'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '9px 12px' }}><span style={{ fontFamily: 'monospace', fontSize: '10px', background: '#F0F7FF', color: '#6B8BAE', padding: '2px 6px', borderRadius: '4px' }}>{p.ean}</span></td>
                <td style={{ padding: '9px 12px' }}><span style={{ fontFamily: 'monospace', fontSize: '10px', background: '#F0F7FF', color: '#6B8BAE', padding: '2px 6px', borderRadius: '4px' }}>{p.code}</span></td>
                <td style={{ padding: '9px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{p.name}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{p.presentation}</td>
                <td style={{ padding: '9px 12px', fontSize: '11px', color: '#6B8BAE' }}>{p.weight}</td>
                <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: '11px', fontWeight: 600, color: '#0B1F3A' }}>{p.basePrice}</td>
                <td style={{ padding: '9px 12px' }}><Badge status={p.status} /></td>
                <td style={{ padding: '9px 12px' }}>
                  <button onClick={() => setEditProduct(p)} style={{ padding: '4px 10px', background: '#EEF5FF', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#0E4D92', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ fontSize: '11px', color: '#6B8BAE', textAlign: 'right', marginTop: '8px' }}>
        Mostrando {filtered.length} de {data.length} productos
      </div>
    </div>
  )
}
