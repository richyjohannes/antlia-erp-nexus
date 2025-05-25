
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

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

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "var(--gradient-start)",
    },
    expenses: {
      label: "Expenses",
      color: "var(--gradient-middle)",
    },
  };

  return (
    <Card className="border-l-4 border-l-transparent hover:border-l-4 hover:border-l-[var(--color-primary)] transition-all duration-300 shadow-lg hover:shadow-xl w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-lg font-semibold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] bg-clip-text text-transparent">
          {t('monthlyRevenue')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <ChartContainer config={chartConfig} className="h-[200px] sm:h-[250px] lg:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
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
              <Bar 
                dataKey="revenue" 
                fill="url(#revenueGradient)" 
                radius={[2, 2, 0, 0]}
                className="drop-shadow-sm hover:drop-shadow-md transition-all duration-200"
                maxBarSize={40}
              />
              <Bar 
                dataKey="expenses" 
                fill="url(#expensesGradient)" 
                radius={[2, 2, 0, 0]}
                className="drop-shadow-sm hover:drop-shadow-md transition-all duration-200"
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
