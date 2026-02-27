import { Project } from '../types';

export const moreProjects: Project[] = [
  {
    id: 16,
    title: "Project Pi",
    category: "Fashion",
    year: "2022",
    image: "https://picsum.photos/seed/pi/800/1300",
    description: "Fitness tracking application."
  },
  {
    id: 17,
    title: "Project Rho",
    category: "Design",
    year: "2023",
    image: "https://picsum.photos/seed/rho/800/800",
    description: "Restaurant branding and menus."
  },
  {
    id: 18,
    title: "Project Sigma",
    category: "Sketches",
    year: "2024",
    image: "https://picsum.photos/seed/sigma/800/1100",
    description: "SaaS dashboard interface."
  },
  {
    id: 19,
    title: "Project Tau",
    category: "Textile",
    year: "2022",
    image: "https://picsum.photos/seed/tau/800/600",
    description: "Annual report design."
  },
  {
    id: 20,
    title: "Project Upsilon",
    category: "Fashion",
    year: "2024",
    image: "https://picsum.photos/seed/upsilon/800/1500",
    description: "Boutique hotel identity."
  },
  {
    id: 21,
    title: "Project Phi",
    category: "Design",
    year: "2023",
    image: "https://picsum.photos/seed/phi/800/900",
    description: "Social media app concept."
  },
  {
    id: 22,
    title: "Project Chi",
    category: "Sketches",
    year: "2022",
    image: "https://picsum.photos/seed/chi/800/1200",
    description: "Real estate platform."
  },
  {
    id: 23,
    title: "Project Psi",
    category: "Illustration",
    year: "2024",
    image: "https://picsum.photos/seed/psi/800/700",
    description: "Magazine editorial layout."
  },
  {
    id: 24,
    title: "Project Omega",
    category: "Fashion",
    year: "2023",
    image: "https://picsum.photos/seed/omega/800/1000",
    description: "Tech startup visual identity."
  },
  {
    id: 25,
    title: "Project Alpha 2",
    category: "Design",
    year: "2024",
    image: "https://picsum.photos/seed/alpha2/800/1400",
    description: "E-commerce mobile app."
  }
];

export const getProjectDetails = (project: Project) => {
  return {
    measurement: '1920x1080',
    concept: 'Minimalism',
    media: 'Digital'
  };
};
