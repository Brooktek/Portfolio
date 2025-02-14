import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
  icon?: React.ReactNode;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tags, link, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:rotate-1">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            {icon && <div className="text-indigo-600 dark:text-indigo-400">{icon}</div>}
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          </div>
          <a 
            href={link} 
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transform hover:rotate-12 transition-transform duration-300"
          >
            <ExternalLink size={20} />
          </a>
        </div>
        <p className="mt-3 text-gray-500 dark:text-gray-400">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 transform hover:scale-105 transition-transform duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;