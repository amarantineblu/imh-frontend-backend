import { Button } from '@/components/ui/button';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

// Interface definitions
interface SalesData {
	id: string;
	date: string;
	invoiceNo: string;
	customerName: string;
	location: string;
	paymentStatus: 'Due' | 'Paid' | 'Partial';
	totalAmount: number;
	totalPaid: number;
	totalRemaining: number;
	[key: string]: unknown; // Add index signature
}

interface ExpenseData {
	id: string;
	date: string;
	referenceNo: string;
	expenseCategory: string;
	location: string;
	paymentStatus: string;
	totalAmount: number;
	expenseFor: string;
	expenseNote: string;
	[key: string]: unknown; // Add index signature
}

interface Filters {
	user: string;
	businessLocation: string;
	dateFrom: string;
	dateTo: string;
}

// Mock sales data based on the provided content
// const mockSalesData: SalesData[] = [
// 	{
// 		id: '1',
// 		date: '2025-07-10T14:59:00',
// 		invoiceNo: '91341',
// 		customerName: 'ALASAN',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 1800.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 1800.00
// 	},
// 	{
// 		id: '2',
// 		date: '2025-07-10T14:58:00',
// 		invoiceNo: '91340',
// 		customerName: 'ANGA',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 400.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 400.00
// 	},
// 	{
// 		id: '3',
// 		date: '2025-07-10T14:54:00',
// 		invoiceNo: '91339',
// 		customerName: 'SUNNY AUSTIN',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 250.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 250.00
// 	},
// 	{
// 		id: '4',
// 		date: '2025-07-10T14:50:00',
// 		invoiceNo: '91338',
// 		customerName: 'ALH YAKUBU',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 3400.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 3400.00
// 	},
// 	{
// 		id: '5',
// 		date: '2025-07-10T14:45:00',
// 		invoiceNo: '91337',
// 		customerName: 'OGBO',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 1600.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 1600.00
// 	},
// 	{
// 		id: '6',
// 		date: '2025-07-10T14:30:00',
// 		invoiceNo: '91336',
// 		customerName: 'SULEIMAN',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 1400.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 1400.00
// 	},
// 	{
// 		id: '7',
// 		date: '2025-07-10T14:07:00',
// 		invoiceNo: '91335',
// 		customerName: 'ANGA',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 9100.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 9100.00
// 	},
// 	{
// 		id: '8',
// 		date: '2025-07-10T13:45:00',
// 		invoiceNo: '91334',
// 		customerName: 'Ahmed',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 99.60,
// 		totalPaid: 0.00,
// 		totalRemaining: 99.60
// 	},
// 	{
// 		id: '9',
// 		date: '2025-07-10T13:27:00',
// 		invoiceNo: '91333',
// 		customerName: 'IBRAHIM',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 2000.40,
// 		totalPaid: 0.00,
// 		totalRemaining: 2000.40
// 	},
// 	{
// 		id: '10',
// 		date: '2025-07-10T13:04:00',
// 		invoiceNo: '91332',
// 		customerName: 'TASIU',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 1000.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 1000.00
// 	},
// 	{
// 		id: '11',
// 		date: '2025-07-10T12:50:00',
// 		invoiceNo: '91331',
// 		customerName: '1 MILLION',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 2600.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 2600.00
// 	},
// 	{
// 		id: '12',
// 		date: '2025-07-10T12:43:00',
// 		invoiceNo: '91330',
// 		customerName: 'ABBA',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 700.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 700.00
// 	},
// 	{
// 		id: '13',
// 		date: '2025-07-10T12:40:00',
// 		invoiceNo: '91329',
// 		customerName: 'MUSTAPHA',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 650.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 650.00
// 	},
// 	{
// 		id: '14',
// 		date: '2025-07-10T12:24:00',
// 		invoiceNo: '91328',
// 		customerName: 'OBUMA',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 200.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 200.00
// 	},
// 	{
// 		id: '15',
// 		date: '2025-07-10T12:19:00',
// 		invoiceNo: '91327',
// 		customerName: 'IMINABO',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 3000.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 3000.00
// 	},
// 	{
// 		id: '16',
// 		date: '2025-07-10T11:51:00',
// 		invoiceNo: '91326',
// 		customerName: 'UZOR',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 300.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 300.00
// 	},
// 	{
// 		id: '17',
// 		date: '2025-07-10T11:34:00',
// 		invoiceNo: '91325',
// 		customerName: 'BALA',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 1000.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 1000.00
// 	},
// 	{
// 		id: '18',
// 		date: '2025-07-10T11:30:00',
// 		invoiceNo: '91324',
// 		customerName: 'LAMIDO',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Paid',
// 		totalAmount: 400.00,
// 		totalPaid: 400.00,
// 		totalRemaining: 0.00
// 	},
// 	{
// 		id: '19',
// 		date: '2025-07-10T11:26:00',
// 		invoiceNo: '91323',
// 		customerName: 'SUNNY',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 3600.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 3600.00
// 	},
// 	{
// 		id: '20',
// 		date: '2025-07-10T10:26:00',
// 		invoiceNo: '91322',
// 		customerName: 'ABDULAHI',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 400.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 400.00
// 	},
// 	{
// 		id: '21',
// 		date: '2025-07-10T10:08:00',
// 		invoiceNo: '91321',
// 		customerName: 'USMAN',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 400.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 400.00
// 	},
// 	{
// 		id: '22',
// 		date: '2025-07-10T09:47:00',
// 		invoiceNo: '91320',
// 		customerName: 'MAGAJI',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 100.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 100.00
// 	},
// 	{
// 		id: '23',
// 		date: '2025-07-10T09:43:00',
// 		invoiceNo: '91319',
// 		customerName: 'GRACE',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 300.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 300.00
// 	},
// 	{
// 		id: '24',
// 		date: '2025-07-10T09:42:00',
// 		invoiceNo: '91318',
// 		customerName: 'GRACE',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Due',
// 		totalAmount: 300.00,
// 		totalPaid: 0.00,
// 		totalRemaining: 300.00
// 	},
// 	{
// 		id: '25',
// 		date: '2025-07-10T09:33:00',
// 		invoiceNo: '91317',
// 		customerName: 'DANIEL',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		paymentStatus: 'Paid',
// 		totalAmount: 1000.00,
// 		totalPaid: 1000.00,
// 		totalRemaining: 0.00
// 	}
// ];

// Mock expense data (empty for demo)
const mockExpenseData: ExpenseData[] = [
	// Empty array - no expense data
];

// interface Props{
// 	mockSalesData:SalesData[],
// 	mockExpenseData:ExpenseData[],
// }
interface Props{
	sales: SalesData[];
	expense: ExpenseData[];
}
export default function SalesRepresentativeReportTab(props:Props) {
	const { sales: mockSalesData, expense: mockExpenseData } = props;
	const [activeTab, setActiveTab] = useState('sales-added');
	const [filters, setFilters] = useState<Filters>({
		user: '',
		businessLocation: '',
		dateFrom: '2025-01-01',
		dateTo: '2025-12-31'
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
			user: '',
			businessLocation: '',
			dateFrom: '2025-01-01',
			dateTo: '2025-12-31'
		});
	};

	// Format currency
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-NG', {
			style: 'currency',
			currency: 'NGN'
		}).format(amount);
	};

	// Format date and time
	const formatDateTime = (dateString: string) => {
		return new Date(dateString).toLocaleString('en-US', {
			month: '2-digit',
			day: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	// Sales table columns
	const salesColumns: TableColumn<SalesData>[] = [
		{
			accessorKey: 'date',
			header: 'Date',
			sortable: true,
			cell: (value, row) => formatDateTime(row.date)
		},
		{
			accessorKey: 'invoiceNo',
			header: 'Invoice No.',
			sortable: true,
			className: 'font-mono text-blue-600'
		},
		{
			accessorKey: 'customerName',
			header: 'Customer name',
			sortable: true,
			className: 'font-medium'
		},
		{
			accessorKey: 'location',
			header: 'Location',
			sortable: true
		},
		{
			accessorKey: 'paymentStatus',
			header: 'Payment Status',
			sortable: true,
			cell: (value, row) => (
				<Badge 
					variant={row.paymentStatus === 'Paid' ? 'default' : row.paymentStatus === 'Due' ? 'destructive' : 'secondary'}
				>
					{row.paymentStatus}
				</Badge>
			)
		},
		{
			accessorKey: 'totalAmount',
			header: 'Total amount',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.totalAmount)
		},
		{
			accessorKey: 'totalPaid',
			header: 'Total paid',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.totalPaid)
		},
		{
			accessorKey: 'totalRemaining',
			header: 'Total remaining',
			sortable: true,
			align: 'right',
			cell: (value, row) => (
				<span className={row.totalRemaining > 0 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}>
					{formatCurrency(row.totalRemaining)}
				</span>
			)
		}
	];

	// Expense table columns
	const expenseColumns: TableColumn<ExpenseData>[] = [
		{
			accessorKey: 'date',
			header: 'Date',
			sortable: true,
			cell: (value, row) => formatDateTime(row.date)
		},
		{
			accessorKey: 'referenceNo',
			header: 'Reference No',
			sortable: true,
			className: 'font-mono text-blue-600'
		},
		{
			accessorKey: 'expenseCategory',
			header: 'Expense Category',
			sortable: true,
			className: 'font-medium'
		},
		{
			accessorKey: 'location',
			header: 'Location',
			sortable: true
		},
		{
			accessorKey: 'paymentStatus',
			header: 'Payment Status',
			sortable: true
		},
		{
			accessorKey: 'totalAmount',
			header: 'Total amount',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.totalAmount)
		},
		{
			accessorKey: 'expenseFor',
			header: 'Expense for',
			sortable: true
		},
		{
			accessorKey: 'expenseNote',
			header: 'Expense note',
			sortable: true
		}
	];

	// Calculate totals
	const salesTotals = mockSalesData.reduce((acc, item) => ({
		totalAmount: acc.totalAmount + item.totalAmount,
		totalPaid: acc.totalPaid + item.totalPaid,
		totalRemaining: acc.totalRemaining + item.totalRemaining,
		dueCount: acc.dueCount + (item.paymentStatus === 'Due' ? 1 : 0),
		paidCount: acc.paidCount + (item.paymentStatus === 'Paid' ? 1 : 0)
	}), {
		totalAmount: 0,
		totalPaid: 0,
		totalRemaining: 0,
		dueCount: 0,
		paidCount: 0
	});

	const expenseTotals = mockExpenseData.reduce((sum, item) => sum + item.totalAmount, 0);

	return (
		<div className="p-6 rounded-lg shadow-sm">
			<h2 className="text-2xl font-bold mb-6">Sales Representative Report</h2>
			
			{/* Filters Section */}
			<div className="p-4 rounded-lg mb-6">
				<h3 className="text-lg font-semibold mb-4">Filters</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<div className="flex flex-col">
						<label className="text-sm font-medium mb-1">User</label>
						<input 
							type="text" 
							value={filters.user}
							onChange={(e) => handleFilterChange('user', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter user name"
						/>
					</div>

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
						<label className="text-sm font-medium mb-1">Date Range</label>
						<div className="flex gap-2">
							<input 
								type="date" 
								value={filters.dateFrom}
								onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
								className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

			{/* Summary Section */}
			<div className="border border-gray-200 rounded-lg p-6 mb-6">
				<h3 className="text-lg font-semibold mb-4">Summary</h3>
				<div className="space-y-2">
					<div className="flex flex-wrap items-center gap-2">
						<span className="font-medium">Total Sale - Total Sales Return:</span>
						<span className="text-green-600 font-bold">{formatCurrency(38422427.20)}</span>
						<span>-</span>
						<span className="text-red-600 font-bold">{formatCurrency(0.00)}</span>
						<span>=</span>
						<span className="text-blue-600 font-bold text-lg">{formatCurrency(38422427.20)}</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="font-medium">Total Expense:</span>
						<span className="text-red-600 font-bold">{formatCurrency(expenseTotals)}</span>
					</div>
				</div>
			</div>

			{/* Tabs Section */}
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="sales-added">Sales Added</TabsTrigger>
					<TabsTrigger value="sales-commission">Sales With Commission</TabsTrigger>
					<TabsTrigger value="expenses">Expenses</TabsTrigger>
				</TabsList>

				{/* Sales Added Tab */}
				<TabsContent value="sales-added" className="space-y-4">
					<div className="border border-gray-200 rounded-lg p-4">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
							<div>
								<h4 className="text-lg font-semibold mb-2">Total:</h4>
								<div className="space-y-1">
									<div className="flex justify-between">
										<span>Due - {salesTotals.dueCount}</span>
										<span></span>
									</div>
									<div className="flex justify-between">
										<span>Paid - {salesTotals.paidCount}</span>
										<span></span>
									</div>
								</div>
							</div>
							<div className="text-right space-y-1">
								<div className="flex justify-between">
									<span className="font-bold">{formatCurrency(salesTotals.totalAmount)}</span>
									<span className="font-bold">{formatCurrency(salesTotals.totalPaid)}</span>
								</div>
								<div className="text-sm space-y-1">
									<div>Sell Due - <span className="font-bold text-red-600">{formatCurrency(salesTotals.totalRemaining)}</span></div>
									<div>Sell Return Due - <span className="font-bold">{formatCurrency(0.00)}</span></div>
								</div>
							</div>
						</div>
					</div>
					
					<DynamicTable 
						data={mockSalesData}
						columns={salesColumns}
						enableRowSelection={false}
						enablePagination={true}
						enableSorting={true}
						enableFiltering={true}
						enableColumnVisibility={true}
						enableExport={true}
						exportFilename="sales-representative-sales-added"
						exportTitle="Sales Representative - Sales Added"
						pageSize={100}
						searchPlaceholder="Search sales..."
						emptyMessage="No data available in table"
						className=""
					/>
				</TabsContent>

				{/* Sales With Commission Tab */}
				<TabsContent value="sales-commission" className="space-y-4">
					<div className="border border-gray-200 rounded-lg p-4">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
							<div>
								<h4 className="text-lg font-semibold mb-2">Total:</h4>
								<div className="space-y-1">
									<div className="flex justify-between">
										<span>Due - {salesTotals.dueCount}</span>
										<span></span>
									</div>
									<div className="flex justify-between">
										<span>Paid - {salesTotals.paidCount}</span>
										<span></span>
									</div>
								</div>
							</div>
							<div className="text-right space-y-1">
								<div className="flex justify-between">
									<span className="font-bold">{formatCurrency(salesTotals.totalAmount)}</span>
									<span className="font-bold">{formatCurrency(salesTotals.totalPaid)}</span>
								</div>
								<div className="text-sm space-y-1">
									<div>Sell Due - <span className="font-bold text-red-600">{formatCurrency(salesTotals.totalRemaining)}</span></div>
									<div>Sell Return Due - <span className="font-bold">{formatCurrency(0.00)}</span></div>
								</div>
							</div>
						</div>
					</div>
					
					<DynamicTable 
						data={mockSalesData}
						columns={salesColumns}
						enableRowSelection={false}
						enablePagination={true}
						enableSorting={true}
						enableFiltering={true}
						enableColumnVisibility={true}
						enableExport={true}
						exportFilename="sales-representative-sales-commission"
						exportTitle="Sales Representative - Sales With Commission"
						pageSize={100}
						searchPlaceholder="Search sales..."
						emptyMessage="No data available in table"
						className=""
					/>
				</TabsContent>

				{/* Expenses Tab */}
				<TabsContent value="expenses" className="space-y-4">
					<div className="border border-gray-200 rounded-lg p-4">
						<div className="flex justify-between items-center">
							<h4 className="text-lg font-semibold">Total:</h4>
							<div className="text-right">
								<p className="text-lg font-bold text-green-600">{formatCurrency(expenseTotals)}</p>
							</div>
						</div>
					</div>
					
					<DynamicTable 
						data={mockExpenseData}
						columns={expenseColumns}
						enableRowSelection={false}
						enablePagination={true}
						enableSorting={true}
						enableFiltering={true}
						enableColumnVisibility={true}
						enableExport={true}
						exportFilename="sales-representative-expenses"
						exportTitle="Sales Representative - Expenses"
						pageSize={100}
						searchPlaceholder="Search expenses..."
						emptyMessage="No data available in table"
						className=""
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
