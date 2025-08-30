import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import { Edit, Plus, Trash2, Eye, Copy, Settings } from 'lucide-react';
import { useState } from 'react';

interface Category extends Record<string, unknown> {
  id: number;
  category: string;
  categoryCode: string;
  description: string;
}

export default function CategoriesTab() {
  const [categories] = useState<Category[]>([
    { 
      id: 1, 
      category: 'Electronics', 
      categoryCode: 'ELEC001', 
      description: 'Electronic devices and gadgets including smartphones, laptops, and accessories'
    },
    { 
      id: 2, 
      category: 'Clothing & Apparel', 
      categoryCode: 'CLTH002', 
      description: 'Fashion items including men\'s, women\'s, and children\'s clothing'
    },
    { 
      id: 3, 
      category: 'Home & Garden', 
      categoryCode: 'HOME003', 
      description: 'Home improvement items, furniture, and garden supplies'
    },
    { 
      id: 4, 
      category: 'Sports & Outdoor', 
      categoryCode: 'SPRT004', 
      description: 'Sports equipment, outdoor gear, and fitness accessories'
    },
    { 
      id: 5, 
      category: 'Books & Media', 
      categoryCode: 'BOOK005', 
      description: 'Books, magazines, DVDs, and digital media content'
    },
    { 
      id: 6, 
      category: 'Health & Beauty', 
      categoryCode: 'HLTH006', 
      description: 'Personal care products, cosmetics, and health supplements'
    },
    { 
      id: 7, 
      category: 'Automotive', 
      categoryCode: 'AUTO007', 
      description: 'Car parts, accessories, and automotive maintenance products'
    },
    { 
      id: 8, 
      category: 'Toys & Games', 
      categoryCode: 'TOYS008', 
      description: 'Children\'s toys, board games, and educational materials'
    },
    { 
      id: 9, 
      category: 'Food & Beverages', 
      categoryCode: 'FOOD009', 
      description: 'Grocery items, snacks, beverages, and specialty food products'
    },
    { 
      id: 10, 
      category: 'Office Supplies', 
      categoryCode: 'OFFC010', 
      description: 'Stationery, office equipment, and business supplies'
    }
  ]);

  // Setup table actions
  const { rowActions } = useTableActions<Category>({
    customActions: [
      {
        label: "View Details",
        icon: Eye,
        onClick: (category: Category) => {
          alert(`Viewing details for: ${category.category}`);
        },
        variant: "outline",
      },
      {
        label: "Edit",
        icon: Edit,
        onClick: (category: Category) => {
          alert(`Edit category: ${category.category}`);
        },
        variant: "outline",
      },
      {
        label: "Duplicate",
        icon: Copy,
        onClick: (category: Category) => {
          alert(`Duplicating category: ${category.category}`);
        },
        variant: "outline",
      },
      {
        label: "Manage Products",
        icon: Settings,
        onClick: (category: Category) => {
          alert(`Manage products for: ${category.category}`);
        },
        variant: "outline",
      },
      {
        label: "Delete",
        icon: Trash2,
        onClick: (category: Category) => {
          if (confirm(`Are you sure you want to delete "${category.category}" category?`)) {
            alert(`Deleting category: ${category.category}`);
          }
        },
        className: "text-destructive hover:text-destructive",
      },
    ],
  });

  // Define table columns
  const columns: TableColumn<Category>[] = [
    {
      accessorKey: "category",
      header: "Category",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <span className="font-medium ">{String(value)}</span>
      ),
    },
    {
      accessorKey: "categoryCode",
      header: "Category Code",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <span className="font-mono text-sm bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">{String(value)}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className=" max-w-xs truncate" title={String(value)}>
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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Manage your categories</CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DynamicTable
            data={categories}
            columns={columns}
            pageSize={100}
            searchPlaceholder="Search ..."
            enablePagination={true}
            enableSorting={true}
            enableFiltering={true}
            enableRowSelection={true}
            enableExport={true}
            enableColumnVisibility={true}
            emptyMessage="No data available in table"
          />
        </CardContent>
      </Card>
    </div>
  );
}
