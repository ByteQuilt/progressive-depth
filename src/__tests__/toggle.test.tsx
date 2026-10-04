import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ProgressiveDepthProvider } from '../index';

function renderToggle(defaultMode: 'canopy' | 'standard' | 'deep' = 'deep') {
  render(
    <ProgressiveDepthProvider defaultMode={defaultMode}>
      <p>Content</p>
    </ProgressiveDepthProvider>
  );
  return screen.getAllByRole('radio');
}

describe('ReadingModeToggle keyboard support (ARIA radio group pattern)', () => {
  it('renders the radio group on a div, because a nav cannot take the radiogroup role', () => {
    renderToggle();
    expect(screen.getByRole('radiogroup').tagName).toBe('DIV');
  });

  it('puts only the checked radio in the tab order', () => {
    const radios = renderToggle('standard');
    expect(radios.map((radio) => radio.tabIndex)).toEqual([-1, 0, -1]);
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
  });

  it('moves selection and focus with the arrow keys, wrapping at both ends', async () => {
    const user = userEvent.setup();
    const radios = renderToggle('deep');

    await user.tab();
    expect(radios[2]).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(radios[0]).toHaveFocus();
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');

    await user.keyboard('{ArrowLeft}');
    expect(radios[2]).toHaveFocus();
    expect(radios[2]).toHaveAttribute('aria-checked', 'true');

    await user.keyboard('{ArrowUp}');
    expect(radios[1]).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(radios[2]).toHaveFocus();
  });

  it('jumps to the first and last modes with Home and End', async () => {
    const user = userEvent.setup();
    const radios = renderToggle('standard');

    await user.tab();
    await user.keyboard('{Home}');
    expect(radios[0]).toHaveFocus();
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');

    await user.keyboard('{End}');
    expect(radios[2]).toHaveFocus();
    expect(radios[2]).toHaveAttribute('aria-checked', 'true');
  });
});
