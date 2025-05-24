
import React, { useState, useEffect } from 'react';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { TopProducts } from '@/components/dashboard/TopProducts';
import { LowStockAlert } from '@/components/dashboard/LowStockAlert';
import { PendingTasks } from '@/components/dashboard/PendingTasks';
import { InventoryChart } from '@/components/dashboard/InventoryChart';
import { MonthlyRevenueChart } from '@/components/dashboard/MonthlyRevenueChart';
import { ProductionMetrics } from '@/components/dashboard/ProductionMetrics';
import { FinancialOverview } from '@/components/dashboard/FinancialOverview';
import { LoadingScreen } from '@/components/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-6">
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <SalesChart />
        <TopProducts />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <MonthlyRevenueChart />
        <InventoryChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RecentOrders />
        <div className="space-y-6">
          <LowStockAlert />
          <PendingTasks />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ProductionMetrics />
        <FinancialOverview />
      </div>
    </div>
  );
};

export default Index;
