import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, User, LogOut, Globe, Sun, Moon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';

export function AppHeader() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isDark, toggleMode } = useTheme();
  
  const [isUsernameDialogOpen, setIsUsernameDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('admin');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogout = () => {
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/settings/profile');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleUsernameUpdate = () => {
    toast({
      title: "Username Updated",
      description: "Your username has been successfully updated.",
    });
    setIsUsernameDialogOpen(false);
  };

  const handlePasswordUpdate = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password Updated",
      description: "Your password has been successfully updated.",
    });
    setIsPasswordDialogOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/dashboard') return t('dashboard');
    if (path === '/color-settings') return t('globalColorSettings');
    if (path === '/settings/profile') return t('myProfile');
    
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
        case 'currency': return t('currency');
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
    <>
      <header 
        className="h-16 border-b px-4 flex items-center justify-between text-white"
        style={{ background: 'var(--theme-header-bg)' }}
      >
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-white hover:bg-white/20" />
          <h1 className="text-xl font-semibold text-white">
            {getPageTitle()}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMode}
            className="text-white hover:bg-white/20"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Language Toggle */}
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-white" />
            <span className="text-sm text-white">EN</span>
            <Switch
              checked={i18n.language === 'id'}
              onCheckedChange={toggleLanguage}
              className="data-[state=checked]:bg-white/30 data-[state=unchecked]:bg-white/20"
            />
            <span className="text-sm text-white">ID</span>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white">
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
              <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/20">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-white/20 text-white border border-white/30">
                    A
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleProfileClick}>
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
              <DropdownMenuItem onClick={() => setIsUsernameDialogOpen(true)}>
                <User className="mr-2 h-4 w-4" />
                {t('editUsername')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsPasswordDialogOpen(true)}>
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

      {/* Edit Username Dialog */}
      <Dialog open={isUsernameDialogOpen} onOpenChange={setIsUsernameDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#ff1a1a] bg-clip-text text-transparent">
              Edit Username
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                New Username
              </Label>
              <Input
                id="username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="mt-1 border-2 focus:border-blue-400"
                placeholder="Enter new username"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleUsernameUpdate}
                className="flex-1 bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Update Username
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsUsernameDialogOpen(false)}
                className="flex-1 px-6 py-2 rounded-lg border-2 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#ff1a1a] bg-clip-text text-transparent">
              Edit Password
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 border-2 focus:border-blue-400"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 border-2 focus:border-blue-400"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 border-2 focus:border-blue-400"
                placeholder="Confirm new password"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handlePasswordUpdate}
                className="flex-1 bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Update Password
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsPasswordDialogOpen(false)}
                className="flex-1 px-6 py-2 rounded-lg border-2 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
