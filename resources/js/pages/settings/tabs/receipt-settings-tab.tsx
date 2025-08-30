import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DynamicTable, type TableColumn } from "@/components/ui/dynamic-table";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const printerSchema = z.object({
  name: z.string().min(1, "Printer Name is required"),
  connectionType: z.string().min(1, "Connection Type is required"),
  capabilityProfile: z.string().min(1, "Capability Profile is required"),
  charactersPerLine: z
    .number()
    .min(1, "Characters per line is required")
    .int("Must be an integer"),
  ipAddress: z.string().optional(),
  port: z.string().optional(),
  path: z.string().optional(),
});

type PrinterFormValues = z.infer<typeof printerSchema>;

export default function ReceiptTab() {
  const [printers, setPrinters] = useState<PrinterFormValues[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const form = useForm<PrinterFormValues>({
    resolver: zodResolver(printerSchema),
    defaultValues: {
      name: "",
      connectionType: "",
      capabilityProfile: "",
      charactersPerLine: 42,
      ipAddress: "",
      port: "9100",
      path: "",
    },
  });

  const columns: TableColumn<PrinterFormValues>[] = [
    { accessorKey: "name", header: "Printer Name", sortable: true },
    { accessorKey: "connectionType", header: "Connection Type" },
    { accessorKey: "capabilityProfile", header: "Capability Profile" },
    { accessorKey: "charactersPerLine", header: "Characters per line" },
    { accessorKey: "ipAddress", header: "IP Address" },
    { accessorKey: "port", header: "Port" },
    { accessorKey: "path", header: "Path" },
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
            setPrinters(printers.filter((_, i) => i !== idx));
          },
          variant: "destructive",
          size: "sm",
        },
      ],
    },
  ];

  const handleSubmit = (values: PrinterFormValues) => {
    if (editIndex !== null) {
      const updated = [...printers];
      updated[editIndex] = values;
      setPrinters(updated);
      setEditIndex(null);
    } else {
      setPrinters([...printers, values]);
    }
    setDialogOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">
          Printers{" "}
          <span className="font-normal text-base">
            Manage your Printers
          </span>
        </h2>
        <span className="text-lg font-bold">
          All configured Printers
        </span>
      </div>
      <div className="flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Add</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Printer</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Printer Name<span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Short Descriptive Name to recognize printer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="connectionType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Connection Type<span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Connection Type"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capabilityProfile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capability Profile<span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Capability Profile"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="charactersPerLine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Characters per line<span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ipAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IP Address<span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="IP address for connecting to the printer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="port"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Port<span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="9100" {...field} />
                        </FormControl>
                        <div className="text-xs text-muted-foreground mt-1">
                          Most printer works on port 9100
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="path"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Path</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Path (optional)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    variant="default"
                  >
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <DynamicTable
        data={printers}
        columns={columns}
        emptyMessage="No data available in table"
        searchPlaceholder="Search ..."
        pageSize={100}
      />
    </div>
  );
}
