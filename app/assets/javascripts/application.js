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

  $('.post').click(function(e) {
    e.preventDefault();
    load_post($(this), 900);
  });

});

function load_post(e, height) {
  $('html, body').animate({
    scrollTop: 150
  }, 800);
  $('.orbit-wrapper').fadeOut();
  $('#top').animate({height:height+"px"}, 500).css({background:"url('/assets/black.png')"});
  $('#ajax').delay(800).fadeIn(); 

  // load content here
  $.ajax({
    url: e.attr('href'), type: 'get', dataType: 'json', 
    success: function(e) { 
      $('#ajax_post').find('.title').html(e.name + "<span>" + e.date + "</span");
      $('#ajax_post').find('.picture ').attr("background", "url('assets/"+e.picture+"') no-repeat");
      $('#ajax_post').find('.content').html(e.content);
    }
  });  

  $('.close').click(function(e) {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
    e.preventDefault();
    $('#ajax').fadeOut();
    $('#top').animate({height:"410px", background: "none"}, 300);
    $('.orbit-wrapper').delay(800).fadeIn();
  }); 
}
