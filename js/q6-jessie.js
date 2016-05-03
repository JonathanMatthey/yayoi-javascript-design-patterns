/**
 * Q6: Factory
 * ----------------------------
 *
 * We're going to create different types of circles
 *
 * Black circle
 * Multi Colored Circle
 * Hollow Circle
 *
 * Factories don't know how their objects are created
 *
 * TODO
 * - Move the Singleton create Function into separate Objects, pass a type to it
 * So move the colors and implementation to the Circle Objects
 * - Make an array of Circles to keep references to the circles in the Singleton
 *
 */

(function(win,doc,$){

  var CircleGeneratorSingleton = (function(){
    var instance;

    function init(){

      var _circleHtml = "<div class='circle'></div>",
          _colors = ["#005AD6","#FF031D","#FB1D96","#F8D521","#FF5400","#00A34C"],
          _canvas = $("#white-canvas");

      function _color(c,color){
        c.css('background-color', color);
      }

      function add(c){
        _canvas.append(c);
      }

      function _position (c, top, left){
        c.css('top',top);
        c.css('left',left);
      }

      function init(can){
        _canvas = can;
      }

      function create(top,left){
        var circle = $(_circleHtml);
        _color(circle, _colors[Math.floor(Math.random() * _colors.length)]);
        _position(circle,top,left)
        return circle;
      }

      return {
        add: add,
        init: init,
        create: create
      }
    }

    return{
      getInstance:function(){
        if(!instance){
          instance = init();
        }
        return instance;
      }
    }
  })();

  $(doc).ready(function(e){

    var cg = CircleGeneratorSingleton.getInstance();

    setInterval(function(){
      var circle = cg.create(Math.floor(Math.random() * win.innerHeight), Math.floor(Math.random() * win.innerWidth));
      cg.add(circle);
    }, 2000);

    $("#white-canvas").click(function(e){
      var circle = cg.create(e.pageY-25, e.pageX-25);
      cg.add(circle);
    });

    $(doc).keypress(function(e){
      if(e.charCode == 97){
        var circle = cg.create(Math.floor(Math.random() * win.innerHeight), Math.floor(Math.random() * win.innerWidth));
        cg.add(circle);
      }
    });
  });

})(window,document,jQuery);
