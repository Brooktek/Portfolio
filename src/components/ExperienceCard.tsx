import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ExperienceCardProps {
  title: string;
  description: string;
  duration: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, description, duration }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:scale-105 hover:translate-x-2">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{title}</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <span className="text-sm text-gray-400 dark:text-gray-500">{duration}</span>
      </div>
    </div>
  );
};

export default ExperienceCard;