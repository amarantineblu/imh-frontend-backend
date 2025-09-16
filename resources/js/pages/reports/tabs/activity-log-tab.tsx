
import { Button } from '@/components/ui/button';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

// Interface definitions
interface ActivityLogData extends Record<string, unknown> {
	id: string;
	date: string;
	subjectType: string;
	action: string;
	by: string;
	note: string;
	invoiceNo?: string;
	status?: string;
	total?: number;
	paymentStatus?: string;
	paymentStatusChange?: string;
}

interface Filters {
	by: string;
	subjectType: string;
	dateFrom: string;
	dateTo: string;
}

// Mock data based on the provided content
// const mockActivityLogData: ActivityLogData[] = [
// 	{
// 		id: '1',
// 		date: '2025-07-10T15:17:00',
// 		subjectType: 'Sell',
// 		action: 'Payment edited',
// 		by: 'Mr GOODLUCK AMONI',
// 		note: 'Invoice No.: 89476',
// 		invoiceNo: '89476'
// 	},
// 	{
// 		id: '2',
// 		date: '2025-07-10T15:13:00',
// 		subjectType: 'Sell',
// 		action: 'Payment edited',
// 		by: 'Mrs IBITEIN HERBERT',
// 		note: 'Invoice No.: 90171\nPayment Status: Partial --> Paid',
// 		invoiceNo: '90171',
// 		paymentStatusChange: 'Partial --> Paid'
// 	},
// 	{
// 		id: '3',
// 		date: '2025-07-10T15:10:00',
// 		subjectType: 'Sell',
// 		action: 'Added',
// 		by: 'Mr GOODLUCK AMONI',
// 		note: 'Invoice No.: 91344\nStatus: Final\nTotal: ₦ 400.00\nPayment Status: Due',
// 		invoiceNo: '91344',
// 		status: 'Final',
// 		total: 400.00,
// 		paymentStatus: 'Due'
// 	},
// 	{
// 		id: '4',
// 		date: '2025-07-10T15:07:00',
// 		subjectType: 'Sell',
// 		action: 'Added',
// 		by: 'Mrs IBITEIN HERBERT',
// 		note: 'Invoice No.: 91343\nStatus: Final\nTotal: ₦ 400.00\nPayment Status: Due',
// 		invoiceNo: '91343',
// 		status: 'Final',
// 		total: 400.00,
// 		paymentStatus: 'Due'
// 	},
// 	{
// 		id: '5',
// 		date: '2025-07-10T15:06:00',
// 		subjectType: 'Sell',
// 		action: 'Added',
// 		by: 'Mr GOODLUCK AMONI',
// 		note: 'Invoice No.: 91342\nStatus: Final\nTotal: ₦ 2,300.00\nPayment Status: Due',
// 		invoiceNo: '91342',
// 		status: 'Final',
// 		total: 2300.00,
// 		paymentStatus: 'Due'
// 	},
// 	{
// 		id: '6',
// 		date: '2025-07-10T15:06:00',
// 		subjectType: 'Sell',
// 		action: 'Payment edited',
// 		by: 'Mrs IBITEIN HERBERT',
// 		note: 'Invoice No.: 90772\nPayment Status: Due --> Paid',
// 		invoiceNo: '90772',
// 		paymentStatusChange: 'Due --> Paid'
// 	},
// 	{
// 		id: '7',
// 		date: '2025-07-10T15:04:00',
// 		subjectType: 'Sell',
// 		action: 'Payment edited',
// 		by: 'Mr GOODLUCK AMONI',
// 		note: 'Invoice No.: 91252\nPayment Status: Due --> Paid',
// 		invoiceNo: '91252',
// 		paymentStatusChange: 'Due --> Paid'
// 	},
// 	{
// 		id: '8',
// 		date: '2025-07-10T15:02:00',
// 		subjectType: 'Sell',
// 		action: 'Payment edited',
// 		by: 'Mr GOODLUCK AMONI',
// 		note: 'Invoice No.: 90828\nPayment Status: Due --> Paid',
// 		invoiceNo: '90828',
// 		paymentStatusChange: 'Due --> Paid'
// 	},
// 	{
// 		id: '9',
// 		date: '2025-07-10T14:59:00',
// 		subjectType: 'Sell',
// 		action: 'Added',
// 		by: 'Mr GOODLUCK AMONI',
// 		note: 'Invoice No.: 91341\nStatus: Final\nTotal: ₦ 1,800.00\nPayment Status: Due',
// 		invoiceNo: '91341',
// 		status: 'Final',
// 		total: 1800.00,
// 		paymentStatus: 'Due'
// 	},
// 	{
// 		id: '10',
// 		date: '2025-07-10T14:58:00',
// 		subjectType: 'Sell',
// 		action: 'Added',
// 		by: 'Mr GOODLUCK AMONI',
// 		note: 'Invoice No.: 91340\nStatus: Final\nTotal: ₦ 400.00\nPayment Status: Due',
// 		invoiceNo: '91340',
// 		status: 'Final',
// 		total: 400.00,
// 		paymentStatus: 'Due'
// 	},
// 	{
// 		id: '11',
// 		date: '2025-07-10T14:54:00',
// 		subjectType: 'Sell',
// 		action: 'Added',
// 		by: 'Mr GOODLUCK AMONI',
// 		note: 'Invoice No.: 91339\nStatus: Final\nTotal: ₦ 250.00\nPayment Status: Due',
// 		invoiceNo: '91339',
// 		status: 'Final',
// 		total: 250.00,
// 		paymentStatus: 'Due'
// 	},
// 	{
// 		id: '12',
// 		date: '2025-07-10T14:50:00',
// 		subjectType: 'Sell',
// 		action: 'Added',
// 		by: 'Mr GOODLUCK AMONI',
// 		note: 'Invoice No.: 91338\nStatus: Final\nTotal: ₦ 3,400.00\nPayment Status: Due',
// 		invoiceNo: '91338',
// 		status: 'Final',
// 		total: 3400.00,
// 		paymentStatus: 'Due'
// 	},
// 	{
// 		id: '13',
// 		date: '2025-07-10T14:45:00',
// 		subjectType: 'Sell',
// 		action: 'Added',
// 		by: 'Mr GOODLUCK AMONI',
// 		note: 'Invoice No.: 91337\nStatus: Final\nTotal: ₦ 1,600.00\nPayment Status: Due',
// 		invoiceNo: '91337',
// 		status: 'Final',
// 		total: 1600.00,
// 		paymentStatus: 'Due'
// 	},
// 	{
// 		id: '14',
// 		date: '2025-07-10T14:42:00',
// 		subjectType: 'Sell',
// 		action: 'Payment edited',
// 		by: 'Mr GOODLUCK AMONI',
// 		note: 'Invoice No.: 91063\nPayment Status: Due --> Paid',
// 		invoiceNo: '91063',
// 		paymentStatusChange: 'Due --> Paid'
// 	},
// 	{
// 		id: '15',
// 		date: '2025-07-10T14:42:00',
// 		subjectType: 'Sell',
// 		action: 'Payment edited',
// 		by: 'Mrs IBITEIN HERBERT',
// 		note: 'Invoice No.: 89017\nPayment Status: Due --> Partial',
// 		invoiceNo: '89017',
// 		paymentStatusChange: 'Due --> Partial'
// 	},
// 	{
// 		id: '16',
// 		date: '2025-07-10T14:40:00',
// 		subjectType: 'Sell',
// 		action: 'Payment edited',
// 		by: 'Mr GOODLUCK AMONI',
// 		note: 'Invoice No.: 90908\nPayment Status: Due --> Paid',
// 		invoiceNo: '90908',
// 		paymentStatusChange: 'Due --> Paid'
// 	},
// 	{
// 		id: '17',
// 		date: '2025-07-10T14:33:00',
// 		subjectType: 'Sell',
// 		action: 'Payment edited',
// 		by: 'Mrs IBITEIN HERBERT',
// 		note: 'Invoice No.: 90974\nPayment Status: Due --> Paid',
// 		invoiceNo: '90974',
// 		paymentStatusChange: 'Due --> Paid'
// 	},
// 	{
// 		id: '18',
// 		date: '2025-07-10T14:31:00',
// 		subjectType: 'Sell',
// 		action: 'Payment edited',
// 		by: 'Mrs IBITEIN HERBERT',
// 		note: 'Invoice No.: 91187\nPayment Status: Due --> Paid',
// 		invoiceNo: '91187',
// 		paymentStatusChange: 'Due --> Paid'
// 	},
// 	{
// 		id: '19',
// 		date: '2025-07-10T14:30:00',
// 		subjectType: 'Sell',
// 		action: 'Added',
// 		by: 'Mr GOODLUCK AMONI',
// 		note: 'Invoice No.: 91336\nStatus: Final\nTotal: ₦ 1,400.00\nPayment Status: Due',
// 		invoiceNo: '91336',
// 		status: 'Final',
// 		total: 1400.00,
// 		paymentStatus: 'Due'
// 	},
// 	{
// 		id: '20',
// 		date: '2025-07-10T14:29:00',
// 		subjectType: 'Sell',
// 		action: 'Payment edited',
// 		by: 'Mrs IBITEIN HERBERT',
// 		note: 'Invoice No.: 91259\nPayment Status: Due --> Paid',
// 		invoiceNo: '91259',
// 		paymentStatusChange: 'Due --> Paid'
// 	},
// 	{
// 		id: '21',
// 		date: '2025-07-10T14:23:00',
// 		subjectType: 'Sell',
// 		action: 'Payment edited',
// 		by: 'Mrs IBITEIN HERBERT',
// 		note: 'Invoice No.: 91084\nPayment Status: Due --> Partial',
// 		invoiceNo: '91084',
// 		paymentStatusChange: 'Due --> Partial'
// 	},
// 	{
// 		id: '22',
// 		date: '2025-07-10T14:07:00',
// 		subjectType: 'Sell',
// 		action: 'Added',
// 		by: 'Mr GOODLUCK AMONI',
// 		note: 'Invoice No.: 91335\nStatus: Final\nTotal: ₦ 9,100.00\nPayment Status: Due',
// 		invoiceNo: '91335',
// 		status: 'Final',
// 		total: 9100.00,
// 		paymentStatus: 'Due'
// 	},
// 	{
// 		id: '23',
// 		date: '2025-07-10T14:06:00',
// 		subjectType: 'Sell',
// 		action: 'Payment edited',
// 		by: 'Mrs IBITEIN HERBERT',
// 		note: 'Invoice No.: 89852\nPayment Status: Due --> Paid',
// 		invoiceNo: '89852',
// 		paymentStatusChange: 'Due --> Paid'
// 	},
// 	{
// 		id: '24',
// 		date: '2025-07-10T14:05:00',
// 		subjectType: 'Sell',
// 		action: 'Payment edited',
// 		by: 'Mrs IBITEIN HERBERT',
// 		note: 'Invoice No.: 91071\nPayment Status: Due --> Paid',
// 		invoiceNo: '91071',
// 		paymentStatusChange: 'Due --> Paid'
// 	},
// 	{
// 		id: '25',
// 		date: '2025-07-10T14:04:00',
// 		subjectType: 'Sell',
// 		action: 'Payment edited',
// 		by: 'Mrs IBITEIN HERBERT',
// 		note: 'Invoice No.: 91286\nPayment Status: Due --> Partial',
// 		invoiceNo: '91286',
// 		paymentStatusChange: 'Due --> Partial'
// 	}
// ];

interface Props {
	activity_logs: ActivityLogData[];
}
export default function ActivityLogTab(props: Props) {
	const [mockActivityLogData] = useState<ActivityLogData[]>(props.activity_logs || []);
	const [filters, setFilters] = useState<Filters>({
		by: '',
		subjectType: '',
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
			by: '',
			subjectType: '',
			dateFrom: '2025-01-01',
			dateTo: '2025-12-31'
		});
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

	// Format note with proper line breaks and highlighting
	const formatNote = (note: string) => {
		const lines = note.split('\n');
		return (
			<div className="space-y-1">
				{lines.map((line, index) => {
					if (line.includes('Invoice No.:')) {
						return (
							<div key={index} className="font-mono text-blue-600 font-medium">
								{line}
							</div>
						);
					}
					if (line.includes('Total:')) {
						return (
							<div key={index} className="font-bold text-green-600">
								{line}
							</div>
						);
					}
					if (line.includes('Payment Status:') && line.includes('-->')) {
						const [before, after] = line.split('-->');
						return (
							<div key={index} className="flex items-center gap-2">
								<span className="text-sm">Payment Status:</span>
								<Badge variant="destructive" className="text-xs">{before.split(':')[1].trim()}</Badge>
								<span>→</span>
								<Badge variant="default" className="text-xs">{after.trim()}</Badge>
							</div>
						);
					}
					if (line.includes('Status:')) {
						return (
							<div key={index}>
								<span className="text-sm">{line.split(':')[0]}:</span>
								<Badge variant="secondary" className="ml-2 text-xs">{line.split(':')[1].trim()}</Badge>
							</div>
						);
					}
					if (line.includes('Payment Status:') && !line.includes('-->')) {
						return (
							<div key={index}>
								<span className="text-sm">{line.split(':')[0]}:</span>
								<Badge variant="destructive" className="ml-2 text-xs">{line.split(':')[1].trim()}</Badge>
							</div>
						);
					}
					return (
						<div key={index} className="text-sm text-gray-600">
							{line}
						</div>
					);
				})}
			</div>
		);
	};

	// Activity log table columns
	const activityLogColumns: TableColumn<ActivityLogData>[] = [
		{
			accessorKey: 'date',
			header: 'Date',
			sortable: true,
			cell: (value, row) => formatDateTime(row.date)
		},
		{
			accessorKey: 'subjectType',
			header: 'Subject Type',
			sortable: true,
			cell: (value, row) => (
				<Badge variant="outline" className="font-medium">
					{row.subjectType}
				</Badge>
			)
		},
		{
			accessorKey: 'action',
			header: 'Action',
			sortable: true,
			cell: (value, row) => (
				<Badge 
					variant={row.action === 'Added' ? 'default' : row.action === 'Payment edited' ? 'secondary' : 'outline'}
					className="font-medium"
				>
					{row.action}
				</Badge>
			)
		},
		{
			accessorKey: 'by',
			header: 'By',
			sortable: true,
			className: 'font-medium'
		},
		{
			accessorKey: 'note',
			header: 'Note',
			sortable: false,
			cell: (value, row) => formatNote(row.note),
			className: 'max-w-md'
		}
	];

	return (
		<div className="p-6 rounded-lg shadow-sm">
			<h2 className="text-2xl font-bold mb-6">Activity Log</h2>
			
			{/* Filters Section */}
			<div className="p-4 rounded-lg mb-6">
				<h3 className="text-lg font-semibold mb-4">Filters</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<div className="flex flex-col">
						<label className="text-sm font-medium mb-1">By</label>
						<input 
							type="text" 
							value={filters.by}
							onChange={(e) => handleFilterChange('by', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter user name"
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-medium mb-1">Subject Type</label>
						<select
							value={filters.subjectType}
							onChange={(e) => handleFilterChange('subjectType', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">All Types</option>
							<option value="Sell">Sell</option>
							<option value="Purchase">Purchase</option>
							<option value="User">User</option>
							<option value="Product">Product</option>
							<option value="Contact">Contact</option>
						</select>
					</div>

					<div className="flex flex-col col-span-2">
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

			{/* Activity Log Table */}
			<DynamicTable 
				data={mockActivityLogData}
				columns={activityLogColumns}
				enableRowSelection={false}
				enablePagination={true}
				enableSorting={true}
				enableFiltering={true}
				enableColumnVisibility={true}
				enableExport={true}
				exportFilename="activity-log"
				exportTitle="Activity Log Report"
				pageSize={100}
				searchPlaceholder="Search ..."
				emptyMessage="No data available in table"
				className=""
			/>
		</div>
	);
}
