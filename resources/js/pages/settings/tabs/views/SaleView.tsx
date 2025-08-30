import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  defaultSaleDiscount: z.string().optional(),
  defaultSaleTax: z.string().optional(),
  salesItemAdditionMethod: z.string().optional(),
  amountRoundingMethod: z.string().optional(),
  salesPriceIsMinimum: z.boolean().default(false),
  allowOverselling: z.boolean().default(false),
  enableSalesOrder: z.boolean().default(false),
  isPayTermRequired: z.boolean().default(false),
  salesCommissionAgent: z.string().optional(),
  commissionCalculationType: z.string().optional(),
  isCommissionAgentRequired: z.boolean().default(false),
  enablePaymentLink: z.boolean().default(false),
  razorpayKeyId: z.string().optional(),
  razorpayKeySecret: z.string().optional(),
  stripePublicKey: z.string().optional(),
  stripeSecretKey: z.string().optional(),
});

const SaleView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      defaultSaleDiscount: '0.00',
      defaultSaleTax: 'None',
      salesItemAdditionMethod: 'increase_item_quantity',
      amountRoundingMethod: 'None',
      salesPriceIsMinimum: false,
      allowOverselling: false,
      enableSalesOrder: false,
      isPayTermRequired: false,
      salesCommissionAgent: 'Disable',
      commissionCalculationType: 'Invoice value',
      isCommissionAgentRequired: false,
      enablePaymentLink: false,
      razorpayKeyId: '',
      razorpayKeySecret: '',
      stripePublicKey: '',
      stripeSecretKey: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sale Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Default Sale Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Default Sale Discount */}
              <FormField
                control={form.control}
                name="defaultSaleDiscount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Sale Discount:*</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">%</span>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          className="max-w-24"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Default Sale Tax */}
              <FormField
                control={form.control}
                name="defaultSaleTax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Default Sale Tax:
                      <Info className="h-4 w-4 text-blue-500" />
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="VAT-7.5">VAT (7.5%)</SelectItem>
                        <SelectItem value="VAT-5">VAT (5%)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sales Item Addition Method */}
              <FormField
                control={form.control}
                name="salesItemAdditionMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sales Item Addition Method:</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="increase_item_quantity">Increase item quantity if it already exists</SelectItem>
                        <SelectItem value="add_new_row">Add as new row</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Amount Rounding Method */}
              <FormField
                control={form.control}
                name="amountRoundingMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Amount rounding method:
                      <Info className="h-4 w-4 text-blue-500" />
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="round_to_nearest">Round to nearest</SelectItem>
                        <SelectItem value="round_up">Round up</SelectItem>
                        <SelectItem value="round_down">Round down</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sales Price is Minimum */}
              <FormField
                control={form.control}
                name="salesPriceIsMinimum"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 mt-8">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="flex items-center gap-1">
                      Sales price is minimum selling price
                      <Info className="h-4 w-4 text-blue-500" />
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Allow Overselling */}
              <FormField
                control={form.control}
                name="allowOverselling"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 mt-8">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="flex items-center gap-1">
                      Allow Overselling
                      <Info className="h-4 w-4 text-blue-500" />
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Enable Sales Order */}
              <FormField
                control={form.control}
                name="enableSalesOrder"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="flex items-center gap-1">
                      Enable Sales Order
                      <Info className="h-4 w-4 text-blue-500" />
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Is Pay Term Required */}
              <FormField
                control={form.control}
                name="isPayTermRequired"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Is pay term required?</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Commission Agent Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Commission Agent:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sales Commission Agent */}
                <FormField
                  control={form.control}
                  name="salesCommissionAgent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Sales Commission Agent:
                        <Info className="h-4 w-4 text-blue-500" />
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Disable">Disable</SelectItem>
                          <SelectItem value="Enable">Enable</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Commission Calculation Type */}
                <FormField
                  control={form.control}
                  name="commissionCalculationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Commission Calculation Type:
                        <Info className="h-4 w-4 text-blue-500" />
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Invoice value">Invoice value</SelectItem>
                          <SelectItem value="Payment received">Payment received</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Is Commission Agent Required */}
                <FormField
                  control={form.control}
                  name="isCommissionAgentRequired"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 mt-8">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Is commission agent required?</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Payment Link Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold">Payment Link</h3>
                <Info className="h-4 w-4 text-blue-500" />
              </div>
              <FormField
                control={form.control}
                name="enablePaymentLink"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Enable payment link</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Razorpay Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Razorpay: <span className="text-sm font-normal text-gray-600">(For INR India)</span></h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="razorpayKeyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key ID:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Razorpay Key ID" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="razorpayKeySecret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Secret:</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="Enter Razorpay Key Secret" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Stripe Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Stripe:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="stripePublicKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stripe public key:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Stripe Public Key" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stripeSecretKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stripe secret key:</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="Enter Stripe Secret Key" />
                      </FormControl>
                      <FormMessage />
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

export default SaleView;
