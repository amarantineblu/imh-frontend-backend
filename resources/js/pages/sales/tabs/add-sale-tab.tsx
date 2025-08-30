import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar, CalendarIcon, Plus, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import AddNewContactDialog from './add-new-contact-dialog';
import AddNewProductDialog from './add-new-product';

// Define the schema
const addSaleSchema = z.object({
    customer: z.string().min(1, 'Customer is required'),
    billingAddress: z.string().optional(),
    shippingAddress: z.string().optional(),
    payTerm: z.string().optional(),
    saleDate: z.date({ required_error: 'Sale date is required' }),
    status: z.string().min(1, 'Status is required'),
    invoiceScheme: z.string().optional(),
    invoiceNo: z.string().optional(),
    tallyNumber: z.string().min(1, 'Tally number is required'),
    discountType: z.string().min(1, 'Discount type is required'),
    discountAmount: z.number().min(0, 'Discount amount must be positive'),
    orderTax: z.string().min(1, 'Order tax is required'),
    sellNote: z.string().optional(),
    shippingCharges: z.number().min(0).optional(),
    shippingStatus: z.string().optional(),
    deliveredTo: z.string().optional(),
    paymentAmount: z.number().min(0, 'Payment amount must be positive'),
    paidOn: z.date({ required_error: 'Payment date is required' }),
    paymentMethod: z.string().min(1, 'Payment method is required'),
    paymentNote: z.string().optional(),
});

interface SaleItem {
    id: string;
    product: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    subtotal: number;
}

export default function AddSalePage() {
    const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
    const [documents, setDocuments] = useState<File[]>([]);
    const [shippingDocuments, setShippingDocuments] = useState<File[]>([]);

    const form = useForm<z.infer<typeof addSaleSchema>>({
        resolver: zodResolver(addSaleSchema),
        defaultValues: {
            customer: '',
            billingAddress: 'Walk-In Customer',
            shippingAddress: 'Walk-In Customer',
            saleDate: new Date(),
            discountAmount: 0,
            shippingCharges: 0,
            paymentAmount: 0,
            paidOn: new Date(),
        },
    });

    // Calculate totals
    const itemsTotal = saleItems.reduce((sum, item) => sum + item.subtotal, 0);
    const discountAmount = form.watch('discountAmount') || 0;
    const orderTaxAmount = 0; // Calculate based on tax rate
    const shippingCharges = form.watch('shippingCharges') || 0;
    const totalPayable = itemsTotal - discountAmount + orderTaxAmount + shippingCharges;
    const paymentAmount = form.watch('paymentAmount') || 0;
    const balance = totalPayable - paymentAmount;
    const changeReturn = paymentAmount > totalPayable ? paymentAmount - totalPayable : 0;

    // Table columns for sale items
    const itemColumns: TableColumn<SaleItem>[] = [
        {
            accessorKey: 'product',
            header: 'Product',
            cell: (value) => <span className="font-medium">{String(value)}</span>,
        },
        {
            accessorKey: 'quantity',
            header: 'Quantity',
            cell: (value) => String(value),
        },
        {
            accessorKey: 'unitPrice',
            header: 'Unit Price',
            cell: (value) => `₦${Number(value).toFixed(2)}`,
        },
        {
            accessorKey: 'discount',
            header: 'Discount',
            cell: (value) => `₦${Number(value).toFixed(2)}`,
        },
        {
            accessorKey: 'subtotal',
            header: 'Subtotal',
            cell: (value) => `₦${Number(value).toFixed(2)}`,
        },
        {
            type: 'actions',
            header: 'Actions',
            buttons: [
                {
                    label: 'Remove',
                    icon: Trash2,
                    onClick: (item: SaleItem) => {
                        setSaleItems((prev) => prev.filter((i) => i.id !== item.id));
                    },
                    className: 'text-destructive hover:text-destructive',
                },
            ],
        },
    ];

    const addNewItem = () => {
        const newItem: SaleItem = {
            id: Math.random().toString(36).substr(2, 9),
            product: '',
            quantity: 1,
            unitPrice: 0,
            discount: 0,
            subtotal: 0,
        };
        setSaleItems((prev) => [...prev, newItem]);
    };

    const handleFileUpload = (files: FileList | null, type: 'documents' | 'shipping') => {
        if (!files) return;
        const fileArray = Array.from(files);
        if (type === 'documents') {
            setDocuments((prev) => [...prev, ...fileArray]);
        } else {
            setShippingDocuments((prev) => [...prev, ...fileArray]);
        }
    };

    const onSubmit = (values: z.infer<typeof addSaleSchema>) => {
        // TODO: Implement save functionality
        console.log('Form values:', values);
        console.log('Sale items:', saleItems);
        console.log('Documents:', documents);
        console.log('Shipping documents:', shippingDocuments);
    };

    return (
        <div className="container mx-auto space-y-6 py-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Add Sale</h1>
                <Button form="add-sale-form" type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Sale
                </Button>
            </div>

            <Form {...form}>
                <form id="add-sale-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Customer Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Information</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="customer"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Customer *</FormLabel>
                                        <div className="flex gap-5">
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl className="flex-1">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select customer" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="walk-in">Walk-In Customer</SelectItem>
                                                    <SelectItem value="john-doe">John Doe</SelectItem>
                                                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <AddNewContactDialog />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="billingAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Billing Address</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Enter billing address" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="shippingAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Shipping Address</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Enter shipping address" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="payTerm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pay Term</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select pay term" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="cash">Cash</SelectItem>
                                                <SelectItem value="30-days">30 Days</SelectItem>
                                                <SelectItem value="60-days">60 Days</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Sale Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Sale Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <FormField
                                control={form.control}
                                name="saleDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Sale Date *</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                                                    >
                                                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status *</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="final">Final</SelectItem>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="pending">Pending</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="invoiceScheme"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Invoice Scheme</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select scheme" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="default">Default</SelectItem>
                                                <SelectItem value="custom">Custom</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="invoiceNo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Invoice No.</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Keep blank to auto generate" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tallyNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tally Number *</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter tally number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div>
                                <Label>Attach Document</Label>
                                <div className="mt-2">
                                    <Input
                                        type="file"
                                        multiple
                                        accept=".pdf,.csv,.zip,.doc,.docx,.jpeg,.jpg,.png"
                                        onChange={(e) => handleFileUpload(e.target.files, 'documents')}
                                        className="file:bg-primary file:text-primary-foreground file:mr-2 file:rounded file:border-0 file:px-2 file:py-1"
                                    />
                                    <p className="text-muted-foreground mt-1 text-xs">
                                        Max File size: 5MB. Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Products */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Products</CardTitle>
                                <AddNewProductDialog />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <DynamicTable data={saleItems} columns={itemColumns} pageSize={100} searchPlaceholder="Search products..." />

                            <div className="mt-4 flex justify-end space-x-4">
                                <div className="text-sm">
                                    <span className="font-medium">Items: {saleItems.length}</span>
                                </div>
                                <div className="text-sm">
                                    <span className="font-medium">Total: ₦{itemsTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Discount and Tax */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Discount & Tax</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="discountType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Discount Type *</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select discount type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="fixed">Fixed</SelectItem>
                                                <SelectItem value="percentage">Percentage</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="discountAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Discount Amount *</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                placeholder="0.00"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="orderTax"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Order Tax *</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select tax" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="none">No Tax</SelectItem>
                                                <SelectItem value="vat-7.5">VAT (7.5%)</SelectItem>
                                                <SelectItem value="vat-5">VAT (5%)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-2">
                                <Label>Summary</Label>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span>Discount Amount:</span>
                                        <span className="text-red-600">(-) ₦{discountAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Order Tax:</span>
                                        <span className="text-green-600">(+) ₦{orderTaxAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sell Note */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Additional Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="sellNote"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sell Note</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Enter any additional notes" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Shipping Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="shippingCharges"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Shipping Charges</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                placeholder="0.00"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="shippingStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Shipping Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="ordered">Ordered</SelectItem>
                                                <SelectItem value="packed">Packed</SelectItem>
                                                <SelectItem value="shipped">Shipped</SelectItem>
                                                <SelectItem value="delivered">Delivered</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="deliveredTo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Delivered To</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter recipient name" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div>
                                <Label>Shipping Documents</Label>
                                <div className="mt-2">
                                    <Input
                                        type="file"
                                        multiple
                                        accept=".pdf,.csv,.zip,.doc,.docx,.jpeg,.jpg,.png"
                                        onChange={(e) => handleFileUpload(e.target.files, 'shipping')}
                                        className="file:bg-primary file:text-primary-foreground file:mr-2 file:rounded file:border-0 file:px-2 file:py-1"
                                    />
                                    <p className="text-muted-foreground mt-1 text-xs">
                                        Max File size: 5MB. Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-muted rounded-lg p-4">
                                <div className="text-lg font-semibold">Total Payable: ₦{totalPayable.toFixed(2)}</div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label className="text-base font-medium">Add Payment</Label>
                                    <div className="mt-2 space-y-2 text-sm">
                                        <div>Advance Balance: ₦ 0.00</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="paymentAmount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Amount *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                        placeholder="0.00"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="paidOn"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Paid On *</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    'w-full pl-3 text-left font-normal',
                                                                    !field.value && 'text-muted-foreground',
                                                                )}
                                                            >
                                                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="paymentMethod"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Payment Method *</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select payment method" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="cash">Cash</SelectItem>
                                                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                                                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                                                        <SelectItem value="cheque">Cheque</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="paymentNote"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Payment Note</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} placeholder="Enter payment notes" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="rounded-lg bg-green-50 p-3">
                                    <div className="text-sm text-green-700">Change Return:</div>
                                    <div className="text-lg font-semibold text-green-800">₦ {changeReturn.toFixed(2)}</div>
                                </div>
                                <div className="rounded-lg bg-red-50 p-3">
                                    <div className="text-sm text-red-700">Balance:</div>
                                    <div className="text-lg font-semibold text-red-800">₦ {balance.toFixed(2)}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
