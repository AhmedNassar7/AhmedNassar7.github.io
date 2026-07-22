import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Testimonials from './Testimonials';

describe('Testimonials', () => {
  it('renders the pagination dots as real, labeled buttons (keyboard accessible)', () => {
    render(<Testimonials />);

    const dot = screen.getByLabelText('Go to testimonial 2');
    expect(dot.tagName).toBe('BUTTON');
  });

  it('switches testimonials when a pagination dot is clicked', async () => {
    render(<Testimonials />);

    expect(screen.getByText('Mahmoud Sakr')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Go to testimonial 2'));

    // AnimatePresence exits the old testimonial before mounting the new one.
    await waitFor(() =>
      expect(screen.getByText('Hassan ELDash')).toBeInTheDocument(),
    );
  });

  it('marks the active dot with aria-current', () => {
    render(<Testimonials />);

    expect(screen.getByLabelText('Go to testimonial 1')).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(screen.getByLabelText('Go to testimonial 2')).toHaveAttribute(
      'aria-current',
      'false',
    );
  });
});
