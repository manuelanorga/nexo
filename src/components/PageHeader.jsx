export default function PageHeader({ title, breadcrumb }) {
  return (
    <div>
      <div className="font-display text-base font-bold text-navy">{title}</div>
      <div className="text-xs text-muted">{breadcrumb}</div>
    </div>
  )
}
