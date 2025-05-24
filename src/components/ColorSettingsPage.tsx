
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/contexts/ColorContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

export function ColorSettingsPage() {
  const { t } = useTranslation();
  const { colors, updateColors, resetColors } = useColors();
  const [localColors, setLocalColors] = useState(colors);

  const handleColorChange = (key: string, value: string) => {
    setLocalColors(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateColors(localColors);
    toast({
      title: "Success",
      description: "Colors have been updated successfully!",
    });
  };

  const handleReset = () => {
    resetColors();
    setLocalColors(colors);
    toast({
      title: "Reset",
      description: "Colors have been reset to default!",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] bg-clip-text text-transparent">
        {t('globalColorSettings')}
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('globalColorSettings')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="primary">{t('primaryColor')}</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="primary"
                  type="color"
                  value={localColors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={localColors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="secondary">{t('secondaryColor')}</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="secondary"
                  type="color"
                  value={localColors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={localColors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="gradientStart">{t('gradientStart')}</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="gradientStart"
                  type="color"
                  value={localColors.gradientStart}
                  onChange={(e) => handleColorChange('gradientStart', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={localColors.gradientStart}
                  onChange={(e) => handleColorChange('gradientStart', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="gradientMiddle">{t('gradientMiddle')}</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="gradientMiddle"
                  type="color"
                  value={localColors.gradientMiddle}
                  onChange={(e) => handleColorChange('gradientMiddle', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={localColors.gradientMiddle}
                  onChange={(e) => handleColorChange('gradientMiddle', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="gradientEnd">{t('gradientEnd')}</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="gradientEnd"
                  type="color"
                  value={localColors.gradientEnd}
                  onChange={(e) => handleColorChange('gradientEnd', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={localColors.gradientEnd}
                  onChange={(e) => handleColorChange('gradientEnd', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleSave}
                className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] hover:from-[var(--gradient-middle)] hover:to-[var(--gradient-end)]"
              >
                {t('saveColors')}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                {t('resetToDefault')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="h-20 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ 
                background: `linear-gradient(to right, ${localColors.gradientStart}, ${localColors.gradientMiddle}, ${localColors.gradientEnd})` 
              }}
            >
              Gradient Preview
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div 
                className="h-12 rounded flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: localColors.primary }}
              >
                Primary
              </div>
              <div 
                className="h-12 rounded flex items-center justify-center text-gray-800 text-sm border"
                style={{ backgroundColor: localColors.secondary }}
              >
                Secondary
              </div>
            </div>

            <Button 
              className="w-full"
              style={{ 
                background: `linear-gradient(to right, ${localColors.gradientStart}, ${localColors.gradientMiddle})` 
              }}
            >
              Sample Button
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
