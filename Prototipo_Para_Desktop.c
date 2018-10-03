#include <stdio.h>  // biblioteca padr�o inclu�da
#include <locale.h>   // biblioteca para selecionar a regi�o inclu�da
#include <stdbool.h>  // biblioteca para tratar booleanos inclu�da
#define MAX_COMPRIMENTO_PER 5   // define "MAX_COMPRIMENTO_PER" com o valor de 5
#define MAX_COMPRIMENTO_ALT 20  // define "MAX_COMPRIMENTO_ALT" com o valor de 20
#define NUM_ALT 4               // define "NUM_ALT" com o valor de 4(quatro alternativas)

// cria as perguntas atrav�s de ponteiros hehe..
const char * const perguntas[MAX_COMPRIMENTO_PER] = {"Qual foi o primeiro computador eletronico ja criado?",
				   "Quem foi Steve Jobs e Bill Gates, respectivamente: ",
				   "Quem foi o(a) primeiro(a) programador(a) da historia?",
				   "O que sao Redes de Computadores?",
				   "Qual foi a primeira linguagem de programacao que existiu na historia da computacao"};

// cria as op��es poss�veis de alternativas
const char * const alternativas[MAX_COMPRIMENTO_ALT] = {"ENIAC", "ALTAIR", "Abaco", "Apple I", // respostas da 1� pergunta

				    "Fundador da Digital e criador do BASIC", "Fundadores do Atari e da Apple", // respostas da 2� pergunta
				    "Fundadores da Apple e Microsoft", "Criadores do Iphone e da linguagem C",

				    "Thomas Edson", "Bill Gates", "Dennis Ritchie", "Ada Lovelace", // respostas da 3� pergunta

				    "Sao meios digitais utilizados para comunicacao entre dados externos", // respostas da 4� pergunta
				    "Sao lencois enormes que transmitem eletrons entre PCs",
				    "Sao Equipamentos que transmitem e recebem sinais em codigo Morse",
				    "Sao cartas de papel escritas em qualquer linguagem para computadores entenderem",

				    "C++", "Java", "Assembly", "Linguagem C"};

// instancia um vetor com as respostas corretas
const char respostas[MAX_COMPRIMENTO_PER] = {'a', 'c', 'd', 'a', 'c'};
static int qtd = 0;  // inicializa a quantidade que o jogador acertou

void quiz(int); // avisa ao compilador sobre a exist�ncia da fun��o "quiz"
void validacao(char, int);  // avisa ao compilador sobre a exist�ncia da fun��o "valida��o"

// main funcionando
int main()
{
    setlocale(LC_ALL, "Portuguese");
	printf("Quiz de inform�tica\n\n"); // sub-titulo do programa
	system("pause");
	system("cls");  // comando para limpar tela

	int i = 0;  // cria um iterador
	for(i = 0; i < MAX_COMPRIMENTO_PER; i++)  // itera at� que i seja igual � 5
		quiz(i);  // chama a fun��o quiz passando-lhe o valor de "i"
}

//fun��o quiz em a��o
void quiz(int n)
{
	char letras[NUM_ALT] = {'a', 'b', 'c', 'd'};  // cria um vetor que armazena as
                                                // letras gen�ricas para alternativas
	int i = 0;  // cria novamente um iterador
	int holder = (n + 1) * NUM_ALT; // cria um inteiro para guardar o resultado de (n+1) * 4
	int posicao = n * NUM_ALT;  // cria um inteiro para guardar o resultado de n * 4
	char alternativa_escolhida = '\0';  // cria um caractere com valor nulo
	bool Char_invalido = false; // cria um booleano declarado como "false"
  inicio: // instancia uma refer�ncia para o goto

	printf("%s\n", perguntas[n]); // imprime a pergunta correta com base no valor de "n"

	for(; posicao < holder; posicao++){ // itera at� que a "posicao" seja igual a "holder"
                                      // ou seja, at� 4 vezes, pois a diferen�a entre os
                                      // dois(posicao e holder) sempre ser� igual a 4

		printf("%c - %s\n", letras[i], alternativas[posicao]);  // imprime a letra da alternativa e
                                                            // imprime a respectiva alternativa
		i++;  // incrementa o iterador(obs.: temos de usar o "i" aqui, pois ele sempre iniciar� com valor zero)
	}
	printf("\nR: ");
	scanf("%c", &alternativa_escolhida); // l� um caractere e armazena-o em "alternativa_escolhida"

  // inicio de switch com "alternativa_escolhida"
	switch(alternativa_escolhida){
		case 'a': // caso seja 'a' v� para 'b'
		case 'b': // caso seja 'b' v� para 'c'
		case 'c': // caso seja 'c' v� para 'd'
		case 'd': // caso seja 'd', execute:
			validacao(alternativa_escolhida, n);  // chama a fun��o validacao passando-lhe a alternativa_escolhida
                                                    // e o numero da questao respondida (de 0 � 4)
            system("pause");
			system("cls");  // limpa a tela
			Char_invalido = false;  // mant�m Char_invalido como "false"
			break;  // pula o resto da estrutura switch por completo
		default:  // caso o valor digitado tenha sido diferente de 'a', 'b', 'c' e 'd', execute:
			printf("Insira um valor v�lido p�!!\n");  // imprime a reclama��o
			system("pause");
			system("cls");  // limpa a tela
			Char_invalido = true; // converte Char_invalido em "true"
			break;  // pula o resto da estrutura switch
	}
	if(Char_invalido == true){  // se o valor digitado for invalido, i.�., se Char_invalido for "true"
        i = 0;  // reseta a vari�vel i
	    holder = (n + 1) * NUM_ALT; // reseta o holder
	    posicao = n * NUM_ALT;  // reseta a posicao
	    goto inicio;  // volta para o "inicio:"

	}
}

// fun��o de valida��o das respostas em a��o
void validacao(char escolha, int n) // recebe a alternativa escolhida(a,b,c ou d)
                                     // e o n�mero espec�fico da pergunta
{
	if(escolha == respostas[n]){  // se as alternativas forem iguais(ex.: escolha == 'a' && respostas[n] == 'a')
		printf("Voc� acertou!!\n"); // mostra que o jogador acertou
		qtd++;    // e incrementa a quantidade de acertos
	}else{ // se n�o:
		printf("Voc� errou.. a alternativa correta �: %c\n", respostas[n]); // mostra que o jogador errou
                                                                        // e imprime a alternativa correta
  }
}
