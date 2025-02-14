import React from 'react';
import { Trophy, Star, Target, Moon } from 'lucide-react';

interface AchievementBadgeProps {
  type: string;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ type }) => {
  const getIcon = () => {
    switch (type) {
      case 'projects':
        return <Star size={20} />;
      case 'skills':
        return <Target size={20} />;
      case 'experience':
        return <Trophy size={20} />;
      case 'darkMode':
        return <Moon size={20} />;
      default:
        return <Trophy size={20} />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'projects':
        return 'Project Explorer';
      case 'skills':
        return 'Skill Seeker';
      case 'experience':
        return 'Experience Hunter';
      case 'darkMode':
        return 'Night Owl';
      default:
        return 'Achievement Unlocked';
    }
  };

  return (
    <div 
      className="bg-indigo-600 text-white p-2 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 cursor-help"
      title={getTitle()}
    >
      {getIcon()}
    </div>
  );
};

export default AchievementBadge;