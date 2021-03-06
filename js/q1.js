/**
 * Q1: Global Scope - Object Literal
 * ---------------------------------
 * This js file is pretty messy, global variables, global functions, repeated code,
 * duplicate variable definitions, ambiguous local / global var access..
 *
 * Clean it up !
 *
 * Build a Object Literal Pattern:
 * Create a new object CircleLib
 * Wrap everything into one big JSON object
 * Have 1 init method, and call it in document ready
 *
 * Q1b: Namespace
 * --------------
 * Once you've created your CircleLib, it's still global and could easily overwritten.
 * To prevent that, use a namespace pattern to reduce the chances of it happening.
 *
 * eg. com.taketwo.libs.potatoes....
 */

var circle;
var colors = ["#005AD6","#FF031D","#FB1D96","#F8D521","#FF5400","#00A34C"]

$(document).ready(function(e){

  $("#white-canvas").click(function(e){
    var circle = $("<div class='circle'></div>");
    addCircle(circle);
    positionCircle(circle, e.pageY-25, e.pageX-25);
    circle.css('background-color',colors[Math.floor(Math.random()*colors.length)]);
  });

  setInterval(function(){
    var circle = $("<div class='circle'></div>");
    addCircle(circle);
    positionCircle(circle, Math.floor(Math.random() * window.innerHeight), Math.floor(Math.random() * window.innerWidth));
    circle.css('background-color',colors[Math.floor(Math.random()*colors.length)]);
  },2000);

});

function addCircle(c){
  $("#white-canvas").append(c);
}

function positionCircle(c, top, left){
  c.css('top',top);
  c.css('left',left);
}


