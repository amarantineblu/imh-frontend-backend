import { Button } from '@/components/ui/button';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Interface definitions
interface ExpenseData {
	id: string;
	category: string;
	totalExpense: number;
}

interface Filters {
	businessLocation: string;
	category: string;
	dateFrom: string;
	dateTo: string;
}

// Mock data for the chart
const mockChartData: { category: string; amount: number }[] = [
	{ category: 'Office Supplies', amount: 150000 },
	{ category: 'Utilities', amount: 75000 },
	{ category: 'Transportation', amount: 95000 },
	{ category: 'Equipment', amount: 220000 },
	{ category: 'Marketing', amount: 180000 },
	{ category: 'Maintenance', amount: 85000 },
	{ category: 'Staff Welfare', amount: 125000 }
];

// Mock data for the table
const mockExpenseData: ExpenseData[] = [
	{
		id: '1',
		category: 'Office Supplies',
		totalExpense: 150000.00
	},
	{
		id: '2',
		category: 'Utilities',
		totalExpense: 75000.00
	},
	{
		id: '3',
		category: 'Transportation',
		totalExpense: 95000.00
	},
	{
		id: '4',
		category: 'Equipment',
		totalExpense: 220000.00
	},
	{
		id: '5',
		category: 'Marketing',
		totalExpense: 180000.00
	},
	{
		id: '6',
		category: 'Maintenance',
		totalExpense: 85000.00
	},
	{
		id: '7',
		category: 'Staff Welfare',
		totalExpense: 125000.00
	},
	{
		id: '8',
		category: 'Professional Services',
		totalExpense: 65000.00
	},
	{
		id: '9',
		category: 'Insurance',
		totalExpense: 45000.00
	},
	{
		id: '10',
		category: 'Communications',
		totalExpense: 35000.00
	}
];

export default function ExpenseReportTab() {
	const [filters, setFilters] = useState<Filters>({
		businessLocation: '',
		category: '',
		dateFrom: '',
		dateTo: ''
	});

	const handleFilterChange = (field: keyof Filters, value: string) => {
		setFilters(prev => ({
			...prev,
			[field]: value
		}));
	};

	const applyFilters = () => {
		// Filter logic would go here
		console.log('Applying filters:', filters);
	};

	const resetFilters = () => {
		setFilters({
			businessLocation: '',
			category: '',
			dateFrom: '',
			dateTo: ''
		});
	};

	// Format currency
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-NG', {
			style: 'currency',
			currency: 'NGN'
		}).format(amount);
	};

	// Expense table columns
	const expenseColumns: TableColumn<ExpenseData>[] = [
		{
			accessorKey: 'category',
			header: 'Expense Categories',
			sortable: true,
			className: 'font-medium'
		},
		{
			accessorKey: 'totalExpense',
			header: 'Total Expense',
			sortable: true,
			align: 'right',
			cell: (value, row) => (
				<span className="font-bold text-green-600">
					{formatCurrency(row.totalExpense)}
				</span>
			)
		}
	];

	// Calculate total amount
	const totalAmount = mockExpenseData.reduce((sum, item) => sum + item.totalExpense, 0);

	return (
		<div className="p-6 rounded-lg shadow-sm">
			<h2 className="text-2xl font-bold mb-6">Expense Report</h2>
			
			{/* Filters Section */}
			<div className="p-4 rounded-lg mb-6">
				<h3 className="text-lg font-semibold mb-4">Filters</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<div className="flex flex-col">
						<label className="text-sm font-medium mb-1">Business Location</label>
						<input 
							type="text" 
							value={filters.businessLocation}
							onChange={(e) => handleFilterChange('businessLocation', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter business location"
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-medium mb-1">Category</label>
						<input 
							type="text" 
							value={filters.category}
							onChange={(e) => handleFilterChange('category', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter category"
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-medium mb-1">Date Range</label>
						<div className="flex gap-2">
							<input 
								type="date" 
								value={filters.dateFrom}
								onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
								className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Select a date range"
							/>
							<span className="self-center">-</span>
							<input 
								type="date" 
								value={filters.dateTo}
								onChange={(e) => handleFilterChange('dateTo', e.target.value)}
								className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>
				</div>
				
				{/* Filter Action Buttons */}
				<div className="flex gap-3 mt-4">
					<Button onClick={applyFilters} className="bg-blue-600 hover:bg-blue-700">
						Apply Filters
					</Button>
					<Button onClick={resetFilters} variant="outline">
						Reset Filters
					</Button>
				</div>
			</div>

			{/* Chart/Progress Display Section */}
			<div className="border border-gray-200 rounded-lg p-6 mb-6">
				<h4 className="text-lg font-semibold mb-4">Expense Categories Overview</h4>
				<div className="h-64 w-full">
					{mockChartData.length > 0 ? (
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={mockChartData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="category" />
								<YAxis />
								<Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Amount']} />
								<Bar dataKey="amount" fill="#3b82f6" />
							</BarChart>
						</ResponsiveContainer>
					) : (
						<div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg">
							<div className="text-center text-gray-500">
								<div className="text-4xl mb-2">📊</div>
								<p className="text-lg">No expense data available</p>
								<p className="text-sm">Chart will display when data is available</p>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Total Section */}
			<div className="border border-gray-200 rounded-lg p-4 mb-6">
				<div className="flex justify-between items-center">
					<h4 className="text-lg font-semibold">Total:</h4>
					<div className="text-right">
						<p className="text-lg font-bold text-green-600">{formatCurrency(totalAmount)}</p>
					</div>
				</div>
			</div>

			{/* Expense Table */}
			<DynamicTable 
				data={mockExpenseData}
				columns={expenseColumns}
				enableRowSelection={false}
				enablePagination={true}
				enableSorting={true}
				enableFiltering={true}
				enableColumnVisibility={true}
				enableExport={true}
				exportFilename="expense-report"
				exportTitle="Expense Report"
				pageSize={100}
				searchPlaceholder="Search ..."
				emptyMessage="No data available in table"
				className=""
			/>
		</div>
	);
}
