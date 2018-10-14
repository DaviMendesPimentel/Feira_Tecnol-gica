var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4 as output
var pushButton = new Gpio(21, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var botaoVerde = new Gpio(20, 'in', 'both');
var VERMELHA = new Gpio(16, 'out');

pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('um erro ocorreu...', err); //output error message to console
  return;
  }
  LED.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
});

botaoVerde.watch(function(err, value){
	if(err) {
	  console.error('um erro ocorreu no botao amarelo...', err);
	  return;
	}
	VERMELHA.writeSync(value);
});

function unexportOnClose() { //function to run when exiting program
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  VERMELHA.writeSync(0);
  VERMELHA.unexport();
  pushButton.unexport(); // Unexport Button GPIO to free resources
  botaoVerde.unexport();
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
