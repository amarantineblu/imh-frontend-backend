import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { FolderTree, Plus, Receipt } from 'lucide-react';
import AddExpenseTab from './tabs/add-expense-tab';
import ExpenseCategoriesTab from './tabs/expense-categories-tab';
import ListExpensesTab from './tabs/list-expenses-tab';
// import { usePage } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Expenses',
    href: '/expenses',
  },
];

interface ExpensesPageProps {
  activeTab?: string;
}

interface InertiaPageProps extends ExpensesPageProps{
  [key: string]: unknown;   // This is important
  categories:any[]; business_locations:any[]; users:any[]; contacts:any[]; sub_categories:any[];
}

export default function Expenses({ activeTab = 'list' }: ExpensesPageProps) {
  const { categories, business_locations, users, contacts, sub_categories} = usePage<InertiaPageProps>().props;
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Expenses Management" />

      <div className="mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Expenses Management</h1>
          <p className="text-muted-foreground">Track and manage business expenses and expense categories.</p>
        </div>

        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              List Expenses
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Expense
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <FolderTree className="h-4 w-4" />
              Categories
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="list" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    Expense List
                  </CardTitle>
                  <CardDescription>View and manage all business expenses.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ListExpensesTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Expense
                  </CardTitle>
                  <CardDescription>Record a new business expense.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AddExpenseTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderTree className="h-5 w-5" />
                    Expense Categories
                  </CardTitle>
                  <CardDescription>Manage expense categories and subcategories.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ExpenseCategoriesTab categories={categories ?? []} />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
}
