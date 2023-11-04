import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobile } from './is-mobile';

gsap.registerPlugin(ScrollTrigger);

if (!isMobile) {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '.planet-section',
        pin: true,
        start: '0 top',
        end: 'bottom+=100%',
        scrub: 1,
      },
      defaults: { duration: 5, ease: 'ease-out' },
    })
    .to('.planet', { x: '50%', rotation: -90 })
    .to('.left', { opacity: 1, duration: 1 }, '<50%')
    .to('.planet', { x: '-50%', rotation: 90 })
    .to('.left', { opacity: 0, duration: 1 }, '<5%')
    .to('.right', { opacity: 1, duration: 1 }, '<5%');
} else {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '.planet-section',
        pin: true,
        start: '0 top',
        end: 'bottom+=100%',
        scrub: 1,
      },
      defaults: { duration: 5, ease: 'ease-out' },
    })
    .to('.planet', { scale: 2, y: '50%', x: '50%', rotation: -45 })
    .to('.left', { opacity: 1, duration: 1 }, '<50%')
    .to('.planet', { scale: 2, y: '50%', x: '-50%', rotation: 45 })
    .to('.left', { opacity: 0, duration: 1 }, '<5%')
    .to('.right', { opacity: 1, duration: 1 }, '<5%');
}
