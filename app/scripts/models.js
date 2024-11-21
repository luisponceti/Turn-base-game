var $ = require('jquery');
var _ = require('underscore');

function Character(config) {
  config = config || {};
  this.health = 30;
  _.extend(this, config);
}

// *****************Attack prototype*****************
Character.prototype.attack = function(character){
  var damage = Math.floor(Math.random()* 10);
  this.health = this.health - damage;
  $(document).trigger('health:change');
  console.log('characters health' + " " + this.health);
};
// *****************Characters*****************
function Hero(config) {
  // this.health = 50;
  Character.call(this, config);
}

Hero.prototype = new Character();

function Villain(config) {
  Character.call(this, config);
}

Villain.prototype = new Character();

module.exports = {
  'Character': Character,
  'Hero': Hero,
  'Villain': Villain
};
