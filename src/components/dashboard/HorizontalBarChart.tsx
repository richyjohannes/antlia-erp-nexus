
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface HorizontalBarChartProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
    target?: number;
  }>;
}

export function HorizontalBarChart({ title, data }: HorizontalBarChartProps) {
  const { t } = useTranslation();

  const chartConfig = {
    value: {
      label: "Actual",
      color: "var(--gradient-start)",
    },
    target: {
      label: "Target", 
      color: "var(--gradient-middle)",
    },
  };

  return (
    <Card className="border-l-4 border-l-transparent hover:border-l-4 hover:border-l-[var(--color-primary)] transition-all duration-300 shadow-lg hover:shadow-xl w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-lg font-semibold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] lg:h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="horizontal"
              margin={{ top: 5, right: 15, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id="barGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--gradient-start)" />
                  <stop offset="50%" stopColor="var(--gradient-middle)" />
                  <stop offset="100%" stopColor="var(--gradient-end)" />
                </linearGradient>
                <linearGradient id="barGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--gradient-middle)" />
                  <stop offset="100%" stopColor="var(--gradient-end)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis 
                type="number" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#666' }}
                className="text-xs"
              />
              <YAxis 
                type="category" 
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#666' }}
                className="text-xs"
                width={80}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="value" 
                fill="url(#barGradient1)"
                radius={[0, 4, 4, 0]}
                className="drop-shadow-sm hover:drop-shadow-md transition-all duration-200"
                maxBarSize={20}
              />
              {data.some(item => item.target) && (
                <Bar 
                  dataKey="target" 
                  fill="url(#barGradient2)"
                  fillOpacity={0.7}
                  radius={[0, 4, 4, 0]}
                  className="drop-shadow-sm hover:drop-shadow-md transition-all duration-200"
                  maxBarSize={20}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
