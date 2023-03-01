// При выборе вариантов кресла могут нажать на друге выбор кресла не выбрав это, надо сохранять последний элемент к которому было применено открытие выбора кресел
// Формы для выбора после выбора обязательно очищать и после отправки тоже



// ============ Открытие/закрытие меню мобильной версии по клику на иконку или элементам меню

import {controlIconMobileMenu} from './nav-mobile.js'

controlIconMobileMenu.registerEvent();     // вызываем навешивание событий

// ============ Открытие/закрытие меню мобильной версии по клику на иконку или элементам меню ===================




// // ============ УПРАВЛЕНИЕ ФОРМОЙ ПОПУЛЯРНЫЕ НАПРАВЛЕНИЯ

// Данные для работы формы popular
const popularForm = document.querySelector('.popular__form');
const formChairsType = document.querySelector('.popular__wr-modal-type-chair');
const windowWidth = window.innerWidth;
let lastActiveInputChair;

popularForm.addEventListener('focus', (e) => { 

    if(e.target.matches('.popular__choose-chair')  && windowWidth > 976 ) { // Открытие формы выбора типа кресла
        lastActiveInputChair = e.target;
        openFormTypeChairs(`26.5956vh`, ` 26.8229vw`); // в зависимости от ширины экрана `250px`, `515px`
    }
    else if(e.target.matches('.popular__choose-chair')  && windowWidth < 976 ) {
        lastActiveInputChair = e.target;
        formChairsType.querySelector('.popular__type-chair-list').style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        openFormTypeChairs(`120px`, `80px`);
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
        if(e.target.matches('.popular__close')) {
            closeFormTypeChair(formChairsType);
            resetFormTypeChair(formChairsType);
        };
        
        if(e.target.matches('.popular__label-type-chair')) {
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



// ---------------------------------------------------------------------------------------------------------------------------------------------



// // ============ УПРАВЛЕНИЕ ФОРМОЙ ЗАКАЗАТЬ

const orderForm = document.querySelector('.wr-price-order__form');
const typeChairOrder = document.querySelector('.wr-price-order__wr-modal-type-chair');
let lastActiveInputChairOrder;

// console.log(orderForm)

orderForm.addEventListener('click', (e) => { 
    if(e.target.matches('.wr-price-order__type-chair')) { // Открытие формы выбора типа кресла
        openFormTypechairsOrder(e.target);
    };
}, true);


function openFormTypechairsOrder(elem) {  // Открываем модальное окно
    lastActiveInputChairOrder = elem;   // Присваиваем последний активный элемент
    typeChairOrder.classList.toggle('wr-modal-type-chair-order_active');
    typeChairOrder.style.width = `${elem.offsetWidth}px`
    typeChairOrder.style.left = `${elem.offsetLeft}px`;
    typeChairOrder.style.top = `${elem.offsetTop + 55}px`;

    if(lastActiveInputChairOrder.value !== '') {
        console.log(lastActiveInputChairOrder.value)
        let element = typeChairOrder.querySelector(`[data-set="${lastActiveInputChairOrder.value}"]`); 
        element.checked = true;
    }
};


        // Форма выбора типа кресла

typeChairOrder.addEventListener('click', e => {
    if(e.target.matches('.wr-price-order__close')) {
        closeModalFormOrder(e.target);
    };

    if(e.target.matches('.wr-price-order__label-type-chair')) {
        addTypeChair(e.target)
    }
});

function addTypeChair(elem) { // Заполняем поле выбранным типом кресла 
    lastActiveInputChairOrder.value = elem.textContent;
    closeModalFormOrder();
}

function closeModalFormOrder(elem) { // Функция закрытия модального окна по кнопке close
    typeChairOrder.classList.remove('wr-modal-type-chair-order_active');
};



