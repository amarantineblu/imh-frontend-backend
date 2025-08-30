import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  skuPrefix: z.string().optional(),
  enableProductExpiry: z.boolean().default(false),
  productExpiryType: z.string().optional(),
  enableBrands: z.boolean().default(true),
  enableCategories: z.boolean().default(true),
  enableSubCategories: z.boolean().default(true),
  enablePriceTaxInfo: z.boolean().default(true),
  defaultUnit: z.string().optional(),
  enableSubUnits: z.boolean().default(false),
  enableRacks: z.boolean().default(false),
  enableRow: z.boolean().default(false),
  enablePosition: z.boolean().default(false),
  enableWarranty: z.boolean().default(false),
  isProductImageRequired: z.boolean().default(false),
});

const ProductView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skuPrefix: '',
      enableProductExpiry: false,
      productExpiryType: 'add_expiry',
      enableBrands: true,
      enableCategories: true,
      enableSubCategories: true,
      enablePriceTaxInfo: true,
      defaultUnit: '',
      enableSubUnits: false,
      enableRacks: false,
      enableRow: false,
      enablePosition: false,
      enableWarranty: false,
      isProductImageRequired: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* SKU Prefix */}
                <FormField
                  control={form.control}
                  name="skuPrefix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU prefix:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Enable Brands */}
                <FormField
                  control={form.control}
                  name="enableBrands"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Enable Brands</FormLabel>
                    </FormItem>
                  )}
                />

                {/* Enable Price & Tax info */}
                <FormField
                  control={form.control}
                  name="enablePriceTaxInfo"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Enable Price & Tax info</FormLabel>
                    </FormItem>
                  )}
                />

                {/* Enable Racks */}
                <FormField
                  control={form.control}
                  name="enableRacks"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="flex items-center gap-1">
                        Enable Racks
                        <Info className="h-4 w-4 text-blue-500" />
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Enable Warranty */}
                <FormField
                  control={form.control}
                  name="enableWarranty"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Enable Warranty</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Enable Product Expiry */}
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="enableProductExpiry"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="flex items-center gap-1">
                          Enable Product Expiry:
                          <Info className="h-4 w-4 text-blue-500" />
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  {/* Product Expiry Type Select */}
                  <FormField
                    control={form.control}
                    name="productExpiryType"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Add item expiry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="add_expiry">Add item expiry</SelectItem>
                              <SelectItem value="track_expiry">Track expiry only</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Enable Categories */}
                <FormField
                  control={form.control}
                  name="enableCategories"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Enable Categories</FormLabel>
                    </FormItem>
                  )}
                />

                {/* Enable Sub-Categories */}
                <FormField
                  control={form.control}
                  name="enableSubCategories"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Enable Sub-Categories</FormLabel>
                    </FormItem>
                  )}
                />

                {/* Default Unit */}
                <div className="space-y-2">
                  <Label>Default Unit:</Label>
                  <FormField
                    control={form.control}
                    name="defaultUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Please Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pieces">Pieces</SelectItem>
                              <SelectItem value="kg">Kilogram</SelectItem>
                              <SelectItem value="liters">Liters</SelectItem>
                              <SelectItem value="meters">Meters</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Enable Sub Units */}
                <FormField
                  control={form.control}
                  name="enableSubUnits"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="flex items-center gap-1">
                        Enable Sub Units
                        <Info className="h-4 w-4 text-blue-500" />
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Enable Row */}
                <FormField
                  control={form.control}
                  name="enableRow"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Enable Row</FormLabel>
                    </FormItem>
                  )}
                />

                {/* Enable Position */}
                <FormField
                  control={form.control}
                  name="enablePosition"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Enable Position</FormLabel>
                    </FormItem>
                  )}
                />

                {/* Is product image required */}
                <FormField
                  control={form.control}
                  name="isProductImageRequired"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Is product image required?</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button type="submit">
                Save Settings
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductView;
