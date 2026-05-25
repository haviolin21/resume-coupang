import React from 'react';
import { Phone, Mail, Briefcase, MapPin, Download, ArrowRight } from 'lucide-react';

export default function Hero({ personalInfo }) {
  return (
    <section id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <span className="badge badge-accent">Operations Excellence</span>
          <h1>
            데이터와 자동화로<br />
            <span className="highlight">지속 가능한 운영 구조</span>를 만듭니다
          </h1>
          <p className="hero-lead">
            위메프, 쿠팡, 중고나라, 김캐디 등 다양한 플랫폼 환경에서 운영 데이터 분석과 프로세스 개선 업무를 수행해왔습니다. 
            단순 반복 업무 대응을 넘어 비효율의 근본 원인을 데이터로 진단하고 시스템 중심의 자동화 구조로 개선합니다.
          </p>
          <div className="hero-actions-group">
            <a href="/resume_yuntaek.pdf" download="하윤택_이력서.pdf" className="btn btn-lg btn-primary">
              <Download size={18} />
              <span>이력서 다운로드 (PDF)</span>
            </a>
            <a href="#projects" className="btn btn-lg btn-outline">
              <span>프로젝트 보기</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
        
        <div className="hero-card">
          <div className="card-profile-info">
            <div className="profile-header">
              <h2>{personalInfo.name}</h2>
              <p>{personalInfo.role}</p>
            </div>
            <ul class="profile-contact-list">
              <li>
                <Phone size={18} className="accent-color" />
                <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
              </li>
              <li>
                <Mail size={18} className="accent-color" />
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              </li>
              <li>
                <Briefcase size={18} className="accent-color" />
                <span>{personalInfo.experienceYears}</span>
              </li>
              <li>
                <MapPin size={18} className="accent-color" />
                <span>{personalInfo.location}</span>
              </li>
            </ul>
            <div className="profile-footer">
              {personalInfo.tags.map((tag, idx) => (
                <span className="tech-tag" key={idx}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
