import {
  faGithub,
  faDiscord,
  faPython,
  faJava,
  faJs,
  faReact,
  faAws,
  faDocker,
  faGit,
  faLinux,
  faHtml5,
  faCss3,
  faBootstrap,
  faNodeJs,
  faSass,
  faMicrosoft,
} from '@fortawesome/free-brands-svg-icons';
import {
  faDatabase,
  faCode,
  faCogs,
  faLayerGroup,
  faFlask,
  faCubes,
  faNetworkWired,
  faCloud,
  faCodeBranch,
  faFireAlt,
  faServer,
  faLock,
  faTerminal,
  faGears,
  faSpider,
} from '@fortawesome/free-solid-svg-icons';

export const education = {
  school: 'Modern Academy in Maadi',
  degree: 'Bachelor of Computer Science',
  date: '2021 - 2025',
  location: 'Cairo, Egypt',
  url: 'https://mng.modern-academy.edu.eg/',
  cgpa: '3.6 / 4.0',
};

export const experiences = [
  {
    company: 'Beshara Group',
    role: 'Java Developer',
    type: 'Full Time',
    date: 'Nov 2025 – Present',
    location: 'Cairo, Egypt',
    url: 'https://ebeshara.com/',
  },
  {
    company: 'Django Software Foundation',
    role: 'Open Source Contributor',
    type: 'Volunteer',
    date: 'Jan 2025 – Jan 2026',
    location: 'Remote',
    url: 'https://www.djangoproject.com',
  },
  {
    company: 'Mercor',
    role: 'Software Engineer',
    type: 'Contract',
    date: 'Oct 2025 – Dec 2025',
    location: 'Remote',
    url: 'https://www.mercor.com',
  },
  {
    company: 'Nile University',
    role: 'AI Researcher',
    type: 'Internship',
    date: 'Jul 2025 – Aug 2025',
    location: 'Cairo, Egypt',
    url: 'https://www.nu.edu.eg',
  },
  {
    company: 'Orange Digital Center',
    role: 'Software Engineer',
    type: 'Internship',
    date: 'Sep 2024 – Oct 2024',
    location: 'Cairo, Egypt',
    url: 'https://www.orangedigitalcenters.com/country/EG/home',
  },
  {
    company: 'Nokia',
    role: 'Software Engineer',
    type: 'Internship',
    date: 'Aug 2023 – Oct 2023',
    location: 'Cairo, Egypt',
    url: 'https://www.nokia.com/',
  },
];

export const projects = [
  {
    name: 'Egypt Metro Backend',
    url: 'https://github.com/Egypt-Metro/backend',
    tech: ['Python', 'Django', 'PostgreSQL', 'JavaScript', 'HTML', 'CSS'],
    description:
      'Scalable Django backend serving millions of users with 60+ RESTful APIs, real-time train tracking, and secure ticketing.',
  },
  {
    name: 'PDF Toolkit',
    url: 'https://github.com/AhmedNassar7/toolkit',
    liveUrl: 'https://ahmednassar7.github.io/toolkit/',
    tech: ['React', 'TypeScript', 'Node.js', 'Docker', 'Tailwind', 'Supabase'],
    description:
      '22 client-side PDF tools — merge, split, compress, encrypt, convert — with zero server storage.',
  },
  {
    name: 'Tracker',
    url: 'https://github.com/AhmedNassar7/tracker',
    tech: ['Python', 'GitHub Actions', 'Automation', 'Web Scraping'],
    description:
      'Automated hourly tracker for software engineering jobs, internships, and hackathons — no sign-up needed.',
  },
];

export const achievements = [
  {
    title: 'Individual Member, Django Software Foundation',
    secondaryUrl:
      'https://www.djangoproject.com/foundation/individual-members/',
    secondaryLabel: 'DSF Members Page',
    bullets: [
      'Recognized as a Much-Appreciated Contributor in the Django Authors and selected as an Individual Member of the Django Software Foundation, after authoring 24 pull requests to Django core with 10 merged.',
    ],
  },
  {
    title: 'Founder, Software Engineering Community',
    url: 'https://github.com/AhmedNassar7/Software-Engineering',
    secondaryUrl: 'https://discord.gg/N95QU2Ww3h',
    secondaryLabel: 'Discord',
    secondaryIcon: faDiscord,
    bullets: [
      'Central hub for software engineering opportunities worldwide — internships, open-source, mock interviews, and hackathons.',
      '500+ GitHub stars and 15+ forks, with an active Discord community supporting engineers globally.',
    ],
  },
  {
    title: 'Round 2 Qualifier, Meta Hacker Cup',
    secondaryUrl:
      'https://web.facebook.com/codingcompetitions/hacker-cup/2025/certificate/209508058776009',
    secondaryLabel: 'Certificate',
    bullets: [
      'Ranked 714th of 13,779 (top 5%) in Round 1 and advanced to Round 2, placing 1,126th of 5,972 (top 19%) globally.',
    ],
  },
];

export const skills = {
  Languages: [
    { name: 'Java', icon: faJava },
    { name: 'Python', icon: faPython },
    { name: 'C++', icon: faCode },
    { name: 'C#', icon: faMicrosoft },
    { name: 'JavaScript', icon: faJs },
    { name: 'TypeScript', icon: faJs },
    { name: 'SQL', icon: faDatabase },
    { name: 'HTML', icon: faHtml5 },
    { name: 'CSS', icon: faCss3 },
  ],
  Frameworks: [
    { name: 'Django', icon: faPython },
    { name: 'Spring Boot', icon: faJava },
    { name: 'React', icon: faReact },
    { name: 'Node.js', icon: faNodeJs },
    { name: 'Bootstrap', icon: faBootstrap },
    { name: 'SCSS', icon: faSass },
    { name: 'Firebase', icon: faFireAlt },
    { name: 'Redux', icon: faLayerGroup },
    { name: 'Ajax', icon: faJs },
  ],
  Tools: [
    { name: 'Git', icon: faGit },
    { name: 'GitHub', icon: faGithub },
    { name: 'Docker', icon: faDocker },
    { name: 'Kubernetes', icon: faCloud },
    { name: 'AWS', icon: faAws },
    { name: 'Azure', icon: faMicrosoft },
    { name: 'Kafka', icon: faNetworkWired },
    { name: 'Linux', icon: faLinux },
    { name: 'Postman', icon: faServer },
    { name: 'Jira', icon: faCogs },
  ],
  Databases: [
    { name: 'PostgreSQL', icon: faDatabase },
    { name: 'MySQL', icon: faDatabase },
    { name: 'Oracle', icon: faDatabase },
    { name: 'MS SQL Server', icon: faDatabase },
    { name: 'MongoDB', icon: faDatabase },
    { name: 'SQLite', icon: faDatabase },
  ],
  Concepts: [
    { name: 'OOP', icon: faCubes },
    { name: 'SOLID', icon: faLock },
    { name: 'Design Patterns', icon: faCogs },
    { name: 'System Design', icon: faNetworkWired },
    { name: 'Microservices', icon: faCubes },
    { name: 'APIs', icon: faCodeBranch },
    { name: 'CI/CD', icon: faTerminal },
    { name: 'Agile', icon: faLayerGroup },
    { name: 'Testing', icon: faFlask },
  ],
};

// Reuses the icons already defined above for Skills, plus a few fallbacks
// for project tech that doesn't appear in that list, so the tech-stack tags
// in Projects don't have to duplicate icon choices already made once.
export const techIcons = {
  ...Object.fromEntries(
    Object.values(skills)
      .flat()
      .map((skill) => [skill.name, skill.icon]),
  ),
  Tailwind: faCss3,
  Supabase: faDatabase,
  'GitHub Actions': faGithub,
  Automation: faGears,
  'Web Scraping': faSpider,
};
