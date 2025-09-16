

import React, { useState } from 'react';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface ProductPurchaseData {
	id: string;
	product: string;
	sku: string;
	supplier: string;
	referenceNo: string;
	date: string;
	quantity: number;
	totalUnitAdjusted: number;
	unitPurchasePrice: number;
	subtotal: number;
}

interface Filters {
	searchProduct: string;
	supplier: string;
	businessLocation: string;
	dateFrom: string;
	dateTo: string;
	brand: string;
}

// Mock data for demonstration
// const mockPurchaseData: ProductPurchaseData[] = [
// 	{
// 		id: '1',
// 		product: 'Samsung Galaxy S24',
// 		sku: 'SGS24-001',
// 		supplier: 'Samsung Electronics',
// 		referenceNo: 'PO-2025-001',
// 		date: '2025-01-15',
// 		quantity: 10,
// 		totalUnitAdjusted: 10,
// 		unitPurchasePrice: 450000,
// 		subtotal: 4500000
// 	},
// 	{
// 		id: '2',
// 		product: 'iPhone 15 Pro',
// 		sku: 'IP15P-001',
// 		supplier: 'Apple Inc.',
// 		referenceNo: 'PO-2025-002',
// 		date: '2025-01-20',
// 		quantity: 5,
// 		totalUnitAdjusted: 5,
// 		unitPurchasePrice: 800000,
// 		subtotal: 4000000
// 	},
// 	{
// 		id: '3',
// 		product: 'MacBook Air M3',
// 		sku: 'MBA-M3-001',
// 		supplier: 'Apple Inc.',
// 		referenceNo: 'PO-2025-003',
// 		date: '2025-01-25',
// 		quantity: 3,
// 		totalUnitAdjusted: 3,
// 		unitPurchasePrice: 900000,
// 		subtotal: 2700000
// 	},
// 	{
// 		id: '4',
// 		product: 'Dell XPS 13',
// 		sku: 'DX13-001',
// 		supplier: 'Dell Technologies',
// 		referenceNo: 'PO-2025-004',
// 		date: '2025-02-01',
// 		quantity: 8,
// 		totalUnitAdjusted: 7,
// 		unitPurchasePrice: 750000,
// 		subtotal: 5250000
// 	},
// 	{
// 		id: '5',
// 		product: 'iPad Pro 12.9"',
// 		sku: 'IPP129-001',
// 		supplier: 'Apple Inc.',
// 		referenceNo: 'PO-2025-005',
// 		date: '2025-02-05',
// 		quantity: 6,
// 		totalUnitAdjusted: 6,
// 		unitPurchasePrice: 600000,
// 		subtotal: 3600000
// 	},
// 	{
// 		id: '6',
// 		product: 'Surface Laptop 5',
// 		sku: 'SL5-001',
// 		supplier: 'Microsoft Corp.',
// 		referenceNo: 'PO-2025-006',
// 		date: '2025-02-10',
// 		quantity: 4,
// 		totalUnitAdjusted: 4,
// 		unitPurchasePrice: 850000,
// 		subtotal: 3400000
// 	},
// 	{
// 		id: '7',
// 		product: 'Samsung Galaxy Tab S9',
// 		sku: 'SGT-S9-001',
// 		supplier: 'Samsung Electronics',
// 		referenceNo: 'PO-2025-007',
// 		date: '2025-02-15',
// 		quantity: 12,
// 		totalUnitAdjusted: 11,
// 		unitPurchasePrice: 320000,
// 		subtotal: 3520000
// 	}
// ];

interface Props{
	purchaseData:ProductPurchaseData[],
}
export default function ProductPurchaseReportTab(props:Props) {
	const{purchaseData:mockPurchaseData} = props;
	const [filters, setFilters] = useState<Filters>({
		searchProduct: '',
		supplier: '',
		businessLocation: '',
		dateFrom: '2025-01-01',
		dateTo: '2025-12-31',
		brand: ''
	});

	const [filteredData, setFilteredData] = useState<ProductPurchaseData[]>(mockPurchaseData);

	const handleFilterChange = (field: keyof Filters, value: string) => {
		setFilters(prev => ({
			...prev,
			[field]: value
		}));
	};

	const applyFilters = () => {
		let filtered = [...mockPurchaseData];

		if (filters.searchProduct) {
			filtered = filtered.filter(item => 
				item.product.toLowerCase().includes(filters.searchProduct.toLowerCase()) ||
				item.sku.toLowerCase().includes(filters.searchProduct.toLowerCase())
			);
		}

		if (filters.supplier) {
			filtered = filtered.filter(item => 
				item.supplier.toLowerCase().includes(filters.supplier.toLowerCase())
			);
		}

		if (filters.brand) {
			filtered = filtered.filter(item => 
				item.product.toLowerCase().includes(filters.brand.toLowerCase())
			);
		}

		// Date filtering logic would go here
		setFilteredData(filtered);
	};

	const resetFilters = () => {
		setFilters({
			searchProduct: '',
			supplier: '',
			businessLocation: '',
			dateFrom: '2025-01-01',
			dateTo: '2025-12-31',
			brand: ''
		});
		setFilteredData(mockPurchaseData);
	};

	// Format currency
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-NG', {
			style: 'currency',
			currency: 'NGN'
		}).format(amount);
	};

	// Calculate totals
	const totalQuantity = filteredData.reduce((sum, item) => sum + item.quantity, 0);
	const totalAdjusted = filteredData.reduce((sum, item) => sum + item.totalUnitAdjusted, 0);
	const totalSubtotal = filteredData.reduce((sum, item) => sum + item.subtotal, 0);

	const columns: TableColumn<ProductPurchaseData>[] = [
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
			className: ' font-mono'
		},
		{
			accessorKey: 'supplier',
			header: 'Supplier',
			sortable: true,
			cell: (value, row) => (
				<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
					{row.supplier}
				</span>
			)
		},
		{
			accessorKey: 'referenceNo',
			header: 'Reference No',
			sortable: true,
			className: 'text-blue-600 font-mono'
		},
		{
			accessorKey: 'date',
			header: 'Date',
			sortable: true,
			cell: (value, row) => new Date(row.date).toLocaleDateString()
		},
		{
			accessorKey: 'quantity',
			header: 'Quantity',
			sortable: true,
			align: 'center',
			cell: (value, row) => (
				<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
					{row.quantity}
				</span>
			)
		},
		{
			accessorKey: 'totalUnitAdjusted',
			header: 'Total Unit Adjusted',
			sortable: true,
			align: 'center',
			cell: (value, row) => (
				<div className="flex items-center justify-center space-x-2">
					<span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
						row.totalUnitAdjusted !== row.quantity 
							? 'bg-orange-100 text-orange-800' 
							: 'bg-green-100 text-green-800'
					}`}>
						{row.totalUnitAdjusted}
					</span>
					{row.totalUnitAdjusted !== row.quantity && (
						<span className="text-xs text-orange-600">Adjusted</span>
					)}
				</div>
			)
		},
		{
			accessorKey: 'unitPurchasePrice',
			header: 'Unit Purchase Price',
			sortable: true,
			align: 'right',
			cell: (value, row) => (
				<span className="font-medium text-green-600">
					{formatCurrency(row.unitPurchasePrice)}
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
			<h2 className="text-2xl font-bold  mb-6">Product Purchase Report</h2>
			
			{/* Filters Section */}
			<div className="p-4 rounded-lg mb-6">
				<h3 className="text-lg font-semibold  mb-4">Filters</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<div className="flex flex-col col-span-full">
						<label className="text-sm font-medium  mb-1">Search Product</label>
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2  h-4 w-4" />
							<input 
								type="text" 
								value={filters.searchProduct}
								onChange={(e) => handleFilterChange('searchProduct', e.target.value)}
								className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Enter Product name / SKU / Scan bar code"
							/>
						</div>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-medium  mb-1">Supplier</label>
						<input 
							type="text" 
							value={filters.supplier}
							onChange={(e) => handleFilterChange('supplier', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter supplier name"
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-medium  mb-1">Business Location</label>
						<input 
							type="text" 
							value={filters.businessLocation}
							onChange={(e) => handleFilterChange('businessLocation', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter location"
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-medium  mb-1">Date Range</label>
						<div className="flex gap-2">
							<input 
								type="date" 
								value={filters.dateFrom}
								onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
								className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<span className="self-center ">-</span>
							<input 
								type="date" 
								value={filters.dateTo}
								onChange={(e) => handleFilterChange('dateTo', e.target.value)}
								className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-medium  mb-1">Brand</label>
						<input 
							type="text" 
							value={filters.brand}
							onChange={(e) => handleFilterChange('brand', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter brand name"
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
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<div className="text-center">
						<h4 className="text-sm font-medium ">Total Products</h4>
						<p className="text-2xl font-bold text-blue-600">{filteredData.length}</p>
					</div>
					<div className="text-center">
						<h4 className="text-sm font-medium ">Total Quantity</h4>
						<p className="text-2xl font-bold text-green-600">{totalQuantity}</p>
					</div>
					<div className="text-center">
						<h4 className="text-sm font-medium ">Total Adjusted</h4>
						<p className="text-2xl font-bold text-orange-600">{totalAdjusted}</p>
					</div>
					<div className="text-center">
						<h4 className="text-sm font-medium ">Total Value</h4>
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
				exportFilename="product-purchase-report"
				exportTitle="Product Purchase Report"
				pageSize={100}
				searchPlaceholder="Search products..."
				emptyMessage="No data available in table"
				className=""
			/>
		</div>
	);
}
