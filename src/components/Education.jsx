import React from 'react';
import './Education.css';

export default function Education({ educationData }) {
  return (
    <section id="education" className="section-padding">
      <div className="container">
        <h2 className="section-title">학력 및 교육</h2>
        <div className="edu-grid">
          {educationData.map((edu, idx) => (
            <div className="edu-card" key={idx}>
              <span className="edu-period">{edu.period}</span>
              <div className="edu-info">
                <h3>{edu.institution}</h3>
                <p>{edu.degree}</p>
                {edu.detail && <p className="edu-detail">{edu.detail}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
