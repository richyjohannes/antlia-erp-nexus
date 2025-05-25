
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface PieChart3DProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
}

export function PieChart3D({ title, data }: PieChart3DProps) {
  const { t } = useTranslation();

  const chartConfig = data.reduce((config, item, index) => {
    const colors = [
      'var(--gradient-start)',
      'var(--gradient-middle)', 
      'var(--gradient-end)',
      '#38b6ff',
      '#9333ea'
    ];
    
    config[item.name.toLowerCase().replace(/\s+/g, '-')] = {
      label: item.name,
      color: colors[index % colors.length]
    };
    return config;
  }, {} as any);

  return (
    <Card className="border-l-4 border-l-transparent hover:border-l-4 hover:border-l-[var(--color-primary)] transition-all duration-300 shadow-lg hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {data.map((_, index) => (
                  <linearGradient key={index} id={`gradient3d-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={`var(--gradient-${index === 0 ? 'start' : index === 1 ? 'middle' : 'end'})`} stopOpacity={1} />
                    <stop offset="50%" stopColor={`var(--gradient-${index === 0 ? 'start' : index === 1 ? 'middle' : 'end'})`} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={`var(--gradient-${index === 0 ? 'start' : index === 1 ? 'middle' : 'end'})`} stopOpacity={0.6} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                outerRadius={100}
                innerRadius={40}
                dataKey="value"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth={2}
                className="drop-shadow-lg"
              >
                {data.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#gradient3d-${index})`}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                ))}
              </Pie>
              {/* 3D Shadow Effect */}
              <Pie
                data={data}
                cx="50%"
                cy="48%"
                outerRadius={100}
                innerRadius={40}
                dataKey="value"
                fill="rgba(0,0,0,0.1)"
                stroke="none"
                className="blur-sm"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
