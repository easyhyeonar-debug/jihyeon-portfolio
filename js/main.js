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

// 푸터 연도
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
