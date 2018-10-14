function Mf(){
	var questao = ["primeira pergunta", "segunda", "terceira pergunta", "quarta", "quinta"];
	let i = 0;
	for(i = 0; i < 5; i++){
		document.getElementById('teste').innerHTML = questao[i];
	}
}

Mf();
