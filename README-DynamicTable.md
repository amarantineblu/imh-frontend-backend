# 🚀 Dynamic Table Component System

A comprehensive, type-safe, and highly reusable table component system built with **TanStack React Table** and **shadcn/ui** components. This system provides everything you need to create powerful data tables with minimal code.

## ✨ Features

- 🎯 **100% Type Safe** - Full TypeScript support with generic types
- 🔧 **Highly Customizable** - Every aspect can be customized
- ⚡ **High Performance** - Built on TanStack React Table
- 📱 **Responsive Design** - Works on all device sizes
- 🎨 **Theme Integration** - Perfect integration with shadcn/ui
- 🔍 **Advanced Filtering** - Global and column-specific search
- 📊 **Smart Sorting** - Multi-column sorting support
- 📄 **Pagination** - Configurable page sizes and navigation
- ✅ **Row Selection** - Single and multi-row selection
- 🎬 **Custom Actions** - Row and bulk action buttons
- 🎭 **Cell Renderers** - Built-in renderers for common data types
- 🌙 **Dark Mode** - Full dark mode support
- ♿ **Accessible** - ARIA compliant and keyboard navigable

## 📦 Installation

The dependencies should already be installed, but if you're setting this up fresh:

```bash
npm install @tanstack/react-table
```

## 🚀 Quick Start

```tsx
import { DynamicTable, TableColumn } from "@/components/ui/dynamic-table";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
];

const columns: TableColumn<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    sortable: true,
    filterable: true,
  },
  {
    accessorKey: "email", 
    header: "Email",
    cell: (value) => <a href={`mailto:${value}`}>{value}</a>,
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];

function MyTable() {
  return <DynamicTable data={users} columns={columns} />;
}
```

## 📁 File Structure

```
resources/js/
├── components/
│   ├── ui/
│   │   ├── dynamic-table.tsx      # Main table component
│   │   └── dynamic-table.md       # Detailed documentation
│   └── examples/
│       └── table-examples.tsx     # Example implementations
├── hooks/
│   └── use-table-actions.ts       # Helper hooks and utilities
└── pages/
    └── dynamic-table-demo.tsx     # Demo page showcasing features
```

## 🎯 Core Components

### 1. DynamicTable Component

The main table component that handles all the heavy lifting:

```tsx
<DynamicTable<User>
  data={users}
  columns={columns}
  enableRowSelection={true}
  enableSorting={true}
  enableFiltering={true}
  enablePagination={true}
  pageSize={20}
  onRowSelectionChange={handleSelection}
/>
```

### 2. Column Builder Helper

Create columns with a fluent API:

```tsx
import { createTableColumns, cellRenderers } from "@/hooks/use-table-actions";

const columns = createTableColumns<User>()
  .column({
    key: "name",
    header: "Full Name",
    sortable: true,
  })
  .column({
    key: "salary",
    header: "Salary",
    cell: (value) => cellRenderers.currency(value),
  })
  .actions([
    { label: "Edit", onClick: (user) => editUser(user) },
    { label: "Delete", onClick: (user) => deleteUser(user) },
  ])
  .build();
```

### 3. Table Actions Hook

Simplify action management:

```tsx
const { rowActions, bulkActions, handleRowSelectionChange } = useTableActions<User>({
  onEdit: (user) => editUser(user),
  onDelete: (user) => deleteUser(user),
  onBulkDelete: (users) => bulkDeleteUsers(users),
});
```

## 🎨 Built-in Cell Renderers

Pre-built renderers for common data types:

```tsx
import { cellRenderers } from "@/hooks/use-table-actions";

// Currency
cellRenderers.currency(1234.56) // "$1,234.56"

// Dates
cellRenderers.date(new Date()) // "6/4/2025"
cellRenderers.dateTime(new Date()) // "6/4/2025, 10:30:00 AM"

// Status badges
cellRenderers.badge("Active", "default") // Green badge
cellRenderers.badge("Inactive", "destructive") // Red badge

// Boolean values
cellRenderers.boolean(true, "✅", "❌") // "✅"

// Links
cellRenderers.email("user@example.com")
cellRenderers.phone("+1234567890")
cellRenderers.link("Visit", "https://example.com")

// Text truncation
cellRenderers.truncate("Very long text...", 30)
```

## 📊 Column Types

### Data Columns

Standard data display columns:

```tsx
{
  accessorKey: "name",              // Property key from your data
  header: "Full Name",              // Column header text
  sortable: true,                   // Enable sorting
  filterable: true,                 // Enable filtering
  cell: (value, row) => <Custom />, // Custom cell renderer
  width: "200px",                   // Fixed width
  className: "text-center",         // Custom styling
}
```

### Action Columns

Buttons for row actions:

```tsx
{
  type: "actions",
  header: "Actions",
  buttons: [
    {
      label: "Edit",
      variant: "outline",
      icon: Edit,
      onClick: (row) => editRow(row),
      disabled: (row) => !row.canEdit,
    },
    {
      label: "Delete",
      variant: "destructive", 
      onClick: (row) => deleteRow(row),
    },
  ],
}
```

## 🔧 Advanced Configuration

### Row Selection with Bulk Actions

```tsx
<DynamicTable
  data={data}
  columns={columns}
  enableRowSelection={true}
  enableMultiRowSelection={true}
  onRowSelectionChange={(selectedRows) => {
    console.log("Selected:", selectedRows);
  }}
  selectedActions={[
    {
      label: "Delete Selected",
      variant: "destructive",
      onClick: (_, selectedRows) => bulkDelete(selectedRows),
    },
  ]}
  showSelectedActions={true}
/>
```

### Custom Cell Rendering

```tsx
{
  accessorKey: "status",
  header: "Status",
  cell: (value, row) => {
    const statusColors = {
      active: "text-green-600",
      inactive: "text-red-600",
      pending: "text-yellow-600",
    };
    
    return (
      <span className={`font-medium ${statusColors[value]}`}>
        {value.toUpperCase()}
      </span>
    );
  },
}
```

### Conditional Actions

```tsx
{
  type: "actions",
  buttons: [
    {
      label: "Approve",
      variant: "default",
      onClick: (row) => approve(row),
      disabled: (row) => row.status !== "pending",
    },
    {
      label: "Reject", 
      variant: "destructive",
      onClick: (row) => reject(row),
      disabled: (row) => row.status === "approved",
    },
  ],
}
```

## 🎬 Real-World Examples

### E-commerce Orders Table

```tsx
const orderColumns = createTableColumns<Order>()
  .column({
    key: "id",
    header: "Order ID",
    width: "120px",
  })
  .column({
    key: "customerName",
    header: "Customer",
    sortable: true,
    filterable: true,
  })
  .column({
    key: "total",
    header: "Total",
    sortable: true,
    cell: (value) => cellRenderers.currency(value),
  })
  .column({
    key: "status",
    header: "Status", 
    cell: (value) => {
      const variants = {
        pending: "outline",
        processing: "default", 
        shipped: "secondary",
        delivered: "default",
        cancelled: "destructive",
      };
      return cellRenderers.badge(value, variants[value]);
    },
  })
  .actions([
    {
      label: "View",
      icon: Eye,
      onClick: (order) => viewOrder(order),
    },
    {
      label: "Ship",
      icon: Truck,
      onClick: (order) => shipOrder(order),
      disabled: (order) => order.status !== "processing",
    },
  ])
  .build();
```

### User Management Table

```tsx
const userColumns = createTableColumns<User>()
  .column({
    key: "avatar", 
    header: "Avatar",
    cell: (value, row) => (
      <img 
        src={value || "/default-avatar.png"} 
        alt={row.name}
        className="w-8 h-8 rounded-full"
      />
    ),
  })
  .column({
    key: "name",
    header: "Name",
    sortable: true,
    filterable: true,
  })
  .column({
    key: "email",
    header: "Email",
    cell: (value) => cellRenderers.email(value),
  })
  .column({
    key: "role",
    header: "Role",
    cell: (value) => cellRenderers.badge(value),
  })
  .column({
    key: "lastLogin",
    header: "Last Login",
    sortable: true,
    cell: (value) => value ? cellRenderers.dateTime(value) : "Never",
  })
  .actions([
    {
      label: "Edit",
      icon: Edit,
      onClick: (user) => editUser(user),
    },
    {
      label: "Reset Password",
      icon: Key,
      onClick: (user) => resetPassword(user),
    },
    {
      label: "Deactivate",
      variant: "destructive",
      onClick: (user) => deactivateUser(user),
      disabled: (user) => user.role === "admin",
    },
  ])
  .build();
```

## 🎨 Styling and Theming

The component uses Tailwind CSS and integrates perfectly with shadcn/ui themes:

```tsx
// Custom table styling
<DynamicTable
  className="custom-table-wrapper"
  data={data}
  columns={columns}
/>

// Custom column styling
{
  accessorKey: "priority",
  header: "Priority",
  className: "text-center font-bold",
  cell: (value) => (
    <span className={`px-2 py-1 rounded text-xs ${
      value === "high" ? "bg-red-100 text-red-800" :
      value === "medium" ? "bg-yellow-100 text-yellow-800" :
      "bg-green-100 text-green-800"
    }`}>
      {value}
    </span>
  ),
}
```

## ⚡ Performance Tips

1. **Memoize data and columns**:
```tsx
const memoizedData = useMemo(() => processData(rawData), [rawData]);
const memoizedColumns = useMemo(() => createColumns(), []);
```

2. **Use server-side operations for large datasets**:
```tsx
<DynamicTable
  data={currentPageData}
  columns={columns}
  enablePagination={false} // Handle on server
  // Implement custom pagination controls
/>
```

3. **Optimize cell renderers**:
```tsx
const MemoizedCell = memo(({ value, row }) => {
  return <ExpensiveComponent value={value} />;
});
```

## 🔧 TypeScript Support

Full TypeScript support with intelligent autocompletion:

```tsx
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

// Type-safe column definitions
const columns: TableColumn<Product>[] = [
  {
    accessorKey: "name", // ✅ Autocomplete knows valid keys
    header: "Product Name",
    cell: (value, row) => {
      // ✅ value is inferred as string
      // ✅ row is inferred as Product
      return <strong>{value}</strong>;
    },
  },
];

// Type-safe table component
<DynamicTable<Product>
  data={products}
  columns={columns}
  onRowSelectionChange={(selected: Product[]) => {
    // ✅ selected is properly typed
    handleSelection(selected);
  }}
/>
```

## 🚦 Getting Started

1. **Copy the files** to your project:
   - `/components/ui/dynamic-table.tsx`
   - `/hooks/use-table-actions.ts`

2. **Define your data type**:
```tsx
interface MyData {
  id: number;
  name: string;
  status: string;
}
```

3. **Create your columns**:
```tsx
const columns = createTableColumns<MyData>()
  .column({ key: "name", header: "Name", sortable: true })
  .column({ key: "status", header: "Status" })
  .build();
```

4. **Render your table**:
```tsx
<DynamicTable data={myData} columns={columns} />
```

## 📚 Documentation

- **[Complete API Documentation](./dynamic-table.md)** - Detailed props and configuration
- **[Examples](./table-examples.tsx)** - Real-world usage examples  
- **[Demo Page](../pages/dynamic-table-demo.tsx)** - Interactive examples

## 🤝 Contributing

The component is designed to be easily extendable. To add new features:

1. Extend the `DynamicTableProps` interface
2. Add new cell renderers to `cellRenderers`
3. Create new helper hooks in `use-table-actions.ts`

## 🎉 Conclusion

This Dynamic Table component system provides everything you need to build powerful, type-safe data tables in React. With its flexible API, comprehensive feature set, and excellent TypeScript support, you can create anything from simple data displays to complex management interfaces.

Start with the basic examples and gradually add more features as needed. The component grows with your requirements! 🚀
