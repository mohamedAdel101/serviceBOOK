import React from 'react';
import { Button } from '@/components/ui/button';

const Navigation = ({ currentPage, onNavigate }) => {
  return (
    <nav className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex items-center gap-4">
        <Button
          variant={currentPage === 'dashboard' ? 'default' : 'outline'}
          onClick={() => onNavigate('dashboard')}
        >
          Dashboard
        </Button>
        <Button
          variant={currentPage === 'add' ? 'default' : 'outline'}
          onClick={() => onNavigate('add')}
        >
          Add Payment
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
