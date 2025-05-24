
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function TopProducts() {
  const { t } = useTranslation();

  const products = [
    { name: 'Product A', sales: 85, amount: 'Rp 45,200,000' },
    { name: 'Product B', sales: 72, amount: 'Rp 38,500,000' },
    { name: 'Product C', sales: 65, amount: 'Rp 32,100,000' },
    { name: 'Product D', sales: 58, amount: 'Rp 28,700,000' },
    { name: 'Product E', sales: 45, amount: 'Rp 22,300,000' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] bg-clip-text text-transparent">
          {t('topProducts')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{product.name}</span>
                <span className="text-sm text-gray-500">{product.amount}</span>
              </div>
              <Progress 
                value={product.sales} 
                className="h-2"
                style={{
                  background: `linear-gradient(to right, var(--gradient-start), var(--gradient-middle), var(--gradient-end))`
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
