import { DynamicTable } from "@/components/ui/dynamic-table";
import { fetchSupplierCustomerReportData, supplierCustomerReportColumns } from "./supplier-customer-report-tabledata";
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
				<h2 className="text-2xl font-bold mb-2">Customers & Suppliers Reports</h2>
				<div className="flex flex-wrap gap-4 items-end mb-4">
					<div>
						<label className="block text-sm font-medium">Customer Group Name:</label>
						<input className="border rounded px-2 py-1" value={filters.group} onChange={e => setFilters(f => ({...f, group: e.target.value}))} />
					</div>
					<div>
						<label className="block text-sm font-medium">Type:</label>
						<input className="border rounded px-2 py-1" value={filters.type} onChange={e => setFilters(f => ({...f, type: e.target.value}))} />
					</div>
					<div>
						<label className="block text-sm font-medium">Location:</label>
						<input className="border rounded px-2 py-1" value={filters.location} onChange={e => setFilters(f => ({...f, location: e.target.value}))} />
					</div>
					<div>
						<label className="block text-sm font-medium">Contact:</label>
						<input className="border rounded px-2 py-1" value={filters.contact} onChange={e => setFilters(f => ({...f, contact: e.target.value}))} />
					</div>
					<div>
						<label className="block text-sm font-medium">Date Range:</label>
						<input className="border rounded px-2 py-1" value={filters.dateRange} onChange={e => setFilters(f => ({...f, dateRange: e.target.value}))} />
					</div>
					<div>
						<label className="block text-sm font-medium">Show</label>
						<select className="border rounded px-2 py-1" value={filters.show} onChange={e => setFilters(f => ({...f, show: Number(e.target.value)}))}>
							{[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
						</select>
						<span className="ml-2">entries</span>
					</div>
					<div>
						<label className="block text-sm font-medium">Search</label>
						<input className="border rounded px-2 py-1" value={filters.search} onChange={e => setFilters(f => ({...f, search: e.target.value}))} />
					</div>
				</div>
			</div>
			<DynamicTable
				data={fetchSupplierCustomerReportData}
				columns={supplierCustomerReportColumns}
				pageSize={filters.show}
				enablePagination={true}
				enableFiltering={true}
				searchPlaceholder="Search ..."
			/>
		</div>
	);
}
