import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DynamicTable, TableColumn } from '@/components/ui/dynamic-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTableActions } from '@/hooks/use-table-actions';
import { Card } from './ui/card';
import { Eye, MapPin, DollarSign, Calendar, Package, Truck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';


// Types
interface SalesPaymentDue extends Record<string, unknown> {
  customer: string;
  date: string;
  invoice: string;
  amount: string;
}

interface PurchasePaymentDue extends Record<string, unknown> {
  supplier: string;
  date: string;
  ref: string;
  amount: string;
}

interface ProductStockAlert extends Record<string, unknown> {
  product: string;
  location: string;
  img: string;
  stock: string;
}

interface SalesOrder extends Record<string, unknown> {
  customer: string;
  date: string;
  order: string;
  contact: string;
  location: string;
  status: string;
  shippingStatus: string;
  qtyRemaining: string;
  addedBy: string;
}

interface PendingShipment extends Record<string, unknown> {
  customer: string;
  date: string;
  invoice: string;
  contact: string;
  location: string;
  shippingStatus: string;
  paymentStatus: string;
}



// Mock data matching your screenshots
// const salesPaymentDue: SalesPaymentDue[] = [
//   // { customer: 'Aisha Doe', date: '13/01/2025', invoice: '37364784', amount: '306,678.00' },
//   // { customer: 'Chukwuemeka', date: '13/01/2025', invoice: '465374846', amount: '100,900.00' },
//   // { customer: 'Suleiman', date: '13/01/2025', invoice: '45243637', amount: '2,004,598.00' },
// ];

// const purchasePaymentDue: PurchasePaymentDue[] = [
//   { supplier: 'Suleiman', date: '13/01/2025', ref: '45243637', amount: '2,004,598.00' },
//   { supplier: 'Aisha Doe', date: '13/01/2025', ref: '37364784', amount: '306,678.00' },
//   { supplier: 'Chukwuemeka', date: '13/01/2025', ref: '465374846', amount: '100,900.00' },
// ];

// const productStockAlert: ProductStockAlert[] = [
//   { product: 'Cow Leg', location: 'Calabar', img: '/img/avatar1.png', stock: '-' },
//   { product: 'Goat Meat', location: 'Enugu', img: '/img/avatar2.png', stock: '-' },
//   { product: 'Turkey', location: 'Lagos', img: '/img/avatar3.png', stock: '-' },
// ];

// const salesOrder: SalesOrder[] = [
//   { customer: 'Suleiman', date: '13/01/2025', order: '45243637', contact: '45535566...', location: '-', status: '-', shippingStatus: '-', qtyRemaining: '-', addedBy: '-' },
//   { customer: 'Aisha Doe', date: '13/01/2025', order: '37364784', contact: '306,678.00', location: '-', status: '-', shippingStatus: '-', qtyRemaining: '-', addedBy: '-' },
//   { customer: 'Chukwuemeka', date: '13/01/2025', order: '465374846', contact: '100,900.00', location: '-', status: '-', shippingStatus: '-', qtyRemaining: '-', addedBy: '-' },
// ];

// const pendingShipments: PendingShipment[] = [
//   { customer: 'Suleiman', date: '13/01/2025', invoice: '45243637', contact: '45535566...', location: '-', shippingStatus: '-', paymentStatus: '-' },
//   { customer: 'Aisha Doe', date: '13/01/2025', invoice: '37364784', contact: '306,678.00', location: '-', shippingStatus: '-', paymentStatus: '-' },
//   { customer: 'Chukwuemeka', date: '13/01/2025', invoice: '465374846', contact: '100,900.00', location: '-', shippingStatus: '-', paymentStatus: '-' },
// ];

interface Props {
  salesPaymentDue: SalesPaymentDue[],
  purchasePaymentDue: PurchasePaymentDue[],
  productStockAlert: ProductStockAlert[],
  salesOrder: SalesOrder[],
  pendingShipments: PendingShipment[],
}

export default function DashboardTables(props:Props) {
  const [salesPaymentDue, setSalesPaymentDue] = useState<SalesPaymentDue[]>([]);
  const [purchasePaymentDue, setPurchasePaymentDue] = useState<PurchasePaymentDue[]>([]);
  const [productStockAlert, setProductStockAlert] = useState<ProductStockAlert[]>([]);
  const [salesOrder, setSalesOrder] = useState<SalesOrder[]>([]);
  const [pendingShipments, setPendingShipments] = useState<PendingShipment[]>([]);
  const [loading, setLoading] = useState(true);
  const { salesPaymentDue: salesPayments, purchasePaymentDue: purchasePayments, productStockAlert: productStockAlerts, salesOrder: salesOrders, pendingShipments: pendingShipmentsProp } = usePage().props;

     useEffect(() => {
        
           setSalesPaymentDue(salesPayments as SalesPaymentDue[]);
           setPurchasePaymentDue(purchasePayments as PurchasePaymentDue[]);
           setProductStockAlert(productStockAlerts as ProductStockAlert[]);
           setSalesOrder(salesOrders as SalesOrder[]);
           setPendingShipments(pendingShipments as PendingShipment[]);
           setLoading(false);
          // console.log('this is the data', data);

     }, []);
  // Table actions for sales payment due
  const salesPaymentActions = useTableActions<SalesPaymentDue>({
    customActions: [
      {
        label: "View Details",
        icon: Eye,
        onClick: (row) => alert(`Viewing payment details for ${row.customer}`),
        variant: "outline"
      }
    ]
  });

  // Table actions for purchase payment due
  const purchasePaymentActions = useTableActions<PurchasePaymentDue>({
    customActions: [
      {
        label: "View Details",
        icon: Eye,
        onClick: (row) => alert(`Viewing payment details for ${row.supplier}`),
        variant: "outline"
      }
    ]
  });

  // Table actions for sales order
  const salesOrderActions = useTableActions<SalesOrder>({
    customActions: [
      {
        label: "View Order",
        icon: Package,
        onClick: (row) => alert(`Viewing order ${row.order}`),
        variant: "outline"
      }
    ]
  });

  // Table actions for pending shipments
  const pendingShipmentActions = useTableActions<PendingShipment>({
    customActions: [
      {
        label: "Track Shipment",
        icon: Truck,
        onClick: (row) => alert(`Tracking shipment ${row.invoice}`),
        variant: "outline"
      }
    ]
  });

  // Sales Payment Due columns
  const salesPaymentColumns: TableColumn<SalesPaymentDue>[] = [
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: (value) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {value as string}
        </div>
      ),
    },
    {
      accessorKey: "invoice",
      header: "Invoice Number",
    },
    {
      accessorKey: "amount",
      header: "Due Amount (NGN)",
      cell: (value) => (
        <div className="flex items-center gap-2 font-medium">
          <DollarSign className="h-4 w-4 text-green-600" />
          ₦{value as string}
        </div>
      ),
    },
    {
      type: "actions" as const,
      header: "Action",
      buttons: salesPaymentActions.rowActions,
    },
  ];

  // Purchase Payment Due columns
  const purchasePaymentColumns: TableColumn<PurchasePaymentDue>[] = [
    {
      accessorKey: "supplier",
      header: "Supplier",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: (value) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {value as string}
        </div>
      ),
    },
    {
      accessorKey: "ref",
      header: "Reference Number",
    },
    {
      accessorKey: "amount",
      header: "Due Amount (NGN)",
      cell: (value) => (
        <div className="flex items-center gap-2 font-medium">
          <DollarSign className="h-4 w-4 text-green-600" />
          ₦{value as string}
        </div>
      ),
    },
    {
      type: "actions" as const,
      header: "Action",
      buttons: purchasePaymentActions.rowActions,
    },
  ];

  // Product Stock Alert columns
  const stockAlertColumns: TableColumn<ProductStockAlert>[] = [
    {
      accessorKey: "product",
      header: "Product",
      cell: (value, row) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={row.img} alt={row.product} />
            <AvatarFallback>{row.product[0]}</AvatarFallback>
          </Avatar>
          {row.product}
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: (value) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          {value as string}
        </div>
      ),
    },
    {
      accessorKey: "stock",
      header: "Current Stock",
      cell: (value) => (
        <span className="text-muted-foreground">{value as string}</span>
      ),
    },
  ];

  // Sales Order columns
  const salesOrderColumns: TableColumn<SalesOrder>[] = [
    {
      accessorKey: "customer",
      header: "Customer Name",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: (value) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {value as string}
        </div>
      ),
    },
    {
      accessorKey: "order",
      header: "Order No.",
    },
    {
      accessorKey: "contact",
      header: "Contact No.",
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: (value) => <span className="text-muted-foreground">{value as string}</span>,
    },
    {
      type: "actions" as const,
      header: "Action",
      buttons: salesOrderActions.rowActions,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (value) => <span className="text-muted-foreground">{value as string}</span>,
    },
    {
      accessorKey: "shippingStatus",
      header: "Shipping Status",
      cell: (value) => <span className="text-muted-foreground">{value as string}</span>,
    },
    {
      accessorKey: "qtyRemaining",
      header: "Qty Remaining",
      cell: (value) => <span className="text-muted-foreground">{value as string}</span>,
    },
    {
      accessorKey: "addedBy",
      header: "Added By",
      cell: (value) => <span className="text-muted-foreground">{value as string}</span>,
    },
  ];

  // Pending Shipments columns
  const pendingShipmentColumns: TableColumn<PendingShipment>[] = [
    {
      accessorKey: "customer",
      header: "Customer Name",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: (value) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {value as string}
        </div>
      ),
    },
    {
      accessorKey: "invoice",
      header: "Invoice Number",
    },
    {
      accessorKey: "contact",
      header: "Contact Number",
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: (value) => <span className="text-muted-foreground">{value as string}</span>,
    },
    {
      type: "actions" as const,
      header: "Action",
      buttons: pendingShipmentActions.rowActions,
    },
    {
      accessorKey: "shippingStatus",
      header: "Shipping Status",
      cell: (value) => <span className="text-muted-foreground">{value as string}</span>,
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: (value) => <span className="text-muted-foreground">{value as string}</span>,
    },
  ];

  return (
    <Card className="mt-10 p-5">
      <Tabs defaultValue="sales-payment" className="w-full overflow-x-auto">
        <TabsList className="grid w-full grid-cols-2 gap-4 pb-34 sm:grid-cols-3 sm:pb-20 md:grid-cols-4 lg:grid-cols-5 lg:pb-0">
          <TabsTrigger value="sales-payment">Sales Payment Due</TabsTrigger>
          <TabsTrigger value="purchase-payment">Purchase Payment Due</TabsTrigger>
          <TabsTrigger value="stock-alert">Product Stock Alert</TabsTrigger>
          <TabsTrigger value="sales-order">Sales Order</TabsTrigger>
          <TabsTrigger value="pending-shipments">Pending Shipments</TabsTrigger>
        </TabsList>
        <TabsContent value="sales-payment">
          <DynamicTable
            enableRowSelection
            data={salesPaymentDue}
            columns={salesPaymentColumns}
            enablePagination={true}
            enableSorting={true}
            enableFiltering={true}
            searchPlaceholder="Search sales payments..."
          />
        </TabsContent>
        <TabsContent value="purchase-payment">
          <DynamicTable
            enableRowSelection
            data={purchasePaymentDue}
            columns={purchasePaymentColumns}
            enablePagination={true}
            enableSorting={true}
            enableFiltering={true}
            searchPlaceholder="Search purchase payments..."
          />
        </TabsContent>
        <TabsContent value="stock-alert">
          <DynamicTable
            enableRowSelection
            data={productStockAlert}
            columns={stockAlertColumns}
            enablePagination={true}
            enableSorting={true}
            enableFiltering={true}
            searchPlaceholder="Search stock alerts..."
          />
        </TabsContent>
        <TabsContent value="sales-order">
          <DynamicTable
            enableRowSelection
            data={salesOrder}
            columns={salesOrderColumns}
            enablePagination={true}
            enableSorting={true}
            enableFiltering={true}
            searchPlaceholder="Search sales orders..."
          />
        </TabsContent>
        <TabsContent value="pending-shipments">
          <DynamicTable
            enableRowSelection
            data={pendingShipments}
            columns={pendingShipmentColumns}
            enablePagination={true}
            enableSorting={true}
            enableFiltering={true}
            searchPlaceholder="Search pending shipments..."
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
