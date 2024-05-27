const form = document.getElementById("form");
const username = document.getElementById("username");
const cpf = document.getElementById("cpf");
const email = document.getElementById("email");
const cep = document.getElementById("cep");
const street = document.getElementById("street");
const number = document.getElementById("number");
const bairro = document.getElementById("bairro");
const city = document.getElementById("city");
const state = document.getElementById("state");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");
const message = document.getElementById('message');

//Busca CEP
cep.addEventListener('focusout', async()=> {
    try {
        const onlyNumbers = /^[0-9]+$/;
        const cepValid = /^[0-9]{8}$/;

        if (!onlyNumbers.test(cep.value) || !cepValid.test(cep.value)){
            throw {cep_error: 'Cep invalido'};
        }

        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

        if (!response.ok) {
            throw await response.json();
        }

        const responseCep = await response.json();
        street.value = responseCep.logradouro;
        bairro.value = responseCep.bairro;
        city.value = responseCep.localidade;
        state.value = responseCep.uf;


    } catch (error){
        if(error?.cep_error){
            message.textContent = error.cep_error;
            setTimeout(() => {
                message.textContent = '';
            }, 5000);
        }
        console.log(error);
    }
})


//criando o evento do pop-up
form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    checkForm();
})


//----- Verifica e tira o foco quando o campo e preenchido -------
username.addEventListener("blur", () => {
    checkInputUsername();
})

cpf.addEventListener("blur", () => {
    checkInputCpf();
})

email.addEventListener("blur", () => {
    checkInputEmail();
})

cep.addEventListener("blur", () => {
    checkInputCep();
})

password.addEventListener("blur", () => {
    checkInputPassword();
})

passwordConfirmation.addEventListener("blur", () => {
    checkInputPasswordConfirmation();
})

//----- Funcoes para validar o form ------------------------------

function checkInputUsername(){
    const usernameValue = username.value;

    //se estiver vazio, ira retornar essa message
    if(usernameValue === ""){
        errorInput(username, "Preencha o nome do beneficiario")
    } else {
        const formItem = username.parentElement;
        formItem.classList = "form-content"
    }
}

function checkInputCpf(){
    const cpfValue = cpf.value;

    //se estiver vazio, ira retornar essa message
    if(cpfValue === ""){
        errorInput(cpf, "O CPF e obrigatório")
    } else if(cpfValue.lenght < 11){
        errorInput(cpf, "O CPF precisa ter no minimo 11 caracteres.")
    } else {
        const formItem = cpf.parentElement;
        formItem.className = "form-content"
    }
}

function checkInputEmail(){
    const emailValue = email.value;

    //se estiver vazio, ira retornar essa message
    if(emailValue === ""){
        errorInput(email, "O email e obrigatório")
    } else {
        const formItem = email.parentElement;
        formItem.className = "form-content"
    }
}

function checkInputCep(){
    const cepValue = cep.value;

    //se estiver vazio, ira retornar essa message
    if(cepValue === ""){
        errorInput(cep, "O cep e obrigatório")
    } else if(cepValue.lenght < 8){
        errorInput(cep, "O cep precisa ter no minimo 8 caracteres.")
    } else {
        const formItem = cep.parentElement;
        formItem.className = "form-content"
    }
}

function checkInputPassword(){
    const passwordValue = password.value;

    //se estiver vazio, ira retornar essa message
    if(passwordValue === ""){
        errorInput(password, "A senha e obrigatória")
    } else if(passwordValue.lenght < 8){
        errorInput(password, "A senha precisa ter no minimo 8 caracteres.")
    } else {
        const formItem = password.parentElement;
        formItem.className = "form-content"
    }
}

function checkInputPasswordConfirmation(){
    const passwordValue = password.value;
    const confirmationPasswordValue = passwordConfirmation.value;
  
    if(confirmationPasswordValue === ""){
      errorInput(passwordConfirmation, "A confirmação de senha é obrigatória.")
    }else if(confirmationPasswordValue !== passwordValue){
      errorInput(passwordConfirmation, "As senhas não são iguais.")
    }else{
      const formItem = passwordConfirmation.parentElement;
      formItem.className = "form-content"
    }
}

//----- Verifica se existe algum campo vazio ------------------
function checkForm(){
    //chamando cada funcao de input
    checkInputUsername();
    checkInputCpf();
    checkInputEmail();
    checkInputCep();
    checkInputPassword();
    checkInputPasswordConfirmation();

    const formItems = form.querySelectorAll(".form-content")

    const isValid = [...formItems].every((item) => {
        return item.className === "form-content"
    });

    if (isValid){
        alert("Cadastrado com sucesso!")
    }

}
//----- Pegar menssagem de erro no ancora --------------------
function errorInput(input, message){
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a")

    textMessage.innerText = message;

    formItem.className = "form-content error"
}