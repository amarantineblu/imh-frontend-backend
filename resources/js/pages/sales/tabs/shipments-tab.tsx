import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTableActions } from '@/hooks/use-table-actions';
import { AlertCircle, Calendar, CheckCircle, Clock, Eye, Navigation, Package, Truck, User } from 'lucide-react';
import { useState } from 'react';

// Mock shipments data
interface Shipment extends Record<string, unknown> {
  id: string;
  date: string;
  invoiceNo: string;
  customerName: string;
  contactNumber: string | null;
  location: string;
  shippingStatus: string;
  paymentStatus: string;
}

const mockShipments: Shipment[] = [
  {
    id: '1',
    date: '07/01/2025',
    invoiceNo: 'INV-001',
    customerName: 'John Smith',
    contactNumber: '+234 801 234 5678',
    location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
    shippingStatus: 'Delivered',
    paymentStatus: 'Paid',
  },
  {
    id: '2',
    date: '07/02/2025',
    invoiceNo: 'INV-002',
    customerName: 'Sarah Johnson',
    contactNumber: '+234 802 345 6789',
    location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
    shippingStatus: 'In Transit',
    paymentStatus: 'Partial',
  },
  {
    id: '3',
    date: '07/03/2025',
    invoiceNo: 'INV-003',
    customerName: 'Walk-In Customer',
    contactNumber: null,
    location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
    shippingStatus: 'Pending',
    paymentStatus: 'Unpaid',
  },
  {
    id: '4',
    date: '07/04/2025',
    invoiceNo: 'INV-004',
    customerName: 'Mike Wilson',
    contactNumber: '+234 803 456 7890',
    location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
    shippingStatus: 'Processing',
    paymentStatus: 'Paid',
  },
  {
    id: '5',
    date: '07/05/2025',
    invoiceNo: 'INV-005',
    customerName: 'Emily Davis',
    contactNumber: '+234 804 567 8901',
    location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
    shippingStatus: 'Delivered',
    paymentStatus: 'Partial',
  },
];

const getShippingStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-100 text-green-800';
    case 'In Transit':
      return 'bg-blue-100 text-blue-800';
    case 'Processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'Pending':
      return 'bg-orange-100 text-orange-800';
    case 'Cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getShippingStatusIcon = (status: string) => {
  switch (status) {
    case 'Delivered':
      return <CheckCircle className="h-4 w-4" />;
    case 'In Transit':
      return <Truck className="h-4 w-4" />;
    case 'Processing':
      return <Clock className="h-4 w-4" />;
    case 'Pending':
      return <Package className="h-4 w-4" />;
    case 'Cancelled':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'Paid':
      return 'bg-green-100 text-green-800';
    case 'Partial':
      return 'bg-yellow-100 text-yellow-800';
    case 'Unpaid':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPaymentStatusIcon = (status: string) => {
  switch (status) {
    case 'Paid':
      return <CheckCircle className="h-4 w-4" />;
    case 'Partial':
      return <Clock className="h-4 w-4" />;
    case 'Unpaid':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

export default function ShipmentsTab() {
  const [businessLocation, setBusinessLocation] = useState('all');
  const [customer, setCustomer] = useState('all');
  const [dateRange, setDateRange] = useState('01/01/2025 - 12/31/2025');
  const [user, setUser] = useState('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [shippingStatusFilter, setShippingStatusFilter] = useState('all');
  const [pageSize, setPageSize] = useState(100);

  const filteredShipments = mockShipments.filter((shipment) => {
    const matchesLocation = businessLocation === 'all' || shipment.location.includes(businessLocation);
    const matchesCustomer = customer === 'all' || shipment.customerName.toLowerCase().includes(customer.toLowerCase());
    const matchesPaymentStatus = paymentStatusFilter === 'all' || shipment.paymentStatus.toLowerCase() === paymentStatusFilter;
    const matchesShippingStatus = shippingStatusFilter === 'all' || shipment.shippingStatus.toLowerCase() === shippingStatusFilter;
    return matchesLocation && matchesCustomer && matchesPaymentStatus && matchesShippingStatus;
  });

  const totalShipments = mockShipments.length;
  const inTransitShipments = mockShipments.filter((s) => s.shippingStatus === 'In Transit').length;
  const deliveredShipments = mockShipments.filter((s) => s.shippingStatus === 'Delivered').length;
  const pendingShipments = mockShipments.filter((s) => s.shippingStatus === 'Pending').length;

  const handleTrackShipment = (invoiceNo: string) => {
    alert(`Tracking shipment: ${invoiceNo}`);
  };

  const handleUpdateStatus = (shipmentId: string) => {
    alert(`Updating status for shipment ${shipmentId}...`);
  };

  // Setup table actions
  const { rowActions } = useTableActions<Shipment>({
    customActions: [
      {
        label: "View",
        icon: Eye,
        onClick: (shipment: Shipment) => {
          // TODO: Implement view shipment functionality
          alert(`View shipment: ${shipment.id}`);
        },
        variant: "outline",
      },
      {
        label: "Track",
        icon: Navigation,
        onClick: (shipment: Shipment) => {
          handleTrackShipment(shipment.invoiceNo as string);
        },
        variant: "outline",
      },
      {
        label: "Update",
        icon: Package,
        onClick: (shipment: Shipment) => {
          handleUpdateStatus(shipment.id as string);
        },
        variant: "default",
        disabled: (shipment: Shipment) => !['Pending', 'Processing'].includes(shipment.shippingStatus as string),
      },
    ],
  });

  // Define table columns
  const columns: TableColumn<Shipment>[] = [
    {
      type: "actions",
      header: "Action",
      buttons: rowActions,
    },
    {
      accessorKey: "date",
      header: "Date",
      sortable: true,
      cell: (value) => (
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4 text-gray-400" />
          {String(value)}
        </div>
      ),
    },
    {
      accessorKey: "invoiceNo",
      header: "Invoice No.",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className="font-medium">{String(value)}</div>
      ),
    },
    {
      accessorKey: "customerName",
      header: "Customer name",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          <span className="font-medium">{String(value)}</span>
        </div>
      ),
    },
    {
      accessorKey: "contactNumber",
      header: "Contact Number",
      sortable: true,
      cell: (value) => (
        <span className="text-muted-foreground">
          {(value as string) || 'N/A'}
        </span>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      sortable: true,
      cell: (value) => (
        <span className="text-sm">{String(value)}</span>
      ),
    },
    {
      accessorKey: "shippingStatus",
      header: "Shipping Status",
      sortable: true,
      filterable: true,
      cell: (value, shipment) => (
        <Badge variant="outline" className={getShippingStatusColor(shipment.shippingStatus as string)}>
          <div className="flex items-center gap-1">
            {getShippingStatusIcon(shipment.shippingStatus as string)}
            {String(value)}
          </div>
        </Badge>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      sortable: true,
      filterable: true,
      cell: (value, shipment) => (
        <Badge variant="outline" className={getPaymentStatusColor(shipment.paymentStatus as string)}>
          <div className="flex items-center gap-1">
            {getPaymentStatusIcon(shipment.paymentStatus as string)}
            {String(value)}
          </div>
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Shipments</p>
                <p className="text-2xl font-bold">{totalShipments}</p>
              </div>
              <Package className="ml-auto h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-muted-foreground text-sm font-medium">In Transit</p>
                <p className="text-2xl font-bold text-blue-600">{inTransitShipments}</p>
              </div>
              <Truck className="ml-auto h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Delivered</p>
                <p className="text-2xl font-bold text-green-600">{deliveredShipments}</p>
              </div>
              <CheckCircle className="ml-auto h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{pendingShipments}</p>
              </div>
              <Package className="ml-auto h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Shipments</CardTitle>
          <CardDescription>Track and manage order shipments and deliveries</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Location:</label>
              <Select value={businessLocation} onValueChange={setBusinessLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="BL0001">IBIYEOMIE MEAT HOUSE (BL0001)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Customer:</label>
              <Select value={customer} onValueChange={setCustomer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="john">John Smith</SelectItem>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="mike">Mike Wilson</SelectItem>
                  <SelectItem value="emily">Emily Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range:</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="01/01/2025 - 12/31/2025">01/01/2025 - 12/31/2025</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">User:</label>
              <Select value={user} onValueChange={setUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="cashier">Cashier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Status:</label>
              <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Shipping Status:</label>
              <Select value={shippingStatusFilter} onValueChange={setShippingStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Shipping status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="in transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Show entries and Search */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">Show</span>
              <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000">1000</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="5000">5000</SelectItem>
                  <SelectItem value="1000">1000</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm">entries</span>
            </div>
          </div>

          <DynamicTable
            data={filteredShipments}
            columns={columns}
            pageSize={pageSize}
            searchPlaceholder="Search shipments..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
