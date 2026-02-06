
export type PathType = 'career' | 'adventure' | null;

export interface CardItem {
  id: string;
  title: string;
  oneLineDefinition: string;
  professionalName: string; // Replaces "Resume Translation"
  experienceDetail: string; // The quote or elaboration
  type: 'skill' | 'mission';
  imageUrl: string;
}

export interface UserProfile {
  name: string;
  degree: string;
  concerns: string[];
}

export const CONCERNS_LIST = [
  'Safety',
  'Parents',
  'Money',
  'Values',
  'Environment'
];
