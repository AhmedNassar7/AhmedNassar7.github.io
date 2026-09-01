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

  it('has no per-visitor cap and sends a big burst in <=45-per-write chunks', async () => {
    render(<LikeButton />);
    await waitForCount(/1,200 likes/);
    const button = screen.getByRole('button');

    act(() => {
      for (let i = 0; i < 60; i += 1) fireEvent.click(button);
    });

    // Every tap counts — nothing is dropped.
    expect(srText()).toMatch(/1,260 likes/);

    // ...but no single write exceeds the per-write limit.
    await waitFor(() => expect(addLikes).toHaveBeenCalled(), { timeout: 4000 });
    await waitFor(
      () => {
        const total = addLikes.mock.calls.reduce((sum, [n]) => sum + n, 0);
        expect(total).toBe(60);
      },
      { timeout: 6000 },
    );
    expect(addLikes.mock.calls.every(([n]) => n <= 45)).toBe(true);
  });

  it('greets a returning visitor who has liked before', () => {
    localStorage.setItem('likes:contributed', '7');
    render(<LikeButton />);
    expect(
      screen.getByRole('button', { name: /you've liked this site 7 times/i }),
    ).toBeInTheDocument();
  });
});
