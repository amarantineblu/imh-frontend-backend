import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Package, Printer, Settings } from 'lucide-react';

export default function PrintLabelsTab() {
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,547</div>
            <p className="text-muted-foreground text-xs">Available for labeling</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Label Templates</CardTitle>
            <Settings className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-muted-foreground text-xs">Active templates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Printed Today</CardTitle>
            <Printer className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-muted-foreground text-xs">Labels printed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Add Products to Generate Labels */}
        <Card>
          <CardHeader>
            <CardTitle>Add products to generate Labels</CardTitle>
            <CardDescription>Enter products name to print labels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search-products">Search Products</Label>
              <Input id="search-products" placeholder="Enter product name..." className="w-full" />
            </div>

            {/* Products Table Header */}
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                <div>Products</div>
                <div>No. of labels</div>
                <div>Packing Date</div>
                <div>Selling Price Group</div>
              </div>

              {/* Sample Products Rows */}
              <div className="space-y-2">
                {[
                  { name: 'iPhone 14 Pro', labels: 5, packingDate: '2025-06-11', priceGroup: 'Premium' },
                  { name: 'Samsung Galaxy S23', labels: 3, packingDate: '2025-06-11', priceGroup: 'Standard' },
                  { name: 'Nike Air Max 270', labels: 2, packingDate: '2025-06-11', priceGroup: 'Standard' },
                ].map((product, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center py-2 border-b">
                    <div className="text-sm">{product.name}</div>
                    <Input type="number" defaultValue={product.labels} min="1" className="h-8" />
                    <Input type="date" defaultValue={product.packingDate} className="h-8" />
                    <Select defaultValue={product.priceGroup.toLowerCase()}>
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="budget">Budget</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information to Show in Labels */}
        <Card>
          <CardHeader>
            <CardTitle>Information to show in Labels</CardTitle>
            <CardDescription>Configure what information appears on labels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Product Name */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="product-name" defaultChecked />
                <Label htmlFor="product-name">Product Name</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="product-name-size" className="text-sm">Size</Label>
                <Input id="product-name-size" type="number" defaultValue="15" className="w-16 h-8" />
              </div>
            </div>

            {/* Product Variation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="product-variation" defaultChecked />
                <Label htmlFor="product-variation">Product Variation (recommended)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="variation-size" className="text-sm">Size</Label>
                <Input id="variation-size" type="number" defaultValue="17" className="w-16 h-8" />
              </div>
            </div>

            {/* Product Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="product-price" defaultChecked />
                <Label htmlFor="product-price">Product Price</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="price-size" className="text-sm">Size</Label>
                <Input id="price-size" type="number" defaultValue="17" className="w-16 h-8" />
              </div>
            </div>

            {/* Show Price Options */}
            <div className="space-y-2">
              <Label>Show Price:</Label>
              <RadioGroup defaultValue="inc-tax" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inc-tax" id="inc-tax" />
                  <Label htmlFor="inc-tax">Inc. tax</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exc-tax" id="exc-tax" />
                  <Label htmlFor="exc-tax">Exc. tax</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Business Name */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="business-name" />
                <Label htmlFor="business-name">Business name</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="business-size" className="text-sm">Size</Label>
                <Input id="business-size" type="number" defaultValue="20" className="w-16 h-8" />
              </div>
            </div>

            {/* Print Packing Date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="packing-date" />
                <Label htmlFor="packing-date">Print packing date</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="date-size" className="text-sm">Size</Label>
                <Input id="date-size" type="number" defaultValue="12" className="w-16 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Barcode Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Barcode setting</CardTitle>
            <CardDescription>Configure label dimensions and layout</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="labels-per-sheet">Labels per Sheet</Label>
                <Select defaultValue="20">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 Labels</SelectItem>
                    <SelectItem value="15">15 Labels</SelectItem>
                    <SelectItem value="20">20 Labels</SelectItem>
                    <SelectItem value="30">30 Labels</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sheet-size">Sheet Size</Label>
                <Select defaultValue="8.5x11">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8.5x11">8.5" x 11"</SelectItem>
                    <SelectItem value="a4">A4</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="label-size">Label Size</Label>
                <Select defaultValue="4x1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4x1">4" x 1"</SelectItem>
                    <SelectItem value="3x1">3" x 1"</SelectItem>
                    <SelectItem value="2.5x1">2.5" x 1"</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              <strong>Current Settings:</strong> 20 Labels per Sheet, Sheet Size: 8.5" x 11", Label Size: 4" x 1", Labels per sheet: 20
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Products Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Selected Products (5)</CardTitle>
          <CardDescription>Products selected for label printing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'iPhone 14 Pro', sku: 'APL-IP14P-128', price: '$999.00' },
              { name: 'Samsung Galaxy S23', sku: 'SAM-GS23-256', price: '$799.00' },
              { name: 'Nike Air Max 270', sku: 'NIKE-AM270-9', price: '$150.00' },
              { name: 'Wireless Headphones', sku: 'WH-XB900N', price: '$249.99' },
              { name: 'Smart Watch Series 8', sku: 'APL-SW8-GPS', price: '$399.00' },
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-muted-foreground text-sm">SKU: {product.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{product.price}</p>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Print Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-end gap-4">
            <Button variant="outline">Preview Labels</Button>
            <Button>Print Labels</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
