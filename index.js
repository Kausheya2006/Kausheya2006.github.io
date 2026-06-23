const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('stuck', scrollY > 40), {passive: true});

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, {threshold: 0.1});

document.querySelectorAll('.r').forEach(el => io.observe(el));
if (window.lucide) lucide.createIcons();

// Cursor glow logic
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const bgSpotlight = document.getElementById('bg-spotlight');
    if (bgSpotlight) {
      bgSpotlight.style.setProperty('--mouse-x', `${mouseX}px`);
      bgSpotlight.style.setProperty('--mouse-y', `${mouseY}px`);
    }

    if (!isMoving) {
      cursorGlow.style.opacity = '1';
      isMoving = true;
    }
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
  
  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
    isMoving = false;
  });
}

// Contact Card Highlight Logic
const btnGetInTouch = document.getElementById('btn-get-in-touch');
const contactCard = document.getElementById('contact-card');

if (btnGetInTouch && contactCard) {
  btnGetInTouch.addEventListener('click', () => {
    setTimeout(() => {
      contactCard.classList.add('highlight-glow');
      setTimeout(() => {
        contactCard.classList.remove('highlight-glow');
      }, 2400); // Flash for 2.4s
    }, 400); // Short delay to allow scroll
  });
}

// Contact Form Logic
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('contact-message').value;
    window.location.href = `mailto:royrimo2006@gmail.com?subject=Hello&body=${encodeURIComponent(msg)}`;
  });
}

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (savedTheme === 'light') {
    themeIcon.setAttribute('data-lucide', 'moon');
  }
}

if (themeToggle && themeIcon) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'light') {
      themeIcon.setAttribute('data-lucide', 'moon');
    } else {
      themeIcon.setAttribute('data-lucide', 'sun');
    }
    
    if (window.lucide) lucide.createIcons();
  });
}

// Dynamic Scroll Logic
const dScroll = document.getElementById('dynamic-scroll');
const dsContainer = document.getElementById('ds-icon-container');

if (dScroll && dsContainer) {
  let isBottom = false;
  let currentState = '';

  const updateScroll = () => {
    const scrollPos = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    let newState = '';
    if (scrollPos < 100) {
      newState = 'arrow-down';
      isBottom = false;
    } else if (scrollPos > maxScroll - 100) {
      newState = 'arrow-up';
      isBottom = true;
    } else {
      newState = 'arrow-up-down';
      isBottom = false;
    }
    
    if (currentState !== newState) {
      currentState = newState;
      dsContainer.innerHTML = `<i data-lucide="${newState}" style="width: 24px; height: 24px;"></i>`;
      if (window.lucide) lucide.createIcons();
    }
  };

  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  dScroll.addEventListener('click', () => {
    if (isBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    }
  });
}
