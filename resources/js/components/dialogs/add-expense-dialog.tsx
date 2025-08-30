import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface ExpenseData {
  businessLocation: string;
  expenseCategory: string;
  referenceNo: string;
  date: string;
  expenseFor: string;
  applicableTax: string;
  totalAmount: string;
  expenseNote: string;
  paymentAmount: string;
  paidOn: string;
  paymentMethod: string;
  paymentNote: string;
}

interface AddExpenseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expenseData: ExpenseData) => void;
}

export default function AddExpenseDialog({ isOpen, onClose, onSave }: AddExpenseDialogProps) {
  const [formData, setFormData] = useState({
    businessLocation: 'IBIYEOMIE MEAT HOUSE',
    expenseCategory: '',
    referenceNo: '',
    date: '07/04/2025 16:49',
    expenseFor: '',
    applicableTax: 'None',
    totalAmount: '',
    expenseNote: '',
    paymentAmount: '0.00',
    paidOn: '07/04/2025 16:49',
    paymentMethod: 'Cash',
    paymentNote: '',
  });

  const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const paymentDue = parseFloat(formData.totalAmount || '0') - parseFloat(formData.paymentAmount || '0');

  const handleSave = () => {
    onSave(formData);
    onClose();
    // Reset form
    setFormData({
      businessLocation: 'IBIYEOMIE MEAT HOUSE',
      expenseCategory: '',
      referenceNo: '',
      date: getCurrentDateTime(),
      expenseFor: '',
      applicableTax: 'None',
      totalAmount: '',
      expenseNote: '',
      paymentAmount: '0.00',
      paidOn: getCurrentDateTime(),
      paymentMethod: 'Cash',
      paymentNote: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Expense</DialogTitle>
          <DialogDescription>
            Create a new expense entry for your business
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Business Location */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="businessLocation" className="text-right">
              Business Location:*
            </Label>
            <div className="col-span-3">
              <Select 
                value={formData.businessLocation} 
                onValueChange={(value) => handleInputChange('businessLocation', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IBIYEOMIE MEAT HOUSE">IBIYEOMIE MEAT HOUSE</SelectItem>
                  <SelectItem value="Branch 2">Branch 2</SelectItem>
                  <SelectItem value="Branch 3">Branch 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Expense Category */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expenseCategory" className="text-right">
              Expense Category:
            </Label>
            <div className="col-span-3">
              <Select 
                value={formData.expenseCategory} 
                onValueChange={(value) => handleInputChange('expenseCategory', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="supplies">Supplies</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="office">Office Expenses</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reference No */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="referenceNo" className="text-right">
              Reference No:
            </Label>
            <div className="col-span-3">
              <Input
                id="referenceNo"
                placeholder="Leave empty to autogenerate"
                value={formData.referenceNo}
                onChange={(e) => handleInputChange('referenceNo', e.target.value)}
              />
            </div>
          </div>

          {/* Date */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date:*
            </Label>
            <div className="col-span-3">
              <Input
                id="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
            </div>
          </div>

          {/* Expense for */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expenseFor" className="text-right">
              Expense for:
            </Label>
            <div className="col-span-3">
              <Select 
                value={formData.expenseFor} 
                onValueChange={(value) => handleInputChange('expenseFor', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Applicable Tax */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="applicableTax" className="text-right">
              Applicable Tax:
            </Label>
            <div className="col-span-3">
              <Select 
                value={formData.applicableTax} 
                onValueChange={(value) => handleInputChange('applicableTax', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="VAT 7.5%">VAT 7.5%</SelectItem>
                  <SelectItem value="VAT 5%">VAT 5%</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Total Amount */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalAmount" className="text-right">
              Total amount:*
            </Label>
            <div className="col-span-3">
              <Input
                id="totalAmount"
                placeholder="Total amount"
                type="number"
                step="0.01"
                value={formData.totalAmount}
                onChange={(e) => handleInputChange('totalAmount', e.target.value)}
              />
            </div>
          </div>

          {/* Expense Note */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expenseNote" className="text-right">
              Expense note:
            </Label>
            <div className="col-span-3">
              <Textarea
                id="expenseNote"
                placeholder="Add notes about this expense..."
                value={formData.expenseNote}
                onChange={(e) => handleInputChange('expenseNote', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Payment Section */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Add payment:</h3>

            {/* Payment Amount */}
            <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <Label htmlFor="paymentAmount" className="text-right">
                Amount:*
              </Label>
              <div className="col-span-3">
                <Input
                  id="paymentAmount"
                  type="number"
                  step="0.01"
                  value={formData.paymentAmount}
                  onChange={(e) => handleInputChange('paymentAmount', e.target.value)}
                />
              </div>
            </div>

            {/* Paid On */}
            <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <Label htmlFor="paidOn" className="text-right">
                Paid on:*
              </Label>
              <div className="col-span-3">
                <Input
                  id="paidOn"
                  value={formData.paidOn}
                  onChange={(e) => handleInputChange('paidOn', e.target.value)}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <Label htmlFor="paymentMethod" className="text-right">
                Payment Method:*
              </Label>
              <div className="col-span-3">
                <Select 
                  value={formData.paymentMethod} 
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Card">Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Payment Note */}
            <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <Label htmlFor="paymentNote" className="text-right">
                Payment note:
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="paymentNote"
                  placeholder="Add payment notes..."
                  value={formData.paymentNote}
                  onChange={(e) => handleInputChange('paymentNote', e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            {/* Payment Due */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">
                Payment due:
              </Label>
              <div className="col-span-3">
                <Badge variant={paymentDue > 0 ? "destructive" : "default"} className="text-lg px-3 py-1">
                  ₦{paymentDue.toFixed(2)}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!formData.totalAmount || !formData.businessLocation}>
            Save Expense
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
