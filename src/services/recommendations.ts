import { UserPreferences, LearningPath } from '../types';

function calculatePathScore(path: LearningPath, preferences: UserPreferences): number {
  let score = 0;

  // Time availability score
  if (preferences.availableTime === 'minimal' && path.duration <= '12 weeks') score += 3;
  else if (preferences.availableTime === 'moderate' && path.duration <= '16 weeks') score += 2;
  else if (preferences.availableTime === 'extensive') score += 1;

  // Difficulty level score
  const difficultyMap = {
    beginner: 1,
    intermediate: 2,
    advanced: 3
  };

  // Check if any goals mention specific levels
  const goalText = preferences.goals.join(' ').toLowerCase();
  if (goalText.includes('beginner') && path.difficulty === 'beginner') score += 2;
  if (goalText.includes('advanced') && path.difficulty === 'advanced') score += 2;

  // Skills matching score
  path.skills.forEach(skill => {
    if (preferences.goals.some(goal => 
      goal.toLowerCase().includes(skill.name.toLowerCase())
    )) {
      score += 2;
    }
  });

  return score;
}

export function generateLearningRecommendations(
  preferences: UserPreferences,
  availablePaths: LearningPath[]
): LearningPath[] {
  // Score each path based on user preferences
  const scoredPaths = availablePaths.map(path => ({
    path,
    score: calculatePathScore(path, preferences)
  }));

  // Sort paths by score and return top matches
  return scoredPaths
    .sort((a, b) => b.score - a.score)
    .map(({ path }) => path);
}