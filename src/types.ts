export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  images?: string[];
  description: string;
  extendedDescription?: string;
  downloadUrl?: string;
  challenge?: string;
  solution?: string;
  technologies?: string[];
}
