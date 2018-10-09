var Gpio = require('onoff').Gpio;
var ledVerde = new Gpio(40, 'out');
var ledVermelha = new Gpio(38, 'out');

ledVerde.prototype.onGreen = function (){
    ledVerde.writeSync(1);
}
ledVermelha.prototype.onRed = function(){
    ledVermelha.writeSync(1);
}