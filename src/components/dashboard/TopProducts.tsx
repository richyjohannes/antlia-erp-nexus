
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function TopProducts() {
  const { t } = useTranslation();

  const products = [
    { name: 'Product A', sales: 85, amount: 'Rp 45,200,000', trend: '+12%' },
    { name: 'Product B', sales: 72, amount: 'Rp 38,500,000', trend: '+8%' },
    { name: 'Product C', sales: 65, amount: 'Rp 32,100,000', trend: '+5%' },
    { name: 'Product D', sales: 58, amount: 'Rp 28,700,000', trend: '-2%' },
    { name: 'Product E', sales: 45, amount: 'Rp 22,300,000', trend: '+3%' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#e17a9] bg-clip-text text-transparent">
          {t('topProducts')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{product.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{product.amount}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  product.trend.startsWith('+') 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {product.trend}
                </span>
              </div>
            </div>
            <div className="relative">
              <Progress value={product.sales} className="h-3" />
              <div 
                className="absolute inset-0 h-3 rounded-full bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#e17a9] opacity-80"
                style={{ width: `${product.sales}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
