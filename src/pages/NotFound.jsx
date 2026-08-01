import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';

const NotFound = () => (
  <PageWrapper>
    <div className="section-padding container-custom flex flex-col items-center justify-center text-center min-h-[80vh]">
      <div className="text-8xl font-display font-black text-gradient-green mb-4">404</div>
      <h1 className="font-display font-bold text-3xl text-slate-900 mb-3">Page Not Found</h1>
      <p className="text-slate-500 mb-8 max-w-sm">
        Looks like this page doesn't exist. Let's get you back on track.
      </p>
      <div className="flex items-center gap-3">
        <Button as={Link} to="/" variant="primary" icon={<Home size={16} />}>
          Go Home
        </Button>
        <Button as={Link} to="/explore" variant="outline" icon={<ArrowLeft size={16} />}>
          Explore
        </Button>
      </div>
    </div>
  </PageWrapper>
);

export default NotFound;
