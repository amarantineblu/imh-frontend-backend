import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export default function PurchaseSaleReportTab() {
  // Table columns and data for tax report
  const [inputTaxSearch, setInputTaxSearch] = useState('');
  const [outputTaxSearch, setOutputTaxSearch] = useState('');
  const [expenseTaxSearch, setExpenseTaxSearch] = useState('');
  const [inputTaxPageSize, setInputTaxPageSize] = useState(100);
  const [outputTaxPageSize, setOutputTaxPageSize] = useState(100);
  const [expenseTaxPageSize, setExpenseTaxPageSize] = useState(100);

  const inputTaxColumns: TableColumn<any>[] = [
    { accessorKey: 'date', header: 'Date', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
    { accessorKey: 'reference', header: 'Reference No', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
    { accessorKey: 'supplier', header: 'Supplier', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
    { accessorKey: 'taxNumber', header: 'Tax number', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
    { accessorKey: 'totalAmount', header: 'Total amount', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
    { accessorKey: 'paymentMethod', header: 'Payment Method', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
    { accessorKey: 'discount', header: 'Discount', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
  ];
  const outputTaxColumns: TableColumn<any>[] = [
    { accessorKey: 'date', header: 'Date', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
    { accessorKey: 'invoice', header: 'Invoice No.', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
    { accessorKey: 'customer', header: 'Customer', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
    { accessorKey: 'taxNumber', header: 'Tax number', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
    { accessorKey: 'totalAmount', header: 'Total amount', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
    { accessorKey: 'paymentMethod', header: 'Payment Method', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
    { accessorKey: 'discount', header: 'Discount', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
  ];
  const expenseTaxColumns: TableColumn<any>[] = [
    { accessorKey: 'date', header: 'Date', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
    { accessorKey: 'reference', header: 'Reference No', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
    { accessorKey: 'taxNumber', header: 'Tax number', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
    { accessorKey: 'totalAmount', header: 'Total amount', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
    { accessorKey: 'paymentMethod', header: 'Payment Method', sortable: true, filterable: true, cell: (v) => <span>{String(v)}</span> },
  ];
  // Empty data for now
  const inputTaxData: any[] = [];
  const outputTaxData: any[] = [];
  const expenseTaxData: any[] = [];

  const handlePrint = () => {
    window.print();
  };
  // --- Purchase & Sale summary values ---
  const purchaseSummary = [
    { label: 'Total Purchase', value: '₦ 0.00' },
    { label: 'Purchase Including tax', value: '₦ 0.00' },
    { label: 'Total Purchase Return Including Tax', value: '₦ 0.00' },
    { label: 'Purchase Due', value: '₦ 0.00' },
  ];
  const saleSummary = [
    { label: 'Total Sale', value: '₦ 37,796,390.80' },
    { label: 'Sale Including tax', value: '₦ 37,801,442.20' },
    { label: 'Total Sell Return Including Tax', value: '₦ 0.00' },
    { label: 'Sale Due', value: '₦ 9,391,697.60' },
  ];

  return (
    <div className="space-y-8">
      {/* --- Purchase & Sale Summary Section --- */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase &amp; Sale Report</CardTitle>
          <div className="text-muted-foreground text-sm mt-1">Purchase &amp; sale details for the selected date range</div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Purchases */}
            <div>
              <div className="font-semibold text-lg mb-2">Purchases</div>
              <div className="space-y-2">
                {purchaseSummary.map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span>{item.label}:</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Sales */}
            <div>
              <div className="font-semibold text-lg mb-2">Sales</div>
              <div className="space-y-2">
                {saleSummary.map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span>{item.label}:</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Overall & Due amount */}
          <div className="rounded-lg bg-blue-50 p-4 border border-blue-200 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="font-bold text-base">
              Overall ((Sale - Sell Return) - (Purchase - Purchase Return))
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-semibold">Sale - Purchase:</span>
              <span className="text-blue-700 font-bold">₦ 37,801,442.20</span>
              <span className="mx-2 hidden md:inline">|</span>
              <span className="font-semibold">Due amount:</span>
              <span className="text-blue-700 font-bold">₦ 9,391,697.60</span>
            </div>
          </div>
        </CardContent>
        {/* Print Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={handlePrint}
            className="print:hidden bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
            type="button"
          >
            Print
          </button>
        </div>
      </Card>
      {/* --- Tax Report Section --- */}

    </div>
  );
}
