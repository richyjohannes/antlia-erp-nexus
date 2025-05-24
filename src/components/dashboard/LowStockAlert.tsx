
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell } from 'lucide-react';

export function LowStockAlert() {
  const { t } = useTranslation();

  const lowStockItems = [
    { name: 'Raw Material A', currentStock: 15, reorderLevel: 50 },
    { name: 'Component B', currentStock: 8, reorderLevel: 25 },
    { name: 'Packaging C', currentStock: 22, reorderLevel: 100 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] bg-clip-text text-transparent flex items-center gap-2">
          <Bell className="h-5 w-5" />
          {t('lowStockAlert')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {lowStockItems.map((item, index) => (
          <Alert key={index} className="border-orange-200 bg-orange-50">
            <AlertDescription>
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-orange-600">
                  {item.currentStock}/{item.reorderLevel}
                </span>
              </div>
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
}
