import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// A tiny in-memory stand-in for the Realtime Database counter.
const state = { total: 0, listeners: new Set() };

vi.mock('../../firebase', () => ({
  isFirebaseReady: true,
  subscribeToLikes: (cb) => {
    state.listeners.add(cb);
    cb(state.total);
    return () => state.listeners.delete(cb);
  },
  addLikes: vi.fn(async (amount) => {
    state.total += amount;
    // runTransaction echoes the new value to listeners before it resolves.
    state.listeners.forEach((cb) => cb(state.total));
    return state.total;
  }),
}));

vi.mock('../../utils/analytics', () => ({ trackEvent: vi.fn() }));

import LikeButton from './LikeButton';
import { addLikes } from '../../firebase';

const srText = () => screen.getByRole('status').textContent;

// Wait for the one-time intro count-up to settle on the real total.
const waitForCount = (text) =>
  waitFor(() => expect(srText()).toMatch(text), { timeout: 4000 });

describe('LikeButton', () => {
  beforeEach(() => {
    state.total = 1200;
    state.listeners.clear();
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders a real button labelled for liking the site', () => {
    render(<LikeButton />);
    const button = screen.getByRole('button', { name: /like this site/i });
    expect(button.tagName).toBe('BUTTON');
  });

  it('exposes the live like count to assistive tech', async () => {
    render(<LikeButton />);
    await waitForCount(/1,200 likes/);
  });

  it('optimistically bumps the count on click and batches one write', async () => {
    render(<LikeButton />);
    await waitForCount(/1,200 likes/);
    const button = screen.getByRole('button', { name: /like this site/i });

    act(() => {
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
    });

    // Shown immediately, before any network write.
    expect(srText()).toMatch(/1,203 likes/);
    expect(addLikes).not.toHaveBeenCalled();

    // Three taps collapse into a single increment of 3 after the debounce.
    await waitFor(() => expect(addLikes).toHaveBeenCalledTimes(1), {
      timeout: 4000,
    });
    expect(addLikes).toHaveBeenCalledWith(3);
    await waitForCount(/1,203 likes/);
  });

  it('stops counting once the per-visitor cap is reached', async () => {
    render(<LikeButton />);
    await waitForCount(/1,200 likes/);
    const button = screen.getByRole('button');

    act(() => {
      for (let i = 0; i < 60; i += 1) fireEvent.click(button);
    });

    // Capped at +50 over the starting 1200 no matter how many clicks.
    expect(srText()).toMatch(/1,250 likes/);

    await waitFor(() => expect(addLikes).toHaveBeenCalledWith(50), {
      timeout: 4000,
    });
  });

  it('remembers a returning visitor who already maxed out', () => {
    localStorage.setItem('likes:contributed', '50');
    render(<LikeButton />);
    expect(
      screen.getByRole('button', { name: /thank you/i }),
    ).toBeInTheDocument();
  });
});
