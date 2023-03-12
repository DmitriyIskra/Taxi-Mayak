export default class ControlFormOrder {
    constructor(element) {
        this.element = element;
        this.typeChairOrder = document.querySelector('.wr-price-order__wr-modal-type-chair');
        this.orderResultSend = document.querySelector('.wr-price-order__result-send');
        this.lastActiveInputChairOrder = null;
    }

    openFormTypechairsOrder(elem) {  // Открываем модальное окно
        this.lastActiveInputChairOrder = elem;   // Присваиваем последний активный элемент
        this.typeChairOrder.classList.toggle('wr-modal-type-chair-order_active');
        this.typeChairOrder.style.width = `${elem.offsetWidth}px`
        this.typeChairOrder.style.left = `${elem.offsetLeft + 15}px`;
        this.typeChairOrder.style.top = `${elem.offsetTop - 250}px`;
    
        if(this.lastActiveInputChairOrder.value !== '') {
            let findedRadio = this.typeChairOrder.querySelector(`[data-set="${this.lastActiveInputChairOrder.value}"]`); 
            findedRadio.checked = true;
        }
    };

    addTypeChair(elem) { // Заполняем поле выбранным типом кресла 
        this.lastActiveInputChairOrder.value = elem.textContent;
        this.closeModalFormOrder();
    }
    
    closeModalFormOrder(elem) { // Функция закрытия модального окна по кнопке close
        this.typeChairOrder.classList.remove('wr-modal-type-chair-order_active');
    };

    positionModalResultOrder(status) { // Позиция модального окна результат отправки
        if(status) {
            this.orderResultSend.style.display = 'block';
            this.orderResultSend.style.top = `${el.offsetTop + 60}px`;
            this.orderResultSend.style.left = `${el.offsetLeft}px`;
        }
        else {
            this.orderResultSend.textContent = 'Ошибка, попробуйте позже или позвоните нам'
            this.orderResultSend.style.display = 'block';
            this.orderResultSend.style.top = `${el.offsetTop + 60}px`;
            this.orderResultSend.style.left = `${el.offsetLeft}px`;
        }
    }

    async formSend(el) {
        let formData = new formData(el);

        let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
        })

        if(response.ok) {
            this.positionModalResultOrder(true);
            el.reset();
        }
        else {
            this.positionModalResultOrder(false);
        }
    }

    registerEvents() {
        this.element.addEventListener('click', (e) => {
            if(e.target.matches('.wr-price-order__type-chair')) { // Открытие формы выбора типа кресла
                this.openFormTypechairsOrder(e.target);
            };
        
            // if(e.target.matches('.wr-price-order__button-submit')) {
            //     this.positionModalResultOrder(e.target);
            // }            
        }, true);

        this.element.addEventListener('submit', (e) => { // Отмена стандартного поведения формы заказа
            e.preventDefault();
            this.formSend(this.element)
        })

        this.typeChairOrder.addEventListener('click', e => {
            if(e.target.matches('.wr-price-order__close')) {
                this.closeModalFormOrder(e.target);
            };
        
            if(e.target.matches('.wr-price-order__label-type-chair')) {
                this.addTypeChair(e.target)
            }
        });
    }
}