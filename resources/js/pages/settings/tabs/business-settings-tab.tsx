import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';
import {
  BusinessView,
  ContactView,
  CustomLabelsView,
  DashboardView,
  EmailSettingsView,
  ModulesView,
  PaymentView,
  POSView,
  PrefixesView,
  ProductView,
  PurchasesView,
  RewardPointSettingsView,
  SaleView,
  SMSSettingsView,
  SystemView,
  TaxView,
} from './views';

type TabItem = {
  title: string;
  key: string;
  content: ReactNode;
};

const tabItems: TabItem[] = [
  {
    title: 'Business',
    key: 'business',
    content: <BusinessView />,
  },
  {
    title: 'Tax',
    key: 'tax',
    content: <TaxView />,
  },
  {
    title: 'Product',
    key: 'product',
    content: <ProductView />,
  },
  {
    title: 'Contact',
    key: 'contact',
    content: <ContactView />,
  },
  {
    title: 'Sale',
    key: 'sale',
    content: <SaleView />,
  },
  {
    title: 'POS',
    key: 'pos',
    content: <POSView />,
  },
  {
    title: 'Purchases',
    key: 'purchases',
    content: <PurchasesView />,
  },
  {
    title: 'Payment',
    key: 'payment',
    content: <PaymentView />,
  },
  {
    title: 'Dashboard',
    key: 'dashboard',
    content: <DashboardView />,
  },
  {
    title: 'System',
    key: 'system',
    content: <SystemView />,
  },
  {
    title: 'Prefixes',
    key: 'prefixes',
    content: <PrefixesView />,
  },
  {
    title: 'Email',
    key: 'email-settings',
    content: <EmailSettingsView />,
  },
  {
    title: 'SMS',
    key: 'sms-settings',
    content: <SMSSettingsView />,
  },
  {
    title: 'Reward Point',
    key: 'reward-point-settings',
    content: <RewardPointSettingsView />,
  },
  {
    title: 'Modules',
    key: 'modules',
    content: <ModulesView />,
  },
  {
    title: 'Custom Labels',
    key: 'custom-labels',
    content: <CustomLabelsView />,
  },
];

export default function SettingsLayout() {
  const [activeTab, setActiveTab] = useState(tabItems[0].key);

  return (
    <div className="pr-2 md:px-4 py-6">
      <Heading title="Business Settings" />

      <div className="flex space-y-8 lg:space-y-0 space-x-4 md:space-x-12">
        <aside className="w-32">
          <nav className="flex flex-col space-y-1 space-x-0">
            {tabItems.map((item) => (
              <Button
                key={item.key}
                size="sm"
                variant="ghost"
                className={cn('w-full justify-start rounded-sm', {
                  'bg-primary text-white dark:text-inherit dark:bg-muted': activeTab === item.key,
                })}
                onClick={() => setActiveTab(item.key)}
              >
                {item.title}
              </Button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 ">
          <section className="w-full space-y-12">
            {tabItems.find((item) => item.key === activeTab)?.content}
          </section>
        </div>
      </div>
    </div>
  );
}
