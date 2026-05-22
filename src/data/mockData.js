export const purchaseOrders = [
  { id: 'OC-2025-0841', client: 'Wong', date: '18/05', delivery: '23/05', amount: 'S/ 48,320', items: 12, status: 'confirmed', progress: 60 },
  { id: 'OC-2025-0840', client: 'Plaza Vea', date: '17/05', delivery: '22/05', amount: 'S/ 32,150', items: 8, status: 'dispatched', progress: 80 },
  { id: 'OC-2025-0839', client: 'Tottus', date: '16/05', delivery: '21/05', amount: 'S/ 61,480', items: 15, status: 'received', progress: 100 },
  { id: 'OC-2025-0838', client: 'Metro', date: '15/05', delivery: '20/05', amount: 'S/ 27,900', items: 6, status: 'pending', progress: 20 },
  { id: 'OC-2025-0837', client: 'Vivanda', date: '14/05', delivery: '19/05', amount: 'S/ 19,540', items: 4, status: 'received', progress: 100 },
]

export const catalogData = [
  { ean: '07702459082090', code: 'IK-15L-12', name: 'Inca Kola 1.5L', presentation: 'Pack x12', weight: '18.5 kg', volume: '18L', priceWong: 'S/62.40', priceTottus: 'S/61.80', status: 'active' },
  { ean: '07702459082014', code: 'CC-05L-24', name: 'Coca-Cola 500ml', presentation: 'Pack x24', weight: '13.2 kg', volume: '12L', priceWong: 'S/48.00', priceTottus: 'S/47.50', status: 'active' },
  { ean: '07702459082021', code: 'CC-15L-12', name: 'Coca-Cola 1.5L', presentation: 'Pack x12', weight: '19.0 kg', volume: '18L', priceWong: 'S/58.80', priceTottus: 'S/58.20', status: 'active' },
  { ean: '07702459082038', code: 'CCZ-05L-24', name: 'Coca-Cola Zero 500ml', presentation: 'Pack x24', weight: '12.8 kg', volume: '12L', priceWong: 'S/48.00', priceTottus: 'S/47.50', status: 'active' },
  { ean: '07702459082045', code: 'SP-05L-24', name: 'Sprite 500ml', presentation: 'Pack x24', weight: '13.0 kg', volume: '12L', priceWong: 'S/46.80', priceTottus: 'S/46.20', status: 'active' },
  { ean: '07702459082052', code: 'FT-15L-12', name: 'Fanta Naranja 1.5L', presentation: 'Pack x12', weight: '18.8 kg', volume: '18L', priceWong: 'S/57.60', priceTottus: 'S/57.00', status: 'active' },
  { ean: '07702459082069', code: 'IK-25L-6', name: 'Inca Kola 2.5L', presentation: 'Pack x6', weight: '15.6 kg', volume: '15L', priceWong: 'S/42.00', priceTottus: 'S/41.40', status: 'active' },
  { ean: '07702459082076', code: 'SCH-350-24', name: 'Schweppes Tónica 350ml', presentation: 'Pack x24', weight: '9.6 kg', volume: '8.4L', priceWong: 'S/52.80', priceTottus: 'S/52.20', status: 'discontinued' },
]

export const traceSteps = [
  { status: 'done', label: 'OC recibida', desc: 'Documento ingresó al canal NEXO', time: '21/05/2026 18:22:40' },
  { status: 'done', label: 'Validación de reglas', desc: 'Catálogo, precios y condiciones verificadas', time: '21/05/2026 18:22:41' },
  { status: 'done', label: 'Procesado en plataforma', desc: 'Documento disponible para Arca Continental', time: '21/05/2026 18:22:43' },
  { status: 'done', label: 'Entregado al proveedor', desc: 'Arca recibió la OC en su bandeja', time: '21/05/2026 18:22:44' },
  { status: 'done', label: 'Confirmación de Arca', desc: 'Arca confirmó disponibilidad de todos los SKUs', time: '22/05/2026 09:15:00' },
  { status: 'done', label: 'ASN generado y enviado', desc: 'Aviso de despacho enviado a Wong', time: '22/05/2026 14:30:00' },
  { status: 'active', label: 'En tránsito', desc: 'Mercadería en camino al CD Wong Ate', time: '23/05/2026 08:00:00' },
  { status: 'pending', label: 'Recibo confirmado', desc: 'Wong confirma recepción completa', time: 'Pendiente' },
  { status: 'pending', label: 'Factura emitida', desc: 'Factura electrónica enviada a Wong', time: 'Pendiente' },
]

export const priceLists = [
  { code: 'Retail-Wong', chain: 'Wong Supermercados', points: 24, products: 50, updated: '21/05/2026 14:32', status: 'active' },
  { code: 'Retail-Tottus', chain: 'Tottus', points: 18, products: 50, updated: '21/05/2026 14:32', status: 'active' },
  { code: 'Retail-PlazaVea', chain: 'Plaza Vea', points: 31, products: 48, updated: '20/05/2026 09:15', status: 'active' },
  { code: 'Retail-Metro', chain: 'Metro', points: 12, products: 45, updated: '19/05/2026 11:20', status: 'pending' },
  { code: 'Retail-Vivanda', chain: 'Vivanda', points: 8, products: 50, updated: '18/05/2026 16:45', status: 'active' },
]
