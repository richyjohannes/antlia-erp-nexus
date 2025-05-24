
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export function InventoryChart() {
  const { t } = useTranslation();

  const data = [
    { name: 'Raw Materials', value: 35, color: 'var(--gradient-start)' },
    { name: 'Finished Goods', value: 45, color: 'var(--gradient-middle)' },
    { name: 'Work in Progress', value: 20, color: 'var(--gradient-end)' },
  ];

  return (
    <Card className="border-l-4 border-l-transparent hover:border-l-4 hover:border-l-[var(--color-primary)] transition-colors">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] bg-clip-text text-transparent">
          {t('inventoryDistribution')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <defs>
              <linearGradient id="pieGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--gradient-start)" />
                <stop offset="100%" stopColor="var(--gradient-middle)" />
              </linearGradient>
              <linearGradient id="pieGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--gradient-middle)" />
                <stop offset="100%" stopColor="var(--gradient-end)" />
              </linearGradient>
              <linearGradient id="pieGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--gradient-end)" />
                <stop offset="100%" stopColor="var(--gradient-start)" />
              </linearGradient>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
            >
              <Cell fill="url(#pieGradient1)" />
              <Cell fill="url(#pieGradient2)" />
              <Cell fill="url(#pieGradient3)" />
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
