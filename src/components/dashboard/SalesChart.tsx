
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function SalesChart() {
  const { t } = useTranslation();

  const data = [
    { month: 'Jan', sales: 4000, target: 4500 },
    { month: 'Feb', sales: 3000, target: 3500 },
    { month: 'Mar', sales: 5000, target: 4800 },
    { month: 'Apr', sales: 4500, target: 4200 },
    { month: 'May', sales: 6000, target: 5500 },
    { month: 'Jun', sales: 5500, target: 5800 },
  ];

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#e17a9] bg-clip-text text-transparent">
          {t('salesOverview')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{
                background: 'linear-gradient(135deg, #05b2fd, #6f42c1, #e17a9)',
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="url(#salesGradient)" 
              strokeWidth={4}
              dot={{ fill: '#05b2fd', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: '#e17a9' }}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#d1d5db" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#9ca3af', strokeWidth: 1, r: 4 }}
            />
            <defs>
              <linearGradient id="salesGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#05b2fd" />
                <stop offset="50%" stopColor="#6f42c1" />
                <stop offset="100%" stopColor="#e17a9" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
