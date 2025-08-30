import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface ExportColumn {
  key: string;
  header: string;
  accessor?: (data: unknown) => unknown;
}

export interface ExportOptions {
  filename?: string;
  title?: string;
  columns: ExportColumn[];
  data: Record<string, unknown>[];
}

// Helper function to format cell value for export
const formatCellValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  
  return String(value);
};

// Extract data for export based on columns
const extractDataForExport = (data: Record<string, unknown>[], columns: ExportColumn[]) => {
  return data.map(row => {
    const exportRow: Record<string, unknown> = {};
    columns.forEach(column => {
      const value = column.accessor ? column.accessor(row) : row[column.key];
      exportRow[column.header] = formatCellValue(value);
    });
    return exportRow;
  });
};

// Export to CSV
export const exportToCSV = ({ filename = 'export', columns, data }: ExportOptions) => {
  const exportData = extractDataForExport(data, columns);
  
  // Create CSV content
  const headers = columns.map(col => col.header);
  const csvContent = [
    headers.join(','),
    ...exportData.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape quotes and wrap in quotes if contains comma, quote, or newline
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Download CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export to Excel
export const exportToExcel = ({ filename = 'export', columns, data, title }: ExportOptions) => {
  const exportData = extractDataForExport(data, columns);
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  
  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(exportData);
  
  // Add title if provided
  if (title) {
    XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: 'A1' });
    XLSX.utils.sheet_add_json(ws, exportData, { origin: 'A3', skipHeader: false });
  }
  
  // Auto-size columns
  const colWidths = columns.map(col => ({ wch: Math.max(col.header.length, 15) }));
  ws['!cols'] = colWidths;
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  // Save file
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

// Export to PDF
export const exportToPDF = ({ filename = 'export', columns, data, title }: ExportOptions) => {
  const exportData = extractDataForExport(data, columns);
  
  // Create PDF
  const doc = new jsPDF();
  
  // Add title
  if (title) {
    doc.setFontSize(16);
    doc.text(title, 14, 22);
  }
  
  // Prepare table data
  const headers = columns.map(col => col.header);
  const rows = exportData.map(row => headers.map(header => String(row[header] || '')));
  
  // Add table
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: title ? 30 : 20,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [66, 139, 202],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { top: 20, right: 14, bottom: 20, left: 14 },
    theme: 'grid',
  });
  
  // Save PDF
  doc.save(`${filename}.pdf`);
};

// Print table
export const printTable = ({ columns, data, title }: ExportOptions) => {
  const exportData = extractDataForExport(data, columns);
  
  // Create print content
  const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title || 'Table Export'}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          color: #333;
        }
        h1 {
          color: #2c3e50;
          margin-bottom: 20px;
          font-size: 24px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #428bca;
          color: white;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        tr:hover {
          background-color: #f5f5f5;
        }
        @media print {
          body { margin: 0; }
          table { page-break-inside: auto; }
          tr { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      ${title ? `<h1>${title}</h1>` : ''}
      <table>
        <thead>
          <tr>
            ${columns.map(col => `<th>${col.header}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${exportData.map(row => `
            <tr>
              ${columns.map(col => `<td>${row[col.header]}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;
  
  // Open print window
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  }
};
