import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Minus, Package, Plus, Search, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import AddExpenseDialog from '@/components/dialogs/add-expense-dialog';

// Mock meat products data
const mockProducts = [
  { id: '0016', name: 'BEEF', price: 120.00, stock: 25, code: '0016', category: 'beef', image: null },
  { id: '0026', name: 'BONES', price: 100.00, stock: 15, code: '0026', category: 'bones', image: null },
  { id: '0030', name: 'CHICKEN', price: 85.00, stock: 30, code: '0030', category: 'chicken', image: null },
  { id: '0021', name: 'COW HAND', price: 95.00, stock: 12, code: '0021', category: 'cow parts', image: null },
  { id: '0029', name: 'COW HEAD', price: 150.00, stock: 8, code: '0029', category: 'cow parts', image: null },
  { id: '1', name: 'COW LAP', price: 110.00, stock: 10, code: '0001', category: 'cow parts', image: null },
  { id: '8', name: 'COW LEG', price: 130.00, stock: 6, code: '0008', category: 'cow parts', image: null },
  { id: '0017', name: 'COW RIB', price: 140.00, stock: 8, code: '0017', category: 'cow parts', image: null },
  { id: '0022', name: 'COW TAIL', price: 160.00, stock: 5, code: '0022', category: 'cow parts', image: null },
  { id: '0018', name: 'FULL COW-BIG', price: 2500.00, stock: 2, code: '0018', category: 'full cow', image: null },
  { id: '0023', name: 'FULL GOAT', price: 800.00, stock: 3, code: '0023', category: 'goat', image: null },
  { id: '0024', name: 'FULL KANDA', price: 450.00, stock: 4, code: '0024', category: 'kanda', image: null },
  { id: '0019', name: 'FULL SHAKY', price: 350.00, stock: 6, code: '0019', category: 'shaky', image: null },
  { id: '0020', name: 'GOAT HEAD', price: 120.00, stock: 8, code: '0020', category: 'goat', image: null },
  { id: '0014', name: 'SUYA', price: 50.00, stock: 20, code: '0014', category: 'prepared', image: null },
  { id: '0027', name: 'TOZO', price: 75.00, stock: 15, code: '0027', category: 'prepared', image: null },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  unit: string;
}

export default function PosTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);

  const filteredProducts = mockProducts.filter(
    (product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.code.includes(searchTerm),
  );

  const addToCart = (product: (typeof mockProducts)[0]) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price } : item)),
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          total: product.price,
          unit: 'KILOGRAM',
        },
      ]);
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity, total: newQuantity * item.price } : item)));
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const total = subtotal - discountAmount;

  const clearCart = () => {
    setCartItems([]);
    setDiscountPercent(0);
  };

  const handlePayment = (method: string) => {
    if (cartItems.length === 0) return;

    alert(`Processing ${method} payment for ₦${total.toFixed(2)}`);
    clearCart();
  };

  const handleSaveExpense = (expenseData: {
    businessLocation: string;
    expenseCategory: string;
    referenceNo: string;
    date: string;
    expenseFor: string;
    applicableTax: string;
    totalAmount: string;
    expenseNote: string;
    paymentAmount: string;
    paidOn: string;
    paymentMethod: string;
    paymentNote: string;
  }) => {
    console.log('Expense saved:', expenseData);
    // Here you would typically send the expense data to your backend
    alert(`Expense saved: ₦${expenseData.totalAmount}`);
  };

  return (
    <div className="grid h-[calc(100vh-200px)] grid-cols-1 gap-6 md:grid-cols-2">
      {/* Cart Section - Left Side */}
      <div className="space-y-4 col-span-1 w-full">
        <Card className="h-full">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm">Walk-In Customer</span>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Enter Product name / SKU / Scan bar code"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Button variant="outline" size="sm" className="absolute right-1 top-1/2 h-8 -translate-y-1/2 transform">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Cart Items Table */}
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-500">
                <span>Product</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span></span>
              </div>

              <div className="max-h-[300px] space-y-2 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="text-muted-foreground py-8 text-center">
                    <ShoppingCart className="mx-auto mb-2 h-8 w-8" />
                    <p>Cart is empty</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-4 gap-2 border-b pb-2">
                      <div>
                        <p className="text-sm font-medium text-blue-600">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.id}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-6 w-6 p-0">
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity.toFixed(2)}</span>
                          <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-6 w-6 p-0">
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Select value={item.unit} onValueChange={() => { }}>
                          <SelectTrigger className="h-6 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="KILOGRAM">KILOGRAM</SelectItem>
                            <SelectItem value="Pieces">Pieces</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{item.total.toFixed(2)}</p>
                      </div>
                      <div className="text-center">
                        <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="h-6 w-6 p-0 text-red-500">
                          ✕
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-2 border-t pt-2">
              <div className="flex justify-between text-sm">
                <span>Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0).toFixed(2)}</span>
                <span>Total: {total.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>Discount</span>
                <Badge variant="outline">?</Badge>
                <span>(-): ₦ 0.00</span>
                <span className="ml-auto">Shipping(+): ₦ 0.00</span>
              </div>
            </div>

            {/* Payment Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="bg-orange-500 text-white hover:bg-orange-600" onClick={() => handlePayment('Quotation')}>
                📝 Quotation
              </Button>
              <Button variant="outline" size="sm" className="bg-red-500 text-white hover:bg-red-600" onClick={() => handlePayment('Suspend')}>
                ⏸️ Suspend
              </Button>
              <Button variant="outline" size="sm" className="bg-purple-500 text-white hover:bg-purple-600" onClick={() => handlePayment('Credit Sale')}>
                ✓ Credit Sale
              </Button>
              <Button variant="outline" size="sm" className="bg-pink-500 text-white hover:bg-pink-600" onClick={() => handlePayment('Card')}>
                💳 Card
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => handlePayment('Multiple Pay')}>
                📱 Multiple Pay
              </Button>
              <Button variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600" onClick={() => handlePayment('Cash')}>
                💵 Cash
              </Button>
              <Button variant="outline" size="sm" className="bg-red-400 text-white hover:bg-red-500" onClick={clearCart}>
                ✖️ Cancel
              </Button>
              <div className="bg-blue-900 text-white p-2 rounded text-center">
                <div className="text-xs">Total Payable</div>
                <div className="text-lg font-bold">₦{total.toFixed(2)}</div>
              </div>
            </div>

            {/* Recent Transactions */}
            <Button variant="outline" className="w-full bg-blue-500 text-white hover:bg-blue-600">
              📊 Recent Transactions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Products Section - Right Side */}
      <div className="space-y-4 w-full">
        <Card className="h-full">
          <CardHeader className="pb-2">
            <div className="flex flex-col items-center justify-start gap-2">
              <div className="text-sm  text-gray-600">
                Location: IBIYEOMIE MEAT HOUSE 07/04/2025 15:47 📅
              </div>
              <div className="flex gap-2">
                <Button className="bg-purple-500 text-white hover:bg-purple-600" onClick={() => setIsExpenseDialogOpen(true)}>
                  📄 Add Expense
                </Button>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">🔔</Button>
                  <Button variant="outline" size="sm">📊</Button>
                  <Button variant="outline" size="sm">📄</Button>
                  <Button variant="outline" size="sm">📊</Button>
                  <Button variant="outline" size="sm">🎯</Button>
                  <Button variant="outline" size="sm">📑</Button>
                  <Button variant="outline" size="sm">⏮️</Button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Select defaultValue="all-brands">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-brands">All Brands</SelectItem>
                  <SelectItem value="beef">Beef</SelectItem>
                  <SelectItem value="chicken">Chicken</SelectItem>
                  <SelectItem value="goat">Goat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-200px)] grid grid-cols-3 gap-4  overflow-y-auto">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="cursor-pointer transition-all hover:shadow-lg hover:scale-101 py-0" onClick={() => addToCart(product)}>
                  <div className="h-20 bg-gray-100 rounded flex items-center justify-center">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                  <CardContent className="p-2 text-center">

                    <h4 className="font-bold text-sm mb-1">{product.name}</h4>
                    <p className="text-xs text-gray-500">({product.code})</p>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Add Expense Dialog */}
      <AddExpenseDialog
        isOpen={isExpenseDialogOpen}
        onClose={() => setIsExpenseDialogOpen(false)}
        onSave={handleSaveExpense}
      />
    </div>
  );
}
