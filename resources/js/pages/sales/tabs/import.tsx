import React, { useState } from 'react';

export default function Import() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const importableFields = [
        { field: 'Invoice No.', instruction: '' },
        { field: 'Customer name', instruction: '' },
        { field: 'Customer Phone number', instruction: 'Either customer email id or phone number required' },
        { field: 'Customer Email', instruction: 'Either customer email id or phone number required' },
        { field: 'Sale Date', instruction: 'Sale date time format should be "Y-m-d H:i:s" (2020-07-15 17:45:32)' },
        { field: 'Product Name', instruction: 'Either product name (for single and combo only) or product sku required' },
        { field: 'Product SKU', instruction: 'Either product name (for single and combo only) or product sku required' },
        { field: 'Quantity', instruction: 'Required' },
        { field: 'Product Unit', instruction: '' },
        { field: 'Unit Price', instruction: '' },
        { field: 'Item Tax', instruction: '' },
        { field: 'Item Discount', instruction: '' },
        { field: 'Item Description', instruction: '' },
        { field: 'Order Total', instruction: '' },
    ];

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold">Import Sales</h1>

            <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">File To Import:</label>
                <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>

            <div className="mb-6">
                <h2 className="mb-3 text-lg font-semibold">Instructions</h2>
                <ol className="list-inside list-decimal space-y-1 text-sm">
                    <li>Upload sales data in excel format</li>
                    <li>Choose business location and column by which sell lines will be grouped</li>
                    <li>Choose respective sales fields for each column</li>
                </ol>
            </div>

            <div className="mb-6">
                <h2 className="mb-3 text-lg font-semibold">Importable Fields</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="border-b px-4 py-2 text-left">Importable fields</th>
                                <th className="border-b px-4 py-2 text-left">Instructions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {importableFields.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2">{item.field}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">{item.instruction}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h2 className="mb-3 text-lg font-semibold">Imports</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="border-b px-4 py-2 text-left">Import batch</th>
                                <th className="border-b px-4 py-2 text-left">Import time</th>
                                <th className="border-b px-4 py-2 text-left">Created By</th>
                                <th className="border-b px-4 py-2 text-left">Invoices</th>
                                <th className="border-b px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-8 text-center text-gray-500" colSpan={5}>
                                    No imports yet
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
