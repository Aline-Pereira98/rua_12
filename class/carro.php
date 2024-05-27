<?php

include_once '../database/connection.php';

class Carro {
    private $conn;
    private $table_name = "tbl_veiculo";

    public $placa;
    public $chassi;
    public $modelo;
    public $montadora;
    public $situacao;

    public function __construct($conn){
        $this->conn = $conn;
    }

    
    public function create () {
        $query = "INSERT INTO " . $this->table_name . " (placa, chassi, modelo, montadora, situacao) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);   // Preparar a consulta SQL para execução
        
        $stmt->bind_param("sssss", $this->placa, $this->chassi, $this->modelo, $this->montadora, $this->situacao); // Vincular os parâmetros da consulta com os valores
        
        if ($stmt->execute()) {
            return true;
        }
        var_dump($stmt->error);

        return false;
        
    }
    
}