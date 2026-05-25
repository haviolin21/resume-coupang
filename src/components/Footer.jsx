import React from 'react';
import { Mail, Phone, Download } from 'lucide-react';
import './Footer.css';

export default function Footer({ personalInfo }) {
  return (
    <footer id="contact">
      <div className="container">
        <div className="footer-cta">
          <h2>함께 Operations Excellence를 실현할 파트너를 찾으시나요?</h2>
          <p>언제든 연락해 주세요. 데이터 기반의 빠른 실행력으로 운영 비효율을 해결하겠습니다.</p>
          <div className="cta-buttons">
            <a href={`mailto:${personalInfo.email}`} className="btn btn-primary">
              <Mail size={18} />
              <span>이메일 보내기</span>
            </a>
            <a href="/resume_yuntaek.pdf" download="하윤택_이력서.pdf" className="btn btn-outline-white">
              <Download size={18} />
              <span>이력서 다운로드 (PDF)</span>
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">&copy; 2026 {personalInfo.name}. All Rights Reserved. Inspired by Coupang Jobs.</p>
          <div className="footer-contact-info">
            <span><Phone size={14} className="footer-icon" /> {personalInfo.phone}</span>
            <span><Mail size={14} className="footer-icon" /> {personalInfo.email}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
