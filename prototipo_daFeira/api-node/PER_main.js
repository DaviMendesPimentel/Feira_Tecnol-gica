
function populate(){
    if(quiz.acabado()){
        //Mostra os Records;
    }
    else{
        //Mostra as questões
        var elementoQuestao = document.getElementById("questoes"); //pega o id "questoes" do arquivo index.html
        elementoQuestao.innerHTML = quiz.getQuestoes_do_Index().text;   //preenche o "questoes" do HTML com o retorno de
                                                            //getQuestoes_do_Index()

        var escolhas = quiz.getQuestoes_do_Index().escolhas;

        for(var i = 0; i < escolhas; i++){
            var elemento = document.getElementById("esc" + i);
            elemento.innerHTML = escolhas[i];
        }
    }
}

//perguntas, opções de escolha e respostas
var quiz_completo = [
    new Questao("Qual foi o primeiro computador eletrônico ja criado?",["ENIAC", "ALTAIR", "Abaco", "Apple I"], "ENIAC"),
    new Questao("Quem foi Steve Jobs e Bill Gates, respectivamente:",["Fundador da Digital e criador do BASIC",
                                                                      "Fundadores do Atari e da Apple",
                                                                      "Fundadores da Apple e Microsoft", 
                                                                      "Criadores do Iphone e da linguagem C"], 
                                                                      "Fundadores da Apple e Microsoft"),
    new Questao("Quem foi o(a) primeiro(a) programador(a) da historia?",["Thomas Edson",
                                                                         "Bill Gates", 
                                                                         "Dennis Ritchie", 
                                                                         "Ada Lovelace"],
                                                                         "Ada Lovelace"),
    new Questao("O que sao Redes de Computadores?",["Sao meios digitais utilizados para comunicacao entre dados externos",
                                                    "Sao lencois enormes que transmitem eletrons entre PCs",
                                                    "Sao Equipamentos que transmitem e recebem sinais em codigo Morse",
                                                    "Sao cartas de papel escritas em qualquer linguagem para computadores entenderem"],
                                                    "Sao meios digitais utilizados para comunicacao entre dados externos"),
    new Questao("Qual foi a primeira linguagem de programação que existiu na história da computação",
                ["C++", "Java", "Assembly", "Linguagem C"], "Assembly")
];

var quiz = new Quiz(quiz_completo);