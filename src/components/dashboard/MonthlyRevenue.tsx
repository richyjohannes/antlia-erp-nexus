
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function MonthlyRevenue() {
  const { t } = useTranslation();

  const data = [
    { month: 'Jan', revenue: 45000000, orders: 320 },
    { month: 'Feb', revenue: 52000000, orders: 380 },
    { month: 'Mar', revenue: 48000000, orders: 350 },
    { month: 'Apr', revenue: 61000000, orders: 420 },
    { month: 'May', revenue: 55000000, orders: 390 },
    { month: 'Jun', revenue: 67000000, orders: 450 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#e17a9] bg-clip-text text-transparent">
          {t('monthlyRevenue')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                name === 'revenue' ? `Rp ${value.toLocaleString()}` : value,
                name === 'revenue' ? 'Revenue' : 'Orders'
              ]}
            />
            <Bar 
              dataKey="revenue" 
              fill="url(#barGradient)" 
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#05b2fd" />
                <stop offset="50%" stopColor="#6f42c1" />
                <stop offset="100%" stopColor="#e17a9" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
