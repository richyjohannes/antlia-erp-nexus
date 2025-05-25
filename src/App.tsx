
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ColorProvider } from '@/contexts/ColorContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { ColorSettingsPage } from '@/components/ColorSettingsPage';
import { LoginPage } from '@/components/LoginPage';
import { UnderDevelopment } from '@/components/UnderDevelopment';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import './i18n/config';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ColorProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              <MainLayout>
                <Index />
              </MainLayout>
            } />
            <Route path="/color-settings" element={
              <MainLayout>
                <ColorSettingsPage />
              </MainLayout>
            } />
            
            {/* Master Data Routes */}
            <Route path="/master-data/*" element={
              <MainLayout>
                <UnderDevelopment />
              </MainLayout>
            } />
            
            {/* Procurement Routes */}
            <Route path="/procurement/*" element={
              <MainLayout>
                <UnderDevelopment />
              </MainLayout>
            } />
            
            {/* Warehouse Routes */}
            <Route path="/warehouse/*" element={
              <MainLayout>
                <UnderDevelopment />
              </MainLayout>
            } />
            
            {/* PPIC Routes */}
            <Route path="/ppic/*" element={
              <MainLayout>
                <UnderDevelopment />
              </MainLayout>
            } />
            
            {/* Manufacture Routes */}
            <Route path="/manufacture/*" element={
              <MainLayout>
                <UnderDevelopment />
              </MainLayout>
            } />
            
            {/* All other routes */}
            <Route path="/fleet-management/*" element={
              <MainLayout>
                <UnderDevelopment />
              </MainLayout>
            } />
            <Route path="/pos/*" element={
              <MainLayout>
                <UnderDevelopment />
              </MainLayout>
            } />
            <Route path="/sales-order/*" element={
              <MainLayout>
                <UnderDevelopment />
              </MainLayout>
            } />
            <Route path="/finance/*" element={
              <MainLayout>
                <UnderDevelopment />
              </MainLayout>
            } />
            <Route path="/project-management/*" element={
              <MainLayout>
                <UnderDevelopment />
              </MainLayout>
            } />
            <Route path="/lead/*" element={
              <MainLayout>
                <UnderDevelopment />
              </MainLayout>
            } />
            <Route path="/fixed-equipment/*" element={
              <MainLayout>
                <UnderDevelopment />
              </MainLayout>
            } />
            <Route path="/hr-records/*" element={
              <MainLayout>
                <UnderDevelopment />
              </MainLayout>
            } />
            <Route path="/hr-payroll/*" element={
              <MainLayout>
                <UnderDevelopment />
              </MainLayout>
            } />
            <Route path="/recruitment/*" element={
              <MainLayout>
                <UnderDevelopment />
              </MainLayout>
            } />
            <Route path="/setup" element={
              <MainLayout>
                <UnderDevelopment />
              </MainLayout>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ColorProvider>
  </QueryClientProvider>
);

export default App;
