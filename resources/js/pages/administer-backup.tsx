import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicTable, type TableColumn } from '@/components/ui/dynamic-table';
import { useTableActions } from '@/hooks/use-table-actions';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { AlertCircle, Clock, Database, Download, Settings, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'System',
    href: '/system',
  },
  {
    title: 'Administer Backup',
    href: '/system/backup',
  },
];

interface BackupFile extends Record<string, unknown> {
  id: string;
  file: string;
  size: string;
  date: string;
  age: string;
}

const mockBackupFiles: BackupFile[] = [
  {
    id: '1',
    file: '2023-06-26-18-56-10.zip',
    size: '295.27kB',
    date: '2023-06-26 18:56:13',
    age: '2 years before',
  },
  {
    id: '2',
    file: '2024-12-15-09-30-45.zip',
    size: '1.2MB',
    date: '2024-12-15 09:30:45',
    age: '3 weeks before',
  },
  {
    id: '3',
    file: '2025-01-02-14-22-18.zip',
    size: '874.56kB',
    date: '2025-01-02 14:22:18',
    age: '1 week before',
  },
];

export default function AdministerBackup() {
  const [backupFiles, setBackupFiles] = useState<BackupFile[]>(mockBackupFiles);
  const [isCreating, setIsCreating] = useState(false);

  const createNewBackup = () => {
    setIsCreating(true);
    
    // Simulate backup creation
    setTimeout(() => {
      const newBackup: BackupFile = {
        id: String(Date.now()),
        file: `backup-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.zip`,
        size: '450.12kB',
        date: new Date().toLocaleString('en-CA', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        }).replace(',', ''),
        age: 'Just now',
      };
      
      setBackupFiles(prev => [newBackup, ...prev]);
      setIsCreating(false);
      alert('New backup created successfully!');
    }, 2000);
  };

  const downloadBackup = (backup: BackupFile) => {
    alert(`Downloading ${backup.file}...`);
  };

  const deleteBackup = (backupId: string) => {
    if (confirm('Are you sure you want to delete this backup?')) {
      setBackupFiles(prev => prev.filter(backup => backup.id !== backupId));
      alert('Backup deleted successfully.');
    }
  };

  // Setup table actions for backup files
  const { rowActions } = useTableActions<BackupFile>({
    customActions: [
      {
        label: "Download",
        icon: Download,
        onClick: (file: BackupFile) => {
          downloadBackup(file);
        },
        variant: "ghost",
      },
      {
        label: "Delete",
        icon: Trash2,
        onClick: (file: BackupFile) => {
          deleteBackup(file.id);
        },
        className: "text-destructive hover:text-destructive",
      },
    ],
  });

  // Define backup files table columns
  const backupColumns: TableColumn<BackupFile>[] = [
    {
      accessorKey: "file",
      header: "File",
      sortable: true,
      filterable: true,
      cell: (value) => (
        <div className="font-medium text-blue-600">
          {String(value)}
        </div>
      ),
    },
    {
      accessorKey: "size",
      header: "Size",
      sortable: true,
    },
    {
      accessorKey: "date",
      header: "Date",
      sortable: true,
    },
    {
      accessorKey: "age",
      header: "Age",
      sortable: true,
    },
    {
      type: "actions",
      header: "Actions",
      buttons: rowActions,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Administer Backup" />

      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Administer Backup</h1>
          <p className="text-muted-foreground">Manage system backup files and create new backups.</p>
        </div>

        {/* Create New Backup Button */}
        <div className="mb-6">
          <Button 
            onClick={createNewBackup} 
            disabled={isCreating}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isCreating ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Creating Backup...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Create New Backup
              </>
            )}
          </Button>
        </div>

        {/* Backup Files Table */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <DynamicTable
              data={backupFiles}
              columns={backupColumns}
              enableRowSelection={false}
              enableSorting={true}
              enableFiltering={true}
              enableColumnVisibility={true}
              enableExport={true}
              exportFilename="backup-files"
              exportTitle="Backup Files"
              searchPlaceholder="Search backup files..."
              pageSize={100}
              emptyMessage="No backup files available"
            />
          </CardContent>
        </Card>

        {/* Cron Job Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Cron Job Setup
            </CardTitle>
            <CardDescription>
              Configure automated backup and cleanup processes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Auto Backup Setup</AlertTitle>
              <AlertDescription>
                To enable auto backup you must setup a cron job with this command:
              </AlertDescription>
            </Alert>
            <div className="p-3 rounded-md">
              <code className="text-sm">
                * * * * * /opt/alt/php81/usr/bin/php-cgi /home/ibiyeomi/public_html/artisan schedule:run &gt;&gt; /dev/null 2&gt;&amp;1
              </code>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Backup Cleanup Setup</AlertTitle>
              <AlertDescription>
                To clean up old backup you must setup a cron job with this command:
              </AlertDescription>
            </Alert>
            <div className="p-3 rounded-md">
              <code className="text-sm">
                * * * * * /opt/alt/php81/usr/bin/php-cgi /home/ibiyeomi/public_html/artisan backup:clean &gt;&gt; /dev/null 2&gt;&amp;1
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
