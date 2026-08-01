import { useEffect } from 'react';

/**
 * useSEO — sets document title and meta description on mount.
 * Resets to defaults on unmount.
 *
 * @param {string} title       - Page title (will be appended with " | Skill India Hub")
 * @param {string} description - Meta description for this page
 */
const DEFAULT_TITLE = 'Skill India Hub — Empowering India\'s Youth Through Skills';
const DEFAULT_DESC  = 'India\'s premier platform connecting youth with vocational training, internships, certifications and employment under the Skill India Mission.';

const useSEO = (title, description) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | Skill India Hub` : DEFAULT_TITLE;
    document.title = fullTitle;

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    const prevDesc = metaDesc.content;
    metaDesc.content = description || DEFAULT_DESC;

    // Set OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc  = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.content = fullTitle;
    if (ogDesc)  ogDesc.content  = description || DEFAULT_DESC;

    // Cleanup on unmount
    return () => {
      document.title = DEFAULT_TITLE;
      metaDesc.content = prevDesc;
    };
  }, [title, description]);
};

export default useSEO;
