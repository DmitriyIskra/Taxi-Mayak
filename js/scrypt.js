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



// --- вызов и работа модального окна в POPULAR
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

    // управление формой выбора типа кресла
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

    //  Активация выбора кресла END 

// --- END вызов и работа модального окна в POPULAR




// // --- РАСЧЕТ ЦЕНЫ START 
import {calcPrice} from './show-price.js';

calcPrice.registerEvent();

// // ============ END УПРАВЛЕНИЕ ФОРМОЙ ПОПУЛЯРНЫЕ НАПРАВЛЕНИЯ 





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
            routePanelControl.routePanel.options.set({
                types: {auto: true}
            });


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
                                '<span>Ориентировочная стоимость поездки:' + '</span><br/>' +
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
import controlFormOrder from './controlFormOrder.js'

const contrFormOrder = new controlFormOrder(orderForm);
contrFormOrder.registerEvents();





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




