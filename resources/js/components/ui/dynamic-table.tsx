import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  ChevronUp,
  MoreHorizontal,
  Download,
  FileText,
  FileSpreadsheet,
  Printer
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { LuFilter } from "react-icons/lu";

import { exportToCSV, exportToExcel, exportToPDF, printTable, type ExportColumn } from "@/lib/export-utils";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./tooltip";

// Types for column definition
export interface ActionButton<TData> {
  label: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  icon?: React.ComponentType<{ className?: string }>;
  onClick: (row: TData, selectedRows?: TData[]) => void;
  disabled?: (row: TData) => boolean;
  className?: string;
}

export interface DynamicTableColumn<TData> {
  accessorKey: keyof TData;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  cell?: (value: unknown, row: TData) => React.ReactNode;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  className?: string;
  hidden?: boolean; // Default visibility state
  hideable?: boolean; // Whether the column can be hidden/shown by users (default: true)
  align?: "left" | "center" | "right"; // Horizontal alignment
  verticalAlign?: "top" | "middle" | "bottom"; // Vertical alignment
}

export interface ActionColumn<TData> {
  type: "actions";
  header?: string;
  buttons: ActionButton<TData>[];
  width?: string;
  className?: string;
  hidden?: boolean; // Default visibility state
  hideable?: boolean; // Whether the column can be hidden/shown by users (default: true)
  align?: "left" | "center" | "right"; // Horizontal alignment
  verticalAlign?: "top" | "middle" | "bottom"; // Vertical alignment
}

export type TableColumn<TData> = DynamicTableColumn<TData> | ActionColumn<TData>;

export interface DynamicTableProps<TData> {
  data: TData[];
  columns: TableColumn<TData>[];
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  pageSize?: number;
  enablePagination?: boolean;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableColumnVisibility?: boolean; // Enable column visibility controls (default: true)
  enableExport?: boolean; // Enable export functionality (default: false)
  exportFilename?: string; // Custom filename for exports (default: "export")
  exportTitle?: string; // Title for exports (default: undefined)
  className?: string;
  loading?: boolean;
  emptyMessage?: string;
  searchPlaceholder?: string;
  showSelectedActions?: boolean;
  selectedActions?: ActionButton<TData>[];
}

export function DynamicTable<TData extends Record<string, unknown>>({
  data,
  columns,
  enableRowSelection = false,
  enableMultiRowSelection = true,
  onRowSelectionChange,
  pageSize = 20,
  enablePagination = true,
  enableSorting = true,
  enableFiltering = true,
  enableColumnVisibility = true,
  enableExport = false,
  exportFilename = "export",
  exportTitle,
  className,
  loading = false,
  emptyMessage = "No data available",
  searchPlaceholder = "Search...",
  showSelectedActions = false,
  selectedActions = [],
}: DynamicTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  // Initialize column visibility based on column definitions
  const initialColumnVisibility = useMemo(() => {
    const visibility: VisibilityState = {};
    columns.forEach((column) => {
      if (column.hidden) {
        if ("type" in column && column.type === "actions") {
          visibility["actions"] = false;
        } else {
          const dataColumn = column as DynamicTableColumn<TData>;
          visibility[String(dataColumn.accessorKey)] = false;
        }
      }
    });
    return visibility;
  }, [columns]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumnVisibility);

  // Create table columns from our column definitions
  const tableColumns = useMemo<ColumnDef<TData>[]>(() => {
    const cols: ColumnDef<TData>[] = [];

    // Add selection column if enabled
    if (enableRowSelection) {
      cols.push({
        id: "select",
        header: ({ table }) => (
          enableMultiRowSelection ? (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          ) : null
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }

    // Add data columns
    columns.forEach((column) => {
      if ("type" in column && column.type === "actions") {
        // Action column (make this narrower than data columns)
        cols.push({
          id: "actions",
          header: column.header || "Actions",
          cell: ({ row }) => {
            const buttons = column.buttons.filter(button => {
              return button.disabled ? !button.disabled(row.original) : true;
            });

            if (buttons.length === 0) {
              return null;
            }

            if (buttons.length === 1) {
              const button = buttons[0];
              const Icon = button.icon;

              return (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={button.variant || "ghost"}
                      size="icon"
                      onClick={() => button.onClick(row.original)}
                      className={cn("h-8 w-8", button.className)}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span className="sr-only">{button.label}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{button.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            // Multiple buttons - use dropdown menu
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {buttons.map((button, index) => {
                    const Icon = button.icon;
                    return (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => button.onClick(row.original)}
                        className="cursor-pointer"
                      >
                        {Icon && <Icon className="h-4 w-4 mr-2" />}
                        {button.label}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
          enableSorting: false,
          enableHiding: column.hideable !== false,
        });
      } else {
        // Data column
        const dataColumn = column as DynamicTableColumn<TData>;
        cols.push({
          accessorKey: dataColumn.accessorKey as string,
          header: ({ column: col }) => {
            if (!enableSorting || dataColumn.sortable === false) {
              return <div className="font-medium">{dataColumn.header}</div>;
            }

            return (
              <Button
                variant="ghost"
                onClick={() => col.toggleSorting(col.getIsSorted() === "asc")}
                className="h-auto p-0 font-medium hover:bg-transparent"
              >
                {dataColumn.header}
                {col.getIsSorted() === "asc" ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : col.getIsSorted() === "desc" ? (
                  <ChevronDown className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronsUpDown className="ml-2 h-4 w-4" />
                )}
              </Button>
            );
          },
          cell: ({ getValue, row }) => {
            const value = getValue();
            if (dataColumn.cell) {
              return dataColumn.cell(value, row.original);
            }

            // Default cell rendering based on value type
            if (value === null || value === undefined) {
              return <span className="text-muted-foreground">-</span>;
            }

            if (typeof value === "boolean") {
              return value ? "Yes" : "No";
            }

            if (value instanceof Date) {
              return value.toLocaleDateString();
            }

            if (typeof value === "object") {
              return JSON.stringify(value);
            }

            return String(value);
          },
          enableSorting: enableSorting && dataColumn.sortable !== false,
          enableColumnFilter: enableFiltering && dataColumn.filterable !== false,
          enableHiding: dataColumn.hideable !== false,
        });
      }
    });

    return cols;
  }, [columns, enableRowSelection, enableMultiRowSelection, enableSorting, enableFiltering]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  // Helper function to prepare export columns
  const prepareExportColumns = (): ExportColumn[] => {
    return columns
      .filter(column => {
        // Exclude action columns from export
        return !("type" in column && column.type === "actions");
      })
      .map(column => {
        const dataColumn = column as DynamicTableColumn<TData>;
        return {
          key: String(dataColumn.accessorKey),
          header: dataColumn.header,
          accessor: (data: unknown) => {
            const row = data as TData;
            const value = row[dataColumn.accessorKey];

            // Handle special cases for export data formatting
            if (dataColumn.accessorKey === 'name') {
              // For name column, just return the raw name value
              return String(value);
            } else if (dataColumn.accessorKey === 'salesCommissionPercentage') {
              // For commission percentage, format as percentage with 2 decimals
              return `${Number(value).toFixed(2)}%`;
            } else {
              // For all other columns, return the raw value as string
              return String(value || '');
            }
          }
        };
      });
  };

  // Export handlers
  const handleExportCSV = () => {
    const exportColumns = prepareExportColumns();
    const filteredData = table.getFilteredRowModel().rows.map(row => row.original);
    exportToCSV({
      filename: exportFilename,
      title: exportTitle,
      columns: exportColumns,
      data: filteredData,
    });
  };

  const handleExportExcel = () => {
    const exportColumns = prepareExportColumns();
    const filteredData = table.getFilteredRowModel().rows.map(row => row.original);
    exportToExcel({
      filename: exportFilename,
      title: exportTitle,
      columns: exportColumns,
      data: filteredData,
    });
  };

  const handleExportPDF = () => {
    const exportColumns = prepareExportColumns();
    const filteredData = table.getFilteredRowModel().rows.map(row => row.original);
    exportToPDF({
      filename: exportFilename,
      title: exportTitle,
      columns: exportColumns,
      data: filteredData,
    });
  };

  const handlePrint = () => {
    const exportColumns = prepareExportColumns();
    const filteredData = table.getFilteredRowModel().rows.map(row => row.original);
    printTable({
      title: exportTitle,
      columns: exportColumns,
      data: filteredData,
    });
  };
  React.useEffect(() => {
    if (onRowSelectionChange) {
      const selectedRows = table.getFilteredSelectedRowModel().rows.map(row => row.original);
      onRowSelectionChange(selectedRows);
    }
  }, [rowSelection, onRowSelectionChange, table]);

  const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;
  const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);

  // Helper function to get alignment classes
  const getAlignmentClasses = (column: TableColumn<TData>) => {
    const horizontalAlign = column.align || "left";
    const verticalAlign = column.verticalAlign || "top";

    const horizontalClasses = {
      left: "text-left justify-start",
      center: "text-center justify-center",
      right: "text-right justify-end"
    };

    const verticalClasses = {
      top: "align-top items-start",
      middle: "align-middle items-center",
      bottom: "align-bottom items-end"
    };

    return {
      horizontal: horizontalClasses[horizontalAlign],
      vertical: verticalClasses[verticalAlign],
      combined: `${horizontalClasses[horizontalAlign]} ${verticalClasses[verticalAlign]}`
    };
  };

  // Helper function to find column definition by header id
  const findColumnDefinition = (headerId: string): TableColumn<TData> | null => {
    if (headerId === "select") return null;

    return columns.find(col => {
      if ("type" in col && col.type === "actions" && headerId === "actions") {
        return true;
      }
      if ("accessorKey" in col) {
        return String(col.accessorKey) === headerId;
      }
      return false;
    }) || null;
  };

  return (
    <div className={cn("space-y-4 container-table", className)}>
      {/* Global Search and Selected Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          {enableFiltering && (
            <input
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full sm:w-auto max-w-xs px-3 py-2 border border-input rounded-md bg-background"
            />
          )}
          {enableRowSelection && selectedRowsCount > 0 && (
            <div className="text-sm text-muted-foreground">
              {selectedRowsCount} row(s) selected
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Column Visibility Dropdown */}
          {enableColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="border-none gap-2 shadow-sm">
                  <LuFilter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] max-h-[400px] overflow-y-auto">
                <div className="p-2">
                  <div className="text-sm font-medium mb-2">Show/Hide Columns</div>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <div key={column.id} className="flex items-center space-x-2 py-1">
                          <Checkbox
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            id={column.id}
                          />
                          <label
                            htmlFor={column.id}
                            className="text-sm font-normal cursor-pointer flex-1"
                          >
                            {typeof column.columnDef.header === 'string'
                              ? column.columnDef.header
                              : column.id.charAt(0).toUpperCase() + column.id.slice(1)
                            }
                          </label>
                        </div>
                      );
                    })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Export Dropdown */}
          {enableExport && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 shadow-sm">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                  {/* <ChevronDown className="h-4 w-4" /> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuItem onClick={handleExportCSV} className="cursor-pointer">
                  <FileText className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportExcel} className="cursor-pointer">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer">
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePrint} className="cursor-pointer">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Selected Actions */}
          {showSelectedActions && selectedRowsCount > 0 && selectedActions.length > 0 && (
            <>
              {selectedActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant={action.variant || "outline"}
                    size={action.size || "sm"}
                    onClick={() => action.onClick(selectedRowsData[0], selectedRowsData)}
                    className={action.className}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {action.label && (
                      <span className={cn(Icon && "ml-1")}>{action.label}</span>
                    )}
                  </Button>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="w-full rounded-md border overflow-hidden">
        <div className="overflow-x-auto max-w-full">
          <Table className="w-full table-auto">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    // Identify column types for better width allocation
                    const isSelectColumn = header.id === "select";
                    const isActionColumn = header.id === "actions";

                    // Get column definition for alignment
                    const columnDef = findColumnDefinition(header.id);
                    const alignmentClasses = columnDef ? getAlignmentClasses(columnDef) : null;

                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "px-4 py-3 whitespace-nowrap",
                          isSelectColumn && "w-[50px]",
                          isActionColumn && "w-[120px]",
                          // Remove min-w-[150px] for natural sizing
                          // Apply alignment classes
                          isSelectColumn || isActionColumn
                            ? "text-center"
                            : alignmentClasses?.horizontal || "text-left"
                        )}
                      >
                        <div className={cn(
                          isSelectColumn || isActionColumn
                            ? "flex items-center justify-center"
                            : `${alignmentClasses?.horizontal || "justify-start"}`
                        )}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="ml-2">Loading...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isSelectColumn = cell.column.id === "select";
                      const isActionColumn = cell.column.id === "actions";

                      // Get column definition for alignment
                      const columnDef = findColumnDefinition(cell.column.id);
                      const alignmentClasses = columnDef ? getAlignmentClasses(columnDef) : null;

                      return (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            "px-4 py-3 whitespace-nowrap",
                            isSelectColumn && "w-[50px]",
                            isActionColumn && "w-[120px]",
                            // Remove min-w-[150px] for natural sizing
                            // Apply alignment classes
                            isSelectColumn || isActionColumn
                              ? "text-center"
                              : alignmentClasses?.horizontal || "text-left"
                          )}
                        >
                          <div className={cn(
                            isSelectColumn || isActionColumn
                              ? "flex items-center justify-center"
                              : `${alignmentClasses?.horizontal || "justify-start"}`
                          )}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[100, 200, 500, 1000].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex min-w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 sm:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 sm:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
