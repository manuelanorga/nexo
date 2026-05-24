import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export function generarOCPDF(oc) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W = 210
  const NAVY = [11, 31, 58]
  const GREEN = [0, 245, 160]
  const GRAY = [107, 139, 174]
  const LIGHT = [240, 247, 255]

  doc.setFillColor(...NAVY)
  doc.rect(0, 0, W, 22, 'F')
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...GREEN)
  doc.text('NEXO', 14, 14)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(200, 220, 255)
  doc.text('O2P Platform · Orden de Compra', 14, 19)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text(`N de documento: ${oc.id}`, W - 14, 11, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text(`Fecha: ${oc.date || '24-05-2026'}`, W - 14, 17, { align: 'right' })

  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...NAVY)
  doc.text('Orden de Compra', W / 2, 33, { align: 'center' })

  let y = 42
  doc.setFillColor(...LIGHT)
  doc.rect(10, y, W - 20, 6, 'F')
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...NAVY)
  doc.text('INFORMACION DE NEGOCIO', 14, y + 4)

  y += 10
  doc.setFontSize(7)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...GRAY)
  doc.text('EMISOR', 14, y)
  doc.text('RECEPTOR', W / 2, y)
  y += 4
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...NAVY)
  doc.setFontSize(9)
  doc.text(oc.client || 'Wong Supermercados', 14, y)
  doc.text('Arca Continental Peru S.A.C.', W / 2, y)
  y += 4
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...GRAY)
  doc.text('RUC: 20109072171', 14, y)
  doc.text('RUC: 20603138831', W / 2, y)
  y += 4
  doc.text('Av. Central 185, La Molina, Lima', 14, y)
  doc.text('Jr. Cajamarca Nro. 371, Rimac, Lima', W / 2, y)
  y += 4
  doc.text('Telefono: (01) 6260000', 14, y)
  doc.text('Telefono: (01) 7759859', W / 2, y)

  y += 10
  doc.setFillColor(...LIGHT)
  doc.rect(10, y, W - 20, 6, 'F')
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...NAVY)
  doc.text('INFORMACION DE ORDEN DE COMPRA', 14, y + 4)

  y += 10
  const infoFields = [
    ['Punto de venta', 'CD Wong Ate - Lima'],
    ['Lugar de entrega', 'Av. Elmer Faucett 3432, Callao'],
    ['Entidad a facturar', oc.client || 'Wong Supermercados - Lima'],
    ['Fecha minima de entrega', oc.delivery || '25-05-2026'],
    ['Fecha maxima de entrega', '28-05-2026'],
    ['Tipo de orden', '220 - Orden de Compra'],
    ['Moneda', 'Sol Peruano'],
    ['Condiciones de pago', '60 dias - Fecha de la factura'],
  ]
  doc.setFontSize(7)
  infoFields.forEach(([label, value], i) => {
    const col = i % 2 === 0 ? 14 : W / 2
    const row = y + Math.floor(i / 2) * 8
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...GRAY)
    doc.text(label, col, row)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...NAVY)
    doc.text(value, col, row + 4)
  })

  y += Math.ceil(infoFields.length / 2) * 8 + 6
  doc.setFillColor(...LIGHT)
  doc.rect(10, y, W - 20, 6, 'F')
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...NAVY)
  doc.text('OBSERVACIONES', 14, y + 4)
  y += 10
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...GRAY)
  doc.text('Entregar en horario 8am-12pm. Contactar al almacen antes de llegar.', 14, y)

  y += 8
  const productos = oc.productos || [
    { ean: '07702459082090', nombre: 'Inca Kola 1.5L', presentacion: 'Pack x12', cantidad: 24, precio: 62.40 },
    { ean: '07702459082014', nombre: 'Coca-Cola 500ml', presentacion: 'Pack x24', cantidad: 48, precio: 48.00 },
    { ean: '07702459082038', nombre: 'Coca-Cola Zero 500ml', presentacion: 'Pack x24', cantidad: 36, precio: 48.00 },
    { ean: '07702459082045', nombre: 'Sprite 500ml', presentacion: 'Pack x24', cantidad: 24, precio: 46.80 },
  ]

  const subtotal = productos.reduce((s, p) => s + p.cantidad * p.precio, 0)
  const igv = subtotal * 0.18
  const total = subtotal + igv

  autoTable(doc, {
    startY: y,
    margin: { left: 10, right: 10 },
    head: [['Producto', 'EAN / SKU', 'Presentacion', 'Cantidad', 'Precio Bruto', 'Precio Neto', 'IGV (18%)', 'Subtotal']],
    body: productos.map(p => [
      p.nombre, p.ean, p.presentacion, p.cantidad,
      `S/ ${p.precio.toFixed(2)}`, `S/ ${p.precio.toFixed(2)}`,
      `S/ ${(p.precio * 0.18).toFixed(2)}`, `S/ ${(p.cantidad * p.precio).toFixed(2)}`
    ]),
    headStyles: { fillColor: NAVY, textColor: [255,255,255], fontSize: 7, fontStyle: 'bold', halign: 'center' },
    bodyStyles: { fontSize: 7, textColor: NAVY },
    alternateRowStyles: { fillColor: LIGHT },
    columnStyles: {
      0: { cellWidth: 38 }, 1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 22, halign: 'center' }, 3: { cellWidth: 16, halign: 'center' },
      4: { cellWidth: 20, halign: 'right' }, 5: { cellWidth: 20, halign: 'right' },
      6: { cellWidth: 18, halign: 'right' }, 7: { cellWidth: 22, halign: 'right' },
    },
    foot: [[
      { content: `Total unidades: ${productos.reduce((s, p) => s + p.cantidad, 0)}`, colSpan: 3, styles: { fontStyle: 'bold', fontSize: 7, textColor: NAVY } },
      { content: '', colSpan: 3 }, { content: '' },
      { content: `S/ ${subtotal.toFixed(2)}`, styles: { fontStyle: 'bold', fontSize: 7, halign: 'right', textColor: NAVY } },
    ]],
    footStyles: { fillColor: LIGHT },
  })

  const finalY = doc.lastAutoTable.finalY + 6
  let ty = finalY
  const totales = [
    ['Total sin impuestos:', `S/ ${subtotal.toFixed(2)}`, false],
    ['Total impuestos (IGV 18%):', `S/ ${igv.toFixed(2)}`, false],
    ['Total descuentos:', 'S/ 0.00', false],
    ['VALOR TOTAL DEL DOCUMENTO:', `S/ ${total.toFixed(2)}`, true],
  ]
  totales.forEach(([label, value, isBold]) => {
    if (isBold) {
      doc.setFillColor(...NAVY)
      doc.rect(W - 82, ty - 5, 72, 9, 'F')
      doc.setTextColor(...GREEN)
      doc.setFontSize(9)
      doc.setFont('helvetica', 'bold')
      doc.text(label, W - 80, ty)
      doc.text(value, W - 12, ty, { align: 'right' })
    } else {
      doc.setTextColor(...GRAY)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.text(label, W - 80, ty)
      doc.setTextColor(...NAVY)
      doc.setFont('helvetica', 'bold')
      doc.text(value, W - 12, ty, { align: 'right' })
    }
    ty += isBold ? 10 : 6
  })

  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFillColor(...NAVY)
    doc.rect(0, 285, W, 12, 'F')
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(200, 220, 255)
    doc.text('NEXO O2P Platform · powered by instamovil.com', 14, 292)
    doc.text(`Pagina ${i} de ${pageCount}`, W - 14, 292, { align: 'right' })
    doc.setTextColor(...GREEN)
    doc.text(`Generado: ${new Date().toLocaleString('es-PE')}`, W / 2, 292, { align: 'center' })
  }

  doc.save(`OC_${oc.id}_NEXO.pdf`)
}
