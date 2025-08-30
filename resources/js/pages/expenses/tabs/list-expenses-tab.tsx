import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTableActions } from '@/hooks/use-table-actions';
import { format } from 'date-fns';
import { Calendar, DollarSign, Download, Edit, Eye, Receipt, Trash2, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface Expense extends Record<string, unknown> {
  id: string;
  reference: string;
  date: Date;
  recurringDetails: string;
  expenseCategory: string;
  subCategory: string;
  location: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  tax: number;
  totalAmount: number;
  paymentDue: Date | null;
  expenseFor: string;
  contact: string;
  expenseNote: string;
  addedBy: string;
}

const mockExpenses: Expense[] = [
  {
    id: '1',
    reference: 'EXP-2025-001',
    date: new Date(2025, 0, 15),
    recurringDetails: 'Monthly',
    expenseCategory: 'Office Supplies',
    subCategory: 'Stationery',
    location: 'Main Office',
    paymentStatus: 'paid',
    tax: 125.0,
    totalAmount: 1375.0,
    paymentDue: null,
    expenseFor: 'Office Operations',
    contact: 'OfficeMax Inc.',
    expenseNote: 'Monthly office supplies purchase including paper, pens, and folders',
    addedBy: 'John Smith',
  },
  {
    id: '2',
    reference: 'EXP-2025-002',
    date: new Date(2025, 0, 12),
    recurringDetails: 'One-time',
    expenseCategory: 'Equipment',
    subCategory: 'IT Hardware',
    location: 'Tech Department',
    paymentStatus: 'paid',
    tax: 350.0,
    totalAmount: 3850.0,
    paymentDue: null,
    expenseFor: 'Development Team',
    contact: 'TechWorld Solutions',
    expenseNote: 'New laptop for development team - Dell XPS 15',
    addedBy: 'Sarah Johnson',
  },
  {
    id: '3',
    reference: 'EXP-2025-003',
    date: new Date(2025, 0, 10),
    recurringDetails: 'One-time',
    expenseCategory: 'Travel',
    subCategory: 'Accommodation',
    location: 'New York',
    paymentStatus: 'pending',
    tax: 85.0,
    totalAmount: 935.0,
    paymentDue: new Date(2025, 0, 25),
    expenseFor: 'Business Meeting',
    contact: 'Metro Hotel',
    expenseNote: 'Business trip accommodation for client meeting',
    addedBy: 'Mike Wilson',
  },
  {
    id: '4',
    reference: 'EXP-2025-004',
    date: new Date(2025, 0, 8),
    recurringDetails: 'Monthly',
    expenseCategory: 'Utilities',
    subCategory: 'Electricity',
    location: 'Main Office',
    paymentStatus: 'paid',
    tax: 45.0,
    totalAmount: 495.0,
    paymentDue: null,
    expenseFor: 'Office Operations',
    contact: 'Electric Company',
    expenseNote: 'Monthly electricity bill for main office',
    addedBy: 'Admin User',
  },
  {
    id: '5',
    reference: 'EXP-2025-005',
    date: new Date(2025, 0, 5),
    recurringDetails: 'Weekly',
    expenseCategory: 'Marketing',
    subCategory: 'Digital Advertising',
    location: 'Online',
    paymentStatus: 'overdue',
    tax: 20.0,
    totalAmount: 220.0,
    paymentDue: new Date(2025, 0, 20),
    expenseFor: 'Product Promotion',
    contact: 'Social Media Ads',
    expenseNote: 'Facebook advertising campaign for new product launch',
    addedBy: 'Marketing Team',
  },
];

export default function ListExpensesTab() {
  const [expenses] = useState<Expense[]>(mockExpenses);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(100);
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(2025, 0, 1),
    end: new Date(2025, 11, 31),
  });
  // New filters
  const [expenseForFilter, setExpenseForFilter] = useState('all');
  const [contactFilter, setContactFilter] = useState('all');
  const [subCategoryFilter, setSubCategoryFilter] = useState('all');

  const handleViewExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsViewDialogOpen(true);
  };

  const handleEditExpense = (expenseId: string) => {
    alert(`Edit expense: ${expenseId}...`);
  };

  const handleDeleteExpense = (expenseId: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      alert(`Delete expense: ${expenseId}...`);
    }
  };

  // Setup table actions
  const { rowActions } = useTableActions<Expense>({
    customActions: [
      {
        label: "View",
        icon: Eye,
        onClick: (expense: Expense) => {
          handleViewExpense(expense);
        },
        variant: "outline",
      },
      {
        label: "Edit",
        icon: Edit,
        onClick: (expense: Expense) => {
          handleEditExpense(expense.id);
        },
        variant: "outline",
      },
      {
        label: "Delete",
        icon: Trash2,
        onClick: (expense: Expense) => {
          handleDeleteExpense(expense.id);
        },
        className: "text-destructive hover:text-destructive",
      },
    ],
  });

  const filteredExpenses = expenses.filter((expense) => {
    const matchesPaymentStatus = true; // paymentStatusFilter === 'all' || expense.paymentStatus === paymentStatusFilter;
    const matchesCategory = categoryFilter === 'all' || expense.expenseCategory === categoryFilter;
    const matchesLocation = locationFilter === 'all' || expense.location === locationFilter;
    const matchesExpenseFor = expenseForFilter === 'all' || expense.expenseFor === expenseForFilter;
    const matchesContact = contactFilter === 'all' || expense.contact === contactFilter;
    const matchesSubCategory = subCategoryFilter === 'all' || expense.subCategory === subCategoryFilter;
    const matchesDateRange =
      (!dateRange.start || expense.date >= dateRange.start) &&
      (!dateRange.end || expense.date <= dateRange.end);
    const matchesSearch =
      search === '' ||
      expense.reference.toLowerCase().includes(search.toLowerCase()) ||
      expense.contact.toLowerCase().includes(search.toLowerCase()) ||
      expense.expenseNote.toLowerCase().includes(search.toLowerCase());
    return (
      matchesPaymentStatus &&
      matchesCategory &&
      matchesLocation &&
      matchesExpenseFor &&
      matchesContact &&
      matchesSubCategory &&
      matchesDateRange &&
      matchesSearch
    );
  });

  // Define table columns
  const columns: TableColumn<Expense>[] = [
    {
      type: "actions",
      header: "Action",
      buttons: rowActions,
    },
    {
      accessorKey: "date",
      header: "Date",
      sortable: true,
      cell: (value, expense) => (
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4 text-gray-400" />
          {format(expense.date, 'MMM dd, yyyy')}
        </div>
      ),
    },
    {
      accessorKey: "reference",
      header: "Reference No",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className="font-medium">{String(value)}</div>
      ),
    },
    {
      accessorKey: "recurringDetails",
      header: "Recurring details",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <Badge variant="outline">{String(value)}</Badge>
      ),
    },
    {
      accessorKey: "expenseCategory",
      header: "Expense Category",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <Badge variant="secondary">{String(value)}</Badge>
      ),
    },
    {
      accessorKey: "subCategory",
      header: "Sub category",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <span className="text-sm text-muted-foreground">{String(value)}</span>
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
      accessorKey: "paymentStatus",
      header: "Payment Status",
      sortable: true,
      filterable: true,
      cell: (value, expense) => (
        <Badge className={getPaymentStatusColor(expense.paymentStatus)}>
          {String(value)}
        </Badge>
      ),
    },
    {
      accessorKey: "tax",
      header: "Tax",
      sortable: true,
      cell: (value) => (
        <div className="text-sm font-medium">${Number(value).toFixed(2)}</div>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: "Total amount",
      sortable: true,
      cell: (value) => (
        <div className="text-lg font-bold">${Number(value).toFixed(2)}</div>
      ),
    },
    {
      accessorKey: "paymentDue",
      header: "Payment due",
      sortable: true,
      cell: (value, expense) => (
        <div className="text-sm">
          {expense.paymentDue ? (
            <span className={expense.paymentDue < new Date() ? 'text-red-600 font-medium' : 'text-gray-600'}>
              {format(expense.paymentDue, 'MMM dd, yyyy')}
            </span>
          ) : (
            <span className="text-gray-400">N/A</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "expenseFor",
      header: "Expense for",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <span className="text-sm">{String(value)}</span>
      ),
    },
    {
      accessorKey: "contact",
      header: "Contact",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <span className="text-sm font-medium">{String(value)}</span>
      ),
    },
    {
      accessorKey: "expenseNote",
      header: "Expense note",
      filterable: true,
      cell: (value) => (
        <div className="max-w-[200px] truncate text-sm text-muted-foreground" title={String(value)}>
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
        <span className="text-sm">{String(value)}</span>
      ),
    },
  ];

  const stats = {
    total: expenses.reduce((sum, exp) => sum + exp.totalAmount, 0),
    paid: expenses.filter((exp) => exp.paymentStatus === 'paid').reduce((sum, exp) => sum + exp.totalAmount, 0),
    pending: expenses.filter((exp) => exp.paymentStatus === 'pending').reduce((sum, exp) => sum + exp.totalAmount, 0),
    overdue: expenses.filter((exp) => exp.paymentStatus === 'overdue').reduce((sum, exp) => sum + exp.totalAmount, 0),
    count: expenses.length,
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = [...new Set(expenses.map((exp) => exp.expenseCategory))];
  const locations = [...new Set(expenses.map((exp) => exp.location))];
  const expenseFors = [...new Set(expenses.map((exp) => exp.expenseFor))];
  const contacts = [...new Set(expenses.map((exp) => exp.contact))];
  const subCategories = [...new Set(expenses.map((exp) => exp.subCategory))];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Expenses</p>
                <p className="text-2xl font-bold">${stats.total.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Paid</p>
                <p className="text-2xl font-bold text-green-600">${stats.paid.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">${stats.pending.toFixed(2)}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Overdue</p>
                <p className="text-2xl font-bold text-red-600">${stats.overdue.toFixed(2)}</p>
              </div>
              <Receipt className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expenses List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <CardTitle>Expenses List</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row flex-wrap">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Business Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={expenseForFilter} onValueChange={setExpenseForFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Expense for" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {expenseFors.map((ef) => (
                  <SelectItem key={ef} value={ef}>{ef}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={contactFilter} onValueChange={setContactFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Contact" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {contacts.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Expense Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={subCategoryFilter} onValueChange={setSubCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sub category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {subCategories.map((sc) => (
                  <SelectItem key={sc} value={sc}>{sc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="w-[260px] flex gap-2 items-center">
              <input
                type="date"
                className="border rounded px-2 py-1"
                value={dateRange.start.toISOString().slice(0, 10)}
                min="2025-01-01"
                max="2025-12-31"
                onChange={e => setDateRange(r => ({ ...r, start: new Date(e.target.value) }))}
              />
              <span>-</span>
              <input
                type="date"
                className="border rounded px-2 py-1"
                value={dateRange.end.toISOString().slice(0, 10)}
                min="2025-01-01"
                max="2025-12-31"
                onChange={e => setDateRange(r => ({ ...r, end: new Date(e.target.value) }))}
              />
            </div>
          </div>

          {/* Show entries and Search */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <select
                className="border rounded px-2 py-1"
                value={pageSize}
                onChange={e => setPageSize(Number(e.target.value))}
              >
                {[100, 200, 500, 1000].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <span>entries</span>
            </div>
            <div>
              <input
                type="text"
                className="border rounded px-2 py-1"
                placeholder="Search ..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Expenses Table */}
          <DynamicTable
            data={filteredExpenses}
            columns={columns}
            pageSize={pageSize}
            searchPlaceholder="Search by reference, vendor, or description..."
            noDataText="No data available in table"
          />
          {/* Totals */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="font-bold">Total:</div>
            <div className="flex gap-4">
              <span className="font-bold">₦ {filteredExpenses.reduce((sum, exp) => sum + exp.totalAmount, 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              <span className="font-bold">₦ {filteredExpenses.reduce((sum, exp) => sum + exp.tax, 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Expense Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Expense Details</DialogTitle>
          </DialogHeader>
          {selectedExpense && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-muted-foreground text-sm font-medium">Reference No</h4>
                  <p className="text-lg font-medium">{selectedExpense.reference}</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground text-sm font-medium">Date</h4>
                  <p className="text-lg">{format(selectedExpense.date, 'MMMM dd, yyyy')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-muted-foreground text-sm font-medium">Total Amount</h4>
                  <p className="text-2xl font-bold text-green-600">${selectedExpense.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground text-sm font-medium">Tax</h4>
                  <p className="text-lg">${selectedExpense.tax.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-muted-foreground text-sm font-medium">Payment Status</h4>
                  <Badge className={getPaymentStatusColor(selectedExpense.paymentStatus)}>{selectedExpense.paymentStatus}</Badge>
                </div>
                <div>
                  <h4 className="text-muted-foreground text-sm font-medium">Payment Due</h4>
                  <p className="text-lg">
                    {selectedExpense.paymentDue ? format(selectedExpense.paymentDue, 'MMMM dd, yyyy') : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-muted-foreground text-sm font-medium">Expense Category</h4>
                  <p className="text-lg">{selectedExpense.expenseCategory}</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground text-sm font-medium">Sub Category</h4>
                  <p className="text-lg">{selectedExpense.subCategory}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-muted-foreground text-sm font-medium">Location</h4>
                  <p className="text-lg">{selectedExpense.location}</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground text-sm font-medium">Recurring Details</h4>
                  <p className="text-lg">{selectedExpense.recurringDetails}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-muted-foreground text-sm font-medium">Contact</h4>
                  <p className="text-lg">{selectedExpense.contact}</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground text-sm font-medium">Added By</h4>
                  <p className="text-lg">{selectedExpense.addedBy}</p>
                </div>
              </div>

              <div>
                <h4 className="text-muted-foreground text-sm font-medium">Expense For</h4>
                <p className="text-lg">{selectedExpense.expenseFor}</p>
              </div>

              <div>
                <h4 className="text-muted-foreground text-sm font-medium">Expense Note</h4>
                <p className="text-sm">{selectedExpense.expenseNote}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
