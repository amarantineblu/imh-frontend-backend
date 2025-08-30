import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTableActions } from '@/hooks/use-table-actions';
import { Calendar, CheckCircle, Clock, Edit, Eye, FileText, Package, Trash2, User } from 'lucide-react';
import { useState } from 'react';

// Mock drafts data
interface Draft extends Record<string, unknown> {
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

const mockDrafts: Draft[] = [
  {
    id: '1',
    referenceNo: 'DRAFT-001',
    date: '07/01/2025',
    customerName: 'John Smith',
    contactNumber: '+234 801 234 5678',
    location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
    totalItems: 3,
    addedBy: 'Jane Doe',
    status: 'Active',
  },
  {
    id: '2',
    referenceNo: 'DRAFT-002',
    date: '07/02/2025',
    customerName: 'Sarah Johnson',
    contactNumber: '+234 802 345 6789',
    location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
    totalItems: 5,
    addedBy: 'John Smith',
    status: 'Active',
  },
  {
    id: '3',
    referenceNo: 'DRAFT-003',
    date: '07/03/2025',
    customerName: 'Walk-In Customer',
    contactNumber: null,
    location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
    totalItems: 2,
    addedBy: 'Jane Doe',
    status: 'Draft',
  },
  {
    id: '4',
    referenceNo: 'DRAFT-004',
    date: '07/04/2025',
    customerName: 'Mike Wilson',
    contactNumber: '+234 803 456 7890',
    location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
    totalItems: 4,
    addedBy: 'Alice Brown',
    status: 'Converted',
  },
];

export default function ListDraftsTab() {
  const [businessLocation, setBusinessLocation] = useState('all');
  const [customerFilter, setCustomerFilter] = useState('all');
  const [dateRange, setDateRange] = useState('01/01/2025 - 12/31/2025');
  const [userFilter, setUserFilter] = useState('all');
  const [pageSize, setPageSize] = useState(100);

  const filteredDrafts = mockDrafts.filter((draft) => {
    const matchesLocation = businessLocation === 'all' || draft.location === businessLocation;
    const matchesCustomer = customerFilter === 'all' || draft.customerName?.toLowerCase().includes(customerFilter.toLowerCase());
    const matchesUser = userFilter === 'all' || draft.addedBy === userFilter;
    return matchesLocation && matchesCustomer && matchesUser;
  });

  const totalDrafts = mockDrafts.length;
  const activeDrafts = mockDrafts.filter((d) => d.status === 'Active').length;
  const convertedDrafts = mockDrafts.filter((d) => d.status === 'Converted').length;
  const totalItems = mockDrafts.reduce((sum, draft) => sum + draft.totalItems, 0);

  const handleConvertToSale = (draftId: string) => {
    const draft = mockDrafts.find(d => d.id === draftId);
    alert(`Converting draft ${draft?.referenceNo} to sale...`);
  };

  const handleEditDraft = (draftId: string) => {
    const draft = mockDrafts.find(d => d.id === draftId);
    alert(`Editing draft ${draft?.referenceNo}...`);
  };

  const handleDeleteDraft = (draftId: string) => {
    const draft = mockDrafts.find(d => d.id === draftId);
    if (confirm(`Are you sure you want to delete draft ${draft?.referenceNo}?`)) {
      alert(`Draft ${draft?.referenceNo} deleted successfully!`);
    }
  };

  // Setup table actions
  const { rowActions } = useTableActions<Draft>({
    customActions: [
      {
        label: "View",
        icon: Eye,
        onClick: (draft: Draft) => {
          alert(`View draft: ${draft.referenceNo}`);
        },
        variant: "outline",
      },
      {
        label: "Edit",
        icon: Edit,
        onClick: (draft: Draft) => {
          handleEditDraft(draft.id);
        },
        variant: "outline",
        disabled: (draft: Draft) => draft.status !== 'Active',
      },
      {
        label: "Convert to Sale",
        icon: CheckCircle,
        onClick: (draft: Draft) => {
          handleConvertToSale(draft.id);
        },
        variant: "default",
        disabled: (draft: Draft) => draft.status !== 'Active',
      },
      {
        label: "Delete",
        icon: Trash2,
        onClick: (draft: Draft) => {
          handleDeleteDraft(draft.id);
        },
        className: "text-destructive hover:text-destructive",
      },
    ],
  });

  // Define table columns
  const columns: TableColumn<Draft>[] = [
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
        <span className="font-medium">{String(value)}</span>
      ),
    },
    {
      accessorKey: "customerName",
      header: "Customer name",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <span>{String(value || 'Walk-In Customer')}</span>
      ),
    },
    {
      accessorKey: "contactNumber",
      header: "Contact Number",
      sortable: true,
      cell: (value) => (
        <span>{String(value || '-')}</span>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      sortable: true,
      filterable: true,
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
          {String(value)}
        </div>
      ),
    },
    {
      accessorKey: "addedBy",
      header: "Added By",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className="flex items-center gap-1">
          <User className="h-4 w-4 text-gray-400" />
          {String(value)}
        </div>
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
                <p className="text-muted-foreground text-sm font-medium">Total Drafts</p>
                <p className="text-2xl font-bold">{totalDrafts}</p>
              </div>
              <FileText className="ml-auto h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Active</p>
                <p className="text-2xl font-bold text-green-600">{activeDrafts}</p>
              </div>
              <Clock className="ml-auto h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Converted</p>
                <p className="text-2xl font-bold text-blue-600">{convertedDrafts}</p>
              </div>
              <CheckCircle className="ml-auto h-8 w-8 text-blue-600" />
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
              <Package className="ml-auto h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Drafts</CardTitle>
          <CardDescription>Manage and convert sales drafts to actual sales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Business Location:</label>
                <Select value={businessLocation} onValueChange={setBusinessLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="IBIYEOMIE MEAT HOUSE (BL0001)">IBIYEOMIE MEAT HOUSE (BL0001)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Customer:</label>
                <Select value={customerFilter} onValueChange={setCustomerFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="John Smith">John Smith</SelectItem>
                    <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                    <SelectItem value="Mike Wilson">Mike Wilson</SelectItem>
                    <SelectItem value="Walk-In Customer">Walk-In Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range:</label>
                <input
                  type="text"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="01/01/2025 - 12/31/2025"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">User:</label>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="Jane Doe">Jane Doe</SelectItem>
                    <SelectItem value="John Smith">John Smith</SelectItem>
                    <SelectItem value="Alice Brown">Alice Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Show</span>
                <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="200">200</SelectItem>
                    <SelectItem value="500">500</SelectItem>
                    <SelectItem value="1000">1000</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm font-medium">entries</span>
              </div>
            </div>
          </div>

          <DynamicTable
            data={filteredDrafts}
            columns={columns}
            pageSize={pageSize}
            searchPlaceholder="Search ..."
            emptyMessage="No data available in table"
          />
        </CardContent>
      </Card>
    </div>
  );
}
