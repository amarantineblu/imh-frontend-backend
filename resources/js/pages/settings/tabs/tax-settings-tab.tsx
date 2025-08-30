import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DynamicTable, type TableColumn } from "@/components/ui/dynamic-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const taxRateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rate: z.number().min(0, "Tax Rate % is required"),
});

const taxGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subTaxes: z.array(z.string()).min(1, "At least one sub tax is required"),
});

type TaxRate = z.infer<typeof taxRateSchema>;
type TaxGroup = z.infer<typeof taxGroupSchema>;

export default function TaxSettingsTab() {
  const [taxRates, setTaxRates] = useState<TaxRate[]>([]);
  const [taxGroups, setTaxGroups] = useState<TaxGroup[]>([]);
  const [taxRateDialog, setTaxRateDialog] = useState(false);
  const [taxGroupDialog, setTaxGroupDialog] = useState(false);
  const [editTaxRateIndex, setEditTaxRateIndex] = useState<number | null>(null);
  const [editTaxGroupIndex, setEditTaxGroupIndex] = useState<number | null>(null);

  const taxRateForm = useForm<TaxRate>({
    resolver: zodResolver(taxRateSchema),
    defaultValues: { name: "", rate: 0 },
  });
  const taxGroupForm = useForm<TaxGroup>({
    resolver: zodResolver(taxGroupSchema),
    defaultValues: { name: "", subTaxes: [] },
  });

  const taxRateColumns: TableColumn<TaxRate>[] = [
    { accessorKey: "name", header: "Name", sortable: true },
    { accessorKey: "rate", header: "Tax Rate %" },
    {
      type: "actions",
      header: "Action",
      buttons: [
        {
          label: "Edit",
          onClick: (row, idx) => {
            taxRateForm.reset(row);
            setEditTaxRateIndex(idx);
            setTaxRateDialog(true);
          },
          variant: "outline",
          size: "sm",
        },
        {
          label: "Delete",
          onClick: (row, idx) => setTaxRates(taxRates.filter((_, i) => i !== idx)),
          variant: "destructive",
          size: "sm",
        },
      ],
    },
  ];
  const taxGroupColumns: TableColumn<TaxGroup>[] = [
    { accessorKey: "name", header: "Name", sortable: true },
    { accessorKey: "rate", header: "Tax Rate %", cell: () => "For tax group only" },
    { accessorKey: "subTaxes", header: "Sub taxes", cell: row => row.subTaxes?.join(", ") },
    {
      type: "actions",
      header: "Action",
      buttons: [
        {
          label: "Edit",
          onClick: (row, idx) => {
            taxGroupForm.reset(row);
            setEditTaxGroupIndex(idx);
            setTaxGroupDialog(true);
          },
          variant: "outline",
          size: "sm",
        },
        {
          label: "Delete",
          onClick: (row, idx) => setTaxGroups(taxGroups.filter((_, i) => i !== idx)),
          variant: "destructive",
          size: "sm",
        },
      ],
    },
  ];

  const handleTaxRateSubmit = (values: TaxRate) => {
    if (editTaxRateIndex !== null) {
      const updated = [...taxRates];
      updated[editTaxRateIndex] = values;
      setTaxRates(updated);
      setEditTaxRateIndex(null);
    } else {
      setTaxRates([...taxRates, values]);
    }
    setTaxRateDialog(false);
    taxRateForm.reset();
  };
  const handleTaxGroupSubmit = (values: TaxGroup) => {
    if (editTaxGroupIndex !== null) {
      const updated = [...taxGroups];
      updated[editTaxGroupIndex] = values;
      setTaxGroups(updated);
      setEditTaxGroupIndex(null);
    } else {
      setTaxGroups([...taxGroups, values]);
    }
    setTaxGroupDialog(false);
    taxGroupForm.reset();
  };

  // For demo, sub taxes options are all taxRates
  const subTaxOptions = taxRates.map(t => ({ label: t.name, value: t.name }));

  return (
    <div className="space-y-8">
      <Tabs defaultValue="rates">
        <TabsList className="mb-4">
          <TabsTrigger value="rates">Tax Rates</TabsTrigger>
          <TabsTrigger value="groups">Tax Groups</TabsTrigger>
        </TabsList>
        <TabsContent value="rates">
          <div className="flex flex-col gap-2 mb-2">
            <h2 className="text-xl font-semibold">Tax Rates <span className="font-normal text-base">Manage your tax rates tab</span></h2>
            <span className="text-lg font-bold">All your tax rates</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm">
              Show <span className="font-semibold">25</span> entries
            </div>
            <Dialog open={taxRateDialog} onOpenChange={setTaxRateDialog}>
              <DialogTrigger asChild>
                <Button variant="default">Add</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Tax Rate</DialogTitle>
                </DialogHeader>
                <Form {...taxRateForm}>
                  <form onSubmit={taxRateForm.handleSubmit(handleTaxRateSubmit)} className="space-y-4">
                    <FormField
                      control={taxRateForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={taxRateForm.control}
                      name="rate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tax Rate %*</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} step={0.01} placeholder="Tax Rate %" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit" variant="default">Save</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          <DynamicTable
            data={taxRates}
            columns={taxRateColumns}
            emptyMessage="No data available in table"
            searchPlaceholder="Search ..."
            pageSize={100}
          />
          <div className="text-sm text-muted-foreground mt-2">
            Showing {taxRates.length} to {taxRates.length} of {taxRates.length} entries
          </div>
        </TabsContent>
        <TabsContent value="groups">
          <div className="flex flex-col gap-2 mb-2">
            <h2 className="text-xl font-semibold">Tax groups <span className="font-normal text-base">( Combination of multiple taxes ) tab</span></h2>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm">
              Show <span className="font-semibold">25</span> entries
            </div>
            <Dialog open={taxGroupDialog} onOpenChange={setTaxGroupDialog}>
              <DialogTrigger asChild>
                <Button variant="default">Add</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add tax group</DialogTitle>
                </DialogHeader>
                <Form {...taxGroupForm}>
                  <form onSubmit={taxGroupForm.handleSubmit(handleTaxGroupSubmit)} className="space-y-4">
                    <FormField
                      control={taxGroupForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={taxGroupForm.control}
                      name="subTaxes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sub taxes*</FormLabel>
                          <FormControl>
                            <select multiple value={field.value} onChange={e => field.onChange(Array.from(e.target.selectedOptions, o => o.value))} className="w-full border rounded p-2">
                              {subTaxOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit" variant="default">Save</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          <DynamicTable
            data={taxGroups}
            columns={taxGroupColumns}
            emptyMessage="No data available in table"
            searchPlaceholder="Search ..."
            pageSize={100}
          />
          <div className="text-sm text-muted-foreground mt-2">
            Showing {taxGroups.length} to {taxGroups.length} of {taxGroups.length} entries
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
