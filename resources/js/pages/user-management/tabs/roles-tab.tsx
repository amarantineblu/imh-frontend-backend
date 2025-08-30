import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import { type Role } from '@/types';
import { Eye, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface RolesTabProp {
  data: Array<Role>
}

export default function RolesTab({ data }: RolesTabProp) {
  const [roles] = useState<Role[]>(data);

  // Set up table actions using the useTableActions hook
  const { rowActions } = useTableActions<Role>({
    customActions: [
      {
        label: "Edit",
        variant: "ghost",
        icon: Eye,
        onClick: (role) => {
          console.log("Editing role:", role);
          // TODO: Implement edit role functionality
          alert(`Editing role: ${role.name}`);
        },
        disabled: (role) => role.is_default || (role.userCount as number) > 0,
      },
      {
        label: "Delete",
        variant: "ghost",
        icon: Trash2,
        onClick: (role) => {
          console.log("Deleting role:", role);
          // TODO: Implement delete role functionality
          if (confirm(`Are you sure you want to delete "${role.name}" role?`)) {
            alert(`Role ${role.id} would be deleted`);
          }
        },
        disabled: (role) => role.is_default || (role.userCount as number) > 0,
        className: "text-destructive hover:text-destructive",
      },
    ],
  });

  // Define table columns
  const columns: TableColumn<Role>[] = [
    {
      accessorKey: "name",
      header: "Role Name",
      sortable: true,
      filterable: true,
      cell: (_, role) => (
        <div className="font-medium">{role.name.replace(/#\d+$/, '')}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (_, role) => (
        <div className="text-muted-foreground">{role.description ?? ''}</div>
      ),
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      filterable: true,
      align: "center",
      verticalAlign: "middle",
      sortable: true,
      cell: (items: string[]) => (
        <div className='flex gap-2'>{items.map((item) => <Badge variant="outline" className="font-mono">
          {item}
        </Badge>)}</div>
      ),
    },
    {
      type: "actions",
      header: "Actions",
      buttons: rowActions,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-semibold">Role Management</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Role
        </Button>
      </div>

      {/* Roles Table */}
      <DynamicTable
        data={roles}
        columns={columns}
        enableRowSelection={false}
        enableSorting={true}
        enableFiltering={true}
        enableExport={false}
        searchPlaceholder="Search roles by name or description..."
        pageSize={100}
        emptyMessage="No roles found."
      />

      {/* Permission Categories */}
      <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold">{roles.length}</div>
          <div className="text-muted-foreground text-sm">Total Roles</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">{roles.reduce((acc, role) => acc + (role.user_count as number), 0)}</div>
          <div className="text-muted-foreground text-sm">Users Assigned</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{Math.max(...roles.map((r) => r.permissions?.length))}</div>
          <div className="text-muted-foreground text-sm">Max Permissions</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">{new Set(roles.flatMap((r) => r.permissions)).size}</div>
          <div className="text-muted-foreground text-sm">Unique Permissions</div>
        </div>
      </div>
    </div>
  );
}
