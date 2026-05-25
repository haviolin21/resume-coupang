import React from 'react';
import * as Icons from 'lucide-react';

export default function Skills({ skillsData }) {
  return (
    <section id="skills" className="section-padding bg-alt">
      <div className="container">
        <h2 className="section-title">핵심 역량</h2>
        <div className="grid grid-2-col">
          {skillsData.map(skill => {
            // 동적 아이콘 해석
            const Icon = Icons[skill.iconName] || Icons.HelpCircle;
            
            return (
              <div className="skill-card" key={skill.id}>
                <div className="skill-icon-wrapper">
                  <Icon size={24} />
                </div>
                <div className="skill-content">
                  <h3>{skill.title}</h3>
                  <ul>
                    {skill.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="skill-badges">
                    {skill.tools.map((tool, idx) => (
                      <span className="badge badge-tool" key={idx}>{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
