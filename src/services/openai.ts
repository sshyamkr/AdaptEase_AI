import OpenAI from 'openai';
import { UserPreferences, LearningPath } from '../types';

const openai = new OpenAI({
  apiKey: 'your-api-key', // In production, use environment variables
  dangerouslyAllowBrowser: true // For demo purposes only
});

export async function generateLearningRecommendations(
  preferences: UserPreferences,
  availablePaths: LearningPath[]
): Promise<LearningPath[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an AI learning path advisor. Analyze user preferences and recommend suitable learning paths."
        },
        {
          role: "user",
          content: `
            User Preferences:
            Goals: ${preferences.goals.join(', ')}
            Learning Style: ${preferences.learningStyle}
            Available Time: ${preferences.availableTime}
            
            Available Paths: ${JSON.stringify(availablePaths)}
            
            Recommend the most suitable learning paths and explain why they match the user's preferences.
          `
        }
      ]
    });

    // Parse AI response and match with available paths
    const aiSuggestions = response.choices[0].message.content;
    
    // For demo purposes, filter paths based on basic criteria
    // In production, implement more sophisticated matching logic based on AI response
    return availablePaths.filter(path => {
      if (preferences.availableTime === 'minimal' && path.duration > '12 weeks') return false;
      if (preferences.availableTime === 'moderate' && path.duration > '16 weeks') return false;
      return true;
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return availablePaths;
  }
}