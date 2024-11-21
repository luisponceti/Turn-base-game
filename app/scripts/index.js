var $ = require('jquery');
var _ = require('underscore');
var models = require('./models');
var gamedisplay= require('../templates/gamedisplay.hbs');

// *****************Heroes and Villains*****************
$(function(){
  var selectedHero;
  var selectedVillain;

  var heroes = [
    new models.Hero({name: 'Pistol Pete', image: "./images/PistolPete.png"}),
    new models.Hero({name: 'Sheriff Dan', image: "./images/sheriff-dan.png"}),
    new models.Hero({name: 'Red Wolf', image: "./images/red-wolf.png"})
  ];

  var villains = [
    new models.Villain({name: 'Pancho Villa', image:"./images/pancho-villa.png"}),
    new models.Villain({name: 'Jesse James', image:"./images/jesse-james.png"}),
    new models.Villain({name: 'Tombstone', image:"./images/tombstone.png"})
  ];

  var context = {
    'heroes': heroes,
  };
// *****************HTML template feed****************
$('.hero-container').html(gamedisplay(context));

// *****************Event Handlers*****************
$(document).on('hero:selected', function (event, hero) {
  selectedHero = hero;
});

$(document).on('villain:selected', function(event, villain){
  selectedVillain = villain;
});

$('img').on('click', function(event){
    event.preventDefault();

    var $heroSelect = $(this);
    var heroName = $heroSelect.data('hero-name');
    var randomVillain = Math.floor(Math.random()*villains.length);

    selectedHero = _.filter(heroes, {'name': heroName})[0];

    $(this).parents().siblings('.hero-info').hide();
    //Villain selection and html attributes
    selectedVillain = villains[randomVillain];
    $('.villain-name').html(selectedVillain.name);
    $('#villain-pic').attr("src", selectedVillain.image);
    // console.log(selectedVillain.image);
    console.log(selectedHero);
    console.log(selectedVillain);
});

// *****************Listeners*****************
$(document).on('health:change', function(){
  $('#villain-health').html(selectedVillain.health);
  if(selectedHero.health <= 0){
    $('.message').html("You Lose!");
  }
});

$(document).on('health:change', function(){
  $('.hero-health').html(selectedHero.health);
  // $('.total-health').width(selectedHero.health/100);
  if(selectedVillain.health <= 0){
    $('.message').html("You Win!");
  }
});
// *****************Triggers*****************
  $('.fire-button').click(function(event){
    event.preventDefault();
    $('#gun-shot').get(0).play();
    selectedVillain.attack(selectedHero);
    // console.log("fire at villain" + selectedVillain.health);

      window.setTimeout(function(){
        selectedHero.attack(selectedVillain);
        $('#gun-shot').get(0).play();
        // console.log("hero health" + selectedHero.health);
      }, 4000);
  });

});
