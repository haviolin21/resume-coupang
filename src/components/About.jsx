import React from 'react';
import { User, Heart } from 'lucide-react';
import './About.css';

export default function About({ aboutData }) {
  return (
    <section id="about" className="section-padding">
      <div className="container">
        <h2 className="section-title">소개 및 포부</h2>
        <div className="grid grid-2-col">
          <div className="about-box text-card">
            <div className="about-icon-header">
              <User className="accent-color" size={28} />
              <h3>{aboutData.intro.title}</h3>
            </div>
            {aboutData.intro.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
          
          <div className="about-box text-card">
            <div className="about-icon-header">
              <Heart className="accent-color" size={28} />
              <h3>{aboutData.motivation.title}</h3>
            </div>
            {aboutData.motivation.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            <p className="highlight-text">{aboutData.motivation.highlight}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
