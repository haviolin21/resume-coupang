import React, { useState, useEffect } from 'react';
import { resumeData } from './data/resumeData';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import ProjectCard from './components/ProjectCard';
import Education from './components/Education';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  // 1. 다크 모드 상태 관리
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 2. Scrollspy: 활성 네비게이션 감지
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || window.scrollY;
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 110; // 헤더 높이 70px + 마진 감안
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 로드 실행
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Intersection Observer: 스크롤 시 부드럽게 요소를 등장시키는 애니메이션
  useEffect(() => {
    const fadeElements = [
      ...document.querySelectorAll('.skill-card'),
      ...document.querySelectorAll('.timeline-item'),
      ...document.querySelectorAll('.project-detail-card'),
      ...document.querySelectorAll('.about-box'),
      ...document.querySelectorAll('.edu-card')
    ];

    fadeElements.forEach(el => {
      el.classList.add('fade-in-element');
    });

    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => {
      revealObserver.observe(el);
    });

    return () => revealObserver.disconnect();
  }, []);

  return (
    <div className="app-root">
      <Header theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} />

      <main>
        <Hero personalInfo={resumeData.personalInfo} />
        <About aboutData={resumeData.about} />
        <Skills skillsData={resumeData.skills} />
        <Experience experienceData={resumeData.experience} />

        {/* 프로젝트 상세 섹션 */}
        <section id="projects" className="section-padding bg-alt">
          <div className="container">
            <h2 className="section-title">주요 프로젝트</h2>
            <div className="project-grid">
              {resumeData.projects.map(proj => (
                <ProjectCard 
                  key={proj.id}
                  corp={proj.corp}
                  title={proj.title}
                  descShort={proj.descShort}
                  data={proj.data}
                />
              ))}
            </div>
          </div>
        </section>

        <Education educationData={resumeData.education} />
      </main>

      <Footer personalInfo={resumeData.personalInfo} />
    </div>
  );
}
