import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Warranty extends Record<string, unknown> {
  id: number;
  name: string;
  description: string;
  duration: string;
}

interface Props{
  warranties: Warranty[];
}

export default function WarrantiesTab() {
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [loading, setLoading] = useState(true);
  const data_key = "warranties";
  useEffect(() => {
     fetch(`/products/apis/${data_key}`)
       .then(res => res.json())
       .then(data => {
         setWarranties(data);
         setLoading(false);
        //  console.log('this is the data', data);
       })
       .catch(() => setLoading(false));
   }, []);
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
