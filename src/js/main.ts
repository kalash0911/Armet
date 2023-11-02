import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';

// for header

const burger = document.querySelector(".burger");
const menuBody = document.querySelector(".menu-wrap");
const linkClose = document.querySelectorAll(".link-close");
const overflow = document.querySelector(".overflow");

if (burger) {
    burger.addEventListener("click", function (e) {
        document.body.classList.toggle("body_lock");
        document.body.classList.toggle("active");
        if (burger.classList.contains('burger_active')) {
            burger.classList.add('burger_finish');
            burger.classList.remove('burger_active');
            overflow.classList.toggle("overflow_active");
        } else {
            burger.classList.add('burger_active');
            burger.classList.remove('burger_finish');
            overflow.classList.toggle("overflow_active");
        }
        menuBody.classList.toggle("menu_active");
    });
};

if (overflow) {
    overflow.addEventListener("click", function (e) {
        document.body.classList.toggle("body_lock");
        document.body.classList.toggle("active");
        if (burger.classList.contains('burger_active')) {
            burger.classList.add('burger_finish');
            burger.classList.remove('burger_active');
            overflow.classList.toggle("overflow_active");
        } else {
            burger.classList.add('burger_active');
            burger.classList.remove('burger_finish');
            overflow.classList.toggle("overflow_active");
        }
        menuBody.classList.toggle("menu_active");
    });
};

if (linkClose.length) {
    for (var i = 0; i < linkClose.length; ++i) {
        linkClose[i].addEventListener("click", function (e) {
            document.body.classList.remove("body_lock");
            document.body.classList.remove("active");
            burger.classList.remove("burger_active");
            burger.classList.add('burger_finish');
            menuBody.classList.remove("menu_active");
            overflow.classList.remove("overflow_active");
        })
    }
};


// for swiper

const swiper = new Swiper(".mainSlider", {
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
        }
    }
});