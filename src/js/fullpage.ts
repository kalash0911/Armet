export const fullpagejs = () => {
  let curSectionInd = 0;
  let isScrolling = false;
  let isEnded = false;
  let direction = '';
  let isEnteringBack = false;

  const sections = Array.from(document.querySelectorAll('.fpsec'));
  const onEnter = new Event('onEnter');
  const onEnterBack = new Event('onEnterBack');
  const onLeave = new Event('onLeave');
  const nextNormalSection = sections[sections.length - 1].nextElementSibling;

  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.every((entry) => {
      if (entry.isIntersecting) {
        !isEnteringBack && dispatchEvent(onEnter);
      }
    });
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        curSectionInd = sections.indexOf(entry.target as Element);
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });

  const lockBody = () => {
    document.body.classList.add('locked');
  };

  const unlockBody = () => {
    document.body.classList.remove('locked');
  };

  function scrollToNextSection() {
    if (curSectionInd < sections.length - 1 && !isEnded) {
      isScrolling = true;
      curSectionInd++;
      sections[curSectionInd].scrollIntoView({ behavior: 'smooth' });
      handleIsScrolling();
    } else {
      !isEnded && dispatchEvent(onLeave);
    }
  }

  function scrollToPreviousSection() {
    if (curSectionInd > 0 && !isEnded) {
      isScrolling = true;
      curSectionInd--;
      sections[curSectionInd].scrollIntoView({ behavior: 'smooth' });
      handleIsScrolling();
    }
  }

  const scrollToNormalSection = () => {
    isScrolling = true;
    nextNormalSection?.scrollIntoView({ behavior: 'smooth' });
    handleIsScrolling();
  };

  const startPresentationBack = () => {
    if (!isScrolling) {
      isEnded = false;
      isEnteringBack = true;
      isScrolling = true;
      const rect = nextNormalSection?.getBoundingClientRect();
      const top = rect?.top;
      window.scrollTo({ top, behavior: 'instant' });
      sections[curSectionInd].scrollIntoView({ behavior: 'smooth' });
      lockBody();
      handleIsScrolling();
    }
  };

  window.addEventListener('onEnter', () => {
    lockBody();
  });

  window.addEventListener('onEnterBack', () => {
    sections.forEach((el) => el.classList.remove('d-none'));

    startPresentationBack();
  });

  window.addEventListener('onLeave', () => {
    scrollToNormalSection();
    const scrollendcb = () => {
      unlockBody();
      sections.forEach((el) => el.classList.add('d-none'));
      window.scrollTo({ top: 0 });
      isEnded = true;
      window.removeEventListener('scrollend', scrollendcb);
    };
    window.addEventListener('scrollend', scrollendcb);
  });

  window.addEventListener('wheel', (event) => {
    if (!isScrolling) {
      if (event.deltaY > 0) {
        direction = 'down';
        scrollToNextSection();
      } else {
        direction = 'up';
        scrollToPreviousSection();
      }
    }

    const rect = nextNormalSection?.getBoundingClientRect();
    const top = rect?.top;
    if (!isScrolling && top === 0 && event.deltaY < 0) {
      dispatchEvent(onEnterBack);
    }
  });

  window.addEventListener('scrollend', () => {
    const rect = nextNormalSection?.getBoundingClientRect();
    const top = rect?.top;

    if (!isScrolling && top === 0 && isEnded && direction === 'up') {
      dispatchEvent(onEnterBack);
    }
  });

  function handleIsScrolling() {
    setTimeout(() => {
      isScrolling = false;
      isEnteringBack = false;
    }, 500);
  }
};
