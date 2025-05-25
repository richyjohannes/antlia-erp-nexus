
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export function InventoryChart() {
  const { t } = useTranslation();

  const data = [
    { name: 'Raw Materials', value: 35 },
    { name: 'Finished Goods', value: 45 },
    { name: 'Work in Progress', value: 20 },
  ];

  const chartConfig = {
    "raw-materials": {
      label: "Raw Materials",
      color: "var(--gradient-start)",
    },
    "finished-goods": {
      label: "Finished Goods", 
      color: "var(--gradient-middle)",
    },
    "work-in-progress": {
      label: "Work in Progress",
      color: "var(--gradient-end)",
    },
  };

  return (
    <Card className="border-l-4 border-l-transparent hover:border-l-4 hover:border-l-[var(--color-primary)] transition-all duration-300 shadow-lg hover:shadow-xl w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-lg font-semibold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] bg-clip-text text-transparent">
          {t('inventoryDistribution')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <ChartContainer config={chartConfig} className="h-[200px] sm:h-[220px] lg:h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
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
                cy="45%"
                outerRadius="70%"
                dataKey="value"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth={2}
                className="drop-shadow-lg"
              >
                <Cell fill="url(#pieGradient1)" />
                <Cell fill="url(#pieGradient2)" />
                <Cell fill="url(#pieGradient3)" />
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
