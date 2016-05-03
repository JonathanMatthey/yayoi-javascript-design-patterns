/**
 * Q4: Self Enclose All The Things - Control the Global Scope Access
 * ---
 * We want to completely control what is going in and out of our scope.
 *
 * Wrap the entire code in a self executing function and pass it (window,document,jQuery) at
 * the end, rename all references to use these new scoped parameters
 *
 * make Window.CircleModule accessible to everyone if not already bound
 */

var com = com || {};
com.yayoi = com.yayoi || {};

com.yayoi.CircleModule = (function(){
  var _circleHtml = "<div class='circle'></div>",
    _colors = ["#005AD6","#FF031D","#FB1D96","#F8D521","#FF5400","#00A34C"],
    _canvas = {};

  function _color(c,color){
    c.css('background-color', color);
  }

  function add(c){
    _canvas.append(c);
  }

  function position (c, top, left){
    c.css('top',top);
    c.css('left',left);
  }

  function init(can){
    _canvas = can;
  }

  function create(){
    var circle = $(_circleHtml);
    _color(circle, _colors[Math.floor(Math.random() * _colors.length)]);
    return circle;
  }

  return {
    add: add,
    position: position,
    init: init,
    create: create
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


