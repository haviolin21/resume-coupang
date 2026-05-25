import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
  const { corp, period, title, modalData } = project;

  // ESC 키로 모달 닫기 및 body 스크롤 차단
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // 오버레이 영역 클릭 시 닫기
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose} aria-label="모달 닫기">
          <X size={24} />
        </button>

        <div className="modal-header">
          <div className="modal-corp-period">
            <span className="modal-corp">{corp}</span>
            <span className="modal-period">{period}</span>
          </div>
          <h2 className="modal-title">{title}</h2>
        </div>

        <div className="modal-content">
          {/* 좌측 영역: 문제 정의 및 실행 결과 */}
          <div className="modal-left">
            <h3 className="modal-section-title">문제 정의 및 실행 결과</h3>
            <div className="modal-cards">
              <div className="modal-card problem">
                <div className="card-badge">Problem</div>
                <h4 className="card-title">문제 (Problem)</h4>
                <p className="card-text">{modalData.problem}</p>
              </div>

              <div className="modal-card action">
                <div className="card-badge">Action</div>
                <h4 className="card-title">실행 (Action)</h4>
                <p className="card-text">{modalData.execution}</p>
              </div>

              <div className="modal-card result">
                <div className="card-badge">Result</div>
                <h4 className="card-title">결과 (Result)</h4>
                <p className="card-text">{modalData.result}</p>
              </div>
            </div>
          </div>

          {/* 우측 영역: 상세 내용 */}
          <div className="modal-right">
            <h3 className="modal-section-title">상세 내용</h3>
            <div className="detail-paragraphs-scroll">
              {modalData.detailParagraphs.map((para, idx) => (
                <p key={idx} className="detail-paragraph">{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
