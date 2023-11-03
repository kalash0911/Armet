import './swiper';
import { fullpagejs } from './fullpage';
import { burgerMenu } from './burger-menu';
import { isMobile } from './is-mobile';

!isMobile && fullpagejs();
burgerMenu();
