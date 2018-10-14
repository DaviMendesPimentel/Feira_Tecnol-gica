//cria um contrutor para a "classe" "Quiz"
var Quiz = function (questoes){
    this.record = 0;
    this.questoes = questoes;
    this.questoes_do_Index = 0;
}

Quiz.prototype.getQuestoes_do_Index = function(){   //torna "getQuestoes_do_Index" 
                                                    //um método de "Quiz"

    return this.questoes[this.questoes_do_Index];   //retorna questoes[questoes_do_Index]
                                                    //do objeto chamador
};

Quiz.prototype.acabado = function(){    //torna "acabado" 
                                        //um método de "Quiz"
    return this.questoes.length === this.questoes_do_Index;
};

Quiz.prototype.achado = function(escolha){     //torna "achado" 
                                        //um método de "Quiz"
    this.questoes_do_Index++;   //incrementa para a próxima questão

    if(this.getQuestoes_do_Index().validacao_resposta(escolha))
        this.record++;
}
