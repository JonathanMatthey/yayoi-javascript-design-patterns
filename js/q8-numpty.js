/**
 * Q8: Builder
 * ----------------------------
 *
 * Turn the 3 Circle prototypes into a single circle and build 3 builders
 * - BlackCircleBuilder
 * - MultiCircleBuilder
 * - HollowCircleBuilder
 *
 * Manually listing the CLasses in the singleton , best to do it later.
 */

(function(win,doc,$){

  function BlackCircle(){}
  BlackCircle.prototype.create = function(){
    this.item = $('<div class="circle" style="background:black;"></div>');
    return this;
  }

  function MultiCircle(){}
  MultiCircle.prototype.create = function(){
      var colors = ["#005AD6","#FF031D","#FB1D96","#F8D521","#FF5400","#00A34C"];
      this.item = $('<div class="circle" style="background:' + colors[Math.floor(Math.random() * colors.length)] + ';"></div>');
    return this;
  }

  function HollowCircle(){}
  HollowCircle.prototype.create = function(){
    var colors = ["#005AD6","#FF031D","#FB1D96","#F8D521","#FF5400","#00A34C"];
    this.item = $('<div class="circle" style="border: 10px solid ' + colors[Math.floor(Math.random() * colors.length)] + ';"></div>');
    return this
  }

  // Now AbstractCircleFactory
  var CircleFactory = function(){
    // stores all the types
    this.types = {};
    // we want to manage all types of circles in 1 place - here
    this.create = function(type){
      return new this.types[type]().create();
    }

    this.register = function(type, cls){
      if(cls.prototype.create){
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
      _cf.register('black',BlackCircle);
      _cf.register('multi',MultiCircle);
      _cf.register('hollow',HollowCircle);

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