/**
 * Badge — category label / status chip.
 * color: primary | secondary | accent | slate | success | error
 */

const colorMap = {
  primary:   'bg-primary-100   text-primary-700',
  secondary: 'bg-secondary-100 text-secondary-700',
  accent:    'bg-accent-100    text-accent-700',
  slate:     'bg-slate-100     text-slate-600',
  success:   'bg-green-100     text-green-700',
  error:     'bg-rose-100      text-rose-700',
};

const Badge = ({ children, color = 'slate', icon, className = '' }) => {
  return (
    <span className={`badge ${colorMap[color]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
