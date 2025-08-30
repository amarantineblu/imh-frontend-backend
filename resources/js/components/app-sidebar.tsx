import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid } from 'lucide-react';
import { AiOutlineProduct } from 'react-icons/ai';
import { CiCalendarDate, CiMoneyBill } from 'react-icons/ci';
import { GiExpense } from 'react-icons/gi';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuDatabaseBackup } from 'react-icons/lu';
import { TbReportAnalytics, TbUsersGroup } from 'react-icons/tb';
import { TiContacts } from 'react-icons/ti';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
  {
    title: 'Home',
    href: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'User Management',
    href: '/user-management',
    icon: TbUsersGroup,
    submenu: [
      {
        title: 'Users',
        href: '/user-management/users',
      },
      {
        title: 'Roles',
        href: '/user-management/roles',
      },
      {
        title: 'Sales Commissions Agents',
        href: '/user-management/sales-commissions-agents',
      },
    ],
  },
  {
    title: 'Contacts',
    href: '/contacts',
    icon: TiContacts,
    submenu: [
      {
        title: 'Suppliers',
        href: '/contacts/suppliers',
      },
      {
        title: 'Customers',
        href: '/contacts/customers',
      },
      {
        title: 'Customers Groups',
        href: '/contacts/customers-groups',
      },
      {
        title: 'Import Contacts',
        href: '/contacts/import-contacts',
      },
    ],
  },
  {
    title: 'Products',
    href: '/products',
    icon: AiOutlineProduct,
    submenu: [
      {
        title: 'List Products',
        href: '/products/list',
      },
      {
        title: 'Add Product',
        href: '/products/add',
      },
      {
        title: 'Print Labels',
        href: '/products/print-labels',
      },
      {
        title: 'Variations',
        href: '/products/variations',
      },
      {
        title: 'Import Products',
        href: '/products/import',
      },
      {
        title: 'Import Opening Stock',
        href: '/products/import-opening-stock',
      },
      {
        title: 'Selling Price Group',
        href: '/products/selling-price-group',
      },
      {
        title: 'Units',
        href: '/products/units',
      },
      {
        title: 'Categories',
        href: '/products/categories',
      },
      {
        title: 'Brands',
        href: '/products/brands',
      },
      {
        title: 'Warranties',
        href: '/products/warranties',
      },
    ],
  },
  {
    title: 'Sales',
    href: '/sales',
    icon: CiMoneyBill,
    submenu: [
      {
        title: 'All Sales',
        href: '/sales/all',
      },
      {
        title: 'Add Sale',
        href: '/sales/add',
      },
      {
        title: 'List POS',
        href: '/sales/pos-list',
      },
      {
        title: 'POS',
        href: '/sales/pos',
      },
      {
        title: 'Add Draft',
        href: '/sales/add-draft',
      },
      {
        title: 'List Drafts',
        href: '/sales/drafts',
      },
      {
        title: 'Add Quotation',
        href: '/sales/add-quotation',
      },
      {
        title: 'List Quotations',
        href: '/sales/quotations',
      },
      {
        title: 'List Sell Return',
        href: '/sales/returns',
      },
      {
        title: 'Shipments',
        href: '/sales/shipments',
      },
      {
        title: 'Discounts',
        href: '/sales/discounts',
      },
      {
        title: 'Import Sales',
        href: '/sales/import',
      }
    ]

  },
  {
    title: 'Expenses',
    href: '/expenses',
    icon: GiExpense,
    submenu: [
      {
        title: 'List Expenses',
        href: '/expenses/list',
      },
      {
        title: 'Add Expense',
        href: '/expenses/add',
      },
      {
        title: 'Expense Categories',
        href: '/expenses/categories',
      },
    ],
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: TbReportAnalytics,
    submenu: [
      {
        title: 'Profit / Loss Report',
        href: '/reports/profit-loss',
      },
      {
        title: 'Purchase & Sale',
        href: '/reports/purchase-sale',
      },
      {
        title: 'Tax Report',
        href: '/reports/tax-report',
      },
      {
        title: 'Supplier & Customer Report',
        href: '/reports/supplier-customer',
      },
      {
        title: 'Customer Groups Report',
        href: '/reports/customer-group',
      },
      {
        title: 'Stock Report',
        href: '/reports/stock-report',
      },
      {
        title: 'Trending Products',
        href: '/reports/trending-products',
      },
      {
        title: 'Items Report',
        href: '/reports/items-report',
      },
      {
        title: 'Product Purchase Report',
        href: '/reports/product-purchase',
      },
      {
        title: 'Product Sell Report',
        href: '/reports/product-sell',
      },
      {
        title: 'Purchase Payment Report',
        href: '/reports/purchase-payment',
      },
      {
        title: 'Sell Payment Report',
        href: '/reports/sell-payment',
      },
      {
        title: 'Expense Report',
        href: '/reports/expense-report',
      },
      {
        title: 'Register Report',
        href: '/reports/register-report',
      },
      {
        title: 'Sales Representative Report',
        href: '/reports/sales-representative',
      },
      {
        title: 'Activity Log',
        href: '/reports/activity-log',
      },
    ],
  },
  {
    title: 'Administer Backup',
    href: '/admin-backup',
    icon: LuDatabaseBackup,
  },
  {
    title: 'Modules',
    href: '/modules',
    icon: CiCalendarDate,
  },
  {
    title: 'Settings',
    href: '/settings/business',
    icon: IoSettingsOutline,
    submenu: [
      {
        title: 'Business Settings',
        href: '/settings/business',
      },
      {
        title: 'Business Locations',
        href: '/settings/locations',
      },
      {
        title: 'Invoice Settings',
        href: '/settings/invoice',
      },
      {
        title: 'Barcode Settings',
        href: '/settings/barcode',
      },
      {
        title: 'Receipt Printers',
        href: '/settings/receipt',
      },
      {
        title: 'Tax Rates',
        href: '/settings/tax',
      },
      {
        title: 'Profile Settings',
        href: '/settings/profile',
      },
      {
        title: 'Password Settings',
        href: '/settings/password',
      },
      {
        title: 'Appearance Settings',
        href: '/settings/appearance',
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="p-0">
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
