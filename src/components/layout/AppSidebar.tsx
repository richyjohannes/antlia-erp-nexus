import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/contexts/ColorContext';
import {
  Archive,
  BarChart3,
  Box,
  Building2,
  Calendar,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  DollarSign,
  FileText,
  Gauge,
  HardHat,
  LayoutDashboard,
  Leaf,
  Package,
  Package2,
  Ruler,
  Settings,
  ShoppingCart,
  Tags,
  Truck,
  Users,
  Warehouse,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const { colors } = useColors();

  // Master Data items
  const masterDataItems = [
    { title: t('currency'), url: '/master/currency', icon: DollarSign },
    { title: t('customer'), url: '/master/customer', icon: Users },
    { title: t('supplier'), url: '/master/supplier', icon: Truck },
    { title: t('category'), url: '/master/category', icon: Tags },
    { title: t('uom'), url: '/master/uom', icon: Ruler },
    { title: t('materialType'), url: '/master/material-type', icon: Package },
    { title: t('product'), url: '/master/product', icon: Package2 },
    { title: t('warehouse'), url: '/master/warehouse', icon: Warehouse },
    { title: t('storage'), url: '/master/storage', icon: Archive },
  ];

  // User Management items
  const userManagementItems = [
    { title: t('user'), url: '/user-management/user', icon: Users },
    { title: t('userRole'), url: '/user-management/user-role', icon: Users },
  ];

  // Procurement items
  const procurementItems = [
    { title: t('purchaseRequest'), url: '/procurement/purchase-request', icon: FileText },
    { title: t('waitingApproval'), url: '/procurement/waiting-approval', icon: ClipboardList },
    { title: t('purchaseOrder'), url: '/procurement/purchase-order', icon: ShoppingCart },
    { title: t('closePO'), url: '/procurement/close-po', icon: Box },
    { title: t('report'), url: '/procurement/report', icon: BarChart3 },
  ];

  // Warehouse items
  const warehouseItems = [
    { title: t('receivingPO'), url: '/warehouse/receiving-po', icon: Box },
    { title: t('putAway'), url: '/warehouse/put-away', icon: Archive },
    { title: t('listOrder'), url: '/warehouse/list-order', icon: ClipboardList },
    { title: t('picking'), url: '/warehouse/picking', icon: Box },
    { title: t('packing'), url: '/warehouse/packing', icon: Box },
    { title: t('loading'), url: '/warehouse/loading', icon: Truck },
    { title: t('returnOrder'), url: '/warehouse/return-order', icon: Box },
    { title: t('returnPO'), url: '/warehouse/return-po', icon: Box },
    { title: t('inboundReport'), url: '/warehouse/inbound-report', icon: BarChart3 },
    { title: t('outboundReport'), url: '/warehouse/outbound-report', icon: BarChart3 },
    { title: t('returnReport'), url: '/warehouse/return-report', icon: BarChart3 },
    { title: t('transferStock'), url: '/warehouse/transfer-stock', icon: Box },
    { title: t('returnTransfer'), url: '/warehouse/return-transfer', icon: Box },
    { title: t('transferReport'), url: '/warehouse/transfer-report', icon: BarChart3 },
    { title: t('transferLocation'), url: '/warehouse/transfer-location', icon: Box },
  ];

  // PPIC items
  const ppicItems = [
    { title: t('stockInventory'), url: '/ppic/stock-inventory', icon: Box },
    { title: t('stockMovement'), url: '/ppic/stock-movement', icon: Box },
    { title: t('stockOpname'), url: '/ppic/stock-opname', icon: ClipboardList },
    { title: t('autoOrder'), url: '/ppic/auto-order', icon: ShoppingCart },
    { title: t('forecasting'), url: '/ppic/forecasting', icon: BarChart3 },
    { title: t('productionPlan'), url: '/ppic/production-plan', icon: Calendar },
    { title: t('demandPlanning'), url: '/ppic/demand-planning', icon: BarChart3 },
  ];

  // Manufacture items
  const manufactureItems = [
    { title: t('productionSchedule'), url: '/manufacture/production-schedule', icon: Calendar },
    { title: t('workOrder'), url: '/manufacture/work-order', icon: ClipboardList },
    { title: t('materialRequest'), url: '/manufacture/material-request', icon: Box },
    { title: t('productionProcess'), url: '/manufacture/production-process', icon: HardHat },
    { title: t('productionReport'), url: '/manufacture/production-report', icon: BarChart3 },
    { title: t('oee'), url: '/manufacture/oee', icon: Gauge },
    { title: t('oeeReport'), url: '/manufacture/oee-report', icon: BarChart3 },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})` }}
            >
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span 
              className="text-xl font-bold"
              style={{ color: colors.gradientStart }}
            >
              Antlia ERP
            </span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Dashboard */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === '/dashboard'}
                  className={location.pathname === '/dashboard' ? 'bg-gradient-to-r text-white' : ''}
                  style={location.pathname === '/dashboard' ? {
                    background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                  } : {}}
                >
                  <Link to="/dashboard" className="flex items-center space-x-3">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>{t('dashboard')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Master Data */}
        <SidebarGroup>
          <SidebarGroupLabel>{t('masterData')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {masterDataItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                    className={location.pathname === item.url ? 'bg-gradient-to-r text-white' : ''}
                    style={location.pathname === item.url ? {
                      background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                    } : {}}
                  >
                    <Link to={item.url} className="flex items-center space-x-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Management */}
        <SidebarGroup>
          <SidebarGroupLabel>{t('userManagement')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userManagementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                    className={location.pathname === item.url ? 'bg-gradient-to-r text-white' : ''}
                    style={location.pathname === item.url ? {
                      background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                    } : {}}
                  >
                    <Link to={item.url} className="flex items-center space-x-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Procurement */}
        <SidebarGroup>
          <SidebarGroupLabel>{t('procurement')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {procurementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                    className={location.pathname === item.url ? 'bg-gradient-to-r text-white' : ''}
                    style={location.pathname === item.url ? {
                      background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                    } : {}}
                  >
                    <Link to={item.url} className="flex items-center space-x-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Warehouse */}
        <SidebarGroup>
          <SidebarGroupLabel>{t('warehouseLogistics')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {warehouseItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                    className={location.pathname === item.url ? 'bg-gradient-to-r text-white' : ''}
                    style={location.pathname === item.url ? {
                      background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                    } : {}}
                  >
                    <Link to={item.url} className="flex items-center space-x-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* PPIC */}
        <SidebarGroup>
          <SidebarGroupLabel>{t('ppic')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ppicItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                    className={location.pathname === item.url ? 'bg-gradient-to-r text-white' : ''}
                    style={location.pathname === item.url ? {
                      background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                    } : {}}
                  >
                    <Link to={item.url} className="flex items-center space-x-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Manufacture */}
        <SidebarGroup>
          <SidebarGroupLabel>{t('manufacture')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {manufactureItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                    className={location.pathname === item.url ? 'bg-gradient-to-r text-white' : ''}
                    style={location.pathname === item.url ? {
                      background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                    } : {}}
                  >
                    <Link to={item.url} className="flex items-center space-x-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Other Modules */}
        <SidebarGroup>
          <SidebarGroupLabel>Other Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  isActive={location.pathname.startsWith('/fleet-management')}
                  className={location.pathname.startsWith('/fleet-management') ? 'bg-gradient-to-r text-white' : ''}
                  style={location.pathname.startsWith('/fleet-management') ? {
                    background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                  } : {}}
                >
                  <Link to="/fleet-management" className="flex items-center space-x-3">
                    <Truck className="h-4 w-4" />
                    <span>Fleet Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  isActive={location.pathname.startsWith('/pos')}
                  className={location.pathname.startsWith('/pos') ? 'bg-gradient-to-r text-white' : ''}
                  style={location.pathname.startsWith('/pos') ? {
                    background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                  } : {}}
                >
                  <Link to="/pos" className="flex items-center space-x-3">
                    <CreditCard className="h-4 w-4" />
                    <span>POS</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  isActive={location.pathname.startsWith('/sales-order')}
                  className={location.pathname.startsWith('/sales-order') ? 'bg-gradient-to-r text-white' : ''}
                  style={location.pathname.startsWith('/sales-order') ? {
                    background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                  } : {}}
                >
                  <Link to="/sales-order" className="flex items-center space-x-3">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Sales Order</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  isActive={location.pathname.startsWith('/finance')}
                  className={location.pathname.startsWith('/finance') ? 'bg-gradient-to-r text-white' : ''}
                  style={location.pathname.startsWith('/finance') ? {
                    background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                  } : {}}
                >
                  <Link to="/finance" className="flex items-center space-x-3">
                    <CircleDollarSign className="h-4 w-4" />
                    <span>Finance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  isActive={location.pathname.startsWith('/project-management')}
                  className={location.pathname.startsWith('/project-management') ? 'bg-gradient-to-r text-white' : ''}
                  style={location.pathname.startsWith('/project-management') ? {
                    background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                  } : {}}
                >
                  <Link to="/project-management" className="flex items-center space-x-3">
                    <ClipboardList className="h-4 w-4" />
                    <span>Project Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  isActive={location.pathname.startsWith('/lead')}
                  className={location.pathname.startsWith('/lead') ? 'bg-gradient-to-r text-white' : ''}
                  style={location.pathname.startsWith('/lead') ? {
                    background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                  } : {}}
                >
                  <Link to="/lead" className="flex items-center space-x-3">
                    <Users className="h-4 w-4" />
                    <span>Lead</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  isActive={location.pathname.startsWith('/fixed-equipment')}
                  className={location.pathname.startsWith('/fixed-equipment') ? 'bg-gradient-to-r text-white' : ''}
                  style={location.pathname.startsWith('/fixed-equipment') ? {
                    background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                  } : {}}
                >
                  <Link to="/fixed-equipment" className="flex items-center space-x-3">
                    <Box className="h-4 w-4" />
                    <span>Fixed Equipment</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  isActive={location.pathname.startsWith('/hr-records')}
                  className={location.pathname.startsWith('/hr-records') ? 'bg-gradient-to-r text-white' : ''}
                  style={location.pathname.startsWith('/hr-records') ? {
                    background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                  } : {}}
                >
                  <Link to="/hr-records" className="flex items-center space-x-3">
                    <Users className="h-4 w-4" />
                    <span>HR Records</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  isActive={location.pathname.startsWith('/hr-payroll')}
                  className={location.pathname.startsWith('/hr-payroll') ? 'bg-gradient-to-r text-white' : ''}
                  style={location.pathname.startsWith('/hr-payroll') ? {
                    background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                  } : {}}
                >
                  <Link to="/hr-payroll" className="flex items-center space-x-3">
                    <CircleDollarSign className="h-4 w-4" />
                    <span>HR Payroll</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  isActive={location.pathname.startsWith('/recruitment')}
                  className={location.pathname.startsWith('/recruitment') ? 'bg-gradient-to-r text-white' : ''}
                  style={location.pathname.startsWith('/recruitment') ? {
                    background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                  } : {}}
                >
                  <Link to="/recruitment" className="flex items-center space-x-3">
                    <Users className="h-4 w-4" />
                    <span>Recruitment</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild
                isActive={location.pathname === '/setup'}
                className={location.pathname === '/setup' ? 'bg-gradient-to-r text-white' : ''}
                style={location.pathname === '/setup' ? {
                  background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                } : {}}
              >
                <Link to="/setup" className="flex items-center space-x-3">
                  <Settings className="h-4 w-4" />
                  <span>{t('setup')}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild
                isActive={location.pathname === '/color-settings'}
                className={location.pathname === '/color-settings' ? 'bg-gradient-to-r text-white' : ''}
                style={location.pathname === '/color-settings' ? {
                  background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                } : {}}
              >
                <Link to="/color-settings" className="flex items-center space-x-3">
                  <Leaf className="h-4 w-4" />
                  <span>{t('globalColorSettings')}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
