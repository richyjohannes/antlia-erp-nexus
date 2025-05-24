
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          style={{
            '--gradient-border': 'linear-gradient(to right, var(--gradient-start), var(--gradient-middle), var(--gradient-end))'
          } as React.CSSProperties}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`text-xs px-3 py-1 rounded-full font-semibold ${
              stat.positive 
                ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700' 
                : 'bg-gradient-to-r from-red-100 to-red-200 text-red-700'
            }`}>
              {stat.change}
            </div>
          </CardHeader>
          <CardContent>
            <div 
              className="text-3xl font-bold bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(to right, var(--gradient-start), var(--gradient-middle), var(--gradient-end))'
              }}
            >
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
