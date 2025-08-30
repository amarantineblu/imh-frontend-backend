# Dynamic Table Component Documentation

The Dynamic Table component is a highly flexible and reusable table component built with TanStack React Table and shadcn/ui components. It supports sorting, filtering, pagination, row selection, and custom actions.

## Features

- ✅ **Type-safe**: Full TypeScript support with generic types
- ✅ **Sorting**: Click column headers to sort (customizable per column)
- ✅ **Filtering**: Global search and individual column filtering
- ✅ **Pagination**: Configurable page sizes with navigation controls
- ✅ **Row Selection**: Single or multiple row selection with checkboxes
- ✅ **Custom Actions**: Row-level and bulk actions with custom buttons
- ✅ **Custom Cell Renderers**: Built-in renderers for common data types
- ✅ **Responsive**: Mobile-friendly design with overflow handling
- ✅ **Loading States**: Built-in loading indicator
- ✅ **Empty States**: Customizable empty message
- ✅ **Flexible Styling**: Full control over appearance with CSS classes

## Basic Usage

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
    sortable: true,
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];

function MyTable() {
  return (
    <DynamicTable
      data={users}
      columns={columns}
    />
  );
}
```

## Column Configuration

### Data Columns

```tsx
interface DynamicTableColumn<TData> {
  accessorKey: keyof TData;          // The property key from your data
  header: string;                    // Column header text
  sortable?: boolean;                // Enable/disable sorting (default: true)
  filterable?: boolean;              // Enable/disable filtering (default: true)
  cell?: (value: any, row: TData) => React.ReactNode; // Custom cell renderer
  width?: string;                    // Fixed width (e.g., "120px")
  minWidth?: string;                 // Minimum width
  maxWidth?: string;                 // Maximum width
  className?: string;                // Custom CSS classes
}
```

### Action Columns

```tsx
interface ActionColumn<TData> {
  type: "actions";
  header?: string;                   // Column header (default: "Actions")
  buttons: ActionButton<TData>[];    // Array of action buttons
  width?: string;                    // Column width
  className?: string;                // Custom CSS classes
}

interface ActionButton<TData> {
  label: string;                     // Button text
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  icon?: React.ComponentType<{ className?: string }>; // Lucide icon component
  onClick: (row: TData, selectedRows?: TData[]) => void;
  disabled?: (row: TData) => boolean; // Function to determine if button is disabled
  className?: string;                // Custom CSS classes
}
```

## Advanced Usage with Helpers

### Using the Column Builder

```tsx
import { createTableColumns, cellRenderers } from "@/hooks/use-table-actions";

const columns = createTableColumns<User>()
  .column({
    key: "name",
    header: "Full Name",
    sortable: true,
    filterable: true,
  })
  .column({
    key: "email",
    header: "Email Address",
    cell: (value) => cellRenderers.email(value),
  })
  .column({
    key: "salary",
    header: "Salary",
    sortable: true,
    cell: (value) => cellRenderers.currency(value),
  })
  .column({
    key: "isActive",
    header: "Status",
    cell: (value) => cellRenderers.badge(value ? "Active" : "Inactive"),
  })
  .actions([
    {
      label: "Edit",
      variant: "outline",
      icon: Edit,
      onClick: (user) => console.log("Edit", user),
    },
    {
      label: "Delete",
      variant: "destructive",
      icon: Trash2,
      onClick: (user) => console.log("Delete", user),
    },
  ])
  .build();
```

### Using the Table Actions Hook

```tsx
import { useTableActions } from "@/hooks/use-table-actions";

function MyComponent() {
  const { rowActions, bulkActions, handleRowSelectionChange } = useTableActions<User>({
    onEdit: (user) => console.log("Editing:", user),
    onDelete: (user) => console.log("Deleting:", user),
    onBulkDelete: (users) => console.log("Bulk delete:", users),
    customActions: [
      {
        label: "Email",
        icon: Mail,
        onClick: (user) => window.open(`mailto:${user.email}`),
      },
    ],
  });

  return (
    <DynamicTable
      data={users}
      columns={columns}
      enableRowSelection={true}
      onRowSelectionChange={handleRowSelectionChange}
      selectedActions={bulkActions}
      showSelectedActions={true}
    />
  );
}
```

## Built-in Cell Renderers

The component includes several built-in cell renderers for common data types:

```tsx
import { cellRenderers } from "@/hooks/use-table-actions";

// Currency formatting
cellRenderers.currency(1234.56) // "$1,234.56"
cellRenderers.currency(1234.56, "EUR") // "€1,234.56"

// Date formatting
cellRenderers.date(new Date()) // "6/4/2025"
cellRenderers.dateTime(new Date()) // "6/4/2025, 10:30:00 AM"

// Badge/Status
cellRenderers.badge("Active", "default") // Green badge
cellRenderers.badge("Inactive", "destructive") // Red badge

// Boolean values
cellRenderers.boolean(true) // "Yes"
cellRenderers.boolean(false, "✅", "❌") // "❌"

// Text truncation
cellRenderers.truncate("Very long text...", 20) // "Very long text..."

// Links
cellRenderers.link("Visit Site", "https://example.com")
cellRenderers.email("user@example.com")
cellRenderers.phone("+1234567890")
```

## Props Reference

### DynamicTable Props

```tsx
interface DynamicTableProps<TData> {
  data: TData[];                     // Your data array
  columns: TableColumn<TData>[];     // Column definitions
  enableRowSelection?: boolean;      // Enable row selection (default: false)
  enableMultiRowSelection?: boolean; // Allow multiple selection (default: true)
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  pageSize?: number;                 // Items per page (default: 20)
  enablePagination?: boolean;        // Enable pagination (default: true)
  enableSorting?: boolean;           // Enable sorting (default: true)
  enableFiltering?: boolean;         // Enable filtering (default: true)
  className?: string;                // Custom CSS classes
  loading?: boolean;                 // Show loading state (default: false)
  emptyMessage?: string;             // Message when no data (default: "No data available")
  searchPlaceholder?: string;        // Search input placeholder
  showSelectedActions?: boolean;     // Show bulk actions (default: false)
  selectedActions?: ActionButton<TData>[]; // Bulk action buttons
}
```

## Examples

### Simple Table

```tsx
<DynamicTable
  data={simpleData}
  columns={[
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name", sortable: true },
    { accessorKey: "status", header: "Status" },
  ]}
/>
```

### Table with Actions

```tsx
<DynamicTable
  data={users}
  columns={[
    { accessorKey: "name", header: "Name", sortable: true },
    { accessorKey: "email", header: "Email" },
    {
      type: "actions",
      buttons: [
        {
          label: "Edit",
          onClick: (user) => editUser(user),
          variant: "outline",
        },
        {
          label: "Delete",
          onClick: (user) => deleteUser(user),
          variant: "destructive",
        },
      ],
    },
  ]}
/>
```

### Table with Row Selection

```tsx
<DynamicTable
  data={users}
  columns={columns}
  enableRowSelection={true}
  onRowSelectionChange={(selectedRows) => {
    console.log("Selected:", selectedRows);
  }}
  selectedActions={[
    {
      label: "Delete Selected",
      variant: "destructive",
      onClick: (_, selectedRows) => deleteUsers(selectedRows),
    },
  ]}
  showSelectedActions={true}
/>
```

### Custom Cell Renderers

```tsx
const columns: TableColumn<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
    sortable: true,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (value) => cellRenderers.currency(value),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (value, row) => {
      const variant = value === "active" ? "default" : "destructive";
      return cellRenderers.badge(value, variant);
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (value) => (
      <div title={value}>
        {cellRenderers.truncate(value, 50)}
      </div>
    ),
  },
];
```

## Styling and Customization

The component uses Tailwind CSS classes and supports custom styling:

```tsx
<DynamicTable
  data={data}
  columns={columns}
  className="custom-table-wrapper"
/>
```

You can also customize individual column styling:

```tsx
{
  accessorKey: "status",
  header: "Status",
  className: "text-center",
  cell: (value) => (
    <span className={`font-bold ${value === 'active' ? 'text-green-600' : 'text-red-600'}`}>
      {value}
    </span>
  ),
}
```

## Performance Tips

1. **Memoize data**: Use `useMemo` for expensive data transformations
2. **Memoize columns**: Define columns outside component or use `useMemo`
3. **Virtual scrolling**: For very large datasets, consider implementing virtual scrolling
4. **Server-side operations**: For large datasets, implement server-side sorting, filtering, and pagination

```tsx
const columns = useMemo(() => [
  { accessorKey: "name", header: "Name" },
  // ... other columns
], []);

const memoizedData = useMemo(() => 
  expensiveDataTransformation(rawData), 
  [rawData]
);
```

## TypeScript Support

The component is fully typed with generics:

```tsx
interface MyDataType {
  id: number;
  name: string;
  email: string;
}

// Type-safe column definitions
const columns: TableColumn<MyDataType>[] = [
  {
    accessorKey: "name", // ✅ TypeScript knows this is valid
    header: "Name",
    cell: (value, row) => {
      // ✅ value is inferred as string
      // ✅ row is inferred as MyDataType
      return <strong>{value}</strong>;
    },
  },
];

// Type-safe table usage
<DynamicTable<MyDataType>
  data={myData}
  columns={columns}
  onRowSelectionChange={(selectedRows: MyDataType[]) => {
    // ✅ selectedRows is properly typed
  }}
/>
```

This dynamic table component provides maximum flexibility while maintaining type safety and ease of use. You can customize every aspect of the table while leveraging powerful built-in features.
