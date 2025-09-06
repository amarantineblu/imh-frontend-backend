<?php

namespace Database\Seeders;

use App\PosTransaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PosTransactionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
          [
            'id' => 'TXN-001',
            'date' => '2024-01-15',
            'tallyNo' => 'T001',
            'customerName' => 'John Smith',
            'contactNumber' => '+1-555-0123',
            'location' => 'New York Store',
            'paymentStatus' => 'Paid',
            'paymentMethod' => 'Cash',
            'totalAmount' => '125.50',
            'totalPaid' => '125.50',
            'sellDue' => '0',
            'sellReturnDue' => '0',
            'shippingStatus' => 'Delivered',
            'totalItems' => '5',
            'addedBy' => 'Jane Doe',
            'sellNote' => 'Regular customer',
            'staffNote' => 'No special instructions',
            'shippingDetails' => 'Express delivery',
          ],
          [
            'id' => 'TXN-002',
            'date' => '2024-01-15',
            'tallyNo' => 'T002',
            'customerName' => 'Sarah Johnson',
            'contactNumber' => '+1-555-0456',
            'location' => 'Downtown Store',
            'paymentStatus' => 'Partial',
            'paymentMethod' => 'Card',
            'totalAmount' => '89.99',
            'totalPaid' => '50.00',
            'sellDue' => '39.99',
            'sellReturnDue' => '0',
            'shippingStatus' => 'Pending',
            'totalItems' => '3',
            'addedBy' => 'Mike Wilson',
            'sellNote' => 'Bulk order discount applied',
            'staffNote' => 'Customer requested delayed payment',
            'shippingDetails' => 'Standard shipping',
           ],
          [
            'id' => 'TXN-003',
            'date' => '2024-01-15',
            'tallyNo' => 'T003',
            'customerName' => 'Walk-in Customer',
            'contactNumber' => 'N/A',
            'location' => 'Main Store',
            'paymentStatus' => 'Paid',
            'paymentMethod' => 'Cash',
            'totalAmount' => '45.00',
            'totalPaid' => '45.00',
            'sellDue' => '0',
            'sellReturnDue' => '0',
            'shippingStatus' => 'Not Applicable',
            'totalItems' => '2',
            'addedBy' => 'John Smith',
            'sellNote' => 'Cash sale',
            'staffNote' => '',
            'shippingDetails' => 'In-store pickup',
           ],
          [
            'id' => 'TXN-004',
            'date' => '2024-01-15',
            'tallyNo' => 'T004',
            'customerName' => 'Mike Wilson',
            'contactNumber' => '+1-555-0789',
            'location' => 'West Side Store',
            'paymentStatus' => 'Refunded',
            'paymentMethod' => 'Card',
            'totalAmount' => '234.75',
            'totalPaid' => '234.75',
            'sellDue' => '0',
            'sellReturnDue' => '234.75',
            'shippingStatus' => 'Returned',
            'totalItems' => '7',
            'addedBy' => 'Jane Doe',
            'sellNote' => 'Customer not satisfied',
            'staffNote' => 'Process refund immediately',
            'shippingDetails' => 'Return shipping',
           ],
          ];
          DB::table('pos_transactions')->truncate();
          DB::table('pos_transactions')->insert($data);

          // PosTransaction::truncate();
          // PosTransaction::insert($data);
   
    }
}
