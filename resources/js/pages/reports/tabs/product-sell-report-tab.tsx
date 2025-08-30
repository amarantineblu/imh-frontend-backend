

import { Button } from '@/components/ui/button';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { useState } from 'react';

// Interface definitions
interface DetailedSellData {
	id: string;
	product: string;
	sku: string;
	customerName: string;
	contactId: string;
	invoiceNo: string;
	date: string;
	quantity: number;
	unitPrice: number;
	discount: number;
	tax: number;
	priceIncTax: number;
	total: number;
	unit: string;
}

interface GroupedData {
	id: string;
	product: string;
	sku: string;
	date: string;
	currentStock: number;
	totalUnitSold: number;
	total: number;
	unit: string;
}

interface CategoryData {
	id: string;
	category: string;
	currentStock: number;
	totalUnitSold: number;
	total: number;
}

interface BrandData {
	id: string;
	brand: string;
	currentStock: number;
	totalUnitSold: number;
	total: number;
}

interface Filters {
	searchProduct: string;
	customer: string;
	customerGroup: string;
	businessLocation: string;
	category: string;
	brand: string;
	dateFrom: string;
	dateTo: string;
	timeFrom: string;
	timeTo: string;
}

// Mock data
const mockDetailedData: DetailedSellData[] = [
	{
		id: '1',
		product: 'TOZO',
		sku: '0028',
		customerName: 'REV CHIGOZIE EMMANUEL',
		contactId: 'CO2012',
		invoiceNo: '65722',
		date: '2025-01-31T01:35:00',
		quantity: 550.00,
		unitPrice: 100.00,
		discount: 0.00,
		tax: 0.00,
		priceIncTax: 100.00,
		total: 55000.00,
		unit: 'KG'
	},
	{
		id: '2',
		product: 'TOZO',
		sku: '0028',
		customerName: 'MD',
		contactId: 'CO0234',
		invoiceNo: '78243',
		date: '2025-04-13T19:55:00',
		quantity: 17.00,
		unitPrice: 100.00,
		discount: 0.00,
		tax: 0.00,
		priceIncTax: 100.00,
		total: 1700.00,
		unit: 'KG'
	},
	{
		id: '3',
		product: 'SUYA',
		sku: '0014',
		customerName: 'HAMZA',
		contactId: 'CO0722',
		invoiceNo: '63916',
		date: '2025-01-19T23:11:00',
		quantity: 5.00,
		unitPrice: 100.00,
		discount: 0.00,
		tax: 0.00,
		priceIncTax: 100.00,
		total: 500.00,
		unit: 'KG'
	}
];

const mockGroupedData: GroupedData[] = [
	{
		id: '1',
		product: 'COW LAP',
		sku: '1',
		date: '2025-01-09',
		currentStock: 0,
		totalUnitSold: 2.00,
		total: 3000.00,
		unit: 'Pc(s)'
	},
	{
		id: '2',
		product: 'COW HEAD',
		sku: '0029',
		date: '2025-01-06',
		currentStock: 0,
		totalUnitSold: 1.00,
		total: 700.00,
		unit: 'Pc(s)'
	},
	{
		id: '3',
		product: 'TOZO',
		sku: '0028',
		date: '2025-01-31',
		currentStock: 0,
		totalUnitSold: 550.00,
		total: 55000.00,
		unit: 'KG'
	}
];

const mockCategoryData: CategoryData[] = [
	{
		id: '1',
		category: 'Meat Products',
		currentStock: 0,
		totalUnitSold: 368829.41,
		total: 38413578.40
	}
];

const mockBrandData: BrandData[] = [
	{
		id: '1',
		brand: 'No brand',
		currentStock: 0.00,
		totalUnitSold: 368827.41,
		total: 38410578.40
	},
	{
		id: '2',
		brand: 'COW MEAT',
		currentStock: 0.00,
		totalUnitSold: 2.00,
		total: 3000.00
	}
];

export default function ProductSellReportTab() {
	const [activeTab, setActiveTab] = useState('detailed');
	const [filters, setFilters] = useState<Filters>({
		searchProduct: '',
		customer: '',
		customerGroup: '',
		businessLocation: '',
		category: '',
		brand: '',
		dateFrom: '2025-01-01',
		dateTo: '2025-12-31',
		timeFrom: '00:00',
		timeTo: '23:59'
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
			searchProduct: '',
			customer: '',
			customerGroup: '',
			businessLocation: '',
			category: '',
			brand: '',
			dateFrom: '2025-01-01',
			dateTo: '2025-12-31',
			timeFrom: '00:00',
			timeTo: '23:59'
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

	// Detailed table columns
	const detailedColumns: TableColumn<DetailedSellData>[] = [
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
			accessorKey: 'customerName',
			header: 'Customer name',
			sortable: true
		},
		{
			accessorKey: 'contactId',
			header: 'Contact ID',
			sortable: true,
			className: 'font-mono text-sm'
		},
		{
			accessorKey: 'invoiceNo',
			header: 'Invoice No.',
			sortable: true,
			className: 'text-blue-600 font-mono'
		},
		{
			accessorKey: 'date',
			header: 'Date',
			sortable: true,
			cell: (value, row) => formatDateTime(row.date)
		},
		{
			accessorKey: 'quantity',
			header: 'Quantity',
			sortable: true,
			align: 'right',
			cell: (value, row) => `${row.quantity.toFixed(2)} ${row.unit}`
		},
		{
			accessorKey: 'unitPrice',
			header: 'Unit Price',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.unitPrice)
		},
		{
			accessorKey: 'discount',
			header: 'Discount',
			sortable: true,
			align: 'right',
			cell: (value, row) => row.discount.toFixed(2)
		},
		{
			accessorKey: 'tax',
			header: 'Tax',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.tax)
		},
		{
			accessorKey: 'priceIncTax',
			header: 'Price inc. tax',
			sortable: true,
			align: 'right',
			cell: (value, row) => formatCurrency(row.priceIncTax)
		},
		{
			accessorKey: 'total',
			header: 'Total',
			sortable: true,
			align: 'right',
			cell: (value, row) => (
				<span className="font-bold ">
					{formatCurrency(row.total)}
				</span>
			)
		}
	];

	// Grouped table columns
	const groupedColumns: TableColumn<GroupedData>[] = [
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
			accessorKey: 'date',
			header: 'Date',
			sortable: true,
			cell: (value, row) => new Date(row.date).toLocaleDateString()
		},
		{
			accessorKey: 'currentStock',
			header: 'Current stock',
			sortable: true,
			align: 'right',
			cell: (value, row) => `${row.currentStock.toFixed(2)} ${row.unit}`
		},
		{
			accessorKey: 'totalUnitSold',
			header: 'Total unit sold',
			sortable: true,
			align: 'right',
			cell: (value, row) => `${row.totalUnitSold.toFixed(2)} ${row.unit}`
		},
		{
			accessorKey: 'total',
			header: 'Total',
			sortable: true,
			align: 'right',
			cell: (value, row) => (
				<span className="font-bold ">
					{formatCurrency(row.total)}
				</span>
			)
		}
	];

	// Category table columns
	const categoryColumns: TableColumn<CategoryData>[] = [
		{
			accessorKey: 'category',
			header: 'Category',
			sortable: true,
			className: 'font-medium'
		},
		{
			accessorKey: 'currentStock',
			header: 'Current stock',
			sortable: true,
			align: 'right',
			cell: (value, row) => row.currentStock.toFixed(2)
		},
		{
			accessorKey: 'totalUnitSold',
			header: 'Total unit sold',
			sortable: true,
			align: 'right',
			cell: (value, row) => row.totalUnitSold.toFixed(2)
		},
		{
			accessorKey: 'total',
			header: 'Total',
			sortable: true,
			align: 'right',
			cell: (value, row) => (
				<span className="font-bold ">
					{formatCurrency(row.total)}
				</span>
			)
		}
	];

	// Brand table columns
	const brandColumns: TableColumn<BrandData>[] = [
		{
			accessorKey: 'brand',
			header: 'Brand',
			sortable: true,
			className: 'font-medium'
		},
		{
			accessorKey: 'currentStock',
			header: 'Current stock',
			sortable: true,
			align: 'right',
			cell: (value, row) => row.currentStock.toFixed(2)
		},
		{
			accessorKey: 'totalUnitSold',
			header: 'Total unit sold',
			sortable: true,
			align: 'right',
			cell: (value, row) => row.totalUnitSold.toFixed(2)
		},
		{
			accessorKey: 'total',
			header: 'Total',
			sortable: true,
			align: 'right',
			cell: (value, row) => (
				<span className="font-bold ">
					{formatCurrency(row.total)}
				</span>
			)
		}
	];

	// Calculate totals for detailed view
	const detailedTotalQuantity = mockDetailedData.reduce((sum, item) => sum + item.quantity, 0);
	const detailedTotalAmount = mockDetailedData.reduce((sum, item) => sum + item.total, 0);

	return (
		<div className="p-6 rounded-lg shadow-sm">
			<h2 className="text-2xl font-bold  mb-6">Product Sell Report</h2>
			
			{/* Filters Section */}
			<div className=" p-4 rounded-lg mb-6">
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
						<label className="text-sm font-medium  mb-1">Customer</label>
						<input 
							type="text" 
							value={filters.customer}
							onChange={(e) => handleFilterChange('customer', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter customer name"
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-medium  mb-1">Customer Group Name</label>
						<input 
							type="text" 
							value={filters.customerGroup}
							onChange={(e) => handleFilterChange('customerGroup', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter customer group"
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
						<label className="text-sm font-medium  mb-1">Category</label>
						<input 
							type="text" 
							value={filters.category}
							onChange={(e) => handleFilterChange('category', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter category"
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-medium  mb-1">Brand</label>
						<input 
							type="text" 
							value={filters.brand}
							onChange={(e) => handleFilterChange('brand', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter brand"
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
						<label className="text-sm font-medium  mb-1">Time range</label>
						<div className="flex gap-2">
							<input 
								type="time" 
								value={filters.timeFrom}
								onChange={(e) => handleFilterChange('timeFrom', e.target.value)}
								className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<span className="self-center ">-</span>
							<input 
								type="time" 
								value={filters.timeTo}
								onChange={(e) => handleFilterChange('timeTo', e.target.value)}
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

			{/* Tabs Section */}
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="grid w-full grid-cols-5">
					<TabsTrigger value="detailed">Detailed</TabsTrigger>
					<TabsTrigger value="detailed-purchase">Detailed (With purchase)</TabsTrigger>
					<TabsTrigger value="grouped">Grouped</TabsTrigger>
					<TabsTrigger value="category">By Category</TabsTrigger>
					<TabsTrigger value="brand">By Brand</TabsTrigger>
				</TabsList>

				{/* Detailed Tab */}
				<TabsContent value="detailed" className="space-y-4">
					<div className="border border-gray-200 rounded-lg p-4">
						<div className="flex justify-between items-center mb-4">
							<h4 className="text-lg font-semibold">Total:</h4>
							<div className="text-right">
								<p className="text-sm ">{detailedTotalQuantity.toFixed(2)} KG</p>
								<p className="text-lg font-bold text-green-600">{formatCurrency(detailedTotalAmount)}</p>
							</div>
						</div>
					</div>
					
					<DynamicTable 
						data={mockDetailedData}
						columns={detailedColumns}
						enableRowSelection={false}
						enablePagination={true}
						enableSorting={true}
						enableFiltering={true}
						enableColumnVisibility={true}
						enableExport={true}
						exportFilename="product-sell-detailed-report"
						exportTitle="Product Sell Detailed Report"
						pageSize={100}
						searchPlaceholder="Search sales..."
						emptyMessage="No data available in table"
						className=""
					/>
				</TabsContent>

				{/* Detailed with Purchase Tab */}
				<TabsContent value="detailed-purchase" className="space-y-4">
					<DynamicTable 
						data={[]} // Empty for demo
						columns={[
							{ accessorKey: 'product', header: 'Product', sortable: true },
							{ accessorKey: 'sku', header: 'SKU', sortable: true },
							{ accessorKey: 'customerName', header: 'Customer name', sortable: true },
							{ accessorKey: 'invoiceNo', header: 'Invoice No.', sortable: true },
							{ accessorKey: 'date', header: 'Date', sortable: true },
							{ accessorKey: 'purchaseRefNo', header: 'Purchase ref no.', sortable: true },
							{ accessorKey: 'supplierName', header: 'Supplier Name', sortable: true },
							{ accessorKey: 'quantity', header: 'Quantity', sortable: true }
						]}
						enableRowSelection={false}
						enablePagination={true}
						enableSorting={true}
						enableFiltering={true}
						enableColumnVisibility={true}
						enableExport={true}
						exportFilename="product-sell-with-purchase-report"
						exportTitle="Product Sell with Purchase Report"
						pageSize={100}
						searchPlaceholder="Search sales with purchase..."
						emptyMessage="No data available in table"
						className=""
					/>
				</TabsContent>

				{/* Grouped Tab */}
				<TabsContent value="grouped" className="space-y-4">
					<div className="border border-gray-200 rounded-lg p-4">
						<div className="flex justify-between items-center mb-4">
							<h4 className="text-lg font-semibold">Total:</h4>
							<div className="text-right">
								<p className="text-sm ">73.00 Pc(s), 573.00 KG</p>
								<p className="text-lg font-bold text-green-600">₦ 74,000.00</p>
							</div>
						</div>
					</div>
					
					<DynamicTable 
						data={mockGroupedData}
						columns={groupedColumns}
						enableRowSelection={false}
						enablePagination={true}
						enableSorting={true}
						enableFiltering={true}
						enableColumnVisibility={true}
						enableExport={true}
						exportFilename="product-sell-grouped-report"
						exportTitle="Product Sell Grouped Report"
						pageSize={100}
						searchPlaceholder="Search grouped sales..."
						emptyMessage="No data available in table"
						className=""
					/>
				</TabsContent>

				{/* By Category Tab */}
				<TabsContent value="category" className="space-y-4">
					<div className="border border-gray-200 rounded-lg p-4">
						<div className="flex justify-between items-center mb-4">
							<h4 className="text-lg font-semibold">Total:</h4>
							<div className="text-right">
								<p className="text-sm ">368,829.41</p>
								<p className="text-lg font-bold text-green-600">₦ 38,413,578.40</p>
							</div>
						</div>
					</div>
					
					<DynamicTable 
						data={mockCategoryData}
						columns={categoryColumns}
						enableRowSelection={false}
						enablePagination={true}
						enableSorting={true}
						enableFiltering={true}
						enableColumnVisibility={true}
						enableExport={true}
						exportFilename="product-sell-category-report"
						exportTitle="Product Sell by Category Report"
						pageSize={100}
						searchPlaceholder="Search categories..."
						emptyMessage="No data available in table"
						className=""
					/>
				</TabsContent>

				{/* By Brand Tab */}
				<TabsContent value="brand" className="space-y-4">
					<div className="border border-gray-200 rounded-lg p-4">
						<div className="flex justify-between items-center mb-4">
							<h4 className="text-lg font-semibold">Total:</h4>
							<div className="text-right">
								<p className="text-sm ">368,829.41</p>
								<p className="text-lg font-bold text-green-600">₦ 38,413,578.40</p>
							</div>
						</div>
					</div>
					
					<DynamicTable 
						data={mockBrandData}
						columns={brandColumns}
						enableRowSelection={false}
						enablePagination={true}
						enableSorting={true}
						enableFiltering={true}
						enableColumnVisibility={true}
						enableExport={true}
						exportFilename="product-sell-brand-report"
						exportTitle="Product Sell by Brand Report"
						pageSize={100}
						searchPlaceholder="Search brands..."
						emptyMessage="No data available in table"
						className=""
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
