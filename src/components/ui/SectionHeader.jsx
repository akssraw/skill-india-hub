/**
 * SectionHeader — consistent section title + subtitle block.
 * Used across all pages for visual consistency.
 *
 * align: left | center | right
 */

const SectionHeader = ({
  label,
  title,
  subtitle,
  align     = 'center',
  titleClass = '',
  className  = '',
}) => {
  const alignClass = {
    left:   'items-start text-left',
    center: 'items-center text-center',
    right:  'items-end text-right',
  }[align];

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {label && (
        <span className="section-label">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
          {label}
        </span>
      )}

      <h2 className={`font-display font-bold text-slate-900 leading-tight ${titleClass}`}>
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-slate-500 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
