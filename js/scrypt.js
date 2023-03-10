// При выборе вариантов кресла могут нажать на друге выбор кресла не выбрав это, надо сохранять последний элемент к которому было применено открытие выбора кресел
// Формы для выбора после выбора обязательно очищать и после отправки тоже



// ============ Открытие/закрытие меню мобильной версии по клику на иконку или элементам меню

import {controlIconMobileMenu} from './nav-mobile.js'
// console.log(controlIconMobileMenu)
controlIconMobileMenu.registerEvent();     // вызываем навешивание событий

// ============ Открытие/закрытие меню мобильной версии по клику на иконку или элементам меню ===================


// // ============ УПРАВЛЕНИЕ ФОРМОЙ ПОПУЛЯРНЫЕ НАПРАВЛЕНИЯ 
// ---- СМЕНА полей направлений

import ChangeDirection from './changeDirection.js'

const changeDirection = new ChangeDirection(document.querySelector('.popular__form'));
changeDirection.registerEvent();

// ---- ВЫЗОВ И РАБОТА МОДАЛЬНОГО ОКНА
// Данные для работы формы popular
const popularForm = document.querySelector('.popular__form');
const formChairsType = document.querySelector('.popular__wr-modal-type-chair');
const windowWidth = window.innerWidth;
let lastActiveInputChair;

popularForm.addEventListener('focus', (e) => { 

    if(e.target.matches('.popular__choose-chair')  && windowWidth > 976 ) { // Открытие формы выбора типа кресла
        lastActiveInputChair = e.target;
        openFormTypeChairs(`${e.target.offsetTop - 320}px`, `${e.target.offsetLeft + 5}px`); // в зависимости от ширины экрана `250px`, `515px`
    }
    else if(e.target.matches('.popular__choose-chair')  && windowWidth < 976 ) {
        lastActiveInputChair = e.target;
        formChairsType.querySelector('.popular__type-chair-list').style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        openFormTypeChairs(`${e.target.offsetTop - 320}px`, `${e.target.offsetLeft + 5}px`);
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
            chooseTypeChair(e.target);
        };
    });

    function closeFormTypeChair(el) {  // Закрытие формы типа кресла
        el.classList.remove('wr-type-chair_active');
    };

    function resetFormTypeChair(el) {  // Cброс формы типа кресла
        el.reset();
    };


    function chooseTypeChair(el) {  // Берем выбранный тип кресла, вставляем его в поле
        lastActiveInputChair.value = el.textContent;
        closeFormTypeChair(formChairsType); // Закрываем модальное окно
    };

// // ============ Активация выбора кресла END =========

// // ============ Расчет цены START =========
import {calcPrice} from './show-price.js';

calcPrice.registerEvent()

// ---------------------------------------------------------------------------------------------------------------------------------------------
// ======================== КАРТА
        ymaps.ready(init); 
        let myMap;

        function init() {
            // Стоимость за километр.
            var DELIVERY_TARIFF_STANDART = 30;
            var DELIVERY_TARIFF_KOMFORT = 35;
            var DELIVERY_TARIFF_BIZNESS = 40;
            var DELIVERY_TARIFF_MINIVEN = 45,
            // Минимальная стоимость.
            MINIMUM_COST = 1000,
            myMap = new ymaps.Map('map', {
                center: [44.948169, 34.099893],
                zoom: 9,
                controls: []
            }),
            // Создадим панель маршрутизации.
            routePanelControl = new ymaps.control.RoutePanel({
                options: {
                    // Добавим заголовок панели.
                    showHeader: false,
                    title: 'Расчёт маршрута',
                    maxWidth: '100%'
                }
            }),
            zoomControl = new ymaps.control.ZoomControl({
                options: {
                    size: 'small',
                    float: 'none',
                    position: {
                        bottom: 250,
                        right: 10
                    }
                }
            });
            // balloon = new ymaps.Balloon({ /// Позже разобраться как написать опции для балуна стандартного
            //     options: {
            //         autoPan: true,
            //         maxWidth: '30px'
            //     }
            // });
            // Пользователь сможет построить только автомобильный маршрут.
            routePanelControl.routePanel.options.set({
                types: {auto: true}
            });

            // Если вы хотите задать неизменяемую точку "откуда", раскомментируйте код ниже.
            /*routePanelControl.routePanel.state.set({
                fromEnabled: false,
                from: 'Москва, Льва Толстого 16'
            });*/

            myMap.controls.add(routePanelControl).add(zoomControl).add(zoomControl);

            // Получим ссылку на маршрут.
            routePanelControl.routePanel.getRouteAsync().then(function (route) {

                // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
                route.model.setParams({results: 1}, true);

                // Повесим обработчик на событие построения маршрута.
                route.model.events.add('requestsuccess', function () {

                    var activeRoute = route.getActiveRoute();
                    if (activeRoute) {
                        // Получим протяженность маршрута.
                        var length = route.getActiveRoute().properties.get("distance"),
                        // Вычислим стоимость доставки.
                            price = calculate(Math.round(length.value / 1000)),
                        // Создадим макет содержимого балуна маршрута.
                            balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                                '<span>ориентировочная стоимость поездки:' + '</span><br/>' +
                                '<span>Расстояние: ' + length.text + '.</span><br/>' +
                                '<span style="font-weight: bold; font-style: italic">Стандарт: ' + price[0] + ' р.</span><br/>' + 
                                '<span style="font-weight: bold; font-style: italic">Комфорт: ' + price[1] + ' р.</span><br/>' +
                                '<span style="font-weight: bold; font-style: italic">Бизнесс: ' + price[2] + ' р.</span><br/>' +
                                '<span style="font-weight: bold; font-style: italic">Минивен: ' + price[3] + ' р.</span><br/>');
                        // Зададим этот макет для содержимого балуна.
                        route.options.set('routeBalloonContentLayout', balloonContentLayout);
                        // Откроем балун.
                        activeRoute.balloon.open();
                    }
                });

            });
            // Функция, вычисляющая стоимость доставки.
            function calculate(routeLength) {
                return [Math.max(routeLength * DELIVERY_TARIFF_STANDART, MINIMUM_COST),
                        Math.max(routeLength * DELIVERY_TARIFF_KOMFORT, MINIMUM_COST),
                        Math.max(routeLength * DELIVERY_TARIFF_BIZNESS, MINIMUM_COST),
                        Math.max(routeLength * DELIVERY_TARIFF_MINIVEN, MINIMUM_COST)]; 
            }
        }






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
    typeChairOrder.style.left = `${elem.offsetLeft + 15}px`;
    typeChairOrder.style.top = `${elem.offsetTop - 250}px`;

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



// ==============----------------КАРТА

    // import 'https://api-maps.yandex.ru/2.1/?apikey=05486df5-e6c5-4af5-9e77-9d2577baec00&lang=ru_RU';
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    // ymaps.ready(init);
    // function init(){
        // Создание карты.
    //     let myMap = new ymaps.Map("map", {
    //         // Координаты центра карты.
    //         // Порядок по умолчанию: «широта, долгота».
    //         // Чтобы не определять координаты центра карты вручную,
    //         // воспользуйтесь инструментом Определение координат.
    //         center: [55.76, 37.64],
    //         // Уровень масштабирования. Допустимые значения:
    //         // от 0 (весь мир) до 19.
    //         zoom: 7
    //     });
    // }



// ====================== SWIPER CALLBACK

import './swiper-bundle.js'

new Swiper('.swiper', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    spaceBetween: 20,

    loop: true,
});




