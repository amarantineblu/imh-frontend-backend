import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export default function PurchaseSaleReportTab() {
	// Table columns and data for tax report
	const [inputTaxSearch, setInputTaxSearch] = useState('');
	const [outputTaxSearch, setOutputTaxSearch] = useState('');
	const [expenseTaxSearch, setExpenseTaxSearch] = useState('');
	const [inputTaxPageSize, setInputTaxPageSize] = useState(100);
	const [outputTaxPageSize, setOutputTaxPageSize] = useState(100);
	const [expenseTaxPageSize, setExpenseTaxPageSize] = useState(100);

	const inputTaxColumns: TableColumn<any>[] = [
		{ accessorKey: 'date', header: 'Date', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
		{ accessorKey: 'reference', header: 'Reference No', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
		{ accessorKey: 'supplier', header: 'Supplier', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
		{ accessorKey: 'taxNumber', header: 'Tax number', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
		{ accessorKey: 'totalAmount', header: 'Total amount', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
		{ accessorKey: 'paymentMethod', header: 'Payment Method', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
		{ accessorKey: 'discount', header: 'Discount', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
	];
	const outputTaxColumns: TableColumn<any>[] = [
		{ accessorKey: 'date', header: 'Date', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
		{ accessorKey: 'invoice', header: 'Invoice No.', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
		{ accessorKey: 'customer', header: 'Customer', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
		{ accessorKey: 'taxNumber', header: 'Tax number', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
		{ accessorKey: 'totalAmount', header: 'Total amount', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
		{ accessorKey: 'paymentMethod', header: 'Payment Method', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
		{ accessorKey: 'discount', header: 'Discount', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
	];
	const expenseTaxColumns: TableColumn<any>[] = [
		{ accessorKey: 'date', header: 'Date', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
		{ accessorKey: 'reference', header: 'Reference No', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
		{ accessorKey: 'taxNumber', header: 'Tax number', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
		{ accessorKey: 'totalAmount', header: 'Total amount', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
		{ accessorKey: 'paymentMethod', header: 'Payment Method', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
	];
	// Empty data for now
	const inputTaxData: any[] = [];
	const outputTaxData: any[] = [];
	const expenseTaxData: any[] = [];

	const handlePrint = () => {
		window.print();
	};
	return (
		<div className="space-y-8">
			<Card>
				<CardHeader>
					<CardTitle>Tax Report</CardTitle>
					<div className="text-muted-foreground text-sm mt-1">Tax details for the selected date range</div>
				</CardHeader>
				<CardContent>
					{/* Filters */}
					<div className="flex flex-wrap gap-4 mb-6">
						<div>
							<span className="font-semibold">Business Location:</span>
							<span className="ml-2">{/* TODO: Add select */}</span>
						</div>
						<div>
							<span className="font-semibold">Contact:</span>
							<span className="ml-2">{/* TODO: Add select */}</span>
						</div>
						<div>
							<span className="font-semibold">Date Range:</span>
							<span className="ml-2">01/01/2025 - 12/31/2025</span>
						</div>
					</div>
					<div className="rounded-lg bg-blue-50 p-4 border border-blue-200 mb-8">
						<div className="text-lg font-bold mb-1">
							Output Tax - Input Tax - Expense Tax: <span className="text-blue-700">₦ 0.00</span>
						</div>
						<div className="text-xs text-muted-foreground">
							Overall (Input - Output - Expense)
						</div>
					</div>
					<Tabs defaultValue="input" className="mb-4">
						<TabsList className="mb-2 flex flex-wrap gap-2">
							<TabsTrigger value="input">Input Tax</TabsTrigger>
							<TabsTrigger value="output">Output Tax</TabsTrigger>
							<TabsTrigger value="expense">Expense Tax</TabsTrigger>
						</TabsList>
						<TabsContent value="input">
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center gap-2 text-sm">
									Show{' '}
									<select
										className="border rounded px-2 py-1"
										value={inputTaxPageSize}
										onChange={e => setInputTaxPageSize(Number(e.target.value))}
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
										value={inputTaxSearch}
										onChange={e => setInputTaxSearch(e.target.value)}
										className="w-48 h-7 px-2 py-1"
									/>
								</div>
							</div>
							<DynamicTable
								data={inputTaxData}
								columns={inputTaxColumns}
								pageSize={inputTaxPageSize}
								searchPlaceholder="Search ..."
								noDataText="No data available in table"
								enableExport
								footer={<div className="font-bold bg-blue-50 flex justify-between px-4 py-2"><span>Total:</span><span>₦ 0.00</span></div>}
							/>
						</TabsContent>
						<TabsContent value="output">
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center gap-2 text-sm">
									Show{' '}
									<select
										className="border rounded px-2 py-1"
										value={outputTaxPageSize}
										onChange={e => setOutputTaxPageSize(Number(e.target.value))}
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
										value={outputTaxSearch}
										onChange={e => setOutputTaxSearch(e.target.value)}
										className="w-48 h-7 px-2 py-1"
									/>
								</div>
							</div>
							<DynamicTable
								data={outputTaxData}
								columns={outputTaxColumns}
								pageSize={outputTaxPageSize}
								searchPlaceholder="Search ..."
								noDataText="No data available in table"
								enableExport
								footer={<div className="font-bold bg-blue-50 flex justify-between px-4 py-2"><span>Total:</span><span>₦ 0.00</span></div>}
							/>
						</TabsContent>
						<TabsContent value="expense">
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center gap-2 text-sm">
									Show{' '}
									<select
										className="border rounded px-2 py-1"
										value={expenseTaxPageSize}
										onChange={e => setExpenseTaxPageSize(Number(e.target.value))}
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
										value={expenseTaxSearch}
										onChange={e => setExpenseTaxSearch(e.target.value)}
										className="w-48 h-7 px-2 py-1"
									/>
								</div>
							</div>
							<DynamicTable
								data={expenseTaxData}
								columns={expenseTaxColumns}
								pageSize={expenseTaxPageSize}
								searchPlaceholder="Search ..."
								noDataText="No data available in table"
								enableExport
								footer={<div className="font-bold bg-blue-50 flex justify-between px-4 py-2"><span>Total:</span><span>₦ 0.00</span></div>}
							/>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
