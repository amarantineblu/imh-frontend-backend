import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, TableColumn } from '@/components/ui/dynamic-table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Minus, Package, Plus, Printer, Save, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';

// Mock data for meat products
const mockCustomers = [
  { id: '1', name: 'John Smith', email: 'john@example.com', address: '123 Main St, City' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', address: '456 Oak Ave, Town' },
  { id: '3', name: 'Mike Wilson', email: 'mike@example.com', address: '789 Pine Rd, Village' },
];

const mockProducts = [
  { id: '0016', name: 'BEEF', price: 120.00, stock: 25, sku: '0016' },
  { id: '0026', name: 'BONES', price: 100.00, stock: 15, sku: '0026' },
  { id: '0030', name: 'CHICKEN', price: 85.00, stock: 30, sku: '0030' },
  { id: '0021', name: 'COW HAND', price: 95.00, stock: 12, sku: '0021' },
  { id: '0029', name: 'COW HEAD', price: 150.00, stock: 8, sku: '0029' },
  { id: '0001', name: 'COW LAP', price: 110.00, stock: 10, sku: '0001' },
  { id: '0008', name: 'COW LEG', price: 130.00, stock: 6, sku: '0008' },
  { id: '0017', name: 'COW RIB', price: 140.00, stock: 8, sku: '0017' },
];

interface DraftItem extends Record<string, unknown> {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  unitPrice: number;
  discount: number;
  subtotal: number;
}

export default function AddDraftTab() {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [billingAddress, setBillingAddress] = useState('Walk-In Customer');
  const [shippingAddress, setShippingAddress] = useState('Walk-In Customer');
  const [payTerm, setPayTerm] = useState('');
  const [saleDate, setSaleDate] = useState('07/04/2025 17:08');
  const [invoiceScheme, setInvoiceScheme] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [tallyNumber, setTallyNumber] = useState('');
  const [draftItems, setDraftItems] = useState<DraftItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [discountType, setDiscountType] = useState('Percentage');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [orderTax, setOrderTax] = useState('None');
  const [sellNote, setSellNote] = useState('');
  const [shippingDetails, setShippingDetails] = useState('');
  const [shippingCharges, setShippingCharges] = useState(0);
  const [shippingStatus, setShippingStatus] = useState('');
  const [deliveredTo, setDeliveredTo] = useState('');

  const addItem = () => {
    const product = mockProducts.find((p) => p.id === selectedProduct);
    if (!product || quantity <= 0) return;

    const existingItem = draftItems.find((item) => item.productId === selectedProduct);

    if (existingItem) {
      setDraftItems(
        draftItems.map((item) =>
          item.productId === selectedProduct
            ? { ...item, quantity: item.quantity + quantity, subtotal: (item.quantity + quantity) * item.unitPrice - item.discount }
            : item
        ),
      );
    } else {
      const newItem: DraftItem = {
        id: Date.now().toString(),
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
        unitPrice: product.price,
        discount: 0,
        subtotal: product.price * quantity,
      };
      setDraftItems([...draftItems, newItem]);
    }

    setSelectedProduct('');
    setQuantity(1);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    setDraftItems(draftItems.map((item) =>
      item.id === id
        ? { ...item, quantity: newQuantity, subtotal: newQuantity * item.unitPrice - item.discount }
        : item
    ));
  };

  const updateDiscount = (id: string, discount: number) => {
    setDraftItems(draftItems.map((item) =>
      item.id === id
        ? { ...item, discount, subtotal: item.quantity * item.unitPrice - discount }
        : item
    ));
  };

  const removeItem = (id: string) => {
    setDraftItems(draftItems.filter((item) => item.id !== id));
  };

  const itemsTotal = draftItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = draftItems.reduce((sum, item) => sum + item.subtotal, 0);
  const totalDiscountAmount = discountType === 'Percentage'
    ? subtotal * (discountAmount / 100)
    : discountAmount;
  const orderTaxAmount = orderTax === 'None' ? 0 : subtotal * 0.075; // 7.5% VAT
  const totalPayable = subtotal - totalDiscountAmount + orderTaxAmount + shippingCharges;

  const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const draftColumns: TableColumn<DraftItem>[] = [
    {
      accessorKey: 'productName',
      header: 'Product',
      cell: (value: unknown) => <span className="font-medium">{value as string}</span>,
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: (value: unknown, row: DraftItem) => (
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={() => updateQuantity(row.id, row.quantity - 1)} className="h-6 w-6 p-0">
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-12 text-center text-sm">{row.quantity.toFixed(2)}</span>
          <Button variant="outline" size="sm" onClick={() => updateQuantity(row.id, row.quantity + 1)} className="h-6 w-6 p-0">
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
    {
      accessorKey: 'unitPrice',
      header: 'Unit Price',
      cell: (value: unknown) => `₦${(value as number).toFixed(2)}`,
    },
    {
      accessorKey: 'discount',
      header: 'Discount',
      cell: (value: unknown, row: DraftItem) => (
        <Input
          type="number"
          value={row.discount}
          onChange={(e) => updateDiscount(row.id, Number(e.target.value))}
          className="w-20 h-8 text-sm"
          min="0"
          step="0.01"
        />
      ),
    },
    {
      accessorKey: 'subtotal',
      header: 'Subtotal',
      cell: (value: unknown) => <span className="font-medium">₦{(value as number).toFixed(2)}</span>,
    },
    {
      type: 'actions',
      header: '',
      buttons: [
        {
          label: 'Remove',
          variant: 'ghost',
          size: 'sm',
          icon: Trash2,
          onClick: (row: DraftItem) => removeItem(row.id),
          className: 'text-red-500 hover:text-red-700',
        },
      ],
    },
  ];

  const saveDraft = () => {
    if (!selectedCustomer || draftItems.length === 0 || !tallyNumber.trim()) {
      alert('Please select a customer, add at least one item, and provide a tally number.');
      return;
    }

    // Here you would typically save to backend
    alert('Draft saved successfully!');

    // Reset form
    setSelectedCustomer('');
    setBillingAddress('Walk-In Customer');
    setShippingAddress('Walk-In Customer');
    setPayTerm('');
    setSaleDate(getCurrentDateTime());
    setInvoiceScheme('');
    setInvoiceNo('');
    setTallyNumber('');
    setDraftItems([]);
    setDiscountAmount(0);
    setOrderTax('None');
    setSellNote('');
    setShippingDetails('');
    setShippingCharges(0);
    setShippingStatus('');
    setDeliveredTo('');
  };

  const saveAndPrint = () => {
    if (!selectedCustomer || draftItems.length === 0 || !tallyNumber.trim()) {
      alert('Please select a customer, add at least one item, and provide a tally number.');
      return;
    }

    // Here you would typically save to backend
    alert('Draft saved and sent to printer!');

    // For demo purposes, print the draft details to console
    const draftDetails = {
      customer: selectedCustomer,
      billingAddress,
      shippingAddress,
      payTerm,
      saleDate,
      invoiceScheme,
      invoiceNo,
      tallyNumber,
      items: draftItems,
      discountType,
      discountAmount,
      orderTax,
      sellNote,
      shippingDetails,
      shippingCharges,
      shippingStatus,
      deliveredTo,
      totalPayable: totalPayable.toFixed(2)
    };
    console.log('Draft Details for printing:', draftDetails);

    // Trigger browser print dialog (you can customize this as needed)
    window.print();

    // Reset form
    setSelectedCustomer('');
    setBillingAddress('Walk-In Customer');
    setShippingAddress('Walk-In Customer');
    setPayTerm('');
    setSaleDate(getCurrentDateTime());
    setInvoiceScheme('');
    setInvoiceNo('');
    setTallyNumber('');
    setDraftItems([]);
    setDiscountAmount(0);
    setOrderTax('None');
    setSellNote('');
    setShippingDetails('');
    setShippingCharges(0);
    setShippingStatus('');
    setDeliveredTo('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold">Add Draft</h2>
        <p className="text-blue-600 font-medium">IBIYEOMIE MEAT HOUSE (BL0001)</p>
      </div>

      {/* Customer and Basic Information */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer" className="text-sm font-medium">Customer:*</Label>
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Billing Address:</Label>
              <div className="p-2 bg-gray-50 rounded text-sm">
                {billingAddress}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Shipping Address:</Label>
              <div className="p-2 bg-gray-50 rounded text-sm">
                {shippingAddress}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payTerm" className="text-sm font-medium">Pay term:</Label>
              <Select value={payTerm} onValueChange={setPayTerm}>
                <SelectTrigger>
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit-7">7 Days Credit</SelectItem>
                  <SelectItem value="credit-15">15 Days Credit</SelectItem>
                  <SelectItem value="credit-30">30 Days Credit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="saleDate" className="text-sm font-medium">Sale Date:*</Label>
              <Input
                id="saleDate"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoiceScheme" className="text-sm font-medium">Invoice scheme:</Label>
              <Select value={invoiceScheme} onValueChange={setInvoiceScheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select scheme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Scheme</SelectItem>
                  <SelectItem value="retail">Retail Scheme</SelectItem>
                  <SelectItem value="wholesale">Wholesale Scheme</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoiceNo" className="text-sm font-medium">Invoice No.:</Label>
              <Input
                id="invoiceNo"
                placeholder="Keep blank to auto generate"
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tallyNumber" className="text-sm font-medium">TALLY NUMBER:*</Label>
              <Input
                id="tallyNumber"
                placeholder="TALLY NUMBER"
                value={tallyNumber}
                onChange={(e) => setTallyNumber(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Attach Document:</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                <p className="text-xs text-gray-500">
                  Max File size: 5MB<br />
                  Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Selection */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative mb-4">
            <Input
              placeholder="Enter Product name / SKU / Scan bar code"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              className="pl-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Package className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {mockProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} - ₦{product.price.toFixed(2)} (SKU: {product.sku})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-24">
              <Input
                type="number"
                placeholder="Qty"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                step="0.01"
              />
            </div>
            <Button onClick={addItem} disabled={!selectedProduct}>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>

          {/* Items Table */}
          {draftItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Package className="mx-auto h-8 w-8 mb-2" />
              <p>No items added yet</p>
            </div>
          ) : (
            <DynamicTable
              data={draftItems}
              columns={draftColumns}
              enablePagination={false}
              enableSorting={false}
              enableFiltering={false}
              emptyMessage="No items added yet"
            />
          )}

          {/* Totals */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Items: {itemsTotal.toFixed(2)} &nbsp;&nbsp;&nbsp;&nbsp; Total: {totalPayable.toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Discount and Tax */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Discount Type:*</Label>
              <Select value={discountType} onValueChange={setDiscountType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Percentage">Percentage</SelectItem>
                  <SelectItem value="Fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Discount Amount:*</Label>
              <Input
                type="number"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(Number(e.target.value))}
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Order Tax:*</Label>
              <Select value={orderTax} onValueChange={setOrderTax}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="VAT 7.5%">VAT 7.5%</SelectItem>
                  <SelectItem value="VAT 5%">VAT 5%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Sell note</Label>
              <Textarea
                value={sellNote}
                onChange={(e) => setSellNote(e.target.value)}
                placeholder="Add notes..."
                rows={2}
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span>Discount Amount:(-):</span>
              <span>₦{totalDiscountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Order Tax:(+):</span>
              <span>₦{orderTaxAmount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Shipping Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Shipping Details</Label>
              <Textarea
                value={shippingDetails}
                onChange={(e) => setShippingDetails(e.target.value)}
                placeholder="Shipping Details"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Shipping Address</Label>
              <Textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Shipping Address"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Shipping Charges</Label>
              <Input
                type="number"
                value={shippingCharges}
                onChange={(e) => setShippingCharges(Number(e.target.value))}
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Shipping Status</Label>
              <Select value={shippingStatus} onValueChange={setShippingStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Delivered To:</Label>
              <Input
                value={deliveredTo}
                onChange={(e) => setDeliveredTo(e.target.value)}
                placeholder="Delivered To"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Shipping Documents:</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                <p className="text-xs text-gray-500">
                  Max File size: 5MB<br />
                  Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total and Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold text-blue-600">
              Total Payable: ₦{totalPayable.toFixed(2)}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCustomer('');
                setBillingAddress('Walk-In Customer');
                setShippingAddress('Walk-In Customer');
                setPayTerm('');
                setSaleDate(getCurrentDateTime());
                setInvoiceScheme('');
                setInvoiceNo('');
                setTallyNumber('');
                setDraftItems([]);
                setDiscountAmount(0);
                setOrderTax('None');
                setSellNote('');
                setShippingDetails('');
                setShippingCharges(0);
                setShippingStatus('');
                setDeliveredTo('');
              }}
            >
              Clear All
            </Button>
            <Button onClick={saveDraft} disabled={!selectedCustomer || draftItems.length === 0 || !tallyNumber.trim()}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button onClick={saveAndPrint} disabled={!selectedCustomer || draftItems.length === 0 || !tallyNumber.trim()}>
              <Printer className="mr-2 h-4 w-4" />
              Save & Print
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
