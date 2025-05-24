
import React from 'react';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { TopProducts } from '@/components/dashboard/TopProducts';
import { LowStockAlert } from '@/components/dashboard/LowStockAlert';
import { PendingTasks } from '@/components/dashboard/PendingTasks';
import { InventoryStatus } from '@/components/dashboard/InventoryStatus';
import { MonthlyRevenue } from '@/components/dashboard/MonthlyRevenue';
import { OrderTrends } from '@/components/dashboard/OrderTrends';
import { ProductionMetrics } from '@/components/dashboard/ProductionMetrics';
import { FinancialOverview } from '@/components/dashboard/FinancialOverview';

const Index = () => {
  return (
    <div className="p-6 space-y-6">
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesChart />
        <InventoryStatus />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyRevenue />
        <OrderTrends />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TopProducts />
        <ProductionMetrics />
        <div className="space-y-6">
          <LowStockAlert />
          <PendingTasks />
        </div>
      </div>
      
      <FinancialOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <div className="grid grid-cols-1 gap-6">
          {/* Additional metrics can be added here */}
        </div>
      </div>
    </div>
  );
};

export default Index;
