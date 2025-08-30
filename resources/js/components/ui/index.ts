// Main table component exports
export { DynamicTable } from "./dynamic-table";
export type {
  DynamicTableProps,
  DynamicTableColumn,
  ActionColumn,
  TableColumn,
  ActionButton,
} from "./dynamic-table";

// Helper hooks and utilities
export {
  useTableActions,
  createTableColumns,
  TableColumnsBuilder,
  cellRenderers,
} from "../hooks/use-table-actions";
export type {
  UseTableActionsProps,
  TableColumnBuilder,
} from "../hooks/use-table-actions";

// Example components (optional)
export {
  UsersTableExample,
  ProductsTableExample,
  SimpleTableExample,
  AdvancedTableExample,
} from "../examples/table-examples";
