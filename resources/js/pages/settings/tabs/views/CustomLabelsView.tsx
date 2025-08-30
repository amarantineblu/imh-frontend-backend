import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  // Custom Payments
  customPayment1: z.string().optional(),
  customPayment2: z.string().optional(),
  customPayment3: z.string().optional(),
  customPayment4: z.string().optional(),
  customPayment5: z.string().optional(),
  customPayment6: z.string().optional(),
  customPayment7: z.string().optional(),

  // Contact Custom Fields
  contactField1: z.string().optional(),
  contactField2: z.string().optional(),
  contactField3: z.string().optional(),
  contactField4: z.string().optional(),
  contactField5: z.string().optional(),
  contactField6: z.string().optional(),
  contactField7: z.string().optional(),
  contactField8: z.string().optional(),
  contactField9: z.string().optional(),
  contactField10: z.string().optional(),

  // Product Custom Fields
  productField1: z.string().optional(),
  productField2: z.string().optional(),
  productField3: z.string().optional(),
  productField4: z.string().optional(),

  // Location Custom Fields
  locationField1: z.string().optional(),
  locationField2: z.string().optional(),
  locationField3: z.string().optional(),
  locationField4: z.string().optional(),

  // User Custom Fields
  userField1: z.string().optional(),
  userField2: z.string().optional(),
  userField3: z.string().optional(),
  userField4: z.string().optional(),

  // Purchase Custom Fields
  purchaseField1: z.string().optional(),
  purchaseField1Required: z.boolean().default(false),
  purchaseField2: z.string().optional(),
  purchaseField2Required: z.boolean().default(false),
  purchaseField3: z.string().optional(),
  purchaseField3Required: z.boolean().default(false),
  purchaseField4: z.string().optional(),
  purchaseField4Required: z.boolean().default(false),

  // Purchase Shipping Custom Fields
  purchaseShippingField1: z.string().optional(),
  purchaseShippingField1Required: z.boolean().default(false),
  purchaseShippingField2: z.string().optional(),
  purchaseShippingField2Required: z.boolean().default(false),
  purchaseShippingField3: z.string().optional(),
  purchaseShippingField3Required: z.boolean().default(false),
  purchaseShippingField4: z.string().optional(),
  purchaseShippingField4Required: z.boolean().default(false),
  purchaseShippingField5: z.string().optional(),
  purchaseShippingField5Required: z.boolean().default(false),

  // Sell Custom Fields
  sellField1: z.string().optional(),
  sellField1Required: z.boolean().default(false),
  sellField2: z.string().optional(),
  sellField2Required: z.boolean().default(false),
  sellField3: z.string().optional(),
  sellField3Required: z.boolean().default(false),
  sellField4: z.string().optional(),
  sellField4Required: z.boolean().default(false),

  // Sale Shipping Custom Fields
  saleShippingField1: z.string().optional(),
  saleShippingField1Required: z.boolean().default(false),
  saleShippingField1Default: z.boolean().default(false),
  saleShippingField2: z.string().optional(),
  saleShippingField2Required: z.boolean().default(false),
  saleShippingField2Default: z.boolean().default(false),
  saleShippingField3: z.string().optional(),
  saleShippingField3Required: z.boolean().default(false),
  saleShippingField3Default: z.boolean().default(false),
  saleShippingField4: z.string().optional(),
  saleShippingField4Required: z.boolean().default(false),
  saleShippingField4Default: z.boolean().default(false),
  saleShippingField5: z.string().optional(),
  saleShippingField5Required: z.boolean().default(false),
  saleShippingField5Default: z.boolean().default(false),

  // Types of Service Custom Fields
  serviceField1: z.string().optional(),
  serviceField2: z.string().optional(),
  serviceField3: z.string().optional(),
  serviceField4: z.string().optional(),
  serviceField5: z.string().optional(),
  serviceField6: z.string().optional(),
});

const CustomLabelsView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customPayment1: 'POS',
      sellField1: 'TALLY NUMBER',
      sellField1Required: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Labels</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Labels for custom payments */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Labels for custom payments:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <FormField
                    key={`customPayment${num}`}
                    control={form.control}
                    name={`customPayment${num}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Payment {num}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Labels for contact custom fields */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Labels for contact custom fields:</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <FormField
                    key={`contactField${num}`}
                    control={form.control}
                    name={`contactField${num}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Field {num}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Labels for product custom fields */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Labels for product custom fields:</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <FormField
                    key={`productField${num}`}
                    control={form.control}
                    name={`productField${num}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Field{num}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Labels for location custom fields */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Labels for location custom fields:</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <FormField
                    key={`locationField${num}`}
                    control={form.control}
                    name={`locationField${num}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom field {num}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Labels for user custom fields */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Labels for user custom fields:</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <FormField
                    key={`userField${num}`}
                    control={form.control}
                    name={`userField${num}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom field {num}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Label for purchase custom fields */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Label for purchase custom fields:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((num) => (
                  <div key={`purchaseField${num}`} className="space-y-2">
                    <FormField
                      control={form.control}
                      name={`purchaseField${num}` as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Field{num}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`purchaseField${num}Required` as any}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel>Is required</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Labels for purchase shipping custom fields */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Labels for purchase shipping custom fields:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={`purchaseShippingField${num}`} className="space-y-2">
                    <FormField
                      control={form.control}
                      name={`purchaseShippingField${num}` as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Field {num}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`purchaseShippingField${num}Required` as any}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel>Is required</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Labels for sell custom fields */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Labels for sell custom fields:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((num) => (
                  <div key={`sellField${num}`} className="space-y-2">
                    <FormField
                      control={form.control}
                      name={`sellField${num}` as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Field{num}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`sellField${num}Required` as any}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel>Is required</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Labels for sale shipping custom fields */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Labels for sale shipping custom fields:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={`saleShippingField${num}`} className="space-y-2">
                    <FormField
                      control={form.control}
                      name={`saleShippingField${num}` as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Field {num} {num === 4 && <span className="text-red-500">*</span>}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center space-x-4">
                      <FormField
                        control={form.control}
                        name={`saleShippingField${num}Required` as any}
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel>Is required</FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`saleShippingField${num}Default` as any}
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel>Is default for contact</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Labels for types of service custom fields */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Labels for types of service custom fields:</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <FormField
                    key={`serviceField${num}`}
                    control={form.control}
                    name={`serviceField${num}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Field {num}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
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

export default CustomLabelsView;
