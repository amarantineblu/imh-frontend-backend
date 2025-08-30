import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Brand extends Record<string, unknown> {
  id: number;
  brands: string;
  note: string;
}

export default function BrandsTab() {
  const [brands] = useState<Brand[]>([
    { 
      id: 1, 
      brands: 'COW MEAT', 
      note: 'LAP'
    },
    { 
      id: 2, 
      brands: 'APPLE', 
      note: 'Premium electronics and devices brand'
    },
    { 
      id: 3, 
      brands: 'SAMSUNG', 
      note: 'South Korean technology conglomerate'
    },
    { 
      id: 4, 
      brands: 'NIKE', 
      note: 'American athletic footwear and apparel'
    },
    { 
      id: 5, 
      brands: 'ADIDAS', 
      note: 'German multinational sports corporation'
    },
    { 
      id: 6, 
      brands: 'SONY', 
      note: 'Japanese electronics and entertainment'
    },
    { 
      id: 7, 
      brands: 'COCA-COLA', 
      note: 'Global beverage company'
    },
    { 
      id: 8, 
      brands: 'TOYOTA', 
      note: 'Japanese automotive manufacturer'
    },
    { 
      id: 9, 
      brands: 'MICROSOFT', 
      note: 'American technology corporation'
    },
    { 
      id: 10, 
      brands: 'GOOGLE', 
      note: 'American search engine and technology'
    },
    { 
      id: 11, 
      brands: 'AMAZON', 
      note: 'American e-commerce and cloud computing'
    },
    { 
      id: 12, 
      brands: 'FACEBOOK', 
      note: 'Social media and technology company'
    }
  ]);

  // Setup table actions
  const { rowActions } = useTableActions<Brand>({
    customActions: [
      {
        label: "Edit",
        icon: Edit,
        onClick: (brand: Brand) => {
          alert(`Edit brand: ${brand.brands}`);
        },
        variant: "outline",
      },
      {
        label: "Delete",
        icon: Trash2,
        onClick: (brand: Brand) => {
          if (confirm(`Are you sure you want to delete "${brand.brands}" brand?`)) {
            alert(`Deleting brand: ${brand.brands}`);
          }
        },
        className: "text-destructive hover:text-destructive",
      },
    ],
  });

  // Define table columns
  const columns: TableColumn<Brand>[] = [
    {
      accessorKey: "brands",
      header: "Brands",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <span className="font-medium">{String(value)}</span>
      ),
    },
    {
      accessorKey: "note",
      header: "Note",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className="max-w-xs truncate" title={String(value)}>
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
              <CardTitle>Brands</CardTitle>
              <CardDescription>Manage your brands</CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Brand
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-medium">All your brands</h3>
          </div>
          <DynamicTable
            data={brands}
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
