
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
import { PieChart3D } from '@/components/dashboard/PieChart3D';
import { HorizontalBarChart } from '@/components/dashboard/HorizontalBarChart';

const Index = () => {
  const { t } = useTranslation();
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

  // Sample data for new charts
  const departmentData = [
    { name: t('production'), value: 35 },
    { name: t('sales'), value: 25 },
    { name: t('marketing'), value: 20 },
    { name: t('operations'), value: 15 },
    { name: t('support'), value: 5 }
  ];

  const performanceData = [
    { name: t('salesTeam'), value: 85, target: 90 },
    { name: t('production'), value: 92, target: 85 },
    { name: t('qualityControl'), value: 78, target: 80 },
    { name: t('customerService'), value: 95, target: 90 },
    { name: t('logistics'), value: 88, target: 85 }
  ];

  return (
    <div className="p-2 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 w-full overflow-x-hidden">
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 w-full">
          <SalesChart />
        </div>
        <div className="w-full">
          <TopProducts />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <MonthlyRevenueChart />
        <InventoryChart />
      </div>
      
      {/* New Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <PieChart3D 
          title={t('departmentDistribution')}
          data={departmentData}
        />
        <HorizontalBarChart 
          title={t('teamPerformance')}
          data={performanceData}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <RecentOrders />
        <div className="space-y-4 sm:space-y-6 w-full">
          <LowStockAlert />
          <PendingTasks />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ProductionMetrics />
        <FinancialOverview />
      </div>
    </div>
  );
};

export default Index;
