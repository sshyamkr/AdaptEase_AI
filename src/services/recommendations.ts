import { UserPreferences, LearningPath } from '../types';

const difficultyMap = {
  beginner: 1,
  intermediate: 2,
  advanced: 3
};

// Convert duration from string to numeric weeks
const parseDuration = (duration: string): number => {
  const match = duration.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

function calculatePathScore(path: LearningPath, preferences: UserPreferences): number {
  let score = 0;

  // ✅ Time availability score
  const duration = parseDuration(path.duration);
  if (preferences.availableTime === 'minimal' && duration <= 12) score += 3;
  else if (preferences.availableTime === 'moderate' && duration <= 16) score += 2;
  else if (preferences.availableTime === 'extensive') score += 1;

  // ✅ Difficulty level score
  const targetDifficulty = preferences.goals.some(goal =>
    goal.toLowerCase().includes(path.difficulty.toLowerCase())
  );
  if (targetDifficulty) {
    score += difficultyMap[path.difficulty] * 2; // Weighted score for difficulty relevance
  }

  // ✅ Skills matching score
  path.skills.forEach(skill => {
    if (preferences.goals.some(goal =>
      goal.toLowerCase().includes(skill.name.toLowerCase())
    )) {
      score += 3; // Increase weight for skill relevance
    }
  });

  // ✅ AI-based relevance boost (if available)
  // You can call the AI model here to adjust the score dynamically based on AI feedback.
  // Example:
  // score += await getAIRelevanceBoost(path, preferences);

  return score;
}

export function generateLearningRecommendations(
  preferences: UserPreferences,
  availablePaths: LearningPath[]
): LearningPath[] {
  const scoredPaths = availablePaths.map(path => ({
    path,
    score: calculatePathScore(path, preferences)
  }));

  // ✅ Sort paths by score (higher is better) and return top matches
  return scoredPaths
    .sort((a, b) => b.score - a.score)
    .map(({ path }) => path);
}
