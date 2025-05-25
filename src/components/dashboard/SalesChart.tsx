
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export function SalesChart() {
  const { t } = useTranslation();

  const data = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4500 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 5500 },
  ];

  const chartConfig = {
    sales: {
      label: "Sales",
      color: "var(--gradient-start)",
    },
  };

  return (
    <Card className="col-span-1 lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-lg font-semibold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] bg-clip-text text-transparent">
          {t('salesOverview')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <ChartContainer config={chartConfig} className="h-[200px] sm:h-[250px] lg:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--gradient-start)" />
                  <stop offset="50%" stopColor="var(--gradient-middle)" />
                  <stop offset="100%" stopColor="var(--gradient-end)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#666' }}
                className="text-xs"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#666' }}
                className="text-xs"
                width={40}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="url(#salesGradient)" 
                strokeWidth={2}
                dot={{ fill: 'var(--gradient-start)', strokeWidth: 2, r: 3 }}
                className="drop-shadow-sm"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
