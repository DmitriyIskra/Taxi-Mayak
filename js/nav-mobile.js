

export class IconMobieControl { 
    constructor(iconMobie, wrMobileMenuCover, popularWrMobileMenu, mainMenuMobile) {
        this.iconMobie = iconMobie;
        this.wrMobileMenuCover = wrMobileMenuCover;
        this.popularWrMobileMenu = popularWrMobileMenu;
        this.mainMenuMobile = mainMenuMobile;
    };

    changeIconMobileMenu() {
        this.iconMobie.classList.toggle('header__icon-mobile_close'); // смена иконки откр закр
    };

    openCloseMobileMenu() {                 // открытие закрытие элементов меню
        this.wrMobileMenuCover.classList.toggle('active');
        this.popularWrMobileMenu.classList.toggle('popular__wr-mobile-menu_show');
    };

    controlIconMobileMenu() {               // вызов функций работы меню и иконки
        this.changeIconMobileMenu();
        this.openCloseMobileMenu(); 
    };

    registerEvent() {                       // навешиваем события
        this.iconMobie.addEventListener('click', (event) => {  // По клику на иконку (закрытие, открытие)
            this.controlIconMobileMenu();
        });

        this.mainMenuMobile.addEventListener('click', (event) => { // По клику на элементы навигации (закрытие, открытие)
            if(event.target.matches('.mobile-menu-link') || event.target.matches('.popular__wr-mobile-menu-cover')) {
                this.controlIconMobileMenu();
            };
        });
    };
};

const iconMobie = document.querySelector('.header__icon-mobile');
const wrMobileMenuCover = document.querySelector('.popular__wr-mobile-menu-cover');
const popularWrMobileMenu = document.querySelector('.popular__wr-mobile-menu');
const mainMenuMobile = document.querySelector('.popular__wr-mobile-menu-cover');

export const controlIconMobileMenu = new IconMobieControl(iconMobie,wrMobileMenuCover,popularWrMobileMenu,mainMenuMobile);