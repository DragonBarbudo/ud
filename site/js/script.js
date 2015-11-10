var app = angular.module('ud-app', []);

var bgimgs = [];
var svgs = {};


$(function(){
/*################################################*/
  /*################################################*/
    /*################################################*/
      /*################################################*/
  /* framework plugins */

  if( $('[data-scroll]').length>0 ){
    smoothScroll.init();
  }


  // FORMULARIO SIMPLE

  if($('form.simple').length>0){
    var resultado;
    $('form.simple').submit(function(e){
      var _this = $(this);
      e.preventDefault();
      var datos = $(this).serialize();
      _this.find('.resultado').html('<i class="fa fa-circle-o-notch fa-spin"></i>');
      $.get('http://www.dragonbarbudo.com/api/email.php?'+datos, function(result){
        resultado = JSON.parse(result);
        if( resultado[0].status === "sent" ){
          _this.find('.resultado').html('Mensaje correctamente enviado.');
        } else {
          _this.find('.resultado').html('Ocurrió un error. Inténtelo de nuevo más tarde.');
        }
      });
    });
  }


  // SCROLLREVEAL
  if($('[data-sr]').length>0){
    window.sr = new scrollReveal({
      reset:true,
      mobile:true
    });
  }


  // BACKSTRETCH

  if($('.bgslider').length>0){

      $('.bgslider').each(function(index){
        bgimgs[index] = [];
        $(this).children('div').each(function(){
          bgimgs[index].push($(this).attr('data'));
        });
        $( $(this).attr('data') ).backstretch(bgimgs[index], {duration: 3000, fade: 750});
      });

   }

  // MODALBOX

  if($('.box').length>0){
    $('.box').swipebox();
  }

  // SLIDERS
  if($('.slider.one').length>0){
    $('.slider.one').slick({
      prevArrow: '<button class="slick-prev fa fa-caret-left"></button>',
      nextArrow: '<button class="slick-next fa fa-caret-right"></button>',
      autoplay: true
    });
  }
  if($('.slider.multiple, .slider.multiplebox').length>0){
    $('.slider.multiple, .slider.multiplebox').slick({
      prevArrow: '<button class="slick-prev fa fa-caret-left"></button>',
      nextArrow: '<button class="slick-next fa fa-caret-right"></button>',
      autoplay: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        { breakpoint: 960, settings: { slidesToShow: 2,   slidesToScroll: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
      ]
    });
  }
      /*################################################*/
    /*################################################*/
  /*################################################*/
/*################################################*/
  /* custom */


$('[data-svg]').each(function(){
  var thisID = $(this).attr('id');

  var path = $(this).attr('data-svg');
  var s = $(this);
  s.load(path, function(){
    svgs[thisID] = $('#'+thisID+' svg').drawsvg({
      duration: 3000
    });
  });
});


setTimeout(function(){
  drawBeat();
  setInterval(function(){ drawBeat(); }, 6000);
}, 1000);



$('#start, .ud.central').hover(function(){
  $('body').addClass('dark');

},function(){
  $('body').removeClass('dark');
});

$('#aboutUs').hover(function(){
  $('body').addClass('light');
},function(){
  $('body').removeClass('light');
});

//START
$('#start, .ud.central').click(function(){
  $('#start').fadeOut();
  $('#logo').removeClass('central');
  $('.sections').removeClass('not');
});



$('.btnactive').click(function(){
  $('.active').removeClass('active');
  $(this).addClass('active');
});


$('.next').click(function(){
  var hide = $(this).attr('data-hide');
  var next = $(this).attr('data-next');
  $(hide).slideUp();
});


}); // JQUERY END


function drawBeat(){
  svgs['beatline'].drawsvg('animate');
  setTimeout(function(){
    $('#beatline svg').animate({marginLeft:'-200px'}, 2000, function(){
      $('#beatline svg').css({'margin-left':'auto'});
    });
  },4000);
}



app.controller('dataCtrl', function($scope){
  $scope.datos = {};

});
