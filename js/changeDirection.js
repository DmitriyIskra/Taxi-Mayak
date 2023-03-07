export default class ChangeDirection {
    constructor(element) {
        this.element = element,
        this.toSeaDirection = document.querySelector('.popular__wr-direction_tosea'),
        this.toBackDirection = document.querySelector('.popular__wr-direction_toback'),
        this.lastActiveElement = this.element.querySelector('.popular__direction_active'),
        this.lastActiveDirectionEl = this.toSeaDirection
    }

    changeElementsDirection(el) {
        if(el.classList.contains('popular__select-direction_active')) {
            return;
        }

        el.classList.add('popular__select-direction_active');
        this.lastActiveDirectionEl.classList.remove('popular__select-direction_active');
        this.lastActiveDirectionEl = el;
    }

    changeActiveBatton(el) {
        if(el.classList.contains('popular__direction_active')) {
            return;
        }  
        el.classList.add('popular__direction_active');
        this.lastActiveElement.classList.remove('popular__direction_active');
        this.lastActiveElement = el;
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