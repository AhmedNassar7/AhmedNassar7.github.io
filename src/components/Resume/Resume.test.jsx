import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Resume from './Resume';
import { skills, achievements, projects } from '../../data/resumeData';

const cardTitles = (container) =>
  [...container.querySelectorAll('.project-card__name')].map((h) =>
    h.textContent.trim(),
  );

describe('Resume', () => {
  it('renders the skills grid', () => {
    render(<Resume />);

    const [firstCategory, firstSkills] = Object.entries(skills)[0];
    expect(screen.getByText(firstCategory)).toBeInTheDocument();
    expect(screen.getByText(firstSkills[0].name)).toBeInTheDocument();
  });

  it('renders every achievement inside a tilt card, with a logo', () => {
    render(<Resume />);

    achievements.forEach((achievement) => {
      expect(screen.getByText(achievement.title)).toBeInTheDocument();
    });
    const items = document.querySelectorAll('.achievement-item');
    expect(items).toHaveLength(achievements.length);
    items.forEach((item) => {
      expect(
        item.querySelector('.org-logo-photo, .org-logo-fallback'),
      ).not.toBeNull();
    });
  });

  it('renders a Projects subsection inside the resume with every project', () => {
    const { container } = render(<Resume />);

    expect(container.querySelector('#projects')).not.toBeNull();
    const titles = cardTitles(container);
    projects.forEach((project) => {
      expect(titles.some((t) => t.includes(project.name))).toBe(true);
    });
    expect(container.querySelectorAll('.project-card')).toHaveLength(
      projects.length,
    );
  });

  it('orders featured projects first', () => {
    const { container } = render(<Resume />);
    const titles = cardTitles(container);
    projects
      .filter((p) => p.featured)
      .forEach((project, i) => {
        expect(titles[i]).toContain(project.name);
      });
  });

  it('links each project repo out safely in a new tab', () => {
    render(<Resume />);
    const repoLink = screen.getByLabelText(
      `View ${projects[0].name} source on GitHub`,
    );
    expect(repoLink).toHaveAttribute('target', '_blank');
    expect(repoLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(repoLink).toHaveAttribute('href', projects[0].url);
  });
});
