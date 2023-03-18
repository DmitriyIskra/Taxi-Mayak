export default class FormFooter {
    constructor(form) {
        this.form = form;
        this.messageSend = this.form.querySelector('.footer__result-send');
        this.formData = null;
    }



    showResultSend(result) {
        if(result) {
            this.messageSend.style.display = "block";
        } else {
            this.messageSend.textContent = "Что-то пошло не так, позвоните нам";
            this.messageSend.style.display = "block";
        }
    }

    async formSend(form) {
        this.formData = new FormData(form);
        
        let response = await fetch('sendmail.php', {
            method: 'POST',
            body: this.formData
        })

        if(response.ok) {
            this.showResultSend(true);
            form.reset();
        }
        else {
            this.showResultSend(false);
        }
    }

    registerEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.formSend(this.form);
        })
    }
}