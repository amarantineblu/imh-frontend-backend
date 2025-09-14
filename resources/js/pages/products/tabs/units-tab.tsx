import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Unit extends Record<string, unknown> {
  id: number;
  name: string;
  shortName: string;
  allowDecimal: boolean;
}

interface Props {
  units: Unit[],
}

export default function UnitsTab() {
  // const [units] = useState<Unit[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
      const [loading, setLoading] = useState(true);
      const data_key = "units";
      useEffect(() => {
         fetch(`/products/apis/${data_key}`)
           .then(res => res.json())
           .then(data => {
              const transformed = data.map((b: any) => ({
                id: b.id,
                name: b.actual_name, // 🔁 Map name → brands
                shortName: b.short_name,
                allowDecimal: b.all_decimal,
              }));
             setUnits(transformed);
             setLoading(false);
            //  console.log('this is the data', data);
           })
           .catch(() => setLoading(false));
       }, []);

  // Setup table actions
  const { rowActions } = useTableActions<Unit>({
    customActions: [
      {
        label: "Edit",
        icon: Edit,
        onClick: (unit: Unit) => {
          alert(`Edit unit: ${unit.name}`);
        },
        variant: "outline",
      },
      {
        label: "Delete",
        icon: Trash2,
        onClick: (unit: Unit) => {
          if (confirm(`Are you sure you want to delete ${unit.name}?`)) {
            alert(`Unit ${unit.name} would be deleted`);
          }
        },
        className: "text-destructive hover:text-destructive",
      },
    ],
  });

  // Define table columns
  const columns: TableColumn<Unit>[] = [
    {
      accessorKey: "name",
      header: "Name",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <span className="font-medium">{String(value)}</span>
      ),
    },
    {
      accessorKey: "shortName",
      header: "Short name",
      sortable: true,
      filterable: true,
    },
    {
      accessorKey: "allowDecimal",
      header: "Allow decimal",
      sortable: true,
      filterable: true,
      cell: (value, unit) => (
        <span>{unit.allowDecimal ? 'Yes' : 'No'}</span>
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
              <CardTitle>All your units</CardTitle>
              <CardDescription>Manage units for product measurements and quantities</CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Unit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DynamicTable
            data={units}
            columns={columns}
            pageSize={100}
            searchPlaceholder="Search ..."
            enablePagination={true}
            enableSorting={true}
            enableFiltering={true}
            enableExport={true}
            enableColumnVisibility={true}
          />
        </CardContent>
      </Card>
    </div>
  );
}
