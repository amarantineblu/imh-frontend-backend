import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTableActions } from '@/hooks/use-table-actions';
import { AlertTriangle, ArrowLeft, Calendar, CheckCircle, Clock, DollarSign, Eye, RefreshCw, User, XCircle } from 'lucide-react';
import { useState } from 'react';

// Mock sell returns data
interface SellReturn extends Record<string, unknown> {
  id: string;
  date: string;
  invoiceNo: string;
  parentSale: string;
  customerName: string;
  location: string;
  paymentStatus: string;
  totalAmount: number;
  paymentDue: number;
  status: string;
}

// const mockSellReturns: SellReturn[] = [
//   {
//     id: '1',
//     date: '07/01/2025',
//     invoiceNo: 'INV-RTN-001',
//     parentSale: 'SALE-001',
//     customerName: 'John Smith',
//     location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
//     paymentStatus: 'Paid',
//     totalAmount: 25000.00,
//     paymentDue: 0.00,
//     status: 'Completed',
//   },
//   {
//     id: '2',
//     date: '07/02/2025',
//     invoiceNo: 'INV-RTN-002',
//     parentSale: 'SALE-002',
//     customerName: 'Sarah Johnson',
//     location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
//     paymentStatus: 'Partial',
//     totalAmount: 15000.00,
//     paymentDue: 5000.00,
//     status: 'Processing',
//   },
//   {
//     id: '3',
//     date: '07/03/2025',
//     invoiceNo: 'INV-RTN-003',
//     parentSale: 'SALE-003',
//     customerName: 'Walk-In Customer',
//     location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
//     paymentStatus: 'Unpaid',
//     totalAmount: 8000.00,
//     paymentDue: 8000.00,
//     status: 'Pending',
//   },
//   {
//     id: '4',
//     date: '07/04/2025',
//     invoiceNo: 'INV-RTN-004',
//     parentSale: 'SALE-004',
//     customerName: 'Mike Wilson',
//     location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
//     paymentStatus: 'Paid',
//     totalAmount: 32000.00,
//     paymentDue: 0.00,
//     status: 'Completed',
//   },
//   {
//     id: '5',
//     date: '07/05/2025',
//     invoiceNo: 'INV-RTN-005',
//     parentSale: 'SALE-005',
//     customerName: 'Emily Davis',
//     location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
//     paymentStatus: 'Partial',
//     totalAmount: 18000.00,
//     paymentDue: 3000.00,
//     status: 'Processing',
//   },
// ];

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
      return <XCircle className="h-4 w-4" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};

interface Props {
  returns: SellReturn[];
}
export default function ListSellReturnTab(props: Props) {
  const [businessLocation, setBusinessLocation] = useState('all');
  const [customer, setCustomer] = useState('all');
  const [dateRange, setDateRange] = useState('01/01/2025 - 12/31/2025');
  const [user, setUser] = useState('all');
  const [pageSize, setPageSize] = useState(100);
  const mockSellReturns = props.returns || [];
  const filteredReturns = mockSellReturns.filter((returnItem) => {
    const matchesLocation = businessLocation === 'all' || returnItem.location.includes(businessLocation);
    const matchesCustomer = customer === 'all' || returnItem.customerName.toLowerCase().includes(customer.toLowerCase());
    return matchesLocation && matchesCustomer;
  });

  const totalReturns = mockSellReturns.length;
  const pendingReturns = mockSellReturns.filter((r) => r.status === 'Pending').length;
  const completedReturns = mockSellReturns.filter((r) => r.status === 'Completed').length;
  const totalAmount = mockSellReturns.reduce((sum, returnItem) => sum + returnItem.totalAmount, 0);
  const totalDue = mockSellReturns.reduce((sum, returnItem) => sum + returnItem.paymentDue, 0);

  const handleProcessReturn = (returnId: string) => {
    alert(`Processing return ${returnId}...`);
  };

  const handleApproveReturn = (returnId: string) => {
    alert(`Approving return ${returnId}...`);
  };

  const handleRejectReturn = (returnId: string) => {
    if (confirm(`Are you sure you want to reject return ${returnId}?`)) {
      alert(`Return ${returnId} rejected.`);
    }
  };

  // Setup table actions
  const { rowActions } = useTableActions<SellReturn>({
    customActions: [
      {
        label: "View",
        icon: Eye,
        onClick: (returnItem: SellReturn) => {
          // TODO: Implement view return functionality
          alert(`View return: ${returnItem.id}`);
        },
        variant: "outline",
      },
      {
        label: "Approve",
        icon: CheckCircle,
        onClick: (returnItem: SellReturn) => {
          handleApproveReturn(returnItem.id);
        },
        variant: "default",
        disabled: (returnItem: SellReturn) => returnItem.status !== 'Pending',
      },
      {
        label: "Reject",
        icon: XCircle,
        onClick: (returnItem: SellReturn) => {
          handleRejectReturn(returnItem.id);
        },
        variant: "outline",
        disabled: (returnItem: SellReturn) => returnItem.status !== 'Pending',
        className: "text-destructive hover:text-destructive",
      },
      {
        label: "Process",
        icon: RefreshCw,
        onClick: (returnItem: SellReturn) => {
          handleProcessReturn(returnItem.id);
        },
        variant: "default",
        disabled: (returnItem: SellReturn) => returnItem.status !== 'Processing',
      },
    ],
  });

  // Define table columns
  const columns: TableColumn<SellReturn>[] = [
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
      accessorKey: "parentSale",
      header: "Parent Sale",
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
      accessorKey: "location",
      header: "Location",
      sortable: true,
      cell: (value) => (
        <span className="text-sm">{String(value)}</span>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      sortable: true,
      filterable: true,
      cell: (value, returnItem) => (
        <Badge variant="outline" className={getPaymentStatusColor(returnItem.paymentStatus as string)}>
          <div className="flex items-center gap-1">
            {getPaymentStatusIcon(returnItem.paymentStatus as string)}
            {String(value)}
          </div>
        </Badge>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: "Total amount",
      sortable: true,
      cell: (value) => (
        <span className="font-medium">₦ {Number(value).toLocaleString()}</span>
      ),
    },
    {
      accessorKey: "paymentDue",
      header: "Payment due",
      sortable: true,
      cell: (value) => (
        <span className="font-medium">₦ {Number(value).toLocaleString()}</span>
      ),
    },
    {
      type: "actions",
      header: "Action",
      buttons: rowActions,
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
                <p className="text-muted-foreground text-sm font-medium">Total Returns</p>
                <p className="text-2xl font-bold">{totalReturns}</p>
              </div>
              <ArrowLeft className="ml-auto h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingReturns}</p>
              </div>
              <Clock className="ml-auto h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedReturns}</p>
              </div>
              <CheckCircle className="ml-auto h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Amount</p>
                <p className="text-2xl font-bold">₦ {totalAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="ml-auto h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Due</p>
                <p className="text-2xl font-bold">₦ {totalDue.toLocaleString()}</p>
              </div>
              <Clock className="ml-auto h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Sell Return</CardTitle>
          <CardDescription>Manage sales returns and refund requests</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
              <label className="text-sm font-medium">Show:</label>
              <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="1000">1000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Total Summary */}
          <div className="mb-4 flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div className="flex gap-8">
              <div>
                <span className="text-sm text-muted-foreground">Total:</span>
              </div>
              <div>
                <span className="font-medium">₦ {totalAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="font-medium">₦ {totalDue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <DynamicTable
            data={filteredReturns}
            columns={columns}
            pageSize={pageSize}
            searchPlaceholder="Search returns..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
