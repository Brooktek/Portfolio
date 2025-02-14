import React, { useState } from 'react';

interface SkillCardProps {
  category: string;
  items: string[];
}

const SkillCard: React.FC<SkillCardProps> = ({ category, items }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium 
              ${isHovered 
                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              } transform hover:scale-110 transition-all duration-300`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;