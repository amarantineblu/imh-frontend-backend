import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTableActions } from '@/hooks/use-table-actions';
import { set } from 'date-fns';
import { Edit, Layers, Package, Plus, Settings, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Variation extends Record<string, unknown> {
  id: number;
  product: string;
  template: string;
  combinations: number;
  status: 'Active' | 'Draft' | 'Inactive';
  attributes: string[];
}

interface Template extends Record<string, unknown> {
  id: number;
  name: string;
  attributes: number;
  products: number;
}

interface Props{
  variations: Variation[],
  templates: Template[]
}
export default function VariationsTab(props:Props) {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // const variations: Variation[] = [
  //   {
  //     id: 1,
  //     product: 'T-Shirt',
  //     template: 'Size & Color',
  //     combinations: 12,
  //     status: 'Active',
  //     attributes: ['Size: S, M, L, XL', 'Color: Red, Blue, Green'],
  //   },
  //   {
  //     id: 2,
  //     product: 'Smartphone',
  //     template: 'Storage & Color',
  //     combinations: 6,
  //     status: 'Active',
  //     attributes: ['Storage: 128GB, 256GB', 'Color: Black, White, Gold'],
  //   },
  //   {
  //     id: 3,
  //     product: 'Laptop',
  //     template: 'RAM & Storage',
  //     combinations: 8,
  //     status: 'Draft',
  //     attributes: ['RAM: 8GB, 16GB', 'Storage: 256GB, 512GB, 1TB'],
  //   },
  // ];

  // const templates: Template[] = [
  //   { id: 1, name: 'Size & Color', attributes: 2, products: 15 },
  //   { id: 2, name: 'Storage & Color', attributes: 2, products: 8 },
  //   { id: 3, name: 'Size Only', attributes: 1, products: 22 },
  //   { id: 4, name: 'Material & Finish', attributes: 2, products: 5 },
  // ];

   const [variations, setVariations] = useState<Variation[]>([]);
   const [templates, setTemplates] = useState<Template[]>([]);
        const [loading, setLoading] = useState(true);
        const data_key = "variations";
        useEffect(() => {
          const variationData = props.variations;
          // Map incoming data to match the Variation interface
          const transformed: Variation[] = variationData.map((b: any) => ({
            id: b.id,
            product: b.product ?? b.actual_name ?? '', // fallback if needed
            template: b.template ?? '',
            combinations: b.combinations ?? 0,
            status: b.status ?? 'Draft',
            attributes: Array.isArray(b.attributes) ? b.attributes : [],
          }));
          setVariations(transformed);
          setTemplates(props.templates);
          setLoading(false);
        }, []);
  
  // Setup table actions for variations
  const { rowActions: variationActions } = useTableActions<Variation>({
    customActions: [
      {
        label: "Edit",
        icon: Edit,
        onClick: (variation: Variation) => {
          alert(`Edit variation: ${variation.product}...`);
        },
        variant: "outline",
      },
      {
        label: "Delete",
        icon: Trash2,
        onClick: (variation: Variation) => {
          if (confirm('Are you sure you want to delete this variation?')) {
            alert(`Delete variation: ${variation.product}...`);
          }
        },
        className: "text-destructive hover:text-destructive",
      },
    ],
  });

  // Setup table actions for templates
  const { rowActions: templateActions } = useTableActions<Template>({
    customActions: [
      {
        label: "Edit",
        icon: Edit,
        onClick: (template: Template) => {
          alert(`Edit template: ${template.name}...`);
        },
        variant: "outline",
      },
      {
        label: "Delete",
        icon: Trash2,
        onClick: (template: Template) => {
          if (confirm('Are you sure you want to delete this template?')) {
            alert(`Delete template: ${template.name}...`);
          }
        },
        className: "text-destructive hover:text-destructive",
      },
    ],
  });

  // Variation columns
  const variationColumns: TableColumn<Variation>[] = [
    {
      accessorKey: "product",
      header: "Product",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className="font-medium">{String(value)}</div>
      ),
    },
    {
      accessorKey: "template",
      header: "Template",
      sortable: true,
      filterable: true,
    },
    {
      accessorKey: "attributes",
      header: "Attributes",
      cell: (value, variation) => (
        <div className="space-y-1">
          {variation.attributes.map((attr, index) => (
            <div key={index} className="text-muted-foreground text-sm">
              {attr}
            </div>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "combinations",
      header: "Combinations",
      sortable: true,
      cell: (value) => (
        <div className="font-medium">{String(value)}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      sortable: true,
      filterable: true,
      cell: (value, variation) => (
        <Badge variant={variation.status === 'Active' ? 'default' : 'secondary'}>
          {String(value)}
        </Badge>
      ),
    },
    {
      type: "actions",
      header: "Actions",
      buttons: variationActions,
    },
  ];

  // Template columns
  const templateColumns: TableColumn<Template>[] = [
    {
      accessorKey: "name",
      header: "Template Name",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className="font-medium">{String(value)}</div>
      ),
    },
    {
      accessorKey: "attributes",
      header: "Attributes",
      sortable: true,
      cell: (value) => (
        <div className="text-center font-medium">{String(value)}</div>
      ),
    },
    {
      accessorKey: "products",
      header: "Products",
      sortable: true,
      cell: (value) => (
        <div className="text-center font-medium">{String(value)}</div>
      ),
    },
    {
      type: "actions",
      header: "Actions",
      buttons: templateActions,
    },
  ];

  const filteredVariations = variations.filter((variation) => {
    return statusFilter === 'all' || variation.status.toLowerCase() === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Variations</CardTitle>
            <Layers className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-muted-foreground text-xs">Across all products</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Variable Products</CardTitle>
            <Package className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-muted-foreground text-xs">Products with variations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <Settings className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-muted-foreground text-xs">Variation templates</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="variations" className="w-full">
        <TabsList>
          <TabsTrigger value="variations">Product Variations</TabsTrigger>
          <TabsTrigger value="templates">Variation Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="variations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Product Variations</CardTitle>
                  <CardDescription>Manage product variations and their combinations</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Variation
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-4">
                <div className="flex-1" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DynamicTable
                data={filteredVariations}
                columns={variationColumns}
                pageSize={100}
                searchPlaceholder="Search variations by product or template..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Variation Templates</CardTitle>
                  <CardDescription>Manage reusable variation templates</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DynamicTable
                data={templates}
                columns={templateColumns}
                pageSize={100}
                searchPlaceholder="Search templates..."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
