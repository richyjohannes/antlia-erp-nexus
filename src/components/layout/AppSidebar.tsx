
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Home, 
  User, 
  Menu,
  ChevronDown,
  Calendar,
  Bell,
  Cog
} from 'lucide-react';

export function AppSidebar() {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    {
      title: t('dashboard'),
      url: '/dashboard',
      icon: Home,
    },
    {
      title: t('masterData'),
      icon: User,
      items: [
        { title: t('customer'), url: '/master-data/customer' },
        { title: t('supplier'), url: '/master-data/supplier' },
        { title: t('category'), url: '/master-data/category' },
        { title: t('uom'), url: '/master-data/uom' },
        { title: t('materialType'), url: '/master-data/material-type' },
        { title: t('product'), url: '/master-data/product' },
        { title: t('warehouse'), url: '/master-data/warehouse' },
        { title: t('storage'), url: '/master-data/storage' },
      ]
    },
    {
      title: t('procurement'),
      icon: Calendar,
      items: [
        { title: t('dashboard'), url: '/procurement/dashboard' },
        { title: t('purchaseRequest'), url: '/procurement/purchase-request' },
        { title: t('waitingApproval'), url: '/procurement/waiting-approval' },
        { title: t('purchaseOrder'), url: '/procurement/purchase-order' },
        { title: t('closePO'), url: '/procurement/close-po' },
        { title: t('report'), url: '/procurement/report' },
      ]
    },
    {
      title: t('warehouseLogistics'),
      icon: Menu,
      items: [
        { title: t('dashboard'), url: '/warehouse/dashboard' },
        { title: t('receivingPO'), url: '/warehouse/receiving-po' },
        { title: t('putAway'), url: '/warehouse/put-away' },
        { title: t('listOrder'), url: '/warehouse/list-order' },
        { title: t('picking'), url: '/warehouse/picking' },
        { title: t('packing'), url: '/warehouse/packing' },
        { title: t('loading'), url: '/warehouse/loading' },
        { title: t('returnOrder'), url: '/warehouse/return-order' },
        { title: t('returnPO'), url: '/warehouse/return-po' },
        { title: t('inboundReport'), url: '/warehouse/inbound-report' },
        { title: t('outboundReport'), url: '/warehouse/outbound-report' },
        { title: t('returnReport'), url: '/warehouse/return-report' },
        { title: t('transferStock'), url: '/warehouse/transfer-stock' },
        { title: t('returnTransfer'), url: '/warehouse/return-transfer' },
        { title: t('transferReport'), url: '/warehouse/transfer-report' },
        { title: t('transferLocation'), url: '/warehouse/transfer-location' },
      ]
    },
    {
      title: t('ppic'),
      icon: Bell,
      items: [
        { title: t('dashboard'), url: '/ppic/dashboard' },
        { title: t('stockInventory'), url: '/ppic/stock-inventory' },
        { title: t('stockMovement'), url: '/ppic/stock-movement' },
        { title: t('stockOpname'), url: '/ppic/stock-opname' },
        { title: t('autoOrder'), url: '/ppic/auto-order' },
        { title: t('forecasting'), url: '/ppic/forecasting' },
        { title: t('productionPlan'), url: '/ppic/production-plan' },
        { title: t('demandPlanning'), url: '/ppic/demand-planning' },
      ]
    },
    {
      title: t('manufacture'),
      icon: Cog,
      items: [
        { title: t('dashboard'), url: '/manufacture/dashboard' },
        { title: t('productionSchedule'), url: '/manufacture/production-schedule' },
        { title: t('workOrder'), url: '/manufacture/work-order' },
        { title: t('materialRequest'), url: '/manufacture/material-request' },
        { title: t('productionProcess'), url: '/manufacture/production-process' },
        { title: t('productionReport'), url: '/manufacture/production-report' },
        { title: t('oee'), url: '/manufacture/oee' },
        { title: t('oeeReport'), url: '/manufacture/oee-report' },
      ]
    },
    {
      title: t('setup'),
      url: '/setup',
      icon: Cog,
    },
    {
      title: t('globalColorSettings'),
      url: '/color-settings',
      icon: Cog,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center justify-center">
          <img 
            src="/assets/image/logo.png" 
            alt="Antlia Logo" 
            className="h-12 w-auto max-w-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) {
                fallback.classList.remove('hidden');
              }
            }}
          />
          <div className="hidden h-12 w-24 rounded-lg bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full justify-between hover:bg-gradient-to-r hover:from-[var(--gradient-start)] hover:to-[var(--gradient-middle)] hover:text-white">
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown className="h-4 w-4" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton 
                                asChild
                                className={location.pathname === subItem.url ? 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] text-white' : 'hover:bg-gray-100'}
                              >
                                <Link to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton 
                      asChild
                      className={location.pathname === item.url ? 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] text-white' : 'hover:bg-gradient-to-r hover:from-[var(--gradient-start)] hover:to-[var(--gradient-middle)] hover:text-white'}
                    >
                      <Link to={item.url!}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
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
