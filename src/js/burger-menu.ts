export const burgerMenu = () => {
  const burger = document.querySelector('.burger')!;
  const menuBody = document.querySelector('.menu-wrap')!;
  const linkClose = document.querySelectorAll('.link-close');
  const overflow = document.querySelector('.overflow')!;

  if (burger) {
    burger.addEventListener('click', function () {
      document.body.classList.toggle('body_lock');
      document.body.classList.toggle('active');
      if (burger.classList.contains('burger_active')) {
        burger.classList.add('burger_finish');
        burger.classList.remove('burger_active');
        overflow.classList.toggle('overflow_active');
      } else {
        burger.classList.add('burger_active');
        burger.classList.remove('burger_finish');
        overflow.classList.toggle('overflow_active');
      }
      menuBody.classList.toggle('menu_active');
    });
  }

  if (overflow) {
    overflow.addEventListener('click', function () {
      document.body.classList.toggle('body_lock');
      document.body.classList.toggle('active');
      if (burger.classList.contains('burger_active')) {
        burger.classList.add('burger_finish');
        burger.classList.remove('burger_active');
        overflow.classList.toggle('overflow_active');
      } else {
        burger.classList.add('burger_active');
        burger.classList.remove('burger_finish');
        overflow.classList.toggle('overflow_active');
      }
      menuBody.classList.toggle('menu_active');
    });
  }

  if (linkClose.length) {
    for (var i = 0; i < linkClose.length; ++i) {
      linkClose[i].addEventListener('click', function () {
        document.body.classList.remove('body_lock');
        document.body.classList.remove('active');
        burger.classList.remove('burger_active');
        burger.classList.add('burger_finish');
        menuBody.classList.remove('menu_active');
        overflow.classList.remove('overflow_active');
      });
    }
  }
};
