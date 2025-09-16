import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTableActions } from '@/hooks/use-table-actions';
import { 
    Calendar, 
    DollarSign, 
    Download, 
    Edit, 
    Eye, 
    ShoppingCart, 
    Trash2, 
    TrendingUp,
    Truck,
    Printer,
    Package,
    FileText,
    CreditCard,
    Receipt,
    RotateCcw,
    Link2,
    Bell
} from 'lucide-react';
import { useState } from 'react';

interface Sale extends Record<string, unknown> {
    id: string;
    date: string;
    invoice_no: string;
    customer_name: string;
    contact_number: string;
    location: string;
    payment_status: string;
    payment_method: string;
    total_amount: number;
    total_paid: number;
    sell_due: number;
    sell_return_due: number;
    shipping_status: string;
    total_items: number;
    tally_number: string;
    added_by: string;
    sell_note: string;
    staff_note: string;
    shipping_details: string;
}

interface Props {
  sales: Sale[];
}
export default function AllSalesTab(props: Props) {
    const [sales] = useState<Sale[]>(props.sales || []);

    // Setup table actions
    const { rowActions } = useTableActions<Sale>({
        customActions: [
            {
                label: 'View',
                icon: Eye,
                onClick: (sale: Sale) => {
                    // TODO: Implement view sale functionality
                    alert(`View sale: ${sale.invoice_no}`);
                },
                variant: 'ghost',
            },
            {
                label: 'Edit',
                icon: Edit,
                onClick: (sale: Sale) => {
                    // TODO: Implement edit sale functionality
                    alert(`Edit sale: ${sale.invoice_no}`);
                },
                variant: 'ghost',
            },
            {
                label: 'Delete',
                icon: Trash2,
                onClick: (sale: Sale) => {
                    // TODO: Implement delete sale functionality
                    if (confirm(`Are you sure you want to delete sale ${sale.invoice_no}?`)) {
                        alert(`Sale ${sale.invoice_no} would be deleted`);
                    }
                },
                className: 'text-destructive hover:text-destructive',
            },
            {
                label: 'Edit Shipping',
                icon: Truck,
                onClick: (sale: Sale) => {
                    // TODO: Implement edit shipping functionality
                    alert(`Edit shipping for: ${sale.invoice_no}`);
                },
                variant: 'ghost',
            },
            {
                label: 'Print Invoice',
                icon: Printer,
                onClick: (sale: Sale) => {
                    // TODO: Implement print invoice functionality
                    alert(`Print invoice: ${sale.invoice_no}`);
                },
                variant: 'ghost',
            },
            {
                label: 'Packing Slip',
                icon: Package,
                onClick: (sale: Sale) => {
                    // TODO: Implement packing slip functionality
                    alert(`Generate packing slip for: ${sale.invoice_no}`);
                },
                variant: 'ghost',
            },
            {
                label: 'Delivery Note',
                icon: FileText,
                onClick: (sale: Sale) => {
                    // TODO: Implement delivery note functionality
                    alert(`Generate delivery note for: ${sale.invoice_no}`);
                },
                variant: 'ghost',
            },
            {
                label: 'Add Payment',
                icon: CreditCard,
                onClick: (sale: Sale) => {
                    // TODO: Implement add payment functionality
                    alert(`Add payment for: ${sale.invoice_no}`);
                },
                variant: 'ghost',
            },
            {
                label: 'View Payments',
                icon: Receipt,
                onClick: (sale: Sale) => {
                    // TODO: Implement view payments functionality
                    alert(`View payments for: ${sale.invoice_no}`);
                },
                variant: 'ghost',
            },
            {
                label: 'Sell Return',
                icon: RotateCcw,
                onClick: (sale: Sale) => {
                    // TODO: Implement sell return functionality
                    alert(`Process return for: ${sale.invoice_no}`);
                },
                variant: 'ghost',
            },
            {
                label: 'Invoice URL',
                icon: Link2,
                onClick: (sale: Sale) => {
                    // TODO: Implement invoice URL functionality
                    alert(`Generate invoice URL for: ${sale.invoice_no}`);
                },
                variant: 'ghost',
            },
            {
                label: 'New Sale Notification',
                icon: Bell,
                onClick: (sale: Sale) => {
                    // TODO: Implement new sale notification functionality
                    alert(`Send notification for: ${sale.invoice_no}`);
                },
                variant: 'ghost',
            },
        ],
    });

    // Define table columns
    const columns: TableColumn<Sale>[] = [
        {
            accessorKey: 'date',
            header: 'Date',
            sortable: true,
            filterable: true,
            cell: (value) => new Date(String(value)).toLocaleDateString(),
        },
        {
            accessorKey: 'invoice_no',
            header: 'Invoice No.',
            sortable: true,
            filterable: true,
            cell: (value) => <span className="font-medium">{String(value)}</span>,
        },
        {
            accessorKey: 'customer_name',
            header: 'Customer Name',
            sortable: true,
            filterable: true,
        },
        {
            accessorKey: 'contact_number',
            header: 'Contact Number',
            sortable: true,
            filterable: true,
        },
        {
            accessorKey: 'payment_status',
            header: 'Payment Status',
            sortable: true,
            filterable: true,
            cell: (value, sale) => (
                <Badge 
                    variant={
                        sale.payment_status === 'Paid' 
                            ? 'default' 
                            : sale.payment_status === 'Partial' 
                                ? 'secondary' 
                                : 'destructive'
                    }
                >
                    {String(value)}
                </Badge>
            ),
        },
        {
            accessorKey: 'total_amount',
            header: 'Total Amount',
            sortable: true,
            cell: (value) => `$${Number(value).toFixed(2)}`,
        },
        {
            accessorKey: 'total_paid',
            header: 'Total Paid',
            sortable: true,
            cell: (value) => `$${Number(value).toFixed(2)}`,
        },
        {
            accessorKey: 'sell_due',
            header: 'Initial Due',
            sortable: true,
            cell: (value) => (
                <span className={Number(value) > 0 ? 'text-red-600 font-medium' : ''}>
                    ${Number(value).toFixed(2)}
                </span>
            ),
        },
        {
            accessorKey: "total_items",
            header: "Overdue Days",
            sortable: true,
            cell: (value) => String(value),
        },
        {
            accessorKey: 'total_items',
            header: 'Dumorrage',
            sortable: true,
        },
        {
            accessorKey: 'added_by',
            header: 'Added By',
            sortable: true,
            filterable: true,
        },
        {
            accessorKey: 'sell_note',
            header: 'Sell Note',
            sortable: false,
            cell: (value) => (
                <span className="text-sm text-muted-foreground max-w-[200px] truncate" title={String(value)}>
                    {String(value)}
                </span>
            ),
        },
        {
            type: 'actions',
            header: 'Actions',
            buttons: rowActions,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                        <DollarSign className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,230</div>
                        <p className="text-muted-foreground text-xs">+12% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Orders</CardTitle>
                        <ShoppingCart className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">156</div>
                        <p className="text-muted-foreground text-xs">+8% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                        <TrendingUp className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$290</div>
                        <p className="text-muted-foreground text-xs">+5% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
                        <Calendar className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$4,947</div>
                        <p className="text-muted-foreground text-xs">23 transactions</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Sales Transactions</CardTitle>
                            <CardDescription>Manage and track all sales transactions</CardDescription>
                        </div>
                        <Button>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 flex gap-4">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="partial">Partial</SelectItem>
                                <SelectItem value="due">Due</SelectItem>
                                <SelectItem value="overdue">Overdue</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Date range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="week">This Week</SelectItem>
                                <SelectItem value="month">This Month</SelectItem>
                                <SelectItem value="quarter">This Quarter</SelectItem>
                                <SelectItem value="year">This Year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DynamicTable data={sales} columns={columns} pageSize={100} searchPlaceholder="Search sales..." />
                </CardContent>
            </Card>
        </div>
    );
}
