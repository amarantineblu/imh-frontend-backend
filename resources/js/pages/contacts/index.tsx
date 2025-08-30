import SubMenuLayout, { type TabConfig } from '@/components/layouts/submenu-layout';
import { type Contact, type CustomerGroup, type BreadcrumbItem } from '@/types';
import { Building, Upload, Users, UsersRound } from 'lucide-react';
import CustomerGroupsTab from './tabs/customer-groups-tab';
import CustomersTab from './tabs/customers-tab';
import ImportContactsTab from './tabs/import-contacts-tab';
import SuppliersTab from './tabs/suppliers-tab';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Contacts',
    href: '/contacts',
  },
];

interface ContactsPageProps {
  activeTab?: string;
  data?: Array<Contact|CustomerGroup|any>;
}

const tabConfigs: TabConfig[] = [
  {
    id: 'suppliers',
    label: 'Suppliers',
    icon: Building,
    title: 'Suppliers Management',
    description: 'Manage your suppliers and vendor information for procurement and inventory.',
    component: SuppliersTab,
    route: '/contacts/suppliers',
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: Users,
    title: 'Customers Management',
    description: 'View and manage customer information, contact details, and purchase history.',
    component: CustomersTab,
    route: '/contacts/customers',
  },
  {
    id: 'customers-groups',
    label: 'Customer Groups',
    icon: UsersRound,
    title: 'Customer Groups',
    description: 'Organize customers into groups for better management and targeted marketing.',
    component: CustomerGroupsTab,
    route: '/contacts/customers-groups',
  },
  {
    id: 'import-contacts',
    label: 'Import Contacts',
    icon: Upload,
    title: 'Import Contacts',
    description: 'Bulk import contacts from CSV files or other data sources.',
    component: ImportContactsTab,
    route: '/contacts/import-contacts',
  },
];

export default function Contacts({ activeTab = 'suppliers', data }: ContactsPageProps) {
  return (
    <SubMenuLayout
      title="Contacts"
      description="Manage all your business contacts including suppliers, customers, and groups."
      activeTab={activeTab}
      tabs={tabConfigs}
      tabData={data}
      breadcrumbs={breadcrumbs}
    />
  );
}
