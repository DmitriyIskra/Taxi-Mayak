import {price} from './price.js';

class CalcPrice {
    constructor(price) {
        this.element = document.querySelector('.popular__form');
        this.price = price
        this.from = this.element.querySelector('.popular__select-from');
        this.to = this.element.querySelector('.popular__select-where');
        this.classCar = this.element.querySelector('.popular__select-car-class');
        this.meet = this.element.querySelector('.popular__meet-with-sign');
        this.showPrice = this.element.querySelector('.popular__price');
    };


    getPrice(from, to, classCar, meetPrice) { // Показывает цену в + или - встреча с табличкой
        this.showPrice.textContent = `${this.price[classCar][from][to] + meetPrice}₽`; 
    };

    calcPriceForMeet(text, bool) {  // Если цена показывается то при срабатывании чекбокса встреча с табличкой меняет цену
        text = parseInt(text);

        this.showPrice.textContent = bool ? `${text + 300}₽` : `${text - 300}₽`;
    }

    validateForm() { // Валидация заполненности полей форм и объявление цены если все заполненны
        if(this.from.value && this.to.value && this.classCar.value && this.meet.checked) {
            this.getPrice(this.from.value, this.to.value, this.classCar.value, 300);
        }

        if(this.from.value && this.to.value && this.classCar.value && !this.meet.checked) {
            this.getPrice(this.from.value, this.to.value, this.classCar.value, 0);
        }    
    }

    registerEvent() { // Навешиваем события на элементы формы
        this.from.addEventListener('change', (e) => {
            this.validateForm();
        });

        this.to.addEventListener('change', (e) => {
            this.validateForm();
        });

        this.classCar.addEventListener('change', (e) => {
            this.validateForm();
        });



        this.meet.addEventListener('change', (e) => { // Изменение цены по выбору чекбокса встреча с табличкой, работает если цена уже объявлена
            if(this.meet.checked && this.showPrice.textContent) {
                this.calcPriceForMeet(this.showPrice.textContent, true)
            }

            if(!this.meet.checked && this.showPrice.textContent) {
                this.calcPriceForMeet(this.showPrice.textContent)
            }
        })
    };
};

const calcPrice = new CalcPrice(price);
export default calcPrice;