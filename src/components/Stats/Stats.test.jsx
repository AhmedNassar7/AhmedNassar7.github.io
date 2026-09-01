import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const trackEvent = vi.fn();
vi.mock('../../utils/analytics', () => ({
  trackEvent: (...a) => trackEvent(...a),
}));
// Heatmap does its own fetching — not under test here.
vi.mock('./GitHubHeatmap', () => ({ default: () => null }));

import Stats from './Stats';

describe('Stats — stat cards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Force the fallbacks so the cards render immediately without a network
    // round-trip.
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('offline'))),
    );
  });

  it('renders every stat as an external link to GitHub', () => {
    render(<Stats theme="light" />);

    const cards = document.querySelectorAll('a.stat-card-link');
    expect(cards).toHaveLength(4);
    cards.forEach((card) => {
      expect(card).toHaveAttribute('target', '_blank');
      expect(card).toHaveAttribute('rel', 'noopener noreferrer');
      expect(card.getAttribute('href')).toMatch(/github\.com/);
    });
  });

  it('tracks a click-through on a stat card', () => {
    render(<Stats theme="light" />);

    fireEvent.click(screen.getByLabelText("View Ahmed's commits on GitHub"));
    expect(trackEvent).toHaveBeenCalledWith('select_content', {
      content_type: 'stat_card',
      content_id: 'commits',
    });
  });
});
