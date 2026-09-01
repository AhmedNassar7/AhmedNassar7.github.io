import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Projects from './Projects';
import { projects } from '../../data/resumeData';

const cardTitles = (container) =>
  [...container.querySelectorAll('.project-card__name')].map((h) =>
    h.textContent.trim(),
  );

describe('Projects', () => {
  it('renders a Projects section with a heading', () => {
    const { container } = render(<Projects />);
    expect(container.querySelector('section#projects')).not.toBeNull();
    expect(
      screen.getByRole('heading', { name: 'Projects' }),
    ).toBeInTheDocument();
  });

  it('renders every project as a card with its name', () => {
    const { container } = render(<Projects />);
    const titles = cardTitles(container);
    projects.forEach((project) => {
      expect(titles.some((t) => t.includes(project.name))).toBe(true);
    });
    expect(container.querySelectorAll('.project-card')).toHaveLength(
      projects.length,
    );
  });

  it('orders featured projects first', () => {
    const { container } = render(<Projects />);
    const titles = cardTitles(container);
    projects
      .filter((p) => p.featured)
      .forEach((project, i) => {
        expect(titles[i]).toContain(project.name);
      });
  });

  it('gives every card an icon — a logo image or an initials fallback', () => {
    const { container } = render(<Projects />);
    container.querySelectorAll('.project-card').forEach((card) => {
      expect(card.querySelector('.project-card__logo')).not.toBeNull();
    });
  });

  it('links each project repo out safely in a new tab', () => {
    render(<Projects />);
    const repoLink = screen.getByLabelText(
      `View ${projects[0].name} source on GitHub`,
    );
    expect(repoLink).toHaveAttribute('target', '_blank');
    expect(repoLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(repoLink).toHaveAttribute('href', projects[0].url);
  });
});
