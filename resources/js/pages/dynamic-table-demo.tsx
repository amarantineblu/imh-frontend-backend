// import React from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { 
//   UsersTableExample, 
//   ProductsTableExample, 
//   SimpleTableExample, 
//   AdvancedTableExample 
// } from "@/components/examples/table-examples";

// export default function DynamicTableDemo() {
//   return (
//     <div className="container mx-auto py-8 space-y-8">
//       <div className="text-center space-y-4">
//         <h1 className="text-4xl font-bold">Dynamic Table Component Demo</h1>
//         <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//           A comprehensive, type-safe, and highly customizable table component built with 
//           TanStack React Table and shadcn/ui. Features sorting, filtering, pagination, 
//           row selection, and custom actions.
//         </p>
//       </div>

//       <Tabs defaultValue="users" className="space-y-6">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="users">Users Table</TabsTrigger>
//           <TabsTrigger value="products">Products Table</TabsTrigger>
//           <TabsTrigger value="simple">Simple Table</TabsTrigger>
//           <TabsTrigger value="advanced">Advanced Table</TabsTrigger>
//         </TabsList>

//         <TabsContent value="users" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Users Management Table</CardTitle>
//               <CardDescription>
//                 Demonstrates user management with role-based badges, salary formatting, 
//                 email links, and verification status. Includes bulk actions for managing multiple users.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <UsersTableExample />
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="products" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Products Inventory Table</CardTitle>
//               <CardDescription>
//                 Shows product inventory with price formatting, stock status indicators, 
//                 category badges, and description truncation. Includes export functionality.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ProductsTableExample />
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="simple" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Simple Task Table</CardTitle>
//               <CardDescription>
//                 A minimal example showing the basic usage with just data columns 
//                 and simple cell rendering. No pagination or filtering.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <SimpleTableExample />
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="advanced" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Advanced Orders Table</CardTitle>
//               <CardDescription>
//                 Complex example with conditional actions, status-based styling, 
//                 and business logic for order management. Shows disabled states and complex data rendering.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <AdvancedTableExample />
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">🎯 Type Safe</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-muted-foreground">
//               Full TypeScript support with generic types for data and columns. 
//               Catch errors at compile time, not runtime.
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">🔧 Customizable</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-muted-foreground">
//               Customize every aspect: cell renderers, action buttons, styling, 
//               and behavior. Built-in helpers for common use cases.
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">⚡ Performant</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-muted-foreground">
//               Built on TanStack React Table for optimal performance. 
//               Handles large datasets with virtual scrolling support.
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">📱 Responsive</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-muted-foreground">
//               Mobile-friendly design with horizontal scrolling and 
//               responsive controls. Works great on all device sizes.
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">🎨 Themed</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-muted-foreground">
//               Seamlessly integrates with shadcn/ui theme system. 
//               Supports dark mode and custom color schemes.
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">🔍 Searchable</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-muted-foreground">
//               Global search and column-specific filtering. 
//               Smart search across all visible columns.
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Quick Start</CardTitle>
//           <CardDescription>
//             Get started with the Dynamic Table component in just a few lines of code:
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
//             <code>{`import { DynamicTable, TableColumn } from "@/components/ui/dynamic-table";

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// const columns: TableColumn<User>[] = [
//   { accessorKey: "name", header: "Name", sortable: true },
//   { accessorKey: "email", header: "Email" },
// ];

// <DynamicTable data={users} columns={columns} />`}</code>
//           </pre>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
