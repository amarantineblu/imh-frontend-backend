
import { Button } from '@/components/ui/button';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';

// Interface definitions
interface RegisterData {
	id: string;
	openTime: string;
	closeTime: string;
	location: string;
	user: string;
	email: string;
	totalCardSlips: number;
	totalCardSlipsCount: number;
	totalCheques: number;
	totalChequesCount: number;
	totalCash: number;
	totalBankTransfer: number;
	totalAdvancePayment: number;
	pos: number;
	customPayment2: number;
	customPayment3: number;
	customPayment4: number;
	customPayment5: number;
	customPayment6: number;
	customPayment7: number;
	otherPayments: number;
	total: number;
}

interface Filters {
	user: string;
	status: string;
	dateFrom: string;
	dateTo: string;
}

// Mock data based on the provided content
// const mockRegisterData: RegisterData[] = [
// 	{
// 		id: '1',
// 		openTime: '2023-04-23T15:33:00',
// 		closeTime: '2023-04-23T20:40:00',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		user: 'Eugene Okujagu',
// 		email: 'eokujagu@gmail.com',
// 		totalCardSlips: 0.00,
// 		totalCardSlipsCount: 0,
// 		totalCheques: 0.00,
// 		totalChequesCount: 0,
// 		totalCash: 0.00,
// 		totalBankTransfer: 0.00,
// 		totalAdvancePayment: 0.00,
// 		pos: 0.00,
// 		customPayment2: 0.00,
// 		customPayment3: 0.00,
// 		customPayment4: 0.00,
// 		customPayment5: 0.00,
// 		customPayment6: 0.00,
// 		customPayment7: 0.00,
// 		otherPayments: 0.00,
// 		total: 0.00
// 	},
// 	{
// 		id: '2',
// 		openTime: '2023-04-30T21:32:00',
// 		closeTime: '',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		user: 'Eugene Okujagu',
// 		email: 'eokujagu@gmail.com',
// 		totalCardSlips: 0.00,
// 		totalCardSlipsCount: 0,
// 		totalCheques: 0.00,
// 		totalChequesCount: 0,
// 		totalCash: 1147.20,
// 		totalBankTransfer: 0.00,
// 		totalAdvancePayment: 0.00,
// 		pos: 0.00,
// 		customPayment2: 0.00,
// 		customPayment3: 0.00,
// 		customPayment4: 0.00,
// 		customPayment5: 0.00,
// 		customPayment6: 0.00,
// 		customPayment7: 0.00,
// 		otherPayments: 0.00,
// 		total: 1147.20
// 	},
// 	{
// 		id: '3',
// 		openTime: '2023-05-30T10:43:00',
// 		closeTime: '',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		user: 'Mrs FYNE OKUJAGU',
// 		email: 'fynestu@gmail.com',
// 		totalCardSlips: 0.00,
// 		totalCardSlipsCount: 0,
// 		totalCheques: 0.00,
// 		totalChequesCount: 0,
// 		totalCash: 0.00,
// 		totalBankTransfer: 0.00,
// 		totalAdvancePayment: 0.00,
// 		pos: 0.00,
// 		customPayment2: 0.00,
// 		customPayment3: 0.00,
// 		customPayment4: 0.00,
// 		customPayment5: 0.00,
// 		customPayment6: 0.00,
// 		customPayment7: 0.00,
// 		otherPayments: 0.00,
// 		total: 0.00
// 	},
// 	{
// 		id: '4',
// 		openTime: '2023-05-30T11:14:00',
// 		closeTime: '',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		user: 'STEPHEN NGECHU',
// 		email: 'stephenongechu@gmail.com',
// 		totalCardSlips: 100.00,
// 		totalCardSlipsCount: 0,
// 		totalCheques: 0.00,
// 		totalChequesCount: 0,
// 		totalCash: 119929.20,
// 		totalBankTransfer: 0.00,
// 		totalAdvancePayment: 0.00,
// 		pos: 0.00,
// 		customPayment2: 0.00,
// 		customPayment3: 0.00,
// 		customPayment4: 0.00,
// 		customPayment5: 0.00,
// 		customPayment6: 0.00,
// 		customPayment7: 0.00,
// 		otherPayments: 0.00,
// 		total: 120029.20
// 	},
// 	{
// 		id: '5',
// 		openTime: '2023-06-26T18:07:00',
// 		closeTime: '',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		user: 'Mr MOSES HARRY',
// 		email: 'mosesharry564@gmail.com',
// 		totalCardSlips: 0.00,
// 		totalCardSlipsCount: 0,
// 		totalCheques: 0.00,
// 		totalChequesCount: 0,
// 		totalCash: 1795192.60,
// 		totalBankTransfer: 0.00,
// 		totalAdvancePayment: 0.00,
// 		pos: 0.00,
// 		customPayment2: 0.00,
// 		customPayment3: 0.00,
// 		customPayment4: 0.00,
// 		customPayment5: 0.00,
// 		customPayment6: 0.00,
// 		customPayment7: 0.00,
// 		otherPayments: 0.00,
// 		total: 1795192.60
// 	},
// 	{
// 		id: '6',
// 		openTime: '2023-07-19T06:10:00',
// 		closeTime: '',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		user: 'Mrs FYNEST OKUJAGU',
// 		email: 'info@iwose.com.ng',
// 		totalCardSlips: 0.00,
// 		totalCardSlipsCount: 0,
// 		totalCheques: 0.00,
// 		totalChequesCount: 0,
// 		totalCash: 12741.00,
// 		totalBankTransfer: 0.00,
// 		totalAdvancePayment: 0.00,
// 		pos: 0.00,
// 		customPayment2: 0.00,
// 		customPayment3: 0.00,
// 		customPayment4: 0.00,
// 		customPayment5: 0.00,
// 		customPayment6: 0.00,
// 		customPayment7: 0.00,
// 		otherPayments: 0.00,
// 		total: 12741.00
// 	},
// 	{
// 		id: '7',
// 		openTime: '2023-07-19T08:28:00',
// 		closeTime: '',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		user: 'Mr VICTOR NNAA',
// 		email: 'nnaasmhos@gmail.com',
// 		totalCardSlips: 0.00,
// 		totalCardSlipsCount: 0,
// 		totalCheques: 0.00,
// 		totalChequesCount: 0,
// 		totalCash: 82627.40,
// 		totalBankTransfer: 0.00,
// 		totalAdvancePayment: 0.00,
// 		pos: 0.00,
// 		customPayment2: 0.00,
// 		customPayment3: 0.00,
// 		customPayment4: 0.00,
// 		customPayment5: 0.00,
// 		customPayment6: 0.00,
// 		customPayment7: 0.00,
// 		otherPayments: 0.00,
// 		total: 82627.40
// 	},
// 	{
// 		id: '8',
// 		openTime: '2023-12-20T12:38:00',
// 		closeTime: '',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		user: 'Mrs SODIENYE CHARLES',
// 		email: 'sodienyecharles247@gmail.com',
// 		totalCardSlips: 0.00,
// 		totalCardSlipsCount: 0,
// 		totalCheques: 0.00,
// 		totalChequesCount: 0,
// 		totalCash: 1080641.20,
// 		totalBankTransfer: 0.00,
// 		totalAdvancePayment: 0.00,
// 		pos: 0.00,
// 		customPayment2: 0.00,
// 		customPayment3: 0.00,
// 		customPayment4: 0.00,
// 		customPayment5: 0.00,
// 		customPayment6: 0.00,
// 		customPayment7: 0.00,
// 		otherPayments: 0.00,
// 		total: 1080641.20
// 	},
// 	{
// 		id: '9',
// 		openTime: '2024-03-31T15:52:00',
// 		closeTime: '',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		user: 'Mr HENRY DAVIES',
// 		email: 'hibiteinbodavies@yahoo.com',
// 		totalCardSlips: 800.00,
// 		totalCardSlipsCount: 0,
// 		totalCheques: 0.00,
// 		totalChequesCount: 0,
// 		totalCash: 998555.00,
// 		totalBankTransfer: 0.00,
// 		totalAdvancePayment: 0.00,
// 		pos: 0.00,
// 		customPayment2: 0.00,
// 		customPayment3: 0.00,
// 		customPayment4: 0.00,
// 		customPayment5: 0.00,
// 		customPayment6: 0.00,
// 		customPayment7: 0.00,
// 		otherPayments: 0.00,
// 		total: 999355.00
// 	},
// 	{
// 		id: '10',
// 		openTime: '2024-06-22T08:46:00',
// 		closeTime: '',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		user: 'Miss RUTH CHUKWUBUIKEM',
// 		email: 'ruthchukwubuikem2003@gmail.com',
// 		totalCardSlips: 0.00,
// 		totalCardSlipsCount: 0,
// 		totalCheques: 0.00,
// 		totalChequesCount: 0,
// 		totalCash: 1538364.40,
// 		totalBankTransfer: 0.00,
// 		totalAdvancePayment: 0.00,
// 		pos: 0.00,
// 		customPayment2: 0.00,
// 		customPayment3: 0.00,
// 		customPayment4: 0.00,
// 		customPayment5: 0.00,
// 		customPayment6: 0.00,
// 		customPayment7: 0.00,
// 		otherPayments: 0.00,
// 		total: 1538364.40
// 	},
// 	{
// 		id: '11',
// 		openTime: '2024-10-15T10:43:00',
// 		closeTime: '',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		user: 'Mrs MARGARET ATAMUNOTORU',
// 		email: 'dieyeatams1234@gmail.com',
// 		totalCardSlips: 0.00,
// 		totalCardSlipsCount: 0,
// 		totalCheques: 0.00,
// 		totalChequesCount: 0,
// 		totalCash: 155430.00,
// 		totalBankTransfer: 0.00,
// 		totalAdvancePayment: 0.00,
// 		pos: 0.00,
// 		customPayment2: 0.00,
// 		customPayment3: 0.00,
// 		customPayment4: 0.00,
// 		customPayment5: 0.00,
// 		customPayment6: 0.00,
// 		customPayment7: 0.00,
// 		otherPayments: 0.00,
// 		total: 155430.00
// 	},
// 	{
// 		id: '12',
// 		openTime: '2025-06-02T08:17:00',
// 		closeTime: '',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		user: 'Mrs IBITEIN HERBERT',
// 		email: 'ibiteinherbert852@gmail.com',
// 		totalCardSlips: 0.00,
// 		totalCardSlipsCount: 0,
// 		totalCheques: 0.00,
// 		totalChequesCount: 0,
// 		totalCash: 67139.20,
// 		totalBankTransfer: 0.00,
// 		totalAdvancePayment: 0.00,
// 		pos: 0.00,
// 		customPayment2: 0.00,
// 		customPayment3: 0.00,
// 		customPayment4: 0.00,
// 		customPayment5: 0.00,
// 		customPayment6: 0.00,
// 		customPayment7: 0.00,
// 		otherPayments: 0.00,
// 		total: 67139.20
// 	},
// 	{
// 		id: '13',
// 		openTime: '2025-07-10T08:22:00',
// 		closeTime: '',
// 		location: 'IBIYEOMIE MEAT HOUSE',
// 		user: 'Mr GOODLUCK AMONI',
// 		email: 'goodluckamoni3@gmail.com',
// 		totalCardSlips: 0.00,
// 		totalCardSlipsCount: 0,
// 		totalCheques: 0.00,
// 		totalChequesCount: 0,
// 		totalCash: 0.00,
// 		totalBankTransfer: 0.00,
// 		totalAdvancePayment: 0.00,
// 		pos: 0.00,
// 		customPayment2: 0.00,
// 		customPayment3: 0.00,
// 		customPayment4: 0.00,
// 		customPayment5: 0.00,
// 		customPayment6: 0.00,
// 		customPayment7: 0.00,
// 		otherPayments: 0.00,
// 		total: 0.00
// 	}
// ];

// interface Props {
// 	register: RegisterData[];
// }
interface Props{
	register: RegisterData[];	
}
export default function RegisterReportTab() {
	const {props} = usePage();
	const [mockRegisterData, setMockRegisterData] = useState<RegisterData[]>(props.register as RegisterData[] || []);
	// const mockRegisterData = props.register ?? [];
	const [filters, setFilters] = useState<Filters>({
		user: '',
		status: '',
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
			user: '',
			status: '',
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

	// Format currency with count
	const formatCurrencyWithCount = (amount: number, count: number) => {
		return `${formatCurrency(amount)} (${count})`;
	};

	// Format date and time
	const formatDateTime = (dateString: string) => {
		if (!dateString) return '';
		return new Date(dateString).toLocaleString('en-US', {
			month: '2-digit',
			day: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	// Register table columns
	const registerColumns: TableColumn<RegisterData>[] = [
		{
			accessorKey: 'openTime',
			header: 'Open Time',
			sortable: true,
			cell: (value, row) => formatDateTime(row.openTime)
		},
		{
			accessorKey: 'closeTime',
			header: 'Close Time',
			sortable: true,
			cell: (value, row) => formatDateTime(row.closeTime)
		},
		{
			accessorKey: 'location',
			header: 'Location',
			sortable: true,
			className: 'font-medium'
		},
		{
			accessorKey: 'user',
			header: 'User',
			sortable: true,
			cell: (value, row) => (
				<div>
					<div className="font-medium">{row.user}</div>
					<div className="text-sm text-gray-500">{row.email}</div>
				</div>
			)
		},
		{
			accessorKey: 'totalCardSlips',
			header: 'Total Card Slips',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrencyWithCount(row.totalCardSlips, row.totalCardSlipsCount)
		},
		{
			accessorKey: 'totalCheques',
			header: 'Total cheques',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrencyWithCount(row.totalCheques, row.totalChequesCount)
		},
		{
			accessorKey: 'totalCash',
			header: 'Total Cash',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.totalCash)
		},
		{
			accessorKey: 'totalBankTransfer',
			header: 'Total bank transfer',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.totalBankTransfer)
		},
		{
			accessorKey: 'totalAdvancePayment',
			header: 'Total advance payment',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.totalAdvancePayment)
		},
		{
			accessorKey: 'pos',
			header: 'POS',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.pos)
		},
		{
			accessorKey: 'customPayment2',
			header: 'Custom Payment 2',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.customPayment2)
		},
		{
			accessorKey: 'customPayment3',
			header: 'Custom Payment 3',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.customPayment3)
		},
		{
			accessorKey: 'customPayment4',
			header: 'Custom Payment 4',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.customPayment4)
		},
		{
			accessorKey: 'customPayment5',
			header: 'Custom Payment 5',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.customPayment5)
		},
		{
			accessorKey: 'customPayment6',
			header: 'Custom Payment 6',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.customPayment6)
		},
		{
			accessorKey: 'customPayment7',
			header: 'Custom Payment 7',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.customPayment7)
		},
		{
			accessorKey: 'otherPayments',
			header: 'Other Payments',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.otherPayments)
		},
		{
			accessorKey: 'total',
			header: 'Total',
			sortable: true,
			align: 'right',
			cell: (value, row) => (
				<span className="font-bold text-green-600">
					{formatCurrency(row.total)}
				</span>
			)
		},
		{
			accessorKey: 'action',
			header: 'Action',
			sortable: false,
			cell: () => (
				<Button variant="outline" size="sm">
					View
				</Button>
			)
		}
	];

	// Calculate totals
	const totals = Array.isArray(mockRegisterData)
  ? mockRegisterData.reduce((acc, item) => ({
      totalCardSlips: acc.totalCardSlips + item.totalCardSlips,
      totalCheques: acc.totalCheques + item.totalCheques,
      totalCash: acc.totalCash + item.totalCash,
      totalBankTransfer: acc.totalBankTransfer + item.totalBankTransfer,
      totalAdvancePayment: acc.totalAdvancePayment + item.totalAdvancePayment,
      pos: acc.pos + item.pos,
      customPayment2: acc.customPayment2 + item.customPayment2,
      customPayment3: acc.customPayment3 + item.customPayment3,
      customPayment4: acc.customPayment4 + item.customPayment4,
      customPayment5: acc.customPayment5 + item.customPayment5,
      customPayment6: acc.customPayment6 + item.customPayment6,
      customPayment7: acc.customPayment7 + item.customPayment7,
      otherPayments: acc.otherPayments + item.otherPayments,
      total: acc.total + item.total
    }), {
      totalCardSlips: 0,
      totalCheques: 0,
      totalCash: 0,
      totalBankTransfer: 0,
      totalAdvancePayment: 0,
      pos: 0,
      customPayment2: 0,
      customPayment3: 0,
      customPayment4: 0,
      customPayment5: 0,
      customPayment6: 0,
      customPayment7: 0,
      otherPayments: 0,
      total: 0
    })
  : {
      totalCardSlips: 0,
      totalCheques: 0,
      totalCash: 0,
      totalBankTransfer: 0,
      totalAdvancePayment: 0,
      pos: 0,
      customPayment2: 0,
      customPayment3: 0,
      customPayment4: 0,
      customPayment5: 0,
      customPayment6: 0,
      customPayment7: 0,
      otherPayments: 0,
      total: 0
    };


	return (
		<div className="p-6 rounded-lg shadow-sm">
			<h2 className="text-2xl font-bold mb-6">Register Report</h2>
			
			{/* Filters Section */}
			<div className="p-4 rounded-lg mb-6">
				<h3 className="text-lg font-semibold mb-4">Filters</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
						<label className="text-sm font-medium mb-1">Status</label>
						<select
							value={filters.status}
							onChange={(e) => handleFilterChange('status', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">All Status</option>
							<option value="open">Open</option>
							<option value="closed">Closed</option>
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

			{/* Register Table */}
			<div className="overflow-x-auto">
				<DynamicTable 
					data={mockRegisterData}
					columns={registerColumns}
					enableRowSelection={false}
					enablePagination={true}
					enableSorting={true}
					enableFiltering={true}
					enableColumnVisibility={true}
					enableExport={true}
					exportFilename="register-report"
					exportTitle="Register Report"
					pageSize={100}
					searchPlaceholder="Search ..."
					emptyMessage="No data available in table"
					className=""
				/>
			</div>

			{/* Totals Section */}
			<div className="border border-gray-200 rounded-lg p-4 mt-6">
				<div className="overflow-x-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<div>
							<h4 className="text-lg font-semibold mb-2">Payment Totals:</h4>
							<div className="space-y-1 text-sm">
								<div className="flex justify-between">
									<span>Total Card Slips:</span>
									<span className="font-bold">{formatCurrency(totals.totalCardSlips)}</span>
								</div>
								<div className="flex justify-between">
									<span>Total Cheques:</span>
									<span className="font-bold">{formatCurrency(totals.totalCheques)}</span>
								</div>
								<div className="flex justify-between">
									<span>Total Cash:</span>
									<span className="font-bold">{formatCurrency(totals.totalCash)}</span>
								</div>
								<div className="flex justify-between">
									<span>Total Bank Transfer:</span>
									<span className="font-bold">{formatCurrency(totals.totalBankTransfer)}</span>
								</div>
								<div className="flex justify-between">
									<span>Total Advance Payment:</span>
									<span className="font-bold">{formatCurrency(totals.totalAdvancePayment)}</span>
								</div>
								<div className="flex justify-between">
									<span>POS:</span>
									<span className="font-bold">{formatCurrency(totals.pos)}</span>
								</div>
								<div className="flex justify-between">
									<span>Other Payments:</span>
									<span className="font-bold">{formatCurrency(totals.otherPayments)}</span>
								</div>
							</div>
						</div>
						<div className="flex items-center justify-center lg:justify-end">
							<div className="text-center lg:text-right">
								<h4 className="text-lg font-semibold">Grand Total:</h4>
								<p className="text-2xl font-bold text-green-600">{formatCurrency(totals.total)}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
