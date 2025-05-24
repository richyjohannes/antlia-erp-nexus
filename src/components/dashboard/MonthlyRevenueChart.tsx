
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function MonthlyRevenueChart() {
  const { t } = useTranslation();

  const data = [
    { month: 'Jan', revenue: 4200, expenses: 2400 },
    { month: 'Feb', revenue: 3800, expenses: 2200 },
    { month: 'Mar', revenue: 5200, expenses: 2800 },
    { month: 'Apr', revenue: 4800, expenses: 2600 },
    { month: 'May', revenue: 6200, expenses: 3200 },
    { month: 'Jun', revenue: 5800, expenses: 3000 },
  ];

  return (
    <Card className="border-l-4 border-l-transparent hover:border-l-4 hover:border-l-[var(--color-primary)] transition-colors">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] bg-clip-text text-transparent">
          {t('monthlyRevenue')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--gradient-start)" />
                <stop offset="100%" stopColor="var(--gradient-middle)" />
              </linearGradient>
              <linearGradient id="expensesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--gradient-middle)" />
                <stop offset="100%" stopColor="var(--gradient-end)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#revenueGradient)" />
            <Bar dataKey="expenses" fill="url(#expensesGradient)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
