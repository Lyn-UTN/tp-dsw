'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type CalendarProps = {
  mode?: 'single' | 'range';
  selected?: Date | { from: Date; to?: Date };
  onSelect?: (date: Date | { from: Date; to?: Date } | undefined) => void;
  className?: string;
  disabled?: (date: Date) => boolean;
};

export function Calendar({
  mode = 'single',
  selected,
  onSelect,
  className = '',
  disabled,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const isDateSelected = (date: Date) => {
    if (!selected) return false;

    if (mode === 'single' && selected instanceof Date) {
      return (
        date.getDate() === selected.getDate() &&
        date.getMonth() === selected.getMonth() &&
        date.getFullYear() === selected.getFullYear()
      );
    }

    if (
      mode === 'range' &&
      typeof selected === 'object' &&
      'from' in selected
    ) {
      const { from, to } = selected;
      if (!to) {
        return (
          date.getDate() === from.getDate() &&
          date.getMonth() === from.getMonth() &&
          date.getFullYear() === from.getFullYear()
        );
      }
      return date >= from && date <= to;
    }

    return false;
  };

  const isDateInRange = (date: Date) => {
    if (
      mode !== 'range' ||
      !selected ||
      typeof selected !== 'object' ||
      !('from' in selected)
    ) {
      return false;
    }

    const { from, to } = selected;
    if (!to) return false;

    return date > from && date < to;
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (disabled && disabled(clickedDate)) return;

    if (mode === 'single') {
      onSelect?.(clickedDate);
    } else if (mode === 'range') {
      if (!selected || typeof selected !== 'object' || !('from' in selected)) {
        onSelect?.({ from: clickedDate });
      } else {
        const { from, to } = selected;
        if (!to) {
          if (clickedDate < from) {
            onSelect?.({ from: clickedDate, to: from });
          } else {
            onSelect?.({ from, to: clickedDate });
          }
        } else {
          onSelect?.({ from: clickedDate });
        }
      }
    }
  };

  const renderDays = () => {
    const days = [];
    const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
      const day = i - firstDayOfMonth + 1;
      const isValidDay = day > 0 && day <= daysInMonth;
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isSelected = isValidDay && isDateSelected(date);
      const isInRange = isValidDay && isDateInRange(date);
      const isDisabled = isValidDay && disabled && disabled(date);

      days.push(
        <button
          key={i}
          onClick={() => isValidDay && handleDateClick(day)}
          disabled={!isValidDay || isDisabled}
          className={`
            h-10 w-10 rounded-lg text-sm font-medium transition-colors
            ${!isValidDay ? 'invisible' : ''}
            ${
              isDisabled
                ? 'text-muted-foreground cursor-not-allowed opacity-50'
                : ''
            }
            ${
              isSelected && !isDisabled
                ? 'bg-primary text-primary-foreground hover:bg-primary-hover'
                : ''
            }
            ${isInRange && !isDisabled ? 'bg-primary/20' : ''}
            ${
              !isSelected && !isInRange && isValidDay && !isDisabled
                ? 'hover:bg-accent hover:text-accent-foreground'
                : ''
            }
          `}
        >
          {isValidDay ? day : ''}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={`p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={previousMonth}
          className="h-8 w-8 bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={nextMonth}
          className="h-8 w-8 bg-transparent"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="h-10 w-10 flex items-center justify-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
    </div>
  );
}
