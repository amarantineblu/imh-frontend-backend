import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useTableActions } from '@/hooks/use-table-actions';
import { DollarSign, Edit, Eye, FolderTree, Plus, Tag, Trash2, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { usePage } from '@inertiajs/react';


interface ExpenseCategory extends Record<string, unknown> {
  id: string;
  name: string;
  code: string;
  description: string;
  color: string;
  isActive: boolean;
  expenseCount: number;
  totalAmount: number;
  createdAt: Date;
}



interface Props {
  categories: ExpenseCategory[],
}

const colorOptions = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#EC4899', '#84CC16', '#F97316', '#6366F1'];

export default function ExpenseCategoriesTab(props:Props) {
   const { categories } = props;  // <-- add this line

    useEffect(() => {
      if (categories) {
        console.log('Categories:', categories);
      } else {
        console.warn('Categories data is missing!');
      }
    }, [categories]);
  const [changedCategories, setChangedCategories] = useState(categories);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ExpenseCategory | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: colorOptions[0],
    isActive: true,
  });
  const [pageSize, setPageSize] = useState(100);
  const [search, setSearch] = useState('');

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: categories.length,
    active: categories.filter((cat) => cat.isActive).length,
    totalExpenses: categories.reduce((sum, cat) => sum + cat.expenseCount, 0),
    totalAmount: categories.reduce((sum, cat) => sum + cat.totalAmount, 0),
  };

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    const category: ExpenseCategory = {
      id: (categories.length + 1).toString(),
      name: newCategory.name,
      description: newCategory.description,
      color: newCategory.color,
      isActive: newCategory.isActive,
      expenseCount: 0,
      totalAmount: 0,
      createdAt: new Date(),
      code: newCategory.name.split(' ').slice(0, 3).join('-').toUpperCase(),
    };

    setChangedCategories([...categories, category]);
    setNewCategory({
      name: '',
      description: '',
      color: colorOptions[0],
      isActive: true,
    });
    setIsAddDialogOpen(false);
    toast.success('Category created successfully!');
  };

  const handleEditCategory = (category: ExpenseCategory) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      color: category.color,
      isActive: category.isActive,
    });
    setIsAddDialogOpen(true);
  };

  const handleUpdateCategory = () => {
    if (!newCategory.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    if (editingCategory) {
      setChangedCategories(categories.map((cat) => (cat.id === editingCategory.id ? { ...cat, ...newCategory } : cat)));
      setEditingCategory(null);
      setNewCategory({
        name: '',
        description: '',
        color: colorOptions[0],
        isActive: true,
      });
      setIsAddDialogOpen(false);
      toast.success('Category updated successfully!');
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (category && category.expenseCount > 0) {
      toast.error('Cannot delete category with existing expenses');
      return;
    }

    setChangedCategories(categories.filter((cat) => cat.id !== categoryId));
    toast.success('Category deleted successfully!');
  };

  const toggleCategoryStatus = (categoryId: string) => {
    setChangedCategories(categories.map((cat) => (cat.id === categoryId ? { ...cat, isActive: !cat.isActive } : cat)));
    toast.success('Category status updated!');
  };

  const resetForm = () => {
    setNewCategory({
      name: '',
      description: '',
      color: colorOptions[0],
      isActive: true,
    });
    setEditingCategory(null);
  };

  // Setup table actions
  const { rowActions } = useTableActions<ExpenseCategory>({
    customActions: [
      {
        label: "View Details",
        icon: Eye,
        onClick: (category: ExpenseCategory) => {
          // TODO: Implement view category details functionality
          alert(`View details: ${category.name}`);
        },
        variant: "ghost",
      },
      {
        label: "Edit",
        icon: Edit,
        onClick: (category: ExpenseCategory) => {
          handleEditCategory(category);
        },
        variant: "ghost",
      },
      {
        label: "Delete",
        icon: Trash2,
        onClick: (category: ExpenseCategory) => {
          handleDeleteCategory(category.id);
        },
        disabled: (category: ExpenseCategory) => category.expenseCount > 0,
        className: "text-destructive hover:text-destructive",
      },
    ],
  });

  // Define table columns
  const columns: TableColumn<ExpenseCategory>[] = [
    {
      accessorKey: "name",
      header: "Category name",
      sortable: true,
      filterable: true,
      cell: (value, category) => (
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: category.color }} />
          <div className="font-medium">{String(value)}</div>
        </div>
      ),
    },
    {
      accessorKey: "code",
      header: "Category code",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <span className="text-sm font-mono">{String(value)}</span>
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Categories</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FolderTree className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Active Categories</p>
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
                <p className="text-muted-foreground text-sm font-medium">Total Expenses</p>
                <p className="text-2xl font-bold">{stats.totalExpenses}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Amount</p>
                <p className="text-2xl font-bold">${stats.totalAmount.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <CardTitle>Expense Categories</CardTitle>
            <Dialog
              open={isAddDialogOpen}
              onOpenChange={(open) => {
                setIsAddDialogOpen(open);
                if (!open) resetForm();
              }}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Category Name</Label>
                    <Input
                      id="name"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      placeholder="Enter category name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                      placeholder="Enter category description"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Color</Label>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={`h-8 w-8 rounded-full border-2 ${newCategory.color === color ? 'border-gray-900' : 'border-gray-300'}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setNewCategory({ ...newCategory, color })}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={newCategory.isActive}
                      onCheckedChange={(checked) => setNewCategory({ ...newCategory, isActive: checked })}
                    />
                    <Label htmlFor="active">Active</Label>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={editingCategory ? handleUpdateCategory : handleAddCategory}>
                      {editingCategory ? 'Update' : 'Create'} Category
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
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
          {/* Categories Table */}
          <DynamicTable
            data={filteredCategories}
            columns={columns}
            pageSize={pageSize}
            searchPlaceholder="Search categories..."
            noDataText="No data available in table"
          />
        </CardContent>
      </Card>

      {/* Categories Grid View */}
      <Card>
        <CardHeader>
          <CardTitle>Categories Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                    <Badge
                      variant={category.isActive ? 'default' : 'secondary'}
                      className={category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                    >
                      {category.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">{category.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Expenses</p>
                      <p className="text-xl font-bold">{category.expenseCount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Amount</p>
                      <p className="text-xl font-bold">${category.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
