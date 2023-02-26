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

const iconMobie = document.querySelector('.header__icon-mobile');
const wrMobileMenuCover = document.querySelector('.popular__wr-mobile-menu-cover');
const popularWrMobileMenu = document.querySelector('.popular__wr-mobile-menu');

controlIconMobileMenu = new IconMobieControl(iconMobie,wrMobileMenuCover,popularWrMobileMenu);
controlIconMobileMenu.registerEvent();     // вызываем навешивание событий


// // ============ Активация выбора кресла

const formChairsActive = document.querySelector('.wr-price-order__wr-modal-type-chair');
const popularForm = document.querySelector('.popular__form');
const windowWidth = window.innerWidth;


popularForm.addEventListener('focus', (e) => { // Управление формой популярные направления
    if(e.target.matches('.popular__choose-chair')  && windowWidth > 976 ) { // 
        openFormTypeChairs(`250px`, `515px`); // Отправляем позицию в зависимости от ширины экрана
    }
}, true)


function openFormTypeChairs(top, left) {    // Активация формы выбора при нажатии на популярные направления
    console.log('work')
    formChairsActive.classList.add('wr-type-chair_active');

    formChairsActive.style.top = top;
    formChairsActive.style.left = left;
}


formChairsActive.addEventListener('click', (e) => {   // управление формой выбора типа кресла
    if(e.target.matches('.wr-price-order__close')) {
        closeFormTypeChair(formChairsActive)
    }
})

function closeFormTypeChair(el) {  // Закрытие формы типа кресла
    el.classList.remove('wr-type-chair_active');
}