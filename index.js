const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-revealed');
    }
  });
}, {threshold: 0.15});

document.querySelectorAll('.slide-in-left, .slide-in-right').forEach(el => io.observe(el));

lucide.createIcons();
