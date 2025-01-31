import React, { useState } from 'react';
import { Sparkles, GraduationCap, Brain } from 'lucide-react';
import UserPreferencesForm from './components/UserPreferencesForm';
import LearningPathCard from './components/LearningPathCard';
import LearningPathDiagram from './components/LearningPathDiagram';
import { UserPreferences, LearningPath } from './types';
import { learningPaths } from './data';
import { generateLearningRecommendations } from './services/recommendations';

function App() {
  const [recommendedPaths, setRecommendedPaths] = useState<LearningPath[]>([]);
  const [showForm, setShowForm] = useState(true);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePreferencesSubmit = async (preferences: UserPreferences) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const recommendations = generateLearningRecommendations(preferences, learningPaths);
      setRecommendedPaths(recommendations);
      setShowForm(false);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-blue-600 text-white p-2 rounded-lg">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  AdaptEase AI
                </h1>
                <p className="text-sm text-gray-500">
                  Personalized Learning, Powered by AI
                </p>
              </div>
            </div>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                New Learning Plan
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {showForm ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Welcome to AdaptEase AI
                </h2>
                <p className="mt-2 text-gray-600">
                  Let's create your personalized learning journey using the power of AI
                </p>
              </div>
              <UserPreferencesForm onSubmit={handlePreferencesSubmit} />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Your Personalized Learning Paths
              </h2>
              <p className="mt-2 text-gray-600">
                AI-curated paths tailored to your goals and preferences
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommendedPaths.map((path) => (
                <LearningPathCard
                  key={path.id}
                  path={path}
                  onClick={() => setSelectedPath(path)}
                  isSelected={selectedPath?.id === path.id}
                />
              ))}
            </div>
            
            {selectedPath && (
              <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Learning Journey: {selectedPath.title}
                </h3>
                <LearningPathDiagram path={selectedPath} />
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} AdaptEase AI. Transforming education through adaptive learning.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;