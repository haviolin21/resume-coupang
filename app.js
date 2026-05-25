document.addEventListener('DOMContentLoaded', () => {
  // 1. Feather Icons 초기화
  if (typeof feather !== 'undefined') {
    feather.replace();
  }

  // 2. 다크 모드 토글 로직
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      let newTheme = 'light';
      
      if (currentTheme === 'light') {
        newTheme = 'dark';
      }
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // 3. 프로젝트 카드 내의 탭 전환 로직
  const projectCards = document.querySelectorAll('.project-detail-card');
  
  projectCards.forEach(card => {
    const tabs = card.querySelectorAll('.tab-link');
    const panes = card.querySelectorAll('.tab-pane');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTabName = tab.getAttribute('data-tab');
        
        // 탭 버튼 active 클래스 갱신
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // 탭 콘텐츠 active 클래스 갱신
        panes.forEach(pane => {
          if (pane.id === targetTabName) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });
      });
    });
  });

  // 4. Scrollspy: 스크롤 위치에 따라 헤더 활성화 메뉴 변경
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function scrollActiveMenu() {
    const scrollY = window.pageYOffset || window.scrollY;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      // 헤더 높이 70px + 여유 오프셋 20px 감안
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', scrollActiveMenu);
  // 초기 로드 시에도 한 번 실행
  scrollActiveMenu();

  // 5. Intersection Observer: 스크롤 시 부드럽게 요소를 등장시키는 애니메이션
  const fadeElements = [
    ...document.querySelectorAll('.skill-card'),
    ...document.querySelectorAll('.timeline-item'),
    ...document.querySelectorAll('.project-detail-card'),
    ...document.querySelectorAll('.about-box'),
    ...document.querySelectorAll('.edu-card')
  ];

  // 모든 대상 요소에 애니메이션용 기본 클래스 부여
  fadeElements.forEach(el => {
    el.classList.add('fade-in-element');
  });

  const observerOptions = {
    root: null, // viewport 기준
    threshold: 0.15, // 요소가 15% 이상 보일 때 작동
    rootMargin: '0px 0px -50px 0px' // 하단 여백을 주어 자연스럽게 노출
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // 한 번 드러난 후에는 관찰 종료 (스크롤을 올렸다 내려도 유지)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    revealObserver.observe(el);
  });
});
