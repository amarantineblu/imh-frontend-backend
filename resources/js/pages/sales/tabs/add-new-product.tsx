import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

export default function AddNewProductDialog() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button type="button" size="icon" variant="outline">
                        <Plus className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="h-[500px] w-[800px] min-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Add a new Product</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="w-[750px] pr-3 h-[370px]">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <Label>
                                Product Name<span className="text-red-500">*</span>
                                <Input className="mt-3" required placeholder="Enter product name" />
                            </Label>
                            <Label>
                                SKU
                                <Input className="mt-3" placeholder="Enter SKU" />
                            </Label>
                            <Label>
                                Barcode Type<span className="text-red-500">*</span>
                                <Select required>
                                    <SelectTrigger className="mt-3">
                                        <SelectValue placeholder="Select barcode type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="code128">Code 128</SelectItem>
                                        <SelectItem value="ean13">EAN-13</SelectItem>
                                        <SelectItem value="upc">UPC</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Label>
                            <Label>
                                Unit<span className="text-red-500">*</span>
                                <Select required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select unit" />
                                    </SelectTrigger >
                                    <SelectContent className="mt-3">
                                        <SelectItem value="piece">Piece</SelectItem>
                                        <SelectItem value="kg">Kg</SelectItem>
                                        <SelectItem value="litre">Litre</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Label>
                            <Label>
                                Brand
                                <Input className="mt-3" placeholder="Enter brand" />
                            </Label>
                            <Label>
                                Category
                                <Input className="mt-3" placeholder="Enter category" />
                            </Label>
                            <Label>
                                Sub category
                                <Input className="mt-3" placeholder="Enter sub category" />
                            </Label>
                            <div className="flex items-center gap-2">
                                <Input className="mt-3" type="checkbox" id="manageStock" />
                                <Label htmlFor="manageStock" className="mb-0">
                                    Manage Stock?
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input className="mt-3" type="checkbox" id="enableStock" />
                                <Label htmlFor="enableStock" className="mb-0">
                                    Enable stock management at product level
                                </Label>
                            </div>
                            <Label>
                                Alert quantity
                                <Input className="mt-3" type="number" min={0} placeholder="Enter alert quantity" />
                            </Label>
                            <Label>
                                Business Locations
                                <Select>
                                    <SelectTrigger className="mt-3">
                                        <SelectValue placeholder="Select location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ibiyeomie">IBIYEOMIE MEAT HOUSE (BL0001)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Label>
                            <Label>
                                Weight
                                <Input className="mt-3" type="number" min={0} placeholder="Enter weight" />
                            </Label>
                            <Label>
                                Product Description
                                <Input className="mt-3" placeholder="Enter product description" />
                            </Label>
                            <Label>
                                Applicable Tax
                                <Select>
                                    <SelectTrigger className="mt-3">
                                        <SelectValue placeholder="Select tax" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        <SelectItem value="vat">VAT</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Label>
                            <Label>
                                Selling Price Tax Type<span className="text-red-500">*</span>
                                <Select required>
                                    <SelectTrigger className="mt-3">
                                        <SelectValue placeholder="Select tax type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="inclusive">Inclusive</SelectItem>
                                        <SelectItem value="exclusive">Exclusive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Label>
                            <div className="flex items-center gap-2">
                                <Input className="mt-3" type="checkbox" id="enableDesc" />
                                <Label htmlFor="enableDesc" className="mb-0">
                                    Enable Product description, IMEI or Serial Number
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input className="mt-3" type="checkbox" id="notForSelling" />
                                <Label htmlFor="notForSelling" className="mb-0">
                                    Not for selling
                                </Label>
                            </div>
                            <Label>
                                Custom Field1
                                <Input className="mt-3" placeholder="Custom Field1" />
                            </Label>
                            <Label>
                                Custom Field2
                                <Input className="mt-3" placeholder="Custom Field2" />
                            </Label>
                            <Label>
                                Custom Field3
                                <Input className="mt-3" placeholder="Custom Field3" />
                            </Label>
                            <Label>
                                Custom Field4
                                <Input className="mt-3" placeholder="Custom Field4" />
                            </Label>
                            <div className="grid grid-cols-3 gap-2">
                                <Label>
                                    Default Purchase Price (Exc. tax)<span className="text-red-500">*</span>
                                    <Input className="mt-3" type="number" min={0} required placeholder="0.00" />
                                </Label>
                                <Label>
                                    x Margin(%)
                                    <Input className="mt-3" type="number" min={0} max={100} placeholder="0" />
                                </Label>
                                <Label>
                                    Default Selling Price (Exc. tax)<span className="text-red-500">*</span>
                                    <Input className="mt-3" type="number" min={0} required placeholder="0.00" />
                                </Label>
                            </div>
                            <Label>
                                Default Selling Price (Inc. tax)
                                <Input className="mt-3" type="number" min={0} placeholder="0.00" />
                            </Label>
                            <div className="mt-2 rounded border p-2">
                                <div className="mb-2 font-semibold">Add Opening Stock</div>
                                <div className="grid grid-cols-4 items-center gap-2">
                                    <div>Location</div>
                                    <div>Quantity</div>
                                    <div>Unit Cost (Before Tax)</div>
                                    <div>Subtotal (Before Tax)</div>
                                    <div>IBIYEOMIE MEAT HOUSE (BL0001)</div>
                                    <Input className="mt-3" type="number" min={0} placeholder="0" />
                                    <Input className="mt-3" type="number" min={0} placeholder="0.00" />
                                    <Input className="mt-3" type="number" min={0} placeholder="0.00" disabled />
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save Contact</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
