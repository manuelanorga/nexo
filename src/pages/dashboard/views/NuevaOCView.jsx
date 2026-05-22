export default function NuevaOCView() {
  const productos = [
    { ean: '07702459082090', nombre: 'Inca Kola 1.5L', presentacion: 'Pack x12', cantidad: 24, precio: 'S/62.40', subtotal: 'S/1,497.60' },
    { ean: '07702459082014', nombre: 'Coca-Cola 500ml', presentacion: 'Pack x24', cantidad: 48, precio: 'S/48.00', subtotal: 'S/2,304.00' },
    { ean: '07702459082038', nombre: 'Coca-Cola Zero 500ml', presentacion: 'Pack x24', cantidad: 36, precio: 'S/48.00', subtotal: 'S/1,728.00' },
    { ean: '07702459082045', nombre: 'Sprite 500ml', presentacion: 'Pack x24', cantidad: 24, precio: 'S/46.80', subtotal: 'S/1,123.20' },
  ]

  return (
    <div>
      <div style={{ background: '#EAF3DE', border: '1px solid #86EFAC', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#166534', marginBottom: '16px' }}>
        NEXO enviara la OC automaticamente a Arca Continental al confirmar.
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '20px', marginBottom: '12px' }}>
        <div style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>Informacion del pedido</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '5px' }}>Proveedor</label>
            <select style={{ width: '100%', height: '34px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '0 12px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', background: '#fff', outline: 'none' }}>
              <option>Arca Continental</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '5px' }}>Sitio de entrega</label>
            <select style={{ width: '100%', height: '34px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '0 12px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', background: '#fff', outline: 'none' }}>
              <option>CD Wong Ate</option>
              <option>CD Wong Miraflores</option>
              <option>CD Wong San Miguel</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '5px' }}>Fecha minima entrega</label>
            <input type="date" defaultValue="2026-05-25" style={{ width: '100%', height: '34px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '0 12px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', outline: 'none' }} />
          </div>
          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '5px' }}>Fecha maxima entrega</label>
            <input type="date" defaultValue="2026-05-28" style={{ width: '100%', height: '34px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '8px', padding: '0 12px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', outline: 'none' }} />
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '12px', padding: '20px' }}>
        <div style={{ fontSize: '10px', fontWeight: 600, color: '#6B8BAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>Productos</div>
        <div style={{ overflow: 'hidden', border: '1px solid rgba(14,77,146,0.08)', borderRadius: '8px', marginBottom: '14px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F8FBFF', borderBottom: '1px solid rgba(14,77,146,0.08)' }}>
                {['EAN','Producto','Presentacion','Cantidad','Precio unit.','Subtotal',''].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', color: '#6B8BAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.ean} style={{ borderBottom: '1px solid rgba(14,77,146,0.05)' }}>
                  <td style={{ padding: '8px 12px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '10px', background: '#F0F7FF', color: '#6B8BAE', padding: '2px 6px', borderRadius: '4px' }}>{p.ean}</span>
                  </td>
                  <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: '#0B1F3A' }}>{p.nombre}</td>
                  <td style={{ padding: '8px 12px', fontSize: '11px', color: '#6B8BAE' }}>{p.presentacion}</td>
                  <td style={{ padding: '8px 12px' }}>
                    <input type="number" defaultValue={p.cantidad} style={{ width: '60px', height: '28px', border: '1px solid rgba(14,77,146,0.15)', borderRadius: '6px', textAlign: 'center', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", color: '#0B1F3A', outline: 'none' }} />
                  </td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#0B1F3A' }}>{p.precio}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>{p.subtotal}</td>
                  <td style={{ padding: '8px 12px' }}>
                    <button style={{ padding: '4px 8px', background: '#FEE2E2', border: 'none', borderRadius: '6px', fontSize: '10px', color: '#B91C1C', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Quitar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button style={{ padding: '8px 14px', background: '#F8FBFF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', fontSize: '12px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            + Agregar producto
          </button>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#6B8BAE', marginBottom: '2px' }}>Total sin IGV: S/ 5,554.57</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', fontWeight: 900, color: '#0B1F3A' }}>Total: S/ 6,553.00</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(14,77,146,0.08)' }}>
          <button style={{ padding: '9px 18px', background: '#F8FBFF', border: '1px solid rgba(14,77,146,0.1)', borderRadius: '8px', fontSize: '13px', color: '#6B8BAE', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            Guardar borrador
          </button>
          <button
            onClick={() => alert('OC enviada a Arca Continental exitosamente.\nRecibiras confirmacion en los proximos minutos.')}
            style={{ padding: '9px 20px', background: '#064E3B', border: 'none', borderRadius: '8px', fontSize: '13px', color: '#4ADE80', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
          >
            Enviar orden a Arca →
          </button>
        </div>
      </div>
    </div>
  )
}
