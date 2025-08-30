import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ExpenseForm {
  businessLocation: string;
  category: string;
  subCategory: string;
  reference: string;
  date: Date | undefined;
  expenseFor: string;
  expenseForContact: string;
  receiptFile: File | null;
  tax: string;
  totalAmount: string;
  expenseNote: string;
  isRefund: boolean;
  isRecurring: boolean;
  recurringInterval: string;
  recurringIntervalType: 'Days' | 'Weeks' | 'Months' | 'Years';
  repetitions: string;
  paymentAmount: string;
  paymentDate: Date | undefined;
  paymentMethod: 'cash' | 'bank_transfer' | 'card' | 'check' | '';
  paymentNote: string;
  paymentDue: string;
}

const businessLocations = ['Main Office', 'Branch A', 'Branch B'];
const expenseCategories = [
  'Office Supplies',
  'Equipment',
  'Travel',
  'Utilities',
  'Marketing',
  'Software',
  'Rent',
  'Insurance',
  'Legal & Professional',
  'Maintenance',
  'Fuel',
  'Telecommunications',
  'Training',
  'Entertainment',
  'Other',
];
const subCategories = ['Stationery', 'IT Hardware', 'Accommodation', 'Electricity', 'Digital Advertising', 'Other'];
const taxOptions = ['None', 'VAT 7.5%', 'GST 5%', 'Sales Tax 10%'];

export default function AddExpenseTab() {
  const [form, setForm] = useState<ExpenseForm>({
    businessLocation: '',
    category: '',
    subCategory: '',
    reference: '',
    date: new Date(),
    expenseFor: '',
    expenseForContact: '',
    receiptFile: null,
    tax: 'None',
    totalAmount: '',
    expenseNote: '',
    isRefund: false,
    isRecurring: false,
    recurringInterval: '',
    recurringIntervalType: 'Days',
    repetitions: '',
    paymentAmount: '',
    paymentDate: new Date(),
    paymentMethod: '',
    paymentNote: '',
    paymentDue: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isPaymentDateOpen, setIsPaymentDateOpen] = useState(false);

  const handleInputChange = (field: keyof ExpenseForm, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload PDF, JPEG, or PNG files only');
        return;
      }

      setForm((prev) => ({ ...prev, receiptFile: file }));
      toast.success('Receipt uploaded successfully');
    }
  };

  const removeFile = () => {
    setForm((prev) => ({ ...prev, receiptFile: null }));
  };

  const validateForm = () => {
    const errors = [];

    if (!form.totalAmount || parseFloat(form.totalAmount) <= 0) {
      errors.push('Total amount is required and must be greater than 0');
    }

    if (!form.businessLocation) {
      errors.push('Business location is required');
    }

    if (!form.category) {
      errors.push('Category is required');
    }

    if (!form.subCategory) {
      errors.push('Sub category is required');
    }

    if (!form.date) {
      errors.push('Date is required');
    }

    if (!form.paymentMethod) {
      errors.push('Payment method is required');
    }

    if (!form.reference.trim()) {
      errors.push('Reference number is required');
    }

    return errors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate expense reference
      const reference = `EXP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

      toast.success(`Expense ${reference} created successfully!`);

      // Reset form
      setForm({
        businessLocation: '',
        category: '',
        subCategory: '',
        reference: '',
        date: new Date(),
        expenseFor: '',
        expenseForContact: '',
        receiptFile: null,
        tax: 'None',
        totalAmount: '',
        expenseNote: '',
        isRefund: false,
        isRecurring: false,
        recurringInterval: '',
        recurringIntervalType: 'Days',
        repetitions: '',
        paymentAmount: '',
        paymentDate: new Date(),
        paymentMethod: '',
        paymentNote: '',
        paymentDue: '',
      });
    } catch (error) {
      toast.error('Failed to create expense. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'cash':
        return 'Cash';
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'card':
        return 'Card';
      case 'check':
        return 'Check';
      default:
        return method;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>
                  Business Location<span className="text-red-500">*</span>
                </Label>
                <Select
                  value={form.businessLocation}
                  onValueChange={(value) => handleInputChange('businessLocation', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  Expense Category<span className="text-red-500">*</span>
                </Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  Sub category<span className="text-red-500">*</span>
                </Label>
                <Select
                  value={form.subCategory}
                  onValueChange={(value) => handleInputChange('subCategory', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sub category" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategories.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Reference No</Label>
                <Input
                  value={form.reference}
                  onChange={(e) => handleInputChange('reference', e.target.value)}
                  placeholder="Leave empty to autogenerate"
                />
                <span className="text-xs text-muted-foreground">Leave empty to autogenerate</span>
              </div>
              <div className="space-y-2">
                <Label>
                  Date<span className="text-red-500">*</span>
                </Label>
                <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.date ? format(form.date, 'MM/dd/yyyy HH:mm') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={form.date}
                      onSelect={(date) => {
                        handleInputChange('date', date);
                        setIsDateOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Expense for</Label>
                <Input
                  value={form.expenseFor}
                  onChange={(e) => handleInputChange('expenseFor', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Expense for contact</Label>
                <Input
                  value={form.expenseForContact}
                  onChange={(e) => handleInputChange('expenseForContact', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Attach Document</Label>
                <Input
                  type="file"
                  accept=".pdf,.csv,.zip,.doc,.docx,.jpeg,.jpg,.png"
                  onChange={handleFileUpload}
                />
                <span className="text-xs text-muted-foreground">
                  Max File size: 5MB. Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
                </span>
              </div>
              <div className="space-y-2">
                <Label>Applicable Tax</Label>
                <Select
                  value={form.tax}
                  onValueChange={(value) => handleInputChange('tax', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    {taxOptions.map((tax) => (
                      <SelectItem key={tax} value={tax}>
                        {tax}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  Total amount<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={form.totalAmount}
                  onChange={(e) => handleInputChange('totalAmount', e.target.value)}
                  placeholder="Total amount"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Expense note</Label>
                <Textarea
                  value={form.expenseNote}
                  onChange={(e) => handleInputChange('expenseNote', e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4 md:col-span-2">
                <Label>
                  <Input
                    type="checkbox"
                    checked={form.isRefund}
                    onChange={(e) => handleInputChange('isRefund', e.target.checked)}
                  />{' '}
                  Is refund?
                </Label>
                <Label>
                  <Input
                    type="checkbox"
                    checked={form.isRecurring}
                    onChange={(e) => handleInputChange('isRecurring', e.target.checked)}
                  />{' '}
                  Is Recurring?
                </Label>
              </div>
              {form.isRecurring && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
                  <div className="space-y-2">
                    <Label>
                      Recurring interval<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      value={form.recurringInterval}
                      onChange={(e) => handleInputChange('recurringInterval', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>&nbsp;</Label>
                    <Select
                      value={form.recurringIntervalType}
                      onValueChange={(value) => handleInputChange('recurringIntervalType', value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Days">Days</SelectItem>
                        <SelectItem value="Weeks">Weeks</SelectItem>
                        <SelectItem value="Months">Months</SelectItem>
                        <SelectItem value="Years">Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>No. of Repetitions</Label>
                    <Input
                      type="number"
                      min=""
                      value={form.repetitions}
                      onChange={(e) => handleInputChange('repetitions', e.target.value)}
                      placeholder="If blank expense will be generated infinite times"
                    />
                  </div>
                </div>
              )}
            </div>
            {/* Add Payment Section */}
            <div className="mt-8 border-t pt-6">
              <h3 className="font-semibold mb-4">Add payment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>
                    Amount<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={form.paymentAmount}
                    onChange={(e) => handleInputChange('paymentAmount', e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    Paid on<span className="text-red-500">*</span>
                  </Label>
                  <Popover open={isPaymentDateOpen} onOpenChange={setIsPaymentDateOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.paymentDate ? format(form.paymentDate, 'MM/dd/yyyy HH:mm') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={form.paymentDate}
                        onSelect={(date) => {
                          handleInputChange('paymentDate', date);
                          setIsPaymentDateOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>
                    Payment Method<span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={form.paymentMethod}
                    onValueChange={(value) => handleInputChange('paymentMethod', value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                  <Label>Payment note</Label>
                  <Textarea
                    value={form.paymentNote}
                    onChange={(e) => handleInputChange('paymentNote', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Payment due</Label>
                  <Input
                    type="number"
                    min="0"
                    value={form.paymentDue}
                    onChange={(e) => handleInputChange('paymentDue', e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <Button
                type="reset"
                variant="outline"
                onClick={() =>
                  setForm({
                    businessLocation: '',
                    category: '',
                    subCategory: '',
                    reference: '',
                    date: new Date(),
                    expenseFor: '',
                    expenseForContact: '',
                    receiptFile: null,
                    tax: 'None',
                    totalAmount: '',
                    expenseNote: '',
                    isRefund: false,
                    isRecurring: false,
                    recurringInterval: '',
                    recurringIntervalType: 'Days',
                    repetitions: '',
                    paymentAmount: '',
                    paymentDate: new Date(),
                    paymentMethod: '',
                    paymentNote: '',
                    paymentDue: '',
                  })
                }
              >
                Reset
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white">
                {isSubmitting ? 'Saving...' : 'Save Expense'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
