//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function(){
  $("#slider").orbit({directionalNav: false, 
                      animationSpeed: 1200, 
                      advanceSpeed: 5000}); 

  // newsletter input
  $('#ajax_contact input').input_focus();
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
      $('#ajax_meet').delay(800).fadeIn();
      $('.close').fadeOut();
      $('.back').delay(800).fadeIn();
      return false;
    }
  });

  // about page back button
  $('.back').live('click', function(e) {
    e.preventDefault();
    $('#about_container').delay(800).fadeIn(); 
    $('#ajax_meet').fadeOut();
    $('.close').delay(800).fadeIn();
    $('.back').fadeOut(); 
  });

  // about page members
  $('#ei_menu ul').iconmenu({
    animMouseenter  : {
      'mText' : {speed : 400, easing : 'easeOutExpo', delay : 140, dir : 1},
      'sText' : {speed : 400, easing : 'easeOutExpo', delay : 280, dir : 1}
    },
    animMouseleave  : {
      'mText' : {speed : 400, easing : 'easeInExpo', delay : 140, dir : -1},
      'sText' : {speed : 400, easing : 'easeInExpo', delay : 0, dir : -1}
    }
  });

  // ajax close button
  $('.close').live('click', function(e) {
    e.preventDefault();
    close_content(); 
  });

  $('h2.shows a').live('click', function(e) {
    $('html body').animate({ scrollTop: 150 },800);
  });
  $('nav li a.shows_table, nav li a.about, nav li a.contact, h2.shows a').live('click', function(e) {
    e.preventDefault();
    page = $(this).attr('class')
    $('[id^="ajax_"]').hide();
    open_content(400);
    $('#ajax_'+page).fadeIn(800);
  });

  $('[id^="ajax_"]').hide();

  $('#new_message').validate({
    errorPlacement: function(error, element) { 
    }, 
    invalidHandler: function(e, validator) {
      var errors = validator.numberOfInvalids()
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
  var height = typeof height !== 'undefined' ? height : 0; 

  if ($('#ajax').css('display') == "none") {
    $('.orbit-wrapper').fadeOut();
    $('html, body').animate({scrollTop: 150}, 500);
    $('#top').css({background:"url('/assets/black.png')"}); 
  }

  setTimeout(function(){ 
    if(height == 0) height = $('.post .title').height() + $('.post .content').height() + 60
    $('#top').animate({height: height + "px"}, 600); 
  }, 50);

  $('#ajax').fadeIn();
}

function close_content() {
  $('html, body').animate({ scrollTop: 0 }, 800);
  $('#ajax').fadeOut();
  $('#top').animate({height:"410px", backgroundImage: "none"}, 300);
  $('.orbit-wrapper').delay(800).fadeIn();
  $('[id^="ajax_"]').hide();
}

function get_tweets() {
  $.getJSON("http://api.twitter.com/1/statuses/user_timeline.json?screen_name=theleonards&count=1&callback=?", {},
    function (data) {
      if(data){
        $.each(data, function(index, el){
          $('.tweets').append('<span>' + el.text + '</span>');
        });
      }
  });
}
