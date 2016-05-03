/**
 * Q11 - Abstracting Singleton
 * ----------------------------
 *
 * - change Circle Factory to Shape Factory
 * - move CircleFactor Registration outside the factory
 * - create a function to registerShape(name,cls)
 * - add registerShape to the Api
 * - registerItems when document is loaded
 * - different builders for each
 * - abstract the stage by adding setStage()
 * - use setStage in doc ready
 *
 */

(function(win,doc,$){

  function clone(src,out){
    for(var attr in src.prototype){
      out.prototype[attr] = src.prototype[attr];
    }
  }

  //---
  function Circle(){
    // this is a builder behind the scenes
    this.item = $('<div class="circle" style="background:black;"></div>');
  }
  Circle.prototype.move = function( top, left){
    this.item.css('top',top);
    this.item.css('left',left);
  }
  Circle.prototype.color = function(color){
    this.item.css('background',color);
  }
  Circle.prototype.get = function(){
    this.item.css('background','ping');
    return this.item;
  }

  function Rect(){
    this.item = $('<div class="rect" style="width:30px;height:30px;position:absolute;"></div>');
  }
  clone(Circle,Rect);
  // could add moveable, resizable etc...


  //---
  function BlackCircleBuilder(){
    this.item = new Circle();
    this.init();
  }
  BlackCircleBuilder.prototype.init = function(){
    var rect = new Rect();
    rect.color('yellow');
    rect.move(10,10);
    this.item.get().append(rect.get());
    console.log('rect',rect);
  }
  BlackCircleBuilder.prototype.get = function(){
    return this.item;
  }

  //---
  function MultiCircleBuilder(){
    this.item = new Circle();
    this.init();
  }
  MultiCircleBuilder.prototype.init = function(){
    var colors = ["#005AD6","#FF031D","#FB1D96","#F8D521","#FF5400","#00A34C"];
    this.item.color(colors[Math.floor(Math.random() * colors.length)])
  }
  MultiCircleBuilder.prototype.get = function(){
    return this.item;
  }

  //---
  function GrowingCircleBuilder(){
    this.item = new MultiCircleBuilder().get();
    this.init();
  }
  GrowingCircleBuilder.prototype.init = function(){
    var $circle =  this.item.get();
    $circle.css({'height':2, 'width':2, 'transition': 'all 100ms linear', 'transition-origin':'center center'});
    setTimeout(function(){
      $circle.css('transform','scale(' + Math.random() * 50  + ')');
    },100)
  }
  GrowingCircleBuilder.prototype.get = function(){
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

  //---
  var CircleGeneratorSingleton = (function(){
    var instance;

    function init(){
      var _aCircle = [],
          _canvas = $("#white-canvas"),
          _cf = new CircleFactory();
      _cf.register('black',BlackCircleBuilder);
      _cf.register('multi',MultiCircleBuilder);
      _cf.register('growing',GrowingCircleBuilder);

      function _position(circle, top, left){
        circle.move(top,left);
      }

      function create(type, top,left){
        var circle = _cf.create(type);
        circle.move(top,left);
        return circle;
      }

      function add(circle){
        _canvas.append(circle.get());
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
        var circle = cg.create('growing', Math.floor(Math.random()*win.innerHeight),Math.floor(Math.random()*win.innerWidth));
        cg.add(circle);
      },2000);

      $("#white-canvas").click(function(e){
        var cg = CircleGeneratorSingleton.getInstance();
        var circle = cg.create('multi', e.pageY-25, e.pageX-25);
        cg.add(circle);
      });

      $(doc).keypress(function(e){
        if(e.charCode == 97){ // key === a
          var cg = CircleGeneratorSingleton.getInstance();
          var circle = cg.create('black', Math.floor(Math.random()*win.innerHeight),Math.floor(Math.random()*win.innerWidth));
          cg.add(circle);
        } else if(e.charCode == 115){  // key === s
          var cg = CircleGeneratorSingleton.getInstance();
          var circle = cg.create('growing', Math.floor(Math.random()*win.innerHeight),Math.floor(Math.random()*win.innerWidth));
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