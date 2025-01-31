import { LearningPath } from './types';

export const learningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'Web Development Fundamentals',
    description: 'Master the basics of web development with HTML, CSS, and JavaScript',
    skills: [
      { id: 'html', name: 'HTML', level: 'beginner' },
      { id: 'css', name: 'CSS', level: 'beginner' },
      { id: 'js', name: 'JavaScript', level: 'beginner' },
    ],
    duration: '12 weeks',
    difficulty: 'beginner',
  },
  {
    id: '2',
    title: 'Data Science Essentials',
    description: 'Learn the fundamentals of data science and machine learning',
    skills: [
      { id: 'python', name: 'Python', level: 'intermediate' },
      { id: 'stats', name: 'Statistics', level: 'intermediate' },
      { id: 'ml', name: 'Machine Learning', level: 'intermediate' },
    ],
    duration: '16 weeks',
    difficulty: 'intermediate',
  },
  {
    id: '3',
    title: 'Cloud Architecture',
    description: 'Advanced cloud computing and system design',
    skills: [
      { id: 'aws', name: 'AWS', level: 'advanced' },
      { id: 'devops', name: 'DevOps', level: 'advanced' },
      { id: 'security', name: 'Security', level: 'advanced' },
    ],
    duration: '20 weeks',
    difficulty: 'advanced',
  },
];