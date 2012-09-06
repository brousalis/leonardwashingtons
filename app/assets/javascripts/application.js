//= require jquery
//= require jquery_ujs
//= require_tree .

$(window).load(function() {
  $("#slider").orbit({directionalNav: false, animationSpeed: 1200, advanceSpeed: 5000}); 
});

$(document).ready(function(){

  $('textarea').autogrow();

  $('[placeholder]').focus(function() {
    var input = $(this);
    if (input.val() == input.attr('placeholder')) {
      input.val('');
      input.removeClass('placeholder');
    }
  }).blur(function() {
    var input = $(this);
    if (input.val() == '' || input.val() == input.attr('placeholder')) {
      input.addClass('placeholder');
      input.val(input.attr('placeholder'));
    }
  }).blur().parents('form').submit(function() {
    $(this).find('[placeholder]').each(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
      }
    })
  });

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
      return false;
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
      'mText' : {speed : 400, easing : 'easeOutExpo', delay : 140, dir : 1},
      'sText' : {speed : 400, easing : 'easeOutExpo', delay : 280, dir : 1}
    },
    animMouseleave  : {
      'mText' : {speed : 400, easing : 'easeInExpo', delay : 140, dir : -1},
      'sText' : {speed : 400, easing : 'easeInExpo', delay : 0, dir : -1}
    }
  });      
 
  $('.close').live('click', function(e) {
    e.preventDefault();
    close_content(); 
  });
 
  $('.post').live('click', function(e) {
    $.ajax({
      url: $(this).attr('href'),
      success: function(html){
        open_content();
        height = $('.title').height() + $('.content').height() - 20;
        $('#top').animate({height: height+"px"}, 500); 
        $('html, body').animate({ scrollTop: 150 }, 800);
      }
    });
    return false;
  });

  $('.about').live('click', function(e) {
    e.preventDefault();
    open_content(400);
    $('[id^="ajax_"]').hide();
    $('#ajax_about').delay(800).fadeIn();
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
    $('html, body').animate({ scrollTop: 150 }, 800);
    $('.orbit-wrapper').fadeOut();
    $('#top').animate({height:height+"px"}, 500).css({background:"url('/assets/black.png')"});
  }
  $('#ajax').fadeIn();  
}

function close_content() {
  $('html, body').animate({ scrollTop: 0 }, 800);
  $('#ajax').fadeOut();
  $('#top').animate({height:"410px", backgroundImage: "none"}, 300);
  $('.orbit-wrapper').delay(800).fadeIn();
  $('[id^="ajax_"]').hide();
}
