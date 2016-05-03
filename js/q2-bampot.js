/**
 * Q2: Module Design - Public and Private Members
 * ----------------------------------------------
 * Now you've used Object Literal and Namespace Patterns,
 * the Module Design Pattern solves privacy issues.
 *
 * Create a Module called CircleModule, with private variables:
 * - circleHtml
 * - colors
 * - canvas
 *
 * private functions:
 * - position()
 * - add()
 *
 * reveal the functions:
 * - add
 * - init
 *
 * execute the init in the document ready at the bottom
 *
 * remember this is a regular Module Design Pattern, NOT a reveal design pattern.
 * That will be Q3
 */

var com = com || {};
com.yayoi = com.yayoi || {};

com.yayoi.circleLib = {
  circleHtml: "<div class='circle'></div>",
  colors: ["#005AD6","#FF031D","#FB1D96","#F8D521","#FF5400","#00A34C"],
  canvas : {},
  addCircle: function(c){
    this.canvas.append(c);
  },
  positionCircle: function(c, top, left){
    c.css('top',top);
    c.css('left',left);
  },
  create: function(){
    var circle = $(this.circleHtml);
    circle.css('background-color', this.colors[Math.floor(Math.random() * this.colors.length)]);
    return circle;
  },
  init: function(canvas){
    this.canvas = canvas;
  },
}

$(document).ready(function(e){
  var cLib = com.yayoi.circleLib;
  cLib.init($("#white-canvas"));

  setInterval(function(){
    var circle = com.yayoi.circleLib.create();
    cLib.addCircle(circle);
    cLib.positionCircle(circle, Math.floor(Math.random() * window.innerHeight), Math.floor(Math.random() * window.innerWidth));
  },2000);

  $("#white-canvas").click(function(e){
    var circle = com.yayoi.circleLib.create();
    cLib.addCircle(circle);
    cLib.positionCircle(circle, e.pageY-25, e.pageX-25);
  });
});
