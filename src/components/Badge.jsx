const styles = {
  pending:    'bg-yellow-100 text-yellow-800',
  confirmed:  'bg-blue-100 text-blue-800',
  dispatched: 'bg-emerald-100 text-emerald-800',
  received:   'bg-green-100 text-green-800',
  returned:   'bg-red-100 text-red-800',
  active:     'bg-green-100 text-green-800',
  discontinued: 'bg-gray-100 text-gray-500',
}

const labels = {
  pending:    'Pendiente',
  confirmed:  'Confirmada',
  dispatched: 'En despacho',
  received:   'Recibida',
  returned:   'Devuelto',
  active:     'Activo',
  discontinued: 'Descontinuado',
}

export default function Badge({ status }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${styles[status] || styles.pending}`}>
      {labels[status] || status}
    </span>
  )
}
