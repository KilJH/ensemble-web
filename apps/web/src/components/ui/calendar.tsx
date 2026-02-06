'use client';

import { DayPicker, type DayPickerProps } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

export type CalendarProps = DayPickerProps;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={ko}
      className={`p-3 ${className || ''}`}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium text-text',
        nav: 'space-x-1 flex items-center',
        nav_button:
          'h-7 w-7 bg-transparent p-0 text-text-muted hover:text-text hover:bg-surface-2 rounded-md transition-colors inline-flex items-center justify-center focus-ring',
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-text-muted rounded-md w-9 font-normal text-xs',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
        day: 'h-9 w-9 p-0 font-normal inline-flex items-center justify-center rounded-md transition-colors hover:bg-surface-2 focus-ring aria-selected:opacity-100',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary-hover focus:bg-primary-hover',
        day_today: 'bg-surface-2 text-text',
        day_outside:
          'text-text-subtle opacity-50 aria-selected:bg-primary-muted aria-selected:text-text-muted',
        day_disabled: 'text-text-subtle opacity-50',
        day_range_middle: 'aria-selected:bg-primary-muted aria-selected:text-text',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === 'left' ? <ChevronLeftIcon size={16} /> : <ChevronRightIcon size={16} />,
      }}
      {...props}
    />
  );
}

/* Date Picker with Popover */
import { useState } from 'react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { CalendarIcon } from './icons';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = '날짜 선택',
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          disabled={disabled}
          className={`
            w-full justify-start text-left font-normal
            border border-border hover:bg-surface-2
            ${!value ? 'text-text-muted' : ''}
          `}
        >
          <CalendarIcon size={16} className="mr-2" />
          {value ? format(value, 'yyyy년 M월 d일') : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange?.(date);
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

/* Date Range Picker */
import type { DateRange } from 'react-day-picker';

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = '기간 선택',
  disabled = false,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);

  const formatRange = (range: DateRange | undefined) => {
    if (!range?.from) return placeholder;
    if (!range.to) return format(range.from, 'yyyy년 M월 d일');
    return `${format(range.from, 'yyyy년 M월 d일')} - ${format(range.to, 'yyyy년 M월 d일')}`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          disabled={disabled}
          className={`
            w-full justify-start text-left font-normal
            border border-border hover:bg-surface-2
            ${!value?.from ? 'text-text-muted' : ''}
          `}
        >
          <CalendarIcon size={16} className="mr-2" />
          {formatRange(value)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
