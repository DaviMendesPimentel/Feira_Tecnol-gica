
//cria um contrutor para uma "classe" "Questão"
function Questao(texto, escolhas, resposta){
    this.texto = texto;
    this.escolhas = escolhas;
    this.resposta = resposta;
}

Questao.prototype.validacao_resposta = function (escolha){ //torna "validacao_resposta" um método
                                                        // de "Questão"
    return escolha == this.resposta;    // verifica a condição e retorna "true" ou "false"
}