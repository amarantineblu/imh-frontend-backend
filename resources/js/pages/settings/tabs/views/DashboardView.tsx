import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  viewStockExpiryAlertFor: z.number().min(1, 'Must be at least 1 day').default(30),
});

const DashboardView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      viewStockExpiryAlertFor: 30,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* View Stock Expiry Alert For */}
            <FormField
              control={form.control}
              name="viewStockExpiryAlertFor"
              render={({ field }) => (
                <FormItem className="max-w-xs">
                  <FormLabel className="flex items-center gap-1">
                    View Stock Expiry Alert For:*
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="number"
                          min="1"
                          className="pl-10 w-24"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 30)}
                        />
                      </div>
                      <span className="text-sm text-gray-600">Days</span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

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

export default DashboardView;
