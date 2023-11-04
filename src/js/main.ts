import './swiper';
import './lottie-icons';
import './planet';
import { swiper } from './swiper.ts';
import {
  initTreeJsModels,
  setActiveElementObjectColor,
  resetActiveElementObjectColor,
} from './three';
import { burgerMenu } from './burger-menu';
import './gsap.ts';

burgerMenu();

swiper.on('init', () => {
  initTreeJsModels();
});

swiper.on('slideChange', () => {
  resetActiveElementObjectColor();
});

swiper.on('slideChangeTransitionStart', () => {
  setActiveElementObjectColor();
});

swiper.init();
