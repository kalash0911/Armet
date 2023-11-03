import './swiper';
import './lottie-icons';
import { fullpagejs } from './fullpage';
import { burgerMenu } from './burger-menu';
import { isMobile } from './is-mobile';

!isMobile && fullpagejs();
burgerMenu();