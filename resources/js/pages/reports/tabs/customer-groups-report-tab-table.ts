// Table data for demo (replace with real data from API or props)
export const supplierCustomerReportData = [
	{
		customerGroup: "Customer Group",
		totalSale: 38343588.2,
	},
];

export const supplierCustomerReportColumns = [
	{ accessorKey: "customerGroup", header: "Customer Group", sortable: true, filterable: true },
	{ accessorKey: "totalSale", header: "Total Sale", cell: (v: string | number) => `₦ ${Number(v).toLocaleString(undefined, { minimumFractionDigits: 2 })}` },
];
