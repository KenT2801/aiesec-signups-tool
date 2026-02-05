
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
  age: string;
  phone: string;
  email: string;
  degree: string;
  year: string;
  university: string;
  passion: string;
  destination: string;
  availability: string;
  contactConsent: boolean;
  feeAcknowledgment: boolean;
  concerns: string[];
}

export const CONCERNS_LIST = [
  'Safety',
  'Parents',
  'Money',
  'Values',
  'Environment'
];

export const PASSIONS_LIST = [
  'Quality Education',
  'Climate Action',
  'Gender Equality',
  'No Poverty',
  'Good Health & Well-being',
  'Decent Work & Economic Growth',
  'Reduced Inequalities',
  'Sustainable Cities'
];

export const DESTINATION_REGIONS = {
  'South East Asia': ['Vietnam', 'Thailand', 'Indonesia', 'Malaysia', 'Philippines', 'Cambodia'],
  'Asia Pacific': ['India', 'Sri Lanka', 'Nepal', 'Taiwan'],
  'Europe': ['Turkey', 'Poland', 'Greece', 'Portugal', 'Italy'],
  'Americas': ['Brazil', 'Mexico', 'Peru', 'Colombia'],
  'Middle East & Africa': ['Egypt', 'Morocco', 'Kenya']
};

export const AVAILABILITY_OPTIONS = [
  'Winter 2026 (May, June, July)',
  'Summer 2026 (Nov, Dec, Jan, Feb)'
];
