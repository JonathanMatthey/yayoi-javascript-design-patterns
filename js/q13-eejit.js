/**
 * Q13 - Composite
 * ----------------------------
 *
 * - create a CompositeController( array ) takes in an arry
 * - give it a prototype function .action() that loops through the array and
 * applies that action
 *
 * - build a SCATTER and GATHER function that randomly scatters all circles,
 * and brings them back
 * - make them all moved left right according to arrow key presses
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
  var ShapeFactory = function(){
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

  function StageAdapter(id){
    this.index = 0;
    this.context = $(id);
  }
  StageAdapter.prototype.SIG = "stageItem_";
  StageAdapter.prototype.add = function(item){
    ++this.index;
    item.addClass(this.SIG + this.index);
    console.log('adding '+this.SIG + this.index)
    this.context.append(item);
  }
  StageAdapter.prototype.remove = function(){
    console.log('removing '+this.SIG + this.index)
    $('.' + this.SIG + this.index).remove();
    this.index--;
  }

  //---
  var CircleGeneratorSingleton = (function(){
    var instance;

    function init(){
      var _aCircle = [],
          _canvas,
          _sf = new ShapeFactory();

      function setStage(stage){
        _canvas = stage;
      }

      function _position(circle, top, left){
        circle.move(top,left);
      }

      function registerShape(name,cls){
        _sf.register(name,cls);
      }

      function create(type, top,left){
        var circle = _sf.create(type);
        circle.move(top,left);
        return circle;
      }

      function add(circle){
        _canvas.add(circle.get());
        _aCircle.push(circle);
      }

      function removeLast(){
        _canvas.remove();
      }

      function index(){
        return _aCircle.length;
      }

      return {
        index:index,
        create:create,
        add:add,
        register: registerShape,
        setStage:setStage,
        removeLast:removeLast
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
      cg.register('black',BlackCircleBuilder);
      cg.register('multi',MultiCircleBuilder);
      cg.register('growing',GrowingCircleBuilder);
      cg.setStage(new StageAdapter("#white-canvas"));

      setInterval(function(){
        var circle = cg.create('growing', Math.floor(Math.random()*win.innerHeight),Math.floor(Math.random()*win.innerWidth));
        cg.add(circle);
      },2000);

      $("#white-canvas").click(function(e){
        var circle = cg.create('multi', e.pageY-25, e.pageX-25);
        cg.add(circle);
      });

      $(doc).keypress(function(e){
        if(e.charCode == 97){ // key === a
          var circle = cg.create('black', Math.floor(Math.random()*win.innerHeight),Math.floor(Math.random()*win.innerWidth));
          cg.add(circle);
        } else if(e.charCode == 115){  // key === s
          var circle = cg.create('growing', Math.floor(Math.random()*win.innerHeight),Math.floor(Math.random()*win.innerWidth));
          cg.add(circle);
        } else if(e.charCode == 100){  // key === d
          cg.removeLast();
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