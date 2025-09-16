import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTableActions } from '@/hooks/use-table-actions';
import { Calendar, CreditCard, DollarSign, Eye, TrendingUp, Users, Edit, Trash2, Truck, Printer, Package, FileText, Plus, Receipt, Undo2, Link, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';

// Mock data for POS transactions
interface PosTransaction extends Record<string, unknown> {
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
// const mockPosTransactions: PosTransaction[] = [
//   {
//     id: 'TXN-001',
//     date: '2024-01-15',
//     tallyNo: 'T001',
//     customerName: 'John Smith',
//     contactNumber: '+1-555-0123',
//     location: 'New York Store',
//     paymentStatus: 'Paid',
//     paymentMethod: 'Cash',
//     totalAmount: 125.50,
//     totalPaid: 125.50,
//     sellDue: 0,
//     sellReturnDue: 0,
//     shippingStatus: 'Delivered',
//     totalItems: 5,
//     addedBy: 'Jane Doe',
//     sellNote: 'Regular customer',
//     staffNote: 'No special instructions',
//     shippingDetails: 'Express delivery',
//   },
//   {
//     id: 'TXN-002',
//     date: '2024-01-15',
//     tallyNo: 'T002',
//     customerName: 'Sarah Johnson',
//     contactNumber: '+1-555-0456',
//     location: 'Downtown Store',
//     paymentStatus: 'Partial',
//     paymentMethod: 'Card',
//     totalAmount: 89.99,
//     totalPaid: 50.00,
//     sellDue: 39.99,
//     sellReturnDue: 0,
//     shippingStatus: 'Pending',
//     totalItems: 3,
//     addedBy: 'Mike Wilson',
//     sellNote: 'Bulk order discount applied',
//     staffNote: 'Customer requested delayed payment',
//     shippingDetails: 'Standard shipping',
//   },
//   {
//     id: 'TXN-003',
//     date: '2024-01-15',
//     tallyNo: 'T003',
//     customerName: 'Walk-in Customer',
//     contactNumber: 'N/A',
//     location: 'Main Store',
//     paymentStatus: 'Paid',
//     paymentMethod: 'Cash',
//     totalAmount: 45.00,
//     totalPaid: 45.00,
//     sellDue: 0,
//     sellReturnDue: 0,
//     shippingStatus: 'Not Applicable',
//     totalItems: 2,
//     addedBy: 'John Smith',
//     sellNote: 'Cash sale',
//     staffNote: '',
//     shippingDetails: 'In-store pickup',
//   },
//   {
//     id: 'TXN-004',
//     date: '2024-01-15',
//     tallyNo: 'T004',
//     customerName: 'Mike Wilson',
//     contactNumber: '+1-555-0789',
//     location: 'West Side Store',
//     paymentStatus: 'Refunded',
//     paymentMethod: 'Card',
//     totalAmount: 234.75,
//     totalPaid: 234.75,
//     sellDue: 0,
//     sellReturnDue: 234.75,
//     shippingStatus: 'Returned',
//     totalItems: 7,
//     addedBy: 'Jane Doe',
//     sellNote: 'Customer not satisfied',
//     staffNote: 'Process refund immediately',
//     shippingDetails: 'Return shipping',
//   },
// ];

interface Props {
  transactions: PosTransaction[];
}
// console.log(transactions:PosTransaction[]);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Paid':
      return 'bg-green-100 text-green-800';
    case 'Partial':
      return 'bg-yellow-100 text-yellow-800';
    case 'Due':
      return 'bg-orange-100 text-orange-800';
    case 'Refunded':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// const getShippingStatusColor = (status: string) => {
//   switch (status) {
//     case 'Delivered':
//       return 'bg-green-100 text-green-800';
//     case 'Pending':
//       return 'bg-yellow-100 text-yellow-800';
//     case 'Shipped':
//       return 'bg-blue-100 text-blue-800';
//     case 'Returned':
//       return 'bg-red-100 text-red-800';
//     case 'Not Applicable':
//       return 'bg-gray-100 text-gray-800';
//     default:
//       return 'bg-gray-100 text-gray-800';
//   }
// };

// const getPaymentMethodColor = (method: string) => {
//   switch (method) {
//     case 'Cash':
//       return 'bg-blue-100 text-blue-800';
//     case 'Card':
//       return 'bg-purple-100 text-purple-800';
//     case 'Digital':
//       return 'bg-green-100 text-green-800';
//     default:
//       return 'bg-gray-100 text-gray-800';
//   }
// };
interface PropsData {
  transactions: PosTransaction[];
}
export default function ListPosTab(props: PropsData) {
 const [transactions, setTransactions] = useState<PosTransaction[]>(props.transactions || []);
   const [loading, setLoading] = useState(true);
 
  //  useEffect(() => {
    
  //        setTransactions(data["transactions"]);
  //        setLoading(false);
  //       //  console.log('this is the data', data);
         
  //  }, []);
  // console.log(transactions);
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesStatus = statusFilter === 'all' || transaction.paymentStatus.toLowerCase() === statusFilter;
    const matchesPayment = paymentFilter === 'all' || transaction.paymentMethod.toLowerCase() === paymentFilter;
    return matchesStatus && matchesPayment;
  });

  const totalSales = transactions.reduce((sum, transaction) => (transaction.paymentStatus === 'Paid' ? sum + Number(transaction.totalAmount) : sum), 0);
  const paidTransactions = transactions.filter((t) => t.paymentStatus === 'Paid').length;
  const averageTransaction = totalSales / paidTransactions;

  // Setup table actions
  const { rowActions } = useTableActions<PosTransaction>({
    customActions: [
      {
        label: "View",
        icon: Eye,
        onClick: (transaction: PosTransaction) => {
          alert(`View transaction: ${transaction.id}`);
        },
        variant: "outline",
      },
      {
        label: "Edit",
        icon: Edit,
        onClick: (transaction: PosTransaction) => {
          alert(`Edit transaction: ${transaction.id}`);
        },
        variant: "outline",
      },
      {
        label: "Delete",
        icon: Trash2,
        onClick: (transaction: PosTransaction) => {
          if (confirm(`Are you sure you want to delete transaction ${transaction.id}?`)) {
            alert(`Delete transaction: ${transaction.id}`);
          }
        },
        variant: "outline",
      },
      {
        label: "Edit Shipping",
        icon: Truck,
        onClick: (transaction: PosTransaction) => {
          alert(`Edit shipping for transaction: ${transaction.id}`);
        },
        variant: "outline",
      },
      {
        label: "Print Invoice",
        icon: Printer,
        onClick: (transaction: PosTransaction) => {
          alert(`Print invoice for transaction: ${transaction.id}`);
        },
        variant: "outline",
      },
      {
        label: "Packing Slip",
        icon: Package,
        onClick: (transaction: PosTransaction) => {
          alert(`Generate packing slip for transaction: ${transaction.id}`);
        },
        variant: "outline",
      },
      {
        label: "Delivery Note",
        icon: FileText,
        onClick: (transaction: PosTransaction) => {
          alert(`Generate delivery note for transaction: ${transaction.id}`);
        },
        variant: "outline",
      },
      {
        label: "Add Payment",
        icon: Plus,
        onClick: (transaction: PosTransaction) => {
          alert(`Add payment for transaction: ${transaction.id}`);
        },
        variant: "outline",
      },
      {
        label: "View Payments",
        icon: Receipt,
        onClick: (transaction: PosTransaction) => {
          alert(`View payments for transaction: ${transaction.id}`);
        },
        variant: "outline",
      },
      {
        label: "Sell Return",
        icon: Undo2,
        onClick: (transaction: PosTransaction) => {
          alert(`Process sell return for transaction: ${transaction.id}`);
        },
        variant: "outline",
      },
      {
        label: "Invoice URL",
        icon: Link,
        onClick: (transaction: PosTransaction) => {
          alert(`Get invoice URL for transaction: ${transaction.id}`);
        },
        variant: "outline",
      },
      {
        label: "New Sale Notification",
        icon: Bell,
        onClick: (transaction: PosTransaction) => {
          alert(`Send notification for transaction: ${transaction.id}`);
        },
        variant: "outline",
      },
    ],
  });

  // Define table columns
  const columns: TableColumn<PosTransaction>[] = [
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
      accessorKey: "tallyNo",
      header: "Tally No.",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <span className="font-medium">{String(value)}</span>
      ),
    },
    {
      accessorKey: "customerName",
      header: "Customer Name",
      sortable: true,
      filterable: true,
      cell: (value) => String(value),
    },
    {
      accessorKey: "contactNumber",
      header: "Contact Number",
      sortable: true,
      filterable: true,
      cell: (value) => String(value),
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <Badge variant="outline" className={getStatusColor(String(value))}>
          {String(value)}
        </Badge>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
      sortable: true,
      cell: (value) => (
        <span className="font-medium">${Number(value).toFixed(2)}</span>
      ),
    },
    {
      accessorKey: "totalPaid",
      header: "Total Paid",
      sortable: true,
      cell: (value) => (
        <span className="font-medium text-green-600">${Number(value).toFixed(2)}</span>
      ),
    },
    {
      accessorKey: "sellDue",
      header: "Initial Due",
      sortable: true,
      cell: (value) => (
        <span className={`font-medium ${Number(value) > 0 ? 'text-red-600' : 'text-gray-600'}`}>
          ${Number(value).toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: "totalItems",
      header: "Overdue Days",
      sortable: true,
      cell: (value) => String(value),
    },
    {
      accessorKey: "addedBy",
      header: "Added By",
      sortable: true,
      filterable: true,
      cell: (value) => String(value),
    },
    {
      accessorKey: "sellNote",
      header: "Sell Note",
      cell: (value) => (
        <span className="text-sm text-gray-600 max-w-xs truncate" title={String(value)}>
          {String(value)}
        </span>
      ),
    },
    {
      accessorKey: "staffNote",
      header: "Staff Note",
      cell: (value) => (
        <span className="text-sm text-gray-600 max-w-xs truncate" title={String(value)}>
          {String(value)}
        </span>
      ),
    },
    {
      accessorKey: 'actions',
      type: "actions",
      header: "Actions",
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
                <p className="text-muted-foreground text-sm font-medium">Total Sales</p>
                <p className="text-2xl font-bold">${totalSales.toFixed(2)}</p>
              </div>
              <DollarSign className="ml-auto h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Transactions</p>
                <p className="text-2xl font-bold">{transactions.length}</p>
              </div>
              <CreditCard className="ml-auto h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Avg. Transaction</p>
                <p className="text-2xl font-bold">${averageTransaction.toFixed(2)}</p>
              </div>
              <TrendingUp className="ml-auto h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Customers</p>
                <p className="text-2xl font-bold">{new Set(transactions.map((t) => t.customerName)).size}</p>
              </div>
              <Users className="ml-auto h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Transactions</CardTitle>
          <CardDescription>View and manage all sales transactions with comprehensive details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="due">Due</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="digital">Digital</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DynamicTable
            data={filteredTransactions}
            columns={columns}
            enableExport
            enableSorting
            pageSize={100}
            searchPlaceholder="Search by invoice no., customer name, or contact number..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
