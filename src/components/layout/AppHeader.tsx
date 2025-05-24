
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, User } from 'lucide-react';

export function AppHeader() {
  const { t, i18n } = useTranslation();
  const [isIndonesian, setIsIndonesian] = useState(i18n.language === 'id');

  const toggleLanguage = (checked: boolean) => {
    const newLang = checked ? 'id' : 'en';
    i18n.changeLanguage(newLang);
    setIsIndonesian(checked);
  };

  return (
    <header className="h-16 border-b bg-white px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold text-gray-800">
          {t('dashboard')}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Language Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">EN</span>
          <Switch 
            checked={isIndonesian} 
            onCheckedChange={toggleLanguage}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[var(--gradient-start)] data-[state=checked]:to-[var(--gradient-middle)]"
          />
          <span className="text-sm text-gray-600">ID</span>
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)]">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-3 border-b">
              <h3 className="font-semibold">{t('notifications')}</h3>
            </div>
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">New Purchase Order</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Low Stock Alert</p>
                <p className="text-xs text-gray-500">5 minutes ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Payment Received</p>
                <p className="text-xs text-gray-500">10 minutes ago</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] text-white">
                  A
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              {t('myProfile')}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              {t('checkIn')}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              {t('attendanceReport')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              {t('changePhoto')}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              {t('editUsername')}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              {t('editPassword')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <User className="mr-2 h-4 w-4" />
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
