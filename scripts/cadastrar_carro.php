<?php
var_dump($_POST);

include_once '../database/connection.php';
include_once '../class/carro.php';



$conn = $conn; // Use a variável de conexão correta do arquivo de conexão

// Verifique se os dados foram enviados
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    var_dump($_POST); 
    $carro = new Carro($conn);

    // Verificar se os campos do formulário foram preenchidos
    if (!empty($_POST['placa']) && !empty($_POST['chassi']) && !empty($_POST['modelo']) && !empty($_POST['montadora']) && isset($_POST['situacao'])) {
        // Atribuir os valores do formulário às propriedades da classe Carro
        $carro->placa = $_POST['placa'];
        $carro->chassi = $_POST['chassi'];
        $carro->modelo = $_POST['modelo'];
        $carro->montadora = $_POST['montadora'];
        $carro->situacao = $_POST['situacao'];

        // Chamar o método create() para inserir o carro no banco de dados
        if ($carro->create()) {
            echo "Veículo cadastrado com sucesso!"; // Se a inserção foi bem-sucedida, exibir mensagem de sucesso
        } else {
            echo "Erro ao cadastrar veículo"; // Se a inserção falhou, exibir mensagem de erro
        }
    } else {
        echo "Por favor, preencha todos os campos do formulário."; // Se algum campo estiver vazio, exibir mensagem de erro
    }
} else {
    echo "O formulário não foi enviado."; // Se o método de envio não for POST, exibir mensagem de erro
}
?>
