import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Quotes from './Quotes';

describe('Quotes', () => {
  it('renders the pagination dots as real, labeled buttons (keyboard accessible)', () => {
    render(<Quotes />);

    const dot = screen.getByLabelText('Go to quote 2');
    expect(dot.tagName).toBe('BUTTON');
  });

  it('switches quotes when a pagination dot is clicked', () => {
    render(<Quotes />);

    const firstText = screen.getByText(
      "Programming is not about typing, it's about thinking.",
    );
    expect(firstText).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Go to quote 2'));

    expect(
      screen.getByText('Make it work, make it right, make it fast.'),
    ).toBeInTheDocument();
  });

  it('marks the active dot with aria-current', () => {
    render(<Quotes />);

    expect(screen.getByLabelText('Go to quote 1')).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(screen.getByLabelText('Go to quote 2')).toHaveAttribute(
      'aria-current',
      'false',
    );
  });
});
