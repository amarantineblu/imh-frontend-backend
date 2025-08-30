import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { type ReactNode } from 'react';

export interface TabConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  route: string;
}

interface SubMenuLayoutProps {
  title: string;
  description: string;
  activeTab: string;
  tabs: TabConfig[];
  tabData?: any;
  breadcrumbs: BreadcrumbItem[];
  children?: ReactNode;
}

export default function SubMenuLayout({ title, description, activeTab, tabs, tabData, breadcrumbs, children }: SubMenuLayoutProps) {
  const handleTabChange = (tabId: string) => {
    const tabConfig = tabs.find((tab) => tab.id === tabId);
    if (tabConfig) {
      router.visit(tabConfig.route, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      });
    }
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`${title} - ${currentTab.label}`} />

      <div className="mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList>
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="mt-6">
            {tabs.map((tab) => {
              const TabComponent = tab.component;
              const IconComponent = tab.icon;

              return (
                <TabsContent key={tab.id} value={tab.id} className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5" />
                        {tab.title}
                      </CardTitle>
                      <CardDescription>{tab.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TabComponent data={tabData}/>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </div>
        </Tabs>

        {children}
      </div>
    </AppLayout>
  );
}
