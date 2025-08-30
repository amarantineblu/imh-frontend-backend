import type { ColorClasses, IMetricCard } from '@/types';
import { TrendingDown, TrendingUp } from 'lucide-react';

export default function MetricCard({ title, value, icon: Icon, currency = '', color = 'blue', trend, trendValue, size = 'default' }: IMetricCard) {
  const colorClasses: ColorClasses = {
    blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-700',
    green: 'from-green-50 to-green-100 border-green-200 text-green-700',
    purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-700',
    orange: 'from-orange-50 to-orange-100 border-orange-200 text-orange-700',
    red: 'from-red-50 to-red-100 border-red-200 text-red-700',
    gray: 'from-gray-50 to-gray-100 border-gray-200 text-gray-700',
  };

  const iconColorClasses: ColorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    gray: 'bg-gray-500',
  };

  const sizeClasses = {
    small: 'p-4',
    default: 'p-6',
    large: 'p-8',
  };

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-xl border bg-gradient-to-br transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${colorClasses[color as keyof ColorClasses]} ${sizeClasses[size as keyof typeof sizeClasses]} `}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 transform opacity-5">
        <div className="h-full w-full rounded-full bg-current" />
      </div>

      <div className="relative z-10">
        {/* Header with icon */}
        <div className="mb-4 flex items-center justify-between">
          <div
            className={`h-12 w-12 rounded-lg ${iconColorClasses[color as keyof ColorClasses]} flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>

          {trend && (
            <div
              className={`flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium ${trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} `}
            >
              {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {trendValue && <span>{trendValue}</span>}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-2 text-sm leading-tight font-medium text-gray-600">{title}</h3>

        {/* Value */}
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl leading-none font-bold text-gray-900">{formatValue(value)}</span>
          {currency && <span className="ml-1 text-sm font-medium text-gray-500">{currency}</span>}
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
    </div>
  );
}
