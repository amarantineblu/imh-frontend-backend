import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import { Edit, Plus, Trash2, Eye, Copy, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Category extends Record<string, unknown> {
  id: number;
  category: string;
  categoryCode: string;
  description: string;
}

interface Props {
  categories: Category[],
}

export default function CategoriesTab() {
  const [categories, setCategories] = useState<Category[]>([]);
      const [loading, setLoading] = useState(true);
      const data_key = "categories";
      useEffect(() => {
         fetch(`/products/apis/${data_key}`)
           .then(res => res.json())
           .then(data => {
              const transformed = data.map((b: any) => ({
                id: b.id,
                category: b.name, // 🔁 Map name → brands
                categoryCode: b.short_code,
                description: b.description
              }));
             setCategories(transformed);
             setLoading(false);
            //  console.log('this is the data', data);
           })
           .catch(() => setLoading(false));
       }, []);

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
