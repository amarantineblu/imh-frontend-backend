
import React, { useState } from 'react';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ItemReportData {
	id: string;
	product: string;
	sku: string;
	description: string;
	purchaseDate: string;
	purchase: string;
	lotNumber: string;
	supplier: string;
	purchasePrice: number;
	sellDate: string;
	sale: string;
	customer: string;
	location: string;
	sellQuantity: number;
	sellingPrice: number;
	subtotal: number;
}

interface Filters {
	supplier: string;
	purchaseDateFrom: string;
	purchaseDateTo: string;
	customer: string;
	sellDateFrom: string;
	sellDateTo: string;
	businessLocation: string;
}

// Mock data for demonstration
const mockItemsData: ItemReportData[] = [
	{
		id: '1',
		product: 'Samsung Galaxy S24',
		sku: 'SGS24-001',
		description: 'Latest Samsung smartphone with 128GB storage',
		purchaseDate: '2025-01-15',
		purchase: 'PO-2025-001',
		lotNumber: 'LOT-001-2025',
		supplier: 'Samsung Electronics',
		purchasePrice: 450000,
		sellDate: '2025-02-01',
		sale: 'INV-2025-001',
		customer: 'John Doe',
		location: 'Lagos Store',
		sellQuantity: 1,
		sellingPrice: 650000,
		subtotal: 650000
	},
	{
		id: '2',
		product: 'iPhone 15 Pro',
		sku: 'IP15P-001',
		description: 'Apple iPhone 15 Pro 256GB Space Black',
		purchaseDate: '2025-01-20',
		purchase: 'PO-2025-002',
		lotNumber: 'LOT-002-2025',
		supplier: 'Apple Inc.',
		purchasePrice: 800000,
		sellDate: '2025-02-05',
		sale: 'INV-2025-002',
		customer: 'Jane Smith',
		location: 'Abuja Store',
		sellQuantity: 1,
		sellingPrice: 1200000,
		subtotal: 1200000
	},
	{
		id: '3',
		product: 'MacBook Air M3',
		sku: 'MBA-M3-001',
		description: 'MacBook Air 13-inch with M3 chip, 256GB SSD',
		purchaseDate: '2025-01-25',
		purchase: 'PO-2025-003',
		lotNumber: 'LOT-003-2025',
		supplier: 'Apple Inc.',
		purchasePrice: 900000,
		sellDate: '2025-02-10',
		sale: 'INV-2025-003',
		customer: 'Mike Johnson',
		location: 'Lagos Store',
		sellQuantity: 1,
		sellingPrice: 1350000,
		subtotal: 1350000
	},
	{
		id: '4',
		product: 'Dell XPS 13',
		sku: 'DX13-001',
		description: 'Dell XPS 13 laptop with Intel i7, 512GB SSD',
		purchaseDate: '2025-02-01',
		purchase: 'PO-2025-004',
		lotNumber: 'LOT-004-2025',
		supplier: 'Dell Technologies',
		purchasePrice: 750000,
		sellDate: '2025-02-15',
		sale: 'INV-2025-004',
		customer: 'Sarah Wilson',
		location: 'Port Harcourt Store',
		sellQuantity: 1,
		sellingPrice: 1100000,
		subtotal: 1100000
	},
	{
		id: '5',
		product: 'iPad Pro 12.9"',
		sku: 'IPP129-001',
		description: 'iPad Pro 12.9-inch with M2 chip, 128GB WiFi',
		purchaseDate: '2025-02-05',
		purchase: 'PO-2025-005',
		lotNumber: 'LOT-005-2025',
		supplier: 'Apple Inc.',
		purchasePrice: 600000,
		sellDate: '2025-02-20',
		sale: 'INV-2025-005',
		customer: 'David Brown',
		location: 'Lagos Store',
		sellQuantity: 1,
		sellingPrice: 850000,
		subtotal: 850000
	}
];

export default function ItemsReportTab() {
	const [filters, setFilters] = useState<Filters>({
		supplier: '',
		purchaseDateFrom: '2025-01-01',
		purchaseDateTo: '2025-12-31',
		customer: '',
		sellDateFrom: '2025-01-01',
		sellDateTo: '2025-12-31',
		businessLocation: ''
	});

	const [filteredData, setFilteredData] = useState<ItemReportData[]>(mockItemsData);

	const handleFilterChange = (field: keyof Filters, value: string) => {
		setFilters(prev => ({
			...prev,
			[field]: value
		}));
	};

	const applyFilters = () => {
		let filtered = [...mockItemsData];

		if (filters.supplier) {
			filtered = filtered.filter(item =>
				item.supplier.toLowerCase().includes(filters.supplier.toLowerCase())
			);
		}

		if (filters.customer) {
			filtered = filtered.filter(item =>
				item.customer.toLowerCase().includes(filters.customer.toLowerCase())
			);
		}

		if (filters.businessLocation) {
			filtered = filtered.filter(item =>
				item.location.toLowerCase().includes(filters.businessLocation.toLowerCase())
			);
		}

		// Date filtering logic would go here
		setFilteredData(filtered);
	};

	const resetFilters = () => {
		setFilters({
			supplier: '',
			purchaseDateFrom: '2025-01-01',
			purchaseDateTo: '2025-12-31',
			customer: '',
			sellDateFrom: '2025-01-01',
			sellDateTo: '2025-12-31',
			businessLocation: ''
		});
		setFilteredData(mockItemsData);
	};

	// Format currency
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-NG', {
			style: 'currency',
			currency: 'NGN'
		}).format(amount);
	};

	// Calculate totals
	const totalPurchasePrice = filteredData.reduce((sum, item) => sum + item.purchasePrice, 0);
	const totalSubtotal = filteredData.reduce((sum, item) => sum + item.subtotal, 0);

	const columns: TableColumn<ItemReportData>[] = [
		{
			accessorKey: 'product',
			header: 'Product',
			sortable: true,
			className: 'font-medium'
		},
		{
			accessorKey: 'sku',
			header: 'SKU',
			sortable: true,
			className: ''
		},
		{
			accessorKey: 'description',
			header: 'Description',
			sortable: false,
			cell: (value, row) => (
				<div className="max-w-xs truncate" title={row.description}>
					{row.description}
				</div>
			)
		},
		{
			accessorKey: 'purchaseDate',
			header: 'Purchase Date',
			sortable: true,
			cell: (value, row) => new Date(row.purchaseDate).toLocaleDateString()
		},
		{
			accessorKey: 'purchase',
			header: 'Purchase',
			sortable: true,
			className: 'text-blue-600 font-mono'
		},
		{
			accessorKey: 'lotNumber',
			header: 'Lot Number',
			sortable: true,
			className: 'font-mono text-sm'
		},
		{
			accessorKey: 'supplier',
			header: 'Supplier',
			sortable: true
		},
		{
			accessorKey: 'purchasePrice',
			header: 'Purchase Price',
			sortable: true,
			align: 'right',
			cell: (value, row) => (
				<span className="font-medium text-green-600">
					{formatCurrency(row.purchasePrice)}
				</span>
			)
		},
		{
			accessorKey: 'sellDate',
			header: 'Sell Date',
			sortable: true,
			cell: (value, row) => new Date(row.sellDate).toLocaleDateString()
		},
		{
			accessorKey: 'sale',
			header: 'Sale',
			sortable: true,
			className: 'text-purple-600 font-mono'
		},
		{
			accessorKey: 'customer',
			header: 'Customer',
			sortable: true
		},
		{
			accessorKey: 'location',
			header: 'Location',
			sortable: true,
			cell: (value, row) => (
				<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
					{row.location}
				</span>
			)
		},
		{
			accessorKey: 'sellQuantity',
			header: 'Sell Quantity',
			sortable: true,
			align: 'center'
		},
		{
			accessorKey: 'sellingPrice',
			header: 'Selling Price',
			sortable: true,
			align: 'right',
			cell: (value, row) => (
				<span className="font-medium text-blue-600">
					{formatCurrency(row.sellingPrice)}
				</span>
			)
		},
		{
			accessorKey: 'subtotal',
			header: 'Subtotal',
			sortable: true,
			align: 'right',
			cell: (value, row) => (
				<span className="font-bold ">
					{formatCurrency(row.subtotal)}
				</span>
			)
		}
	];

	return (
		<div className="p-6 rounded-lg shadow-sm">
			<h2 className="text-2xl font-bold mb-6">Items Report</h2>

			{/* Filters Section */}
			<div className="p-4 rounded-lg mb-6">
				<h3 className="text-lg font-semibold  mb-4">Filters</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<div className="flex flex-col">
						<Label className="text-sm font-medium  mb-1">Supplier</Label>
						<Input
							type="text"
							value={filters.supplier}
							onChange={(e) => handleFilterChange('supplier', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter supplier name"
						/>
					</div>

					<div className="flex flex-col">
						<Label className="text-sm font-medium  mb-1">Purchase Date</Label>
						<div className="flex gap-2">
							<Input
								type="date"
								value={filters.purchaseDateFrom}
								onChange={(e) => handleFilterChange('purchaseDateFrom', e.target.value)}
								className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<span className="self-center ">-</span>
							<Input
								type="date"
								value={filters.purchaseDateTo}
								onChange={(e) => handleFilterChange('purchaseDateTo', e.target.value)}
								className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>

					<div className="flex flex-col">
						<Label className="text-sm font-medium  mb-1">Customer</Label>
						<Input
							type="text"
							value={filters.customer}
							onChange={(e) => handleFilterChange('customer', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter customer name"
						/>
					</div>

					<div className="flex flex-col">
						<Label className="text-sm font-medium  mb-1">Sell Date</Label>
						<div className="flex gap-2">
							<Input
								type="date"
								value={filters.sellDateFrom}
								onChange={(e) => handleFilterChange('sellDateFrom', e.target.value)}
								className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<span className="self-center ">-</span>
							<Input
								type="date"
								value={filters.sellDateTo}
								onChange={(e) => handleFilterChange('sellDateTo', e.target.value)}
								className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>

					<div className="flex flex-col">
						<Label className="text-sm font-medium  mb-1">Business Location</Label>
						<Input
							type="text"
							value={filters.businessLocation}
							onChange={(e) => handleFilterChange('businessLocation', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter location"
						/>
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
			<div className="border border-gray-200 rounded-lg p-4 mb-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="text-center">
						<h4 className="text-sm font-medium ">Total Items</h4>
						<p className="text-2xl font-bold text-blue-600">{filteredData.length}</p>
					</div>
					<div className="text-center">
						<h4 className="text-sm font-medium ">Total Purchase Value</h4>
						<p className="text-2xl font-bold text-green-600">{formatCurrency(totalPurchasePrice)}</p>
					</div>
					<div className="text-center">
						<h4 className="text-sm font-medium ">Total Sales Value</h4>
						<p className="text-2xl font-bold text-purple-600">{formatCurrency(totalSubtotal)}</p>
					</div>
				</div>
			</div>

			{/* Dynamic Table */}
			<DynamicTable
				data={filteredData}
				columns={columns}
				enableRowSelection={false}
				enablePagination={true}
				enableSorting={true}
				enableFiltering={true}
				enableColumnVisibility={true}
				enableExport={true}
				exportFilename="items-report"
				exportTitle="Items Report"
				pageSize={100}
				searchPlaceholder="Search items..."
				emptyMessage="No data available in table"
				className=""
			/>
		</div>
	);
}
