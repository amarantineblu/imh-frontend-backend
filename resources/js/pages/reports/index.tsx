import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ActivityLogTab from './tabs/activity-log-tab';
import CustomerGroupsReportTab from './tabs/customer-groups-report-tab';
import ExpenseReportTab from './tabs/expense-report-tab';
import ItemsReportTab from './tabs/items-report-tab';
import ProductPurchaseReportTab from './tabs/product-purchase-report-tab';
import ProductSellReportTab from './tabs/product-sell-report-tab';
import ProfitLossReportTab from './tabs/profit-loss-report-tab';
import PurchasePaymentReportTab from './tabs/purchase-payment-report-tab';
import PurchaseSaleReportTab from './tabs/purchase-sale-report-tab';
import RegisterReportTab from './tabs/register-report-tab';
import SalesRepresentativeReportTab from './tabs/sales-representative-report-tab';
import SellPaymentReportTab from './tabs/sell-payment-report-tab';
import StockReportTab from './tabs/stock-report-tab';
import SupplierCustomerReportTab from './tabs/supplier-customer-report-tab';
import TaxReportTab from './tabs/tax-report-tab';
import TrendingProductsReportTab from './tabs/trending-products-report-tab';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reports & Analytics',
        href: '/reports',
    },
];

interface ReportsPageProps {
    activeTab?: string;
}

import {
    MdAddShoppingCart, // Expense Report
    MdAppRegistration,
    MdAssessment, // Purchase Payment Report
    MdAttachMoney, // Tax Report
    MdGroups, // Supplier & Customer Report
    MdGroupWork, // Sales Representative Report
    MdHistory // Activity Log
    , // Customer Groups Report
    MdInventory, // Trending Products
    MdListAlt, // Sell Payment Report
    MdMoneyOff, // Purchase & Sale
    MdOutlineReceiptLong, // Product Sell Report
    MdPayment, // Register Report
    MdPersonPin, // Product Purchase Report
    MdSell, // Profit / Loss
    MdShoppingCart, // Stock Report
    MdTrendingUp
} from "react-icons/md";

const reportTabs = [
    { value: 'profit-loss', label: 'Profit / Loss Report', icon: MdAssessment, component: ProfitLossReportTab },
    { value: 'purchase-sale', label: 'Purchase & Sale', icon: MdShoppingCart, component: PurchaseSaleReportTab },
    { value: 'tax-report', label: 'Tax Report', icon: MdOutlineReceiptLong, component: TaxReportTab },
    { value: 'supplier-customer', label: 'Supplier & Customer Report', icon: MdGroups, component: SupplierCustomerReportTab },
    { value: 'customer-group', label: 'Customer Groups Report', icon: MdGroupWork, component: CustomerGroupsReportTab },
    { value: 'stock-report', label: 'Stock Report', icon: MdInventory, component: StockReportTab },
    { value: 'trending-products', label: 'Trending Products', icon: MdTrendingUp, component: TrendingProductsReportTab },
    { value: 'items-report', label: 'Items Report', icon: MdListAlt, component: ItemsReportTab },
    { value: 'product-purchase', label: 'Product Purchase Report', icon: MdAddShoppingCart, component: ProductPurchaseReportTab },
    { value: 'product-sell', label: 'Product Sell Report', icon: MdSell, component: ProductSellReportTab },
    { value: 'purchase-payment', label: 'Purchase Payment Report', icon: MdPayment, component: PurchasePaymentReportTab },
    { value: 'sell-payment', label: 'Sell Payment Report', icon: MdAttachMoney, component: SellPaymentReportTab },
    { value: 'expense-report', label: 'Expense Report', icon: MdMoneyOff, component: ExpenseReportTab },
    { value: 'register-report', label: 'Register Report', icon: MdAppRegistration, component: RegisterReportTab },
    { value: 'sales-representative', label: 'Sales Representative Report', icon: MdPersonPin, component: SalesRepresentativeReportTab },
    { value: 'activity-log', label: 'Activity Log', icon: MdHistory, component: ActivityLogTab },
];

export default function Reports({ activeTab = 'profit-loss' }: ReportsPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports & Analytics" />
            <div className="mx-auto p-6">
                <Tabs defaultValue={activeTab} className="w-full">
                    <ScrollArea className="w-full">
                        <TabsList className="bg-muted text-muted-foreground inline-flex h-10 w-fit items-center justify-start rounded-md p-1">
                            {reportTabs.map((tab) => (
                                <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2 text-sm" tooltip={tab.label}>
                                    <tab.icon className="h-4 w-4" />
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </ScrollArea>
                    <div className="mt-6">
                        {reportTabs.map((tab) => (
                            <TabsContent key={tab.value} value={tab.value} className="space-y-4">
                                <tab.component activity_logs={[]}/>
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div>
        </AppLayout>
    );
}
