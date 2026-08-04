import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Resume from './Resume';
import { skills, projects, achievements } from '../../data/resumeData';

describe('Resume', () => {
  it('renders the skills grid', () => {
    render(<Resume />);

    const [firstCategory, firstSkills] = Object.entries(skills)[0];
    expect(screen.getByText(firstCategory)).toBeInTheDocument();
    expect(screen.getByText(firstSkills[0].name)).toBeInTheDocument();
  });

  it('renders every project inside a tilt card', () => {
    render(<Resume />);

    projects.forEach((project) => {
      expect(screen.getByText(project.name)).toBeInTheDocument();
    });
    expect(document.querySelectorAll('.project-item')).toHaveLength(
      projects.length,
    );
  });

  it('renders every achievement inside a tilt card', () => {
    render(<Resume />);

    achievements.forEach((achievement) => {
      expect(screen.getByText(achievement.title)).toBeInTheDocument();
    });
    expect(document.querySelectorAll('.achievement-item')).toHaveLength(
      achievements.length,
    );
  });
});
