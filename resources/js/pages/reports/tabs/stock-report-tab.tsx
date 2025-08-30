import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, TableColumn } from '@/components/ui/dynamic-table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

interface StockItem {
	action: string;
	sku: string;
	product: string;
	variation: string;
	category: string;
	location: string;
	unitSellingPrice: string;
	currentStock: string;
	currentStockValuePurchase: string;
	currentStockValueSale: string;
	potentialProfit: string;
	totalUnitSold: string;
	totalUnitTransfered: string;
	totalUnitAdjusted: string;
	customField1: string;
	customField2: string;
	customField3: string;
	customField4: string;
}

const columns: TableColumn<StockItem>[] = [
	{ accessorKey: 'action', header: 'Action' },
	{ accessorKey: 'sku', header: 'SKU' },
	{ accessorKey: 'product', header: 'Product' },
	{ accessorKey: 'variation', header: 'Variation' },
	{ accessorKey: 'category', header: 'Category' },
	{ accessorKey: 'location', header: 'Location' },
	{ accessorKey: 'unitSellingPrice', header: 'Unit Selling Price' },
	{ accessorKey: 'currentStock', header: 'Current stock' },
	{ accessorKey: 'currentStockValuePurchase', header: 'Current Stock Value (By purchase price)' },
	{ accessorKey: 'currentStockValueSale', header: 'Current Stock Value (By sale price)' },
	{ accessorKey: 'potentialProfit', header: 'Potential profit' },
	{ accessorKey: 'totalUnitSold', header: 'Total unit sold' },
	{ accessorKey: 'totalUnitTransfered', header: 'Total Unit Transfered' },
	{ accessorKey: 'totalUnitAdjusted', header: 'Total Unit Adjusted' },
	{ accessorKey: 'customField1', header: 'Custom Field1' },
	{ accessorKey: 'customField2', header: 'Custom Field2' },
	{ accessorKey: 'customField3', header: 'Custom Field3' },
	{ accessorKey: 'customField4', header: 'Custom Field4' },
];

const data = [
	{ action: '', sku: '0014', product: 'SUYA', variation: '', category: '', location: 'IBIYEOMIE MEAT HOUSE', unitSellingPrice: '₦ 120.00', currentStock: '--', currentStockValuePurchase: '₦ 459.00', currentStockValueSale: '₦ -185,948.40', potentialProfit: '₦ -186,407.40', totalUnitSold: '1,907.50 KG', totalUnitTransfered: '0.00 KG', totalUnitAdjusted: '0.00 KG', customField1: '', customField2: '', customField3: '', customField4: '' },
	{ action: '', sku: '0016', product: 'BEEF', variation: '', category: '', location: '', unitSellingPrice: '₦ 120.00', currentStock: '--', currentStockValuePurchase: '₦ 0.00', currentStockValueSale: '₦ 0.00', potentialProfit: '₦ 0.00', totalUnitSold: '0.00 KG', totalUnitTransfered: '0.00 KG', totalUnitAdjusted: '0.00 KG', customField1: '', customField2: '', customField3: '', customField4: '' },
	{ action: '', sku: '0017', product: 'COW RIB', variation: '', category: '', location: '', unitSellingPrice: '₦ 2,000.00', currentStock: '--', currentStockValuePurchase: '₦ 0.00', currentStockValueSale: '₦ 0.00', potentialProfit: '₦ 0.00', totalUnitSold: '0.00 Pc(s)', totalUnitTransfered: '0.00 Pc(s)', totalUnitAdjusted: '0.00 Pc(s)', customField1: '', customField2: '', customField3: '', customField4: '' },
	{ action: '', sku: '0018', product: 'FULL COW-BIG', variation: '', category: '', location: '', unitSellingPrice: '₦ 15,000.00', currentStock: '--', currentStockValuePurchase: '₦ 0.00', currentStockValueSale: '₦ 0.00', potentialProfit: '₦ 0.00', totalUnitSold: '0.00 Pc(s)', totalUnitTransfered: '0.00 Pc(s)', totalUnitAdjusted: '0.00 Pc(s)', customField1: '', customField2: '', customField3: '', customField4: '' },
	{ action: '', sku: '0019', product: 'FULL SHAKY', variation: '', category: '', location: '', unitSellingPrice: '₦ 1,000.00', currentStock: '--', currentStockValuePurchase: '₦ 0.00', currentStockValueSale: '₦ 0.00', potentialProfit: '₦ 0.00', totalUnitSold: '0.00 Pc(s)', totalUnitTransfered: '0.00 Pc(s)', totalUnitAdjusted: '0.00 Pc(s)', customField1: '', customField2: '', customField3: '', customField4: '' },
	{ action: '', sku: '0020', product: 'GOAT HEAD', variation: '', category: '', location: '', unitSellingPrice: '₦ 200.00', currentStock: '--', currentStockValuePurchase: '₦ 0.00', currentStockValueSale: '₦ 0.00', potentialProfit: '₦ 0.00', totalUnitSold: '0.00 Pc(s)', totalUnitTransfered: '0.00 Pc(s)', totalUnitAdjusted: '0.00 Pc(s)', customField1: '', customField2: '', customField3: '', customField4: '' },
	{ action: '', sku: '0021', product: 'COW HAND', variation: '', category: '', location: '', unitSellingPrice: '₦ 1,500.00', currentStock: '--', currentStockValuePurchase: '₦ 0.00', currentStockValueSale: '₦ 0.00', potentialProfit: '₦ 0.00', totalUnitSold: '0.00 Pc(s)', totalUnitTransfered: '0.00 Pc(s)', totalUnitAdjusted: '0.00 Pc(s)', customField1: '', customField2: '', customField3: '', customField4: '' },
	{ action: '', sku: '0022', product: 'COW TAIL', variation: '', category: '', location: '', unitSellingPrice: '₦ 1,000.00', currentStock: '--', currentStockValuePurchase: '₦ 0.00', currentStockValueSale: '₦ 0.00', potentialProfit: '₦ 0.00', totalUnitSold: '0.00 Pc(s)', totalUnitTransfered: '0.00 Pc(s)', totalUnitAdjusted: '0.00 Pc(s)', customField1: '', customField2: '', customField3: '', customField4: '' },
	{ action: '', sku: '0023', product: 'FULL GOAT', variation: '', category: '', location: '', unitSellingPrice: '₦ 1,500.00', currentStock: '--', currentStockValuePurchase: '₦ 0.00', currentStockValueSale: '₦ 0.00', potentialProfit: '₦ 0.00', totalUnitSold: '0.00 Pc(s)', totalUnitTransfered: '0.00 Pc(s)', totalUnitAdjusted: '0.00 Pc(s)', customField1: '', customField2: '', customField3: '', customField4: '' },
	{ action: '', sku: '0024', product: 'FULL KANDA', variation: '', category: '', location: '', unitSellingPrice: '₦ 1,000.00', currentStock: '--', currentStockValuePurchase: '₦ 0.00', currentStockValueSale: '₦ 0.00', potentialProfit: '₦ 0.00', totalUnitSold: '0.00 Pc(s)', totalUnitTransfered: '0.00 Pc(s)', totalUnitAdjusted: '0.00 Pc(s)', customField1: '', customField2: '', customField3: '', customField4: '' },
	{ action: '', sku: '0026', product: 'BONES', variation: '', category: '', location: '', unitSellingPrice: '₦ 100.00', currentStock: '--', currentStockValuePurchase: '₦ 0.00', currentStockValueSale: '₦ 0.00', potentialProfit: '₦ 0.00', totalUnitSold: '0.00 Pc(s)', totalUnitTransfered: '0.00 Pc(s)', totalUnitAdjusted: '0.00 Pc(s)', customField1: '', customField2: '', customField3: '', customField4: '' },
	{ action: '', sku: '0027', product: 'TOZO', variation: '', category: '', location: '', unitSellingPrice: '₦ 1,500.00', currentStock: '--', currentStockValuePurchase: '₦ 0.00', currentStockValueSale: '₦ 0.00', potentialProfit: '₦ 0.00', totalUnitSold: '0.00 Pc(s)', totalUnitTransfered: '0.00 Pc(s)', totalUnitAdjusted: '0.00 Pc(s)', customField1: '', customField2: '', customField3: '', customField4: '' },
	{ action: '', sku: '0028', product: 'TOZO', variation: '', category: '', location: '', unitSellingPrice: '₦ 120.00', currentStock: '--', currentStockValuePurchase: '₦ 0.00', currentStockValueSale: '₦ 0.00', potentialProfit: '₦ 0.00', totalUnitSold: '0.00 KG', totalUnitTransfered: '0.00 KG', totalUnitAdjusted: '0.00 KG', customField1: '', customField2: '', customField3: '', customField4: '' },
	{ action: '', sku: '0029', product: 'COW HEAD', variation: '', category: '', location: '', unitSellingPrice: '₦ 1,000.00', currentStock: '--', currentStockValuePurchase: '₦ 0.00', currentStockValueSale: '₦ 0.00', potentialProfit: '₦ 0.00', totalUnitSold: '0.00 Pc(s)', totalUnitTransfered: '0.00 Pc(s)', totalUnitAdjusted: '0.00 Pc(s)', customField1: '', customField2: '', customField3: '', customField4: '' },
	{ action: '', sku: '0030', product: 'CHICKEN', variation: '', category: '', location: '', unitSellingPrice: '₦ 200.00', currentStock: '0.00 Pc(s)', currentStockValuePurchase: '₦ 0.00', currentStockValueSale: '₦ 0.00', potentialProfit: '₦ 0.00', totalUnitSold: '0.00 Pc(s)', totalUnitTransfered: '0.00 Pc(s)', totalUnitAdjusted: '0.00 Pc(s)', customField1: '', customField2: '', customField3: '', customField4: '' },
	{ action: '', sku: '1', product: 'COW LAP', variation: '', category: '', location: '', unitSellingPrice: '₦ 1,700.00', currentStock: '--', currentStockValuePurchase: '₦ 0.00', currentStockValueSale: '₦ 0.00', potentialProfit: '₦ 0.00', totalUnitSold: '0.00 Pc(s)', totalUnitTransfered: '0.00 Pc(s)', totalUnitAdjusted: '0.00 Pc(s)', customField1: '', customField2: '', customField3: '', customField4: '' },
	{ action: '', sku: '8', product: 'COW LEG (MATCHING GROUND)', variation: '', category: '', location: 'IBIYEOMIE MEAT HOUSE', unitSellingPrice: '₦ 200.00', currentStock: '--', currentStockValuePurchase: '₦ 0.00', currentStockValueSale: '₦ 200.00', potentialProfit: '₦ 200.00', totalUnitSold: '1,398.00 KG', totalUnitTransfered: '0.00 KG', totalUnitAdjusted: '0.00 KG', customField1: '', customField2: '', customField3: '', customField4: '' },
	// Summary row
	{ action: 'Total:', sku: '', product: '', variation: '', category: '', location: '', unitSellingPrice: '0.00', currentStock: '', currentStockValuePurchase: '₦ 459.00', currentStockValueSale: '₦ -185,748.40', potentialProfit: '₦ -186,207.40', totalUnitSold: '3,305.50', totalUnitTransfered: '0.00', totalUnitAdjusted: '0.00', customField1: '', customField2: '', customField3: '', customField4: '' },
];

export default function Page() {
	const [businessLocation, setBusinessLocation] = useState<string>('');
	const [category, setCategory] = useState<string>('');
	const [subCategory, setSubCategory] = useState<string>('');
	const [brand, setBrand] = useState<string>('');
	const [unit, setUnit] = useState<string>('');
	const [entriesPerPage, setEntriesPerPage] = useState<string>('25');
	const [searchTerm, setSearchTerm] = useState<string>('');

	// Summary statistics
	const summaryStats = {
		closingStockPurchase: '₦ 459.00',
		closingStockSale: '₦ 812.00',
		potentialProfit: '₦ 353.00',
		profitMargin: '43.47'
	};

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Stock Report</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						{/* Filters Section */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Filters</h3>
							<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
								<div>
									<label className="text-sm font-medium text-gray-700 mb-2 block">
										Business Location:
									</label>
									<Select onValueChange={setBusinessLocation} value={businessLocation}>
										<SelectTrigger>
											<SelectValue placeholder="Select location" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">All Locations</SelectItem>
											<SelectItem value="ibiyeomie">IBIYEOMIE MEAT HOUSE</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-700 mb-2 block">
										Category:
									</label>
									<Select onValueChange={setCategory} value={category}>
										<SelectTrigger>
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">All Categories</SelectItem>
											<SelectItem value="meat">Meat</SelectItem>
											<SelectItem value="poultry">Poultry</SelectItem>
											<SelectItem value="seafood">Seafood</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-700 mb-2 block">
										Sub category:
									</label>
									<Select onValueChange={setSubCategory} value={subCategory}>
										<SelectTrigger>
											<SelectValue placeholder="Select sub category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">All Sub Categories</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-700 mb-2 block">
										Brand:
									</label>
									<Select onValueChange={setBrand} value={brand}>
										<SelectTrigger>
											<SelectValue placeholder="Select brand" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">All Brands</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-700 mb-2 block">
										Unit:
									</label>
									<Select onValueChange={setUnit} value={unit}>
										<SelectTrigger>
											<SelectValue placeholder="Select unit" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">All Units</SelectItem>
											<SelectItem value="kg">KG</SelectItem>
											<SelectItem value="pcs">Pc(s)</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>

						{/* Summary Statistics */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
								<h4 className="text-sm font-medium text-blue-800 mb-1">
									Closing stock (By purchase price)
								</h4>
								<p className="text-2xl font-bold text-blue-900">
									{summaryStats.closingStockPurchase}
								</p>
							</div>
							<div className="bg-green-50 border border-green-200 rounded-lg p-4">
								<h4 className="text-sm font-medium text-green-800 mb-1">
									Closing stock (By sale price)
								</h4>
								<p className="text-2xl font-bold text-green-900">
									{summaryStats.closingStockSale}
								</p>
							</div>
							<div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
								<h4 className="text-sm font-medium text-purple-800 mb-1">
									Potential profit
								</h4>
								<p className="text-2xl font-bold text-purple-900">
									{summaryStats.potentialProfit}
								</p>
							</div>
							<div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
								<h4 className="text-sm font-medium text-orange-800 mb-1">
									Profit Margin %
								</h4>
								<p className="text-2xl font-bold text-orange-900">
									{summaryStats.profitMargin}
								</p>
							</div>
						</div>

						{/* Table Controls */}
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
							<div className="flex items-center gap-2">
								<span className="text-sm text-gray-600">Show</span>
								<Select onValueChange={setEntriesPerPage} value={entriesPerPage}>
									<SelectTrigger className="w-20">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="10">10</SelectItem>
										<SelectItem value="25">25</SelectItem>
										<SelectItem value="50">50</SelectItem>
										<SelectItem value="100">100</SelectItem>
									</SelectContent>
								</Select>
								<span className="text-sm text-gray-600">entries</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-sm text-gray-600">Search</span>
								<Input
									placeholder="Search ..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-48"
								/>
							</div>
						</div>

						{/* Data Table */}
						<DynamicTable columns={columns} data={data} />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
