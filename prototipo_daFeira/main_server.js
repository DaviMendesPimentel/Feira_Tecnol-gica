var http = require('http').createServer(handler); //inclui a biblioteca 'http' e cria um servidor usando a função 'handler()' abaixo
var fs = require('fs'); //inclui a biblioteca de controle de arquivos
var io = require('socket.io')(http) //inclui a biblioteca 'socket.io' e a linka com o servidor(objeto http criado acima)
var Gpio = require('onoff').Gpio; //inclui a biblioteca que controlará a pinagem do raspberry
var LED = new Gpio(27, 'out'); //configura o GPIO21(pino 40) para saída de carga, usado para acender a led
var pushButton = new Gpio(20, 'in', 'both'); //configura o GPIO20(pino 38) para entrada de carga, usado para controlar o led

http.listen(8080); //define o endereço do servidor como 'localhost:8080'

//função de criação para o servidor, irrelevante para o secket.io
function handler (req, res) {
  fs.readFile(__dirname + '/public/HTML/index.html', function(err, data) { //o objeto fs lê o arquivo index.html que querermos
    if (err) {		// se um erro foi devolvido:
      res.writeHead(404, {'Content-Type': 'text/html'}); //mostra o erro 404
      return res.end("404 Not Found");	//finaliza o processo de criação do servidor
    } 
    res.writeHead(200, {'Content-Type': 'text/html'}); //se não: configura o servidor para exibir um arquivo .html
    res.write(data); //escreve o arquivo .html que queremos, lembre-se que o arquivo .html que queremos foi retornado em 'data'
    return res.end();	//finaliza o processo de criação do servidor
  });
}
//fim da função irrelevante



io.sockets.on('connection', function (socket) {// cria uma conecção websocket utilizando o namespace 'connection'
  var lightvalue = 0; //cria uma variavel responśavel por armazenar o estado da led
  pushButton.watch(function (err, value) { //"assiste" o estado do botao
    if (err) { //se um erro foi devolvido:
      console.error('There was an error', err); //exibe um erro no console
      return;	//finaliza a função
    }
    lightvalue = value;	//se não: 'lightvalue' recebe o valor devolvido(1 se o botao foi pressionado ou 0 se o contrário) 
    socket.emit('light', lightvalue); //envia o estado do botao para o cliente
  });
  socket.on('light', function(data) { //pega o valor enviado pelo arquivo .html
    lightvalue = data;		 //'lightvalue' recebe o valor enviado(0 ou 1)
    if (lightvalue != LED.readSync()) { //muda o estado da led conforme o valor enviado
      LED.writeSync(lightvalue); //liga ou desliga a led
    }
  });	//fim de 'socket.on()'
});//fim de 'pushButton.watch()'

process.on('SIGINT', function () { //quando 'ctrl+c' for pressionado
  LED.writeSync(0); // deliga a led
  LED.unexport(); // deleta o objeto 'LED'
  pushButton.unexport(); // deleta o objeto 'pushButton'
  process.exit(); //finaliza o programa completamente
});
