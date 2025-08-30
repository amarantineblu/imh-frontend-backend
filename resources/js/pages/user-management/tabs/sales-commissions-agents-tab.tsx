import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import { type User } from '@/types';
import { Eye, Plus, Trash2 } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type SalesAgentForm = {
  prefix: string;
  first_name: string;
  last_name: string;
  email: string;
  contact_no: string;
  address: string;
  cmmsn_percent: number;
}

interface SalesCommissionsAgentsTabProp {
  data: Array<User>
}

export default function SalesCommissionsAgentsTab({ data: agentsData }: SalesCommissionsAgentsTabProp) {
  const [agents] = useState<User[]>(agentsData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<User | null>(null);

  // Set up table actions using the useTableActions hook
  const { rowActions } = useTableActions<User>({
    customActions: [
      {
        label: "Edit",
        variant: "ghost",
        icon: Eye,
        onClick: (agent) => {
          setEditingAgent(agent);
          setIsAddDialogOpen(true);
        },
      },
      {
        label: "Delete",
        variant: "ghost",
        icon: Trash2,
        onClick: (agent) => {
          console.log("Deleting agent:", agent);
          // TODO: Implement delete agent functionality
          if (confirm(`Are you sure you want to delete agent "${agent.name}"?`)) {
            alert(`Agent ${agent.id} would be deleted`);
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

  const formatPercentage = (rate: number) => {
    return `${rate}%`;
  };

  // Define table columns
  const columns: TableColumn<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      sortable: true,
      filterable: true,
      cell: (_, agent) => (
        <div className="font-medium">{agent.name}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      sortable: true,
      filterable: true,
      cell: (_, agent) => (
        <div className="text-muted-foreground">{agent.email}</div>
      ),
    },
    {
      accessorKey: "contact_no",
      header: "Contact Number",
      cell: (value) => (
        <div className="text-muted-foreground">{String(value ?? '-')}</div>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: (value) => (
        <div className="text-muted-foreground max-w-xs truncate">{String(value ?? '-')}</div>
      ),
    },
    {
      accessorKey: "cmmsn_percent",
      header: "Sales Commission Percentage (%)",
      sortable: true,
      cell: (value) => (
        <div className="font-medium">{formatPercentage(value as number)}</div>
      ),
    },
    {
      type: "actions",
      header: "Action",
      buttons: rowActions,
    },
  ];
  
  const { data, setData, post, processing, errors, reset } = useForm<Required<SalesAgentForm>>({
    prefix: (editingAgent?.prefix ?? 'Mr') as string,
    first_name: editingAgent?.first_name ?? '',
    last_name: editingAgent?.last_name ?? '',
    email: editingAgent?.email ?? '',
    contact_no: (editingAgent?.contact_no ?? '') as string,
    address: (editingAgent?.address ?? '') as string,
    cmmsn_percent: (editingAgent?.cmmsn_percent ?? 0) as number
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('user-management.sales-commissions-agents.store'), {
      preserveScroll: true,
      onError: (errors) => {
        console.error('Create Sales Agent Errors:', errors);
      },
      onFinish: () => {
        reset('prefix', 'first_name', 'last_name', 'email', 'address', 'contact_no', 'cmmsn_percent')
        setIsAddDialogOpen(false);
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-semibold">Sales Agents & Commissions</h2>
        <Dialog
          open={isAddDialogOpen}
          onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open) setEditingAgent(null);;
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              Add Sales Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>
                {editingAgent ? 'Edit sales commission agent' : 'Add sales commission agent'}
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-6" onSubmit={submit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="prefix">Prefix</Label>
                  <Input
                    id="prefix"
                    type="text"
                    required
                    tabIndex={1}
                    value={data.prefix}
                    onChange={(e) => setData('prefix', e.target.value)}
                    disabled={processing}
                    placeholder="Prefix"
                  />
                  <InputError message={errors.prefix} className="mt-2" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    type="text"
                    required
                    tabIndex={1}
                    value={data.first_name}
                    onChange={(e) => setData('first_name', e.target.value)}
                    disabled={processing}
                    placeholder="First Name"
                  />
                  <InputError message={errors.first_name} className="mt-2" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    type="text"
                    required
                    tabIndex={1}
                    value={data.last_name}
                    onChange={(e) => setData('last_name', e.target.value)}
                    disabled={processing}
                    placeholder="Last Name"
                  />
                  <InputError message={errors.last_name} className="mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    required
                    tabIndex={1}
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    disabled={processing}
                    placeholder="Email"
                  />
                  <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contact_no">Contact Number</Label>
                  <Input
                    id="contact_no"
                    type="text"
                    required
                    tabIndex={1}
                    value={data.contact_no}
                    onChange={(e) => setData('contact_no', e.target.value)}
                    disabled={processing}
                    placeholder="Contact Number"
                  />
                  <InputError message={errors.contact_no} className="mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id='address'
                    placeholder="Address"
                    className="min-h-[60px]"
                    tabIndex={1}
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    disabled={processing}
                  />
                  <InputError message={errors.address} className="mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-1  gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cmmsn_percent">Sales Commission Percentage (%)</Label>
                  <Input
                    id="cmmsn_percent"
                    type="number"
                    required
                    tabIndex={1}
                    value={data.cmmsn_percent}
                    onChange={(e) => setData('cmmsn_percent', +e.target.value)}
                    disabled={processing}
                    placeholder="Sales Commission Percentage (%)"
                  />
                  <InputError message={errors.cmmsn_percent} className="mt-2" />
                </div>
              </div>

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                  {editingAgent ? 'Update Agent' : 'Save Agent'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Agents Table */}
      <DynamicTable
        data={agents}
        columns={columns}
        enableRowSelection={false}
        enableSorting={true}
        enableExport
        searchPlaceholder="Search agents by name, email, or phone..."
        pageSize={100}
        emptyMessage="No sales agents found."
      />

      {/* Commission Stats */}
      <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold">{agents.length}</div>
          <div className="text-muted-foreground text-sm">Total Agents</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{formatCurrency(agents.reduce((acc, agent) => acc + Number(agent.totalSales ?? 0), 0))}</div>
          <div className="text-muted-foreground text-sm">Total Sales</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(agents.reduce((acc, agent) => acc + Number(agent.totalCommission ?? 0), 0))}</div>
          <div className="text-muted-foreground text-sm">Total Commissions</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">
            {formatPercentage(agents.reduce((acc, agent) => acc + Number(agent.commissionRate ?? 0), 0) / agents.length || 0)}
          </div>
          <div className="text-muted-foreground text-sm">Avg Commission Rate</div>
        </div>
      </div>
    </div>
  );
}
