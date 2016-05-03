/**
 * Q9 - Builder
 * ----------------------------
 *
 *
 */

(function(win,doc,$){

  function Circle(){
    this.item = $('<div class="circle"></div>');
  }
  Circle.prototype.move = function( top, left){
    this.item.css('top',top);
    this.item.css('left',left);
  }
  Circle.prototype.color = function(color){
    this.item.css('background',color);
  }
  Circle.prototype.bordercolor = function(color){
    this.item.css('border',"2px solid " + color);
  }
  Circle.prototype.get = function(){
    this.item.css('background','ping');
    console.log('return Circle.prototype.get ')
    return this.item;
  }


  function BlackCircleBuilder(){
    this.item = new Circle();
    this.init();
  }
  BlackCircleBuilder.prototype.init = function(){
    this.item.color("black")
  }
  BlackCircleBuilder.prototype.get = function(){
    return this.item;
  }

  function MultiCircleBuilder(){
    this.item = new Circle();
    this.init();
  }
  MultiCircleBuilder.prototype.init = function(){
    var colors = ["#005AD6","#FF031D","#FB1D96","#F8D521","#FF5400","#00A34C"];
    this.item.color(colors[Math.floor(Math.random() * colors.length)])
  }
  MultiCircleBuilder.prototype.get = function(){
    console.log('get multi...', this.item.get())
    return this.item;
  }

  function HollowCircleBuilder(){
    this.item = new Circle();
    this.init();
  }
  HollowCircleBuilder.prototype.init = function(){
    var colors = ["#005AD6","#FF031D","#FB1D96","#F8D521","#FF5400","#00A34C"];
    this.item.bordercolor(colors[Math.floor(Math.random() * colors.length)])
  }
  HollowCircleBuilder.prototype.get = function(){
    console.log('get multi...', this.item.get())
    return this.item;
  }

  // Now AbstractCircleFactory
  var CircleFactory = function(){
    // stores all the types
    this.types = {};
    // we want to manage all types of circles in 1 place - here
    this.create = function(type){
      return new this.types[type]().get();
    }

    this.register = function(type, cls){
      if(cls.prototype.init && cls.prototype.get){
        this.types[type] = cls;
      }
    }
  }

  var CircleGeneratorSingleton = (function(){
    var instance;

    function init(){
      var _aCircle = [],
          _canvas = $("#white-canvas"),
          _cf = new CircleFactory();
      _cf.register('black',BlackCircleBuilder);
      _cf.register('multi',MultiCircleBuilder);
      _cf.register('hollow',HollowCircleBuilder);

      function _position(circle, top, left){
        circle.css('top',top);
        circle.css('left',left);
      }

      function create(type, top,left){
        var circle = _cf.create(type).get();
        console.log(circle);
        circle.show();
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

      return {
        index:index,
        create:create,
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

      setInterval(function(){
        var cg = CircleGeneratorSingleton.getInstance();
        var circle = cg.create('multi', Math.floor(Math.random()*win.innerHeight),Math.floor(Math.random()*win.innerWidth));
        cg.add(circle);
      },2000);

      $("#white-canvas").click(function(e){
        var cg = CircleGeneratorSingleton.getInstance();
        var circle = cg.create('hollow', e.pageY-25, e.pageX-25);
        cg.add(circle);
      });

      $(doc).keypress(function(e){
        if(e.charCode == 97){
          var cg = CircleGeneratorSingleton.getInstance();
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