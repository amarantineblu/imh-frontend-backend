import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, CheckCircle2, Clock, Download, FileText, Upload, X } from 'lucide-react';
import { useState } from 'react';

interface ImportHistory extends Record<string, unknown> {
  id: string;
  fileName: string;
  status: 'completed' | 'failed' | 'processing';
  recordsTotal: number;
  recordsSuccess: number;
  recordsFailed: number;
  importDate: string;
  importType: 'contacts';
}

// Mock data for import history
const mockImportHistory: ImportHistory[] = [
  {
    id: '1',
    fileName: 'contacts_batch_1.csv',
    status: 'completed',
    recordsTotal: 150,
    recordsSuccess: 148,
    recordsFailed: 2,
    importDate: '2024-02-15T10:30:00Z',
    importType: 'contacts',
  },
  {
    id: '2',
    fileName: 'contacts_Q1_2024.xlsx',
    status: 'completed',
    recordsTotal: 75,
    recordsSuccess: 75,
    recordsFailed: 0,
    importDate: '2024-02-10T14:15:00Z',
    importType: 'contacts',
  },
  {
    id: '3',
    fileName: 'contact_update.csv',
    status: 'failed',
    recordsTotal: 200,
    recordsSuccess: 0,
    recordsFailed: 200,
    importDate: '2024-02-08T09:45:00Z',
    importType: 'contacts',
  },
  {
    id: '4',
    fileName: 'new_contacts.csv',
    status: 'processing',
    recordsTotal: 50,
    recordsSuccess: 25,
    recordsFailed: 0,
    importDate: '2024-02-16T16:20:00Z',
    importType: 'contacts',
  },
];

const columnInstructions = [
  { number: 1, name: 'Contact type (Required)', instruction: 'Available Options: 1 = Customer, 2 = Supplier, 3 = Both' },
  { number: 2, name: 'Prefix (Optional)', instruction: '' },
  { number: 3, name: 'First Name (Required)', instruction: '' },
  { number: 4, name: 'Middle name (Optional)', instruction: '' },
  { number: 5, name: 'Last Name (Optional)', instruction: '' },
  { number: 6, name: 'Business Name (Required if contact type is supplier or both)', instruction: '' },
  { number: 7, name: 'Contact ID (Optional)', instruction: 'Leave blank to auto generate Contact ID' },
  { number: 8, name: 'Tax number (Optional)', instruction: '' },
  { number: 9, name: 'Opening Balance (Optional)', instruction: '' },
  { number: 10, name: 'Pay term (Required if contact type is supplier or both)', instruction: '' },
  { number: 11, name: 'Pay term period (Required if contact type is supplier or both)', instruction: 'Available Options: days and months' },
  { number: 12, name: 'Credit Limit (Optional)', instruction: '' },
  { number: 13, name: 'Email (Optional)', instruction: '' },
  { number: 14, name: 'Mobile (Required)', instruction: '' },
  { number: 15, name: 'Alternate contact number (Optional)', instruction: '' },
  { number: 16, name: 'Landline (Optional)', instruction: '' },
  { number: 17, name: 'City (Optional)', instruction: '' },
  { number: 18, name: 'State (Optional)', instruction: '' },
  { number: 19, name: 'Country (Optional)', instruction: '' },
  { number: 20, name: 'Address line 1 (Optional)', instruction: '' },
  { number: 21, name: 'Address line 2 (Optional)', instruction: '' },
  { number: 22, name: 'Zip Code (Optional)', instruction: '' },
  { number: 23, name: 'Date of birth (Optional)', instruction: 'Format Y-m-d (2025-06-26)' },
];

export default function ImportContactsTab() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [importHistory] = useState<ImportHistory[]>(mockImportHistory);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setSelectedFile(null);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <X className="h-4 w-4 text-red-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="default" className="bg-green-500">
            Completed
          </Badge>
        );
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'processing':
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            Processing
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const stats = {
    totalImports: importHistory.length,
    completedImports: importHistory.filter((h) => h.status === 'completed').length,
    totalRecordsImported: importHistory.filter((h) => h.status === 'completed').reduce((sum, h) => sum + h.recordsSuccess, 0),
    failedImports: importHistory.filter((h) => h.status === 'failed').length,
  };

  // Define table columns
  const columns: TableColumn<ImportHistory>[] = [
    {
      accessorKey: "fileName",
      header: "File Name",
      sortable: true,
      filterable: true,
      cell: (value, item) => (
        <div className="flex items-center">
          {getStatusIcon(item.status)}
          <span className="ml-2 font-medium">{String(value)}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      sortable: true,
      filterable: true,
      cell: (value, item) => getStatusBadge(item.status),
    },
    {
      accessorKey: "recordsTotal",
      header: "Records",
      sortable: true,
      cell: (value) => (
        <div className="font-medium">{String(value)}</div>
      ),
    },
    {
      accessorKey: "recordsSuccess",
      header: "Success",
      sortable: true,
      cell: (value) => (
        <div className="font-medium text-green-600">{String(value)}</div>
      ),
    },
    {
      accessorKey: "recordsFailed",
      header: "Failed",
      sortable: true,
      cell: (value) => (
        <div className="font-medium text-red-600">{String(value)}</div>
      ),
    },
    {
      accessorKey: "importDate",
      header: "Date",
      sortable: true,
      cell: (value, item) => (
        <div>
          {new Date(item.importDate).toLocaleDateString()}&nsbp;
          {new Date(item.importDate).toLocaleTimeString()}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Imports</CardTitle>
            <Upload className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalImports}</div>
            <p className="text-muted-foreground text-xs">All time imports</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
            <CheckCircle2 className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedImports}</div>
            <p className="text-muted-foreground text-xs">{Math.round((stats.completedImports / stats.totalImports) * 100)}% success rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Records Imported</CardTitle>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRecordsImported}</div>
            <p className="text-muted-foreground text-xs">Total successful records</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Imports</CardTitle>
            <X className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.failedImports}</div>
            <p className="text-muted-foreground text-xs">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Import Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Import Contacts</CardTitle>
            <CardDescription>File To Import:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">Select File</Label>
              <Input 
                id="file" 
                type="file" 
                accept=".csv,.xlsx,.xls" 
                onChange={handleFileSelect} 
                disabled={isUploading} 
              />
              {selectedFile && (
                <p className="text-muted-foreground text-sm">
                  Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                </p>
              )}
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            <Button 
              onClick={handleImport} 
              disabled={!selectedFile || isUploading} 
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? 'Importing...' : 'Import Contacts'}
            </Button>

            <div className="pt-4">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
            <CardDescription>
              Follow the instructions carefully before importing the file. 
              The columns of the file should be in the following order.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important Requirements</AlertTitle>
              <AlertDescription>
                • CSV or Excel files only (.csv, .xlsx, .xls)
                <br />
                • Maximum file size: 10MB
                <br />
                • Follow the exact column order specified below
                <br />
                • Contact type and Mobile are required fields
              </AlertDescription>
            </Alert>

            <div className="overflow-auto max-h-96">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">S/N</TableHead>
                    <TableHead className="min-w-48">Column Name</TableHead>
                    <TableHead>Instruction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {columnInstructions.map((column) => (
                    <TableRow key={column.number}>
                      <TableCell className="font-medium">{column.number}</TableCell>
                      <TableCell className="font-medium">
                        {column.name}
                        {column.name.includes('Required') && (
                          <Badge variant="destructive" className="ml-2 text-xs">
                            Required
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {column.instruction || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Import History */}
      <Card>
        <CardHeader>
          <CardTitle>Import History</CardTitle>
          <CardDescription>View all previous import operations and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <DynamicTable
            data={importHistory}
            columns={columns}
            pageSize={100}
            searchPlaceholder="Search import history..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
