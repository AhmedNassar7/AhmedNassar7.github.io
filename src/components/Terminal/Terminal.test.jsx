import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Terminal from './Terminal';

vi.mock('../../utils/analytics', () => ({ trackEvent: vi.fn() }));
vi.mock('react-scroll', () => ({ scroller: { scrollTo: vi.fn() } }));
vi.mock('../../utils/resume', () => ({ downloadResume: vi.fn() }));

const openTerminal = () => {
  fireEvent.click(screen.getByLabelText(/open interactive terminal/i));
};

describe('Terminal', () => {
  it('is closed by default', () => {
    render(<Terminal theme="light" toggleTheme={vi.fn()} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens on trigger click and shows the intro line', () => {
    render(<Terminal theme="light" toggleTheme={vi.fn()} />);

    openTerminal();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/type 'help'/i)).toBeInTheDocument();
  });

  it('runs the help command and prints the command list', () => {
    render(<Terminal theme="light" toggleTheme={vi.fn()} />);
    openTerminal();

    const input = screen.getByLabelText('Terminal command input');
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText('Available commands:')).toBeInTheDocument();
  });

  it('shows a "command not found" message for unknown input', () => {
    render(<Terminal theme="light" toggleTheme={vi.fn()} />);
    openTerminal();

    const input = screen.getByLabelText('Terminal command input');
    fireEvent.change(input, { target: { value: 'bogus' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText(/command not found: bogus/i)).toBeInTheDocument();
  });

  it('recalls the previous command with ArrowUp', () => {
    render(<Terminal theme="light" toggleTheme={vi.fn()} />);
    openTerminal();

    const input = screen.getByLabelText('Terminal command input');
    fireEvent.change(input, { target: { value: 'whoami' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input.value).toBe('whoami');
  });

  it('closes on Escape', async () => {
    render(<Terminal theme="light" toggleTheme={vi.fn()} />);
    openTerminal();
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });

    // Framer Motion keeps the dialog mounted during its exit transition, so
    // the unmount happens asynchronously after this point.
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
  });
});
