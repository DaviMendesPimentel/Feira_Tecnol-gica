var Gpio = require('onoff').Gpio;       
//var ledPinOne = new Gpio(38, 'out');           
var ledPinTwo = new Gpio(40, 'out');
                                // ambas entradas de carga disponíveis, e debounceTimeout debugando o retorno dos botões
var buttonA = new Gpio(7, 'in', 'both', { debounceTimeout: 10});    //botão A no pino 7 para entrada de carga;
//var buttonB = new Gpio(11, 'in', 'both', { debounceTimeout: 10});   //botão B no pino 11 para entrada de carga;
//var buttonC = new Gpio(13, 'in', 'both', { debounceTimeout: 10});   //botão C no pino 13 para entrada de carga;
//var buttonD = new Gpio(15, 'in', 'both', { debounceTimeout: 10});   //botão D no pino 15 para entrada de carga.

buttonA.watch((error, valor) => { if(error) { throw error;} ledPinOne.writeSync(value)} );  //verifica o estado dos respectivos botões
//buttonB.watch((error, valor) => { if(error) { throw error;}ledPinTwo.writeSync(value)} );   //e acende ou apaga a luz de seus
//buttonC.watch((error, valor) => { if(error) { throw error;}ledPinOne.writeSync(value)} );   //respectivos leds
//buttonD.watch((error, valor) => { if(error) { throw error;}ledPinTwo.writeSync(value)} );
