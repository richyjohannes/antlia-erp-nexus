
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

export function UnderDevelopment() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-[500px] p-6">
      <Card className="max-w-md w-full">
        <CardContent className="text-center p-8">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] flex items-center justify-center text-white text-3xl font-bold">
              A
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] bg-clip-text text-transparent">
            {t('company')} ERP
          </h2>
          <p className="text-gray-600 mb-4">
            {t('underDevelopment')}
          </p>
          <div className="animate-pulse">
            <div className="h-2 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
