import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import { Edit2, Plus, Trash2, LoaderCircle } from 'lucide-react';
import { type CustomerGroup } from '@/types';
import { FormEventHandler, useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CustomerGroupsTabProp {
  data: Array<CustomerGroup>
}

type CustomerGroupForm = {
  name: string;
  price_calculation_type: string;
  amount?: number;
  selling_price_group_id?: string;
}

export default function CustomerGroupsTab({ data: customerGroupsData }: CustomerGroupsTabProp) {
  // console.log(customerGroupsData)
  const [customerGroups] = useState<CustomerGroup[]>(customerGroupsData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<CustomerGroup | null>(null);
  const [selectedPriceType, setSelectedPriceType] = useState<'selling_price_group' | 'percentage'>('percentage');

  // Setup table actions
  const { rowActions } = useTableActions<CustomerGroup>({
    customActions: [
      {
        label: "Edit",
        icon: Edit2,
        onClick: (group: CustomerGroup) => {
          setEditingGroup(group);
        },
        variant: "ghost",
      },
      {
        label: "Delete",
        icon: Trash2,
        onClick: (group: CustomerGroup) => {
          // TODO: Implement delete group functionality
          if (confirm(`Are you sure you want to delete group ${group.customerGroupName}?`)) {
            alert(`Group ${group.id} would be deleted`);
          }
        },
        className: "text-destructive hover:text-destructive",
      },
    ],
  });

  // Define table columns
  const columns: TableColumn<CustomerGroup>[] = [
    {
      accessorKey: "name",
      header: "Customer Group Name",
      sortable: true,
      filterable: true,
      cell: (_, group) => (
        <span className="font-medium">{group.name}</span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Calculation Percentage (%)",
      sortable: true,
      filterable: true,
      cell: (_, group) => (
        <Badge variant={group.amount > 0 ? 'default' : 'secondary'}>
          {group.amount}%
        </Badge>
      ),
    },
    {
      accessorKey: "selling_price_group_id",
      header: "Selling Price Group",
      sortable: true,
      filterable: true,
      cell: (_, group) => (
        <span className="text-muted-foreground">{group.selling_price_group_id}</span>
      ),
    },
    {
      type: "actions",
      header: "Action",
      buttons: rowActions,
    },
  ];

  const { data, setData, patch, post, processing, errors, reset } = useForm<Required<CustomerGroupForm>>({
    name: editingGroup?.name ?? '',
    price_calculation_type: editingGroup?.price_calculation_type ?? '',
    amount: editingGroup?.amount ?? 0,
    selling_price_group_id: editingGroup?.selling_price_group_id ?? ''
  });

  useEffect(() => {
    if (editingGroup) {
      setData({
        name: editingGroup.name ?? '',
        price_calculation_type: editingGroup.price_calculation_type ?? '',
        amount: editingGroup.amount ?? 0,
        selling_price_group_id: editingGroup.selling_price_group_id ?? '',
      });
      setIsAddDialogOpen(true);
    }
  }, [editingGroup]);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!editingGroup) {
      post(route('contacts.customers-groups.store'), {
        preserveScroll: true,
        onError: (errors) => {
          console.error('Create Customer Group Errors:', errors);
        },
        onFinish: () => {
          reset('name', 'amount', 'price_calculation_type', 'selling_price_group_id')
          setIsAddDialogOpen(false);
          setEditingGroup(null);
        },
      });
    } else {
      patch(route('contacts.customers-groups.update', editingGroup.id), {
        preserveScroll: true,
        onError: (errors) => {
          console.error('Update Customer Group Errors:', errors);
        },
        onFinish: () => {
          reset('name', 'amount', 'price_calculation_type', 'selling_price_group_id')
          setIsAddDialogOpen(false);
          setEditingGroup(null);
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex items-center justify-end">
        <Dialog
          open={isAddDialogOpen}
          onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open) setEditingGroup(null);
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer Group
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>
                {editingGroup ? 'Edit Customer Group' : 'Add Customer Group'}
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-6" onSubmit={submit}>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Customer Group Name</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    tabIndex={1}
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    disabled={processing}
                    placeholder="Customer Group Name"
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price_calculation_type">Price calculation type</Label>
                  <Select defaultValue="percentage" onValueChange={(value: 'selling_price_group' | 'percentage') => {
                    setData('price_calculation_type', value)
                    setSelectedPriceType(value)
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="selling_price_group">Selling Price Group</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputError message={errors.price_calculation_type} className="mt-2" />
                </div>
              </div>

              {selectedPriceType == 'percentage' && <div className="grid grid-cols-1 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Calculation Percentage (%)</Label>
                  <Input
                    id="amount"
                    type="number"
                    required
                    tabIndex={1}
                    value={data.amount}
                    onChange={(e) => setData('amount', +e.target.value)}
                    disabled={processing}
                    placeholder="Calculation Percentage (%)"
                  />
                  <InputError message={errors.amount} className="mt-2" />
                </div>
              </div>}

              
              {selectedPriceType == 'selling_price_group' && <div className="grid grid-cols-1 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="selling_price_group_id">Selling Price Group</Label>
                  <Select defaultValue="1" onValueChange={(value) => setData('selling_price_group_id', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Dummy Selling Price Group</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputError message={errors.selling_price_group_id} className="mt-2" />
                </div>
              </div>}

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
                  {editingGroup ? 'Update Group' : 'Save Group'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Customer Groups Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Groups</CardTitle>
          <CardDescription>Manage customer groups and their calculation percentages</CardDescription>
        </CardHeader>
        <CardContent>
          <DynamicTable
            data={customerGroups}
            columns={columns}
            enableRowSelection={false}
            enableSorting={true}
            enableFiltering={true}
            enableExport={true}
            pageSize={100}
            searchPlaceholder="Search customer groups by name or price group..."
            emptyMessage="No customer groups found."
          />
        </CardContent>
      </Card>
    </div>
  );
}
