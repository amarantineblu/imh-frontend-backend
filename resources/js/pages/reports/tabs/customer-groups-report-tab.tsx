import { DynamicTable } from "@/components/ui/dynamic-table";
import { supplierCustomerReportData, supplierCustomerReportColumns } from "./customer-groups-report-tab-table";
import React from "react";

export default function SupplierCustomerReportTab() {
	// Filter state (for demo, not wired to data)
	const [filters, setFilters] = React.useState({
		group: "",
		type: "",
		location: "",
		contact: "",
		dateRange: "01/01/2025 - 12/31/2025",
		show: 100,
		search: "",
	});

	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-2xl font-bold mb-2">
					Customer Groups Report</h2>
			</div>
			<DynamicTable
				data={supplierCustomerReportData}
				columns={supplierCustomerReportColumns}
				pageSize={filters.show}
				enablePagination={true}
				enableFiltering={true}
				// searchPlaceholder="Search ..."
			/>
		</div>
	);
}
