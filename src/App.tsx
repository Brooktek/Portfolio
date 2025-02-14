import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Download, ExternalLink, Moon, Sun, Trophy, Star, Code, Target } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import SkillCard from './components/SkillCard';
import ExperienceCard from './components/ExperienceCard';
import AchievementBadge from './components/AchievementBadge';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [achievementsUnlocked, setAchievementsUnlocked] = useState(new Set());

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);

      // Check which sections are visible
      const sections = ['projects', 'skills', 'experience', 'contact'];
      const currentVisible = new Set(visibleSections);
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < windowHeight && rect.bottom >= 0) {
            currentVisible.add(section);
            // Unlock achievement if section hasn't been viewed before
            if (!visibleSections.has(section)) {
              unlockAchievement(section);
            }
          }
        }
      });
      
      setVisibleSections(currentVisible);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections]);

  const unlockAchievement = (type: string) => {
    setAchievementsUnlocked(prev => new Set(prev).add(type));
    
    // Show achievement notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg transform translate-y-0 opacity-100 transition-all duration-500';
    notification.innerHTML = `🏆 Achievement Unlocked: Explored ${type.charAt(0).toUpperCase() + type.slice(1)}!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(100%)';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    if (!achievementsUnlocked.has('darkMode')) {
      unlockAchievement('darkMode');
    }
  };

  const projects = [
    {
      title: "Hospital Management System",
      description: "A comprehensive system built with C# & MySQL, featuring interfaces for doctors, nurses, and patients",
      tags: ["C#", "MySQL", "Database Design", "UI/UX"],
      link: "#",
      icon: <Code size={24} />
    },
    {
      title: "Secure File Transfer System",
      description: "Implemented encryption and secure authentication methods for safe file transfers",
      tags: ["Security", "Encryption", "Authentication"],
      link: "#",
      icon: <Target size={24} />
    },
    {
      title: "Android E-commerce App",
      description: "Full-featured e-commerce application with payment integration",
      tags: ["Kotlin", "Android", "Payment Integration"],
      link: "#",
      icon: <Star size={24} />
    },
    {
      title: "Music Streaming App",
      description: "Android music streaming application with modern features",
      tags: ["Android", "Kotlin", "API Integration"],
      link: "#",
      icon: <Trophy size={24} />
    }
  ];

  const skills = [
    { category: "Mobile Development", items: ["Kotlin", "Android Studio", "UI/UX Design"] },
    { category: "Web Development", items: ["PHP (MVC)", "MySQL", "API Development"] },
    { category: "Cybersecurity", items: ["Penetration Testing", "OWASP", "Burp Suite", "Kali Linux"] },
    { category: "Game Development", items: ["Unity", "C#", "Game Design"] },
    { category: "Programming", items: ["Python", "C", "Object-Oriented Programming"] }
  ];

  const experiences = [
    {
      title: "Android Development Projects",
      description: "Developed multiple production-ready applications including Todo app, E-commerce platform, and Music streaming service",
      duration: "2022 - Present"
    },
    {
      title: "Product Management System",
      description: "Built a PHP-based admin system following MVC architecture principles",
      duration: "2023"
    },
    {
      title: "Cybersecurity Projects",
      description: "Conducted web penetration testing and vulnerability assessments",
      duration: "2022 - Present"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900`}>
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-indigo-600 transition-all duration-300 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Achievement Progress */}
      <div className="fixed right-4 top-20 space-y-2 z-40">
        {Array.from(achievementsUnlocked).map((achievement, index) => (
          <AchievementBadge key={index} type={achievement as string} />
        ))}
      </div>

      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">Brook</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">About</a>
              <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Projects</a>
              <a href="#skills" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Skills</a>
              <a href="#experience" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Experience</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Contact</a>
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none transform hover:rotate-12 transition-transform duration-300"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#about" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">About</a>
              <a href="#projects" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Projects</a>
              <a href="#skills" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Skills</a>
              <a href="#experience" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Experience</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block hover:scale-105 transition-transform duration-300">Hi, I'm Brook</span>
              <span className="block text-indigo-600 dark:text-indigo-400 hover:scale-105 transition-transform duration-300">Android Developer & Security Enthusiast</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              4th-year Computer Science student passionate about creating secure, user-friendly mobile applications
              and exploring the depths of cybersecurity.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a href="#contact" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 md:py-4 md:text-lg md:px-10 transform hover:scale-105 transition-transform duration-300">
                  Get in touch
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10 transform hover:scale-105 transition-transform duration-300">
                  <Download className="mr-2" size={20} /> Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Featured Projects</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">A selection of my recent work</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Skills & Expertise</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Technologies and tools I work with</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Experience</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">My professional journey</p>
          </div>
          <div className="mt-12 space-y-8">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} {...experience} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Get in Touch</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Interested in working together? Let's connect!</p>
          </div>
          <div className="mt-12 flex justify-center space-x-6">
            <a href="brookteklebrhan123@gmail.com" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transform hover:scale-110 transition-transform duration-300">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/brook-teklebrhan-687b11241?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transform hover:scale-110 transition-transform duration-300">
              <Linkedin size={24} />
            </a>
            <a href="brookteklebrhan123@gmail.com" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transform hover:scale-110 transition-transform duration-300">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 dark:text-gray-400">© 2024 Brook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;