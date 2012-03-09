// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require_tree .

$(window).load(function() {
  $("#slider").orbit({directionalNav: false, animationSpeed: 1200, advanceSpeed: 5000}); 
});

$(document).ready(function(){
  new jPlayerPlaylist({
    jPlayer: "#jquery_jplayer_1",
    cssSelectorAncestor: "#jp_container_1"
  }, [
    { title:"Cricket", mp3:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/mp3/Deftones-Prince.mp3", oga:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/ogg/Deftones-Prince.ogg" },
    { title:"Slide on Down", mp3:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/mp3/AliceInChains-CheckMyBrain.mp3", oga:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/ogg/AliceInChains-CheckMyBrain.ogg" },
    { title:"Why Are You Such A Bitch", mp3:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/mp3/AliceInChains-CheckMyBrain.mp3", oga:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/ogg/AliceInChains-CheckMyBrain.ogg" },
    { title:"Midnight Rain", mp3:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/mp3/AliceInChains-CheckMyBrain.mp3", oga:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/ogg/AliceInChains-CheckMyBrain.ogg" },
    { title:"Elenor Rigby > Breath", mp3:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/mp3/AliceInChains-CheckMyBrain.mp3", oga:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/ogg/AliceInChains-CheckMyBrain.ogg" }
  ], {
    swfPath: "js",
    supplied: "mp3",
    wmode: "window",
    playlistOptions: {
       autoPlay : false
    }
  });

  // pages
  close_content(); 
  $('[id^="ajax_"]').hide();

  $('.post').live('click', function(e) {
    e.preventDefault();
    load_post($(this), 900);
    $('[id^="ajax_"]').hide();
    $('#ajax_post').fadeIn();
    setTimeout(function() {
      height = $('.title').height() + $('.content').height() + 90;
      $('#top').animate({height:height+"px"}, 500); 
    }, 800);
  });

  $('.about').live('click', function(e) {
    e.preventDefault();
    open_content(400);
    $('[id^="ajax_"]').hide();
    $('#ajax_about').fadeIn();
  });

  // newsletter
  $('#newsletter').input_focus().keypress(function(e){
    if(e.which == 13) {
      $('#newsletter').addClass('loading');
      setTimeout(function(){
        $.ajax({
          data: { email: $('#newsletter').val() },
          url: 'newsletter/', type: 'post', dataType: 'json',
          success: function(e) { 
            $('#newsletter').removeClass('loading');
            $('.status').html(e.message);
            if (e.status == "success") $('#newsletter').removeClass().addClass('success').prop('disabled', true); 
            else if (e.status == "fail") $('#newsletter').removeClass().addClass('fail').delay(1200).val('email address'); 
          }
        });
      }, 800);
    }
  });

  // about page
  $('.meet-circle').circlemouse({
    onMouseEnter : function( el ) { el.addClass('meet-circle-hover'); },
    onMouseLeave : function( el ) { el.removeClass('meet-circle-hover'); },
    onClick : function( el ) { 
      $('#about_container').fadeOut(); 
      $('#meet_container').delay(800).fadeIn();
      $('.close').fadeOut();
      $('.back').delay(800).fadeIn();
    }
  });

  $('.back').live('click', function(e) {
    e.preventDefault();
    $('#about_container').delay(800).fadeIn(); 
    $('#meet_container').fadeOut();
    $('.close').delay(800).fadeIn();
    $('.back').fadeOut(); 
  });

  $('#ei_menu ul').iconmenu({
    animMouseenter  : {
      'mText' : {speed : 400, easing : 'easeOutExpo', delay : 140, dir : -1},
      'sText' : {speed : 400, easing : 'easeOutExpo', delay : 280, dir : 1}
    },
    animMouseleave  : {
      'mText' : {speed : 400, easing : 'easeInExpo', delay : 140, dir : -1},
      'sText' : {speed : 400, easing : 'easeInExpo', delay : 0, dir : 1}
    }
  });      

});

$.fn.input_focus = function() {
  return $(this).each(function() {
    var default_value = $(this).val();
    $(this).focus(function() {
      if($(this).val() == default_value) $(this).val("");
    }).blur(function(){
      if($(this).val().length == 0) $(this).val(default_value);
    });
  });
}

function open_content(height) {
  $('html, body').animate({ scrollTop: 150 }, 800);
  $('.orbit-wrapper').fadeOut();
  $('#top').animate({height:height+"px"}, 500).css({background:"url('/assets/black.png')"});
  $('#ajax').delay(800).fadeIn();  
}

function close_content() {
  $('.close').live('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 800);
    $('#ajax').fadeOut();
    $('#top').animate({height:"410px", backgroundImage: "none"}, 300);
    $('.orbit-wrapper').delay(800).fadeIn();
    $('[id^="ajax_"]').hide();
  });  
}

function load_post(e, height) {
  open_content(height);
  $.ajax({
    url: e.attr('href'), type: 'get', dataType: 'json', 
    success: function(e) { 
      $('#ajax_post').find('.title').html(e.name + "<span>" + e.date + "</span");
      $('#ajax_post').find('.picture ').css({"background":"url('assets/"+e.picture+"') no-repeat !important"});
      $('#ajax_post').find('.content').html(e.content);
    }
  });
}

(function(a,b){a.CircleEventManager=function(b,c){this.$el=a(c);this._init(b)};a.CircleEventManager.defaults={onMouseEnter:function(){return false},onMouseLeave:function(){return false},onClick:function(){return false}};a.CircleEventManager.prototype={_init:function(b){this.options=a.extend(true,{},a.CircleEventManager.defaults,b);this.$el.css("cursor","default");this._initEvents()},_initEvents:function(){var b=this;this.$el.on({"mouseenter.circlemouse":function(c){var d=a(this),e=d.outerWidth(true),f=d.outerHeight(true),g=d.offset().left,h=d.offset().top,i={x:g+e/2,y:h+f/2,radius:e/2};var j="default";if(b.$el.css("cursor")==="pointer"||b.$el.is("a"))j="pointer";d.data("cursor",j);d.on("mousemove.circlemouse",function(a){var c=Math.sqrt(Math.pow(a.pageX-i.x,2)+Math.pow(a.pageY-i.y,2));if(!Modernizr.borderradius){d.css("cursor",d.data("cursor")).data("inside",true);b.options.onMouseEnter(b.$el)}else{if(c<=i.radius&&!d.data("inside")){d.css("cursor",d.data("cursor")).data("inside",true);b.options.onMouseEnter(b.$el)}else if(c>i.radius&&d.data("inside")){d.css("cursor","default").data("inside",false);b.options.onMouseLeave(b.$el)}}})},"mouseleave.circlemouse":function(c){var d=a(this);d.off("mousemove");if(d.data("inside")){d.data("inside",false);b.options.onMouseLeave(b.$el)}},"click.circlemouse":function(c){var d=a(this);if(!d.data("inside"))return false;else b.options.onClick(b.$el)}})},destroy:function(){this.$el.unbind(".circlemouse").removeData("inside, cursor")}};var c=function(a){if(this.console){console.error(a)}};a.fn.circlemouse=function(b){if(typeof b==="string"){var d=Array.prototype.slice.call(arguments,1);this.each(function(){var e=a.data(this,"circlemouse");if(!e){c("cannot call methods on circlemouse prior to initialization; "+"attempted to call method '"+b+"'");return}if(!a.isFunction(e[b])||b.charAt(0)==="_"){c("no such method '"+b+"' for circlemouse instance");return}e[b].apply(e,d)})}else{this.each(function(){var c=a.data(this,"circlemouse");if(!c){a.data(this,"circlemouse",new a.CircleEventManager(b,this))}})}return this}})(jQuery)
