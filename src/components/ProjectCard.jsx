import React, { useState } from 'react';

export default function ProjectCard({ corp, title, descShort, data }) {
  const [activeTab, setActiveTab] = useState('problem');

  return (
    <div className="project-detail-card">
      <div className="project-card-header">
        <span className="project-corp">{corp}</span>
        <h3>{title}</h3>
        <p className="project-desc-short">{descShort}</p>
      </div>
      
      {/* 탭 컨트롤 */}
      <div className="project-tabs">
        <button 
          className={`tab-link ${activeTab === 'problem' ? 'active' : ''}`} 
          onClick={() => setActiveTab('problem')}
        >
          문제 정의
        </button>
        <button 
          className={`tab-link ${activeTab === 'execution' ? 'active' : ''}`} 
          onClick={() => setActiveTab('execution')}
        >
          실행 내용
        </button>
        <button 
          className={`tab-link ${activeTab === 'result' ? 'active' : ''}`} 
          onClick={() => setActiveTab('result')}
        >
          수행 결과
        </button>
        <button 
          className={`tab-link ${activeTab === 'contribution' ? 'active' : ''}`} 
          onClick={() => setActiveTab('contribution')}
        >
          핵심 기여
        </button>
      </div>

      {/* 탭 콘텐츠 본문 */}
      <div className="project-tab-content">
        {activeTab === 'problem' && (
          <div className="tab-pane active">
            <p>{data.problem.intro}</p>
            <ul>
              {data.problem.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'execution' && (
          <div className="tab-pane active">
            <ul>
              {data.execution.bullets.map((bullet, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: bullet }} />
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'result' && (
          <div className="tab-pane active">
            <div className="stat-highlight-grid">
              {data.result.stats.map((stat, idx) => (
                <div className="stat-item" key={idx}>
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                </div>
              ))}
            </div>
            <p className="result-text">{data.result.summary}</p>
          </div>
        )}

        {activeTab === 'contribution' && (
          <div className="tab-pane active">
            <p className="contribution-quote" dangerouslySetInnerHTML={{ __html: data.contribution }} />
          </div>
        )}
      </div>
    </div>
  );
}
