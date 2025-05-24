
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function ProductionMetrics() {
  const { t } = useTranslation();

  const metrics = [
    { 
      name: 'Production Efficiency', 
      value: 87, 
      target: 90,
      unit: '%',
      status: 'good'
    },
    { 
      name: 'Quality Rate', 
      value: 94, 
      target: 95,
      unit: '%',
      status: 'excellent'
    },
    { 
      name: 'OEE Score', 
      value: 76, 
      target: 80,
      unit: '%',
      status: 'warning'
    },
    { 
      name: 'Downtime', 
      value: 12, 
      target: 8,
      unit: 'hrs',
      status: 'critical'
    },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'excellent': 'from-green-400 to-green-600',
      'good': 'from-blue-400 to-blue-600',
      'warning': 'from-yellow-400 to-yellow-600',
      'critical': 'from-red-400 to-red-600',
    };
    return colors[status as keyof typeof colors] || 'from-gray-400 to-gray-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#e17a9] bg-clip-text text-transparent">
          {t('productionMetrics')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{metric.name}</span>
              <span className="text-sm text-gray-600">
                {metric.value}{metric.unit} / {metric.target}{metric.unit}
              </span>
            </div>
            <div className="relative">
              <Progress 
                value={(metric.value / metric.target) * 100} 
                className="h-3"
              />
              <div 
                className={`absolute inset-0 h-3 rounded-full bg-gradient-to-r ${getStatusColor(metric.status)} opacity-80`}
                style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
