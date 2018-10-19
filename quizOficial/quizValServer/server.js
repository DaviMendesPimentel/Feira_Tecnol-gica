var iterador = 0;						// variável responsável por armazenar o número da questão
var respostas = [0, 2, 3, 0, 2];				// cria um vetor responsável por armazenar as respostas das questões
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

// função responsável por validar a escolha com base no vetor de 'respostas' criado a cima
function validacao(escolha) {	// recebe 'escolha' como argumento
        console.log("validacao chamada.");	// console.log() chamada por questões de debug
	if(respostas[iterador] == escolha){	// se o jogador acerto:
                var intervalo = setInterval(function(){	// cria um intervalor
                        if(LEDVERDE.readSync() == 0)	// se a led Verde estiver desligada
                                LEDVERDE.writeSync(1);	// liga a led Verde
                        else LEDVERDE.writeSync(0);	// se não, desliga ela
                }, 150);	// executa essa função a cada 0,15 segundos
		
		// executa 'clearInterval(interval)' após 1,0 segundo
		// 'clearInterval()' é uma função própria do javascript que quebra um intervalo, no caso o nosso 'intervalo'
		// e ainda desliga a led Verde
                setTimeout(function(){ clearInterval(intervalo); LEDVERDE.writeSync(0); }, 1000); // 1000 == 1 segundo

		if(iterador >= respostas.length){	// se o iterador for maior ou igual que o tamanho do vetor 'respostas'
                	iterador = 0;	// reseta o iterador
        	}else{	// se não:
                	++iterador;	// incrementa o iterador
       		 }
	        console.log("valor de iterador: " + iterador);	// mostra o valor de 'iterador' por questões de debug

		return true;	// retorna true, pois o jogador acertou a pergunta
	}else{	// se não
                var intervalo = setInterval(function(){	// cria um intervalo
                        if(LEDVERMELHA.readSync() == 0)	// se a led Vermelha estiver desligada
                                LEDVERMELHA.writeSync(1); // liga ela
                        else LEDVERMELHA.writeSync(0);	// se não, desliga ela
                }, 250); // executa isso a cada 0,25 segundos 
		
		// quebra o intervalor criado após 1,0 segundo
                setTimeout(function(){ clearInterval(intervalo); LEDVERMELHA.writeSync(0); }, 1000);

		if(iterador >= respostas.length){	// se o iterador for maior ou igual ao tamanho do vetor 'respostas'
                	iterador = 0;	// reseta o iterador
        	}else{	// se não:
               		 ++iterador;	// incrementa o 'iterador'
       		 }
	        console.log("valor de iterador: " + iterador); // mostra o valor de 'iterador' por questões de debug

		return false;	// retorna false, pois o jogador errou a pergunta
        }
  }	// fim de 'validacao()'

io.sockets.on('connection', function (socket) {		// cria uma conecção websocket com o client utilizando o namespace 'connection'

   socket.on('assistirBotoes', function(num_daQuestao){	// função ouvinte do evento 'assistirBotoes', recebe o número da questão
							// como argumento
	BOTAO0.watch(function (err, value) {	// assiste ao pino do 'BOTAO0'
		console.log("Botao0.watch...");	// 'console.log()' chamado por questões de debug
        	if(err){	// se a função devolver um erro:
                	console.log("erro ocorreu no botao0: " + err);	// mostra no console.
                	throw err;	// e dispara o erro para finalizar o programa
        	}
        	if(value != 0){	// se o valor do pino do 'BOTAO0' se tornar diferente de 0:
			console.log("Chamando validacao...");	// 'console.log()' chamado por questões de debug
                	var result = validacao(0, num_daQuestao); // 'result' recebe o valor de 'return' de 'validacao()'
                	io.emit('message', result);	// emit 'result' para todos os ouvintes 'message'(temos apenas 1 ouvinte
							// 'message')
                	}
        	});
	// execulta o mesmo algoritmo feito no 'BOTAO0' porém, com 1 ao invés do zero
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
	// execulta o mesmo algoritmo feito no 'BOTAO0' porém, com 2 ao invés do zero
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
	// execulta o mesmo algoritmo feito no 'BOTAO0' porém, com 3 ao invés do zero
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
