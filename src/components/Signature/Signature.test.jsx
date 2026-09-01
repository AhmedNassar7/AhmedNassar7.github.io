import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Signature from './Signature';

describe('Signature', () => {
  it('exposes the name as an accessible image', () => {
    render(<Signature name="Ahmed Nassar" />);
    expect(
      screen.getByRole('img', { name: /ahmed nassar — signature/i }),
    ).toBeInTheDocument();
  });

  it('draws supplied traced strokes when given a paths array', () => {
    const { container } = render(
      <Signature
        name="Ahmed Nassar"
        paths={['M10 80 C 40 10 65 10 95 80', 'M100 80 L 180 80']}
      />,
    );
    const strokes = container.querySelectorAll('path.signature__ink');
    expect(strokes).toHaveLength(2);
    expect(container.querySelector('text')).toBeNull();
  });

  it('falls back to cursive-font text when paths are disabled', () => {
    const { container } = render(<Signature name="Jane Doe" paths={null} />);
    const text = container.querySelector('text.signature__ink');
    expect(text).not.toBeNull();
    expect(text.textContent).toBe('Jane Doe');
    expect(container.querySelector('path.signature__ink')).toBeNull();
  });

  it('starts un-drawn so the reveal can play on scroll-in', () => {
    const { container } = render(
      <Signature paths={['M10 80 C 40 10 65 10 95 80']} />,
    );
    expect(container.querySelector('.signature.is-drawn')).toBeNull();
    const ink = container.querySelector('.signature__ink');
    expect(ink.style.strokeDashoffset).toBe(ink.style.strokeDasharray);
  });
});
