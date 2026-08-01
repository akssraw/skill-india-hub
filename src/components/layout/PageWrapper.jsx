/**
 * PageWrapper — wraps every page with consistent top padding
 * (to clear the fixed navbar). Uses a div so each page can own
 * its own <main id="main-content"> landmark for accessibility.
 */
const PageWrapper = ({ children, className = '', noPadding = false }) => {
  return (
    <div className={`min-h-screen ${!noPadding ? 'pt-[72px]' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default PageWrapper;
