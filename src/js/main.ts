import { swiper } from './swiper.ts';
import {
  initTreeJsModels,
  setActiveObjectColor,
  resetObjectColor,
  setActiveElementObjectColor,
  resetActiveElementObjectColor
} from './three';
import { fullpagejs } from './fullpage';
import { burgerMenu } from './burger-menu';

import { isMobile } from './is-mobile';
!isMobile && fullpagejs();

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
