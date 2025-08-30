import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
  user: User;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  href?: string;
  icon?: LucideIcon | IconType | null;
  isActive?: boolean;
  submenu?: NavItem[];
}

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  [key: string]: unknown;
}

export interface User {
  id: number;
  surname: string;
  first_name: string;
  last_name: string;
  fullName: string;
  userFullName: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  [key: string]: unknown; // This allows for additional properties...
}

export interface IMetricCard {
  title: string;
  value: string | number;
  icon: Icon | LucideIcon | IconType;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray' | string;
  currency?: string;
  trend?: 'up' | 'down' | string | null;
  trendValue?: string | number | null;
  size?: 'small' | 'default' | 'large';
}

export interface ColorClasses {
  blue: string;
  green: string;
  purple: string;
  orange: string;
  red: string;
  gray: string;
}

export interface Currency {
  value: string;
  text: string;
}

export interface Timezone {
  value: string;
  text: string;
}

export interface Month {
  value: string;
  text: string;
}

export interface AccountingMethod {
  value: string;
  text: string;
}

export interface Role {
  name: string;
  id: number;
  is_default: boolean;
  business_id: number;
  description: number;
  permissions: string[];
  [key: string]: unknown; // This allows for additional properties...
}

export interface Contact {
  id?: number;
  business_id: number;
  type: string;
  supplier_business_name?: string;
  name?: string;
  prefix?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  contact_id?: string;
  contact_status: string;
  tax_number?: string;
  city?: string;
  state?: string;
  country?: string;
  address_line_1?: string;
  address_line_2?: string;
  zip_code?: string;
  dob?: string;
  mobile: string;
  landline?: string;
  alternate_number?: string;
  pay_term_number?: string,
  pay_term_type?: string,
  credit_limit: string;
  balance: string;
  total_rp: number;
  total_rp_used: number;
  total_rp_expired: number;
  is_default: boolean;
  shipping_address?: string,
  shipping_custom_field_details?: string,
  is_export: boolean;
  export_custom_field_1?: string,
  export_custom_field_2?: string,
  export_custom_field_3?: string,
  export_custom_field_4?: string,
  export_custom_field_5?: string,
  export_custom_field_6?: string,
  position?: string,
  customer_group_id?: string,
  custom_field1?: string,
  custom_field2?: string,
  custom_field3?: string,
  custom_field4?: string,
  custom_field5?: string,
  custom_field6?: string,
  custom_field7?: string,
  custom_field8?: string,
  custom_field9?: string,
  custom_field10?: string,
  customer_group?: string,
  opening_balance: string;
  opening_balance_paid: string;
  max_transaction_date?: string;
  total_ledger_discount: string;
  transaction_date?: string;
  total_invoice: string;
  invoice_received: string;
  total_sell_return: string;
  sell_return_paid: string;

  amount: number;
  [key: string]: unknown; // This allows for additional properties...
}

export interface CustomerGroup {
  name: string;
  price_calculation_type: string;
  amount: number;
  selling_price_group_id?: string;
  id?: string;
  [key: string]: unknown; // This allows for additional properties...
}
