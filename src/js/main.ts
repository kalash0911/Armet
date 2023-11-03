import './swiper';
import { fullpagejs } from './fullpage';
import { burgerMenu } from './burger-menu';

let isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

!isMobile && fullpagejs();
burgerMenu();
