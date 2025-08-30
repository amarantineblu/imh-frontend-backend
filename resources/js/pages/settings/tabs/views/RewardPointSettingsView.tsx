import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  enableRewardPoint: z.boolean().default(false),
  rewardPointDisplayName: z.string().optional(),

  // Earning Points Settings
  amountSpendForUnitPoint: z.string().optional(),
  minimumOrderTotalToEarnReward: z.string().optional(),
  maximumPointsPerOrder: z.string().optional(),

  // Redeem Points Settings
  redeemAmountPerUnitPoint: z.string().optional(),
  minimumOrderTotalToRedeemPoints: z.string().optional(),
  minimumRedeemPoint: z.string().optional(),
  maximumRedeemPointPerOrder: z.string().optional(),
  rewardPointExpiryPeriod: z.string().optional(),
  rewardPointExpiryUnit: z.string().optional(),
});

const RewardPointSettingsView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableRewardPoint: false,
      rewardPointDisplayName: '',

      // Earning Points Settings
      amountSpendForUnitPoint: '1.00',
      minimumOrderTotalToEarnReward: '1.00',
      maximumPointsPerOrder: '',

      // Redeem Points Settings
      redeemAmountPerUnitPoint: '1.00',
      minimumOrderTotalToRedeemPoints: '1.00',
      minimumRedeemPoint: '',
      maximumRedeemPointPerOrder: '',
      rewardPointExpiryPeriod: '',
      rewardPointExpiryUnit: 'Year',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reward Point Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Enable Reward Point and Display Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="enableRewardPoint"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Enable Reward Point</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rewardPointDisplayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reward Point Display Name:</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Reward Point Display Name" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Earning Points Settings */}
            <div className="bg-gray-50 dark:bg-white/10 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Earning Points Settings:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="amountSpendForUnitPoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Amount spend for unit point:
                        <Info className="h-4 w-4 text-blue-500" />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minimumOrderTotalToEarnReward"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Minimum order total to earn reward:
                        <Info className="h-4 w-4 text-blue-500" />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maximumPointsPerOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Maximum points per order:
                        <Info className="h-4 w-4 text-blue-500" />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Maximum points per order" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Redeem Points Settings */}
            <div className="bg-gray-50 dark:bg-white/10 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Redeem Points Settings:</h3>
              <div className="space-y-4">
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="redeemAmountPerUnitPoint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          Redeem amount per unit point:
                          <Info className="h-4 w-4 text-blue-500" />
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="minimumOrderTotalToRedeemPoints"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          Minimum order total to redeem points:
                          <Info className="h-4 w-4 text-blue-500" />
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="minimumRedeemPoint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          Minimum redeem point:
                          <Info className="h-4 w-4 text-blue-500" />
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Minimum redeem point" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="maximumRedeemPointPerOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          Maximum redeem point per order:
                          <Info className="h-4 w-4 text-blue-500" />
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Maximum redeem point per order" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="rewardPointExpiryPeriod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            Reward Point expiry period:
                            <Info className="h-4 w-4 text-blue-500" />
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Reward Point expiry period" />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rewardPointExpiryUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="opacity-0">Unit</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Day">Day</SelectItem>
                              <SelectItem value="Week">Week</SelectItem>
                              <SelectItem value="Month">Month</SelectItem>
                              <SelectItem value="Year">Year</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
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

export default RewardPointSettingsView;
