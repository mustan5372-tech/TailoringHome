import React from 'react';
import { Scissors, Home } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { ROUTES } from '../../constants/navigation';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="h-16 w-16 rounded-full bg-cream flex items-center justify-center mb-6 border border-cream-border">
        <Scissors className="h-8 w-8 text-maroon-700" />
      </div>

      <span className="text-xs uppercase font-semibold tracking-widest text-maroon-700 mb-2">
        404 &bull; Page Not Found
      </span>

      <h1 className="text-4xl font-serif font-bold text-chocolate-900 mb-4">
        Pattern Not Located
      </h1>

      <p className="text-sm text-chocolate-600 max-w-md mx-auto mb-8 font-sans">
        The requested page could not be tailored into our collection. Please return to the boutique home.
      </p>

      <Button to={ROUTES.HOME} variant="primary" icon={Home}>
        Return to Home Catalogue
      </Button>
    </div>
  );
};

export default NotFoundPage;

