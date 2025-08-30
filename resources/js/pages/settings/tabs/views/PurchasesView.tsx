import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  enableEditingProductPriceFromPurchaseScreen: z.boolean().default(true),
  enablePurchaseStatus: z.boolean().default(true),
  enableLotNumber: z.boolean().default(false),
  enablePurchaseOrder: z.boolean().default(false),
  enablePurchaseRequisition: z.boolean().default(false),
});

const PurchasesView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableEditingProductPriceFromPurchaseScreen: true,
      enablePurchaseStatus: true,
      enableLotNumber: false,
      enablePurchaseOrder: false,
      enablePurchaseRequisition: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchases Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Enable editing product price from purchase screen */}
                <FormField
                  control={form.control}
                  name="enableEditingProductPriceFromPurchaseScreen"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="flex items-center gap-1">
                        Enable editing product price from purchase screen
                        <Info className="h-4 w-4 text-blue-500" />
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Enable Lot number */}
                <FormField
                  control={form.control}
                  name="enableLotNumber"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="flex items-center gap-1">
                        Enable Lot number
                        <Info className="h-4 w-4 text-blue-500" />
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Enable Purchase Requisition */}
                <FormField
                  control={form.control}
                  name="enablePurchaseRequisition"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="flex items-center gap-1">
                        Enable Purchase Requisition
                        <Info className="h-4 w-4 text-blue-500" />
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Enable Purchase Status */}
                <FormField
                  control={form.control}
                  name="enablePurchaseStatus"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="flex items-center gap-1">
                        Enable Purchase Status
                        <Info className="h-4 w-4 text-blue-500" />
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Enable purchase order */}
                <FormField
                  control={form.control}
                  name="enablePurchaseOrder"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="flex items-center gap-1">
                        Enable purchase order
                        <Info className="h-4 w-4 text-blue-500" />
                      </FormLabel>
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

export default PurchasesView;
