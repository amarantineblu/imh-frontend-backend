
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

// const mockProducts = [
// 	{ name: 'Product A', sales: 120 },
// 	{ name: 'Product B', sales: 90 },
// 	{ name: 'Product C', sales: 80 },
// 	{ name: 'Product D', sales: 60 },
// 	{ name: 'Product E', sales: 40 },
// ];

interface Filters {
	businessLocation: string;
	category: string;
	subCategory: string;
	brand: string;
	unit: string;
	dateRange: string;
	numberOfProducts: number;
	productType: string;
}
interface Product {
	name: string;
	sales: number;
}
interface Props{
	trendingProducts:Product[],
}

export default function TrendingProductsReportTab(props:Props) {
	const {trendingProducts:mockProducts} = props;
	const [filters, setFilters] = useState<Filters>({
		businessLocation: '',
		category: '',
		subCategory: '',
		brand: '',
		unit: '',
		dateRange: '',
		numberOfProducts: 5,
		productType: 'Top Trending Products'
	});

	const handleFilterChange = (field: keyof Filters, value: string | number) => {
		setFilters(prev => ({
			...prev,
			[field]: value
		}));
	};

	const handleApplyFilters = () => {
		// TODO: Implement filter logic
		console.log('Applying filters:', filters);
	};

	const handleResetFilters = () => {
		setFilters({
			businessLocation: '',
			category: '',
			subCategory: '',
			brand: '',
			unit: '',
			dateRange: '',
			numberOfProducts: 5,
			productType: 'Top Trending Products'
		});
	};

	const maxSales = Math.max(...mockProducts.map(p => p.sales));

	return (
		<div className="p-6 rounded-lg shadow-sm">
			<h2 className="text-2xl font-bold mb-6">Trending Products</h2>
			
			{/* Filters Section */}
			<div className="p-4 rounded-lg mb-6">
				<h3 className="text-lg font-semibold mb-4">Filters</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<div className="flex flex-col">
						<Label className="text-sm font-medium mb-1">Business Location</Label>
						<Input 
							type="text" 
							value={filters.businessLocation}
							onChange={(e) => handleFilterChange('businessLocation', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter location"
						/>
					</div>
					<div className="flex flex-col">
						<Label className="text-sm font-medium mb-1">Category</Label>
						<Input 
							type="text" 
							value={filters.category}
							onChange={(e) => handleFilterChange('category', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter category"
						/>
					</div>
					<div className="flex flex-col">
						<Label className="text-sm font-medium mb-1">Sub Category</Label>
						<Input 
							type="text" 
							value={filters.subCategory}
							onChange={(e) => handleFilterChange('subCategory', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter sub category"
						/>
					</div>
					<div className="flex flex-col">
						<Label className="text-sm font-medium mb-1">Brand</Label>
						<Input 
							type="text" 
							value={filters.brand}
							onChange={(e) => handleFilterChange('brand', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter brand"
						/>
					</div>
					<div className="flex flex-col">
						<Label className="text-sm font-medium mb-1">Unit</Label>
						<Input 
							type="text" 
							value={filters.unit}
							onChange={(e) => handleFilterChange('unit', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter unit"
						/>
					</div>
					<div className="flex flex-col">
						<Label className="text-sm font-medium mb-1">Date Range</Label>
						<Input 
							type="text" 
							value={filters.dateRange}
							onChange={(e) => handleFilterChange('dateRange', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Select a date range"
						/>
					</div>
					<div className="flex flex-col">
						<Label className="text-sm font-medium mb-1">Number of Products</Label>
						<Input 
							type="number" 
							value={filters.numberOfProducts}
							onChange={(e) => handleFilterChange('numberOfProducts', parseInt(e.target.value) || 5)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							min={1}
						/>
					</div>
					<div className="flex flex-col">
						<Label className="text-sm font-medium mb-1">Product Type</Label>
						<select 
							value={filters.productType}
							onChange={(e) => handleFilterChange('productType', e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="Top Trending Products">Top Trending Products</option>
							<option value="Bottom Trending Products">Bottom Trending Products</option>
							<option value="Most Viewed Products">Most Viewed Products</option>
						</select>
					</div>
				</div>
				
				{/* Filter Action Buttons */}
				<div className="flex gap-3 mt-4">
					<button 
						onClick={handleApplyFilters}
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Apply Filters
					</button>
					<button 
						onClick={handleResetFilters}
						className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
					>
						Reset Filters
					</button>
				</div>
			</div>

			{/* Results Section */}
			<div>
				<h3 className="text-lg font-semibold mb-4">Top Trending Products</h3>
				
				{/* Enhanced Bar Chart Visualization */}
				<div className="border border-gray-200 rounded-lg p-6 mb-6">
					<h4 className="text-md font-medium mb-4">Sales Performance</h4>
					<div className="space-y-3">
						{mockProducts.map((product, index) => (
							<div key={product.name} className="flex items-center">
								<div className="w-24 text-sm font-medium mr-3">
									{product.name}
								</div>
								<div className={`flex-1 ${
											index === 0 ? 'bg-green-200' :
											index === 1 ? 'bg-blue-200' :
											index === 2 ? 'bg-yellow-200' :
											index === 3 ? 'bg-orange-200' : 'bg-red-200'
										} rounded-full h-6 relative`}>
									<div 
										className={`h-6 rounded-full transition-all duration-500 ${
											index === 0 ? 'bg-green-500' :
											index === 1 ? 'bg-blue-500' :
											index === 2 ? 'bg-yellow-500' :
											index === 3 ? 'bg-orange-500' : 'bg-red-500'
										}`}
										style={{ width: `${(product.sales / maxSales) * 100}%` }}
									/>
									<span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-medium">
										{product.sales}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Product Details Table */}
				<div className="border border-gray-200 rounded-lg overflow-hidden">
					<table className="w-full">
						<thead className="">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
									Rank
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
									Product Name
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
									Sales Count
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
									Performance
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{mockProducts.map((product, index) => (
								<tr key={product.name} className="hover:bg-white/20">
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white ${
												index === 0 ? 'bg-yellow-500' :
												index === 1 ? 'bg-gray-400' :
												index === 2 ? 'bg-orange-600' : 'bg-gray-300'
											}`}>
												{index + 1}
											</span>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm font-medium">{product.name}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm">{product.sales}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
												<div 
													className="bg-blue-600 h-2 rounded-full" 
													style={{ width: `${(product.sales / maxSales) * 100}%` }}
												></div>
											</div>
											<span className="text-sm">
												{Math.round((product.sales / maxSales) * 100)}%
											</span>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
