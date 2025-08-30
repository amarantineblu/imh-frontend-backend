/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from '@/components/ui/scroll-area';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import { type Contact } from '@/types';
import { Check, ChevronsUpDown, ChevronDownIcon, Edit, Eye, CreditCard, Trash2, UserX, BookOpen, ShoppingCart, FileText, Plus, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface CustomersTabProp {
  data: { 
    customers_data: Array<Contact>,
    contact_groups: Array<string>
    users: Array<any>
  }
}

type contactType = 'supplier' | 'customer' | 'both';

type ContactForm = {
  contact_type: contactType | string;
  amount?: number;
  selling_price_group_id?: string;
  // business_id: number;
  // type: string;
  contact_id?: string;
  contact_type_radio?: string;
  contact_group?: string;
  prefix?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  supplier_business_name?: string;
  
  // contact_status: string;
  mobile?: string;
  alternate_number?: string;
  email?: string;
  landline?: string;
  // credit_limit: string;
  // created_by: number;
  // balance: string;
  // total_rp: number;
  // total_rp_used: number;
  // total_rp_expired: number;
  // is_default: number;
  // is_export: number;
  // created_at: string;
  // updated_at: string;
  // opening_balance: string;
  // opening_balance_paid: string;
  // total_ledger_discount: string;
  // total_invoice: string;
  // invoice_received: string;
  // total_sell_return: string;
  // sell_return_paid: string;
}

export default function CustomersTab({ data: tabData }: CustomersTabProp) {
  console.log(tabData)
  const [customers] = useState<Contact[]>(tabData.customers_data);
  const [contactGroups] = useState<[string, string][]>(Object.entries(tabData.contact_groups ?? {}).map(([key, value]) => [key === '' ? '0' : key, value] as [string, string]));
  const [assignableUsers] = useState<[string, string][]>(Object.entries(tabData.users ?? {}).map(([key, value]) => [key === '' ? '0' : key, value] as [string, string]));

  const [dateOfBirthOpen, setDateOfBirthOpen] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined)
  
  const [selectUsersOpen, setSelectUsersOpen] = useState(false)
  const handleSetSelectedUser = (val: string) => {
      if (selectedAssignedUsers.includes(val)) {
          selectedAssignedUsers.splice(selectedAssignedUsers.indexOf(val), 1);
          setSelectedAssignedUsers(selectedAssignedUsers.filter((item) => item !== val));
      } else {
          setSelectedAssignedUsers(prevValue => [...prevValue, val]);
      }
  }

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingContact, setEditingCustomer] = useState<Contact | null>(null);
  const [selectedCustomerType, setSelectedCustomerType] = useState<contactType>('customer');
  const [selectedIdentifiedAs, setSelectedIdentifiedAs] = useState<'individual' | 'business'>('individual');
  const [selectedContactGroup, setSelectedContactGroup] = useState<string>('');
  const [selectedAssignedUsers, setSelectedAssignedUsers] = useState<string[]>([]);
  const [selectedPayTermType, setSelectedPayTermType] = useState<'months' | 'days' | null>();
  console.log('Selected Assigned Users:', selectedPayTermType);

  // Set up table actions using the useTableActions hook
  const { rowActions } = useTableActions<Contact>({
    customActions: [
      {
        label: "Pay",
        variant: "ghost",
        icon: CreditCard,
        onClick: (customer) => {
          console.log("Processing payment for customer:", customer);
          alert(`Processing payment for ${customer.businessName}`);
        },
      },
      {
        label: "View",
        variant: "ghost",
        icon: Eye,
        onClick: (customer) => {
          console.log("Viewing customer info:", customer);
          alert(`Viewing info for ${customer.businessName}`);
        },
      },
      {
        label: "Edit",
        variant: "ghost",
        icon: Edit,
        onClick: (customer) => {
          console.log("Editing customer:", customer);
          alert(`Editing customer ${customer.businessName}`);
        },
      },
      {
        label: "Delete",
        variant: "ghost",
        icon: Trash2,
        onClick: (customer) => {
          console.log("Deleting customer:", customer);
          if (confirm(`Are you sure you want to delete ${customer.businessName}?`)) {
            alert(`Customer ${customer.id} would be deleted`);
          }
        },
        className: "text-destructive hover:text-destructive",
      },
      {
        label: "Deactivate",
        variant: "ghost",
        icon: UserX,
        onClick: (customer) => {
          console.log("Deactivating customer:", customer);
          alert(`Deactivating customer ${customer.businessName}`);
        },
        disabled: (customer) => customer.status === 'inactive',
      },
      {
        label: "Ledger",
        variant: "ghost",
        icon: BookOpen,
        onClick: (customer) => {
          console.log("Opening ledger for customer:", customer);
          alert(`Opening ledger for ${customer.businessName}`);
        },
      },
      {
        label: "Sales",
        variant: "ghost",
        icon: ShoppingCart,
        onClick: (customer) => {
          console.log("Viewing sales for customer:", customer);
          alert(`Viewing sales for ${customer.businessName}`);
        },
      },
      {
        label: "Documents & Note",
        variant: "ghost",
        icon: FileText,
        onClick: (customer) => {
          console.log("Opening documents for customer:", customer);
          alert(`Opening documents & notes for ${customer.businessName}`);
        },
      },
    ],
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getGroupColor = (group: string) => {
    switch (group.toLowerCase()) {
      case 'vip':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'wholesale':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Define table columns
  const columns: TableColumn<Contact>[] = [
    {
      accessorKey: "contact_id",
      header: "Contact ID",
      sortable: true,
      filterable: true,
      cell: (_, customer) => (
        <div className="font-medium">{customer.contact_id}</div>
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
      cell: (_, customer) => (
        <div className="text-muted-foreground">{customer.name}</div>
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
      accessorKey: "credit_limit",
      header: "Credit Limit",
      sortable: true,
      cell: (_, customer) => (
        <div className="font-medium">{formatCurrency(+customer.credit_limit)}</div>
      ),
    },
    {
      accessorKey: "pay_term_number",
      header: "Pay Term",
      sortable: true,
      filterable: true,
      cell: (_, customer) => (
        <div className="text-muted-foreground">{String(customer.pay_term_type ?? '-')} {String(customer.pay_term_number ?? '-')}</div>
      ),
    },
    {
      accessorKey: "opening_balance",
      header: "Opening Balance",
      sortable: true,
      cell: (_, customer) => (
        <div className="font-medium">{formatCurrency(+customer.opening_balance)}</div>
      ),
    },
    {
      accessorKey: "opening_balance_paid",
      header: "Advance Balance",
      sortable: true,
      cell: (_, customer) => (
        <div className="font-medium">{formatCurrency(+customer.opening_balance_paid)}</div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Added On",
      sortable: true,
      cell: (_, customer) => (
        <span className="text-muted-foreground text-sm">
          {new Date(customer.created_at as string).toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: "customer_group",
      header: "Customer Group",
      sortable: true,
      filterable: true,
      cell: (_, customer) => (
        <Badge className={getGroupColor(String(customer.customer_group))}>{String(customer.customer_group)}</Badge>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      filterable: true,
      cell: (_, customer) => (
        <div className="text-muted-foreground max-w-xs truncate">{String(customer.address_line_1 ?? '-')}</div>
      ),
    },
    {
      accessorKey: "mobile",
      header: "Mobile",
      cell: (_, customer) => (
        <div className="text-muted-foreground">{customer.mobile}</div>
      ),
    },
    {
      accessorKey: "sell_return_paid",
      header: "Total Sale Due Paid",
      sortable: true,
      cell: (_, customer) => (
        <div className="font-medium text-red-600">{formatCurrency(+customer.sell_return_paid)}</div>
      ),
    },
    {
      accessorKey: "total_sell_return",
      header: "Total Sell Return Due",
      sortable: true,
      cell: (_, customer) => (
        <div className="font-medium text-blue-600">{formatCurrency(+customer.total_sell_return)}</div>
      ),
    },
        {
      type: "actions",
      header: "Action",
      buttons: rowActions,
    },
  ];

  const { data, setData, patch, post, processing, errors, reset } = useForm<Required<ContactForm>>({
    contact_type: editingContact?.type ?? selectedCustomerType,
    contact_id: editingContact?.contact_id ?? '',
    prefix: editingContact?.prefix ?? '',
    first_name: editingContact?.first_name ?? '',
    middle_name: editingContact?.middle_name ?? '',
    last_name: editingContact?.last_name ?? '',
    supplier_business_name: editingContact?.supplier_business_name ?? '',
    mobile: editingContact?.mobile ?? '',
    alternate_number: editingContact?.alternate_number ?? '',
    email: editingContact?.email ?? '',
    landline: editingContact?.landline ?? '',
    amount: editingContact?.amount as number ?? 0,
    selling_price_group_id: editingContact?.selling_price_group_id as string ?? '',
    contact_type_radio: editingContact?.contact_type_radio as string ?? selectedIdentifiedAs,
    contact_group: editingContact?.contact_group as string ?? selectedContactGroup
  });

  useEffect(() => {
    if (editingContact) {
      setData({
        contact_type: editingContact.type ?? selectedCustomerType,
        contact_id: editingContact.contact_id ?? '',
        prefix: editingContact?.prefix ?? '',
        first_name: editingContact?.first_name ?? '',
        middle_name: editingContact?.middle_name ?? '',
        last_name: editingContact?.last_name ?? '',
        supplier_business_name: editingContact?.supplier_business_name ?? '',
        mobile: editingContact?.mobile ?? '',
        alternate_number: editingContact?.alternate_number ?? '',
        email: editingContact?.email ?? '',
        landline: editingContact?.landline ?? '',
        amount: editingContact.amount as number ?? 0,
        selling_price_group_id: editingContact?.selling_price_group_id as string ?? '',
        contact_type_radio: editingContact?.contact_type_radio as string ?? selectedIdentifiedAs,
        contact_group: editingContact?.contact_group as string ?? selectedContactGroup
      });
      setIsAddDialogOpen(true);
    }
  }, [editingContact, selectedCustomerType, selectedIdentifiedAs, selectedContactGroup]);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!editingContact) {
      post(route('contacts.customers-groups.store'), {
        preserveScroll: true,
        onError: (errors) => {
          console.error('Create Customer Group Errors:', errors);
        },
        onFinish: () => {
          reset('contact_type', 'contact_id', 'amount', 'selling_price_group_id')
          setIsAddDialogOpen(false);
          setEditingCustomer(null);
        },
      });
    } else {
      patch(route('contacts.customers-groups.update', editingContact.id), {
        preserveScroll: true,
        onError: (errors) => {
          console.error('Update Customer Group Errors:', errors);
        },
        onFinish: () => {
          reset('contact_type', 'contact_id', 'amount', 'selling_price_group_id')
          setIsAddDialogOpen(false);
          setEditingCustomer(null);
        },
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-semibold">Customer Management</h2>
        
        <Dialog
          open={isAddDialogOpen}
          onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open) setEditingCustomer(null);
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add new contact
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>
                {editingContact ? 'Edit contact' : 'Add new contact'}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh] pr-4">
              <form className="space-y-6" onSubmit={submit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contact_type">Contact type</Label>
                    <Select defaultValue="customer" onValueChange={(value: 'supplier' | 'customer' | 'both') => {
                      setData('contact_type', value)
                      setSelectedCustomerType(value)
                    }}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supplier">Supplier</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                    <InputError message={errors.contact_type} className="mt-2" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="contact_type_radio">Identified As</Label>
                    <Select defaultValue="individual" onValueChange={(value: 'individual' | 'business') => {
                      setData('contact_type_radio', value)
                      setSelectedIdentifiedAs(value)
                    }}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                    <InputError message={errors.contact_type_radio} className="mt-2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contact_id">Contact ID</Label>
                    <Input
                      id="contact_id"
                      type="text"
                      required
                      tabIndex={1}
                      value={data.contact_id}
                      onChange={(e) => setData('contact_id', e.target.value)}
                      disabled={processing}
                      placeholder="Contact ID"
                    />
                    <InputError message={errors.contact_id} className="mt-2" />
                  </div>

                  {selectedCustomerType != 'supplier' && <div className="grid gap-2">
                    <Label htmlFor="contact_group">Customer Group</Label>
                    <Select defaultValue="0" onValueChange={(value) => {
                      setData('contact_group', value)
                      setSelectedContactGroup(value)
                    }}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        { contactGroups && contactGroups.map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>) }
                      </SelectContent>
                    </Select>
                    <InputError message={errors.contact_group} className="mt-2" />
                  </div>}
                </div>

                {selectedIdentifiedAs == 'individual' && 
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="prefix">Prefix</Label>
                        <Input
                          id="prefix"
                          type="text"
                          tabIndex={1}
                          value={data.prefix}
                          onChange={(e) => setData('prefix', e.target.value)}
                          disabled={processing}
                          placeholder="Mr / Mrs / Miss"
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
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="middle_name">Middle Name</Label>
                        <Input
                          id="middle_name"
                          type="text"
                          required
                          tabIndex={1}
                          value={data.middle_name}
                          onChange={(e) => setData('middle_name', e.target.value)}
                          disabled={processing}
                          placeholder="Middle Name"
                        />
                        <InputError message={errors.middle_name} className="mt-2" />
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
                  </>
                }

                {selectedIdentifiedAs == 'business' && 
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="supplier_business_name">Business Name</Label>
                      <Input
                        id="supplier_business_name"
                        type="text"
                        required
                        tabIndex={1}
                        value={data.supplier_business_name}
                        onChange={(e) => setData('supplier_business_name', e.target.value)}
                        disabled={processing}
                        placeholder="Business Name"
                      />
                      <InputError message={errors.supplier_business_name} className="mt-2" />
                    </div>
                  </div>
                }

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="mobile">Mobile</Label>
                    <Input
                      id="mobile"
                      type="text"
                      tabIndex={1}
                      value={data.mobile}
                      onChange={(e) => setData('mobile', e.target.value)}
                      disabled={processing}
                      placeholder="Mobile"
                    />
                    <InputError message={errors.mobile} className="mt-2" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      tabIndex={1}
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      disabled={processing}
                      placeholder="Email"
                    />
                    <InputError message={errors.email} className="mt-2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="alternate_number">Alternate contact number</Label>
                    <Input
                      id="alternate_number"
                      type="text"
                      tabIndex={1}
                      value={data.alternate_number}
                      onChange={(e) => setData('alternate_number', e.target.value)}
                      disabled={processing}
                      placeholder="Alternate contact number"
                    />
                    <InputError message={errors.alternate_number} className="mt-2" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="landline">Landline</Label>
                    <Input
                      id="landline"
                      type="text"
                      required
                      tabIndex={1}
                      value={data.landline}
                      onChange={(e) => setData('landline', e.target.value)}
                      disabled={processing}
                      placeholder="Landline"
                    />
                    <InputError message={errors.landline} className="mt-2" />
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  {selectedIdentifiedAs == 'individual' && <div className="grid gap-2">
                    <Label htmlFor="date" className="px-1">Date of birth</Label>
                    <Popover open={dateOfBirthOpen} onOpenChange={setDateOfBirthOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className="w-48 justify-between font-normal rounded-md"
                        >
                          {dateOfBirth ? dateOfBirth.toLocaleDateString() : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateOfBirth}
                          captionLayout="dropdown"
                          onSelect={(dateOfBirth) => {
                            setDateOfBirth(dateOfBirth)
                            setDateOfBirthOpen(false)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>}
                  
                  <div className="grid gap-2">
                    <Popover open={selectUsersOpen} onOpenChange={setSelectUsersOpen}>
                        <Label htmlFor="contact_id">Assigned to</Label>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={selectUsersOpen}
                                className="justify-between rounded-md"
                            >
                                <div className="flex gap-2 justify-start">
                                    {selectedAssignedUsers?.length ?
                                        selectedAssignedUsers.map((val, i) => (
                                            <div key={i} className="px-2 py-1 rounded-md border bg-slate-200 text-xs font-medium">{assignableUsers.find(([value]) => value === val)?.[1]}</div>
                                        ))
                                        : "Select user..."}
                                </div>
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput placeholder="Search user..." />
                                <CommandEmpty>No user found.</CommandEmpty>
                                <CommandGroup>
                                    <CommandList>
                                        {assignableUsers.map(([value, label]) => (
                                            <CommandItem
                                                key={value}
                                                value={value}
                                                onSelect={() => {
                                                    handleSetSelectedUser(value)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selectedAssignedUsers.includes(value) ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {label}
                                            </CommandItem>
                                        ))}
                                    </CommandList>
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="alternate_number">Tax number</Label>
                    <Input
                      id="alternate_number"
                      type="text"
                      tabIndex={1}
                      value={data.alternate_number}
                      onChange={(e) => setData('alternate_number', e.target.value)}
                      disabled={processing}
                      placeholder="Tax number"
                    />
                    <InputError message={errors.alternate_number} className="mt-2" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="landline">Opening Balance</Label>
                    <Input
                      id="landline"
                      type="number"
                      required
                      tabIndex={1}
                      value={data.landline}
                      onChange={(e) => setData('landline', e.target.value)}
                      disabled={processing}
                      placeholder="Opening Balance"
                    />
                    <InputError message={errors.landline} className="mt-2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="pay_term_number">Pay term</Label>
                    <div className="grid grid-cols-2">
                      <div>
                        <Input
                          id="pay_term_number"
                          type="number"
                          tabIndex={1}
                          value={data.alternate_number}
                          onChange={(e) => setData('alternate_number', e.target.value)}
                          disabled={processing}
                        />
                        <InputError message={errors.alternate_number} className="mt-2" />
                      </div>
                      <div>
                        <Select defaultValue="months" onValueChange={(value: 'months' | 'days') => {
                          // setData('contact_type', value)
                          setSelectedPayTermType(value)
                        }}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="months">Months</SelectItem>
                            <SelectItem value="days">Days</SelectItem>
                          </SelectContent>
                        </Select>
                        <InputError message={errors.contact_type} className="mt-2" />
                      </div>
                    </div>
                  </div>

                  {selectedCustomerType != 'supplier' && <div className="grid gap-2">
                    <Label htmlFor="credit_limit">Credit Limit</Label>
                    <Input
                      id="credit_limit"
                      type="text"
                      required
                      tabIndex={1}
                      value={data.landline}
                      onChange={(e) => setData('landline', e.target.value)}
                      disabled={processing}
                      placeholder="Credit Limit"
                    />
                    <InputError message={errors.landline} className="mt-2" />
                  </div>}
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
                    {editingContact ? 'Update contact' : 'Save contact'}
                  </Button>
                </DialogFooter>
              </form>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {/* Customers Table */}
      <DynamicTable
        data={customers}
        columns={columns}
        enableRowSelection={false}
        enableSorting={true}
        enableFiltering={true}
        enableExport={true}
        searchPlaceholder="Search customers by name, business name, email, or contact ID..."
        pageSize={100}
        emptyMessage="No customers found."
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold">{customers.length}</div>
          <div className="text-muted-foreground text-sm">Total Customers</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{customers.filter((c) => c.status === 'active').length}</div>
          <div className="text-muted-foreground text-sm">Active Customers</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">
            {formatCurrency(customers.reduce((acc, customer) => acc + +customer.sell_return_paid, 0))}
          </div>
          <div className="text-muted-foreground text-sm">Total Sales Due</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency(customers.reduce((acc, customer) => acc + +customer.credit_limit, 0))}
          </div>
          <div className="text-muted-foreground text-sm">Total Credit Limit</div>
        </div>
      </div>
    </div>
  );
}
