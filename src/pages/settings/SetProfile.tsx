
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Camera, Save, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SetProfile() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: 'Admin User',
    email: 'admin@antlia.com',
    phone: '+62 812-3456-7890',
    position: 'System Administrator',
    department: 'IT',
    isActive: true,
    avatar: ''
  });
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
        setFormData(prev => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#00aaff] via-[#7b42f1] to-[#ff1a4a] p-6 rounded-t-lg">
          <CardTitle className="text-white text-2xl font-bold">{t('myProfile')}</CardTitle>
        </CardHeader>
      </Card>

      {/* Profile Content */}
      <Card className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] shadow-lg">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Avatar Section */}
            <div className="lg:col-span-1 flex flex-col items-center">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={avatarPreview || formData.avatar} />
                  <AvatarFallback 
                    className="text-3xl font-bold text-white"
                    style={{
                      background: 'linear-gradient(135deg, #00aaff, #7b42f1)'
                    }}
                  >
                    {formData.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0">
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #00d4ff, #8a2be2)'
                      }}
                    >
                      <Camera className="w-5 h-5" />
                    </div>
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </div>
              </div>
              <Button
                className="mt-4 bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Upload className="w-4 h-4 mr-2" />
                {t('changePhoto')}
              </Button>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="border-2 focus:border-blue-400"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="border-2 focus:border-blue-400"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="border-2 focus:border-blue-400"
                  />
                </div>

                <div>
                  <Label htmlFor="position" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Position
                  </Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="border-2 focus:border-blue-400"
                  />
                </div>

                <div>
                  <Label htmlFor="department" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Department
                  </Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="border-2 focus:border-blue-400"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#00aaff] data-[state=checked]:to-[#7b42f1]"
                  />
                  <Label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
                    Active Account
                  </Label>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-3 rounded-full border-2 hover:bg-gray-50"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
