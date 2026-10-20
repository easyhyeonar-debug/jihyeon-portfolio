// 모바일 메뉴
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', false);
  };
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  // 태블릿 이상(744px+)으로 넓어지면 열린 모바일 메뉴 닫기
  window.matchMedia('(min-width: 744px)').addEventListener('change', (e) => { if (e.matches) closeMenu(); });
}

// 작업 필터
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');

filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    filters.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const f = btn.dataset.filter;
    cards.forEach((card) => {
      card.classList.toggle('is-hidden', f !== 'all' && card.dataset.category !== f);
    });
  });
});

// 상세 페이지 뒤로가기: 사이트 안에서 들어왔으면 이전 화면(스크롤 위치 포함)으로, 아니면 작업 목록으로
const backBtn = document.querySelector('.back-float');

if (backBtn) {
  backBtn.addEventListener('click', (e) => {
    let fromSite = false;
    try {
      fromSite = document.referrer && new URL(document.referrer).origin === location.origin;
    } catch (err) {}
    if (fromSite && history.length > 1) {
      e.preventDefault();
      history.back();
    }
  });
}

// 섹션 페이지네이션 점 표시
const pager = document.querySelector('.pager');
const pages = document.querySelectorAll('.page');

if (pager && pages.length) {
  const dots = [...pages].map((page) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', `${page.dataset.page} 섹션으로 이동`);
    btn.innerHTML = `<span class="pager-label">${page.dataset.page}</span>`;
    btn.addEventListener('click', () => page.scrollIntoView({ behavior: 'smooth' }));
    pager.appendChild(btn);
    return btn;
  });

  const setActive = (i) =>
    dots.forEach((d, j) => (j === i ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current')));

  // 화면 가운데를 지나는 섹션을 현재 페이지로 표시
  const update = () => {
    const mid = window.innerHeight / 2;
    let current = 0;
    pages.forEach((p, i) => {
      if (p.getBoundingClientRect().top <= mid) current = i;
    });
    setActive(current);
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

// 푸터 연도
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
