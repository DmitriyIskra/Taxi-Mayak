export default class FormPopular {
    constructor(formPopular, formTypeChair, windowWidth) {
        this.formPopular = formPopular;
        this.formTypeChair = formTypeChair;
        this.windowWidth = windowWidth;
        this.orderResultSend = this.formPopular.querySelector('.popular__result-send')
        this.lastActiveInputChair = null;
        this.formData = null;
    } 


    openFormTypeChairs(top, left) {    // Активация формы выбора при нажатии на выбор кресла
        this.formTypeChair.classList.add('wr-type-chair_active'); // Активируем форму выбора типа кресла
    
        this.formTypeChair.style.top = top;  // Задаем координаты
        this.formTypeChair.style.left = left;
    
        if(this.lastActiveInputChair.value !== '') {  // Если кресло выбрано, и открывается повторно выствляется нужный radio
            let elem = this.formTypeChair.querySelector(`[data-set="${this.lastActiveInputChair.value}"]`); 
            elem.checked = true;
        }
    }
    
    closeFormTypeChair(el) {  // Закрытие формы типа кресла
        el.classList.remove('wr-type-chair_active');
    };

    resetFormTypeChair(el) {  // Cброс формы типа кресла
        el.reset();
    };

    chooseTypeChair(el) {  // Берем выбранный тип кресла, вставляем его в поле
        this.lastActiveInputChair.value = el.textContent;
        this.closeFormTypeChair(this.formTypeChair); // Закрываем модальное окно
    };

    ResultSendOrder(status) { // Позиция модального окна результат отправки
        if(status) {
            this.orderResultSend.style.display = 'block';
        }
        else {
            this.orderResultSend.textContent = 'Ошибка, попробуйте позже или позвоните нам'
            this.orderResultSend.style.display = 'block';
        }
    }

    async formSend(form) {
        this.formData = new FormData(form);
        
        let response = await fetch('sendmail.php', {
            method: 'POST',
            body: this.formData
        })

        if(response.ok) {
            this.ResultSendOrder(true);
            form.reset();
        }
        else {
            this.ResultSendOrder(false);
        }
    }


    registerEvents() {
        this.formPopular.addEventListener('focus', (e) => { // Управление формой POPULAR
            if(e.target.matches('.popular__choose-chair')  && this.windowWidth > 976 ) { // Открытие формы выбора типа кресла
                this.lastActiveInputChair = e.target;
                this.openFormTypeChairs(`${e.target.offsetTop - 320}px`, `${e.target.offsetLeft + 5}px`); // в зависимости от ширины экрана `250px`, `515px`
            }
            else if(e.target.matches('.popular__choose-chair')  && this.windowWidth < 976 ) {
                this.lastActiveInputChair = e.target;
                this.formTypeChair.querySelector('.popular__type-chair-list').style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
                this.openFormTypeChairs(`${e.target.offsetTop - 320}px`, `${e.target.offsetLeft + 5}px`);
            }
        }, true)


        this.formTypeChair.addEventListener('click', (e) => {   // управление формой выбора типа кресла
            if(e.target.matches('.popular__close')) {
                this.closeFormTypeChair(this.formTypeChair);
                this.resetFormTypeChair(this.formTypeChair);
            };
            
            if(e.target.matches('.popular__label-type-chair')) {
                this.chooseTypeChair(e.target);
            };
        })


        this.formPopular.addEventListener('submit', (e) => { // Отмена стандартного поведения формы заказа
            e.preventDefault();
            this.formSend(this.formPopular);
        })
    }; // END RegisterEvents
}; // END Class