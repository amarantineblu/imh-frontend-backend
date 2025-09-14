import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTableActions } from '@/hooks/use-table-actions';
import { 
  Copy, 
  Edit, 
  Eye, 
  History, 
  MapPin, 
  MinusCircle, 
  Package, 
  PlusCircle, 
  Tags, 
  Trash2, 
  UserX 
} from 'lucide-react';
import { useState, useEffect } from 'react';

// All Products Interface
interface Product extends Record<string, unknown> {
  id: number;
  image?: string;
  name: string;
  businessLocation: string;
  unitPurchasePrice: number;
  sellingPrice: number;
  currentStock: number;
  productType: string;
  category: string;
  brand: string;
  tax: number;
  sku: string;
}

// Stock Report Interface
interface StockReport extends Record<string, unknown> {
  id: number;
  sku: string;
  product: string;
  variation: string;
  category: string;
  location: string;
  unitSellingPrice: number;
  currentStock: number;
  currentStockValuePurchase: number;
  currentStockValueSale: number;
  potentialProfit: number;
  totalUnitSold: number;
  totalUnitTransferred: number;
  totalUnitAdjusted: number;
}

// // Mock data for All Products
// const mockProducts: Product[] = [
//   {
//     id: 1,
//     image: '/placeholder-product.jpg',
//     name: 'Wireless Bluetooth Headphones',
//     businessLocation: 'Main Store',
//     unitPurchasePrice: 75.00,
//     sellingPrice: 99.99,
//     currentStock: 50,
//     productType: 'Simple',
//     category: 'Electronics',
//     brand: 'TechBrand',
//     tax: 10,
//     sku: 'WBH-001',
//   },
//   {
//     id: 2,
//     image: '/placeholder-product.jpg',
//     name: 'Organic Coffee Beans 1kg',
//     businessLocation: 'Branch Store',
//     unitPurchasePrice: 18.00,
//     sellingPrice: 24.99,
//     currentStock: 120,
//     productType: 'Simple',
//     category: 'Food & Beverages',
//     brand: 'CoffeeMaster',
//     tax: 5,
//     sku: 'OCB-1KG',
//   },
//   {
//     id: 3,
//     image: '/placeholder-product.jpg',
//     name: 'Gaming Mouse RGB',
//     businessLocation: 'Online Store',
//     unitPurchasePrice: 55.00,
//     sellingPrice: 79.99,
//     currentStock: 0,
//     productType: 'Variable',
//     category: 'Electronics',
//     brand: 'GameTech',
//     tax: 10,
//     sku: 'GM-RGB-001',
//   },
// ];

// Mock data for Stock Report
const mockStockReports: StockReport[] = [
  {
    id: 1,
    sku: 'WBH-001',
    product: 'Wireless Bluetooth Headphones',
    variation: 'Black - Large',
    category: 'Electronics',
    location: 'Main Store',
    unitSellingPrice: 99.99,
    currentStock: 50,
    currentStockValuePurchase: 3750.00,
    currentStockValueSale: 4999.50,
    potentialProfit: 1249.50,
    totalUnitSold: 125,
    totalUnitTransferred: 10,
    totalUnitAdjusted: 2,
  },
  {
    id: 2,
    sku: 'OCB-1KG',
    product: 'Organic Coffee Beans 1kg',
    variation: 'Medium Roast',
    category: 'Food & Beverages',
    location: 'Branch Store',
    unitSellingPrice: 24.99,
    currentStock: 120,
    currentStockValuePurchase: 2160.00,
    currentStockValueSale: 2998.80,
    potentialProfit: 838.80,
    totalUnitSold: 89,
    totalUnitTransferred: 5,
    totalUnitAdjusted: 1,
  },
  {
    id: 3,
    sku: 'GM-RGB-001',
    product: 'Gaming Mouse RGB',
    variation: 'Red LED',
    category: 'Electronics',
    location: 'Online Store',
    unitSellingPrice: 79.99,
    currentStock: 0,
    currentStockValuePurchase: 0.00,
    currentStockValueSale: 0.00,
    potentialProfit: 0.00,
    totalUnitSold: 45,
    totalUnitTransferred: 0,
    totalUnitAdjusted: -3,
  },
];

interface Props{
  mockProducts: Product[]
}
export default function ListProductsTab(props: Props) {
   const { mockProducts } = props;  // <-- add this line

    useEffect(() => {
    if (mockProducts) {
      console.log('Mock Products:', mockProducts);
    } else {
      console.warn('Mock Products data is missing!');
    }
    }, [mockProducts]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', variant: 'destructive' as const };
    if (stock < 10) return { label: 'Low Stock', variant: 'secondary' as const };
    return { label: 'In Stock', variant: 'default' as const };
  };

  // Bulk actions for products
  const handleBulkDelete = (items: Product[] | StockReport[]) => {
    if (confirm(`Are you sure you want to delete ${items.length} selected items?`)) {
      alert(`${items.length} items would be deleted`);
    }
  };

  const handleBulkAddToLocation = (items: Product[] | StockReport[]) => {
    alert(`Add ${items.length} items to location functionality would be implemented here`);
  };

  const handleBulkRemoveFromLocation = (items: Product[] | StockReport[]) => {
    alert(`Remove ${items.length} items from location functionality would be implemented here`);
  };

  const handleBulkDeactivate = (items: Product[] | StockReport[]) => {
    if (confirm(`Are you sure you want to deactivate ${items.length} selected items?`)) {
      alert(`${items.length} items would be deactivated`);
    }
  };

  // Setup table actions for All Products
  const { rowActions: productRowActions } = useTableActions<Product>({
    customActions: [
      {
        label: "Labels",
        icon: Tags,
        onClick: (product: Product) => {
          alert(`Print labels for: ${product.name}`);
        },
        variant: "ghost",
      },
      {
        label: "View",
        icon: Eye,
        onClick: (product: Product) => {
          alert(`View product: ${product.name}`);
        },
        variant: "ghost",
      },
      {
        label: "Edit",
        icon: Edit,
        onClick: (product: Product) => {
          alert(`Edit product: ${product.name}`);
        },
        variant: "ghost",
      },
      {
        label: "Delete",
        icon: Trash2,
        onClick: (product: Product) => {
          if (confirm(`Are you sure you want to delete ${product.name}?`)) {
            alert(`Product ${product.id} would be deleted`);
          }
        },
        className: "text-destructive hover:text-destructive",
      },
      {
        label: "Stock History",
        icon: History,
        onClick: (product: Product) => {
          alert(`View stock history for: ${product.name}`);
        },
        variant: "ghost",
      },
      {
        label: "Duplicate",
        icon: Copy,
        onClick: (product: Product) => {
          alert(`Duplicate product: ${product.name}`);
        },
        variant: "ghost",
      },
    ],
  });

  // Setup table actions for Stock Report
  const { rowActions: stockRowActions } = useTableActions<StockReport>({
    customActions: [
      {
        label: "Stock History",
        icon: History,
        onClick: (stock: StockReport) => {
          alert(`View stock history for: ${stock.product}`);
        },
        variant: "ghost",
      },
    ],
  });

  // Define table columns for All Products
  const productColumns: TableColumn<Product>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: () => (
        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
          <Package className="text-muted-foreground h-5 w-5" />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Product", 
      sortable: true,
      filterable: true,
      cell: (_, product) => (
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-muted-foreground text-sm">SKU: {product.sku}</div>
        </div>
      ),
    },
    {
      accessorKey: "businessLocation",
      header: "Business Location",
      sortable: true,
      filterable: true,
      cell: (_, product) => (
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          {product.businessLocation}
        </div>
      ),
    },
    {
      accessorKey: "unitPurchasePrice",
      header: "Unit Purchase Price",
      sortable: true,
      cell: (_, product) => (
        <div className="font-medium">{formatCurrency(product.unitPurchasePrice)}</div>
      ),
    },
    {
      accessorKey: "sellingPrice",
      header: "Selling Price",
      sortable: true,
      cell: (_, product) => (
        <div className="font-medium">{formatCurrency(product.sellingPrice)}</div>
      ),
    },
    {
      accessorKey: "currentStock",
      header: "Current Stock",
      sortable: true,
      cell: (_, product) => {
        const stockStatus = getStockStatus(product.currentStock);
        return (
          <div className="flex gap-2">
            <span className="text-sm font-medium">{product.currentStock}</span>
            <Badge variant={stockStatus.variant} className="w-fit text-xs">
              {stockStatus.label}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "productType",
      header: "Product Type",
      sortable: true,
      filterable: true,
      cell: (_, product) => (
        <Badge variant="outline">{product.productType}</Badge>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      sortable: true,
      filterable: true,
      cell: (_, product) => (
        <Badge variant="outline">{product.category}</Badge>
      ),
    },
    {
      accessorKey: "brand",
      header: "Brand",
      sortable: true,
      filterable: true,
    },
    {
      accessorKey: "tax",
      header: "Tax (%)",
      sortable: true,
      cell: (_, product) => (
        <span className="font-medium">{product.tax}%</span>
      ),
    },
    {
      accessorKey: "sku",
      header: "SKU",
      sortable: true,
      filterable: true,
      cell: (_, product) => (
        <code className="bg-muted rounded px-2 py-1 text-sm">{product.sku}</code>
      ),
    },
        {
      type: "actions",
      header: "Action",
      buttons: productRowActions,
    },
  ];

  // Define table columns for Stock Report
  const stockColumns: TableColumn<StockReport>[] = [
    {
      accessorKey: "sku",
      header: "SKU",
      sortable: true,
      filterable: true,
      cell: (_, stock) => (
        <code className="bg-muted rounded px-2 py-1 text-sm">{stock.sku}</code>
      ),
    },
    {
      accessorKey: "product",
      header: "Product",
      sortable: true,
      filterable: true,
      cell: (_, stock) => (
        <div>
          <div className="font-medium">{stock.product}</div>
        </div>
      ),
    },
    {
      accessorKey: "variation",
      header: "Variation",
      sortable: true,
      filterable: true,
      cell: (_, stock) => (
        <div className="text-muted-foreground text-sm">{stock.variation}</div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      sortable: true,
      filterable: true,
      cell: (_, stock) => (
        <Badge variant="outline">{stock.category}</Badge>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      sortable: true,
      filterable: true,
      cell: (_, stock) => (
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          {stock.location}
        </div>
      ),
    },
    {
      accessorKey: "unitSellingPrice",
      header: "Unit Selling Price",
      sortable: true,
      cell: (_, stock) => (
        <div className="font-medium">{formatCurrency(stock.unitSellingPrice)}</div>
      ),
    },
    {
      accessorKey: "currentStock",
      header: "Current Stock",
      sortable: true,
      cell: (_, stock) => {
        const stockStatus = getStockStatus(stock.currentStock);
        return (
          <div className="flex gap-2">
            <span className="text-sm font-medium">{stock.currentStock}</span>
            <Badge variant={stockStatus.variant} className="w-fit text-xs">
              {stockStatus.label}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "currentStockValuePurchase",
      header: "Current Stock Value (By Purchase Price)",
      sortable: true,
      cell: (_, stock) => (
        <div className="font-medium">{formatCurrency(stock.currentStockValuePurchase)}</div>
      ),
    },
    {
      accessorKey: "currentStockValueSale",
      header: "Current Stock Value (By Sale Price)",
      sortable: true,
      cell: (_, stock) => (
        <div className="font-medium">{formatCurrency(stock.currentStockValueSale)}</div>
      ),
    },
    {
      accessorKey: "potentialProfit",
      header: "Potential Profit",
      sortable: true,
      cell: (_, stock) => (
        <div className="font-medium text-green-600">{formatCurrency(stock.potentialProfit)}</div>
      ),
    },
    {
      accessorKey: "totalUnitSold",
      header: "Total Unit Sold",
      sortable: true,
      cell: (_, stock) => (
        <span className="font-medium">{stock.totalUnitSold}</span>
      ),
    },
    {
      accessorKey: "totalUnitTransferred",
      header: "Total Unit Transferred",
      sortable: true,
      cell: (_, stock) => (
        <span className="font-medium">{stock.totalUnitTransferred}</span>
      ),
    },
    {
      accessorKey: "totalUnitAdjusted",
      header: "Total Unit Adjusted",
      sortable: true,
      cell: (_, stock) => (
        <span className={`font-medium ${stock.totalUnitAdjusted >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {stock.totalUnitAdjusted}
        </span>
      ),
    },
        {
      type: "actions",
      header: "Action",
      buttons: stockRowActions,
    },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all-products" className="w-full">
        <TabsList className="">
          <TabsTrigger value="all-products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            All Products
          </TabsTrigger>
          <TabsTrigger value="stock-report" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Stock Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                All Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Bulk Actions for Products */}
              {selectedProducts.length > 0 && (
                <div className="mb-4 flex gap-2 p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium">{selectedProducts.length} selected:</span>
                  <Button size="sm" variant="destructive" onClick={() => handleBulkDelete(selectedProducts)}>
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAddToLocation(selectedProducts)}>
                    <PlusCircle className="mr-1 h-4 w-4" />
                    Add to Location
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkRemoveFromLocation(selectedProducts)}>
                    <MinusCircle className="mr-1 h-4 w-4" />
                    Remove from Location
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkDeactivate(selectedProducts)}>
                    <UserX className="mr-1 h-4 w-4" />
                    Deactivate
                  </Button>
                </div>
              )}

              <DynamicTable
                data={products}
                columns={productColumns}
                enableRowSelection={true}
                enableSorting={true}
                enableFiltering={true}
                enableExport={true}
                searchPlaceholder="Search products by name, SKU, category, brand, or location..."
                pageSize={100}
                emptyMessage="No products found."
                onRowSelectionChange={setSelectedProducts}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stock-report" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Stock Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Bulk Actions for Stock Report */}
              {selectedStockReports.length > 0 && (
                <div className="mb-4 flex gap-2 p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium">{selectedStockReports.length} selected:</span>
                  <Button size="sm" variant="destructive" onClick={() => handleBulkDelete(selectedStockReports)}>
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAddToLocation(selectedStockReports)}>
                    <PlusCircle className="mr-1 h-4 w-4" />
                    Add to Location
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkRemoveFromLocation(selectedStockReports)}>
                    <MinusCircle className="mr-1 h-4 w-4" />
                    Remove from Location
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkDeactivate(selectedStockReports)}>
                    <UserX className="mr-1 h-4 w-4" />
                    Deactivate
                  </Button>
                </div>
              )}

              <DynamicTable
                data={stockReports}
                columns={stockColumns}
                enableRowSelection={true}
                enableSorting={true}
                enableFiltering={true}
                enableExport={true}
                searchPlaceholder="Search stock reports by SKU, product, category, or location..."
                pageSize={100}
                emptyMessage="No stock reports found."
                onRowSelectionChange={setSelectedStockReports}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
