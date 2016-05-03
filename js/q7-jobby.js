/**
 * Q7: Abstract Factory
 * ----------------------------
 *
 * A more dynamic factory
 *
 * Javascript doesnt have interfaces but this concept is used in Abstract factories.
 *
 * Abstract has no idea what it's creating, just that it can access the objects through
 * those agreed functions
 *
 * TODO
 * - Turn all 3 circle types into static classes by creating empty functions and adding
 * prototype create functions, that create the circle and return `this`
 * - add a types object to the CircleFactory to register each type of Object it can create
 * - give the factory a register function that takes a type and a class
 *
 */

(function(win,doc,$){

  var BlackCircle = function(){
      this.item = $('<div class="circle" style="background:black;"></div>');
    },
    MultiCircle = function(){
      var colors = ["#005AD6","#FF031D","#FB1D96","#F8D521","#FF5400","#00A34C"];
      this.item = $('<div class="circle" style="background:' + colors[Math.floor(Math.random() * colors.length)] + ';"></div>');
    },
    HollowCircle = function(){
      var colors = ["#005AD6","#FF031D","#FB1D96","#F8D521","#FF5400","#00A34C"];
      this.item = $('<div class="circle" style="border: 10px solid ' + colors[Math.floor(Math.random() * colors.length)] + ';"></div>');
    },
    CircleFactory = function(){
      // we want to manage all types of circles in 1 place - here
      this.create = function(type){
        switch(type){
          case 'multi':
            return new MultiCircle();
          break;
          case 'black':
            return new BlackCircle();
          break;
          case 'hollow':
            return new HollowCircle();
          break;
        }
      }
    }

  var CircleGeneratorSingleton = (function(){
    var instance;

    function init(){
      var _aCircle = [],
          _canvas = $("#white-canvas");
          _cf = new CircleFactory();

      function _position(circle, top, left){
        circle.css('top',top);
        circle.css('left',left);
      }

      function create(type, top,left){
        var circle = _cf.create(type).item;
        _position(circle,top,left)
        return circle;
      }

      function add(circle){
        _canvas.append(circle);
        _aCircle.push(circle);
      }

      function index(){
        return _aCircle.length;
      }

      function init(can){
        _canvas = can;
      }

      return {
        index:index,
        create:create,
        init: init,
        add:add
      };
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

  var CircleModule = (function(win,doc){

    function init(){
      var self = this;
      var cg = CircleGeneratorSingleton.getInstance();

      setInterval(function(){
        var circle = cg.create('multi', Math.floor(Math.random()*win.innerHeight),Math.floor(Math.random()*win.innerWidth));
        cg.add(circle);
      },2000);

      $("#white-canvas").click(function(e){
        var circle = cg.create('hollow', e.pageY-25, e.pageX-25);
        cg.add(circle);
      });

      $(doc).keypress(function(e){
        if(e.charCode == 97){
          var circle = cg.create('black', Math.floor(Math.random()*win.innerHeight),Math.floor(Math.random()*win.innerWidth));
          cg.add(circle);
        }
      });
    };

    return {
      init: init
    }
  })(win,doc);

  $(document).ready(function(e){
    CircleModule.init();
  });

  if(!win.CircleModule){ win.CircleModule = CircleModule }
})(window,document,jQuery);