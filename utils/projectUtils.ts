import { Project } from '../types';

export const moreProjects: Project[] = [
  {
    id: 3,
    title: "Project Gamma",
    category: "Print",
    year: "2022",
    image: "https://picsum.photos/seed/gamma/800/600",
    description: "Print design for a local magazine."
  }
];

export const getProjectDetails = (project: Project) => {
  return {
    measurement: '1920x1080',
    concept: 'Minimalism',
    media: 'Digital'
  };
};
