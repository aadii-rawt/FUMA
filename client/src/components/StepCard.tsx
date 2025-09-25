export default function StepCard({ title, children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-4 ${className}`}>
      <div className="pb-3 border-b">{title}</div>
      <div className="pt-4">{children}</div>
    </div>
  );
}
