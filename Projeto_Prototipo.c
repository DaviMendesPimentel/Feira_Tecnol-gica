#include <stdio.h>
//#include <wiringPi.h>
#include <locale.h>

const int max_comprimento_PER = 5;
const int max_comprimento_ALT = 20;


const char * const perguntas[max_comprimento_PER] = {"Qual foi o primeiro computador eletronico ja criado?",
				   "Quem foi Steve Jobs e Bill Gates, respectivamente: ",
				   "Quem foi o(a) primeiro(a) programador(a) da historia?",
				   "O que sao Redes de Computadores?",
				   "Qual foi a primeira linguagem de programacao que existiu na historia da computacao"};


const char * const alternativas[max_comprimento_ALT] = {"ENIAC", "ALTAIR", "Abaco", "Apple I", // respostas da 1º pergunta

				    "Fundador da Digital e criador do BASIC", "Fundadores do Atari e da Apple", // respostas da 2º pergunta
				    "Fundadores da Apple e Microsoft", "Criadores do Iphone e da linguagem C",

				    "Thomas Edson", "Bill Gates", "Dennis Ritchie", "Ada Lovelace", // respostas da 3º pergunta
					
				    "Sao meios digitais utilizados para comunicacao entre dados externos", // respostas da 4º pergunta 
				    "Sao lencois enormes que transmitem eletrons entre PCs",
				    "Sao Equipamentos que transmitem e recebem sinais em codigo Morse", 
				    "Sao cartas de papel escritas em qualquer linguagem para computadores entenderem",

				    "C++", "Java", "Assembly", "Linguagem C"}; 


const char respostas[max_comprimento_PER] = {'a', 'c', 'd', 'a', 'c'};
int qtd = 0;


void quiz(int);
void validacao(char, int);

int main()
{
	
	printf("Quiz de informática\n");
	//system("clear");

	int i = 0;
	for(i = 0; i < max_comprimento_PER; i++)
		quiz(i);
}

void quiz(int n)
{
  int num_ALT = 4;
	char letras[num_ALT] = {'a', 'b', 'c', 'd'};
	int i = 0;
	int holder = (n + 1) * num_ALT;
	int posicao = n * num_ALT;
	char alternativa_escolhida;

	//inicio:
	printf("%s\n", perguntas[n]);
	
	for(; posicao < holder; posicao++){
	    
		printf("%c - %s\n", letras[i], alternativas[posicao]);
		i++;
	}
	scanf("%c",&alternativa_escolhida);

	switch(alternativa_escolhida){
		case 'a':
		case 'b':
		case 'c':
		case 'd':
			validacao(alternativa_escolhida, n);
			break;
		default:
			printf("Insira um valor válido pô..");
			//system("clear");
			//goto inicio;
			break;
	}
	//system("clear");
	
}

void validacao(char escolha, int n)
{
	if(escolha == respostas[n]){
		printf("Você acertou!!\n");
		qtd++;
	}else
		printf("Você errou.. a alternativa correta é: %c\n", respostas[n]);
}