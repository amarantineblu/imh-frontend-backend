import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTableActions } from '@/hooks/use-table-actions';
import { Calendar, Edit, Eye, Percent, Plus, Tag, Trash2, Users } from 'lucide-react';
import { useState } from 'react';

interface Discount extends Record<string, unknown> {
  id: string;
  name: string;
  startsAt: string;
  endsAt: string;
  discountAmount: string;
  priority: number;
  brand: string;
  category: string;
  products: string;
  location: string;
}

// const mockDiscounts: Discount[] = [
//   {
//     id: '1',
//     name: 'Summer Sale Discount',
//     startsAt: '07/01/2025',
//     endsAt: '07/31/2025',
//     discountAmount: '20%',
//     priority: 1,
//     brand: 'Premium Meat',
//     category: 'Fresh Meat',
//     products: 'Beef, Chicken',
//     location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
//   },
//   {
//     id: '2',
//     name: 'VIP Customer Discount',
//     startsAt: '01/01/2025',
//     endsAt: '12/31/2025',
//     discountAmount: '15%',
//     priority: 2,
//     brand: 'All Brands',
//     category: 'All Categories',
//     products: 'All Products',
//     location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
//   },
//   {
//     id: '3',
//     name: 'New Customer Welcome',
//     startsAt: '01/01/2025',
//     endsAt: '12/31/2025',
//     discountAmount: '₦1,000',
//     priority: 3,
//     brand: 'House Brand',
//     category: 'Frozen Items',
//     products: 'Frozen Fish, Ice Cream',
//     location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
//   },
//   {
//     id: '4',
//     name: 'Bulk Purchase Discount',
//     startsAt: '06/01/2025',
//     endsAt: '08/31/2025',
//     discountAmount: '25%',
//     priority: 1,
//     brand: 'Premium Meat',
//     category: 'Wholesale',
//     products: 'Bulk Orders',
//     location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
//   },
//   {
//     id: '5',
//     name: 'Weekend Special',
//     startsAt: '07/05/2025',
//     endsAt: '07/30/2025',
//     discountAmount: '10%',
//     priority: 4,
//     brand: 'Local Supplier',
//     category: 'Fresh Produce',
//     products: 'Vegetables, Fruits',
//     location: 'IBIYEOMIE MEAT HOUSE (BL0001)',
//   },
// ];
interface Props {
  discounts: Discount[];
}

export default function DiscountsTab(props: Props) {
  const mockDiscounts = props.discounts || [];
  const [discounts, setDiscounts] = useState<Discount[]>(mockDiscounts);
  const [pageSize, setPageSize] = useState(100);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDiscount, setNewDiscount] = useState<Partial<Discount>>({});

  const handleViewDiscount = (discountId: string) => {
    alert(`View discount: ${discountId}...`);
  };

  const handleEditDiscount = (discountId: string) => {
    alert(`Edit discount: ${discountId}...`);
  };

  const handleDeleteDiscount = (discountId: string) => {
    if (confirm('Are you sure you want to delete this discount?')) {
      alert(`Delete discount: ${discountId}...`);
    }
  };

  // Setup table actions
  const { rowActions } = useTableActions<Discount>({
    customActions: [
      {
        label: "View",
        icon: Eye,
        onClick: (discount: Discount) => {
          handleViewDiscount(discount.id as string);
        },
        variant: "outline",
      },
      {
        label: "Edit",
        icon: Edit,
        onClick: (discount: Discount) => {
          handleEditDiscount(discount.id as string);
        },
        variant: "outline",
      },
      {
        label: "Delete",
        icon: Trash2,
        onClick: (discount: Discount) => {
          handleDeleteDiscount(discount.id as string);
        },
        className: "text-destructive hover:text-destructive",
      },
    ],
  });

  // Define table columns
  const columns: TableColumn<Discount>[] = [
    {
      accessorKey: "name",
      header: "Name",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className="font-medium">{String(value)}</div>
      ),
    },
    {
      accessorKey: "startsAt",
      header: "Starts At",
      sortable: true,
      cell: (value) => (
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4 text-gray-400" />
          {String(value)}
        </div>
      ),
    },
    {
      accessorKey: "endsAt",
      header: "Ends At",
      sortable: true,
      cell: (value) => (
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4 text-gray-400" />
          {String(value)}
        </div>
      ),
    },
    {
      accessorKey: "discountAmount",
      header: "Discount Amount",
      sortable: true,
      cell: (value) => (
        <div className="flex items-center gap-1">
          <Percent className="h-4 w-4 text-blue-600" />
          <span className="font-medium">{String(value)}</span>
        </div>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priority",
      sortable: true,
      cell: (value) => (
        <div className="font-medium">{String(value)}</div>
      ),
    },
    {
      accessorKey: "brand",
      header: "Brand",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <span className="text-sm">{String(value)}</span>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-gray-400" />
          <span>{String(value)}</span>
        </div>
      ),
    },
    {
      accessorKey: "products",
      header: "Products",
      sortable: true,
      cell: (value) => (
        <span className="text-sm">{String(value)}</span>
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
      type: "actions",
      header: "Action",
      buttons: rowActions,
    },
  ];

  const stats = {
    total: discounts.length,
    active: discounts.filter((d) => new Date(d.endsAt as string) > new Date()).length,
    expired: discounts.filter((d) => new Date(d.endsAt as string) <= new Date()).length,
    categories: new Set(discounts.map(d => d.category)).size,
  };

  const handleAddDiscount = () => {
    if (newDiscount.name && newDiscount.startsAt && newDiscount.endsAt && newDiscount.discountAmount) {
      const discount: Discount = {
        id: (discounts.length + 1).toString(),
        name: newDiscount.name as string,
        startsAt: newDiscount.startsAt as string,
        endsAt: newDiscount.endsAt as string,
        discountAmount: newDiscount.discountAmount as string,
        priority: newDiscount.priority || 1,
        brand: newDiscount.brand || 'All Brands',
        category: newDiscount.category || 'All Categories',
        products: newDiscount.products || 'All Products',
        location: newDiscount.location || 'IBIYEOMIE MEAT HOUSE (BL0001)',
      };

      setDiscounts([...discounts, discount]);
      setNewDiscount({});
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Discounts</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Tag className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Active Discounts</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <Tag className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Expired</p>
                <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
              </div>
              <Calendar className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Categories</p>
                <p className="text-2xl font-bold">{stats.categories}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Discounts Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <CardTitle>Discounts Management</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Discount
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Discount</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Discount Name</Label>
                      <Input
                        id="name"
                        value={newDiscount.name || ''}
                        onChange={(e) => setNewDiscount({ ...newDiscount, name: e.target.value })}
                        placeholder="Enter discount name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discountAmount">Discount Amount</Label>
                      <Input
                        id="discountAmount"
                        value={newDiscount.discountAmount || ''}
                        onChange={(e) => setNewDiscount({ ...newDiscount, discountAmount: e.target.value })}
                        placeholder="e.g., 20% or ₦1,000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startsAt">Starts At</Label>
                      <Input
                        id="startsAt"
                        type="date"
                        value={newDiscount.startsAt || ''}
                        onChange={(e) => setNewDiscount({ ...newDiscount, startsAt: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endsAt">Ends At</Label>
                      <Input
                        id="endsAt"
                        type="date"
                        value={newDiscount.endsAt || ''}
                        onChange={(e) => setNewDiscount({ ...newDiscount, endsAt: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Input
                        id="priority"
                        type="number"
                        value={newDiscount.priority || ''}
                        onChange={(e) => setNewDiscount({ ...newDiscount, priority: Number(e.target.value) })}
                        placeholder="Priority level"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        id="brand"
                        value={newDiscount.brand || ''}
                        onChange={(e) => setNewDiscount({ ...newDiscount, brand: e.target.value })}
                        placeholder="Brand name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={newDiscount.category || ''}
                        onChange={(e) => setNewDiscount({ ...newDiscount, category: e.target.value })}
                        placeholder="Product category"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="products">Products</Label>
                    <Input
                      id="products"
                      value={newDiscount.products || ''}
                      onChange={(e) => setNewDiscount({ ...newDiscount, products: e.target.value })}
                      placeholder="Applicable products"
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddDiscount}>Add Discount</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Show entries and Search */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="text-lg font-medium">All your discounts</h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Show</span>
              <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="1000">1000</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm">entries</span>
            </div>
          </div>

          {/* Discounts Table */}
          <DynamicTable
            data={discounts}
            columns={columns}
            pageSize={pageSize}
            searchPlaceholder="Search discounts..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
