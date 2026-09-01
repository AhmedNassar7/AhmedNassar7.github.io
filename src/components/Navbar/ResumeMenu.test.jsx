import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const downloadResume = vi.fn();
vi.mock('../../utils/resume', () => ({
  RESUME_URL: '/assets/PDFs/resume.pdf',
  RESUME_VIEW_URL: 'https://drive.example/view',
  RESUME_FILE_NAME: 'resume.pdf',
  downloadResume: () => downloadResume(),
}));
vi.mock('../../utils/analytics', () => ({ trackEvent: vi.fn() }));

import ResumeMenu from './ResumeMenu';

describe('ResumeMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.open = vi.fn();
  });

  it('is a single collapsed control until opened', () => {
    render(<ResumeMenu />);
    expect(
      screen.getByRole('button', { name: /résumé options/i }),
    ).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menuitem')).toBeNull();
  });

  it('opens a View / Download menu on click', () => {
    render(<ResumeMenu />);
    fireEvent.click(screen.getByRole('button', { name: /résumé options/i }));
    expect(screen.getByRole('menuitem', { name: /view/i })).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: /download/i }),
    ).toBeInTheDocument();
  });

  it('View opens the résumé in a new tab', () => {
    render(<ResumeMenu />);
    fireEvent.click(screen.getByRole('button', { name: /résumé options/i }));
    fireEvent.click(screen.getByRole('menuitem', { name: /view/i }));
    expect(window.open).toHaveBeenCalledWith(
      'https://drive.example/view',
      '_blank',
      'noopener,noreferrer',
    );
  });

  it('Download triggers the file download', () => {
    render(<ResumeMenu />);
    fireEvent.click(screen.getByRole('button', { name: /résumé options/i }));
    fireEvent.click(screen.getByRole('menuitem', { name: /download/i }));
    expect(downloadResume).toHaveBeenCalledTimes(1);
  });

  it('closes on Escape', async () => {
    render(<ResumeMenu />);
    fireEvent.click(screen.getByRole('button', { name: /résumé options/i }));
    expect(screen.getAllByRole('menuitem')).toHaveLength(2);
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() =>
      expect(screen.queryAllByRole('menuitem')).toHaveLength(0),
    );
  });
});
