const int ledPinVermelho = 26;	//ledPinVermelho == pino 9
const int ledPinVerde = 20;	//ledPinVerde == pino 8

const int pinoDois = 4; 	//pinoDois == pino 2
const int pinoTres = 15; 	//pinoTres == pino 3
const int pinoQuatro = 18;	//pinoQuatro == pino 4
const int pinoCinco = 23;	//pinoCinco == pino 5

int estadoPinoDois = 0;		// verificadores dos
int estadoPinoTres = 0;		// estados dos botões
int estadoPinoQuatro = 0;	// respectivos(verifica se
int estadoPinoCinco = 0;	// está HIGH ou LOW)

void setup()
{
  pinMode(ledPinVermelho, OUTPUT);
  pinMode(ledPinVerde, OUTPUT);
  
  pinMode(pinoDois, INPUT);
  pinMode(pinoTres, INPUT);
  pinMode(pinoQuatro, INPUT);
  pinMode(pinoCinco, INPUT);
}

void loop()
{
  estadoPinoDois = digitalRead(pinoDois);
  estadoPinoTres = digitalRead(pinoTres);
  estadoPinoQuatro = digitalRead(pinoQuatro);
  estadoPinoCinco = digitalRead(pinoCinco);
  
  if(estadoPinoDois == HIGH || estadoPinoQuatro == HIGH){
  	digitalWrite(ledPinVerde, HIGH);
  }else digitalWrite(ledPinVerde, LOW);
  
  if(estadoPinoTres == HIGH || estadoPinoCinco == HIGH){
  	digitalWrite(ledPinVermelho, HIGH);
  }else digitalWrite(ledPinVermelho, LOW);
}