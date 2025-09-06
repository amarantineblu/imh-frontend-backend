import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import AddDraftTab from './tabs/add-draft-tab';
import AddQuotationTab from './tabs/add-quotation-tab';
import AddSaleTab from './tabs/add-sale-tab';
import AllSalesTab from './tabs/all-sales-tab';
import DiscountsTab from './tabs/discounts-tab';
import Import from './tabs/import';
import ListDraftsTab from './tabs/list-drafts-tab';
import ListPosTab from './tabs/list-pos-tab';
import ListQuotationsTab from './tabs/list-quotations-tab';
import ListSellReturnTab from './tabs/list-sell-return-tab';
import PosTab from './tabs/pos-tab';
import ShipmentsTab from './tabs/shipments-tab';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';


const breadcrumbs: BreadcrumbItem[] = [
  {
      title: 'Sales',
      href: '/sales',
  },
];



interface PosTransaction {
  id: string;
  date: string;
  tallyNo: string;
  customerName: string;
  contactNumber: string;
  location: string;
  paymentStatus: string;
  paymentMethod: string;
  totalAmount: number;
  totalPaid: number;
  sellDue: number;
  sellReturnDue: number;
  shippingStatus: string;
  totalItems: number;
  addedBy: string;
  sellNote: string;
  staffNote: string;
  shippingDetails: string;
}

interface SalesPageProps {
  transactions: PosTransaction[];
  activeTab?: string;
}

export default function Sales({ activeTab = 'all-sales' }: SalesPageProps ) {
   


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales Management" />

            <div className="mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight">Sales Management</h1>
                    <p className="text-muted-foreground">Manage sales transactions, POS operations, quotations, and sales-related activities.</p>
                </div>

                <Tabs defaultValue={activeTab} className="w-full">
                    <ScrollArea className="w-full">
                        <TabsList className="bg-muted text-muted-foreground inline-flex h-10 w-fit items-center justify-start rounded-md p-1">
                            {salesTabs.map((tab) => (
                                <TabsTrigger tooltip={tab.label} key={tab.value} value={tab.value} className="flex items-center gap-2 text-sm">
                                    {tab.icon}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </ScrollArea>

                    <div className="mt-6">
                        {salesTabs.map((tab) => (
                            <TabsContent key={tab.value} value={tab.value} className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            {tab.icon}
                                            {tab.title}
                                        </CardTitle>
                                        <CardDescription>{tab.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>{tab.component}</CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div>
        </AppLayout>
    );
}

import {
    FaRegEdit as FaAddDraft,
    FaFileInvoice as FaAddQuotation,
    FaPlusCircle as FaAddSale,
    FaFileInvoiceDollar as FaAllSales,
    FaPercent as FaDiscounts,
    FaFileArchive as FaDraftList,
    FaFileImport as FaImportSales,
    FaListAlt as FaListPOS,
    FaCashRegister as FaPOS,
    FaFileSignature as FaQuotation,
    FaFileExport as FaSellReturn,
    FaShippingFast as FaShipments
} from "react-icons/fa";

const salesTabs = [
{
    value: 'all-sales',
    label: 'All Sales',
    title: 'All Sales',
    icon: <FaAllSales className="h-5 w-5" />,
    description: 'View and manage all sales transactions.',
    component: <AllSalesTab />,
},
{
    value: 'add-sale',
    label: 'Add Sale',
    title: 'Add New Sale',
    icon: <FaAddSale className="h-5 w-5" />,
    description: 'Create a new sales transaction.',
    component: <AddSaleTab />,
},
{
    value: 'list-pos',
    label: 'List POS',
    title: 'POS Transactions',
    icon: <FaListPOS className="h-5 w-5" />,
    description: 'View all Point of Sale transactions.',
    component: <ListPosTab  />,
},
{
    value: 'pos',
    label: 'POS',
    title: 'Point of Sale',
    icon: <FaPOS className="h-5 w-5" />,
    description: 'Process sales through the POS interface.',
    component: <PosTab />,
},
{
    value: 'add-draft',
    label: 'Add Draft',
    title: 'Add Draft',
    icon: <FaAddDraft className="h-5 w-5" />,
    description: 'Create a draft sale for later processing.',
    component: <AddDraftTab />,
},
{
    value: 'list-drafts',
    label: 'List Drafts',
    title: 'Draft Sales',
    icon: <FaDraftList className="h-5 w-5" />,
    description: 'Manage draft sales transactions.',
    component: <ListDraftsTab />,
},
{
    value: 'add-quotation',
    label: 'Add Quotation',
    title: 'Add Quotation',
    icon: <FaAddQuotation className="h-5 w-5" />,
    description: 'Create a new sales quotation.',
    component: <AddQuotationTab />,
},
{
    value: 'list-quotations',
    label: 'List Quotations',
    title: 'Sales Quotations',
    icon: <FaQuotation className="h-5 w-5" />,
    description: 'Manage sales quotations and convert to sales.',
    component: <ListQuotationsTab />,
},
{
    value: 'sell-return',
    title: 'Sell Returns',
    label: 'List Sell Return',
    icon: <FaSellReturn className="h-5 w-5" />,
    description: 'Process and manage product returns.',
    component: <ListSellReturnTab />,
},
{
    value: 'shipments',
    label: 'Shipments',
    title: 'Shipments',
    icon: <FaShipments className="h-5 w-5" />,
    description: 'Track and manage product shipments.',
    component: <ShipmentsTab />,
},
{
    value: 'discounts',
    label: 'Discounts',
    title: 'Discounts',
    icon: <FaDiscounts className="h-5 w-5" />,
    description: 'Manage discount schemes and promotional offers.',
    component: <DiscountsTab />,
},
{
    value: 'import',
    label: 'Import Sales',
    title: 'Import Sales',
    icon: <FaImportSales className="h-5 w-5" />,
    description: 'Import sales data from external files.',
    component: <Import />,
},
];
