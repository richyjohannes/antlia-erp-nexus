
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ProductionMetrics() {
  const { t } = useTranslation();

  const metrics = [
    { name: t('productionEfficiency'), value: 87, target: 90, status: 'warning' },
    { name: t('qualityControl'), value: 95, target: 95, status: 'success' },
    { name: t('equipmentUtilization'), value: 78, target: 85, status: 'danger' },
    { name: t('onTimeDelivery'), value: 92, target: 90, status: 'success' },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'success': 'bg-green-100 text-green-800',
      'warning': 'bg-yellow-100 text-yellow-800',
      'danger': 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="border-l-4 border-l-transparent hover:border-l-4 hover:border-l-[var(--color-primary)] transition-colors">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] bg-clip-text text-transparent">
          {t('productionMetrics')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{metric.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">{metric.value}%</span>
                <Badge className={getStatusColor(metric.status)}>
                  {metric.value >= metric.target ? 'On Track' : 'Needs Attention'}
                </Badge>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${metric.value}%`,
                  background: `linear-gradient(to right, var(--gradient-start), var(--gradient-middle))`
                }}
              />
            </div>
            <div className="text-xs text-gray-500">
              {t('target')}: {metric.target}%
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
