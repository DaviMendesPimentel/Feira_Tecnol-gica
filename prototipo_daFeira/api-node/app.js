var http = require('http'); //inclui as funções de HTTP
var fs = require('fs');     //inclui as funções de File System(arquivos do sistema)

function Requisicao(requisitado, resposta){ // cria uma função 'Requisição'

    console.log("um usuário requisitou " + requisitado.url);    // escreve no console o que o usuário(cliente) requisitou
    resposta.writeHead(200, {"Context-type": "text/plain" });   // seta a saída do 'writeHead'
    
    fs.readFile("../HTML/index.html", "UTF-8", function(erro, html){   //lê o arquivo index.html
        if(erro){   // caso algum erro tenha sido invocado
            resposta.writeHead(404);    // invoca o 404
            resposta.writeHead('arquivo não encontrado..'); // arquivo não encontrado...
        }else{  // se não
            resposta.write(html);  // exibe o index.html
        }
        resposta.end(); // finaliza o processo
    });
}

http.createServer(Requisicao).listen(8888); // cria o servidor no endereço: 'localhost:8888'
console.log("O servidor ta funfando...");   // avisa que o servido está funcionando
