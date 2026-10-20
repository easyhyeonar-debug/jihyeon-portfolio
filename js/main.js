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

// 가로 스크롤 카드: 멈추는 위치를 글 시작선에 맞춤 (양옆 여백 = 화면 밖으로 흘러가는 영역)
document.querySelectorAll('.case-scroller').forEach((track) => {
  const box = track.parentElement;
  const align = () => {
    // 글 영역 좌우 끝 ~ 화면 끝 거리 (스크롤바 폭 제외한 실제 화면 기준)
    const r = box.getBoundingClientRect();
    const left = Math.round(r.left);
    const right = Math.round(document.documentElement.clientWidth - r.right);
    Object.assign(track.style, {
      marginLeft: `${-left}px`, marginRight: `${-right}px`,
      paddingLeft: `${left}px`, paddingRight: `${right}px`,
      scrollPaddingInline: `${left}px ${right}px`,
    });
  };
  // 처음엔 첫 카드가 글 시작선에 맞춰지도록. 스냅이 먼저 켜져 있으면 브라우저가
  // 엉뚱한 카드(끝 카드)에 붙여버려서, 위치를 잡은 다음 프레임에 스냅을 켠다.
  let touched = false;
  ['pointerdown', 'wheel', 'touchstart', 'keydown'].forEach((ev) =>
    track.addEventListener(ev, () => (touched = true), { passive: true })
  );
  const reset = () => {
    if (touched) return;
    track.classList.remove('is-snapping');
    align();
    track.scrollLeft = 0;
    setTimeout(() => track.classList.add('is-snapping'), 50);
  };
  reset();
  window.addEventListener('load', reset); // 글꼴·이미지 로드로 레이아웃이 바뀐 뒤 한 번 더
  new ResizeObserver(align).observe(box);
});

// 가로 스크롤 카드 넘김 버튼
document.querySelectorAll('.scroller-nav').forEach((navEl) => {
  const track = navEl.closest('.case')?.querySelector('.case-scroller');
  if (!track) return;
  const [prev, next] = navEl.querySelectorAll('.scroller-btn');
  const step = () => {
    const card = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
  };
  const sync = () => {
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  };
  navEl.querySelectorAll('.scroller-btn').forEach((btn) =>
    btn.addEventListener('click', () => {
      track.dispatchEvent(new Event('pointerdown'));
      track.scrollBy({ left: step() * Number(btn.dataset.dir), behavior: 'smooth' });
    })
  );
  track.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);
  sync();
});

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
