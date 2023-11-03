import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';

export const swiper = new Swiper('.mainSlider', {
  init: false,
  slidesPerView: 3,
  spaceBetween: 40,
  slidesPerGroup: 1,
  centeredSlides: true,
  loop: true,
  speed: 700,

  modules: [Navigation, Pagination],
  pagination: {
    el: '.pagination',
  },

  navigation: {
    nextEl: '.next',
    prevEl: '.prev',
  },

  breakpoints: {
    320: {
      slidesPerView: 1.5,
      spaceBetween: 50,
    },

    480: {
      slidesPerView: 2.2,
      spaceBetween: 60,
    },

    768: {
      slidesPerView: 3,
      spaceBetween: 60,
    },

    1400: {
      spaceBetween: 40,
    },
  },
});
