'use client';

import { Calendar, MoreHorizontal, Search } from 'lucide-react';
import * as React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartTooltip } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from './ui/button';

// Generate more realistic sales data with smoother curves
const generateSalesData = () => {
  const data = [];
  const baseValue = 2500000; // 2.5M base
  const dates = [];

  // Generate dates for the last 90 days
  for (let i = 89; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date);
  }

  dates.forEach((date, index) => {
    // Create wave-like pattern with some randomness
    const wave1 = Math.sin((index / 30) * Math.PI) * 800000;
    const wave2 = Math.cos((index / 15) * Math.PI) * 400000;
    const noise = (Math.random() - 0.5) * 200000;
    const trend = (index / dates.length) * 600000; // Upward trend

    const salesValue = Math.max(500000, baseValue + wave1 + wave2 + noise + trend);

    data.push({
      date: date.toISOString().split('T')[0],
      sales: Math.round(salesValue),
      dayLabel: date.getDate(),
    });
  });

  return data;
};

const chartData = generateSalesData();

const chartConfig = {
  sales: {
    label: 'Sales (NGN)',
    color: 'hsl(239, 84%, 67%)',
  },
} satisfies ChartConfig;

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
};

const formatTooltipCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function SalesAreaChart() {
  const [timeRange, setTimeRange] = React.useState('90d');
  const [currentMonth, setCurrentMonth] = React.useState('May 2025');

  const filteredData = React.useMemo(() => {
    let daysToShow = 90;
    if (timeRange === '30d') daysToShow = 30;
    else if (timeRange === '7d') daysToShow = 7;

    return chartData.slice(-daysToShow);
  }, [timeRange]);

  const totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0);
  const avgDailySales = totalSales / filteredData.length;

  return (
    <div className="mx-auto min-h-screen w-full bg-transparent py-10">
      <Card className="border-0 bg-white shadow-2xl backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <CardTitle className="mb-1 text-2xl font-bold text-gray-900">Sales</CardTitle>
                <CardDescription className="text-sm text-gray-500">Last 90 days</CardDescription>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 md:flex-row">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, amount, quantity..."
                  className="w-64 rounded-lg border border-gray-200 bg-white/70 py-2 pr-4 pl-10 text-sm backdrop-blur-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex w-full items-center gap-3">
                <Select value={currentMonth} onValueChange={setCurrentMonth}>
                  <SelectTrigger className="w-full flex-1 border-gray-200 bg-white/70 backdrop-blur-sm md:w-40">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="May 2025">
                      <small>May 2025</small>
                    </SelectItem>
                    <SelectItem value="Apr 2025">
                      <small>Apr 2025</small>
                    </SelectItem>
                    <SelectItem value="Mar 2025">
                      <small>Mar 2025</small>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button size="icon" variant="ghost" className="rounded-md">
                  <MoreHorizontal className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-4 flex flex-col gap-6 text-sm text-gray-600 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <span>Total Sales:</span>
              <span className="font-semibold text-gray-900">{formatTooltipCurrency(totalSales)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Daily Average:</span>
              <span className="font-semibold text-gray-900">{formatTooltipCurrency(avgDailySales)}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {[
              { value: '7d', label: 'Last 7 days' },
              { value: '30d', label: 'Last 30 days' },
              { value: '90d', label: 'Last 90 days' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setTimeRange(option.value)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  timeRange === option.value ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(239, 84%, 67%)" stopOpacity={0.3} />
                    <stop offset="50%" stopColor="hsl(239, 84%, 67%)" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="hsl(239, 84%, 67%)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={true} vertical={false} />

                <XAxis
                  dataKey="dayLabel"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickMargin={16}
                  interval="preserveStartEnd"
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={formatCurrency}
                  domain={['dataMin - 200000', 'dataMax + 200000']}
                  tickMargin={12}
                />

                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload || !payload.length) return null;

                    const data = payload[0].payload;
                    const date = new Date(data.date);

                    return (
                      <div className="rounded-lg border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur-sm">
                        <p className="mb-1 text-sm text-gray-600">
                          {date.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                        <p className="text-lg font-semibold text-gray-900">{formatTooltipCurrency(data.sales)}</p>
                      </div>
                    );
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="hsl(239, 84%, 67%)"
                  strokeWidth={3}
                  fill="url(#salesGradient)"
                  dot={false}
                  activeDot={{
                    r: 6,
                    stroke: 'hsl(239, 84%, 67%)',
                    strokeWidth: 3,
                    fill: 'white',
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
