import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  purchases: z.boolean().default(false),
  addSale: z.boolean().default(true),
  pos: z.boolean().default(true),
  stockTransfers: z.boolean().default(false),
  stockAdjustment: z.boolean().default(false),
  expenses: z.boolean().default(true),
  account: z.boolean().default(false),
  tables: z.boolean().default(false),
  modifiers: z.boolean().default(false),
  serviceStaff: z.boolean().default(false),
  enableBookings: z.boolean().default(false),
  kitchenForRestaurants: z.boolean().default(false),
  enableSubscription: z.boolean().default(false),
  typesOfService: z.boolean().default(false),
});

const ModulesView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purchases: false,
      addSale: true,
      pos: true,
      stockTransfers: false,
      stockAdjustment: false,
      expenses: true,
      account: false,
      tables: false,
      modifiers: false,
      serviceStaff: false,
      enableBookings: false,
      kitchenForRestaurants: false,
      enableSubscription: false,
      typesOfService: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enable/Disable Modules</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* First Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="purchases"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Purchases</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stockTransfers"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Stock Transfers</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="account"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Account</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="serviceStaff"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="flex items-center gap-1">
                        Service staff
                        <Info className="h-4 w-4 text-blue-500" />
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enableSubscription"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Enable Subscription</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {/* Second Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="addSale"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Add Sale</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stockAdjustment"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Stock Adjustment</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tables"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="flex items-center gap-1">
                        Tables
                        <Info className="h-4 w-4 text-blue-500" />
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enableBookings"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Enable Bookings</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="typesOfService"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="flex items-center gap-1">
                        Types of service
                        <Info className="h-4 w-4 text-blue-500" />
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {/* Third Column */}
              <div className="space-y-4">
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
                  name="expenses"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Expenses</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="modifiers"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="flex items-center gap-1">
                        Modifiers
                        <Info className="h-4 w-4 text-blue-500" />
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kitchenForRestaurants"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Kitchen (For restaurants)</FormLabel>
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

export default ModulesView;
