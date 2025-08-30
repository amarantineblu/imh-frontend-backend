import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  // Keyboard Shortcuts
  expressCheckout: z.string().optional(),
  payAndCheckout: z.string().optional(),
  draft: z.string().optional(),
  cancel: z.string().optional(),
  goToProductQuantity: z.string().optional(),
  weighingScale: z.string().optional(),
  editDiscount: z.string().optional(),
  editOrderTax: z.string().optional(),
  addPaymentRow: z.string().optional(),
  finalizePayment: z.string().optional(),
  addNewProduct: z.string().optional(),

  // POS Settings
  disableMultiplePay: z.boolean().default(false),
  disableDraft: z.boolean().default(true),
  disableExpressCheckout: z.boolean().default(false),
  dontShowProductSuggestion: z.boolean().default(false),
  dontShowRecentTransactions: z.boolean().default(false),
  disableDiscount: z.boolean().default(false),
  disableOrderTax: z.boolean().default(true),
  subtotalEditable: z.boolean().default(true),
  disableSuspendSale: z.boolean().default(false),
  enableTransactionDateOnPOS: z.boolean().default(false),
  enableServiceStaffInProductLine: z.boolean().default(false),
  enableWeighingScale: z.boolean().default(false),
  isServiceStaffRequired: z.boolean().default(false),
  disableCreditSaleButton: z.boolean().default(false),
  printInvoiceOnSuspend: z.boolean().default(false),
  showInvoiceScheme: z.boolean().default(false),
  showInvoiceLayoutDropdown: z.boolean().default(false),
  showPricingOnProductSuggestionTooltip: z.boolean().default(false),

  // Weighing Scale Barcode Settings
  prefix: z.string().optional(),
  productSkuLength: z.string().optional(),
  quantityIntegerPartLength: z.string().optional(),
  quantityFractionalPartLength: z.string().optional(),
});

const POSView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Keyboard Shortcuts
      expressCheckout: 'shift+e',
      payAndCheckout: 'shift+p',
      draft: 'shift+d',
      cancel: 'shift+c',
      goToProductQuantity: 'f2',
      weighingScale: '',
      editDiscount: 'shift+i',
      editOrderTax: 'shift+t',
      addPaymentRow: 'shift+r',
      finalizePayment: 'shift+f',
      addNewProduct: 'f4',

      // POS Settings
      disableMultiplePay: false,
      disableDraft: true,
      disableExpressCheckout: false,
      dontShowProductSuggestion: false,
      dontShowRecentTransactions: false,
      disableDiscount: false,
      disableOrderTax: true,
      subtotalEditable: true,
      disableSuspendSale: false,
      enableTransactionDateOnPOS: false,
      enableServiceStaffInProductLine: false,
      enableWeighingScale: false,
      isServiceStaffRequired: false,
      disableCreditSaleButton: false,
      printInvoiceOnSuspend: false,
      showInvoiceScheme: false,
      showInvoiceLayoutDropdown: false,
      showPricingOnProductSuggestionTooltip: false,

      // Weighing Scale Barcode Settings
      prefix: '',
      productSkuLength: '5',
      quantityIntegerPartLength: '4',
      quantityFractionalPartLength: '3',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>POS Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Add keyboard shortcuts section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Add keyboard shortcuts:</h3>
              <p className="text-sm  mb-4">
                Shortcut should be the names of the keys separated by '+'. Example: <code className="bg-white/10 px-1 rounded">ctrl+shift+h, ctrl+h</code>
              </p>
              <p className="text-sm  mb-4">
                <strong>Available key names are:</strong><br />
                shift, ctrl, alt, backspace, tab, enter, return, capslock, esc, escape, space, pageup, pagedown, end, home,<br />
                left, up, right, down, ins, del, and plus
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Label className="font-medium">Operations</Label>
                    <Label className="font-medium">Keyboard Shortcut</Label>
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>Express Checkout:</Label>
                    <FormField
                      control={form.control}
                      name="expressCheckout"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>Pay & Checkout:</Label>
                    <FormField
                      control={form.control}
                      name="payAndCheckout"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>Draft:</Label>
                    <FormField
                      control={form.control}
                      name="draft"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>Cancel:</Label>
                    <FormField
                      control={form.control}
                      name="cancel"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>Go to product quantity:</Label>
                    <FormField
                      control={form.control}
                      name="goToProductQuantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>Weighing Scale:</Label>
                    <FormField
                      control={form.control}
                      name="weighingScale"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Label className="font-medium">Operations</Label>
                    <Label className="font-medium">Keyboard Shortcut</Label>
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>Edit Discount:</Label>
                    <FormField
                      control={form.control}
                      name="editDiscount"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>Edit Order Tax:</Label>
                    <FormField
                      control={form.control}
                      name="editOrderTax"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>Add Payment Row:</Label>
                    <FormField
                      control={form.control}
                      name="addPaymentRow"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>Finalize Payment:</Label>
                    <FormField
                      control={form.control}
                      name="finalizePayment"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>Add new product:</Label>
                    <FormField
                      control={form.control}
                      name="addNewProduct"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* POS Settings */}
            <div>
              <h3 className="text-lg font-semibold mb-4">POS settings:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1 */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="disableMultiplePay"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Disable Multiple Pay</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dontShowProductSuggestion"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Don't show product suggestion</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="disableOrderTax"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Disable order tax</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="enableTransactionDateOnPOS"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Enable transaction date on POS screen</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isServiceStaffRequired"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Is service staff required</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="showInvoiceScheme"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Show invoice scheme</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="showPricingOnProductSuggestionTooltip"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Show pricing on product suggestion tooltip</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="disableDraft"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Disable Draft</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dontShowRecentTransactions"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Don't show recent transactions</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subtotalEditable"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="flex items-center gap-1">
                          Subtotal Editable
                          <Info className="h-4 w-4 text-blue-500" />
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="enableServiceStaffInProductLine"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="flex items-center gap-1">
                          Enable service staff in product line
                          <Info className="h-4 w-4 text-blue-500" />
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="disableCreditSaleButton"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="flex items-center gap-1">
                          Disable credit sale button
                          <Info className="h-4 w-4 text-blue-500" />
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="showInvoiceLayoutDropdown"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Show invoice layout dropdown</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Column 3 */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="disableExpressCheckout"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Disable Express Checkout</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="disableDiscount"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Disable Discount</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="disableSuspendSale"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Disable Suspend Sale</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="enableWeighingScale"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Enable Weighing Scale</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="printInvoiceOnSuspend"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Print invoice on suspend</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Weighing Scale barcode Setting */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Weighing Scale barcode Setting:</h3>
              <p className="text-sm  mb-4">Configure barcode as per your weighing scale.</p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <FormField
                  control={form.control}
                  name="prefix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prefix:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productSkuLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product sku length:</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="6">6</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantityIntegerPartLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity integer part length:</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantityFractionalPartLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity fractional part length:</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                        </SelectContent>
                      </Select>
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

export default POSView;
