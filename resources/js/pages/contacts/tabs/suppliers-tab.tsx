import { Button } from '@/components/ui/button';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { type Contact } from '@/types';

type Supplier = Contact;

interface SuppliersTabProp {
  data: Array<Supplier>
}

export default function SuppliersTab({ data: suppliersData }: SuppliersTabProp) {
  console.log(suppliersData)
  const [suppliers] = useState<Supplier[]>(suppliersData);

  // Set up table actions using the useTableActions hook
  const { rowActions } = useTableActions<Supplier>({
    customActions: [
      {
        label: "Edit",
        variant: "ghost",
        icon: Edit,
        onClick: (supplier) => {
          console.log("Editing supplier:", supplier);
          // TODO: Implement edit supplier functionality
          alert(`Editing supplier: ${supplier.businessName}`);
        },
      },
      {
        label: "Delete",
        variant: "ghost",
        icon: Trash2,
        onClick: (supplier) => {
          console.log("Deleting supplier:", supplier);
          // TODO: Implement delete supplier functionality
          if (confirm(`Are you sure you want to delete ${supplier.businessName}?`)) {
            alert(`Supplier ${supplier.id} would be deleted`);
          }
        },
        className: "text-destructive hover:text-destructive",
      },
    ],
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Define table columns
  const columns: TableColumn<Supplier>[] = [
    {
      accessorKey: "contact_id",
      header: "Contact ID",
      sortable: true,
      filterable: true,
      cell: (_, supplier) => (
        <div className="font-medium">{supplier.contact_id}</div>
      ),
    },
    {
      accessorKey: "business_name",
      header: "Business Name",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className="font-medium">{String(value ?? '-')}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      sortable: true,
      filterable: true,
      cell: (_, supplier) => (
        <div className="text-muted-foreground">{supplier.name}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className="text-muted-foreground max-w-40 truncate">{String(value ?? '-')}</div>
      ),
    },
    {
      accessorKey: "tax_number",
      header: "Tax Number",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className="text-muted-foreground">{String(value ?? '-')}</div>
      ),
    },
    {
      accessorKey: "pay_term_number",
      header: "Pay Term",
      sortable: true,
      filterable: true,
      cell: (_, supplier) => (
        <div className="text-muted-foreground">{String(supplier.pay_term_type ?? '-')} {String(supplier.pay_term_number ?? '-')}</div>
      ),
    },
    {
      accessorKey: "opening_balance",
      header: "Opening Balance",
      sortable: true,
      cell: (_, supplier) => (
        <div className="font-medium">{formatCurrency(+supplier.opening_balance)}</div>
      ),
    },
    {
      accessorKey: "opening_balance_paid",
      header: "Advance Balance",
      sortable: true,
      cell: (_, supplier) => (
        <div className="font-medium">{formatCurrency(+supplier.opening_balance_paid)}</div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Added On",
      sortable: true,
      cell: (_, supplier) => (
        <span className="text-muted-foreground text-sm">
          {new Date(supplier.created_at as string).toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      filterable: true,
      cell: (_, supplier) => (
        <div className="text-muted-foreground max-w-xs truncate">{String(supplier.address_line_1 ?? '-')}</div>
      ),
    },
    {
      accessorKey: "mobile",
      header: "Mobile",
      cell: (_, supplier) => (
        <div className="text-muted-foreground">{supplier.mobile}</div>
      ),
    },
    {
      accessorKey: "sell_return_paid",
      header: "Total Purchase Due",
      sortable: true,
      cell: (_, supplier) => (
        <div className="font-medium text-red-600">{formatCurrency(+supplier.sell_return_paid)}</div>
      ),
    },
    {
      accessorKey: "total_sell_return",
      header: "Total Purchase Return Due",
      sortable: true,
      cell: (_, supplier) => (
        <div className="font-medium text-blue-600">{formatCurrency(+supplier.total_sell_return)}</div>
      ),
    },
        {
      type: "actions",
      header: "Action",
      buttons: rowActions,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-semibold">Supplier Management</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      {/* Suppliers Table */}
      <DynamicTable
        data={suppliers}
        columns={columns}
        enableRowSelection={false}
        enableSorting={true}
        enableFiltering={true}
        enableExport={true}
        searchPlaceholder="Search suppliers by name, business name, email, or contact ID..."
        pageSize={100}
        emptyMessage="No suppliers found."
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold">{suppliers.length}</div>
          <div className="text-muted-foreground text-sm">Total Suppliers</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(suppliers.reduce((acc, supplier) => acc + +supplier.opening_balance, 0))}
          </div>
          <div className="text-muted-foreground text-sm">Total Opening Balance</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">
            {formatCurrency(suppliers.reduce((acc, supplier) => acc + +supplier.sell_return_paid, 0))}
          </div>
          <div className="text-muted-foreground text-sm">Total Purchase Due</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency(suppliers.reduce((acc, supplier) => acc + +supplier.total_sell_return, 0))}
          </div>
          <div className="text-muted-foreground text-sm">Total Return Due</div>
        </div>
      </div>
    </div>
  );
}
