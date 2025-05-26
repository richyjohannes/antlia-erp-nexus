
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react';

export function FinancialOverview() {
  const { t } = useTranslation();

  const financialData = [
    {
      title: t('cashFlow'),
      value: 'Rp 45,230,000',
      change: '+15.2%',
      positive: true,
      icon: DollarSign,
    },
    {
      title: t('accountsReceivable'),
      value: 'Rp 32,100,000',
      change: '-8.5%',
      positive: false,
      icon: CreditCard,
    },
    {
      title: t('netProfitMargin'),
      value: '18.5%',
      change: '+3.2%',
      positive: true,
      icon: TrendingUp,
    },
    {
      title: t('operatingExpenses'),
      value: 'Rp 28,900,000',
      change: '+5.1%',
      positive: false,
      icon: TrendingDown,
    },
  ];

  return (
    <Card className="border-l-4 border-l-transparent hover:border-l-4 hover:border-l-[var(--color-primary)] transition-colors">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] bg-clip-text text-transparent">
          {t('financialOverview')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {financialData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className="h-5 w-5 text-gray-600" />
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    item.positive 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {item.change}
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  {item.title}
                </div>
                <div className="text-lg font-bold bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] bg-clip-text text-transparent">
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
