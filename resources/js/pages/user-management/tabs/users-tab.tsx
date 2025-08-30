import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import { type User } from '@/types';
import { Edit3, Eye, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useInitials } from '@/hooks/use-initials';

interface UsersTabProp {
  data: Array<User>
}

export default function UsersTab({ data }: UsersTabProp) {
  const [users] = useState<User[]>(data);
  const getInitials = useInitials();

  // Set up table actions using the useTableActions hook
  const { rowActions } = useTableActions<User>({
    customActions: [
      {
        label: "View Info",
        variant: "ghost",
        icon: Eye,
        onClick: (user) => {
          console.log("Viewing user info:", user);
          // TODO: Implement view user info modal/page
          alert(`Viewing info for user ID: ${user.id}`);
        },
      },
      {
        label: "Edit",
        variant: "ghost",
        icon: Edit3,
        onClick: (user) => {
          console.log("Editing user info:", user);
          // TODO: Implement edit user info modal/page
          alert(`Editing info for user ID: ${user.id}`);
        },
      },
      {
        label: "Delete",
        variant: "ghost",
        icon: Trash2,
        onClick: (user) => {
          console.log("Deleting user:", user);
          // TODO: Implement delete user functionality
          if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            alert(`User ${user.id} would be deleted`);
          }
        },
        className: "text-destructive hover:text-destructive",
      },
    ],
  });

  // Define table columns
  const columns: TableColumn<User>[] = [
    {
      accessorKey: "username",
      header: "Username",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <span className="font-mono text-sm text-muted-foreground">@{String(value)}</span>
      ),
    },
    {
      accessorKey: "name",
      header: "Full Name",
      sortable: true,
      filterable: true,
      hideable: false, // Full Name should not be allowed to be hidden
      cell: (_, user) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.name}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <span className="text-muted-foreground">{String(value)}</span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      sortable: true,
      cell: (value) => (
        <span className="text-muted-foreground">{String(value)}</span>
      ),
    },
    {
      accessorKey: "contact_no",
      header: "Contact",
      sortable: true,
      cell: (value) => (
        <span className="text-muted-foreground">{String(value ?? '-')}</span>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <span className="text-muted-foreground text-sm">{String(value ?? '-')}</span>
      ),
    },
    // {
    //   accessorKey: "salesCommissionPercentage",
    //   header: "Sales Com. (%)",
    //   filterable: true,
    //   align: "center",
    //   verticalAlign: "middle",
    //   sortable: true,
    //   cell: (value) => (
    //     <Badge variant="outline" className="font-mono">
    //       {Number(value).toFixed(2)}%
    //     </Badge>
    //   ),
    // },
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
        <h2 className="text-2xl font-semibold">User Management</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Users Table */}
      <DynamicTable
        data={users}
        columns={columns}
        enableRowSelection={true}
        enableSorting={true}
        enableFiltering={true}
        enableExport
        exportFilename="sales-representatives"
        exportTitle="Sales Representatives Report"
        searchPlaceholder="Search users by username, name, email, contact number, or address..."
        pageSize={100}
        emptyMessage="No users found."
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-3">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold">{users.length}</div>
          <div className="text-muted-foreground text-sm">Total Users</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {users.filter((u) => u.salesCommissionPercentage as number >= 15).length}
          </div>
          <div className="text-muted-foreground text-sm">High Commission (≥15%)</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {(users.reduce((sum, u) => sum + (u.salesCommissionPercentage as number), 0) / users.length).toFixed(2)}%
          </div>
          <div className="text-muted-foreground text-sm">Average Commission</div>
        </div>
      </div>
    </div>
  );
}
