import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, User, LogOut } from 'lucide-react';

export function AppHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/login');
  };

  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/dashboard') return t('dashboard');
    if (path === '/color-settings') return t('globalColorSettings');
    
    // Master Data routes
    if (path.startsWith('/master-data/')) {
      const subPath = path.split('/')[2];
      switch(subPath) {
        case 'customer': return t('customer');
        case 'supplier': return t('supplier');
        case 'category': return t('category');
        case 'uom': return t('uom');
        case 'material-type': return t('materialType');
        case 'product': return t('product');
        case 'warehouse': return t('warehouse');
        case 'storage': return t('storage');
        default: return t('masterData');
      }
    }
    
    // User Management routes
    if (path.startsWith('/user-management/')) {
      const subPath = path.split('/')[2];
      switch(subPath) {
        case 'user': return t('user');
        case 'user-role': return t('userRole');
        default: return t('userManagement');
      }
    }
    
    // Other routes
    if (path.startsWith('/procurement/')) return t('procurement');
    if (path.startsWith('/warehouse/')) return t('warehouseLogistics');
    if (path.startsWith('/ppic/')) return t('ppic');
    if (path.startsWith('/manufacture/')) return t('manufacture');
    if (path.startsWith('/setup')) return t('setup');
    
    return t('dashboard');
  };

  return (
    <header className="h-16 border-b bg-white px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold text-gray-800">
          {getPageTitle()}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
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
            <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
