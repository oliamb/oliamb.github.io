$(function(){
  'use strict';

  var $w = $(window);

  var Noiser = function() {
    var n = Math.random();
    this.next = function() {
      n = n + Math.random() - 0.5;
      if (n < 0) {
        n = 1-n;
      } else if (n > 1) {
        n = n-1;
      }
      return n;
    };
  };

  var nx = new Noiser(),
      ny = new Noiser();

  var draw = function(){
    $('.background-canvas').remove();
    var h = $(window).height(),
        w = $(window).width(),
        $canvas = $('<canvas width="'+w+'" height="'+h+'" class="background-canvas" />').prependTo('body'),
        ctx = $canvas.get(0).getContext('2d');

    ctx.fillStyle = 'rgb(0, 0, 0 ,0)';
    ctx.fillRect(0, 0, w, h);

    (function() {
      for (var x = 0; x < 1000; x++) {
        var x0 = parseInt(nx.next() * w, 10),
            x1 = w - parseInt(nx.next() * w, 10),
            y0 = parseInt(ny.next() * h, 10),
            y1 = h - parseInt(ny.next() * h, 10);
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 1;
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }
    }());

    (function() {
      for (var x = 0; x < 100; x++) {
        var x0 = parseInt(nx.next() * w, 10),
            x1 = w - x0,
            y0 = parseInt(ny.next() * h, 10),
            y1 = h - y0;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 1;
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }
    }());
  };
  $w.resize(draw);
  draw();
});
