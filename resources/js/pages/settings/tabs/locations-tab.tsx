import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useTableActions } from '@/hooks/use-table-actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Edit, MapPin, Plus, Settings, UserX } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

// Interface for business location data
interface BusinessLocation extends Record<string, unknown> {
  id: string;
  name: string;
  locationId: string;
  landmark: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  priceGroup: string;
  invoiceScheme: string;
  invoiceLayoutPOS: string;
  invoiceLayoutSale: string;
  mobile?: string;
  alternateContact?: string;
  email?: string;
  website?: string;
  customField1?: string;
  customField2?: string;
  customField3?: string;
  customField4?: string;
  featuredProducts?: string[];
  paymentMethods?: {
    cash: boolean;
    card: boolean;
    cheque: boolean;
    bankTransfer: boolean;
    other: boolean;
    pos: boolean;
    customPayment2: boolean;
    customPayment3: boolean;
    customPayment4: boolean;
    customPayment5: boolean;
    customPayment6: boolean;
    customPayment7: boolean;
  };
}

// Form schema for validation
const locationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  locationId: z.string().optional(),
  landmark: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(1, 'Zip Code is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  mobile: z.string().optional(),
  alternateContact: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  website: z.string().optional(),
  invoiceScheme: z.string().min(1, 'Invoice scheme is required'),
  invoiceLayoutPOS: z.string().min(1, 'Invoice layout for POS is required'),
  invoiceLayoutSale: z.string().min(1, 'Invoice layout for sale is required'),
  defaultSellingPriceGroup: z.string().optional(),
  customField1: z.string().optional(),
  customField2: z.string().optional(),
  customField3: z.string().optional(),
  customField4: z.string().optional(),
  // Payment methods
  cash: z.boolean().default(true),
  card: z.boolean().default(false),
  cheque: z.boolean().default(false),
  bankTransfer: z.boolean().default(false),
  other: z.boolean().default(false),
  pos: z.boolean().default(false),
  customPayment2: z.boolean().default(false),
  customPayment3: z.boolean().default(false),
  customPayment4: z.boolean().default(false),
  customPayment5: z.boolean().default(false),
  customPayment6: z.boolean().default(false),
  customPayment7: z.boolean().default(false),
});

// Mock data for business locations
const mockLocations: BusinessLocation[] = [
  {
    id: '1',
    name: 'IBIYEOMIE MEAT HOUSE',
    locationId: 'BL0001',
    landmark: 'PH',
    city: 'ph',
    zipCode: '1234',
    state: 'Rivers state',
    country: 'Nigeria',
    priceGroup: '',
    invoiceScheme: 'Default',
    invoiceLayoutPOS: 'Default',
    invoiceLayoutSale: 'Default',
    mobile: '+234 801 234 5678',
    email: 'info@ibiyeomiemeathouse.com',
    website: 'www.ibiyeomiemeathouse.com',
    paymentMethods: {
      cash: true,
      card: true,
      cheque: false,
      bankTransfer: true,
      other: false,
      pos: false,
      customPayment2: false,
      customPayment3: false,
      customPayment4: false,
      customPayment5: false,
      customPayment6: false,
      customPayment7: false,
    },
  },
];

export default function LocationsTab() {
  const [locations, setLocations] = useState<BusinessLocation[]>(mockLocations);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<BusinessLocation | null>(null);

  // Form setup
  const form = useForm<z.infer<typeof locationSchema>>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: '',
      locationId: '',
      landmark: '',
      city: '',
      zipCode: '',
      state: '',
      country: '',
      mobile: '',
      alternateContact: '',
      email: '',
      website: '',
      invoiceScheme: '',
      invoiceLayoutPOS: '',
      invoiceLayoutSale: '',
      defaultSellingPriceGroup: '',
      customField1: '',
      customField2: '',
      customField3: '',
      customField4: '',
      cash: true,
      card: false,
      cheque: false,
      bankTransfer: false,
      other: false,
      pos: false,
      customPayment2: false,
      customPayment3: false,
      customPayment4: false,
      customPayment5: false,
      customPayment6: false,
      customPayment7: false,
    },
  });

  // Table actions
  const { rowActions } = useTableActions<BusinessLocation>({
    onEdit: (location) => {
      setEditingLocation(location);
      // Pre-fill form with location data
      form.reset({
        name: location.name,
        locationId: location.locationId,
        landmark: location.landmark,
        city: location.city,
        zipCode: location.zipCode,
        state: location.state,
        country: location.country,
        mobile: location.mobile || '',
        alternateContact: location.alternateContact || '',
        email: location.email || '',
        website: location.website || '',
        invoiceScheme: location.invoiceScheme,
        invoiceLayoutPOS: location.invoiceLayoutPOS,
        invoiceLayoutSale: location.invoiceLayoutSale,
        defaultSellingPriceGroup: location.priceGroup,
        customField1: location.customField1 || '',
        customField2: location.customField2 || '',
        customField3: location.customField3 || '',
        customField4: location.customField4 || '',
        cash: location.paymentMethods?.cash || false,
        card: location.paymentMethods?.card || false,
        cheque: location.paymentMethods?.cheque || false,
        bankTransfer: location.paymentMethods?.bankTransfer || false,
        other: location.paymentMethods?.other || false,
        pos: location.paymentMethods?.pos || false,
        customPayment2: location.paymentMethods?.customPayment2 || false,
        customPayment3: location.paymentMethods?.customPayment3 || false,
        customPayment4: location.paymentMethods?.customPayment4 || false,
        customPayment5: location.paymentMethods?.customPayment5 || false,
        customPayment6: location.paymentMethods?.customPayment6 || false,
        customPayment7: location.paymentMethods?.customPayment7 || false,
      });
      setIsAddDialogOpen(true);
    },
    onDelete: (location) => {
      setLocations(locations.filter(l => l.id !== location.id));
      toast.success('Location deactivated successfully');
    },
  });

  // Define table columns
  const columns: TableColumn<BusinessLocation>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      sortable: true,
      cell: (value, row) => (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-blue-600" />
          <span className="font-medium">{value as string}</span>
        </div>
      ),
    },
    {
      accessorKey: 'locationId',
      header: 'Location ID',
      sortable: true,
      cell: (value) => <Badge variant="outline">{value as string}</Badge>,
    },
    {
      accessorKey: 'landmark',
      header: 'Landmark',
      sortable: true,
    },
    {
      accessorKey: 'city',
      header: 'City',
      sortable: true,
    },
    {
      accessorKey: 'zipCode',
      header: 'Zip Code',
      sortable: true,
    },
    {
      accessorKey: 'state',
      header: 'State',
      sortable: true,
    },
    {
      accessorKey: 'country',
      header: 'Country',
      sortable: true,
    },
    {
      accessorKey: 'priceGroup',
      header: 'Price Group',
      cell: (value) => (value as string) || '-',
    },
    {
      accessorKey: 'invoiceScheme',
      header: 'Invoice scheme',
    },
    {
      accessorKey: 'invoiceLayoutPOS',
      header: 'Invoice layout for POS',
    },
    {
      accessorKey: 'invoiceLayoutSale',
      header: 'Invoice layout for sale',
    },
    {
      type: 'actions',
      header: 'Action',
      buttons: [
        {
          label: 'Edit',
          icon: Edit,
          onClick: rowActions.onEdit,
          variant: 'outline',
          size: 'sm',
        },
        {
          label: 'Settings',
          icon: Settings,
          onClick: (location) => {
            toast.info(`Settings for ${location.name}`);
          },
          variant: 'outline',
          size: 'sm',
        },
        {
          label: 'Deactivate',
          icon: UserX,
          onClick: rowActions.onDelete,
          variant: 'destructive',
          size: 'sm',
        },
      ],
    },
  ];

  // Form submission handler
  const onSubmit = (values: z.infer<typeof locationSchema>) => {
    const newLocation: BusinessLocation = {
      id: editingLocation?.id || (locations.length + 1).toString(),
      name: values.name,
      locationId: values.locationId || `BL${String(locations.length + 1).padStart(4, '0')}`,
      landmark: values.landmark || '',
      city: values.city,
      zipCode: values.zipCode,
      state: values.state,
      country: values.country,
      priceGroup: values.defaultSellingPriceGroup || '',
      invoiceScheme: values.invoiceScheme,
      invoiceLayoutPOS: values.invoiceLayoutPOS,
      invoiceLayoutSale: values.invoiceLayoutSale,
      mobile: values.mobile,
      alternateContact: values.alternateContact,
      email: values.email,
      website: values.website,
      customField1: values.customField1,
      customField2: values.customField2,
      customField3: values.customField3,
      customField4: values.customField4,
      paymentMethods: {
        cash: values.cash,
        card: values.card,
        cheque: values.cheque,
        bankTransfer: values.bankTransfer,
        other: values.other,
        pos: values.pos,
        customPayment2: values.customPayment2,
        customPayment3: values.customPayment3,
        customPayment4: values.customPayment4,
        customPayment5: values.customPayment5,
        customPayment6: values.customPayment6,
        customPayment7: values.customPayment7,
      },
    };

    if (editingLocation) {
      setLocations(locations.map(l => l.id === editingLocation.id ? newLocation : l));
      toast.success('Location updated successfully');
    } else {
      setLocations([...locations, newLocation]);
      toast.success('Location added successfully');
    }

    setIsAddDialogOpen(false);
    setEditingLocation(null);
    form.reset();
  };

  const resetForm = () => {
    form.reset();
    setEditingLocation(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Business Locations</h2>
        <p className="text-muted-foreground">Manage your business locations</p>
      </div>

      {/* Locations Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              All your business locations
            </CardTitle>
            <Dialog
              open={isAddDialogOpen}
              onOpenChange={(open) => {
                setIsAddDialogOpen(open);
                if (!open) resetForm();
              }}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Business Location
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[90vh]">
                <DialogHeader>
                  <DialogTitle>
                    {editingLocation ? 'Edit Business Location' : 'Add a new business location'}
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name:*</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="locationId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location ID:</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Location ID" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="landmark"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Landmark:</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Landmark" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City:*</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="City" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Zip Code:*</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Zip Code" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State:*</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="State" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country:*</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Country" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="mobile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mobile:</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Mobile" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="alternateContact"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Alternate contact number:</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Alternate contact number" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email:</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" placeholder="Email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website:</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Website" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator />

                      {/* Invoice Settings */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="invoiceScheme"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Invoice scheme:*</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Please Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Default">Default</SelectItem>
                                  <SelectItem value="Custom">Custom</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="invoiceLayoutPOS"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Invoice layout for POS:*</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Please Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Default">Default</SelectItem>
                                  <SelectItem value="Compact">Compact</SelectItem>
                                  <SelectItem value="Detailed">Detailed</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="invoiceLayoutSale"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Invoice layout for sale:*</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Please Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Default">Default</SelectItem>
                                  <SelectItem value="Compact">Compact</SelectItem>
                                  <SelectItem value="Detailed">Detailed</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="defaultSellingPriceGroup"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Default Selling Price Group:</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Please Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Default">Default</SelectItem>
                                  <SelectItem value="Wholesale">Wholesale</SelectItem>
                                  <SelectItem value="Retail">Retail</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator />

                      {/* Custom Fields */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Custom Fields</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[1, 2, 3, 4].map((num) => (
                            <FormField
                              key={num}
                              control={form.control}
                              name={`customField${num}` as keyof z.infer<typeof locationSchema>}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Custom field {num}:</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder={`Custom field ${num}`} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* POS Screen Featured Products */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">POS screen Featured Products:</h3>
                        <div className="text-sm text-muted-foreground">
                          Select products to feature on the POS screen for this location
                        </div>
                        {/* This would typically be a multi-select or searchable dropdown */}
                        <Textarea 
                          placeholder="Featured products (comma-separated)"
                          className="min-h-[60px]"
                        />
                      </div>

                      <Separator />

                      {/* Payment Options */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Payment Options:</h3>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <FormField
                              control={form.control}
                              name="cash"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <FormLabel>Cash</FormLabel>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="card"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <FormLabel>Card</FormLabel>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="cheque"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <FormLabel>Cheque</FormLabel>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="bankTransfer"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <FormLabel>Bank Transfer</FormLabel>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="space-y-3">
                            <FormField
                              control={form.control}
                              name="other"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <FormLabel>Other</FormLabel>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="pos"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <FormLabel>POS</FormLabel>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="customPayment2"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <FormLabel>Custom Payment 2</FormLabel>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="customPayment3"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <FormLabel>Custom Payment 3</FormLabel>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="space-y-3">
                            <FormField
                              control={form.control}
                              name="customPayment4"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <FormLabel>Custom Payment 4</FormLabel>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="customPayment5"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <FormLabel>Custom Payment 5</FormLabel>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="customPayment6"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <FormLabel>Custom Payment 6</FormLabel>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="customPayment7"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <FormLabel>Custom Payment 7</FormLabel>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </Form>
                </ScrollArea>
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                    {editingLocation ? 'Update Location' : 'Save Location'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <DynamicTable
            data={locations}
            columns={columns}
            enableRowSelection={false}
            enablePagination={true}
            enableSorting={true}
            enableFiltering={true}
            searchPlaceholder="Search ..."
            pageSize={100}
            emptyMessage="No business locations found"
          />
        </CardContent>
      </Card>
    </div>
  );
}
