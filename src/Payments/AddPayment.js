// src/components/payments/AddPaymentPage.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const AddPaymentPage = () => {

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {/* Form fields here */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPaymentPage;