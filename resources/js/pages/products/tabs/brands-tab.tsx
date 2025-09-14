import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';


interface Brand extends Record<string, unknown> {
  id: number;
  brands: string;
  note: string;
}

interface Props {
  brands : Brand[];
}

export default function BrandsTab(props:Props) {
  // const [brands] = useState<Brand[]>([]);

  const { brands } = props;  // <-- add this line

  useEffect(() => {
  if (brands) {
    console.log('Brands:', brands);
  } else {
    console.warn('Brands data is missing!');
  }
  }, [brands]);

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
