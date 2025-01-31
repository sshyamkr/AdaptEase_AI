import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { BookOpen, Brain, Clock } from 'lucide-react';

interface Props {
  onSubmit: (preferences: UserPreferences) => void;
}

export default function UserPreferencesForm({ onSubmit }: Props) {
  const [preferences, setPreferences] = useState<UserPreferences>({
    goals: [],
    preferredSkills: [],
    learningStyle: 'visual',
    availableTime: 'moderate',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          What are your learning goals?
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          placeholder="e.g., Become a full-stack developer, Learn data science..."
          onChange={(e) => setPreferences({ ...preferences, goals: e.target.value.split('\n') })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Learning Style
        </label>
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {['visual', 'auditory', 'reading', 'kinesthetic'].map((style) => (
            <button
              key={style}
              type="button"
              className={`flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold 
                ${preferences.learningStyle === style
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setPreferences({ ...preferences, learningStyle: style as any })}
            >
              {style === 'visual' && <Brain className="mr-2 h-4 w-4" />}
              {style === 'reading' && <BookOpen className="mr-2 h-4 w-4" />}
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Available Time for Learning
        </label>
        <div className="mt-2 grid grid-cols-3 gap-3">
          {['minimal', 'moderate', 'extensive'].map((time) => (
            <button
              key={time}
              type="button"
              className={`flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold
                ${preferences.availableTime === time
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setPreferences({ ...preferences, availableTime: time as any })}
            >
              <Clock className="mr-2 h-4 w-4" />
              {time.charAt(0).toUpperCase() + time.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Generate Learning Plan
      </button>
    </form>
  );
}