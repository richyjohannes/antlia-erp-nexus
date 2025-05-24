
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DashboardStats() {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('totalRevenue'),
      value: 'Rp 125,430,000',
      change: '+12.5%',
      positive: true,
    },
    {
      title: t('totalOrders'),
      value: '1,245',
      change: '+8.2%',
      positive: true,
    },
    {
      title: t('totalCustomers'),
      value: '456',
      change: '+15.3%',
      positive: true,
    },
    {
      title: t('totalProducts'),
      value: '89',
      change: '-2.1%',
      positive: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-l-4 border-l-transparent hover:border-l-4 hover:border-l-[var(--color-primary)] transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`text-xs px-2 py-1 rounded-full ${
              stat.positive 
                ? 'bg-green-100 text-green-600' 
                : 'bg-red-100 text-red-600'
            }`}>
              {stat.change}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] bg-clip-text text-transparent">
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
