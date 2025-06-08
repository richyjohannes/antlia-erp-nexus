
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { Footer } from './Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <AppHeader />
            <main className="flex-1" style={{ backgroundColor: 'var(--theme-bg-main)' }}>
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
