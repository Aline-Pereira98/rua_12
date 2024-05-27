$(document).ready(function() {
    const form = $("#form");
    const placa = $("#placa");
    const chassi = $("#chassi");
    const modelo = $("#modelo");
    const montadora = $("#montadora");
    const situacao = $("#situacao");
    const message = $('#message');


    //Criando o evento do pop-up
    // form.on("submit", (event) => {
    //     event.preventDefault();
    //     checkForm();
    // });

    form.on("submit", (event) => {
        event.preventDefault(); 
        //console.log("Submit acionado")
        console.log(form.serialize());
        if (checkForm()) {
            //se o formulário estiver válido, envia os dados via AJAX
            
            $.ajax({
                url: "cadastrar_carro.php", 
                method: "POST",
                data: form.serialize(), // 
                success: function(response) {
                    console.log(response);
                },
                error: function(xhr, status, error) {
                    console.error(error);
                }
            });
        }
    });
    
    // ----- Verifica e tira o foco quando o campo é preenchido -------
    placa.on("blur", () => {
        checkInputPlaca();
    });

    chassi.on("blur", () => {
        checkInputChassi();
    });

    modelo.on("blur", () => {
        checkInputModelo();
    });

    montadora.on("blur", () => {
        checkInputMontadora();
    });

    situacao.on("blur", () => {
        checkInputSituacao();
    });

    // ----- Funções para validar o form ------------------------------
    function checkInputPlaca() {
        const placaValue = placa.val();

        if (placaValue === "") {
            errorInput(placa, "A placa é obrigatória");
        } else {
            const formItem = placa.parent();
            formItem.removeClass('error').addClass('form-content');
        }
    }

    function checkInputChassi() {
        const chassiValue = chassi.val();

        if (chassiValue === "") {
            errorInput(chassi, "O chassi é obrigatório");
        // } else if (chassiValue.length < 17) {
        //     errorInput(chassi, "O chassi precisa ter no mínimo 17 caracteres.");
        } else {
            const formItem = chassi.parent();
            formItem.removeClass('error').addClass('form-content');
        }
    }

    function checkInputModelo() {
        const modeloValue = modelo.val();

        if (modeloValue === "") {
            errorInput(modelo, "O modelo é obrigatório");
        } else {
            const formItem = modelo.parent();
            formItem.removeClass('error').addClass('form-content');
        }
    }

    function checkInputMontadora() {
        const montadoraValue = montadora.val();

        if (montadoraValue === "") {
            errorInput(montadora, "A montadora é obrigatória");
        } else {
            const formItem = montadora.parent();
            formItem.removeClass('error').addClass('form-content');
        }
    }

    function checkInputSituacao() {
        const situacaoValue = situacao.val();

        if (situacaoValue === "") {
            errorInput("A situacao é obrigatória");
        } else {
            const formItem = situacao.parent();
            formItem.removeClass('error').addClass('form-content');
        }
    }

    

    // ----- Verifica se existe algum campo vazio ------------------
    function checkForm() {
        // Chamando cada função de input
        checkInputPlaca();
        checkInputChassi();
        checkInputModelo();
        checkInputMontadora();
        checkInputSituacao();

        const formItems = $(".form-content");

        const isValid = [...formItems].every((item) => {
            return item.className === "form-content";
        });

        if (isValid) {
            alert("Veiculo cadastrado com sucesso!");
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
