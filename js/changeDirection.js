export default class ChangeDirection {
    constructor(element) {
        this.element = element,
        this.toSeaDirection = document.querySelector('.popular__wr-direction_tosea');
        this.toBackDirection = document.querySelector('.popular__wr-direction_toback');
        this.lastActiveElement = this.element.querySelector('.popular__direction_active');
        this.lastActiveDirectionEl = this.toSeaDirection;
        this.showPrice = this.element.querySelector('.popular__price');

        this.to = this.element.querySelector('.popular__select-where');
        this.from = this.element.querySelector('.popular__select-from');
    }

    changeElementsDirection(el) {
        if(el.classList.contains('popular__select-direction_active')) {
            return;
        }

        el.classList.add('popular__select-direction_active');
        this.lastActiveDirectionEl.classList.remove('popular__select-direction_active');
        this.lastActiveDirectionEl = el;

        this.to = el.querySelector('.popular__select-where');  // В этот метод передается конкретный элемент в зависимости от кнопки
        this.from = el.querySelector('.popular__select-from'); // и в нем мы можем взять наши поля и переназначить, если элемент меняется
    }

    changeActiveBatton(el) {
        if(el.classList.contains('popular__direction_active')) {
            return;
        }  
        el.classList.add('popular__direction_active');
        this.lastActiveElement.classList.remove('popular__direction_active');
        this.lastActiveElement = el;

        this.showPrice.textContent = ''; // сброс формы и цены при переключении формы
        this.element.reset();
    }

    resaveElementsToFrom(to, from) {
        this.to = to;
        this.from = from;
    }

    registerEvent() {
        this.element.addEventListener('click', (e) => {
            if(e.target.matches('.popular__button-back')) {
                this.changeActiveBatton(e.target);
                this.changeElementsDirection(this.toBackDirection);
            }

            if(e.target.matches('.popular__button-to-sea')) {
                this.changeActiveBatton(e.target);
                this.changeElementsDirection(this.toSeaDirection);
            }
        });
    };
};

