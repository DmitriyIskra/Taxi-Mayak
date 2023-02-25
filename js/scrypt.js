// При выборе вариантов кресла могут нажать на друге выбор кресла не выбрав это, надо сохранять последний элемент к которому было применено открытие выбора кресел
// Формы для выбора после выбора обязательно очищать и после отправки тоже



// ============ Открытие/закрытие меню мобильной версии по клику на иконку или элементам меню
class IconMobieControl {
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

iconMobie = document.querySelector('.header__icon-mobile');
wrMobileMenuCover = document.querySelector('.popular__wr-mobile-menu-cover');
popularWrMobileMenu = document.querySelector('.popular__wr-mobile-menu');

controlIconMobileMenu = new IconMobieControl(iconMobie,wrMobileMenuCover,popularWrMobileMenu);
controlIconMobileMenu.registerEvent();     // вызываем навешивание событий
