class Validator {
    constructor() {
        this.validations = [
            'data-min-length'

        ]
    }
    //iniciar validação de todos os campos
    validate(form){

        //pegar todos os inputs do formulario
        let inputs = form.getElementsByTagName('input');
        //transformar htmlCollection -> array
        let inputsArray = [...inputs];
        //lup dos inputs
        inputsArray.forEach(function(input){
            //loop de todas as validaçoes existentes
            for(let i = 0; this.validations.length > i; i++){
                //Verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null){
                    //Limpando a string para virar um método
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    //valor do input
                    let value = input.getAttribute(this.validations[i]);

                    //invocar o método
                    this[method](input, value);
                }
            }

        }, this);
    }
    //verificar se um input tem um numero minimo de caractere
    minlength(input, minValue){
        let inputLength = input.value.length;

        let errorMenssage = `O campo precisa ter pelo menos ${minValue} caractere`;

        if(inputLength < minValue){
            this.printMenssage(input, errorMenssage);
        }
        

    }
    //método para imprimir menssagem de erro na tela
    printMenssage(input, msg){
        let template = document.querySelector('.erro-validation').cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;
        
        template.classList.remove('template');

        inputParent.appendChild(template);

    }
};

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

//evento que dispara as validações

submit.addEventListener('click', function(e){

    e.preventDefault();
    
    validator.validate(form);
})