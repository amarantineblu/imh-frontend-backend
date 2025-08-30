import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { DynamicTable, TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import { Package, TrendingUp, Upload, CheckCircle, XCircle } from 'lucide-react';

// Types
interface StockImportItem extends Record<string, unknown> {
  product: string;
  sku: string;
  current: number;
  new: number;
  cost: number;
  total: number;
  status: 'Ready' | 'Error';
}

export default function ImportOpeningStockTab() {
  // Stock import preview data
  const stockImportData: StockImportItem[] = [
    {
      product: 'iPhone 14 Pro',
      sku: 'APL-IP14P-128',
      current: 0,
      new: 25,
      cost: 799.0,
      total: 19975.0,
      status: 'Ready',
    },
    {
      product: 'Samsung Galaxy S23',
      sku: 'SAM-GS23-256',
      current: 5,
      new: 30,
      cost: 649.0,
      total: 19470.0,
      status: 'Ready',
    },
    {
      product: 'Wireless Headphones',
      sku: 'WH-XB900N',
      current: 0,
      new: 15,
      cost: 199.99,
      total: 2999.85,
      status: 'Ready',
    },
    {
      product: 'Invalid Product',
      sku: 'INVALID-SKU',
      current: 0,
      new: 10,
      cost: 0,
      total: 0,
      status: 'Error',
    },
  ];

  // Table actions
  const stockTableActions = useTableActions<StockImportItem>({
    customActions: [
      {
        label: 'View Details',
        onClick: (item: StockImportItem) => alert(`Viewing details for ${item.product}`),
      },
      {
        label: 'Remove',
        onClick: (item: StockImportItem) => alert(`Removing ${item.product} from import`),
        variant: 'destructive',
      },
    ],
  });

  // Table columns
  const stockColumns: TableColumn<StockImportItem>[] = [
    {
      accessorKey: 'product',
      header: 'Product',
      cell: (value: unknown, row: StockImportItem) => (
        <div className="font-medium">{row.product}</div>
      ),
    },
    {
      accessorKey: 'sku',
      header: 'SKU',
    },
    {
      accessorKey: 'current',
      header: 'Current Stock',
      cell: (value: unknown, row: StockImportItem) => (
        <div className="text-center">{row.current}</div>
      ),
    },
    {
      accessorKey: 'new',
      header: 'New Stock',
      cell: (value: unknown, row: StockImportItem) => (
        <div className="text-center font-medium">{row.new}</div>
      ),
    },
    {
      accessorKey: 'cost',
      header: 'Unit Cost',
      cell: (value: unknown, row: StockImportItem) => (
        <div className="text-right">${row.cost.toFixed(2)}</div>
      ),
    },
    {
      accessorKey: 'total',
      header: 'Total Value',
      cell: (value: unknown, row: StockImportItem) => (
        <div className="text-right font-medium">${row.total.toFixed(2)}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (value: unknown, row: StockImportItem) => {
        const status = row.status;
        return (
          <div className="flex items-center gap-2">
            {status === 'Ready' ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <Badge variant={status === 'Ready' ? 'default' : 'destructive'}>
              {status}
            </Badge>
          </div>
        );
      },
    },
    {
      type: "actions",
      header: "Actions",
      buttons: stockTableActions.rowActions,
    },
  ];
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Without Stock</CardTitle>
            <Package className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-muted-foreground text-xs">Need opening stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock Value</CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,670</div>
            <p className="text-muted-foreground text-xs">Current inventory value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Import</CardTitle>
            <Upload className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-muted-foreground text-xs">Stock entries imported</p>
          </CardContent>
        </Card>
      </div>

      {/* Import Opening Stock Section */}
      <Card>
        <CardHeader>
          <CardTitle>Import Opening Stock</CardTitle>
          <CardDescription>Upload CSV or Excel file to set opening stock quantities</CardDescription>
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
            <Button>Import Opening Stock</Button>
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
                    SKU <Badge variant="destructive" className="ml-1">Required</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">2</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Location <Badge variant="secondary" className="ml-1">Optional<br/>If blank first business location will be used</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Name of the business location</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">3</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Quantity <Badge variant="destructive" className="ml-1">Required</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">4</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Unit Cost (Before Tax) <Badge variant="destructive" className="ml-1">Required</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">5</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Lot Number <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">6</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Expiry Date <Badge variant="secondary" className="ml-1">Optional</Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Stock expiry date in Business date format<br/>mm/dd/yyyy, Type: text, Example: 06/11/2025</td>
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
          <CardDescription>Track the progress of your current stock import</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Processing stock entries...</span>
              <span>78 / 120</span>
            </div>
            <Progress value={65} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-green-600">75</div>
              <div className="text-muted-foreground text-sm">Successful</div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-red-600">3</div>
              <div className="text-muted-foreground text-sm">Failed</div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">42</div>
              <div className="text-muted-foreground text-sm">Remaining</div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">$12,450</div>
              <div className="text-muted-foreground text-sm">Total Value</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Import Preview</CardTitle>
          <CardDescription>Preview of products to be updated with opening stock</CardDescription>
        </CardHeader>
        <CardContent>
          <DynamicTable
            data={stockImportData}
            columns={stockColumns}
            enablePagination={true}
            enableSorting={true}
            enableFiltering={true}
            searchPlaceholder="Search products..."
            pageSize={100}
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-end gap-4">
            <Button variant="outline">Validate Data</Button>
            <Button>Import Opening Stock</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
