import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { ArrowLeft, HelpCircle } from 'lucide-react';

export function NotFound() {
  return (
    <div className="py-20 max-w-md mx-auto text-center px-4 space-y-4">
      <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
        <HelpCircle className="w-8 h-8" />
      </div>
      <h1 className="font-serif text-4xl font-bold text-brand-950">404 - Page Not Found</h1>
      <p className="text-sm text-slate-500">
        The requested wholesale page or product route does not exist or has been moved.
      </p>
      <div className="pt-4">
        <Link to="/">
          <Button variant="primary" icon={ArrowLeft}>
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
