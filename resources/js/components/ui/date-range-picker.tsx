import { useState } from 'react';
import { Input } from './input';

export interface DateRange {
  from?: string;
  to?: string;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (value: DateRange) => void;
  placeholder?: string;
}

export function DateRangePicker({ value, onChange, placeholder }: DateRangePickerProps) {
  const [from, setFrom] = useState(value.from || '');
  const [to, setTo] = useState(value.to || '');

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value);
    onChange({ from: e.target.value, to });
  };
  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTo(e.target.value);
    onChange({ from, to: e.target.value });
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="date"
        value={from}
        onChange={handleFromChange}
        placeholder={placeholder ? `${placeholder} (from)` : 'From'}
      />
      <span>-</span>
      <Input
        type="date"
        value={to}
        onChange={handleToChange}
        placeholder={placeholder ? `${placeholder} (to)` : 'To'}
      />
    </div>
  );
}
