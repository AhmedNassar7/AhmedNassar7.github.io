import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CookieConsent from './CookieConsent';

describe('CookieConsent', () => {
  it('renders nothing when not visible', () => {
    render(
      <CookieConsent visible={false} onAccept={vi.fn()} onDecline={vi.fn()} />,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders the banner and both actions when visible', () => {
    render(
      <CookieConsent visible={true} onAccept={vi.fn()} onDecline={vi.fn()} />,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Accept')).toBeInTheDocument();
    expect(screen.getByText('Decline')).toBeInTheDocument();
  });

  it('calls onAccept when Accept is clicked', () => {
    const onAccept = vi.fn();
    render(
      <CookieConsent visible={true} onAccept={onAccept} onDecline={vi.fn()} />,
    );

    fireEvent.click(screen.getByText('Accept'));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  it('calls onDecline when Decline is clicked', () => {
    const onDecline = vi.fn();
    render(
      <CookieConsent visible={true} onAccept={vi.fn()} onDecline={onDecline} />,
    );

    fireEvent.click(screen.getByText('Decline'));
    expect(onDecline).toHaveBeenCalledTimes(1);
  });
});
