
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="h-8 w-8 border-4 border-github-blue border-t-transparent rounded-full animate-spin" 
           aria-label="Loading"></div>
    </div>
  );
};

export default LoadingSpinner;
