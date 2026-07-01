export const navItems = [
  { href: '#build', label: 'Philosophy' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Work' },
  { href: '#skills', label: 'Practice' },
  { href: '#timeline', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
] as const

export const designer = {
  name: 'RIYA JETHANI',
  headerLabel: 'MENU',
} as const

export const fullscreenMenuItems = [
  {
    id: '01',
    label: 'HOME',
    href: '/',
    accent: '#D6B46A',
    bgImage: '/design-bg.png',
    preview: {
      eyebrow: 'Index',
      title: 'The Starting Point',
      description: 'Return to the main overview of Riya Jethani’s portfolio and philosophy.',
    },
  },
  {
    id: '02',
    label: 'WORK',
    href: '/work',
    accent: '#A99BC9',
    bgImage: '/project_collage.png',
    preview: {
      eyebrow: 'Archive',
      title: 'A curated visual world',
      description: 'Explore selected projects across brand experience, editorial, and digital design.',
    },
  },
  {
    id: '03',
    label: 'ABOUT',
    href: '/#about',
    accent: '#D9A5A5',
    bgImage: '/editorial_typography.png',
    preview: {
      eyebrow: 'Story',
      title: 'A Mumbai-based creative voice',
      description: 'Ideas are explored visually and emotionally, then translated into lasting visual experiences.',
    },
  },
  {
    id: '04',
    label: 'CONTACT',
    href: '/#contact',
    accent: '#C76D4F',
    bgImage: '/creative_texture.png',
    preview: {
      eyebrow: 'Contact',
      title: 'Begin a meaningful collaboration',
      description: 'Open for thoughtful brands, visual systems, and projects that deserve depth and character.',
    },
  },
] as const

export const projects = [
  {
    title: 'Museum Identity',
    year: '2026',
    category: 'Brand Experience',
    accent: '#C76D4F',
    description: 'An immersive visual language shaped by tactility, memory, and editorial pacing.',
  },
  {
    title: 'Atelier Notes',
    year: '2026',
    category: 'Editorial Design',
    accent: '#D9A5A5',
    description: 'A publication-inspired digital experience balancing softness, structure, and intimacy.',
  },
  {
    title: 'Studio Archive',
    year: '2025',
    category: 'Portfolio Direction',
    accent: '#A99BC9',
    description: 'A curated visual world where layout, typography, and motion create an artistic narrative.',
  },
] as const

export const skills = [
  { label: 'Brand Worlds', accent: '#C76D4F' },
  { label: 'Art Direction', accent: '#D6B46A' },
  { label: 'Visual Systems', accent: '#A99BC9' },
  { label: 'Typography', accent: '#D9A5A5' },
  { label: 'Creative Coding', accent: '#A8B59C' },
  { label: 'Editorial Layout', accent: '#D6B46A' },
  { label: 'Motion Detail', accent: '#A99BC9' },
  { label: 'Image Making', accent: '#C76D4F' },
] as const

export const copy = {
  loaderTitle: 'Opening Portfolio',
  heroEyebrow: 'Creative Designer • Mumbai, India',
  heroTitle: 'RIYA JETHANI',
  heroSubtitle: 'DESIGNING VISUAL STORIES WITH EMOTION',
  heroMeta: 'Editorial aesthetics, emotional storytelling, and modern visual experiences.',
  statementEyebrow: 'Design Philosophy',
  statementLines: ['DESIGN', 'WITH', 'FEELING'],
  statementMeta: 'Story first. Emotion forward. Crafted to leave a lasting impression.',
  storyEyebrow: 'About Story',
  storyTitle: 'A creative practice where ideas become atmospheric, memorable visual experiences.',
  storyBody:
    'The work is guided by feeling as much as form. Every detail is shaped to connect with people, carry meaning, and remain memorable over time.',
  projectsEyebrow: 'Selected Projects',
  skillsEyebrow: 'Creative Practice',
  timelineEyebrow: 'Creative Journey',
  contactEyebrow: 'Contact',
  contactTitle: 'Let’s create something expressive, elegant, and deeply considered.',
  contactBody:
    'Riya is open to collaborations in branding, editorial experiences, visual systems, and portfolio worlds that value story, personality, and craft.',
  contactEmail: 'riyajethani447@gmail.com',
} as const
