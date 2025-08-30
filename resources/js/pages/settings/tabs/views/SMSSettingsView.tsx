import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  smsService: z.string().optional(),
  url: z.string().optional(),
  sendToParameterName: z.string().optional(),
  messageParameterName: z.string().optional(),
  requestMethod: z.string().optional(),

  // Headers
  header1Key: z.string().optional(),
  header1Value: z.string().optional(),
  header2Key: z.string().optional(),
  header2Value: z.string().optional(),
  header3Key: z.string().optional(),
  header3Value: z.string().optional(),

  // Parameters
  parameter1Key: z.string().optional(),
  parameter1Value: z.string().optional(),
  parameter2Key: z.string().optional(),
  parameter2Value: z.string().optional(),
  parameter3Key: z.string().optional(),
  parameter3Value: z.string().optional(),
  parameter4Key: z.string().optional(),
  parameter4Value: z.string().optional(),
  parameter5Key: z.string().optional(),
  parameter5Value: z.string().optional(),
  parameter6Key: z.string().optional(),
  parameter6Value: z.string().optional(),
  parameter7Key: z.string().optional(),
  parameter7Value: z.string().optional(),
  parameter8Key: z.string().optional(),
  parameter8Value: z.string().optional(),
  parameter9Key: z.string().optional(),
  parameter9Value: z.string().optional(),
  parameter10Key: z.string().optional(),
  parameter10Value: z.string().optional(),

  // Test
  testNumber: z.string().optional(),
});

const SMSSettingsView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      smsService: 'Other',
      url: '',
      sendToParameterName: 'to',
      messageParameterName: 'text',
      requestMethod: 'POST',

      // Headers
      header1Key: '',
      header1Value: '',
      header2Key: '',
      header2Value: '',
      header3Key: '',
      header3Value: '',

      // Parameters
      parameter1Key: '',
      parameter1Value: '',
      parameter2Key: '',
      parameter2Value: '',
      parameter3Key: '',
      parameter3Value: '',
      parameter4Key: '',
      parameter4Value: '',
      parameter5Key: '',
      parameter5Value: '',
      parameter6Key: '',
      parameter6Value: '',
      parameter7Key: '',
      parameter7Value: '',
      parameter8Key: '',
      parameter8Value: '',
      parameter9Key: '',
      parameter9Value: '',
      parameter10Key: '',
      parameter10Value: '',

      testNumber: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function handleSendTestSMS() {
    console.log('Sending test SMS...');
    // Add test SMS logic here
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SMS Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* SMS Service */}
            <FormField
              control={form.control}
              name="smsService"
              render={({ field }) => (
                <FormItem className="max-w-xs">
                  <FormLabel>SMS Service:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Other">Other</SelectItem>
                      <SelectItem value="Twilio">Twilio</SelectItem>
                      <SelectItem value="Nexmo">Nexmo</SelectItem>
                      <SelectItem value="AWS SNS">AWS SNS</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* URL and Parameters Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL:</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="URL" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sendToParameterName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Send to parameter name:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="messageParameterName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message parameter name:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requestMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request Method:</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Headers Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Headers</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name={`header${num}Key` as keyof z.infer<typeof formSchema>}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Header {num} key:</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={`Header ${num} key`} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`header${num}Value` as keyof z.infer<typeof formSchema>}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Header {num} value:</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={`Header ${num} value`} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Parameters Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Parameters</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <div key={num} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name={`parameter${num}Key` as keyof z.infer<typeof formSchema>}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parameter {num} key:</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={`Parameter ${num} value`} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`parameter${num}Value` as keyof z.infer<typeof formSchema>}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parameter {num} value:</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={`Parameter ${num} value`} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Test SMS Section */}
            <div className="flex items-end gap-4">
              <FormField
                control={form.control}
                name="testNumber"
                render={({ field }) => (
                  <FormItem className="flex-1 max-w-xs">
                    <FormControl>
                      <Input {...field} placeholder="Test Number" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="button"
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={handleSendTestSMS}
              >
                Send test SMS
              </Button>
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

export default SMSSettingsView;
