import React from 'react';

export default function Experience({ experienceData }) {
  return (
    <section id="experience" className="section-padding">
      <div className="container">
        <h2 className="section-title">
          경력 사항 <span className="subtitle">(총 경력 7년)</span>
        </h2>
        <div className="timeline">
          {experienceData.map(exp => (
            <div className="timeline-item" key={exp.id}>
              <div className="timeline-badge"></div>
              <div className="timeline-panel">
                <div className="timeline-header">
                  <span className="period">{exp.period}</span>
                  <h3>
                    {exp.company}
                    {exp.companySuffix && <span className="subtitle"> {exp.companySuffix}</span>}
                    <span className="position"> | {exp.role}</span>
                  </h3>
                </div>
                <div className="timeline-body">
                  <h4>주요 업무</h4>
                  <ul className="task-list">
                    {exp.tasks.map((task, idx) => (
                      <li key={idx}>{task}</li>
                    ))}
                  </ul>
                  <h4>주요 성과</h4>
                  <ul className="achievement-list">
                    {exp.achievements.map((ach, idx) => (
                      <li 
                        key={idx} 
                        className={idx === 0 ? "highlight-achievement" : ""}
                        dangerouslySetInnerHTML={{ __html: ach }}
                      />
                    ))}
                  </ul>
                  <div className="used-tools">
                    {exp.tools.map((tool, idx) => (
                      <span className="tool-tag" key={idx}>{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
