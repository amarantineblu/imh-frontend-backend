import { Button } from '@/components/ui/button';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useState } from 'react';

// Interface definitions
interface PurchasePaymentData {
	id: string;
	referenceNo: string;
	paidOn: string;
	amount: number;
	supplier: string;
	paymentMethod: string;
	purchase: string;
}

interface Filters {
	supplier: string;
	businessLocation: string;
	dateFrom: string;
	dateTo: string;
}

// Mock data
// const mockPurchasePaymentData: PurchasePaymentData[] = [
// 	// Empty array for demo - no purchase payment data
// ];

interface Props {
	purchasePayment: PurchasePaymentData[];
}
export default function PurchasePaymentReportTab(props:Props) {
	const { purchasePayment: mockPurchasePaymentData } = props;

	const [filters, setFilters] = useState<Filters>({
		supplier: '',
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
			supplier: '',
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

	// Format date
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: '2-digit',
			day: '2-digit',
			year: 'numeric'
		});
	};

	// Purchase payment table columns
	const purchasePaymentColumns: TableColumn<PurchasePaymentData>[] = [
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
			cell: (value, row) => formatDate(row.paidOn)
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
			accessorKey: 'supplier',
			header: 'Supplier',
			sortable: true,
			className: 'font-medium'
		},
		{
			accessorKey: 'paymentMethod',
			header: 'Payment Method',
			sortable: true
		},
		{
			accessorKey: 'purchase',
			header: 'Purchase',
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
	const totalAmount = mockPurchasePaymentData.reduce((sum, item) => sum + item.amount, 0);

	return (
		<div className="p-6 rounded-lg shadow-sm">
			<h2 className="text-2xl font-bold mb-6">Purchase Payment Report</h2>
			
			{/* Filters Section */}
			<div className="p-4 rounded-lg mb-6">
				<h3 className="text-lg font-semibold mb-4">Filters</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<div className="flex flex-col">
						<label className="text-sm font-medium mb-1">Supplier</label>
						<input 
							type="text" 
							value={filters.supplier}
							onChange={(e) => handleFilterChange('supplier', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter supplier name"
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

			{/* Total Section */}
			<div className="border border-gray-200 rounded-lg p-4 mb-6">
				<div className="flex justify-between items-center">
					<h4 className="text-lg font-semibold">Total:</h4>
					<div className="text-right">
						<p className="text-lg font-bold text-green-600">{formatCurrency(totalAmount)}</p>
					</div>
				</div>
			</div>

			{/* Purchase Payment Table */}
			<DynamicTable 
				data={mockPurchasePaymentData}
				columns={purchasePaymentColumns}
				enableRowSelection={false}
				enablePagination={true}
				enableSorting={true}
				enableFiltering={true}
				enableColumnVisibility={true}
				enableExport={true}
				exportFilename="purchase-payment-report"
				exportTitle="Purchase Payment Report"
				pageSize={100}
				searchPlaceholder="Search ..."
				emptyMessage="No data available in table"
				className=""
			/>
		</div>
	);
}

