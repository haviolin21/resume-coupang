import React from 'react';
import './ProjectCard.css';

export default function ProjectCard({ corp, period, title, summaryBullets, onOpenDetail }) {
  return (
    <div className="project-card">
      <div className="project-card-header">
        <div className="project-corp-period">
          <span className="project-corp">{corp}</span>
          <span className="project-period">{period}</span>
        </div>
        <h3 className="project-title">{title}</h3>
      </div>
      
      <div className="project-card-body">
        <ul className="project-summary-list">
          {summaryBullets.map((bullet, idx) => (
            <li key={idx}>{bullet}</li>
          ))}
        </ul>
      </div>

      <div className="project-card-footer">
        <button className="btn-detail-link" onClick={onOpenDetail} aria-label={`${title} 프로젝트 상세 보기`}>
          자세히 보기 <span className="arrow">➔</span>
        </button>
      </div>
    </div>
  );
}
