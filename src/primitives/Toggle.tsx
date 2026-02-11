import React from 'react';
import { useToggle } from '../core/hooks/useToggle';
import type { TogglePrimitiveProps } from '../core/types';

/**
 * Headless toggle primitive using children-as-function pattern.
 *
 * Renders nothing itself. Passes the full toggle API to its child
 * function, which decides what to render.
 *
 * @example
 * ```tsx
 * <Toggle>
 *   {({ modes, getModeProps, getToggleProps }) => (
 *     <nav {...getToggleProps()}>
 *       {modes.map(m => (
 *         <button key={m} {...getModeProps(m)}>{m}</button>
 *       ))}
 *     </nav>
 *   )}
 * </Toggle>
 * ```
 */
export function Toggle({ children, labels }: TogglePrimitiveProps) {
  const toggle = useToggle({ labels });
  return <>{children(toggle)}</>;
}
