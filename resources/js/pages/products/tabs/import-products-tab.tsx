import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, Package, Upload } from 'lucide-react';

export default function ImportProductsTab() {
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Import</CardTitle>
            <Upload className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-muted-foreground text-xs">Products imported yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-muted-foreground text-xs">Import success rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Imported</CardTitle>
            <Package className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,456</div>
            <p className="text-muted-foreground text-xs">All time imports</p>
          </CardContent>
        </Card>
      </div>

      {/* Import Products Section */}
      <Card>
        <CardHeader>
          <CardTitle>Import Products</CardTitle>
          <CardDescription>Upload CSV or Excel file to import products</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file-upload">File To Import:</Label>
            <div className="border-muted-foreground/25 rounded-lg border-2 border-dashed p-6 text-center">
              <Upload className="text-muted-foreground mx-auto h-12 w-12" />
              <div className="mt-4">
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
                <p className="text-muted-foreground mt-2 text-sm">No file chosen</p>
                <p className="text-muted-foreground text-xs">Drag and drop or click to upload CSV/Excel file</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Import Products</Button>
          </div>
        </CardContent>
      </Card>

      {/* Instructions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
          <CardDescription>Follow the instructions carefully before importing the file. The columns of the file should be in the following order.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="">
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium">S/N</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium">Column Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium">Instruction</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="border border-gray-300 px-4 py-2">1</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Product Name <Badge variant="destructive" className="ml-1">Required</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Name of the product</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">2</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Brand <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Name of the brand<br/>(If not found new brand with the given name will be created)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">3</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Unit <Badge variant="destructive" className="ml-1">Required</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Name of the unit</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">4</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Category <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Name of the Category<br/>(If not found new category with the given name will be created)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">5</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Sub category <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Name of the Sub-Category<br/>(If not found new sub-category with the given name under the parent Category will be created)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">6</td>
                  <td className="border border-gray-300 px-4 py-2">
                    SKU <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Product SKU. If blank an SKU will be automatically generated</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">7</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Barcode Type <Badge variant="secondary" className="ml-1">Optional, Default: C128</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Barcode Type for the product.<br/>Currently supported: C128, C39, EAN-13, EAN-8, UPC-A, UPC-E, ITF-14</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">8</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Manage Stock? <Badge variant="destructive" className="ml-1">Required</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Enable or disable stock managemant<br/>1 = Yes<br/>0 = No</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">9</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Alert quantity <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Alert quantity</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">10</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Expires in <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Product expiry period (Only in numbers)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">11</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Expiry Period Unit <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Unit for the expiry period<br/>Available Options: days, months</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">12</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Applicable Tax <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Name of the Tax Rate<br/><br/>If purchase Price (Excluding Tax) is not same as Purchase Price (Including Tax) then you must supply the tax rate name.</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">13</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Selling Price Tax Type <Badge variant="destructive" className="ml-1">Required</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Selling Price Tax Type<br/>Available Options: inclusive, exclusive</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">14</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Product Type <Badge variant="destructive" className="ml-1">Required</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Product Type<br/>Available Options: single, variable</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">15</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Variation Name <Badge variant="destructive" className="ml-1">Required if product type is variable</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Name of the variation (Ex: Size, Color etc )</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">16</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Variation Values <Badge variant="destructive" className="ml-1">Required if product type is variable</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Values for the variation separated with '|'<br/>(Ex: Red|Blue|Green)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">17</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Variation SKUs <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">SKUs of each variations separated by "|" if product type is variable</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">18</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Purchase Price (Including Tax) <Badge variant="destructive" className="ml-1">Required if Purchase Price Excluding Tax is not given</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Purchase Price (Including Tax) (Only in numbers)<br/><br/>For variable products '|' separated values with the same order as Variation Values<br/>(Ex: 84|85|88)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">19</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Purchase Price (Excluding Tax) <Badge variant="destructive" className="ml-1">Required if Purchase Price Including Tax is not given</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Purchase Price (Excluding Tax) (Only in numbers)<br/><br/>For variable products '|' separated values with the same order as Variation Values<br/>(Ex: 84|85|88)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">20</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Profit Margin % <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Profit Margin (Only in numbers)<br/>If blank default profit margin for the business will be used</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">21</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Selling Price <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Selling Price (Only in numbers)<br/>If blank selling price will be calculated with the given Purchase Price and Applicable Tax</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">22</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Opening Stock <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Opening Stock (Only in numbers)<br/><br/>For variable products separate stock quantities with '|'<br/>(Ex: 100|150|200)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">23</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Opening stock location <Badge variant="secondary" className="ml-1">Optional<br/>If blank first business location will be used</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Name of the business location</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">24</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Expiry Date <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Stock Expiry Date<br/>Format: mm-dd-yyyy; Ex: 11-25-2018</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">25</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Enable Product description, IMEI or Serial Number <Badge variant="secondary" className="ml-1">Optional, Default: 0</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">1 = Yes<br/>0 = No</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">26</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Weight <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Optional</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">27</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Rack <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Rack details seperated by '|' for different business locations serially.<br/>(Ex: R1|R5|R12)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">28</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Row <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Row details seperated by '|' for different business locations serially.<br/>(Ex: ROW1|ROW2|ROW3)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">29</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Position <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Position details seperated by '|' for different business locations serially.<br/>(Ex: POS1|POS2|POS3)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">30</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Image <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Image name with extension.<br/>(Image name must be uploaded to the server public/uploads/img )<br/><br/>Or URL of the image</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">31</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Product Description <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">32</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Custom Field1 <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">33</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Custom Field2 <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">34</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Custom Field3 <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">35</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Custom Field4 <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">36</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Not for selling <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">1 = Yes<br/>0 = No</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">37</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Product locations <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Comma separated string of business location names where product will be available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Import Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Import Progress</CardTitle>
          <CardDescription>Track the progress of your current import</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Processing products...</span>
              <span>156 / 250</span>
            </div>
            <Progress value={62} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-green-600">145</div>
              <div className="text-muted-foreground text-sm">Successful</div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-red-600">8</div>
              <div className="text-muted-foreground text-sm">Failed</div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">97</div>
              <div className="text-muted-foreground text-sm">Remaining</div>
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Some products failed to import due to missing required fields. Check the error log for details.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Recent Imports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Imports</CardTitle>
          <CardDescription>History of recent product imports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '2024-01-15', file: 'products_batch_1.csv', total: 250, success: 247, failed: 3 },
              { date: '2024-01-14', file: 'new_products.xlsx', total: 125, success: 125, failed: 0 },
              { date: '2024-01-13', file: 'electronics_update.csv', total: 89, success: 85, failed: 4 },
              { date: '2024-01-12', file: 'inventory_sync.csv', total: 340, success: 338, failed: 2 },
            ].map((import_, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{import_.file}</p>
                  <p className="text-muted-foreground text-sm">{import_.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    <span className="text-green-600">{import_.success} success</span>
                    {import_.failed > 0 && <span className="ml-2 text-red-600">{import_.failed} failed</span>}
                  </p>
                  <p className="text-muted-foreground text-xs">Total: {import_.total}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
