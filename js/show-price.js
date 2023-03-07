
import {price} from './price.js'

class CalcPrice{
    constructor(price) {
        this.element = document.querySelector('.popular__form');
        this.buttonToSea = this.element.querySelector('.popular__button-to-sea');
        this.buttonToBack = this.element.querySelector('.popular__button-back');
        this.to = this.element.querySelector('.popular__select-where');
        this.from = this.element.querySelector('.popular__select-from');
        this.toBack = this.element.querySelector('.popular__select-where_back');
        this.fromBack = this.element.querySelector('.popular__select-from_back');
        this.price = price;
        this.classCar = this.element.querySelector('.popular__select-car-class');
        this.meet = this.element.querySelector('.popular__meet-with-sign');
        this.showPrice = this.element.querySelector('.popular__price');
    };


    getPrice(from, to, classCar, meetPrice) { // Показывает цену в + или - встреча с табличкой
        if(this.buttonToSea.classList.contains('popular__direction_active')) {
            this.showPrice.textContent = `${this.price[classCar][from][to] + meetPrice}₽`; 
        }
        
        if(this.buttonToBack.classList.contains('popular__direction_active')) {
            this.showPrice.textContent = `${this.price[classCar][to][from] + meetPrice}₽`;
        }      
    };

    calcPriceForMeet(text, bool) {  // Если цена показывается то при срабатывании чекбокса встреча с табличкой меняет цену
        text = parseInt(text);

        this.showPrice.textContent = bool ? `${text + 300}₽` : `${text - 300}₽`;
    }

    validateForm() { // Валидация заполненности полей формы на море и объявление цены если все заполненны и при бавляет цену если есть встреча с табличкой
        if(this.from.value && this.to.value && this.classCar.value && this.meet.checked) {
            this.getPrice(this.from.value, this.to.value, this.classCar.value, 300); // Вызываем расчет цены
        }                                                                                      // Принимает isBack и перенаправляет

        if(this.from.value && this.to.value && this.classCar.value && !this.meet.checked) {
            this.getPrice(this.from.value, this.to.value, this.classCar.value, 0);
        }
        
        
        if(this.fromBack.value && this.toBack.value && this.classCar.value && this.meet.checked) {
            this.getPrice(this.fromBack.value, this.toBack.value, this.classCar.value, 300); // Вызываем расчет цены
        }                                                                                      // Принимает isBack и перенаправляет

        if(this.fromBack.value && this.toBack.value && this.classCar.value && !this.meet.checked) {
            this.getPrice(this.fromBack.value, this.toBack.value, this.classCar.value, 0);
        }
    }

    registerEvent() { // Навешиваем события на элементы формы
        this.from.addEventListener('change', (e) => { // По событию на изменение элемента from
                this.validateForm(); // Проверяет как считать цену со встречей с табличкой или нет и проверяет заполненность необходимых полей
        });

        this.to.addEventListener('change', (e) => { // По событию на изменение элемента to
            this.validateForm();
        });

        this.fromBack.addEventListener('change', (e) => { // По событию на изменение элемента from
            this.validateForm(); // Проверяет как считать цену со встречей с табличкой или нет и проверяет заполненность необходимых полей
        });

        this.toBack.addEventListener('change', (e) => { // По событию на изменение элемента to
            this.validateForm();
        });

        this.classCar.addEventListener('change', (e) => { // По событию на изменение элемента classCar
            this.validateForm();
        });

        this.meet.addEventListener('change', (e) => { // Изменение цены по выбору чекбокса встреча с табличкой, работает если цена уже объявлена
            if(this.meet.checked && this.showPrice.textContent) {
                this.calcPriceForMeet(this.showPrice.textContent, true) // true если табличка выбрана
            }

            if(!this.meet.checked && this.showPrice.textContent) {
                this.calcPriceForMeet(this.showPrice.textContent)
            }
        })
    };
};

export const calcPrice = new CalcPrice(price);
