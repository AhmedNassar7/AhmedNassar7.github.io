import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders the theme toggle and nav links', () => {
    render(<Navbar theme="light" toggleTheme={vi.fn()} />);

    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Resume')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});
