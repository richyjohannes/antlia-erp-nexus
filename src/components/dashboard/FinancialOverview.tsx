
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function FinancialOverview() {
  const { t } = useTranslation();

  const data = [
    { month: 'Jan', income: 125000000, expense: 85000000, profit: 40000000 },
    { month: 'Feb', income: 142000000, expense: 92000000, profit: 50000000 },
    { month: 'Mar', income: 135000000, expense: 88000000, profit: 47000000 },
    { month: 'Apr', income: 158000000, expense: 98000000, profit: 60000000 },
    { month: 'May', income: 167000000, expense: 105000000, profit: 62000000 },
    { month: 'Jun', income: 175000000, expense: 108000000, profit: 67000000 },
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#e17a9] bg-clip-text text-transparent">
          {t('financialOverview')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                `Rp ${value.toLocaleString()}`,
                name === 'income' ? 'Income' : name === 'expense' ? 'Expense' : 'Profit'
              ]}
            />
            <Bar dataKey="income" fill="url(#incomeGradient)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="url(#expenseGradient)" radius={[4, 4, 0, 0]} />
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="url(#profitGradient)" 
              strokeWidth={3}
              dot={{ fill: '#e17a9', strokeWidth: 2, r: 4 }}
            />
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#05b2fd" />
                <stop offset="100%" stopColor="#6f42c1" />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6f42c1" />
                <stop offset="100%" stopColor="#e17a9" />
              </linearGradient>
              <linearGradient id="profitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#05b2fd" />
                <stop offset="50%" stopColor="#6f42c1" />
                <stop offset="100%" stopColor="#e17a9" />
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
