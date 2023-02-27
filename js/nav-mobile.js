export let name = 'Dmitriy'

export class IconMobieControl { 
    constructor(iconMobie, wrMobileMenuCover, popularWrMobileMenu) {
        this.iconMobie = iconMobie;
        this.wrMobileMenuCover = wrMobileMenuCover;
        this.popularWrMobileMenu = popularWrMobileMenu;
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
        this.iconMobie.addEventListener('click', (event) => {
            this.controlIconMobileMenu();
        });

        this.popularWrMobileMenu.addEventListener('click', (event) => {
            if(event.target.matches('.mobile-menu-link')) {
                this.controlIconMobileMenu();
            };
        });
    };
};

const iconMobie = document.querySelector('.header__icon-mobile');
const wrMobileMenuCover = document.querySelector('.popular__wr-mobile-menu-cover');
const popularWrMobileMenu = document.querySelector('.popular__wr-mobile-menu');

export const controlIconMobileMenu = new IconMobieControl(iconMobie,wrMobileMenuCover,popularWrMobileMenu);