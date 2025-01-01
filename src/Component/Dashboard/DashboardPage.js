import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Ensure this path is correct.
import { Book, CreditCard, DollarSign } from 'lucide-react';

const DashboardPage = ({ payments, onUpdateStatus, onDeletePayment }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payment Dashboard</h2>
      </div>

      <SummaryCards payments={payments} />
      <PaymentTable 
        payments={payments}
        onUpdateStatus={onUpdateStatus}
        onDeletePayment={onDeletePayment}
      />
    </div>
  );
};

export default DashboardPage;
