
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/contexts/ColorContext';
import {
  Building2,
  Users,
  Package,
  FileText,
  BarChart3,
  Settings,
  Truck,
  ChevronDown,
  Home,
  DollarSign,
  UserCheck,
  Boxes
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const menuItems = [
  {
    title: 'dashboard',
    icon: Home,
    url: '/',
  },
  {
    title: 'masterData',
    icon: Building2,
    items: [
      {
        title: 'supplier',
        icon: Truck,
        url: '/master/supplier',
      },
      {
        title: 'customer',
        icon: Users,
        url: '/master/customer',
      },
      {
        title: 'currency',
        icon: DollarSign,
        url: '/master/currency',
      },
    ],
  },
  {
    title: 'userManagement',
    icon: UserCheck,
    items: [
      {
        title: 'users',
        icon: Users,
        url: '/user-management/users',
      },
      {
        title: 'userRoles',
        icon: Settings,
        url: '/user-management/roles',
      },
    ],
  },
  {
    title: 'inventory',
    icon: Package,
    items: [
      {
        title: 'products',
        icon: Boxes,
        url: '/inventory/products',
      },
    ],
  },
  {
    title: 'fleetManagement',
    icon: Truck,
    url: '/fleet-management',
  },
  {
    title: 'reports',
    icon: BarChart3,
    url: '/reports',
  },
  {
    title: 'settings',
    icon: Settings,
    url: '/settings',
  },
];

export function AppSidebar() {
  const { t } = useTranslation();
  const { colors } = useColors();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div 
          className="flex items-center gap-2 p-3 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle}, ${colors.gradientEnd})`
          }}
        >
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Building2 
              className="w-5 h-5" 
              style={{ color: colors.gradientStart }}
            />
          </div>
          <span className="text-white font-bold text-lg">{t('company')} ERP</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          className="w-full justify-between hover:bg-gradient-to-r hover:from-[#00aaff]/10 hover:to-[#7b42f1]/10 py-2"
                          style={{
                            color: colors.gradientStart
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <item.icon className="w-4 h-4" />
                            <span>{t(item.title)}</span>
                          </div>
                          <ChevronDown className="w-4 h-4" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="ml-4 mt-1 space-y-1">
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton 
                                asChild 
                                className="hover:bg-gradient-to-r hover:from-[#00aaff]/10 hover:to-[#7b42f1]/10 py-1.5"
                              >
                                <a 
                                  href={subItem.url}
                                  className="flex items-center gap-2"
                                  style={{
                                    color: colors.gradientMiddle
                                  }}
                                >
                                  <subItem.icon className="w-3 h-3" />
                                  <span className="text-sm">{t(subItem.title)}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton 
                      asChild 
                      className="hover:bg-gradient-to-r hover:from-[#00aaff]/10 hover:to-[#7b42f1]/10 py-2"
                    >
                      <a 
                        href={item.url}
                        className="flex items-center gap-2"
                        style={{
                          color: colors.gradientStart
                        }}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{t(item.title)}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
