'use client';

import SalesAreaChart from '@/components/chart-area-interactive';
import DashboardTables from '@/components/DashboardTables';
import MetricCard from '@/components/stat-card';
import AppLayout from '@/layouts/app-layout';
import type { IMetricCard } from '@/types';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
  AlertCircle,
  Check,
  ChevronsUpDown,
  DollarSign,
  FileText,
  Package,
  ShoppingCart,
  TrendingUp,
  Users
} from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Home',
    href: '/dashboard',
  },
];


const filterRange = [
  { key: 'Today', label: 'Today', active: true },
  { key: 'Yesterday', label: 'Yesterday', active: false },
  { key: 'Last 7 Days', label: 'Last 7 Days', active: false },
  { key: 'Last 30 Days', label: 'Last 30 Days', active: false },
  { key: 'This Month', label: 'This Month', active: false },
  { key: 'Last Month', label: 'Last Month', active: false },
  { key: 'This month last year', label: 'This month last year', active: false },
  { key: 'This Year', label: 'This Year', active: false },
  { key: 'Last Year', label: 'Last Year', active: false },
  { key: 'Current financial year', label: 'Current financial year', active: false },
  { key: 'Last financial year', label: 'Last financial year', active: false },
  { key: 'Custom Range', label: 'Custom Range', active: false },
];
const metricsData: IMetricCard[] = [
  {
    title: 'Total Sales',
    value: 10000950,
    currency: 'NGN',
    icon: DollarSign,
    trend: 'up',
    trendValue: '+12%',
    color: 'green',
  },
  {
    title: 'Net Sales',
    value: 7300950,
    currency: 'NGN',
    icon: TrendingUp,
    trend: 'up',
    trendValue: '+8%',
    color: 'blue',
  },
  {
    title: 'Invoice Due',
    value: 175,
    icon: FileText,
    color: 'orange',
  },
  {
    title: 'Total Sales Returned',
    value: 5,
    icon: AlertCircle,
    trend: 'down',
    trendValue: '-2%',
    color: 'red',
  },
  {
    title: 'Total Purchases',
    value: 5660,
    icon: ShoppingCart,
    color: 'purple',
  },
  {
    title: 'Purchase Due',
    value: 376,
    icon: Package,
    color: 'orange',
  },
  {
    title: 'Total Purchases Returned',
    value: 62,
    icon: AlertCircle,
    trend: 'down',
    trendValue: '-5%',
    color: 'red',
  },
  {
    title: 'Expenses',
    value: 0.0,
    currency: 'NGN',
    icon: Users,
    color: 'gray',
  },
];

interface DashboardProps {
  sales_payments: any[];
  purchase_payments: any[];
  product_stock_alerts: any[];
  sales_orders: any[];
  pending_shipments: any[];
}

export default function Dashboard(props: DashboardProps) {
  console.log('Dashboard Props:', props);
  const {pending_shipments, sales_payments, purchase_payments, product_stock_alerts, sales_orders} = usePage().props as unknown as DashboardProps;
  
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("Today")

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="min-h-screen bg-gray-50 dark:bg-white/10 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex justify-between">
            <div className="">
            <h1 className="mb-2 text-3xl font-bold text-inherent">Dashboard Metrics</h1>
            <p className="text-gray-600 dark:text-inherent">Overview of your business performance</p>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between bg-white/20 hover:bg-white/25"
                >
                  {value
                    ? filterRange.find((range) => range.key === value)?.label
                    : "Select range..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search range..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No Range Selected</CommandEmpty>
                    <CommandGroup>
                      {filterRange.map((range) => (
                        <CommandItem
                          key={range.key}
                          value={range.key}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                          }}
                        >
                          {range.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              value === range.key ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Responsive grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {metricsData.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                currency={metric.currency}
                icon={metric.icon}
                trend={metric.trend}
                trendValue={metric.trendValue}
                color={metric.color}
              />
            ))}
          </div>

          <SalesAreaChart />
          {/* Dashboard Tables Section */}
          <DashboardTables pendingShipments={pending_shipments} salesOrders={sales_orders} salesPayments={sales_payments} purchasePayments={purchase_payments} productStockAlerts={product_stock_alerts} />
        </div>
      </div>
    </AppLayout>
  );
}
