import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  purchase: z.string().optional(),
  purchaseReturn: z.string().optional(),
  purchaseRequisition: z.string().optional(),
  purchaseOrder: z.string().optional(),
  stockTransfer: z.string().optional(),
  stockAdjustment: z.string().optional(),
  sellReturn: z.string().optional(),
  expenses: z.string().optional(),
  contacts: z.string().optional(),
  purchasePayment: z.string().optional(),
  sellPayment: z.string().optional(),
  expensePayment: z.string().optional(),
  businessLocation: z.string().optional(),
  username: z.string().optional(),
  subscriptionNo: z.string().optional(),
  draft: z.string().optional(),
  salesOrder: z.string().optional(),
});

const PrefixesView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purchase: 'PO',
      purchaseReturn: '',
      purchaseRequisition: '',
      purchaseOrder: '',
      stockTransfer: 'ST',
      stockAdjustment: 'SA',
      sellReturn: 'CN',
      expenses: 'EP',
      contacts: 'CO',
      purchasePayment: 'PP',
      sellPayment: 'SP',
      expensePayment: '',
      businessLocation: 'BL',
      username: '',
      subscriptionNo: '',
      draft: '',
      salesOrder: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prefixes Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* First Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="purchase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="purchaseOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase Order:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sellReturn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sell Return:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="purchasePayment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase Payment:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Location:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="draft"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Draft:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Second Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="purchaseReturn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase Return:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stockTransfer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Transfer:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expenses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expenses:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sellPayment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sell Payment:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salesOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sales Order:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Third Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="purchaseRequisition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase Requisition:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stockAdjustment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Adjustment:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contacts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contacts:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expensePayment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expense Payment:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subscriptionNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscription No.:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
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

export default PrefixesView;
