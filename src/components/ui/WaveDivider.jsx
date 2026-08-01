/**
 * WaveDivider — smooth SVG wave that transitions from a dark section to white.
 * Place at the absolute bottom of any dark hero/banner section.
 *
 * @param {string} fill   - The colour of the NEXT section (usually 'white' or '#f8fafc')
 * @param {string} above  - Not used visually but helpful for semantics
 */
const WaveDivider = ({ fill = '#ffffff', className = '' }) => (
  <div
    className={`absolute bottom-0 left-0 right-0 leading-none pointer-events-none ${className}`}
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 1440 72"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height: '72px' }}
    >
      <path
        d="M0,40 C180,80 360,0 540,40 C720,80 900,10 1080,44 C1260,78 1380,28 1440,40 L1440,72 L0,72 Z"
        fill={fill}
      />
    </svg>
  </div>
);

export default WaveDivider;
