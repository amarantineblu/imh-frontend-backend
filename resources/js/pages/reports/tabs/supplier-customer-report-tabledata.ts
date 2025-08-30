// Table data for demo (replace with real data from API or props)
export const supplierCustomerReportData = [
  {
    contact: "Total:",
    totalPurchase: 0,
    totalPurchaseReturn: 0,
    totalSale: 789298.8,
    totalSellReturn: 0,
    openingBalanceDue: 0,
    due: 305154.8,
  },
  {
    contact: "1 MILLION",
    totalPurchase: 0,
    totalPurchaseReturn: 0,
    totalSale: 10200,
    totalSellReturn: 0,
    openingBalanceDue: 0,
    due: 3300,
  },
  // ...add more rows as needed
];

export const supplierCustomerReportColumns = [
  { accessorKey: "contact", header: "Contact", sortable: true, filterable: true },
  { accessorKey: "totalPurchase", header: "Total Purchase", cell: (v) => `₦ ${Number(v).toLocaleString(undefined, {minimumFractionDigits:2})}` },
  { accessorKey: "totalPurchaseReturn", header: "Total Purchase Return", cell: (v) => `₦ ${Number(v).toLocaleString(undefined, {minimumFractionDigits:2})}` },
  { accessorKey: "totalSale", header: "Total Sale", cell: (v) => `₦ ${Number(v).toLocaleString(undefined, {minimumFractionDigits:2})}` },
  { accessorKey: "totalSellReturn", header: "Total Sell Return", cell: (v) => `₦ ${Number(v).toLocaleString(undefined, {minimumFractionDigits:2})}` },
  { accessorKey: "openingBalanceDue", header: "Opening Balance Due", cell: (v) => `₦ ${Number(v).toLocaleString(undefined, {minimumFractionDigits:2})}` },
  { accessorKey: "due", header: "Due", cell: (v) => `₦ ${Number(v).toLocaleString(undefined, {minimumFractionDigits:2})}` },
];
