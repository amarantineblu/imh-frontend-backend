import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';

const summaryData = [
	{ label: 'Opening Stock (By purchase price)', value: '₦ 459.00' },
	{ label: 'Opening Stock (By sale price)', value: '₦ 812.00' },
	{ label: 'Total purchase (Exc. tax, Discount)', value: '₦ 0.00' },
	{ label: 'Total Stock Adjustment', value: '₦ 0.00' },
	{ label: 'Total Expense', value: '₦ 0.00' },
	{ label: 'Total purchase shipping charge', value: '₦ 0.00' },
	{ label: 'Purchase additional expenses', value: '₦ 0.00' },
	{ label: 'Total transfer shipping charge', value: '₦ 0.00' },
	{ label: 'Total Sell discount', value: '₦ 0.00' },
	{ label: 'Total customer reward', value: '₦ 0.00' },
	{ label: 'Total Sell Return', value: '₦ 0.00' },
	{ label: 'Closing stock (By purchase price)', value: '₦ 459.00' },
	{ label: 'Closing stock (By sale price)', value: '₦ 812.00' },
	{ label: 'Total Sales (Exc. tax, Discount)', value: '₦ 37,793,441.20' },
	{ label: 'Total sell shipping charge', value: '₦ 0.00' },
	{ label: 'Sell additional expenses', value: '₦ 0.00' },
	{ label: 'Total Stock Recovered', value: '₦ 0.00' },
	{ label: 'Total Purchase Return', value: '₦ 0.00' },
	{ label: 'Total Purchase discount', value: '₦ 0.00' },
	{ label: 'Total sell round off', value: '₦ 0.00' },
];

const profitSummary = [
	{
		label: 'Gross Profit',
		value: '₦ 37,793,441.20',
		desc: '(Total sell price - Total purchase price)',
	},
	{
		label: 'Net Profit',
		value: '₦ 37,793,441.20',
		desc: 'Gross Profit + (Total sell shipping charge + Sell additional expenses + Total Stock Recovered + Total Purchase discount + Total sell round off ) - ( Total Stock Adjustment + Total Expense + Total purchase shipping charge + Total transfer shipping charge + Purchase additional expenses + Total Sell discount + Total customer reward )',
	},
];

const profitByProduct = [
	{ product: 'BEEF (0016)', profit: '₦ 37,667,111.20' },
	{ product: 'BONES (0026)', profit: '₦ 2,400.00' },
	{ product: 'COW HEAD (0029)', profit: '₦ 6,600.00' },
	{ product: 'COW LAP (1)', profit: '₦ 3,000.00' },
	{ product: 'COW TAIL (0022)', profit: '₦ 4,200.00' },
	{ product: 'FULL COW-BIG (0018)', profit: '₦ 15,000.00' },
	{ product: 'FULL GOAT (0023)', profit: '₦ 1,200.00' },
	{ product: 'FULL KANDA (0024)', profit: '₦ 12,600.00' },
	{ product: 'FULL SHAKY (0019)', profit: '₦ 0.00' },
	{ product: 'GOAT HEAD (0020)', profit: '₦ 1,600.00' },
	{ product: 'SUYA (0014)', profit: '₦ 22,430.00' },
	{ product: 'TOZO (0028)', profit: '₦ 57,300.00' },
];

const profitByCategory = [
	{ category: 'Uncategorized', profit: '₦ 37,793,441.20' },
];
const profitByBrand = [
	{ brand: 'Others', profit: '₦ 37,790,441.20' },
	{ brand: 'COW MEAT', profit: '₦ 3,000.00' },
];
const profitByLocation = [
	{ location: 'IBIYEOMIE MEAT HOUSE', profit: '₦ 37,793,441.20' },
];
const profitByInvoice = [
	{ invoice: '61195', profit: '₦ 600.00' },
	{ invoice: '61196', profit: '₦ 100.00' },
	{ invoice: '61197', profit: '₦ 600.00' },
	{ invoice: '61198', profit: '₦ 200.00' },
	{ invoice: '61199', profit: '₦ 800.00' },
	{ invoice: '61200', profit: '₦ 1,800.00' },
	{ invoice: '61201', profit: '₦ 1,500.00' },
	{ invoice: '61202', profit: '₦ 200.00' },
	{ invoice: '61203', profit: '₦ 200.00' },
	{ invoice: '61204', profit: '₦ 200.00' },
	{ invoice: '61205', profit: '₦ 100.00' },
	{ invoice: '61206', profit: '₦ 200.00' },
	{ invoice: '61207', profit: '₦ 100.00' },
	{ invoice: '61208', profit: '₦ 500.00' },
	{ invoice: '61209', profit: '₦ 800.00' },
	{ invoice: '61210', profit: '₦ 1,100.00' },
	{ invoice: '61211', profit: '₦ 1,000.00' },
	{ invoice: '61212', profit: '₦ 3,500.00' },
	{ invoice: '61213', profit: '₦ 100.00' },
	{ invoice: '61214', profit: '₦ 300.00' },
	{ invoice: '61215', profit: '₦ 150.00' },
	{ invoice: '61216', profit: '₦ 6,000.00' },
	{ invoice: '61217', profit: '₦ 10,000.00' },
	{ invoice: '61218', profit: '₦ 100.00' },
	{ invoice: '61219', profit: '₦ 1,600.00' },
];
const profitByDate = [
	{ date: '01/01/2025', profit: '₦ 202,180.00' },
	{ date: '01/02/2025', profit: '₦ 141,340.00' },
	{ date: '01/03/2025', profit: '₦ 136,540.00' },
	{ date: '01/04/2025', profit: '₦ 204,900.00' },
	{ date: '01/05/2025', profit: '₦ 183,990.00' },
	{ date: '01/06/2025', profit: '₦ 215,030.00' },
	{ date: '01/07/2025', profit: '₦ 118,710.00' },
	{ date: '01/08/2025', profit: '₦ 179,860.00' },
	{ date: '01/09/2025', profit: '₦ 142,650.00' },
	{ date: '01/10/2025', profit: '₦ 124,210.00' },
	{ date: '01/11/2025', profit: '₦ 180,110.00' },
	{ date: '01/12/2025', profit: '₦ 53,280.00' },
	{ date: '01/13/2025', profit: '₦ 127,000.00' },
	{ date: '01/14/2025', profit: '₦ 229,840.00' },
	{ date: '01/15/2025', profit: '₦ 304,660.00' },
	{ date: '01/16/2025', profit: '₦ 162,620.00' },
	{ date: '01/17/2025', profit: '₦ 241,280.00' },
	{ date: '01/18/2025', profit: '₦ 176,200.00' },
	{ date: '01/19/2025', profit: '₦ 93,920.00' },
	{ date: '01/20/2025', profit: '₦ 214,630.00' },
	{ date: '01/21/2025', profit: '₦ 271,280.00' },
	{ date: '01/22/2025', profit: '₦ 211,150.00' },
	{ date: '01/23/2025', profit: '₦ 332,460.00' },
	{ date: '01/24/2025', profit: '₦ 268,370.00' },
	{ date: '01/25/2025', profit: '₦ 261,960.00' },
];
const profitByCustomer = [
	{ customer: '1 MILLION', profit: '₦ 10,199.20' },
	{ customer: '3 3', profit: '₦ 4,219.20' },
	{ customer: '77', profit: '₦ 1,700.00' },
	{ customer: '77 1', profit: '₦ 1,700.00' },
	{ customer: 'A B', profit: '₦ 519.60' },
	{ customer: 'A JOS', profit: '₦ 1,000.00' },
	{ customer: 'A K', profit: '₦ 1,000.40' },
	{ customer: 'A K A', profit: '₦ 35,578.80' },
	{ customer: 'A Y', profit: '₦ 2,800.00' },
	{ customer: 'AA', profit: '₦ 1,400.00' },
	{ customer: 'AAD', profit: '₦ 10,000.00' },
	{ customer: 'AAH', profit: '₦ 2,899.60' },
	{ customer: 'AB', profit: '₦ 300.00' },
	{ customer: 'AB', profit: '₦ 480.00' },
	{ customer: 'AB', profit: '₦ 2,400.00' },
	{ customer: 'AB', profit: '₦ 1,000.00' },
	{ customer: 'ABACHU', profit: '₦ 10,000.00' },
	{ customer: 'ABALI', profit: '₦ 8,048.80' },
	{ customer: 'ABASS', profit: '₦ 86,219.60' },
	{ customer: 'ABBA', profit: '₦ 23,690.00' },
];
const profitByDay = [
	{ day: 'Monday', profit: '₦ 5,842,708.80' },
	{ day: 'Tuesday', profit: '₦ 5,518,847.60' },
	{ day: 'Wednesday', profit: '₦ 6,368,718.00' },
	{ day: 'Thursday', profit: '₦ 5,278,312.60' },
	{ day: 'Friday', profit: '₦ 5,448,082.00' },
	{ day: 'Saturday', profit: '₦ 6,200,069.60' },
	{ day: 'Sunday', profit: '₦ 3,136,702.60' },
];

const columnsProduct: TableColumn<{ product: string; profit: string }> [] = [
	{
		accessorKey: 'product',
		header: 'Product',
		sortable: true,
		filterable: true,
		cell: (value) => <span>{String(value)}</span>,
	},
	{
		accessorKey: 'profit',
		header: 'Gross Profit',
		sortable: true,
		filterable: true,
		cell: (value) => <span>{String(value)}</span>,
	},
];

const columnsCategory: TableColumn<{ category: string; profit: string }>[] = [
	{
		accessorKey: 'category',
		header: 'Category',
		sortable: true,
		filterable: true,
		cell: (value) => <span>{String(value)}</span>,
	},
	{
		accessorKey: 'profit',
		header: 'Gross Profit',
		sortable: true,
		filterable: true,
		cell: (value) => <span>{String(value)}</span>,
	},
];
const columnsBrand: TableColumn<{ brand: string; profit: string }>[] = [
	{
		accessorKey: 'brand',
		header: 'Brand',
		sortable: true,
		filterable: true,
		cell: (value) => <span>{String(value)}</span>,
	},
	{
		accessorKey: 'profit',
		header: 'Gross Profit',
		sortable: true,
		filterable: true,
		cell: (value) => <span>{String(value)}</span>,
	},
];
const columnsLocation: TableColumn<{ location: string; profit: string }>[] = [
	{
		accessorKey: 'location',
		header: 'Location',
		sortable: true,
		filterable: true,
		cell: (value) => <span>{String(value)}</span>,
	},
	{
		accessorKey: 'profit',
		header: 'Gross Profit',
		sortable: true,
		filterable: true,
		cell: (value) => <span>{String(value)}</span>,
	},
];
const columnsInvoice: TableColumn<{ invoice: string; profit: string }>[] = [
	{
		accessorKey: 'invoice',
		header: 'Invoice No.',
		sortable: true,
		filterable: true,
		cell: (value) => <span>{String(value)}</span>,
	},
	{
		accessorKey: 'profit',
		header: 'Gross Profit',
		sortable: true,
		filterable: true,
		cell: (value) => <span>{String(value)}</span>,
	},
];
const columnsDate: TableColumn<{ date: string; profit: string }>[] = [
	{
		accessorKey: 'date',
		header: 'Date',
		sortable: true,
		filterable: true,
		cell: (value) => <span>{String(value)}</span>,
	},
	{
		accessorKey: 'profit',
		header: 'Gross Profit',
		sortable: true,
		filterable: true,
		cell: (value) => <span>{String(value)}</span>,
	},
];
const columnsCustomer: TableColumn<{ customer: string; profit: string }>[] = [
	{
		accessorKey: 'customer',
		header: 'Customer',
		sortable: true,
		filterable: true,
		cell: (value) => <span>{String(value)}</span>,
	},
	{
		accessorKey: 'profit',
		header: 'Gross Profit',
		sortable: true,
		filterable: true,
		cell: (value) => <span>{String(value)}</span>,
	},
];
const columnsDay: TableColumn<{ day: string; profit: string }>[] = [
	{
		accessorKey: 'day',
		header: 'Day',
		sortable: true,
		filterable: true,
		cell: (value) => <span>{String(value)}</span>,
	},
	{
		accessorKey: 'profit',
		header: 'Gross Profit',
		sortable: true,
		filterable: true,
		cell: (value) => <span>{String(value)}</span>,
	},
];

const profitTabs = [
	{ value: 'products', label: 'Products' },
	{ value: 'categories', label: 'Categories' },
	{ value: 'brands', label: 'Brands' },
	{ value: 'locations', label: 'Locations' },
	{ value: 'invoice', label: 'Invoice' },
	{ value: 'date', label: 'Date' },
	{ value: 'customer', label: 'Customer' },
	{ value: 'day', label: 'Day' },
];

export default function ProfitLossReportTab() {
	const [search, setSearch] = useState('');
	const [pageSize, setPageSize] = useState(100);
	const filteredProducts = profitByProduct.filter(row =>
		row.product.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="space-y-8">
			<Card>
				<CardHeader>
					<CardTitle>Profit / Loss Report</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
						{summaryData.map((item, i) => (
							<div key={i} className="flex justify-between border-b py-2 text-sm">
								<span>{item.label}</span>
								<span className="font-semibold">{item.value}</span>
							</div>
						))}
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
						{profitSummary.map((item, i) => (
							<div key={i} className="rounded-lg bg-blue-50 p-4 border border-blue-200">
								<div className="text-lg font-bold mb-1">
									{item.label}: <span className="text-blue-700">{item.value}</span>
								</div>
								<div className="text-xs text-muted-foreground">{item.desc}</div>
							</div>
						))}
					</div>
					<Tabs defaultValue="products" className="mb-4">
						<TabsList className="mb-2 flex flex-wrap gap-2">
							{profitTabs.map((tab: { value: string; label: string }) => (
								<TabsTrigger key={tab.value} value={tab.value} className="capitalize">
									{tab.label}
								</TabsTrigger>
							))}
						</TabsList>
						<TabsContent value="products">
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center gap-2 text-sm">
									Show{' '}
									<select
										className="border rounded px-2 py-1"
										value={pageSize}
										onChange={e => setPageSize(Number(e.target.value))}
									>
										{[100, 200, 500, 1000].map(size => (
											<option key={size} value={size}>{size}</option>
										))}
									</select>
									entries
								</div>
								<div>
									<Input
										type="text"
										placeholder="Search ..."
										value={search}
										onChange={e => setSearch(e.target.value)}
										className="w-48 h-7 px-2 py-1"
									/>
								</div>
							</div>
							<div className="overflow-x-auto rounded-lg border">
								<DynamicTable
									data={filteredProducts.slice(0, pageSize)}
									columns={columnsProduct}
									pageSize={pageSize}
									searchPlaceholder="Search by product..."
									noDataText="No data available in table"
									enableExport
									footer={
										<div className="font-bold bg-blue-50 flex justify-between px-4 py-2">
											<span>Total:</span>
											<span>₦ 37,793,441.20</span>
										</div>
									}
								/>
							</div>
						</TabsContent>
						<TabsContent value="categories">
							<div className="overflow-x-auto rounded-lg border">
								<DynamicTable
									data={profitByCategory}
									columns={columnsCategory}
									pageSize={100}
									searchPlaceholder="Search by category..."
									noDataText="No data available in table"
									enableExport
									footer={
										<div className="font-bold bg-blue-50 flex justify-between px-4 py-2">
											<span>Total:</span>
											<span>₦ 37,793,441.20</span>
										</div>
									}
								/>
							</div>
						</TabsContent>
						<TabsContent value="brands">
							<div className="overflow-x-auto rounded-lg border">
								<DynamicTable
									data={profitByBrand}
									columns={columnsBrand}
									pageSize={100}
									searchPlaceholder="Search by brand..."
									noDataText="No data available in table"
									enableExport
									footer={
										<div className="font-bold bg-blue-50 flex justify-between px-4 py-2">
											<span>Total:</span>
											<span>₦ 37,793,441.20</span>
										</div>
									}
								/>
							</div>
						</TabsContent>
						<TabsContent value="locations">
							<div className="overflow-x-auto rounded-lg border">
								<DynamicTable
									data={profitByLocation}
									columns={columnsLocation}
									pageSize={100}
									searchPlaceholder="Search by location..."
									noDataText="No data available in table"
									enableExport
									footer={
										<div className="font-bold bg-blue-50 flex justify-between px-4 py-2">
											<span>Total:</span>
											<span>₦ 37,793,441.20</span>
										</div>
									}
								/>
							</div>
						</TabsContent>
						<TabsContent value="invoice">
							<div className="overflow-x-auto rounded-lg border">
								<DynamicTable
									data={profitByInvoice}
									columns={columnsInvoice}
									pageSize={100}
									searchPlaceholder="Search by invoice..."
									noDataText="No data available in table"
									enableExport
									footer={
										<div className="font-bold bg-blue-50 flex justify-between px-4 py-2">
											<span>Total:</span>
											<span>₦ 31,750.00</span>
										</div>
									}
								/>
							</div>
						</TabsContent>
						<TabsContent value="date">
							<div className="overflow-x-auto rounded-lg border">
								<DynamicTable
									data={profitByDate}
									columns={columnsDate}
									pageSize={100}
									searchPlaceholder="Search by date..."
									noDataText="No data available in table"
									enableExport
									footer={
										<div className="font-bold bg-blue-50 flex justify-between px-4 py-2">
											<span>Total:</span>
											<span>₦ 4,778,170.00</span>
										</div>
									}
								/>
							</div>
						</TabsContent>
						<TabsContent value="customer">
							<div className="overflow-x-auto rounded-lg border">
								<DynamicTable
									data={profitByCustomer}
									columns={columnsCustomer}
									pageSize={100}
									searchPlaceholder="Search by customer..."
									noDataText="No data available in table"
									enableExport
									footer={
										<div className="font-bold bg-blue-50 flex justify-between px-4 py-2">
											<span>Total:</span>
											<span>₦ 240,595.20</span>
										</div>
									}
								/>
							</div>
						</TabsContent>
						<TabsContent value="day">
							<div className="overflow-x-auto rounded-lg border">
								<DynamicTable
									data={profitByDay}
									columns={columnsDay}
									pageSize={100}
									searchPlaceholder="Search by day..."
									noDataText="No data available in table"
									enableExport
									footer={
										<div className="font-bold bg-blue-50 flex justify-between px-4 py-2">
											<span>Total:</span>
											<span>₦ 37,793,441.20</span>
										</div>
									}
								/>
							</div>
						</TabsContent>
					</Tabs>
					<div className="text-xs text-muted-foreground mt-4">
						Note: Profit by products/categories/brands only considers inline discount. Invoice discount is not considered.
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
