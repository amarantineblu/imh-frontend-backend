import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  cashDenominations: z.string().optional(),
  enableCashDenominationOn: z.string().optional(),
  enableCashDenominationForPaymentMethods: z.string().optional(),
  strictCheck: z.boolean().default(false),
});

const PaymentView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cashDenominations: '',
      enableCashDenominationOn: 'POS screen',
      enableCashDenominationForPaymentMethods: '',
      strictCheck: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Cash Denominations */}
            <FormField
              control={form.control}
              name="cashDenominations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cash Denominations:</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder=""
                      className="min-h-[60px]"
                    />
                  </FormControl>
                  <p className="text-sm text-gray-600 mt-1">
                    Comma separated values Example: 100,200,500,2000
                  </p>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Enable cash denomination on */}
              <FormField
                control={form.control}
                name="enableCashDenominationOn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enable cash denomination on:</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="POS screen">POS screen</SelectItem>
                        <SelectItem value="Sales screen">Sales screen</SelectItem>
                        <SelectItem value="Both">Both</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Enable cash denomination for payment methods */}
              <FormField
                control={form.control}
                name="enableCashDenominationForPaymentMethods"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enable cash denomination for payment methods:</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="" />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Strict check */}
              <FormField
                control={form.control}
                name="strictCheck"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 mt-8">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="flex items-center gap-1">
                      Strict check
                      <Info className="h-4 w-4 text-blue-500" />
                    </FormLabel>
                  </FormItem>
                )}
              />
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

export default PaymentView;
