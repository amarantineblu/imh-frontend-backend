import { useState, useCallback } from "react";

export interface UseTableActionsProps<TData extends Record<string, unknown>> {
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  onView?: (row: TData) => void;
  onBulkDelete?: (rows: TData[]) => void;
  onBulkEdit?: (rows: TData[]) => void;
  customActions?: ActionButton<TData>[];
  customBulkActions?: ActionButton<TData>[];
}

export interface ActionButton<TData extends Record<string, unknown>> {
  label: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  icon?: React.ComponentType<{ className?: string }>;
  onClick: (row: TData, selectedRows?: TData[]) => void;
  disabled?: (row: TData) => boolean;
  className?: string;
}

export interface TableColumn<TData extends Record<string, unknown>> {
  accessorKey?: keyof TData;
  header: string;
  type?: 'actions';
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  cell?: (value: unknown, row: TData) => React.ReactNode;
  buttons?: ActionButton<TData>[];
}

export function useTableActions<TData extends Record<string, unknown>>({
  onEdit,
  onDelete,
  onView,
  onBulkDelete,
  onBulkEdit,
  customActions = [],
  customBulkActions = [],
}: UseTableActionsProps<TData> = {}) {
  const [selectedRows, setSelectedRows] = useState<TData[]>([]);

  // Row actions
  const rowActions: ActionButton<TData>[] = [
    ...(onView ? [{
      label: "View",
      variant: "ghost" as const,
      onClick: onView,
    }] : []),
    ...(onEdit ? [{
      label: "Edit",
      variant: "outline" as const,
      onClick: onEdit,
    }] : []),
    ...(onDelete ? [{
      label: "Delete",
      variant: "destructive" as const,
      onClick: onDelete,
    }] : []),
    ...customActions,
  ];

  // Bulk actions
  const bulkActions: ActionButton<TData>[] = [
    ...(onBulkEdit ? [{
      label: "Edit Selected",
      variant: "outline" as const,
      onClick: (_: TData, rows?: TData[]) => onBulkEdit(rows || []),
    }] : []),
    ...(onBulkDelete ? [{
      label: "Delete Selected",
      variant: "destructive" as const,
      onClick: (_: TData, rows?: TData[]) => onBulkDelete(rows || []),
    }] : []),
    ...customBulkActions,
  ];

  const handleRowSelectionChange = useCallback((rows: TData[]) => {
    setSelectedRows(rows);
  }, []);

  return {
    selectedRows,
    rowActions,
    bulkActions,
    handleRowSelectionChange,
    hasActions: rowActions.length > 0,
    hasBulkActions: bulkActions.length > 0,
  };
}

export interface TableColumnBuilder<TData extends Record<string, unknown>> {
  key: keyof TData;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  cell?: (value: unknown, row: TData) => React.ReactNode;
}

export class TableColumnsBuilder<TData extends Record<string, unknown>> {
  private columns: TableColumn<TData>[] = [];

  column(config: TableColumnBuilder<TData>): this {
    this.columns.push({
      accessorKey: config.key,
      header: config.header,
      sortable: config.sortable,
      filterable: config.filterable,
      width: config.width,
      cell: config.cell,
    });
    return this;
  }

  actions(buttons: ActionButton<TData>[], header = "Actions", width?: string): this {
    this.columns.push({
      type: "actions",
      header,
      buttons,
      width,
    });
    return this;
  }

  build(): TableColumn<TData>[] {
    return this.columns;
  }
}

// Helper function to create columns more easily
export function createTableColumns<TData extends Record<string, unknown>>(): TableColumnsBuilder<TData> {
  return new TableColumnsBuilder<TData>();
}

// Non-JSX utility functions for common cell formatting
export const cellFormatters = {
  currency: (value: number, currency = "USD") => {
    if (typeof value !== 'number') return String(value);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value);
  },
  
  date: (value: Date | string, options?: Intl.DateTimeFormatOptions) => {
    if (!value) return '';
    const date = typeof value === "string" ? new Date(value) : value;
    if (isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString("en-US", options);
  },
  
  dateTime: (value: Date | string) => {
    if (!value) return '';
    const date = typeof value === "string" ? new Date(value) : value;
    if (isNaN(date.getTime())) return String(value);
    return date.toLocaleString("en-US");
  },
  
  boolean: (value: boolean, trueText = "Yes", falseText = "No") => {
    return value ? trueText : falseText;
  },
  
  truncate: (value: string, length = 50) => {
    if (!value || typeof value !== 'string') return String(value);
    if (value.length <= length) return value;
    return value.substring(0, length) + "...";
  },

  formatNumber: (value: number, decimals = 0) => {
    if (typeof value !== 'number') return String(value);
    return value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  },

  percentage: (value: number, decimals = 1) => {
    if (typeof value !== 'number') return String(value);
    return `${(value * 100).toFixed(decimals)}%`;
  },
};
