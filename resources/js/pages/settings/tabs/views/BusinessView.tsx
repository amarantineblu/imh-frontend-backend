import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Info, Upload } from 'lucide-react';

const BusinessView = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Business Name */}
          <div className="space-y-2">
            <Label htmlFor="business-name" className="flex items-center gap-1">
              Business Name: <span className="text-red-500">*</span>
            </Label>
            <Input
              id="business-name"
              defaultValue="IBIYEOMIE MEAT HOUSE"
              className="w-full"
            />
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date:</Label>
            <div className="relative">
              <Input
                id="start-date"
                defaultValue="04/23/2023"
                className="w-full pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Default Profit Percent */}
          <div className="space-y-2">
            <Label htmlFor="profit-percent" className="flex items-center gap-1">
              Default profit percent: <span className="text-red-500">*</span>
              <Info className="h-4 w-4 text-blue-500" />
            </Label>
            <Input
              id="profit-percent"
              defaultValue="25.00"
              className="w-full"
            />
          </div>

          {/* Currency */}
          <div className="space-y-2">
            <Label htmlFor="currency">Currency:</Label>
            <Select defaultValue="nigeria-naira">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nigeria-naira">🇳🇬 Nigeria - Nairas(NGN)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Currency Symbol Placement */}
          <div className="space-y-2">
            <Label htmlFor="currency-placement">Currency Symbol Placement:</Label>
            <Select defaultValue="before-amount">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="before-amount">Before amount</SelectItem>
                <SelectItem value="after-amount">After amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Time Zone */}
          <div className="space-y-2">
            <Label htmlFor="timezone">Time zone:</Label>
            <Select defaultValue="africa-lagos">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="africa-lagos">🌍 Africa/Lagos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Upload Logo */}
          <div className="space-y-2">
            <Label htmlFor="logo">Upload Logo:</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Browse...
              </Button>
            </div>
            <p className="text-sm text-gray-500 italic">
              Previous logo (if exists) will be replaced
            </p>
          </div>

          {/* Financial Year Start Month */}
          <div className="space-y-2">
            <Label htmlFor="financial-year" className="flex items-center gap-1">
              Financial year start month:
              <Info className="h-4 w-4 text-blue-500" />
            </Label>
            <div className="relative">
              <Select defaultValue="january">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january">January</SelectItem>
                  <SelectItem value="february">February</SelectItem>
                  <SelectItem value="march">March</SelectItem>
                  <SelectItem value="april">April</SelectItem>
                  <SelectItem value="may">May</SelectItem>
                  <SelectItem value="june">June</SelectItem>
                  <SelectItem value="july">July</SelectItem>
                  <SelectItem value="august">August</SelectItem>
                  <SelectItem value="september">September</SelectItem>
                  <SelectItem value="october">October</SelectItem>
                  <SelectItem value="november">November</SelectItem>
                  <SelectItem value="december">December</SelectItem>
                </SelectContent>
              </Select>
              <Calendar className="absolute right-8 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Stock Accounting Method */}
          <div className="space-y-2">
            <Label htmlFor="stock-accounting" className="flex items-center gap-1">
              Stock Accounting Method: <span className="text-red-500">*</span>
              <Info className="h-4 w-4 text-blue-500" />
            </Label>
            <Select defaultValue="fifo">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fifo">FIFO (First In First Out)</SelectItem>
                <SelectItem value="lifo">LIFO (Last In First Out)</SelectItem>
                <SelectItem value="average">Average Cost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transaction Edit Days */}
          <div className="space-y-2">
            <Label htmlFor="edit-days" className="flex items-center gap-1">
              Transaction Edit Days: <span className="text-red-500">*</span>
              <Info className="h-4 w-4 text-blue-500" />
            </Label>
            <Input
              id="edit-days"
              defaultValue="30"
              className="w-full"
            />
          </div>

          {/* Date Format */}
          <div className="space-y-2">
            <Label htmlFor="date-format" className="flex items-center gap-1">
              Date Format: <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Select defaultValue="mm-dd-yyyy">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mm-dd-yyyy">mm/dd/yyyy</SelectItem>
                  <SelectItem value="dd-mm-yyyy">dd/mm/yyyy</SelectItem>
                  <SelectItem value="yyyy-mm-dd">yyyy-mm-dd</SelectItem>
                </SelectContent>
              </Select>
              <Calendar className="absolute right-8 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Time Format */}
          <div className="space-y-2">
            <Label htmlFor="time-format" className="flex items-center gap-1">
              Time Format: <span className="text-red-500">*</span>
            </Label>
            <Select defaultValue="24-hour">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24-hour">24 Hour</SelectItem>
                <SelectItem value="12-hour">12 Hour</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Currency Precision */}
          <div className="space-y-2">
            <Label htmlFor="currency-precision" className="flex items-center gap-1">
              Currency precision: <span className="text-red-500">*</span>
              <Info className="h-4 w-4 text-blue-500" />
            </Label>
            <Select defaultValue="2">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quantity Precision */}
          <div className="space-y-2">
            <Label htmlFor="quantity-precision" className="flex items-center gap-1">
              Quantity precision: <span className="text-red-500">*</span>
              <Info className="h-4 w-4 text-blue-500" />
            </Label>
            <Select defaultValue="2">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-start">
          <Button className="px-8">
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessView;
