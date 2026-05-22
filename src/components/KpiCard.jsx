export default function KpiCard({ label, value, delta, deltaUp, color }) {
  return (
    <div className="bg-white border border-blue-100 rounded-xl p-4">
      <div className="text-xs text-muted uppercase tracking-wide mb-1">{label}</div>
      <div className={`font-display text-2xl font-extrabold tracking-tight mb-0.5 ${color || 'text-navy'}`}>{value}</div>
      {delta && (
        <div className={`text-xs ${deltaUp ? 'text-green-600' : 'text-red-500'}`}>
          {deltaUp ? '↑' : '↓'} {delta}
        </div>
      )}
    </div>
  )
}
