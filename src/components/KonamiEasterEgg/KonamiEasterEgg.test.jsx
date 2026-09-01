import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const trackEvent = vi.fn();
vi.mock('../../utils/analytics', () => ({
  trackEvent: (...a) => trackEvent(...a),
}));

import KonamiEasterEgg from './KonamiEasterEgg';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const type = (keys) =>
  act(() => {
    keys.forEach((key) => fireEvent.keyDown(window, { key }));
  });

describe('KonamiEasterEgg', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows nothing until the code is entered', () => {
    render(<KonamiEasterEgg />);
    expect(screen.queryByText(/konami code/i)).toBeNull();
  });

  it('celebrates when the full sequence is typed', () => {
    render(<KonamiEasterEgg />);
    type(KONAMI);
    expect(screen.getByText(/you found the konami code/i)).toBeInTheDocument();
    expect(trackEvent).toHaveBeenCalledWith('easter_egg', {
      id: 'konami_code',
    });
  });

  it('recovers from a wrong key mid-sequence', () => {
    render(<KonamiEasterEgg />);
    type(['ArrowUp', 'ArrowUp', 'x']); // abort
    type(KONAMI); // clean run
    expect(screen.getByText(/you found the konami code/i)).toBeInTheDocument();
  });

  it('ignores the sequence while typing in a text field', () => {
    render(
      <>
        <input data-testid="field" />
        <KonamiEasterEgg />
      </>,
    );
    const field = screen.getByTestId('field');
    act(() => {
      KONAMI.forEach((key) => fireEvent.keyDown(field, { key }));
    });
    expect(screen.queryByText(/konami code/i)).toBeNull();
  });
});
