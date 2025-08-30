import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FaBarcode, FaBuilding, FaFileInvoice, FaKey, FaMapMarkerAlt, FaPalette, FaReceipt, FaUserCircle, FaUsers } from 'react-icons/fa';
import Appearance from './tabs/appearance';
import BarcodeTab from './tabs/barcode-settings-tab';
import BusinessSettingsTab from './tabs/business-settings-tab';
import InvoiceSettingsTab from './tabs/invoice-settings-tab';
import LocationsTab from './tabs/locations-tab';
import Password from './tabs/password';
import Profile from './tabs/profile';
import ReceiptTab from './tabs/receipt-settings-tab';
import TaxSettingsTab from './tabs/tax-settings-tab';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Settings',
    href: '/settings',
  },
];

interface SettingsPageProps {
  activeTab?: string;
}

const tabConfig = [
  {
    value: 'business',
    label: 'Business',
    icon: <FaBuilding className="h-4 w-4" />,
    content: <BusinessSettingsTab />,
  },
  {
    value: 'locations',
    label: 'Locations',
    icon: <FaMapMarkerAlt className="h-4 w-4" />,
    content: <LocationsTab />,
  },
  {
    value: 'invoice',
    label: 'Invoice',
    icon: <FaFileInvoice className="h-4 w-4" />,
    content: <InvoiceSettingsTab />,
  },
  {
    value: 'barcode',
    label: 'Barcode',
    icon: <FaBarcode className="h-4 w-4" />,
    content: <BarcodeTab />,
  },
  {
    value: 'tax',
    label: 'Tax',
    icon: <FaUsers className="h-4 w-4" />,
    content: <TaxSettingsTab />,
  },
  {
    value: 'receipt',
    label: 'Receipt',
    icon: <FaReceipt className="h-4 w-4" />,
    content: <ReceiptTab />,
  },
  {
    value: 'appearance',
    label: 'Appearance',
    icon: <FaPalette className="h-4 w-4" />,
    content: <Appearance />,
  },
  {
    value: 'password',
    label: 'Password',
    icon: <FaKey className="h-4 w-4" />,
    content: <Password />,
  },
  {
    value: 'profile',
    label: 'Profile',
    icon: <FaUserCircle className="h-4 w-4" />,
    content: <Profile mustVerifyEmail={false} />,
  },
];

export default function Settings({ activeTab = 'business' }: SettingsPageProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Settings" />
      <div className="mx-auto p-6">
        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList className="">
            {tabConfig.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-6">
            {tabConfig.map(
              tab =>
                tab.content && (
                  <TabsContent key={tab.value} value={tab.value}>
                    {tab.content}
                  </TabsContent>
                )
            )}
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
}
