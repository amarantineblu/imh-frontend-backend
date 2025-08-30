import React from 'react';
import { DynamicTable, type DynamicTableColumn, type ActionColumn } from './resources/js/components/ui/dynamic-table';

// Test data type
interface TestData extends Record<string, unknown> {
  id: number;
  name: string;
  price: number;
  status: string;
  description: string;
}

// Sample test data
const testData: TestData[] = [
  {
    id: 1,
    name: "Product A",
    price: 29.99,
    status: "Active",
    description: "This is a longer description that will demonstrate text wrapping functionality within the table cells."
  },
  {
    id: 2,
    name: "Product B",
    price: 149.50,
    status: "Inactive", 
    description: "Another product with different characteristics to test alignment and wrapping."
  },
  {
    id: 3,
    name: "Product C",
    price: 5.25,
    status: "Active",
    description: "Short desc."
  }
];

// Test columns with different alignment options
const columns: (DynamicTableColumn<TestData> | ActionColumn<TestData>)[] = [
  {
    accessorKey: "id",
    header: "ID",
    sortable: true,
    align: "center",
    verticalAlign: "middle",
  },
  {
    accessorKey: "name", 
    header: "Product Name",
    sortable: true,
    filterable: true,
    align: "left",
    verticalAlign: "top",
  },
  {
    accessorKey: "price",
    header: "Price",
    sortable: true,
    align: "right",
    verticalAlign: "middle",
    cell: (value) => `$${Number(value).toFixed(2)}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    sortable: true,
    align: "center",
    verticalAlign: "middle",
    cell: (value) => (
      <span className={`px-2 py-1 rounded text-xs ${
        String(value) === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}>
        {String(value)}
      </span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    align: "left",
    verticalAlign: "top",
  },
  {
    type: "actions",
    header: "Actions",
    align: "center",
    verticalAlign: "middle",
    buttons: [
      {
        label: "Edit",
        variant: "outline",
        onClick: (row) => alert(`Edit ${row.name}`),
      },
      {
        label: "Delete",
        variant: "destructive",
        onClick: (row) => alert(`Delete ${row.name}`),
      },
    ],
  },
];

export default function AlignmentTestTable() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dynamic Table - Alignment Features Test</h1>
        <p className="text-gray-600 mb-4">
          This table demonstrates the new alignment features. Notice how different columns use different horizontal and vertical alignment settings:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-6">
          <li>• <strong>ID:</strong> Center horizontal, Middle vertical</li>
          <li>• <strong>Product Name:</strong> Left horizontal, Top vertical</li>
          <li>• <strong>Price:</strong> Right horizontal, Middle vertical</li>
          <li>• <strong>Status:</strong> Center horizontal, Middle vertical</li>
          <li>• <strong>Description:</strong> Left horizontal, Top vertical (demonstrates text wrapping)</li>
          <li>• <strong>Actions:</strong> Center horizontal, Middle vertical</li>
        </ul>
      </div>
      
      <DynamicTable
        data={testData}
        columns={columns}
        enableRowSelection={true}
        enablePagination={false}
        searchPlaceholder="Search products..."
      />
    </div>
  );
}
