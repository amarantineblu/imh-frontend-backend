// supplierCustomerReport.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Column definitions remain unchanged
export const supplierCustomerReportColumns = [
  { accessorKey: "contact", header: "Contact", sortable: true, filterable: true },
  { accessorKey: "totalPurchase", header: "Total Purchase", cell: (v) => `₦ ${Number(v).toLocaleString(undefined, {minimumFractionDigits:2})}` },
  { accessorKey: "totalPurchaseReturn", header: "Total Purchase Return", cell: (v) => `₦ ${Number(v).toLocaleString(undefined, {minimumFractionDigits:2})}` },
  { accessorKey: "totalSale", header: "Total Sale", cell: (v) => `₦ ${Number(v).toLocaleString(undefined, {minimumFractionDigits:2})}` },
  { accessorKey: "totalSellReturn", header: "Total Sell Return", cell: (v) => `₦ ${Number(v).toLocaleString(undefined, {minimumFractionDigits:2})}` },
  { accessorKey: "openingBalanceDue", header: "Opening Balance Due", cell: (v) => `₦ ${Number(v).toLocaleString(undefined, {minimumFractionDigits:2})}` },
  { accessorKey: "due", header: "Due", cell: (v) => `₦ ${Number(v).toLocaleString(undefined, {minimumFractionDigits:2})}` },
];

// Function to fetch live data from your API
export const fetchSupplierCustomerReportData = async(): Promise<
  {
    contact: string;
    totalPurchase: number;
    totalPurchaseReturn: number;
    totalSale: number;
    totalSellReturn: number;
    openingBalanceDue: number;
    due: number;
  }[]
> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reports/apis`);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data['customer_supplier_report'];
  } catch (error) {
    console.error('Failed to fetch supplier/customer report data:', error);
    return []; // fallback to empty array
  }
}
