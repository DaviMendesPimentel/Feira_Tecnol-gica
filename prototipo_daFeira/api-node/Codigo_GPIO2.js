var Gpio = require('onoff').Gpio;
var botao_A = new Gpio(7, 'in', 'both', {debounceTimeout: 10});
var botao_B = new Gpio(11, 'in', 'both', {debounceTimeout: 10});
var botao_C = new Gpio(13, 'in', 'both', {debounceTimeout: 10});
var botao_D = new Gpio(15, 'in', 'both', {debounceTimeout: 10});

function verifBotoes(Questao){
    if(Questao.validacao_resposta()){
        var LGr = new ledVerde();
        LGr.onGreen();
    }else{
        var LRe = new ledVermelha();
        LRe.onRed();
    }
}