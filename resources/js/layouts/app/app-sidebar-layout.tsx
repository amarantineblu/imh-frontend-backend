import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
  return (
    <AppShell variant="sidebar">
      <AppSidebar />
      <AppContent variant="sidebar" className='h-[calc(50vh)] overflow-hidden'>
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        <ScrollArea className="h-[calc(100vh-64px)] w-full">
          {children}
        </ScrollArea>
      </AppContent>
    </AppShell>
  );
}
