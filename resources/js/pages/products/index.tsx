import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Award, DollarSign, FolderTree, Layers, Package, Plus, PrinterIcon, Ruler, Shield, Upload } from 'lucide-react';
import { BiSolidCategory } from "react-icons/bi";
import { FaBarcode, FaFileImport, FaLayerGroup, FaPlusCircle, FaShieldAlt } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { MdInventory, MdStars } from "react-icons/md";
import { RiPriceTag3Fill } from "react-icons/ri";
import { TbRulerMeasure } from "react-icons/tb";
import AddProductTab from './tabs/add-product-tab';
import BrandsTab from './tabs/brands-tab';
import CategoriesTab from './tabs/categories-tab';
import ImportOpeningStockTab from './tabs/import-opening-stock-tab';
import ImportProductsTab from './tabs/import-products-tab';
import ListProductsTab from './tabs/list-products-tab';
import PrintLabelsTab from './tabs/print-labels-tab';
import SellingPriceGroupsTab from './tabs/selling-price-groups-tab';
import UnitsTab from './tabs/units-tab';
import VariationsTab from './tabs/variations-tab';
import WarrantiesTab from './tabs/warranties-tab';
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products Management',
    href: '/products',
  },
];

interface ProductsPageProps {
  activeTab?: string;
}

export default function Products({ activeTab = 'list' }: ProductsPageProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products Management" />

      <div className="mx-auto p-6">
        <Tabs defaultValue={activeTab} className="w-full">
          {(() => {
            const tabs = [
              {
                value: "list",
                icon: <MdInventory className="h-4 w-4" />,
                label: "List",
              },
              {
                value: "add",
                icon: <FaPlusCircle className="h-4 w-4" />,
                label: "Add",
              },
              {
                value: "print-labels",
                icon: <FaBarcode className="h-4 w-4" />,
                label: "Print Labels",
              },
              {
                value: "variations",
                icon: <FaLayerGroup className="h-4 w-4" />,
                label: "Variations",
              },
              {
                value: "import",
                icon: <FaFileImport className="h-4 w-4" />,
                label: "Import",
              },
              {
                value: "import-opening-stock",
                icon: <GiArchiveRegister className="h-4 w-4" />,
                label: "Import Opening Stock",
              },
              {
                value: "selling-price-group",
                icon: <RiPriceTag3Fill className="h-4 w-4" />,
                label: "Selling Price Group",
              },
              {
                value: "units",
                icon: <TbRulerMeasure className="h-4 w-4" />,
                label: "Units",
              },
              {
                value: "categories",
                icon: <BiSolidCategory className="h-4 w-4" />,
                label: "Categories",
              },
              {
                value: "brands",
                icon: <MdStars className="h-4 w-4" />,
                label: "Brands",
              },
              {
                value: "warranties",
                icon: <FaShieldAlt className="h-4 w-4" />,
                label: "Warranties",
              },
            ];
            return (
              <TabsList className="bg-muted text-muted-foreground inline-flex h-10 w-fit items-center justify-start rounded-md p-1">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2 text-sm" tooltip={tab.label}>
                    {tab.icon}
                    <span className="hidden xl:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            );
          })()}

          <div className="mt-6">
            <TabsContent value="list" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Product Inventory
                  </CardTitle>
                  <CardDescription>View and manage all products in your inventory system.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ListProductsTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Product
                  </CardTitle>
                  <CardDescription>Create a new product in your inventory system.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AddProductTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="print-labels" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PrinterIcon className="h-5 w-5" />
                    Print Product Labels
                  </CardTitle>
                  <CardDescription>Generate and print barcode labels for your products.</CardDescription>
                </CardHeader>
                <CardContent>
                  <PrintLabelsTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="variations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    Product Variations
                  </CardTitle>
                  <CardDescription>Manage product variations like size, color, and other attributes.</CardDescription>
                </CardHeader>
                <CardContent>
                  <VariationsTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="import" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Import Products
                  </CardTitle>
                  <CardDescription>Bulk import products using CSV or Excel files.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ImportProductsTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="import-opening-stock" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Import Opening Stock
                  </CardTitle>
                  <CardDescription>Import initial stock quantities for your products.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ImportOpeningStockTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="selling-price-group" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Selling Price Groups
                  </CardTitle>
                  <CardDescription>Manage different pricing groups for various customer segments.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SellingPriceGroupsTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="units" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="h-5 w-5" />
                    Product Units
                  </CardTitle>
                  <CardDescription>Define measurement units for your products (kg, pieces, liters, etc.).</CardDescription>
                </CardHeader>
                <CardContent>
                  <UnitsTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderTree className="h-5 w-5" />
                    Product Categories
                  </CardTitle>
                  <CardDescription>Organize products into categories and subcategories.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CategoriesTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="brands" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Product Brands
                  </CardTitle>
                  <CardDescription>Manage brand information for your products.</CardDescription>
                </CardHeader>
                <CardContent>
                  <BrandsTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="warranties" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Product Warranties
                  </CardTitle>
                  <CardDescription>Define warranty terms and conditions for your products.</CardDescription>
                </CardHeader>
                <CardContent>
                  <WarrantiesTab />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout >
  );
}
