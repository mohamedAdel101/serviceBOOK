
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, CreditCard, DollarSign } from 'lucide-react';

const SummaryCards = ({ payments }) => {
  const totalAmount = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const pendingCount = payments.filter(p => p.status === 'pending').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-500" />
            <span className="text-2xl font-bold">${totalAmount.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-yellow-500" />
            <span className="text-2xl font-bold">{pendingCount}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Total Books</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Book className="w-4 h-4 text-blue-500" />
            <span className="text-2xl font-bold">{payments.length}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;


