import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import { Edit, Plus, Trash2, Upload, Download, Eye, Copy, Settings } from 'lucide-react';

interface PriceGroup extends Record<string, unknown> {
  id: number;
  name: string;
  description: string;
}

export default function SellingPriceGroupsTab() {
  const priceGroups: PriceGroup[] = [
    {
      id: 1,
      name: 'Wholesale',
      description: 'Bulk buyers and resellers with volume discounts'
    },
    {
      id: 2,
      name: 'VIP Customers',
      description: 'Premium customer tier with exclusive pricing'
    },
    {
      id: 3,
      name: 'Retail',
      description: 'Regular retail customers with standard pricing'
    },
    {
      id: 4,
      name: 'Staff Discount',
      description: 'Employee pricing with special discounts'
    },
    {
      id: 5,
      name: 'Corporate',
      description: 'Business-to-business customers with negotiated rates'
    },
    {
      id: 6,
      name: 'Student Discount',
      description: 'Special pricing for students and educational institutions'
    },
    {
      id: 7,
      name: 'Senior Citizens',
      description: 'Discounted pricing for senior citizen customers'
    },
    {
      id: 8,
      name: 'Loyalty Members',
      description: 'Rewards program members with tiered pricing benefits'
    }
  ];

  // Setup table actions
  const { rowActions } = useTableActions<PriceGroup>({
    customActions: [
      {
        label: "View Details",
        icon: Eye,
        onClick: (priceGroup: PriceGroup) => {
          alert(`Viewing details for: ${priceGroup.name}`);
        },
        variant: "outline",
      },
      {
        label: "Edit",
        icon: Edit,
        onClick: (priceGroup: PriceGroup) => {
          alert(`Edit price group: ${priceGroup.name}`);
        },
        variant: "outline",
      },
      {
        label: "Duplicate",
        icon: Copy,
        onClick: (priceGroup: PriceGroup) => {
          alert(`Duplicating price group: ${priceGroup.name}`);
        },
        variant: "outline",
      },
      {
        label: "Configure Prices",
        icon: Settings,
        onClick: (priceGroup: PriceGroup) => {
          alert(`Configure prices for: ${priceGroup.name}`);
        },
        variant: "outline",
      },
      {
        label: "Delete",
        icon: Trash2,
        onClick: (priceGroup: PriceGroup) => {
          if (confirm(`Are you sure you want to delete "${priceGroup.name}" price group?`)) {
            alert(`Deleting price group: ${priceGroup.name}`);
          }
        },
        className: "text-destructive hover:text-destructive",
      },
    ],
  });

  // Define table columns
  const columns: TableColumn<PriceGroup>[] = [
    {
      accessorKey: "name",
      header: "Name",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className="font-medium ">{String(value)}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className=" max-w-xs truncate">{String(value)}</div>
      ),
    },
    {
      type: "actions",
      header: "Action",
      buttons: rowActions,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Import/Export Section */}
      <Card>
        <CardHeader>
          <CardTitle>Import/Export Selling Price Group Prices</CardTitle>
          <CardDescription>Import and export selling price group pricing data</CardDescription>
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

          {/* Instructions */}
          <div className="space-y-2">
            <Label>Instructions:</Label>
            <div className="bg-muted rounded-lg p-4 text-sm space-y-2">
              <p>• Export Selling price group prices.</p>
              <p>• Update the exported file and import the same file.</p>
              <p>• Only selling price group prices of the product will be updated. Any blank price will be skipped.</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* All Selling Price Group Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Selling Price Group</CardTitle>
              <CardDescription>Manage selling price groups</CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Price Group
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DynamicTable
            data={priceGroups}
            columns={columns}
            pageSize={100}
            searchPlaceholder="Search ..."
            enablePagination={true}
            enableSorting={true}
            enableFiltering={true}
            enableColumnVisibility={true}
            enableExport={true}
          />
        </CardContent>
      </Card>
    </div>
  );
}
