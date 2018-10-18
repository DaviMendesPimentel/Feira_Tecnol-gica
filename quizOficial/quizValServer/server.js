var iterador = 0;
var respostas = [0, 2, 3, 0, 2];
var express = require('express'); 				// inclui a biblioteca 'express'
var appExpress = express(); 					// linka 'appExpress' com o contrutor 'express()'
var path = require("path"); 					// inclui a biblioteca 'path'
var fs = require("fs"); 					// inclui a biblioteca 'file system'
var inspect = require('object-inspect'); 			// inclui a biblioteca 'object-inspect'
var Gpio = require("onoff").Gpio; 				// inclui a biblioteca GPIO

var BOTAO0 = new Gpio(21, 'in', 'both', {debounceTimeout: 10}); // cria os botoes e configura-os
var BOTAO1 = new Gpio(20, 'in', 'both', {debounceTimeout: 10}); // para saida de
var BOTAO2 = new Gpio(16, 'in', 'both', {debounceTimeout: 10}); // ambos os lados
var BOTAO3 = new Gpio(12, 'in', 'both', {debounceTimeout: 10}); //

var LEDVERMELHA = new Gpio(17, 'out'); 				// instancia a LEDVERMELHA
var LEDVERDE = new Gpio(27, 'out'); 				// instancia a LEDVERDE

var http = require('http').Server(appExpress); 			// inclui a biblioteca 'http' e cria um servidor utilizando o appExpress

var io = require('socket.io')(http); 				// inclui a biblioteca 'socket.io' e passa o servidor de referência para execução

appExpress.use(express.static('public')); 			// configura o servidor para utilizar a pasta pública

const bodyParser = require('body-parser'); 			// inclui a biblioteca 'body-parser'
const middlewares = [
		express.static(path.join(__dirname + 'public')),
		bodyParser.json(),
		bodyParser.urlencoded({extended : true})
	];

appExpress.use(middlewares); 					// o servidor passa a utilizar as configurações do vetor 'middlewares'
appExpress.get('/', function(req, res){ 			// o servidor executa como referência primária o 'index.html' em 'src'
		res.sendFile( __dirname + '/src/index.html');
	});

appExpress.use('/libraries', express.static('node_modules')); 	//manda o servidor utilizar as bibliotecas da pasta node_modules

function validacao(escolha) {
        console.log("validacao chamada.");
	if(respostas[iterador] == escolha){
                var intervalo = setInterval(function(){
                        if(LEDVERDE.readSync() == 0)
                                LEDVERDE.writeSync(1);
                        else LEDVERDE.writeSync(0);
                }, 150);
                setTimeout(function(){ clearInterval(intervalo); LEDVERDE.writeSync(0); }, 1000);

		if(iterador >= 4){
                	iterador = 0;
        	}else{
                	++iterador;
       		 }
	        console.log("valor de iterador: " + iterador);

		return true;
	}else{
                var intervalo = setInterval(function(){
                        if(LEDVERMELHA.readSync() == 0)
                                LEDVERMELHA.writeSync(1);
                        else LEDVERMELHA.writeSync(0);
                }, 250);
                setTimeout(function(){ clearInterval(intervalo); LEDVERMELHA.writeSync(0); }, 1000);

		if(iterador >= 4){
                	iterador = 0;
        	}else{
               		 ++iterador;
       		 }
	        console.log("valor de iterador: " + iterador);

		return false;
        }
  }

io.sockets.on('connection', function (socket) {			// cria uma conecção websocket utilizando o namespace 'connection'

	socket.on('assistirBotoes', function(num_daQuestao){

	 BOTAO0.watch(function (err, value) {
	console.log("Botao0.watch...");
        if(err){
                console.log("erro ocorreu no botao0: " + err);
                throw err;
        }
        if(value != 0){
		console.log("Chamando validacao...");
                var result = validacao(0, num_daQuestao);
                io.emit('message', result);
                }
        });

 	BOTAO1.watch(function (err, value) {
        if(err){
                console.log("erro ocorreu no botao1: " + err);
                throw err;
        }
        if(value != 0){
                var result = validacao(1, num_daQuestao);
                io.emit('message', result);
                }
        });

 	BOTAO2.watch(function (err, value) {
	console.log("Botao2.watch...");
        if(err){
                console.log("erro ocorreu no botao2: " + err);
                throw err;
        }
        if(value != 0){
		console.log("Chamando validacao...");
                var result = validacao(2, num_daQuestao);
                io.emit('message', result);
                }
        });
    	BOTAO3.watch(function (err, value) {
        if(err){
                console.log("erro ocorreu no botao3: " + err);
                throw err;
        }
        if(value != 0){
                var result = validacao(3, num_daQuestao);
                io.emit('message', result);
                }
        });
	console.log("assistirBotoes invocada");
  });
});								//fim de 'io.sockets.on()'

process.on('SIGINT', function () { 				//quando 'ctrl+c' for pressionado
  LEDVERMELHA.writeSync(0); 					// deliga a led vermelha
  LEDVERMELHA.unexport(); 					// deleta o objeto 'LEDVERMELHA'
  LEDVERDE.writeSync(0); 					// desliga a led verde
  LEDVERDE.unexport(); 						// deleta o objeto 'LEDVERDE'
  BOTAO0.unexport(); 						// deleta o objeto 'BOTAO0'
  BOTAO1.unexport(); 						// deleta o objeto 'BOTAO1'
  BOTAO2.unexport(); 						// deleta o objeto 'BOTAO2'
  BOTAO3.unexport(); 						// deleta o objeto 'BOTAO3'
  process.exit(); 						//finaliza o programa completamente
});

http.listen(3000, function(){ 					// servidor conectado na porta 3000
  console.log('servidor on-line em: localhost:3000'); 		// mostra que o servidor está funcionando
});
