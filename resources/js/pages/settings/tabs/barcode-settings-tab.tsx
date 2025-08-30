import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DynamicTable, type TableColumn } from "@/components/ui/dynamic-table";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const barcodeSchema = z.object({
  name: z.string().min(1, "Sticker Sheet setting Name is required"),
  description: z.string().optional(),
  isContinuous: z.boolean().default(false),
  topMargin: z.number().min(0, "Top margin is required"),
  leftMargin: z.number().min(0, "Left margin is required"),
  stickerWidth: z.number().min(1, "Width is required"),
  stickerHeight: z.number().min(1, "Height is required"),
  paperWidth: z.number().min(1, "Paper width is required"),
  paperHeight: z.number().min(1, "Paper height is required"),
  stickersPerRow: z.number().min(1, "Stickers per row is required"),
  rowDistance: z.number().min(0, "Row distance is required"),
  columnDistance: z.number().min(0, "Column distance is required"),
  stickersPerSheet: z.number().min(1, "No. of Stickers per sheet is required"),
  isDefault: z.boolean().default(false),
});

type BarcodeFormValues = z.infer<typeof barcodeSchema>;

export default function BarcodeTab() {
  const [settings, setSettings] = useState<BarcodeFormValues[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const form = useForm<BarcodeFormValues>({
    resolver: zodResolver(barcodeSchema),
    defaultValues: {
      name: "",
      description: "",
      isContinuous: false,
      topMargin: 0,
      leftMargin: 0,
      stickerWidth: 1,
      stickerHeight: 1,
      paperWidth: 1,
      paperHeight: 1,
      stickersPerRow: 1,
      rowDistance: 0,
      columnDistance: 0,
      stickersPerSheet: 1,
      isDefault: false,
    },
  });

  const columns: TableColumn<BarcodeFormValues>[] = [
    { accessorKey: "name", header: "Sticker Sheet setting Name", sortable: true },
    { accessorKey: "description", header: "Sticker Sheet setting Description" },
    {
      type: "actions",
      header: "Action",
      buttons: [
        {
          label: "Edit",
          onClick: (row, idx) => {
            form.reset(row);
            setEditIndex(idx);
            setDialogOpen(true);
          },
          variant: "outline",
          size: "sm",
        },
        {
          label: "Delete",
          onClick: (row, idx) => {
            setSettings(settings.filter((_, i) => i !== idx));
          },
          variant: "destructive",
          size: "sm",
        },
      ],
    },
  ];

  const handleSubmit = (values: BarcodeFormValues) => {
    if (editIndex !== null) {
      const updated = [...settings];
      updated[editIndex] = values;
      setSettings(updated);
      setEditIndex(null);
    } else {
      setSettings([...settings, values]);
    }
    setDialogOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Barcodes <span className="font-normal text-base">Manage your barcode settings</span></h2>
        <span className="text-lg font-bold">All your barcode settings</span>
      </div>
      {/* <div className="flex items-center justify-between"> */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button >Add</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <ScrollArea className="max-h-[500px] mr-4">
              <DialogHeader>
                <DialogTitle>Add barcode sticker setting</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Sticker Sheet setting Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Sticker Sheet setting Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Sticker Sheet setting Description</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="Sticker Sheet setting Description"
                              style={{ resize: "none" }}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="topMargin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional top margin (In Inches)*</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="leftMargin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional left margin (In Inches)*</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="stickerWidth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width of sticker (In Inches)*</FormLabel>
                          <FormControl>
                            <Input type="number" min={1} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="stickerHeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height of sticker (In Inches)*</FormLabel>
                          <FormControl>
                            <Input type="number" min={1} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="paperWidth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Paper width (In Inches)*</FormLabel>
                          <FormControl>
                            <Input type="number" min={1} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="paperHeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Paper height (In Inches)*</FormLabel>
                          <FormControl>
                            <Input type="number" min={1} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="stickersPerRow"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stickers in one row*</FormLabel>
                          <FormControl>
                            <Input type="number" min={1} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rowDistance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Distance between two rows (In Inches)*</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="columnDistance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Distance between two columns (In Inches)*</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="stickersPerSheet"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>No. of Stickers per sheet*</FormLabel>
                          <FormControl>
                            <Input type="number" min={1} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isDefault"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel>Set as default</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isContinuous"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel>Continous feed or rolls</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" variant="default">Save</Button>
                  </DialogFooter>
                </form>
              </Form>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      {/* </div> */}
      <DynamicTable
        data={settings}
        columns={columns}
        emptyMessage="No data available in table"
        searchPlaceholder="Search ..."
        pageSize={100}
      />
      <div className="text-sm text-muted-foreground">
        Showing {settings.length} to {settings.length} of {settings.length} entries
      </div>
    </div>
  );
}