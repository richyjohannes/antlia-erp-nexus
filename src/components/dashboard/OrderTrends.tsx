
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function OrderTrends() {
  const { t } = useTranslation();

  const data = [
    { week: 'Week 1', completed: 85, pending: 12, cancelled: 3 },
    { week: 'Week 2', completed: 92, pending: 8, cancelled: 2 },
    { week: 'Week 3', completed: 78, pending: 15, cancelled: 5 },
    { week: 'Week 4', completed: 96, pending: 6, cancelled: 1 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#e17a9] bg-clip-text text-transparent">
          {t('orderTrends')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="completed" 
              stackId="1"
              stroke="#05b2fd" 
              fill="url(#areaGradient1)" 
            />
            <Area 
              type="monotone" 
              dataKey="pending" 
              stackId="1"
              stroke="#6f42c1" 
              fill="url(#areaGradient2)" 
            />
            <Area 
              type="monotone" 
              dataKey="cancelled" 
              stackId="1"
              stroke="#e17a9" 
              fill="url(#areaGradient3)" 
            />
            <defs>
              <linearGradient id="areaGradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#05b2fd" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#05b2fd" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="areaGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6f42c1" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#6f42c1" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="areaGradient3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e17a9" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#e17a9" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
