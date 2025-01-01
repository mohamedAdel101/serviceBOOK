import React from 'react';

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {children}
    </div>
  );
};

export default PageLayout;