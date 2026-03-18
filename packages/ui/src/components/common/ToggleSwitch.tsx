import { ToggleLeft, ToggleRight } from 'lucide-react';
import { cn } from '../../lib/cn';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
  title?: string;
  'data-testid'?: string;
}

export function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
  indeterminate = false,
  className,
  title,
  'data-testid': testId,
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onChange(); }}
      disabled={disabled}
      title={title}
      data-testid={testId}
      className={cn(
        'p-1 rounded-md transition-colors hover:bg-[rgb(var(--background))] flex-shrink-0',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {checked ? (
        <ToggleRight className="h-5 w-5 text-primary-500" />
      ) : indeterminate ? (
        <ToggleLeft className="h-5 w-5 text-amber-500" />
      ) : (
        <ToggleLeft className="h-5 w-5 text-[rgb(var(--muted))]" />
      )}
    </button>
  );
}
