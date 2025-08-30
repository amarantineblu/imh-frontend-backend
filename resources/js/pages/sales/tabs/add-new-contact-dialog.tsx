import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

export default function AddNewContactDialog() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button type="button" size="icon" variant="outline">
                        <Plus className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="h-[500px] w-[cal(100vh - 100px)]">
                    <DialogHeader>
                        <DialogTitle>Add a new contact</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                                Individual
                            </Button>
                            <Button variant="outline" size="sm">
                                Business
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="contactId">Contact ID:</Label>
                                <Input id="contactId" placeholder="Leave empty to autogenerate" />
                            </div>

                            <div>
                                <Label htmlFor="customerGroup">Customer Group:</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select customer group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="regular">Regular</SelectItem>
                                        <SelectItem value="vip">VIP</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="mobile">Mobile: *</Label>
                                <Input id="mobile" placeholder="Enter mobile number" />
                            </div>

                            <div>
                                <Label htmlFor="altContact">Alternate contact number:</Label>
                                <Input id="altContact" placeholder="Enter alternate number" />
                            </div>

                            <div>
                                <Label htmlFor="landline">Landline:</Label>
                                <Input id="landline" placeholder="Enter landline number" />
                            </div>

                            <div>
                                <Label htmlFor="email">Email:</Label>
                                <Input id="email" type="email" placeholder="Enter email address" />
                            </div>

                            <div>
                                <Label htmlFor="assignedTo">Assigned to:</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select assignee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="sales">Sales Team</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
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
