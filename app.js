(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const cards = document.querySelector('#team-grid');
  if (cards && window.ROVO) {
    window.ROVO.founders.forEach((person, index) => {
      const card = document.createElement('article');
      card.className = 'founder-card reveal';
      const portrait = document.createElement('div');
      portrait.className = 'founder-portrait';
      const initials = document.createElement('span');
      initials.className = 'founder-initials';
      initials.textContent = person.initials;
      initials.setAttribute('aria-hidden', 'true');
      portrait.append(initials);
      if (person.photo) {
        const img = document.createElement('img');
        img.src = person.photo;
        img.alt = 'Portrait of ' + person.name;
        img.loading = 'lazy';
        img.width = 600;
        img.height = 800;
        img.style.objectPosition = person.photoPosition || 'center';
        img.addEventListener('error', () => img.remove(), { once: true });
        portrait.append(img);
      }
      const number = document.createElement('span');
      number.className = 'founder-number';
      number.textContent = '0' + (index + 1) + ' / ROVO';
      portrait.append(number);
      const label = document.createElement('div');
      label.className = 'founder-label';
      const heading = document.createElement('h2');
      heading.textContent = person.name;
      const arrow = document.createElement('span');
      arrow.textContent = '↗';
      arrow.setAttribute('aria-hidden', 'true');
      label.append(heading, arrow);
      const role = document.createElement('span');
      role.className = 'founder-role';
      role.textContent = 'CO-FOUNDER';
      const bio = document.createElement('p');
      bio.textContent = person.bio;
      card.append(portrait, label, role, bio);
      cards.append(card);
    });
  }

  // Content stays visible if JavaScript or IntersectionObserver is unavailable.
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.documentElement.classList.add('motion-ready');
  }

  const steps = [...document.querySelectorAll('[data-step]')];
  const titles = [
    ['Your next ride is around the corner.', 'Choose a bike near you.'],
    ['One scan. A whole campus ahead.', 'Unlock your bike and start your ride.'],
    ["You're here. Make the most of it.", 'Park at a designated location to finish.']
  ];
  const selectStep = index => {
    steps.forEach((step, i) => {
      step.classList.toggle('active', i === index);
      step.setAttribute('aria-selected', String(i === index));
      step.tabIndex = i === index ? 0 : -1;
    });
    document.querySelector('.map').dataset.state = String(index);
    document.querySelector('#experience-panel').setAttribute('aria-labelledby', 'step-' + index);
    document.querySelector('#demo-title').textContent = titles[index][0];
    document.querySelector('#demo-detail').textContent = titles[index][1];
    document.querySelector('.demo-status').textContent = '0' + (index + 1) + ' / 03';
  };
  steps.forEach((step, index) => {
    step.addEventListener('click', () => selectStep(index));
    step.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % steps.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + steps.length - 1) % steps.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = steps.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      selectStep(next);
      steps[next].focus();
    });
  });

  const progress = document.querySelector('.scroll-progress');
  const bike = document.querySelector('[data-parallax]');
  let ticking = false;
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
    if (bike && !reducedMotion.matches && window.innerWidth > 760) {
      bike.style.transform = 'translateY(' + Math.min(window.scrollY * .12, 70) + 'px)';
    } else if (bike) bike.style.transform = '';
    ticking = false;
  };
  const queueUpdate = () => {
    if (!ticking) { requestAnimationFrame(updateScroll); ticking = true; }
  };
  window.addEventListener('scroll', queueUpdate, { passive: true });
  window.addEventListener('resize', queueUpdate, { passive: true });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) document.documentElement.classList.remove('motion-ready');
    queueUpdate();
  });
  updateScroll();
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
