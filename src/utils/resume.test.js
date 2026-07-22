import { describe, it, expect, vi, afterEach } from 'vitest';
import { RESUME_URL, RESUME_VIEW_URL, downloadResume } from './resume';

describe('resume utils', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('exposes the resume URLs', () => {
    expect(RESUME_URL).toMatch(/\.pdf$/);
    expect(RESUME_VIEW_URL).toMatch(/^https:\/\//);
  });

  it('downloadResume creates and clicks a download link pointing at the PDF', () => {
    const clickSpy = vi.fn();
    const realCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tag) => {
      const el = realCreateElement(tag);
      if (tag === 'a') el.click = clickSpy;
      return el;
    });

    downloadResume();

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });
});
