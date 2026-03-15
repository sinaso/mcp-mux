/**
 * Shared server icon component that handles both URL-based and emoji icons.
 *
 * Server definitions may have an `icon` field that is either:
 * - An HTTP(S) URL to an image (e.g., GitHub avatar)
 * - An emoji string (e.g., "📦")
 * - An object with `light` and `dark` URL/emoji variants
 * - null/undefined
 */

import { useState } from 'react';
import { useTheme } from '@/stores';
import type { ServerIcon as ServerIconType } from '@/types/registry';

interface ServerIconProps {
  icon: ServerIconType | null | undefined;
  /** CSS classes for the img element when rendering a URL icon */
  className?: string;
  /** Fallback emoji when icon is missing or fails to load (default: '📦') */
  fallback?: string;
}

function resolveIcon(icon: ServerIconType, theme: string): string {
  if (typeof icon === 'string') return icon;
  return theme === 'dark' ? icon.dark : icon.light;
}

export function ServerIcon({ icon, className = 'w-9 h-9 object-contain', fallback = '📦' }: ServerIconProps) {
  const [failed, setFailed] = useState(false);
  const theme = useTheme();

  if (!icon || failed) {
    return <span data-testid="server-icon-fallback">{fallback}</span>;
  }

  const resolved = resolveIcon(icon, theme);

  if (resolved.startsWith('http')) {
    return (
      <img
        src={resolved}
        alt=""
        className={className}
        data-testid="server-icon-img"
        onError={() => setFailed(true)}
      />
    );
  }

  return <span data-testid="server-icon-emoji">{resolved}</span>;
}
