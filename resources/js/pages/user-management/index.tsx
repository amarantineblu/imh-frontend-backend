import SubMenuLayout, { type TabConfig } from '@/components/layouts/submenu-layout';
import { type User, type Role, type BreadcrumbItem } from '@/types';
import { TbUser, TbUserDollar, TbUserShield } from 'react-icons/tb';
import RolesTab from './tabs/roles-tab';
import SalesCommissionsAgentsTab from './tabs/sales-commissions-agents-tab';
import UsersTab from './tabs/users-tab';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'User Management',
    href: '/user-management',
  },
];

interface UserManagementPageProps {
  activeTab?: string;
  data?: Array<User|Role>;
}

const tabConfigs: TabConfig[] = [
  {
    id: 'users',
    label: 'Users',
    icon: TbUser,
    title: 'Users Management',
    description: 'View and manage all users in your system, including their permissions and access levels.',
    component: UsersTab,
    route: '/user-management/users',
  },
  {
    id: 'roles',
    label: 'Roles',
    icon: TbUserShield,
    title: 'Roles Management',
    description: 'Define and manage user roles and permissions across your application.',
    component: RolesTab,
    route: '/user-management/roles',
  },
  {
    id: 'sales-commissions-agents',
    label: 'Sales Commission Agents',
    icon: TbUserDollar,
    title: 'Sales Commission Agents',
    description: 'Manage sales agents and their commission structures for your business.',
    component: SalesCommissionsAgentsTab,
    route: '/user-management/sales-commissions-agents',
  },
];

export default function UserManagement({ activeTab = 'users', data }: UserManagementPageProps) {
  return (
    <SubMenuLayout
      title="User Management"
      description="Manage users, roles, and sales commission agents for your organization."
      activeTab={activeTab}
      tabs={tabConfigs}
      tabData={data}
      breadcrumbs={breadcrumbs}
    />
  );
}
