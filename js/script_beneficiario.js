$(document).ready(function() {
    const form = $("#form");
    const username = $("#username");
    const cpf = $("#cpf");
    const email = $("#email");
    const cep = $("#cep");
    const street = $("#street");
    const number = $("#number");
    const bairro = $("#bairro");
    const city = $("#city");
    const state = $("#state");
    const password = $("#password");
    const passwordConfirmation = $("#password-confirmation");
    const message = $('#message');

    // Busca CEP
    cep.on('focusout', async () => {
        try {
            const onlyNumbers = /^[0-9]+$/;
            const cepValid = /^[0-9]{8}$/;

            if (!onlyNumbers.test(cep.val()) || !cepValid.test(cep.val())) {
                throw { cep_error: 'Cep inválido' };
            }

            const response = await fetch(`https://viacep.com.br/ws/${cep.val()}/json/`);

            if (!response.ok) {
                throw await response.json();
            }

            const responseCep = await response.json();
            street.val(responseCep.logradouro);
            bairro.val(responseCep.bairro);
            city.val(responseCep.localidade);
            state.val(responseCep.uf);

        } catch (error) {
            if (error?.cep_error) {
                message.text(error.cep_error);
                setTimeout(() => {
                    message.text('');
                }, 5000);
            }
            console.log(error);
        }
    });

    //Criando o evento do pop-up
    form.on("submit", (event) => {
        event.preventDefault();
        checkForm();
    });
    // $(document).ready(function() {
    //     const form = $("#form");
    //     const submitBtn = $("#submit-btn");
    
    //     // Evento de clique no botão de envio
    //     submitBtn.on("click", function() {
    //         // Coletar os dados do formulário
    //         const formData = form.serialize();
    
    //         // Enviar os dados do formulário para o servidor usando Ajax
    //         $.ajax({
    //             type: "POST",
    //             url: "url_do_servidor",
    //             data: formData,
    //             success: function(response) {
    //                 console.log("Deu bom! Resposta do servidor:", response);
    //             },
    //             error: function(xhr, status, error) {
    //                 console.error("Deu ruim. Erro de requisição Ajax:", status, error);
    //             }
    //         });
    //     });
    // });
    

    // ----- Verifica e tira o foco quando o campo é preenchido -------
    username.on("blur", () => {
        checkInputUsername();
    });

    cpf.on("blur", () => {
        checkInputCpf();
    });

    email.on("blur", () => {
        checkInputEmail();
    });

    cep.on("blur", () => {
        checkInputCep();
    });

    password.on("blur", () => {
        checkInputPassword();
    });

    passwordConfirmation.on("blur", () => {
        checkInputPasswordConfirmation();
    });

    // ----- Funções para validar o form ------------------------------
    function checkInputUsername() {
        const usernameValue = username.val();

        if (usernameValue === "") {
            errorInput(username, "Preencha o nome do beneficiário");
        } else {
            const formItem = username.parent();
            formItem.removeClass('error').addClass('form-content');
        }
    }

    function checkInputCpf() {
        const cpfValue = cpf.val();

        if (cpfValue === "") {
            errorInput(cpf, "O CPF é obrigatório");
        } else if (cpfValue.length < 11) {
            errorInput(cpf, "O CPF precisa ter no mínimo 11 caracteres.");
        } else {
            const formItem = cpf.parent();
            formItem.removeClass('error').addClass('form-content');
        }
    }

    function checkInputEmail() {
        const emailValue = email.val();

        if (emailValue === "") {
            errorInput(email, "O email é obrigatório");
        } else {
            const formItem = email.parent();
            formItem.removeClass('error').addClass('form-content');
        }
    }

    function checkInputCep() {
        const cepValue = cep.val();

        if (cepValue === "") {
            errorInput(cep, "O cep é obrigatório");
        } else if (cepValue.length < 8) {
            errorInput(cep, "O cep precisa ter no mínimo 8 caracteres.");
        } else {
            const formItem = cep.parent();
            formItem.removeClass('error').addClass('form-content');
        }
    }

    function checkInputPassword() {
        const passwordValue = password.val();

        if (passwordValue === "") {
            errorInput(password, "A senha é obrigatória");
        } else if (passwordValue.length < 8) {
            errorInput(password, "A senha precisa ter no mínimo 8 caracteres.");
        } else {
            const formItem = password.parent();
            formItem.removeClass('error').addClass('form-content');
        }
    }

    function checkInputPasswordConfirmation() {
        const passwordValue = password.val();
        const confirmationPasswordValue = passwordConfirmation.val();

        if (confirmationPasswordValue === "") {
            errorInput(passwordConfirmation, "A confirmação de senha é obrigatória.");
        } else if (confirmationPasswordValue !== passwordValue) {
            errorInput(passwordConfirmation, "As senhas não são iguais.");
        } else {
            const formItem = passwordConfirmation.parent();
            formItem.removeClass('error').addClass('form-content');
        }
    }

    // ----- Verifica se existe algum campo vazio ------------------
    function checkForm() {
        // Chamando cada função de input
        checkInputUsername();
        checkInputCpf();
        checkInputEmail();
        checkInputCep();
        checkInputPassword();
        checkInputPasswordConfirmation();

        const formItems = $(".form-content");

        const isValid = [...formItems].every((item) => {
            return item.className === "form-content";
        });

        if (isValid) {
            alert("Cadastrado com sucesso!");
        }
    }

    // ----- Pegar mensagem de erro no ancora --------------------
    function errorInput(input, message) {
        const formItem = input.parent();
        const textMessage = formItem.find("a");

        textMessage.text(message);

        formItem.addClass("form-content error");
    }
});
