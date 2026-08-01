import { useEffect } from 'react';
import useSEO from '../hooks/useSEO';
import PageWrapper from '../components/layout/PageWrapper';
import HeroSection      from '../components/home/HeroSection';
import MissionStrip     from '../components/home/MissionStrip';
import HowItWorks       from '../components/home/HowItWorks';
import StatsSection     from '../components/home/StatsSection';
import FeaturedPrograms from '../components/home/FeaturedPrograms';
import SchemesSpotlight from '../components/home/SchemesSpotlight';
import RoadmapPreview   from '../components/home/RoadmapPreview';
import WhyChooseUs      from '../components/home/WhyChooseUs';
import SuccessStories   from '../components/home/SuccessStories';
import PartnerLogos     from '../components/home/PartnerLogos';
import CTABanner        from '../components/home/CTABanner';

// JSON-LD structured data for rich search results
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Skill India Hub',
  url: 'https://skillindiahub.in',
  description: 'India\'s premier platform connecting youth with vocational training, internships, certifications and employment under the Skill India Mission.',
  publisher: {
    '@type': 'GovernmentOrganization',
    name: 'National Skill Development Corporation',
    url: 'https://nsdcindia.org',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://skillindiahub.in/explore?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const Home = () => {
  useSEO(
    'Home',
    'Skill India Hub — India\'s premier platform connecting youth with vocational training, internships, certifications and employment under the Skill India Mission.'
  );

  useEffect(() => {
    const script = document.createElement('script');
    script.type  = 'application/ld+json';
    script.id    = 'json-ld-home';
    script.text  = JSON.stringify(JSON_LD);
    document.head.appendChild(script);
    return () => { document.getElementById('json-ld-home')?.remove(); };
  }, []);

  return (
    <PageWrapper noPadding>
      <main id="main-content">
        <HeroSection />
        <MissionStrip />
        <HowItWorks />
        <StatsSection />
        <FeaturedPrograms />
        <SchemesSpotlight />
        <RoadmapPreview />
        <WhyChooseUs />
        <SuccessStories />
        <PartnerLogos />
        <CTABanner />
      </main>
    </PageWrapper>
  );
};

export default Home;
