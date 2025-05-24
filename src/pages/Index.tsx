
import React from 'react';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { TopProducts } from '@/components/dashboard/TopProducts';
import { LowStockAlert } from '@/components/dashboard/LowStockAlert';
import { PendingTasks } from '@/components/dashboard/PendingTasks';

const Index = () => {
  return (
    <div className="p-6">
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <SalesChart />
        <TopProducts />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RecentOrders />
        <div className="space-y-6">
          <LowStockAlert />
          <PendingTasks />
        </div>
      </div>
    </div>
  );
};

export default Index;
