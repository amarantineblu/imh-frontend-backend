import React, { useState } from 'react';
import AuthLayout from '@/layouts/auth-layout';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type Currency, type Timezone, type Month, type AccountingMethod } from '@/types';
import { Head } from '@inertiajs/react';
import { useForm as useIForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

const businessSettingsDefault = {
  tax_label_1: '',
  tax_number_1: '',
  tax_label_2: '',
  tax_number_2: '',
  fy_start_month: '',
  accounting_method: '',
  time_zone: 'Asia/Kolkata',
}
      
const ownerDefault = {
  prefix: 'Mr',
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
  confirm_password: '',
}

const businessDefault = {
  business_name: '',
  start_date: '',
  currency_id: '',
  logo: null,
  website: '',
  mobile: '',
  alternate_number: '',
  country: '',
  state: '',
  city: '',
  zip_code: '',
  landmark: '',
}

type RegisterForm = typeof businessDefault & typeof businessSettingsDefault & typeof ownerDefault
export interface RegisterNewProp {
  currencies: Array<Currency>; 
  timezone_list: Array<Timezone>;
  months: Array<Month>;
  accounting_methods: Array<AccountingMethod>;
  package_id: string;
  system_settings: [];
}

export default function RegisterNew({currencies, timezone_list, months, accounting_methods}: RegisterNewProp) {
  const [step, setStep] = useState(0)
  const form = useForm<RegisterForm>({
    mode: 'onTouched',
    defaultValues: {
      ...businessDefault,
      ...businessSettingsDefault,
      ...ownerDefault,
    },
  })

  const nextStep = async () => {
    const valid = await form.trigger(step === 0 ? [
      'business_name', 'start_date', 'currency_id', 'country', 'state', 'city', 'zip_code', 'landmark'
    ] : step === 1 ? [
      'fy_start_month', 'accounting_method', 'time_zone'
    ] : [
      'prefix', 'first_name', 'username', 'password', 'confirm_password'
    ])
    if (valid) setStep((s) => s + 1)
  }
  const prevStep = () => setStep((s) => s - 1)

  const { transform, post, processing } = useIForm<RegisterForm>({
    ...businessDefault,
    ...businessSettingsDefault,
    ...ownerDefault
  });
  const onSubmit = (data: RegisterForm) => {
    transform(() => data);
    post(route('business.postRegister'), {
        preserveScroll: true,
        onError: (errors) => {
            console.error('Register Business Errors:', errors);
        },
    });
  }

  return (
    <AuthLayout title={"Register"} description={"Get Started in minutes"} left>
      <Head title="Register" />
      <Tabs className="w-full mx-auto bg-transparent px-4" value={String(step)} onValueChange={() => { }}>
        <TabsList className="w-full mb-2 gap-4">
          <TabsTrigger value="0" disabled={step !== 0}>Business Details</TabsTrigger>
          <TabsTrigger value="1" disabled={step < 1}>Business Settings</TabsTrigger>
          <TabsTrigger value="2" disabled={step < 2}>Owner Info</TabsTrigger>
        </TabsList>
        <Form {...form}>
          <ScrollArea className="h-[calc(100vh-200px)] sm:h-[calc(100vh-190px)]">
            <form onSubmit={form.handleSubmit(onSubmit)}>

              <TabsContent value="0" className="flex flex-col justify-between h-full items-baseline">
                {/* Business Details Step */}
                <div className="text-black grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField name="business_name" control={form.control} rules={{ required: 'Business Name is required' }}
                    render={({ field }) => (
                      <FormItem className="col-span-2 sm:col-span-1">
                        <FormLabel>Business Name*</FormLabel>
                        <FormControl><Input {...field} placeholder="Business Name" /></FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField name="currency_id" control={form.control} rules={{ required: 'Currency is required' }}
                    render={({ field }) => (
                      <FormItem className="col-span-2 sm:col-span-1">
                        <FormLabel>Currency*</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger><SelectValue placeholder="Select Currency" /></SelectTrigger>
                            <SelectContent className="max-w-[270px]">
                              {currencies.map((c) => (
                                <SelectItem key={c.value} value={c.value}>{c.text}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField name="website" control={form.control}
                    render={({ field }) => (
                      <FormItem className="col-span-2 sm:col-span-1">
                        <FormLabel>Website</FormLabel>
                        <FormControl><Input {...field} placeholder="Website" /></FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField name="landmark" control={form.control} rules={{ required: 'Landmark is required' }}
                    render={({ field }) => (
                      <FormItem className="col-span-2 sm:col-span-1">
                        <FormLabel>Landmark*</FormLabel>
                        <FormControl><Input {...field} placeholder="Landmark" /></FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                    <FormField name="mobile" control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business contact number</FormLabel>
                          <FormControl><Input {...field} placeholder="Business contact number" /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField name="alternate_number" control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alternate contact number</FormLabel>
                          <FormControl><Input {...field} placeholder="Alternate contact number" /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField name="country" control={form.control} rules={{ required: 'Country is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country*</FormLabel>
                          <FormControl><Input {...field} placeholder="Country" /></FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-2 grid grid-col-1 md:grid-cols-3 gap-2">
                      <FormField name="start_date" control={form.control} rules={{ required: 'Start Date is required' }}
                        render={({ field }) => (
                          <FormItem className="sm:col-span-1">
                            <FormLabel>Start Date</FormLabel>
                            <FormControl><Input className="sm:max-w-[150px]" {...field} type="date" /></FormControl>
                          </FormItem>
                        )}
                      />
                      <FormItem className={"col-span-1"}>
                        <FormLabel>Upload Logo</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById('logo-upload')?.click()}
                              className={
                                form.watch('logo')
                                  ? "border-primary text-primary w-full"
                                  : "border-gray-300 text-gray-500 w-full"
                              }
                            >
                              {form.watch('logo') ? "Change Logo" : "Upload Logo"}
                            </Button>

                            <Input
                              id="logo-upload"
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={e => form.setValue('logo', e.target.files?.[0] || null)}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    <FormField name="zip_code" control={form.control} rules={{ required: 'Zip Code is required' }}
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>Zip/Postal Code*</FormLabel>
                          <FormControl><Input {...field} placeholder="Zip/Postal Code" /></FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField name="state" control={form.control} rules={{ required: 'State is required' }}
                    render={({ field }) => (
                      <FormItem className="md:col-span-1">
                        <FormLabel>State*</FormLabel>
                        <FormControl><Input {...field} placeholder="State" /></FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField name="city" control={form.control} rules={{ required: 'City is required' }}
                    render={({ field }) => (
                      <FormItem >
                        <FormLabel>City*</FormLabel>
                        <FormControl><Input {...field} placeholder="City" /></FormControl>
                      </FormItem>
                    )}
                  />


                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button type="button" onClick={nextStep}>Next</Button>
                </div>
              </TabsContent>

              <TabsContent value="1" className="flex flex-col justify-between h-full">
                {/* Business Settings Step */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                  <FormField name="tax_label_1" control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax 1 Name</FormLabel>
                        <FormControl><Input {...field} placeholder="GST / VAT / Other" /></FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField name="tax_number_1" control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax 1 No.</FormLabel>
                        <FormControl><Input {...field} placeholder="Tax 1 No." /></FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField name="tax_label_2" control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax 2 Name</FormLabel>
                        <FormControl><Input {...field} placeholder="GST / VAT / Other" /></FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField name="tax_number_2" control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax 2 No.</FormLabel>
                        <FormControl><Input {...field} placeholder="Tax 2 No." /></FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField name="fy_start_month" control={form.control} rules={{ required: 'Financial year is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Financial year start month*</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger><SelectValue placeholder="Select Month" /></SelectTrigger>
                            <SelectContent>
                              {months.map((y) => (
                                <SelectItem key={y.value} value={y.value}>{y.text}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField name="accounting_method" control={form.control} rules={{ required: 'Stock Accounting Method is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Accounting Method*</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger><SelectValue placeholder="Select Method" /></SelectTrigger>
                            <SelectContent>
                              {accounting_methods.map((q) => (
                                <SelectItem key={q.value} value={q.value}>{q.text}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField name="time_zone" control={form.control} rules={{ required: 'Time zone is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time zone*</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger><SelectValue placeholder="Select Timezone" /></SelectTrigger>
                            <SelectContent>
                              {timezone_list.map((tz) => (
                                <SelectItem key={tz.value} value={tz.value}>{tz.text}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-between gap-2 mt-6">
                  <Button type="button" variant="secondary" onClick={prevStep}>Back</Button>
                  <Button type="button" onClick={nextStep}>Next</Button>
                </div>
              </TabsContent>

              <TabsContent value="2" className="flex flex-col justify-between h-full">
                {/* Owner Info Step */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                  <div className="w-full flex md:col-span-2 gap-2">
                    <FormField name="prefix" control={form.control} rules={{ required: 'Prefix is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prefix</FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="md:max-w-[100px]"><SelectValue placeholder="Prefix" /></SelectTrigger>
                              <SelectContent className="">
                                <SelectItem value="Mr">Mr</SelectItem>
                                <SelectItem value="Mrs">Mrs</SelectItem>
                                <SelectItem value="Miss">Miss</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="w-full flex-1 grid grid-cols-2 gap-2">
                      <FormField name="first_name" control={form.control} rules={{ required: 'First Name is required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name*</FormLabel>
                            <FormControl><Input {...field} placeholder="First Name" /></FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField name="last_name" control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl><Input {...field} placeholder="Last Name" /></FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <FormField name="username" control={form.control} rules={{ required: 'Username is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username*</FormLabel>
                        <FormControl><Input {...field} placeholder="Username" /></FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField name="email" control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input {...field} type="email" placeholder="Email" /></FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField name="password" control={form.control} rules={{ required: 'Password is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password*</FormLabel>
                        <FormControl><Input {...field} type="password" placeholder="Password" /></FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField name="confirm_password" control={form.control} rules={{ required: 'Confirm Password is required', validate: v => v === form.getValues('password') || 'Passwords do not match' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password*</FormLabel>
                        <FormControl><Input {...field} type="password" placeholder="Confirm Password" /></FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-between gap-2 mt-6">
                  <Button type="button" variant="secondary" onClick={prevStep}>Back</Button>
                  <Button type="submit" disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Register
                  </Button>
                </div>
              </TabsContent>
            </form>
          </ScrollArea>
        </Form>
      </Tabs>
    </AuthLayout>
  )
}
