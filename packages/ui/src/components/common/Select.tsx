import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  isActive?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function Select({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  isActive,
  className,
  'data-testid': testId,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const active = isActive ?? (!!value && value !== options[0]?.value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen((v) => !v)}
        disabled={disabled}
        data-testid={testId}
        className={cn(
          'flex w-full items-center justify-between gap-2 bg-[rgb(var(--surface-hover))] border rounded-lg pl-3 pr-8 py-1.5 text-sm text-left focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
          active
            ? 'border-[rgb(var(--primary))] text-[rgb(var(--foreground))]'
            : 'border-[rgb(var(--border-subtle))] text-[rgb(var(--muted))]',
          selectedOption && !active && 'text-[rgb(var(--foreground))]'
        )}
      >
        <span className="truncate">{selectedOption?.label ?? placeholder ?? 'Select...'}</span>
      </button>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-[rgb(var(--muted))]" />

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-full min-w-max py-1 bg-[rgb(var(--surface-elevated))] border border-[rgb(var(--border))] rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-[rgb(var(--foreground))] hover:bg-[rgb(var(--surface-hover))] transition-colors"
            >
              <span>{option.label}</span>
              {option.value === value && (
                <Check className="h-3.5 w-3.5 flex-shrink-0 text-[rgb(var(--primary))]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
