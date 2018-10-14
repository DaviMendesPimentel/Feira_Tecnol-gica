var express = require('express');
var app = express();

app.get('/', (req, res) => {
		if(req){
			console.log("uma requisição foi pedida" + req.url);
		}
		if(res){
			console.log("uma resposta foi dada");
		}
	} );

app.listen(8000);
console.log("O servidor ta funfando...");   // avisa que o servido está funcionando
