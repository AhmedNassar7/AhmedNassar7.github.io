import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CommandPalette from './CommandPalette';

vi.mock('../../utils/analytics', () => ({ trackEvent: vi.fn() }));
vi.mock('react-scroll', () => ({ scroller: { scrollTo: vi.fn() } }));

describe('CommandPalette', () => {
  it('is closed by default and shows a trigger button', () => {
    render(<CommandPalette theme="light" toggleTheme={vi.fn()} />);

    expect(screen.getByLabelText(/open command palette/i)).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens when the trigger is clicked and shows the command list', () => {
    render(<CommandPalette theme="light" toggleTheme={vi.fn()} />);

    fireEvent.click(screen.getByLabelText(/open command palette/i));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Go to Contact')).toBeInTheDocument();
  });

  it('filters commands as the user types', () => {
    render(<CommandPalette theme="light" toggleTheme={vi.fn()} />);
    fireEvent.click(screen.getByLabelText(/open command palette/i));

    fireEvent.change(screen.getByLabelText('Search commands'), {
      target: { value: 'contact' },
    });

    expect(screen.getByText('Go to Contact')).toBeInTheDocument();
    expect(screen.queryByText('Go to Home')).not.toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    render(<CommandPalette theme="light" toggleTheme={vi.fn()} />);
    fireEvent.click(screen.getByLabelText(/open command palette/i));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });

    // Framer Motion keeps the dialog mounted during its exit transition, so
    // the unmount happens asynchronously after this point.
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
  });

  it('calls toggleTheme when the theme command is run', () => {
    const toggleTheme = vi.fn();
    render(<CommandPalette theme="light" toggleTheme={toggleTheme} />);
    fireEvent.click(screen.getByLabelText(/open command palette/i));

    fireEvent.click(screen.getByText('Switch to Dark Theme'));

    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
