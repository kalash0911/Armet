const section = document.querySelector('#planet');

const options: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.isIntersecting
      ? entry.target.classList.add('animation')
      : entry.target.classList.remove('animation');
  });
}, options);

section && observer.observe(section);
