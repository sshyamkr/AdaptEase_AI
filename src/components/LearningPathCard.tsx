import React from 'react';
import { LearningPath } from '../types';
import { Clock, BookOpen, BarChart } from 'lucide-react';

interface Props {
  path: LearningPath;
  onClick: () => void;
  isSelected?: boolean;
}

export default function LearningPathCard({ path, onClick, isSelected }: Props) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1 ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-gray-900">{path.title}</h3>
      <p className="mt-2 text-sm text-gray-600">{path.description}</p>
      
      <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1 text-blue-500" />
          {path.duration}
        </div>
        <div className="flex items-center">
          <BookOpen className="h-4 w-4 mr-1 text-blue-500" />
          {path.skills.length} skills
        </div>
        <div className="flex items-center">
          <BarChart className="h-4 w-4 mr-1 text-blue-500" />
          {path.difficulty}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {path.skills.map((skill) => (
            <span
              key={skill.id}
              className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}