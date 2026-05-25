import React from 'react';
import { Sun, Moon, Download } from 'lucide-react';
import './Header.css';

export default function Header({ theme, toggleTheme, activeSection }) {
  return (
    <header id="main-header">
      <div className="header-container">
        <a href="#" className="logo">
          <span className="logo-yuntaek">YUNTAEK</span>
          <span className="logo-jobs">JOBS</span>
        </a>
        <nav className="nav-menu">
          <ul>
            <li>
              <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>자기소개</a>
            </li>
            <li>
              <a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}>핵심역량</a>
            </li>
            <li>
              <a href="#experience" className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}>경력사항</a>
            </li>
            <li>
              <a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>프로젝트</a>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          {/* 다크모드 토글 버튼 */}
          <button onClick={toggleTheme} aria-label="테마 전환" className="icon-btn">
            {theme === 'dark' ? (
              <Sun size={20} color="#FBBF24" />
            ) : (
              <Moon size={20} color="#1E293B" />
            )}
          </button>
          {/* 이력서 다운로드 */}
          <a href="/resume_yuntaek.pdf" download="하윤택_이력서.pdf" className="btn btn-primary btn-sm">
            <Download size={15} />
            <span>이력서 다운로드</span>
          </a>
        </div>
      </div>
    </header>
  );
}
