export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface UserPreferences {
  goals: string[];
  preferredSkills: Skill[];
  learningStyle: 'visual' | 'auditory' | 'reading' | 'kinesthetic';
  availableTime: 'minimal' | 'moderate' | 'extensive';
}