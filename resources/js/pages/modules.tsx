import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { 
  Shield, 
  Package, 
  ShoppingCart, 
  Factory, 
  FolderOpen, 
  Wrench, 
  Users, 
  BookOpen,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'System',
    href: '/system',
  },
  {
    title: 'Manage Modules',
    href: '/system/modules',
  },
];

interface Module extends Record<string, unknown> {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'available';
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

const mockModules: Module[] = [
  {
    id: '1',
    name: 'Essentials Module',
    description: 'Essentials features for every growing businesses.',
    status: 'active',
    icon: Package,
    category: 'Core',
  },
  {
    id: '2',
    name: 'Superadmin Module',
    description: 'Turn your POS to SaaS application and start earning by selling subscriptions',
    status: 'active',
    icon: Shield,
    category: 'Business',
  },
  {
    id: '3',
    name: 'Woocommerce Module',
    description: 'Sync your Woocommerce store with POS',
    status: 'inactive',
    icon: ShoppingCart,
    category: 'Integration',
  },
  {
    id: '4',
    name: 'Manufacturing Module',
    description: 'Manufacture products from raw materials, organise recipe & ingredients',
    status: 'available',
    icon: Factory,
    category: 'Production',
  },
  {
    id: '5',
    name: 'Project Module',
    description: 'Manage Projects, tasks, tasks time logs, activities and much more.',
    status: 'inactive',
    icon: FolderOpen,
    category: 'Management',
  },
  {
    id: '6',
    name: 'Repair Module',
    description: 'Repair module helps with complete repair service management of electronic goods like Cellphone, Computers, Desktops, Tablets, Television, Watch, Wireless devices, Printers, Electronic instruments and many more similar devices which you can imagine!',
    status: 'available',
    icon: Wrench,
    category: 'Service',
  },
  {
    id: '7',
    name: 'CRM Module',
    description: 'Customer relationship management module',
    status: 'active',
    icon: Users,
    category: 'Customer',
  },
  {
    id: '8',
    name: 'ProductCatalogue',
    description: 'Digital Product catalogue Module',
    status: 'available',
    icon: BookOpen,
    category: 'Product',
  },
];

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>(mockModules);

  const activateModule = (moduleId: string) => {
    setModules(prev => 
      prev.map(module => 
        module.id === moduleId 
          ? { ...module, status: 'active' as const }
          : module
      )
    );
    alert('Module activated successfully!');
  };

  const deactivateModule = (moduleId: string) => {
    if (confirm('Are you sure you want to deactivate this module?')) {
      setModules(prev => 
        prev.map(module => 
          module.id === moduleId 
            ? { ...module, status: 'inactive' as const }
            : module
        )
      );
      alert('Module deactivated successfully!');
    }
  };

  const configureModule = (module: Module) => {
    alert(`Configure ${module.name} settings`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'available':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle;
      case 'inactive':
        return XCircle;
      case 'available':
        return AlertTriangle;
      default:
        return AlertTriangle;
    }
  };

  // Setup table actions for modules
  const { rowActions } = useTableActions<Module>({
    customActions: [
      {
        label: "Activate",
        icon: CheckCircle,
        onClick: (module: Module) => {
          activateModule(module.id);
        },
        variant: "outline",
        className: "text-green-600 hover:text-green-700",
        disabled: (module: Module) => module.status === 'active',
      },
      {
        label: "Deactivate",
        icon: XCircle,
        onClick: (module: Module) => {
          deactivateModule(module.id);
        },
        variant: "ghost",
        className: "text-red-600 hover:text-red-700",
        disabled: (module: Module) => module.status !== 'active',
      },
      {
        label: "Configure",
        icon: Settings,
        onClick: (module: Module) => {
          configureModule(module);
        },
        variant: "ghost",
        disabled: (module: Module) => module.status !== 'active',
      },
    ],
  });

  // Define modules table columns
  const modulesColumns: TableColumn<Module>[] = [
    {
      accessorKey: "name",
      header: "Modules",
      sortable: true,
      filterable: true,
      cell: (value, module) => {
        const IconComponent = module.icon as React.ComponentType<{ className?: string }>;
        return (
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <IconComponent className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-lg">{String(value)}</div>
              <Badge variant="outline" className="mt-1">
                {module.category}
              </Badge>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      sortable: false,
      cell: (value) => (
        <div className="text-sm text-white/60 max-w-md text-wrap  ">
          {String(value)}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      sortable: true,
      filterable: true,
      cell: (value) => {
        const StatusIcon = getStatusIcon(String(value));
        return (
          <div className="flex items-center gap-2">
            <StatusIcon className="h-4 w-4" />
            <Badge className={getStatusColor(String(value))}>
              {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
            </Badge>
          </div>
        );
      },
    },
    {
      type: "actions",
      header: "Actions",
      buttons: rowActions,
    },
  ];

  const stats = {
    total: modules.length,
    active: modules.filter(m => m.status === 'active').length,
    inactive: modules.filter(m => m.status === 'inactive').length,
    available: modules.filter(m => m.status === 'available').length,
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manage Modules" />

      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Manage Modules</h1>
          <p className="text-muted-foreground">Only superadmin can access manage modules</p>
        </div>

        {/* Access Warning */}
        <Alert className="mb-6">
          <Shield className="h-4 w-4" />
          <AlertTitle>Superadmin Access Required</AlertTitle>
          <AlertDescription>
            Only users with superadmin privileges can manage system modules. Please ensure you have the necessary permissions before making changes.
          </AlertDescription>
        </Alert>

        {/* Statistics Cards */}
        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
              <Package className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Modules</CardTitle>
              <CheckCircle className="text-green-600 h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive Modules</CardTitle>
              <XCircle className="text-red-600 h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Modules</CardTitle>
              <AlertTriangle className="text-blue-600 h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.available}</div>
            </CardContent>
          </Card>
        </div>

        {/* Modules Table */}
        <Card>
          <CardHeader>
            <CardTitle>System Modules</CardTitle>
            <CardDescription>
              Manage and configure system modules to extend functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DynamicTable
              data={modules}
              columns={modulesColumns}
              enableRowSelection={false}
              enableSorting={true}
              enableFiltering={true}
              enableColumnVisibility={true}
              enableExport={true}
              exportFilename="system-modules"
              exportTitle="System Modules"
              searchPlaceholder="Search modules by name or description..."
              pageSize={100}
              emptyMessage="No modules available"
            />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}