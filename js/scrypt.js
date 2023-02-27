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


// // ============ УПРАВЛЕНИЕ ФОРМОЙ ПОПУЛЯРНЫЕ НАПРАВЛЕНИЯ

const formChairsType = document.querySelector('.wr-price-order__wr-modal-type-chair');
const popularForm = document.querySelector('.popular__form');
const collectionLabels = formChairsType.querySelectorAll('.wr-price-order__label-type-chair');
const windowWidth = window.innerWidth;
let lastActiveInputChair;
let checkActiveRadioType;


popularForm.addEventListener('focus', (e) => { 

    if(e.target.matches('.popular__choose-chair')  && windowWidth > 976 ) { // Открытие формы выбора типа кресла
        lastActiveInputChair = e.target;
        openFormTypeChairs(`250px`, `515px`); // в зависимости от ширины экрана
    }
}, true)


function openFormTypeChairs(top, left) {    // Активация формы выбора при нажатии на выбор кресла
    formChairsType.classList.add('wr-type-chair_active');

    formChairsType.style.top = top;  // Задаем координаты
    formChairsType.style.left = left;

    if(lastActiveInputChair.value !== '') {  // Если кресло выбрано, и открывается повторно выствляется нужный radio
        let elem = formChairsType.querySelector(`[data-set="${lastActiveInputChair.value}"]`); 
        elem.checked = true;
    }
}

    // -- управление формой выбора типа кресла
    formChairsType.addEventListener('click', (e) => {   
        if(e.target.matches('.wr-price-order__close')) {
            closeFormTypeChair(formChairsType);
            resetFormTypeChair(formChairsType);
        };
        
        if(e.target.matches('.wr-price-order__label-type-chair')) {
            chooseTypeChair(e.target)
        };
    });

    function closeFormTypeChair(el) {  // Закрытие формы типа кресла
        el.classList.remove('wr-type-chair_active');
    };

    function resetFormTypeChair(el) {  // Cброс формы типа кресла
        el.reset();
    };


    function chooseTypeChair(el) {
        lastActiveInputChair.value = el.textContent;
        closeFormTypeChair(formChairsType);
    };
// // ============ Активация выбора кресла END =========