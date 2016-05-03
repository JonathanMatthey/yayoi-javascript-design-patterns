/**
 * Q3: Module Reveal Pattern
 * -------------------------
 * The Module Design Pattern is great, you have public and private methods but the private methods can't easily access the public
 * methods, the code gets complicated as you treat both differently
 *
 * The Reveal Pattern simplifies this, move all the functions inside the module and at the bottom, return the references
 * to the functions you wish to make public outside the module
 */

var com = com || {};
com.yayoi = com.yayoi || {};

com.yayoi.CircleModule = (function(){
  var circleHtml = "<div class='circle'></div>",
    colors = ["#005AD6","#FF031D","#FB1D96","#F8D521","#FF5400","#00A34C"],
    canvas = {};

  function color(c,color){
    c.css('background-color', color);
  }

  return {
    add: function(c){
      canvas.append(c);
    },
    position:function (c, top, left){
      c.css('top',top);
      c.css('left',left);
    },
    init: function(can){
      canvas = can;
    },
    create: function(){
      var circle = $(circleHtml);
      color(circle, colors[Math.floor(Math.random() * colors.length)]);
      return circle;
    }
  }
})();

$(document).ready(function(e){
  var cLib = com.yayoi.CircleModule;
  cLib.init($("#white-canvas"));

  setInterval(function(){
    var circle = cLib.create();
    cLib.add(circle);
    cLib.position(circle, Math.floor(Math.random() * window.innerHeight), Math.floor(Math.random() * window.innerWidth));
  },2000);

  $("#white-canvas").click(function(e){
    var circle = cLib.create();
    cLib.add(circle);
    cLib.position(circle, e.pageY-25, e.pageX-25);
  });
});

