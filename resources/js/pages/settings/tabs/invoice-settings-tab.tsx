import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useTableActions } from '@/hooks/use-table-actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Plus, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Mock data for Invoice Schemes
const mockSchemes = [
	{
		id: '1',
		name: 'Default',
		prefix: 'Default',
		startFrom: 1,
		invoiceCount: 91747,
		digits: 4,
		isDefault: true,
	},
];

// Mock data for Invoice Layouts
const mockLayouts = [
	{ id: '1', name: 'Classic', design: 'Classic', isDefault: true },
];

// Schema for Invoice Scheme
const schemeSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	prefix: z.string().optional(),
	startFrom: z.number().min(1, 'Start from is required'),
	invoiceCount: z.number().min(0),
	digits: z.number().min(1, 'Number of digits is required'),
	isDefault: z.boolean().optional(),
});

// Schema for Invoice Layout (expanded for all required fields)
const layoutSchema = z.object({
	name: z.string().min(1, 'Layout name is required'),
	design: z.string().min(1, 'Design is required'),
	showLetterHead: z.boolean().optional(),
	invoiceLogo: z.any().optional(),
	showLogo: z.boolean().optional(),
	headerText: z.string().optional(),
	subHeading1: z.string().optional(),
	subHeading2: z.string().optional(),
	subHeading3: z.string().optional(),
	subHeading4: z.string().optional(),
	subHeading5: z.string().optional(),
	invoiceHeading: z.string().optional(),
	headingSuffixUnpaid: z.string().optional(),
	headingSuffixPaid: z.string().optional(),
	proformaInvoiceHeading: z.string().optional(),
	quotationHeading: z.string().optional(),
	salesOrderHeading: z.string().optional(),
	invoiceNoLabel: z.string().optional(),
	quotationNoLabel: z.string().optional(),
	dateLabel: z.string().optional(),
	dueDateLabel: z.string().optional(),
	showDueDate: z.boolean().optional(),
	dateTimeFormat: z.string().optional(),
	salesPersonLabel: z.string().optional(),
	commissionAgentLabel: z.string().optional(),
	showBusinessName: z.boolean().optional(),
	showLocationName: z.boolean().optional(),
	showSalesPerson: z.boolean().optional(),
	showCommissionAgent: z.boolean().optional(),
	showCustomerInfo: z.boolean().optional(),
	customerLabel: z.string().optional(),
	showClientId: z.boolean().optional(),
	clientIdLabel: z.string().optional(),
	clientTaxNumberLabel: z.string().optional(),
	showRewardPoint: z.boolean().optional(),
	customField1: z.string().optional(),
	customField2: z.string().optional(),
	customField3: z.string().optional(),
	customField4: z.string().optional(),
	locationLandmark: z.boolean().optional(),
	locationCity: z.boolean().optional(),
	locationState: z.boolean().optional(),
	locationCountry: z.boolean().optional(),
	locationZip: z.boolean().optional(),
	locationCustomField1: z.boolean().optional(),
	locationCustomField2: z.boolean().optional(),
	locationCustomField3: z.boolean().optional(),
	locationCustomField4: z.boolean().optional(),
	showMobile: z.boolean().optional(),
	showAlternateNumber: z.boolean().optional(),
	showEmail: z.boolean().optional(),
	showTax1: z.boolean().optional(),
	showTax2: z.boolean().optional(),
	productLabel: z.string().optional(),
	quantityLabel: z.string().optional(),
	unitPriceLabel: z.string().optional(),
	subtotalLabel: z.string().optional(),
	categoryOrHsnLabel: z.string().optional(),
	totalQuantityLabel: z.string().optional(),
	itemDiscountLabel: z.string().optional(),
	discountedUnitPriceLabel: z.string().optional(),
	showBrand: z.boolean().optional(),
	showSku: z.boolean().optional(),
	showCategoryCode: z.boolean().optional(),
	showSaleDescription: z.boolean().optional(),
	showProductDescription: z.boolean().optional(),
	productCustomField1: z.boolean().optional(),
	productCustomField2: z.boolean().optional(),
	productCustomField3: z.boolean().optional(),
	productCustomField4: z.boolean().optional(),
	showProductImage: z.boolean().optional(),
	showWarrantyName: z.boolean().optional(),
	showWarrantyExpiry: z.boolean().optional(),
	showWarrantyDescription: z.boolean().optional(),
	showBaseUnit: z.boolean().optional(),
	discountLabel: z.string().optional(),
	taxLabel: z.string().optional(),
	totalLabel: z.string().optional(),
	totalItemsLabel: z.string().optional(),
	roundOffLabel: z.string().optional(),
	totalDueLabel: z.string().optional(),
	amountPaidLabel: z.string().optional(),
	showPaymentInfo: z.boolean().optional(),
	showBarcode: z.boolean().optional(),
	totalDueAllSalesLabel: z.string().optional(),
	showTotalBalanceDue: z.boolean().optional(),
	changeReturnLabel: z.string().optional(),
	showTotalInWords: z.boolean().optional(),
	wordFormat: z.string().optional(),
	taxSummaryLabel: z.string().optional(),
	footerText: z.string().optional(),
	isDefault: z.boolean().optional(),
	showQrCode: z.boolean().optional(),
	showLabels: z.boolean().optional(),
	showZatcaQr: z.boolean().optional(),
	qrFields: z.array(z.string()).optional(),
	creditNoteHeading: z.string().optional(),
	creditNoteRef: z.string().optional(),
	creditNoteAmount: z.string().optional(),
});

// Define types at the top:
type InvoiceScheme = z.infer<typeof schemeSchema>;
type InvoiceLayout = z.infer<typeof layoutSchema>;
type LayoutFormValues = z.infer<typeof layoutSchema>;

export default function InvoiceSettingsTab() {
	// State for Invoice Schemes
	const [schemes, setSchemes] = useState(mockSchemes);
	const [isSchemeDialogOpen, setIsSchemeDialogOpen] = useState(false);
	const schemeForm = useForm({
		resolver: zodResolver(schemeSchema),
		defaultValues: {
			name: '',
			prefix: '',
			startFrom: 1,
			invoiceCount: 0,
			digits: 4,
			isDefault: false,
		},
	});

	// State for Invoice Layouts
	const [layouts, setLayouts] = useState(mockLayouts);
	const [isLayoutDialogOpen, setIsLayoutDialogOpen] = useState(false);
	const layoutForm = useForm({
		resolver: zodResolver(layoutSchema),
		defaultValues: {
			name: '',
			design: '',
			showLetterHead: false,
			showLogo: false,
			headerText: '',
			subHeading1: '',
			subHeading2: '',
			subHeading3: '',
			subHeading4: '',
			subHeading5: '',
			invoiceHeading: '',
			isDefault: false,
		},
	});

	// Table actions for schemes
	const { rowActions: schemeActions } = useTableActions({
		onEdit: (row) => {
			schemeForm.reset(row);
			setIsSchemeDialogOpen(true);
		},
	});

	// Table actions for layouts
	const { rowActions: layoutActions } = useTableActions({
		onEdit: (row) => {
			layoutForm.reset(row);
			setIsLayoutDialogOpen(true);
		},
	});

	// Table columns for Invoice Schemes
	const schemeColumns: TableColumn<InvoiceScheme>[] = [
		{ accessorKey: 'name', header: 'Name', sortable: true },
		{ accessorKey: 'prefix', header: 'Prefix', sortable: true },
		{ accessorKey: 'startFrom', header: 'Start from', sortable: true },
		{ accessorKey: 'invoiceCount', header: 'Invoice Count', sortable: true },
		{ accessorKey: 'digits', header: 'Number of digits', sortable: true },
		{
			type: 'actions',
			header: 'Action',
			buttons: [
				{
					label: 'Edit',
					icon: Edit,
					onClick: schemeActions.onEdit,
					variant: 'outline',
					size: 'sm',
				},
				{
					label: 'Delete',
					icon: Trash2,
					onClick: schemeActions.onDelete,
					variant: 'destructive',
					size: 'sm',
				},
				{
					label: 'Default',
					icon: Star,
					onClick: schemeActions.onDefault,
					variant: 'outline',
					size: 'sm',
					disabled: (row) => !!row.isDefault,
				},
			],
		},
	];

	// Table columns for Invoice Layouts
	const layoutColumns: TableColumn<InvoiceLayout>[] = [
		{ accessorKey: 'name', header: 'Layout Name', sortable: true },
		{ accessorKey: 'design', header: 'Design', sortable: true },
		{
			type: 'actions',
			header: 'Action',
			buttons: [
				{
					label: 'Edit',
					icon: Edit,
					onClick: layoutActions.onEdit,
					variant: 'outline',
					size: 'sm',
				},
				{
					label: 'Delete',
					icon: Trash2,
					onClick: layoutActions.onDelete,
					variant: 'destructive',
					size: 'sm',
				},
				{
					label: 'Default',
					icon: Star,
					onClick: layoutActions.onDefault,
					variant: 'outline',
					size: 'sm',
					disabled: (row) => !!row.isDefault,
				},
			],
		},
	];

	// Handlers for form submission
	const handleSchemeSubmit = (values: InvoiceScheme) => {
		setSchemes([
			...schemes,
			{ ...values, id: (schemes.length + 1).toString(), prefix: values.prefix || "" }
		]);
		setIsSchemeDialogOpen(false);
		schemeForm.reset();
	};
	const handleLayoutSubmit = (values: LayoutFormValues) => {
		setLayouts([...layouts, { ...values, id: (layouts.length + 1).toString() }]);
		setIsLayoutDialogOpen(false);
		layoutForm.reset();
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold">Invoice Settings</h2>
				<p className="text-muted-foreground">Manage your invoice settings</p>
			</div>
			<Tabs defaultValue="schemes" className="space-y-4">
				<TabsList className="flex gap-2">
					<TabsTrigger value="schemes">Invoice Schemes</TabsTrigger>
					<TabsTrigger value="layouts">Invoice Layouts</TabsTrigger>
				</TabsList>
				<TabsContent value="schemes">
					<Card>
						<CardHeader>
							<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
								<CardTitle>All your invoice schemes</CardTitle>
								<Dialog
									open={isSchemeDialogOpen}
									onOpenChange={setIsSchemeDialogOpen}
								>
									<DialogTrigger asChild>
										<Button>
											<Plus className="mr-2 h-4 w-4" />
											Add Invoice Scheme
										</Button>
									</DialogTrigger>
									<DialogContent className="max-w-lg">
										<DialogHeader>
											<DialogTitle>Add Invoice Scheme</DialogTitle>
										</DialogHeader>
										<Form {...schemeForm}>
											<form
												onSubmit={schemeForm.handleSubmit(handleSchemeSubmit)}
												className="space-y-4"
											>
												<FormField
													control={schemeForm.control}
													name="name"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Name*</FormLabel>
															<FormControl>
																<Input
																	{...field}
																	placeholder="Name"
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={schemeForm.control}
													name="prefix"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Prefix</FormLabel>
															<FormControl>
																<Input
																	{...field}
																	placeholder="Prefix"
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={schemeForm.control}
													name="startFrom"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Start from*</FormLabel>
															<FormControl>
																<Input
																	type="number"
																	{...field}
																	placeholder="Start from"
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={schemeForm.control}
													name="invoiceCount"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Invoice Count</FormLabel>
															<FormControl>
																<Input
																	type="number"
																	{...field}
																	placeholder="Invoice Count"
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={schemeForm.control}
													name="digits"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Number of digits*</FormLabel>
															<FormControl>
																<Input
																	type="number"
																	{...field}
																	placeholder="Number of digits"
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<Button
													type="submit"
													className="w-full mt-4"
												>
													Save
												</Button>
											</form>
										</Form>
									</DialogContent>
								</Dialog>
							</div> {/* End flex for CardHeader */}
						</CardHeader>
						<CardContent>
							<DynamicTable
								data={schemes}
								columns={schemeColumns}
								enableRowSelection={false}
								enablePagination={true}
								enableSorting={true}
								enableFiltering={true}
								searchPlaceholder="Search ..."
								pageSize={100}
								emptyMessage="No invoice schemes found"
							/>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="layouts">
					<Card>
						<CardHeader>
							<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
								<CardTitle>All your invoice layouts</CardTitle>
								<Dialog
									open={isLayoutDialogOpen}
									onOpenChange={setIsLayoutDialogOpen}
								>
									<DialogTrigger asChild>
										<Button>
											<Plus className="mr-2 h-4 w-4" />
											Add Invoice Layout
										</Button>
									</DialogTrigger>
									<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
										<DialogHeader>
											<DialogTitle>Add new invoice layout</DialogTitle>
										</DialogHeader>
										<Form {...layoutForm}>
											<form
												onSubmit={layoutForm.handleSubmit(handleLayoutSubmit)}
												className="space-y-6"
											>
												{/* Layout Name & Design */}
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<FormField
														control={layoutForm.control}
														name="name"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Layout name*</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Layout name" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="design"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Design*</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Classic (For normal printer)" />
																</FormControl>
																<FormMessage />
																<div className="text-xs text-muted-foreground mt-1">Used for browser based printing</div>
															</FormItem>
														)}
													/>
												</div>
												{/* Letterhead & Logo */}
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<FormField
														control={layoutForm.control}
														name="showLetterHead"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show letter head</FormLabel>
															</FormItem>
														)}
													/>
													<div>
														<FormLabel>Invoice Logo:</FormLabel>
														<Input type="file" accept="image/jpeg,image/png,image/gif" className="mt-1" />
														<div className="text-xs text-muted-foreground mt-1">Max 1 MB, jpeg,gif,png formats only.</div>
													</div>
													<FormField
														control={layoutForm.control}
														name="showLogo"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show invoice Logo</FormLabel>
															</FormItem>
														)}
													/>
												</div>
												{/* Header Text */}
												<FormField
													control={layoutForm.control}
													name="headerText"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Header text</FormLabel>
															<FormControl>
																<Textarea {...field} placeholder="Header text" rows={2} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												{/* Sub Headings */}
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<FormField
														control={layoutForm.control}
														name="subHeading1"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Sub Heading Line 1:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Sub Heading Line 1" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="subHeading2"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Sub Heading Line 2:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Sub Heading Line 2" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="subHeading3"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Sub Heading Line 3:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Sub Heading Line 3" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="subHeading4"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Sub Heading Line 4:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Sub Heading Line 4" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="subHeading5"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Sub Heading Line 5:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Sub Heading Line 5" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
												{/* Invoice Heading & Suffixes */}
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<FormField
														control={layoutForm.control}
														name="invoiceHeading"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Invoice heading:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Invoice" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="headingSuffixUnpaid"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Heading Suffix for not paid:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Heading Suffix for not paid" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="headingSuffixPaid"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Heading Suffix for paid:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Heading Suffix for paid" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
												{/* Proforma, Quotation, Sales Order Headings */}
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<FormField
														control={layoutForm.control}
														name="proformaInvoiceHeading"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Proforma invoice heading:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Proforma invoice" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="quotationHeading"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Quotation Heading:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Quotation" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="salesOrderHeading"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Sales Order Heading:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Sales Order" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
												{/* Invoice/Quotation/Date Labels */}
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<FormField
														control={layoutForm.control}
														name="invoiceNoLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Invoice no. label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Invoice No." />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="quotationNoLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Quotation no. label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Quotation number" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="dateLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Date Label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Date" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="dueDateLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Due date label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Due Date" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showDueDate"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show due date</FormLabel>
															</FormItem>
														)}
													/>
												</div>
												{/* Date Time Format */}
												<FormField
													control={layoutForm.control}
													name="dateTimeFormat"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Date time format:</FormLabel>
															<FormControl>
																<Input {...field} placeholder="Date time format" />
															</FormControl>
															<div className="text-xs text-muted-foreground mt-1">Enter date and time format in PHP datetime format. If blank business date time format will be applied</div>
															<FormMessage />
														</FormItem>
													)}
												/>
												{/* Sales Person & Commission Agent Labels */}
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<FormField
														control={layoutForm.control}
														name="salesPersonLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Sales Person Label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Sales Person Label" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="commissionAgentLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Commission agent label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Commission Agent" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showBusinessName"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show business name</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showLocationName"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show location name</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showSalesPerson"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show Sales Person</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showCommissionAgent"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show commission agent</FormLabel>
															</FormItem>
														)}
													/>
												</div>
												{/* Customer Details */}
												<div className="border-t pt-4 mt-4">
													<div className="font-semibold mb-2">Fields for customer details:</div>
													<FormField
														control={layoutForm.control}
														name="showCustomerInfo"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show Customer information</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="customerLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Customer Label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Customer" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showClientId"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show client ID</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="clientIdLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Client ID Label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Client ID Label" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="clientTaxNumberLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Client tax number label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Client tax number label" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showRewardPoint"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show reward point</FormLabel>
															</FormItem>
														)}
													/>
													{/* Custom Fields 1-4 */}
													<FormField
														control={layoutForm.control}
														name="customField1"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Custom Field 1</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Custom Field 1" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="customField2"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Custom Field 2</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Custom Field 2" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="customField3"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Custom Field 3</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Custom Field 3" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="customField4"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Custom Field 4</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Custom Field 4" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
												{/* Location Address Fields */}
												<div className="border-t pt-4 mt-4">
													<div className="font-semibold mb-2">Fields to be shown in location address:</div>
													<FormField
														control={layoutForm.control}
														name="locationLandmark"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Landmark</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="locationCity"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>City</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="locationState"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>State</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="locationCountry"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Country</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="locationZip"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Zip Code</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="locationCustomField1"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Custom field 1</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="locationCustomField2"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Custom field 2</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="locationCustomField3"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Custom field 3</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="locationCustomField4"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Custom field 4</FormLabel>
															</FormItem>
														)}
													/>
												</div>
												{/* Communication Details */}
												<div className="border-t pt-4 mt-4">
													<div className="font-semibold mb-2">Fields for Communication details:</div>
													<FormField
														control={layoutForm.control}
														name="showMobile"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Mobile number</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showAlternateNumber"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Alternate number</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showEmail"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Email</FormLabel>
															</FormItem>
														)}
													/>
												</div>
												{/* Tax Details */}
												<div className="border-t pt-4 mt-4">
													<div className="font-semibold mb-2">Fields for Tax details:</div>
													<FormField
														control={layoutForm.control}
														name="showTax1"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Tax 1 details</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showTax2"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Tax 2 details</FormLabel>
															</FormItem>
														)}
													/>
												</div>
												{/* Product/Quantity/Unit Price Labels */}
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<FormField
														control={layoutForm.control}
														name="productLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Product Label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Product" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="quantityLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Quantity Label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Quantity" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="unitPriceLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Unit Price Label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Unit Price" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="subtotalLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Subtotal Label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Subtotal" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="categoryOrHsnLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Category or HSN code label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="HSN" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="totalQuantityLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Total quantity label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Total Quantity" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="itemDiscountLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Item discount label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Discount" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="discountedUnitPriceLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Discounted unit price label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Price after discount" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
												{/* Product Details Toggles */}
												<div className="border-t pt-4 mt-4">
													<div className="font-semibold mb-2">Product details to be shown:</div>
													<FormField
														control={layoutForm.control}
														name="showBrand"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show brand</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showSku"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show SKU</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showCategoryCode"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show category code or HSN code</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showSaleDescription"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show sale description</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showProductDescription"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show product description</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="productCustomField1"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={!!field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Custom Field 1</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="productCustomField2"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={!!field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Custom Field 2</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="productCustomField3"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={!!field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Custom Field 3</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="productCustomField4"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={!!field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Custom Field 4</FormLabel>
															</FormItem>
														)}
													/>
												</div>
												{/* Totals & Payment Info */}
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<FormField
														control={layoutForm.control}
														name="subtotalLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Subtotal label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Subtotal" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="discountLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Discount label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Discount" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="taxLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Tax label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Tax" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="totalLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Total label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Total" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="totalItemsLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Total items label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Total items label" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="roundOffLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Round off label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Round Off" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="totalDueLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Total Due Label (Current sale):</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Due" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="amountPaidLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Amount Paid Label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Total paid" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showPaymentInfo"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show Payment information</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showBarcode"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show Barcode</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="totalDueAllSalesLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Total Due Label (All sales):</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Total Due Label" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showTotalBalanceDue"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show total balance due (All sales)</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="changeReturnLabel"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Change return label:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Change Return" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showTotalInWords"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show total in words</FormLabel>
															</FormItem>
														)}
													/>
												</div>
												{/* Word Format & Tax Summary */}
												<FormField
													control={layoutForm.control}
													name="wordFormat"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Word Format:</FormLabel>
															<FormControl>
																<Input {...field} placeholder="International" />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={layoutForm.control}
													name="taxSummaryLabel"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Tax summary label:</FormLabel>
															<FormControl>
																<Input {...field} placeholder="Tax summary label" />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												{/* Footer Text */}
												<FormField
													control={layoutForm.control}
													name="footerText"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Footer text:</FormLabel>
															<FormControl>
																<Textarea {...field} placeholder="Footer text" rows={2} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												{/* Set as default, QR Code, ZATCA, Restaurant, Credit Note */}
												<div className="border-t pt-4 mt-4">
													<FormField
														control={layoutForm.control}
														name="isDefault"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Set as default</FormLabel>
															</FormItem>
														)}
													/>
													<div className="font-semibold mt-4 mb-2">QR Code</div>
													<FormField
														control={layoutForm.control}
														name="showQrCode"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show QR Code</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showLabels"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>Show Labels</FormLabel>
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="showZatcaQr"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center gap-2">
																<FormControl>
																	<input type="checkbox" checked={field.value} onChange={field.onChange} />
																</FormControl>
																<FormLabel>ZATCA (Fatoora) QR code</FormLabel>
															</FormItem>
														)}
													/>
													<div className="font-semibold mt-4 mb-2">Fields to be shown:</div>
													<FormField
														control={layoutForm.control}
														name="qrFields"
														render={({ field }) => (
															<FormItem>
																<FormLabel>QR Fields:</FormLabel>
																<div className="flex flex-col gap-2">
																	<label className="flex items-center gap-2">
																		<input
																			type="checkbox"
																			checked={Array.isArray(field.value) && field.value.includes("Business Name")}
																			onChange={() => {
																				const arr = Array.isArray(field.value) ? field.value : [];
																				const newValue = arr.includes("Business Name")
																					? arr.filter((v) => v !== "Business Name")
																					: [...arr, "Business Name"];
																				field.onChange(newValue);
																			}}
																		/>
																		Business Name
																	</label>
																	<label className="flex items-center gap-2">
																		<input
																			type="checkbox"
																			checked={Array.isArray(field.value) && field.value.includes("Business location address")}
																			onChange={() => {
																				const arr = Array.isArray(field.value) ? field.value : [];
																				const newValue = arr.includes("Business location address")
																					? arr.filter((v) => v !== "Business location address")
																					: [...arr, "Business location address"];
																				field.onChange(newValue);
																			}}
																		/>
																		Business location address
																	</label>
																	<label className="flex items-center gap-2">
																		<input
																			type="checkbox"
																			checked={Array.isArray(field.value) && field.value.includes("Business tax 1")}
																			onChange={() => {
																				const arr = Array.isArray(field.value) ? field.value : [];
																				const newValue = arr.includes("Business tax 1")
																					? arr.filter((v) => v !== "Business tax 1")
																					: [...arr, "Business tax 1"];
																				field.onChange(newValue);
																			}}
																		/>
																		Business tax 1
																	</label>
																	<label className="flex items-center gap-2">
																		<input
																			type="checkbox"
																			checked={Array.isArray(field.value) && field.value.includes("Business tax 2")}
																			onChange={() => {
																				const arr = Array.isArray(field.value) ? field.value : [];
																				const newValue = arr.includes("Business tax 2")
																					? arr.filter((v) => v !== "Business tax 2")
																					: [...arr, "Business tax 2"];
																				field.onChange(newValue);
																			}}
																		/>
																		Business tax 2
																	</label>
																	<label className="flex items-center gap-2">
																		<input
																			type="checkbox"
																			checked={Array.isArray(field.value) && field.value.includes("Invoice No.")}
																			onChange={() => {
																				const arr = Array.isArray(field.value) ? field.value : [];
																				const newValue = arr.includes("Invoice No.")
																					? arr.filter((v) => v !== "Invoice No.")
																					: [...arr, "Invoice No."];
																				field.onChange(newValue);
																			}}
																		/>
																		Invoice No.
																	</label>
																	<label className="flex items-center gap-2">
																		<input
																			type="checkbox"
																			checked={Array.isArray(field.value) && field.value.includes("Invoice Datetime")}
																			onChange={() => {
																				const arr = Array.isArray(field.value) ? field.value : [];
																				const newValue = arr.includes("Invoice Datetime")
																					? arr.filter((v) => v !== "Invoice Datetime")
																					: [...arr, "Invoice Datetime"];
																				field.onChange(newValue);
																			}}
																		/>
																		Invoice Datetime
																	</label>
																	<label className="flex items-center gap-2">
																		<input
																			type="checkbox"
																			checked={Array.isArray(field.value) && field.value.includes("Subtotal")}
																			onChange={() => {
																				const arr = Array.isArray(field.value) ? field.value : [];
																				const newValue = arr.includes("Subtotal")
																					? arr.filter((v) => v !== "Subtotal")
																					: [...arr, "Subtotal"];
																				field.onChange(newValue);
																			}}
																		/>
																		Subtotal
																	</label>
																	<label className="flex items-center gap-2">
																		<input
																			type="checkbox"
																			checked={Array.isArray(field.value) && field.value.includes("Total amount with tax")}
																			onChange={() => {
																				const arr = Array.isArray(field.value) ? field.value : [];
																				const newValue = arr.includes("Total amount with tax")
																					? arr.filter((v) => v !== "Total amount with tax")
																					: [...arr, "Total amount with tax"];
																				field.onChange(newValue);
																			}}
																		/>
																		Total amount with tax
																	</label>
																	<label className="flex items-center gap-2">
																		<input
																			type="checkbox"
																			checked={Array.isArray(field.value) && field.value.includes("Total Tax")}
																			onChange={() => {
																				const arr = Array.isArray(field.value) ? field.value : [];
																				const newValue = arr.includes("Total Tax")
																					? arr.filter((v) => v !== "Total Tax")
																					: [...arr, "Total Tax"];
																				field.onChange(newValue);
																			}}
																		/>
																		Total Tax
																	</label>
																	<label className="flex items-center gap-2">
																		<input
																			type="checkbox"
																			checked={Array.isArray(field.value) && field.value.includes("Customer name")}
																			onChange={() => {
																				const arr = Array.isArray(field.value) ? field.value : [];
																				const newValue = arr.includes("Customer name")
																					? arr.filter((v) => v !== "Customer name")
																					: [...arr, "Customer name"];
																				field.onChange(newValue);
																			}}
																		/>
																		Customer name
																	</label>
																	<label className="flex items-center gap-2">
																		<input
																			type="checkbox"
																			checked={Array.isArray(field.value) && field.value.includes("Invoice URL")}
																			onChange={() => {
																				const arr = Array.isArray(field.value) ? field.value : [];
																				const newValue = arr.includes("Invoice URL")
																					? arr.filter((v) => v !== "Invoice URL")
																					: [...arr, "Invoice URL"];
																				field.onChange(newValue);
																			}}
																		/>
																		Invoice URL
																	</label>
																</div>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
												{/* Restaurant module settings, Credit Note / Sell Return Details */}
												<div className="border-t pt-4 mt-4">
													<div className="font-semibold mb-2">Credit Note / Sell Return Details</div>
													<FormField
														control={layoutForm.control}
														name="creditNoteHeading"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Heading:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Credit Note" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="creditNoteRef"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Reference Number:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Reference No" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={layoutForm.control}
														name="creditNoteAmount"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Total Amount:</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="Credit Amount" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div> {/* End Credit Note / Sell Return Details */}
												<Button type="submit" className="w-full mt-6">Save</Button>
											</form>
										</Form>
									</DialogContent>
								</Dialog>
							</div> {/* End flex for CardHeader */}
						</CardHeader>
						<CardContent>
							<DynamicTable
								data={layouts}
								columns={layoutColumns}
								enableRowSelection={false}
								enablePagination={true}
								enableSorting={true}
								enableFiltering={true}
								searchPlaceholder="Search ..."
								pageSize={100}
								emptyMessage="No invoice layouts found"
							/>
							<Button className="mt-6 w-full">Save</Button>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
