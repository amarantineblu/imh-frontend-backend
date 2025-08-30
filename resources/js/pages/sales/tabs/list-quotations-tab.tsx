import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTableActions } from '@/hooks/use-table-actions';
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  Edit,
  Eye,
  FileText,
  Package,
  Send,
  User,
} from 'lucide-react';
import { useState } from 'react';

// Mock quotations data
interface Quotation extends Record<string, unknown> {
  id: string;
  referenceNo: string;
  date: string;
  customerName: string | null;
  contactNumber: string | null;
  location: string;
  totalItems: number;
  addedBy: string;
  status: string;
}

const mockQuotations: Quotation[] = [
  {
    id: '1',
    referenceNo: 'QUO-001',
    date: '07/01/2025',
    customerName: 'John Smith',
    contactNumber: '+234 801 234 5678',
    location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
    totalItems: 3,
    addedBy: 'Jane Doe',
    status: 'Pending',
  },
  {
    id: '2',
    referenceNo: 'QUO-002',
    date: '07/02/2025',
    customerName: 'Sarah Johnson',
    contactNumber: '+234 802 345 6789',
    location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
    totalItems: 5,
    addedBy: 'John Smith',
    status: 'Accepted',
  },
  {
    id: '3',
    referenceNo: 'QUO-003',
    date: '07/03/2025',
    customerName: 'Walk-In Customer',
    contactNumber: null,
    location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
    totalItems: 2,
    addedBy: 'Jane Doe',
    status: 'Expired',
  },
  {
    id: '4',
    referenceNo: 'QUO-004',
    date: '07/04/2025',
    customerName: 'Mike Wilson',
    contactNumber: '+234 803 456 7890',
    location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
    totalItems: 4,
    addedBy: 'Alice Brown',
    status: 'Sent',
  },
  {
    id: '5',
    referenceNo: 'QUO-005',
    date: '07/05/2025',
    customerName: 'Emily Davis',
    contactNumber: '+234 804 567 8901',
    location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
    totalItems: 7,
    addedBy: 'John Smith',
    status: 'Rejected',
  },
];

export default function ListQuotationsTab() {
  const [statusFilter, setStatusFilter] = useState('all');

  const totalQuotations = mockQuotations.length;
  const pendingQuotations = mockQuotations.filter((q) => q.status === 'Pending').length;
  const acceptedQuotations = mockQuotations.filter((q) => q.status === 'Accepted').length;
  const totalItems = mockQuotations.reduce((sum, quotation) => sum + quotation.totalItems, 0);

  // Filter quotations based on status
  const filteredQuotations = statusFilter === 'all' 
    ? mockQuotations 
    : mockQuotations.filter(q => q.status.toLowerCase() === statusFilter.toLowerCase());

  const handleConvertToSale = (quotationId: string) => {
    alert(`Converting quotation ${quotationId} to sale...`);
  };

  const handleSendQuotation = (quotationId: string) => {
    alert(`Sending quotation ${quotationId} to customer...`);
  };

  const handleDownloadPDF = (quotationId: string) => {
    alert(`Downloading PDF for quotation ${quotationId}...`);
  };

  const handleEditQuotation = (quotationId: string) => {
    alert(`Editing quotation ${quotationId}...`);
  };

  // Setup table actions
  const { rowActions } = useTableActions<Quotation>({
    customActions: [
      {
        label: "View",
        icon: Eye,
        onClick: (quotation: Quotation) => {
          // TODO: Implement view quotation functionality
          alert(`View quotation: ${quotation.id}`);
        },
        variant: "outline",
      },
      {
        label: "Download PDF",
        icon: Download,
        onClick: (quotation: Quotation) => {
          handleDownloadPDF(quotation.id);
        },
        variant: "outline",
      },
      {
        label: "Edit",
        icon: Edit,
        onClick: (quotation: Quotation) => {
          handleEditQuotation(quotation.id);
        },
        variant: "outline",
        disabled: (quotation: Quotation) => !['Pending', 'Sent'].includes(quotation.status),
      },
      {
        label: "Send",
        icon: Send,
        onClick: (quotation: Quotation) => {
          handleSendQuotation(quotation.id);
        },
        variant: "outline",
        disabled: (quotation: Quotation) => !['Pending', 'Sent'].includes(quotation.status),
      },
      {
        label: "Convert to Sale",
        icon: CheckCircle,
        onClick: (quotation: Quotation) => {
          handleConvertToSale(quotation.id);
        },
        variant: "default",
        disabled: (quotation: Quotation) => quotation.status !== 'Accepted',
      },
    ],
  });

  // Define table columns
  const columns: TableColumn<Quotation>[] = [
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
      accessorKey: "referenceNo",
      header: "Reference No",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className="font-medium">{String(value)}</div>
      ),
    },
    {
      accessorKey: "customerName",
      header: "Customer Name",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          <span className="font-medium">{(value as string) || 'Walk-In Customer'}</span>
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
      accessorKey: "totalItems",
      header: "Total Items",
      sortable: true,
      cell: (value) => (
        <div className="flex items-center gap-1">
          <Package className="h-4 w-4 text-gray-400" />
          <span className="font-medium">{String(value)}</span>
        </div>
      ),
    },
    {
      accessorKey: "addedBy",
      header: "Added By",
      sortable: true,
      cell: (value) => (
        <span className="text-sm">{String(value)}</span>
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
                <p className="text-muted-foreground text-sm font-medium">Total Quotations</p>
                <p className="text-2xl font-bold">{totalQuotations}</p>
              </div>
              <FileText className="ml-auto h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingQuotations}</p>
              </div>
              <Clock className="ml-auto h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Accepted</p>
                <p className="text-2xl font-bold text-green-600">{acceptedQuotations}</p>
              </div>
              <CheckCircle className="ml-auto h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Items</p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
              <DollarSign className="ml-auto h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Quotations</CardTitle>
          <CardDescription>Manage and track all customer quotations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DynamicTable
            data={filteredQuotations}
            columns={columns}
            pageSize={100}
            searchPlaceholder="Search quotations..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
