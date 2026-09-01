import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

const state = { entries: [], listeners: new Set() };

vi.mock('../../firebase', () => ({
  isFirebaseReady: true,
  subscribeToGuestbook: (cb) => {
    state.listeners.add(cb);
    cb(state.entries);
    return () => state.listeners.delete(cb);
  },
  addGuestbookEntry: vi.fn(async ({ name, message }) => {
    const entry = {
      name: name.trim().slice(0, 40),
      message: message.trim().slice(0, 280),
      ts: Date.now(),
    };
    state.entries = [
      ...state.entries,
      { id: `k${state.entries.length}`, ...entry },
    ];
    state.listeners.forEach((cb) =>
      cb([...state.entries].sort((a, b) => b.ts - a.ts)),
    );
    return entry;
  }),
}));
vi.mock('../../utils/analytics', () => ({ trackEvent: vi.fn() }));

import Guestbook from './Guestbook';
import { addGuestbookEntry } from '../../firebase';

const fill = (label, value) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } });

describe('Guestbook', () => {
  beforeEach(() => {
    state.entries = [];
    state.listeners.clear();
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders the section, heading and empty state', () => {
    const { container } = render(<Guestbook />);
    expect(container.querySelector('section#guestbook')).not.toBeNull();
    expect(
      screen.getByRole('heading', { name: 'Guestbook' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/be the first to sign/i)).toBeInTheDocument();
  });

  it('shows existing entries from the live subscription', () => {
    state.entries = [
      { id: 'a', name: 'Sara', message: 'Love the site', ts: Date.now() },
    ];
    render(<Guestbook />);
    expect(screen.getByText('Sara')).toBeInTheDocument();
    expect(screen.getByText('Love the site')).toBeInTheDocument();
  });

  it('keeps Sign disabled until both fields have content', () => {
    render(<Guestbook />);
    const submit = screen.getByRole('button', { name: /sign/i });
    expect(submit).toBeDisabled();
    fill('Your name', 'Ada');
    expect(submit).toBeDisabled();
    fill('Your message', 'hi there');
    expect(submit).toBeEnabled();
  });

  it('saves a trimmed entry, shows it, and clears the form', async () => {
    render(<Guestbook />);
    fill('Your name', '  Ada  ');
    fill('Your message', '  hello world  ');
    fireEvent.click(screen.getByRole('button', { name: /sign/i }));

    await waitFor(() =>
      expect(addGuestbookEntry).toHaveBeenCalledWith({
        name: 'Ada',
        message: 'hello world',
      }),
    );
    expect(await screen.findByText('hello world')).toBeInTheDocument();
    expect(screen.getByLabelText('Your name')).toHaveValue('');
  });

  it('ignores a submission that trips the honeypot', () => {
    const { container } = render(<Guestbook />);
    fill('Your name', 'Bot');
    fill('Your message', 'spam');
    fireEvent.change(container.querySelector('.guestbook-hp'), {
      target: { value: 'http://spam.example' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign/i }));
    expect(addGuestbookEntry).not.toHaveBeenCalled();
  });

  it('enforces a cooldown after signing', async () => {
    render(<Guestbook />);
    fill('Your name', 'Ada');
    fill('Your message', 'first note');
    fireEvent.click(screen.getByRole('button', { name: /sign/i }));

    await waitFor(() => expect(addGuestbookEntry).toHaveBeenCalledTimes(1));
    expect(screen.getByRole('button', { name: /sign/i })).toBeDisabled();
  });
});
