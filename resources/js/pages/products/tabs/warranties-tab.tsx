import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Warranty extends Record<string, unknown> {
  id: number;
  name: string;
  description: string;
  duration: string;
}

export default function WarrantiesTab() {
  const [warranties] = useState<Warranty[]>([
    { 
      id: 1, 
      name: '1 Year Standard', 
      description: 'Standard warranty coverage for electronics and appliances', 
      duration: '12 months'
    },
    { 
      id: 2, 
      name: '2 Year Extended', 
      description: 'Extended warranty for premium products and devices', 
      duration: '24 months'
    },
    { 
      id: 3, 
      name: '6 Month Basic', 
      description: 'Basic warranty for accessories and consumables', 
      duration: '6 months'
    },
    { 
      id: 4, 
      name: '3 Year Premium', 
      description: 'Premium warranty with comprehensive coverage', 
      duration: '36 months'
    },
    { 
      id: 5, 
      name: '90 Day Limited', 
      description: 'Limited warranty for trial and sample products', 
      duration: '3 months'
    },
    { 
      id: 6, 
      name: '5 Year Extended Plus', 
      description: 'Extended plus warranty for high-value items', 
      duration: '60 months'
    },
    { 
      id: 7, 
      name: 'Lifetime Warranty', 
      description: 'Lifetime warranty for select premium products', 
      duration: 'Lifetime'
    },
    { 
      id: 8, 
      name: '30 Day Return', 
      description: 'Return policy warranty for new customer purchases', 
      duration: '1 month'
    },
    { 
      id: 9, 
      name: 'International Warranty', 
      description: 'Global warranty coverage for international products', 
      duration: '18 months'
    },
    { 
      id: 10, 
      name: 'Professional Service', 
      description: 'Professional service warranty for business equipment', 
      duration: '24 months'
    }
  ]);

  // Setup table actions
  const { rowActions } = useTableActions<Warranty>({
    customActions: [
      {
        label: "Edit",
        icon: Edit,
        onClick: (warranty: Warranty) => {
          alert(`Edit warranty: ${warranty.name}`);
        },
        variant: "outline",
      },
      {
        label: "Delete",
        icon: Trash2,
        onClick: (warranty: Warranty) => {
          if (confirm(`Are you sure you want to delete "${warranty.name}" warranty?`)) {
            alert(`Deleting warranty: ${warranty.name}`);
          }
        },
        className: "text-destructive hover:text-destructive",
      },
    ],
  });

  // Define table columns
  const columns: TableColumn<Warranty>[] = [
    {
      accessorKey: "name",
      header: "Name",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <span className="font-medium ">{String(value)}</span>
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
      accessorKey: "duration",
      header: "Duration",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <span className="font-medium text-blue-600">{String(value)}</span>
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
              <CardTitle>Warranties</CardTitle>
              <CardDescription>Manage warranty terms and coverage for products</CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Warranty
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-medium">All Warranties</h3>
          </div>
          <DynamicTable
            data={warranties}
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
