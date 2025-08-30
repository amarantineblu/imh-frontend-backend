import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    productName: z.string().min(1, 'Product name is required'),
    sku: z.string().optional(),
    barcodeType: z.string().min(1, 'Barcode type is required'),
    unit: z.string().min(1, 'Unit is required'),
    brand: z.string().optional(),
    category: z.string().optional(),
    subCategory: z.string().optional(),
    businessLocation: z.string().default('IBIYEOMIE MEAT HOUSE (BL0001)'),
    manageStock: z.boolean().default(false),
    alertQuantity: z.number().min(0).optional(),
    weight: z.number().min(0).optional(),
    description: z.string().optional(),
    enableDescImei: z.boolean().default(false),
    notForSelling: z.boolean().default(false),
    customField1: z.string().optional(),
    customField2: z.string().optional(),
    customField3: z.string().optional(),
    customField4: z.string().optional(),
    serviceTimer: z.number().min(0).optional(),
    applicableTax: z.string().optional(),
    sellingPriceTaxType: z.enum(['exclusive', 'inclusive']).default('exclusive'),
    productType: z.enum(['single', 'variable', 'combo']).default('single'),
    purchasePrice: z.number().min(0, 'Purchase price is required'),
    margin: z.number().min(0).optional(),
    sellingPrice: z.number().min(0).optional(),
    excTax: z.number().min(0, 'Exc. tax is required'),
    incTax: z.number().min(0, 'Inc. tax is required'),
    productImage: z.any().optional(),
    productBrochure: z.any().optional(),
});

export default function AddProductTab() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productName: '',
            sku: '',
            barcodeType: '',
            unit: '',
            brand: '',
            category: '',
            subCategory: '',
            businessLocation: 'IBIYEOMIE MEAT HOUSE (BL0001)',
            manageStock: false,
            enableDescImei: false,
            notForSelling: false,
            sellingPriceTaxType: 'exclusive',
            productType: 'single',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Basic Information */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>Enter the basic details of the product</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="productName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Name *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter product name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="sku"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SKU</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Auto-generated or enter custom SKU" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="barcodeType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Barcode Type *</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select barcode type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="code128">Code 128</SelectItem>
                                                    <SelectItem value="code39">Code 39</SelectItem>
                                                    <SelectItem value="ean13">EAN-13</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="unit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Unit *</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select unit" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="pieces">Pieces</SelectItem>
                                                    <SelectItem value="kg">Kilogram</SelectItem>
                                                    <SelectItem value="liters">Liters</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="brand"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Brand</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select brand" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="brand1">TechBrand</SelectItem>
                                                    <SelectItem value="brand2">CoffeeMaster</SelectItem>
                                                    <SelectItem value="brand3">GameTech</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="electronics">Electronics</SelectItem>
                                                    <SelectItem value="clothing">Clothing</SelectItem>
                                                    <SelectItem value="food">Food & Beverages</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="subCategory"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sub Category</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter sub category" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="businessLocation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Business Locations</FormLabel>
                                            <FormControl>
                                                <Input {...field} readOnly />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="manageStock"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormLabel>Enable stock management at product level</FormLabel>
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="alertQuantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Alert quantity</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Alert quantity"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="weight"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Weight</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Weight"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter product description" rows={3} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-center space-x-4">
                                <FormField
                                    control={form.control}
                                    name="enableDescImei"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <FormLabel>Enable Product description, IMEI or Serial Number</FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="notForSelling"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <FormLabel>Not for selling</FormLabel>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Custom Fields */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {[1, 2, 3, 4].map((num) => (
                                    <FormField
                                        key={num}
                                        control={form.control}
                                        name={`customField${num}` as keyof z.infer<typeof formSchema>}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Custom Field{num}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={`Custom field ${num}`} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>

                            <FormField
                                control={form.control}
                                name="serviceTimer"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Service staff timer/Preparation time (In minutes)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Preparation time"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="applicableTax"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Applicable Tax</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select tax" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="vat">VAT</SelectItem>
                                                    <SelectItem value="gst">GST</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="sellingPriceTaxType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Selling Price Tax Type *</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-row space-x-4"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="exclusive" id="tax-exclusive" />
                                                        <Label htmlFor="tax-exclusive">Exclusive</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="inclusive" id="tax-inclusive" />
                                                        <Label htmlFor="tax-inclusive">Inclusive</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="productType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Type *</FormLabel>
                                        <FormControl>
                                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="single" id="type-single" />
                                                    <Label htmlFor="type-single">Single</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="variable" id="type-variable" />
                                                    <Label htmlFor="type-variable">Variable</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="combo" id="type-combo" />
                                                    <Label htmlFor="type-combo">Combo</Label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name="purchasePrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Default Purchase Price (Exc. tax) *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="0.00"
                                                    step="0.01"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="margin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>x Margin (%)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="0"
                                                    step="0.01"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="sellingPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Default Selling Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="0.00"
                                                    step="0.01"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="excTax"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Exc. tax *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="0.00"
                                                    step="0.01"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="incTax"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Inc. tax *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="0.00"
                                                    step="0.01"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product Image */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Image</CardTitle>
                            <CardDescription>Upload product image (Max 5MB, 1:1 aspect ratio)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border-muted-foreground/25 rounded-lg border-2 border-dashed p-6 text-center">
                                <Upload className="text-muted-foreground mx-auto h-12 w-12" />
                                <div className="mt-4">
                                    <Button type="button" variant="outline" size="sm">
                                        Choose File
                                    </Button>
                                    <p className="text-muted-foreground mt-2 text-sm">JPG, PNG up to 5MB, 1:1 aspect ratio</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <FormField
                                    control={form.control}
                                    name="productBrochure"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Brochure</FormLabel>
                                            <FormControl>
                                                <Input type="file" accept=".pdf,.csv,.zip,.doc,.docx,.jpeg,.jpg,.png" />
                                            </FormControl>
                                            <p className="text-muted-foreground mt-2 text-sm">
                                                Max File size: 5MB. Allowed: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
                                            </p>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>
                    <Button type="button" variant="secondary" className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save & Add Opening Stock
                    </Button>
                    <Button type="button" variant="destructive" className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save And Add Another
                    </Button>
                    <Button type="submit" className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    );
}
