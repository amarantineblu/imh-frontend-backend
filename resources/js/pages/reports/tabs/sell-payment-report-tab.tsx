
import { Button } from '@/components/ui/button';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

// Interface definitions
interface SellPaymentData {
	id: string;
	referenceNo: string;
	paidOn: string;
	amount: number;
	customer: string;
	customerGroup: string;
	paymentMethod: string;
	sell: string;
}

interface Filters {
	customer: string;
	businessLocation: string;
	paymentMethod: string;
	customerGroup: string;
	dateFrom: string;
	dateTo: string;
}

// Mock data based on the provided content
const mockSellPaymentData: SellPaymentData[] = [
	{
		id: '1',
		referenceNo: 'SP2025/77350',
		paidOn: '2025-07-10T14:42:00',
		amount: 400.00,
		customer: 'BABA O',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91063'
	},
	{
		id: '2',
		referenceNo: 'SP2025/77349',
		paidOn: '2025-07-10T14:41:00',
		amount: 500.00,
		customer: 'AUWAL',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '89017'
	},
	{
		id: '3',
		referenceNo: 'SP2025/77348',
		paidOn: '2025-07-10T14:40:00',
		amount: 1400.00,
		customer: 'MOHAMMED',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '90908'
	},
	{
		id: '4',
		referenceNo: 'SP2025/77347',
		paidOn: '2025-07-10T14:33:00',
		amount: 1600.00,
		customer: 'DID',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '90974'
	},
	{
		id: '5',
		referenceNo: 'SP2025/77346',
		paidOn: '2025-07-10T14:31:00',
		amount: 3000.00,
		customer: 'ADEBAYO',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91187'
	},
	{
		id: '6',
		referenceNo: 'SP2025/77345',
		paidOn: '2025-07-10T14:27:00',
		amount: 2000.00,
		customer: 'HARUNA',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91259'
	},
	{
		id: '7',
		referenceNo: 'SP2025/77344',
		paidOn: '2025-07-10T14:23:00',
		amount: 3000.00,
		customer: 'POWER',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91084'
	},
	{
		id: '8',
		referenceNo: 'SP2025/77343',
		paidOn: '2025-07-10T14:06:00',
		amount: 800.00,
		customer: 'GOVERNMENT',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '89852'
	},
	{
		id: '9',
		referenceNo: 'SP2025/77342',
		paidOn: '2025-07-10T14:05:00',
		amount: 900.00,
		customer: 'GOVERNMENT',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91071'
	},
	{
		id: '10',
		referenceNo: 'SP2025/77341',
		paidOn: '2025-07-10T14:04:00',
		amount: 100.00,
		customer: 'ABDULAHI',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91286'
	},
	{
		id: '11',
		referenceNo: 'SP2025/77340',
		paidOn: '2025-07-10T14:00:00',
		amount: 800.00,
		customer: 'OKUDIRI',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91256'
	},
	{
		id: '12',
		referenceNo: 'SP2025/77339',
		paidOn: '2025-07-10T13:57:00',
		amount: 1000.00,
		customer: 'IB',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91305'
	},
	{
		id: '13',
		referenceNo: 'SP2025/77338',
		paidOn: '2025-07-10T13:51:00',
		amount: 1000.00,
		customer: 'DANIEL',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91317'
	},
	{
		id: '14',
		referenceNo: 'SP2025/77337',
		paidOn: '2025-07-10T13:48:00',
		amount: 800.00,
		customer: 'EMABOM',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91230'
	},
	{
		id: '15',
		referenceNo: 'SP2025/77336',
		paidOn: '2025-07-10T13:35:00',
		amount: 1000.00,
		customer: 'MAMA OG',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91255'
	},
	{
		id: '16',
		referenceNo: 'SP2025/77335',
		paidOn: '2025-07-10T13:31:00',
		amount: 400.00,
		customer: 'EMMA',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91218'
	},
	{
		id: '17',
		referenceNo: 'SP2025/77334',
		paidOn: '2025-07-10T13:26:00',
		amount: 800.00,
		customer: 'INUWA',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91183'
	},
	{
		id: '18',
		referenceNo: 'SP2025/77333',
		paidOn: '2025-07-10T13:25:00',
		amount: 300.00,
		customer: 'DKD',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91011'
	},
	{
		id: '19',
		referenceNo: 'SP2025/77332',
		paidOn: '2025-07-10T13:24:00',
		amount: 2000.00,
		customer: 'MK',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91240'
	},
	{
		id: '20',
		referenceNo: 'SP2025/77331',
		paidOn: '2025-07-10T13:23:00',
		amount: 250.00,
		customer: 'MAGAJI',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91156'
	},
	{
		id: '21',
		referenceNo: 'SP2025/77330',
		paidOn: '2025-07-10T13:21:00',
		amount: 400.00,
		customer: 'LAMIDO',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91324'
	},
	{
		id: '22',
		referenceNo: 'SP2025/77329',
		paidOn: '2025-07-10T13:20:00',
		amount: 120.00,
		customer: 'MUSA',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91284'
	},
	{
		id: '23',
		referenceNo: 'SP2025/77328',
		paidOn: '2025-07-10T13:19:00',
		amount: 200.00,
		customer: 'RABIU',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91298'
	},
	{
		id: '24',
		referenceNo: 'SP2025/77327',
		paidOn: '2025-07-10T13:18:00',
		amount: 1500.00,
		customer: 'ALI',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '91231'
	},
	{
		id: '25',
		referenceNo: 'SP2025/77326',
		paidOn: '2025-07-10T13:15:00',
		amount: 1000.00,
		customer: 'MUSTAPHA',
		customerGroup: '',
		paymentMethod: 'Cash',
		sell: '90724'
	}
];

export default function SellPaymentReportTab() {
	const [filters, setFilters] = useState<Filters>({
		customer: '',
		businessLocation: '',
		paymentMethod: '',
		customerGroup: '',
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
			customer: '',
			businessLocation: '',
			paymentMethod: '',
			customerGroup: '',
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

	// Sell payment table columns
	const sellPaymentColumns: TableColumn<SellPaymentData>[] = [
		{
			accessorKey: 'referenceNo',
			header: 'Reference No',
			sortable: true,
			className: 'font-mono text-blue-600'
		},
		{
			accessorKey: 'paidOn',
			header: 'Paid on',
			sortable: true,
			cell: (value, row) => formatDateTime(row.paidOn)
		},
		{
			accessorKey: 'amount',
			header: 'Amount',
			sortable: true,
			align: 'right',
			cell: (value, row) => (
				<span className="font-bold text-green-600">
					{formatCurrency(row.amount)}
				</span>
			)
		},
		{
			accessorKey: 'customer',
			header: 'Customer',
			sortable: true,
			className: 'font-medium'
		},
		{
			accessorKey: 'customerGroup',
			header: 'Customer Group',
			sortable: true
		},
		{
			accessorKey: 'paymentMethod',
			header: 'Payment Method',
			sortable: true
		},
		{
			accessorKey: 'sell',
			header: 'Sell',
			sortable: true,
			className: 'font-mono text-blue-600'
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

	// Calculate total amount
	const totalAmount = mockSellPaymentData.reduce((sum, item) => sum + item.amount, 0);

	return (
		<div className="p-6 rounded-lg shadow-sm">
			<h2 className="text-2xl font-bold mb-6">Sell Payment Report</h2>

			{/* Filters Section */}
			<div className="p-4 rounded-lg mb-6">
				<h3 className="text-lg font-semibold mb-4">Filters</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<div className="flex flex-col">
						<Label className="text-sm font-medium mb-1">Customer</Label>
						<Input
							type="text"
							value={filters.customer}
							onChange={(e) => handleFilterChange('customer', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter customer name"
						/>
					</div>

					<div className="flex flex-col">
						<Label className="text-sm font-medium mb-1">Business Location</Label>
						<Input
							type="text"
							value={filters.businessLocation}
							onChange={(e) => handleFilterChange('businessLocation', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter business location"
						/>
					</div>

					<div className="flex flex-col">
						<Label className="text-sm font-medium mb-1">Payment Method</Label>
						<Input
							type="text"
							value={filters.paymentMethod}
							onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter payment method"
						/>
					</div>

					<div className="flex flex-col">
						<Label className="text-sm font-medium mb-1">Customer Group</Label>
						<Input
							type="text"
							value={filters.customerGroup}
							onChange={(e) => handleFilterChange('customerGroup', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter customer group"
						/>
					</div>

					<div className="flex flex-col col-span-2">
						<Label className="text-sm font-medium mb-1">Date Range</Label>
						<div className="flex gap-2">
							<Input
								type="date"
								value={filters.dateFrom}
								onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
								className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<span className="self-center">-</span>
							<Input
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

			{/* Total Section */}
			<div className="border border-gray-200 rounded-lg p-4 mb-6">
				<div className="flex justify-between items-center">
					<h4 className="text-lg font-semibold">Total:</h4>
					<div className="text-right">
						<p className="text-lg font-bold text-green-600">{formatCurrency(totalAmount)}</p>
					</div>
				</div>
			</div>

			{/* Sell Payment Table */}
			<DynamicTable
				data={mockSellPaymentData}
				columns={sellPaymentColumns}
				enableRowSelection={false}
				enablePagination={true}
				enableSorting={true}
				enableFiltering={true}
				enableColumnVisibility={true}
				enableExport={true}
				exportFilename="sell-payment-report"
				exportTitle="Sell Payment Report"
				pageSize={100}
				searchPlaceholder="Search ..."
				emptyMessage="No data available in table"
				className=""
			/>
		</div>
	);
}
