import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, Briefcase, MapPin, User, Heart, 
  Sun, Moon, Download, ArrowRight, BarChart2, 
  ZoomIn, Settings, Users 
} from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import './App.css';

export default function App() {
  // 1. 다크 모드 상태 관리
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 2. Scrollspy: 활성 네비게이션 감지
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || window.scrollY;
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 110; // 헤더 높이 70px + 마진 감안
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 로드 실행
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Intersection Observer: 페이드인 스크롤 애니메이션
  useEffect(() => {
    const fadeElements = [
      ...document.querySelectorAll('.skill-card'),
      ...document.querySelectorAll('.timeline-item'),
      ...document.querySelectorAll('.project-detail-card'),
      ...document.querySelectorAll('.about-box'),
      ...document.querySelectorAll('.edu-card')
    ];

    fadeElements.forEach(el => {
      el.classList.add('fade-in-element');
    });

    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => {
      revealObserver.observe(el);
    });

    return () => revealObserver.disconnect();
  }, []);

  // 4. 프로젝트 데이터 목록
  const projectsData = [
    {
      id: 'ivr',
      corp: '김캐디 (2025.07 ~ 2025.09)',
      title: '예약 담당자 IVR 자동화 프로젝트',
      descShort: '운영 비효율 극복 및 24시간 예약 대응 체계 구축',
      data: {
        problem: {
          intro: '예약 담당자가 미운영되는 새벽 시간대에는 전화 예약 대응이 불가능하여 다음과 같은 심각한 비효율이 발생하고 있었습니다.',
          bullets: [
            '새벽 시간대 예약 요청 누락 및 이탈율 증가',
            '24시간 예약 체계를 수동으로 유지할 시 천문학적인 인건비 비효율 발생',
            '예약 대기 시간 증가에 따른 고객 불만 및 운영 리스크 확대'
          ]
        },
        execution: {
          bullets: [
            '<strong>데이터 분석</strong>: 시간대별 예약 성공률 및 결제 데이터를 추출하여 병목 구간과 새벽 시간대 실수요 분석',
            '<strong>시스템 설계</strong>: 기존 사람 중심의 예약 운영 구조를 IVR(대화형 음성 응답) 자동화 방식으로 과감히 전환 기획',
            '<strong>시나리오 최적화</strong>: 예약 수락/거절 자동 응답 시나리오 설계 및 예외 케이스 처리 프로세스 정비',
            '<strong>수용성 검증</strong>: 파일럿 테스트 진행 및 예약 고객 인터뷰를 통한 IVR 서비스 수용성 파악',
            '<strong>시스템 구축</strong>: 개발팀과의 긴밀한 협업을 통해 시스템을 연동하고 실시간 모니터링용 성과 대시보드 구축'
          ]
        },
        result: {
          stats: [
            { label: '미운영 예약 성공률', value: '50% → 70% (+20%)' },
            { label: '인건비 절감 효과', value: '연 2억 → 월 200만 (IVR 비용)' },
            { label: '전체 예약 증가', value: '+5% 기여' }
          ],
          summary: '기존 수동 예약 체계의 누락을 시스템으로 해결함으로써 비용 절감과 고객 만족을 동시에 만족시켰습니다. 24시간 예약 대응 체계가 안정적으로 구축되었습니다.'
        },
        contribution: '운영 리스크가 높은 기존의 예약 구조를 데이터 기반으로 진단하고, 사람 중심 운영에서 시스템 중심의 자동화 운영 구조로 전환하여 <strong>비용 절감과 운영 효율 개선을 동시에 달성</strong>했습니다.'
      }
    },
    {
      id: 'pay',
      corp: '중고나라 (2023.04 ~ 2023.12)',
      title: '중고나라 페이 결제액 2.4배 성장 프로젝트',
      descShort: '사용자 행동 데이터 분석을 통한 결제 퍼널 개선',
      data: {
        problem: {
          intro: '중고나라 페이의 결제 성장이 정체되고 있는 근본 원인을 찾고자 했습니다. 사용자 행동 데이터를 뜯어본 결과, 다음과 같은 주요 허들을 발견했습니다.',
          bullets: [
            '결제 퍼널(탐색 - 채팅 - 결제) 각 단계에서의 급격한 사용자 이탈',
            '거래 규모의 핵심을 담당하는 고가치 사용자(상위 판/구매자)에 대한 맞춤형 혜택 및 관리 부재',
            '모바일 웹과 앱 간의 부자연스러운 사용자 이동 경로'
          ]
        },
        execution: {
          bullets: [
            '<strong>퍼널 정밀 분석</strong>: SQL을 이용해 각 전환 구간별 이탈률을 모니터링하고 특히 \'채팅 단계\'의 이탈 원인을 세부 분석',
            '<strong>채팅-앱 유입 개선</strong>: 모바일 카페 채팅 도중 앱으로 즉각 랜딩할 수 있는 \'카페 채팅 앱 유도\' 기능 기획 및 런칭',
            '<strong>핵심 세그먼트 관리</strong>: 거래액, 거래 횟수, 판매 응답 속도 등을 반영한 스코어링 모델을 통해 고가치 판/구매자 세그먼트 구축 및 전담 케어',
            '<strong>프로모션 효율 분석</strong>: 수수료 감면 등 주요 수수료 할인 이벤트를 적재적소에 기획하고, 이벤트 종료 후 ROI 성과 측정 리포트 자동화',
            '<strong>대시보드 운영</strong>: 팀 내 실시간 결제 성과와 주요 운영 지표를 한눈에 볼 수 있는 통합 BI 대시보드 구축'
          ]
        },
        result: {
          stats: [
            { label: '페이 결제액', value: '2.4배 성장' },
            { label: '채팅 유도 거래액', value: '월 3,600만 → 8.4억' },
            { label: '상위 유저 거래액', value: '약 20% 상승' }
          ],
          summary: '정교한 데이터 분석을 바탕으로 퍼널 상의 핵심 이탈 원인이었던 채팅 단계를 성공적으로 개선하여 2023년 창사 이래 최고 결제액을 달성하는 결실을 얻었습니다.'
        },
        contribution: '결제 퍼널 분석을 통해 이탈 구간을 도출하여 제품 기획에 반영하고, 고가치 사용자 관리 및 데이터 기반 프로모션 ROI 관리를 통해 <strong>실질적인 결제 비즈니스 지표 성장을 주도</strong>했습니다.'
      }
    },
    {
      id: 'sync',
      corp: '중고나라 (2022.03 ~ 2022.12)',
      title: '중고나라 카페–앱 연동 프로젝트',
      descShort: '1,900만 카페 유저의 앱 유입 최적화 및 상품 활성화',
      data: {
        problem: {
          intro: '중고나라 모바일 앱의 활성화(MAU) 및 거래 규모 성장을 위해서는 상품 수 확보와 신규 회원 유입이 시급한 과제였습니다.',
          bullets: [
            '1,900만 명에 달하는 네이버 카페 회원이 앱으로 넘어오지 않고 카페에 고착화되어 있는 문제',
            '카페 회원의 연동 절차가 복잡하여 전환 병목 발생',
            '앱 내부 상품 등록 수 부족으로 인한 거래 탐색 만족도 저하'
          ]
        },
        execution: {
          bullets: [
            '<strong>연동 프로세스 단순화</strong>: 복잡했던 카페-앱 계정 연동 신청 절차를 백오피스 자동화 처리를 통해 심플한 연동 신청 페이지로 기획',
            '<strong>데이터 기반 LTV 분석</strong>: 연동된 회원과 비연동 회원 간의 활동 패턴, 리텐션, 가치를 SQL로 분석하여 가치 증명',
            '<strong>리워드 이벤트 실행</strong>: 연동 시 스타벅스 쿠폰 제공 등 초기 트리거를 마련하고, 상품 등록 단계별로 보상을 주는 게임형 프로모션 설계',
            '<strong>지표 모니터링</strong>: 연동 회원 유입 추이, 신규 등록 상품 수, 결제 전환율 지표 등을 매일 추적할 수 있는 자동화 모니터링 환경을 정착시켰습니다.'
          ]
        },
        result: {
          stats: [
            { label: '앱 회원 수', value: '1.6배 증가' },
            { label: '상품 등록 수', value: '2배 증가' },
            { label: '일평균 상품수', value: '5.5천 → 10.4천 건' }
          ],
          summary: '연동을 완료한 회원은 일반 회원보다 약 20% 높은 활동 지표를 보였으며, 이들이 등록한 상품수가 앱 전체 등록 수의 60%를 점유하며 앱 활성화의 견인차 역할을 수행했습니다.'
        },
        contribution: '카페 사용자의 인앱 유입 마찰을 줄이는 연동 신청 프로세스를 설계하고, 데이터 분석에 기반한 이벤트 보상 체계 설계를 통해 <strong>플랫폼의 핵심 공급(상품 등록)과 유입(회원 수)을 대폭 확대</strong>했습니다.'
      }
    }
  ];

  return (
    <div className="app-root">
      {/* 상단 네비게이션 바 */}
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
            <a href="/resume_yuntaek.pdf" download="하윤택_이력서.pdf" class="btn btn-primary btn-sm">
              <Download size={15} />
              <span>이력서 다운로드</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* 히어로 섹션 */}
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
                  <h2>하윤택</h2>
                  <p>Operations & BizOps Manager</p>
                </div>
                <ul className="profile-contact-list">
                  <li>
                    <Phone size={18} className="accent-color" />
                    <a href="tel:010-4795-3330">010-4795-3330</a>
                  </li>
                  <li>
                    <Mail size={18} className="accent-color" />
                    <a href="mailto:yuntaek.ha@gmail.com">yuntaek.ha@gmail.com</a>
                  </li>
                  <li>
                    <Briefcase size={18} className="accent-color" />
                    <span>총 경력 7년 (Operations)</span>
                  </li>
                  <li>
                    <MapPin size={18} className="accent-color" />
                    <span>서울, 대한민국</span>
                  </li>
                </ul>
                <div className="profile-footer">
                  <span className="tech-tag">SQL</span>
                  <span className="tech-tag">Redshift</span>
                  <span className="tech-tag">QuickSight</span>
                  <span className="tech-tag">Looker Studio</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 자기 소개 & 지원 동기 */}
        <section id="about" className="section-padding">
          <div className="container">
            <h2 className="section-title">소개 및 포부</h2>
            <div className="grid grid-2-col">
              <div className="about-box text-card">
                <div className="about-icon-header">
                  <User className="accent-color" size={28} />
                  <h3>자기 소개</h3>
                </div>
                <p>
                  예약·결제·정산·CS·운영 정책 전반을 경험하며, 운영 현장에서 발생하는 병목과 비효율을 데이터 기반으로 분석하고 실제 운영 개선으로 연결해왔습니다.
                  특히 반복적으로 발생하는 운영 이슈를 단순 대응하는 것이 아니라, 운영 프로세스·정책·데이터를 함께 연결해 지속 가능한 운영 구조로 개선하는 데 강점이 있습니다.
                </p>
                <p>
                  중고나라에서는 결제 퍼널 및 핵심 사용자 데이터를 분석하여 결제 전환율과 결제액 성장 프로젝트를 수행했으며, 김캐디에서는 IVR 자동화 및 운영 프로세스 개선 프로젝트를 통해 연간 약 2억 원 수준의 운영 비용 절감과 24시간 예약 대응 체계를 구축하며 운영 효율과 고객 경험을 함께 개선했습니다.
                </p>
                <p>
                  실무에서는 SQL 기반 데이터 추출 및 분석 업무를 수행했으며, QuickSight·Looker Studio 등 BI 툴을 활용해 운영 KPI 대시보드 및 자동화 리포트를 구축하여 유관 부서와의 명확한 데이터 기반 소통을 주도했습니다.
                </p>
              </div>
              
              <div className="about-box text-card">
                <div className="about-icon-header">
                  <Heart className="accent-color" size={28} />
                  <h3>지원 동기</h3>
                </div>
                <p>
                  과거 쿠팡에서 근무하며 빠른 실행과 데이터 기반 의사결정, 그리고 고객 경험 개선을 위해 운영 문제를 구조적으로 해결해 나가는 업무 방식을 경험했습니다. 이후 더 넓은 문제 해결 역량을 갖추고 싶다는 생각으로 개발과 데이터 분석을 학습하고, 다양한 플랫폼 환경에서 운영·데이터·프로세스 개선 경험을 쌓아왔습니다.
                </p>
                <p>
                  중고나라와 김캐디에서 반복적인 운영 이슈에 단순 대응하는 것이 아닌, 데이터를 기반으로 원인을 분석하고 실제 운영 구조 개선으로 연결하는 성과를 거두었습니다.
                </p>
                <p className="highlight-text">
                  이번 포지션은 운영 데이터를 기반으로 현장의 생산성과 품질을 개선하고, 더 나은 고객 경험으로 연결하는 역할이라는 점에서 지금까지 제가 쌓아온 경험과 가장 강력하게 맞닿아 있다고 생각합니다. 쿠팡의 고객 중심 문화 속에서 데이터와 실행력을 기반으로 운영 효율과 고객 경험을 함께 개선하는 Operations Excellence 역할에 기여하고 싶습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 핵심 역량 */}
        <section id="skills" className="section-padding bg-alt">
          <div className="container">
            <h2 class="section-title">핵심 역량</h2>
            <div className="grid grid-2-col">
              
              <div className="skill-card">
                <div className="skill-icon-wrapper">
                  <BarChart2 size={24} />
                </div>
                <div className="skill-content">
                  <h3>운영 데이터 분석 및 프로세스 개선</h3>
                  <ul>
                    <li>SQL 기반 운영 데이터 추출 및 정밀 분석 경험</li>
                    <li>운영 성과 데이터 분석 및 병목 구간 도출</li>
                    <li>운영 프로세스 개선 및 자동화 기획</li>
                    <li>운영 대시보드 및 자동화 리포트 구축 경험</li>
                  </ul>
                  <div className="skill-badges">
                    <span className="badge badge-tool">SQL</span>
                    <span className="badge badge-tool">Redshift</span>
                    <span class="badge badge-tool">SuperSet</span>
                    <span class="badge badge-tool">Spreadsheet</span>
                  </div>
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-icon-wrapper">
                  <ZoomIn size={24} />
                </div>
                <div className="skill-content">
                  <h3>데이터 기반 문제 해결</h3>
                  <ul>
                    <li>퍼널·코호트·LTV 기반 서비스 분석 경험</li>
                    <li>운영 데이터 기반 Root Cause (근본 원인) 분석</li>
                    <li>데이터 기반 운영 개선 액션 도출 및 적용</li>
                    <li>GA4·AppsFlyer·QuickSight·Looker Studio 활용</li>
                  </ul>
                  <div className="skill-badges">
                    <span className="badge badge-tool">GA4</span>
                    <span className="badge badge-tool">AppsFlyer</span>
                    <span className="badge badge-tool">QuickSight</span>
                    <span className="badge badge-tool">Looker Studio</span>
                  </div>
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-icon-wrapper">
                  <Settings size={24} />
                </div>
                <div className="skill-content">
                  <h3>플랫폼 운영 및 정책 기획</h3>
                  <ul>
                    <li>예약·결제·정산·CS·운영 정책 운영 및 고도화</li>
                    <li>운영 관점의 정책 수립 및 프로세스 개선</li>
                    <li>B2C·C2C·O2O 등 다양한 플랫폼 구조 경험</li>
                  </ul>
                  <div className="skill-badges">
                    <span className="badge badge-tool">B2C</span>
                    <span className="badge badge-tool">C2C</span>
                    <span className="badge badge-tool">O2O</span>
                    <span className="badge badge-tool">Backoffice</span>
                  </div>
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-icon-wrapper">
                  <Users size={24} />
                </div>
                <div className="skill-content">
                  <h3>협업 및 커뮤니케이션</h3>
                  <ul>
                    <li>운영·개발·기획·CS 조직 간 밀접한 협업 경험</li>
                    <li>데이터 기반 객관적 커뮤니케이션 및 의사결정 지원</li>
                    <li>다양한 이해관계자 조율 및 실행 리드</li>
                  </ul>
                  <div className="skill-badges">
                    <span className="badge badge-tool">Slack</span>
                    <span className="badge badge-tool">Jira</span>
                    <span className="badge badge-tool">Confluence</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 경력 사항 (Timeline) */}
        <section id="experience" class="section-padding">
          <div className="container">
            <h2 className="section-title">
              경력 사항 <span className="subtitle">(총 경력 7년)</span>
            </h2>
            <div className="timeline">
              
              {/* 김캐디 */}
              <div className="timeline-item">
                <div className="timeline-badge"></div>
                <div className="timeline-panel">
                  <div className="timeline-header">
                    <span className="period">2025.06 – 2026.02 (9개월)</span>
                    <h3>김캐디 <span className="position">| 리드 (운영팀)</span></h3>
                  </div>
                  <div className="timeline-body">
                    <h4>주요 업무</h4>
                    <ul className="task-list">
                      <li>운영 데이터 및 VOC 분석 기반 서비스 개선 과제 도출</li>
                      <li>예약·CS 운영 프로세스 분석 및 자동화 과제 도출</li>
                      <li>개발 조직 협업 기반 운영 시스템 및 기능 개선 기획·운영</li>
                      <li>운영 현황 모니터링 및 대시보드 기반 이슈 관리 체계 구축</li>
                      <li>정산·지급대행·세금계산서 등 백오피스 운영 프로세스 안정화</li>
                    </ul>
                    <h4>주요 성과</h4>
                    <ul className="achievement-list">
                      <li className="highlight-achievement">
                        IVR 기반 예약 자동화 프로젝트 기획 및 도입 → <strong>연간 약 2억 원 수준 운영 비용 절감</strong> 및 24시간 예약 대응 체계 구축
                      </li>
                      <li>반복 업무 자동화 및 운영 프로세스 최적화를 통해 <strong>콜 CS 응대율 평균 10% → 80%로 개선</strong></li>
                      <li>운영 정책·프로세스 개선 과제 정의 및 기획–개발–적용 전 과정 리드</li>
                    </ul>
                    <div className="used-tools">
                      <span className="tool-tag">SuperSet</span>
                      <span className="tool-tag">Amazon Redshift</span>
                      <span className="tool-tag">채널톡</span>
                      <span className="tool-tag">센터플로우</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 중고나라 */}
              <div className="timeline-item">
                <div className="timeline-badge"></div>
                <div className="timeline-panel">
                  <div className="timeline-header">
                    <span className="period">2022.03 – 2024.04 (2년 2개월)</span>
                    <h3>중고나라 <span className="position">| 매니저 (결제제휴사업팀)</span></h3>
                  </div>
                  <div className="timeline-body">
                    <h4>주요 업무</h4>
                    <ul className="task-list">
                      <li>SQL 기반 결제·사용자 데이터 추출 및 운영 지표 분석 리포트 작성</li>
                      <li>결제 지표 대시보드 구축 및 모니터링 체계 운영</li>
                      <li>중고나라 페이 서비스 및 결제 프로세스 운영, 이벤트 기획 및 성과 분석</li>
                      <li>결제 퍼널 및 사용자 행동 분석 기반 전환 개선 과제 도출</li>
                      <li>이상 거래 모니터링 및 운영 정책 개선</li>
                    </ul>
                    <h4>주요 성과</h4>
                    <ul className="achievement-list">
                      <li className="highlight-achievement">
                        결제 퍼널 및 핵심 사용자 세그먼트 분석 기반 전환 개선 프로젝트 수행 → <strong>중고나라 페이 결제액 2.4배 성장</strong> 및 2023년 최고 결제액 달성
                      </li>
                      <li>
                        카페–앱 채팅 유도 기능 개선을 통해 결제 규모를 <strong>월 3,600만 원 수준에서 8.4억 원까지 성장</strong> (23년 4월 대비 11월 기준)
                      </li>
                      <li>
                        카페–앱 연동 프로젝트를 통해 <strong>NRU 1.6배 증가 및 상품 등록 수 2배 증가</strong> (22년 상품 등록 KPI 140% 초과 달성)
                      </li>
                      <li>사기 채팅 키워드 탐지 정책 적용을 통해 <strong>사기 피해 건수 약 60% 감소</strong></li>
                    </ul>
                    <div className="used-tools">
                      <span className="tool-tag">MySQL</span>
                      <span className="tool-tag">PostgreSQL</span>
                      <span className="tool-tag">Redshift</span>
                      <span className="tool-tag">Looker Studio</span>
                      <span className="tool-tag">QuickSight</span>
                      <span className="tool-tag">AppsFlyer</span>
                      <span className="tool-tag">GA4</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 브랜즈컴퍼니 */}
              <div className="timeline-item">
                <div className="timeline-badge"></div>
                <div className="timeline-panel">
                  <div className="timeline-header">
                    <span className="period">2021.05 - 2022.01 (9개월)</span>
                    <h3>브랜즈컴퍼니㈜ <span className="subtitle">(전.스카이랩㈜)</span> <span className="position">| 팀장 (마케팅기획)</span></h3>
                  </div>
                  <div className="timeline-body">
                    <h4>주요 업무</h4>
                    <ul className="task-list">
                      <li>쿠팡 로켓배송 채널 운영 및 판매 프로세스 관리</li>
                      <li>판매 데이터 기반 발주·재고 운영 전략 수립</li>
                      <li>매출 및 판매 데이터 분석 리포트 작성</li>
                      <li>재고 흐름 및 물류 운영 현황 모니터링</li>
                    </ul>
                    <h4>주요 성과</h4>
                    <ul className="achievement-list">
                      <li className="highlight-achievement">
                        쿠팡 로켓배송 채널 운영 최적화를 통해 <strong>월 평균 10% 이상 매출 성장</strong>
                      </li>
                      <li>
                        판매 데이터 기반 발주 전략 개선을 통해 <strong>재고 안정화 및 품절·과재고 리스크 감소</strong>
                      </li>
                      <li>판매 상품 라인업 확대를 통해 <strong>상품 수 약 37% 증가</strong></li>
                    </ul>
                    <div className="used-tools">
                      <span className="tool-tag">Coupang Wing</span>
                      <span className="tool-tag">Excel</span>
                      <span className="tool-tag">Inventory Analysis</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 쿠팡 */}
              <div className="timeline-item">
                <div className="timeline-badge"></div>
                <div className="timeline-panel">
                  <div className="timeline-header">
                    <span class="period">2020.04 - 2020.08 (5개월)</span>
                    <h3>쿠팡(주) <span className="position">| L4 (Pricing Operation)</span></h3>
                  </div>
                  <div className="timeline-body">
                    <h4>주요 업무</h4>
                    <ul className="task-list">
                      <li>리테일 프라이싱 채널 운영 및 가격 정책 관리</li>
                      <li>카테고리별 가격 정책 운영 및 예외 케이스 대응</li>
                      <li>가격 이슈 분석 및 유관 부서 협업 기반 운영 개선 지원</li>
                      <li>SQL 기반 운영 데이터 추출 및 가격 정책 모니터링 지원</li>
                    </ul>
                    <h4>주요 성과</h4>
                    <ul className="achievement-list">
                      <li className="highlight-achievement">
                        코로나 시기 <strong>KF·덴탈 마스크 가격 운영 정책 및 예외 대응 프로세스 운영</strong>으로 수급 안정 기여
                      </li>
                      <li>블랙셀러·화이트셀러 대응 기준 정립 및 예외 프로세스 개선을 통한 가격 비교 운영 안정화</li>
                      <li>SQL 기반 데이터 분석을 통한 가격 예외 처리 운영 업무 효율 개선</li>
                    </ul>
                    <div className="used-tools">
                      <span className="tool-tag">SQL</span>
                      <span className="tool-tag">Pricing Engines</span>
                      <span className="tool-tag">Internal Admin</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 위메프 */}
              <div className="timeline-item">
                <div className="timeline-badge"></div>
                <div className="timeline-panel">
                  <div className="timeline-header">
                    <span className="period">2017.12 - 2020.03 (2년 4개월)</span>
                    <h3>(주)위메프 <span className="position">| 사원 (판촉운영팀)</span></h3>
                  </div>
                  <div className="timeline-body">
                    <h4>주요 업무</h4>
                    <ul className="task-list">
                      <li>식품 카테고리 가격 비교 판촉 운영 및 거래액·마진 관리</li>
                      <li>판매 데이터 기반 판촉 상품 선정 및 노출 전략 운영</li>
                      <li>식품 카테고리 매출 데이터 분석 및 리포트 작성</li>
                      <li>매출 상위 SKU 중심 판매 전략 및 판촉 ROI 분석</li>
                    </ul>
                    <h4>주요 성과</h4>
                    <ul className="achievement-list">
                      <li className="highlight-achievement">
                        거래액 상위 20% TOP SKU 중심 판촉 전략 운영을 통해 <strong>판촉 효율 및 매출 성과 개선</strong>
                      </li>
                      <li>가격 비교 원부 프로젝트 수행 및 사이트 내 가격 비교 기능 구축 지원</li>
                      <li>
                        데이터 기반 가격 비교 판촉 운영을 통해 <strong>식품 카테고리 1위 및 GMV·CM 목표 달성</strong>
                      </li>
                    </ul>
                    <div className="used-tools">
                      <span className="tool-tag">Excel</span>
                      <span className="tool-tag">Promotion Analytics</span>
                      <span className="tool-tag">Price Matching</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 프로젝트 상세 섹션 */}
        <section id="projects" className="section-padding bg-alt">
          <div className="container">
            <h2 className="section-title">주요 프로젝트</h2>
            <div className="project-grid">
              {projectsData.map(proj => (
                <ProjectCard 
                  key={proj.id}
                  corp={proj.corp}
                  title={proj.title}
                  descShort={proj.descShort}
                  data={proj.data}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 학력 및 교육 사항 */}
        <section id="education" className="section-padding">
          <div className="container">
            <h2 className="section-title">학력 및 교육</h2>
            <div className="edu-grid">
              
              <div className="edu-card">
                <span className="edu-period">2010.03 ~ 2016.08</span>
                <div className="edu-info">
                  <h3>상명대학교 (천안)</h3>
                  <p>금융경영학과 | 학사 졸업</p>
                </div>
              </div>

              <div className="edu-card">
                <span className="edu-period">2020.12 ~ 2021.04</span>
                <div className="edu-info">
                  <h3>코드스테이츠 (Code States)</h3>
                  <p>Software Engineering Full-Stack 과정 수료</p>
                  <p className="edu-detail">React, Node.js, MySQL 기반 웹 서비스 구조 이해 및 Git 협업 프로젝트 수행</p>
                </div>
              </div>

              <div className="edu-card">
                <span className="edu-period">2025.02 ~ 2025.03</span>
                <div className="edu-info">
                  <h3>Codeit (코드잇)</h3>
                  <p>빅데이터 분석 과정 수료</p>
                  <p className="edu-detail">Python, Pandas 기반 데이터 전처리 실습 및 시각화 리포트 작성</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* 하단 푸터 및 컨택 영역 */}
      <footer id="contact">
        <div className="container">
          <div className="footer-cta">
            <h2>함께 Operations Excellence를 실현할 파트너를 찾으시나요?</h2>
            <p>언제든 연락해 주세요. 데이터 기반의 빠른 실행력으로 운영 비효율을 해결하겠습니다.</p>
            <div className="cta-buttons">
              <a href="mailto:yuntaek.ha@gmail.com" className="btn btn-primary">
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
            <p className="copyright">&copy; 2026 Ha Yun-taek. All Rights Reserved. Inspired by Coupang Jobs.</p>
            <div className="footer-contact-info">
              <span><Phone size={14} className="footer-icon" /> 010-4795-3330</span>
              <span><Mail size={14} className="footer-icon" /> yuntaek.ha@gmail.com</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
