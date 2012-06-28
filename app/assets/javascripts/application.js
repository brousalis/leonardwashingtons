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

  // pages
  $('.close').live('click', function(e) {
    e.preventDefault();
    close_content(); 
  });

  $('[id^="ajax_"]').hide();

  $('.post').live('click', function(e) {
    e.preventDefault();
    $('[id^="ajax_"]').hide();
    load_post($(this), 0);
    setTimeout(function() {
      height = $('.title').height() + $('.content').height() + 70;
      $('#top').animate({height:height+"px"}, 500); 
    }, 800);
    $('html, body').animate({ scrollTop: 150 }, 800);
    $('#ajax_post').fadeIn();
  });

  $('.about').live('click', function(e) {
    e.preventDefault();
    open_content(400);
    $('[id^="ajax_"]').hide();
    $('#ajax_about').delay(800).fadeIn();
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
      'mText' : {speed : 400, easing : 'easeOutExpo', delay : 140, dir : 1},
      'sText' : {speed : 400, easing : 'easeOutExpo', delay : 280, dir : 1}
    },
    animMouseleave  : {
      'mText' : {speed : 400, easing : 'easeInExpo', delay : 140, dir : -1},
      'sText' : {speed : 400, easing : 'easeInExpo', delay : 0, dir : -1}
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
  $('html, body').animate({ scrollTop: 0 }, 800);
  $('#ajax').fadeOut();
  $('#top').animate({height:"410px", backgroundImage: "none"}, 300);
  $('.orbit-wrapper').delay(800).fadeIn();
  $('[id^="ajax_"]').hide();
}

function load_post(e, height) {
  open_content(height);
  $.ajax({
    url: e.attr('href'), type: 'get', dataType: 'json', 
    success: function(e) { 
      $('#ajax_post').find('.title').html(e.name + "<span>" + e.date + "</span");
      $('#ajax_post').find('.content').html(e.content);
      $('#ajax_post').find('.picture').show().css("background","url('/assets/" + e.picture + "') no-repeat !important");
    }
  });
}
(function($)
{
    $.fn.autogrow = function(options)
    {
        return this.filter('textarea').each(function()
        {
            var self                                = this;
            var $self                               = $(self);
            var minHeight                           = $self.height();
            var noFlickerPad                        = $self.hasClass('autogrow-short') ? 0 : parseInt($self.css('lineHeight'));

            var shadow = $('<div></div>').css({
                position:   'absolute',
                top:        -10000,
                left:       -10000,
                width:      $self.width(),
                fontSize:   $self.css('fontSize'),
                fontFamily: $self.css('fontFamily'),
                fontWeight: $self.css('fontWeight'),
                lineHeight: $self.css('lineHeight'),
                resize:     'none'
            }).appendTo(document.body);

            var update = function()
            {
                var times = function(string, number)
                {
                    for (var i=0, r=''; i<number; i++) r += string;
                    return r;
                };

                var val = self.value.replace(/</g, '&lt;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/&/g, '&amp;')
                                    .replace(/\n$/, '<br/>&nbsp;')
                                    .replace(/\n/g, '<br/>')
                                    .replace(/ {2,}/g, function(space){ return times('&nbsp;', space.length - 1) + ' ' });

                shadow.css('width', $self.width());
                shadow.html(val);
                $self.css('height', Math.max(shadow.height() + noFlickerPad, minHeight));
            }

            $self.change(update).keyup(update).keydown(update);
            $(window).resize(update);

            update();
        });
    };
})(jQuery);  
(function(a,b){a.CircleEventManager=function(b,c){this.$el=a(c);this._init(b)};a.CircleEventManager.defaults={onMouseEnter:function(){return false},onMouseLeave:function(){return false},onClick:function(){return false}};a.CircleEventManager.prototype={_init:function(b){this.options=a.extend(true,{},a.CircleEventManager.defaults,b);this.$el.css("cursor","default");this._initEvents()},_initEvents:function(){var b=this;this.$el.on({"mouseenter.circlemouse":function(c){var d=a(this),e=d.outerWidth(true),f=d.outerHeight(true),g=d.offset().left,h=d.offset().top,i={x:g+e/2,y:h+f/2,radius:e/2};var j="default";if(b.$el.css("cursor")==="pointer"||b.$el.is("a"))j="pointer";d.data("cursor",j);d.on("mousemove.circlemouse",function(a){var c=Math.sqrt(Math.pow(a.pageX-i.x,2)+Math.pow(a.pageY-i.y,2));if(!Modernizr.borderradius){d.css("cursor",d.data("cursor")).data("inside",true);b.options.onMouseEnter(b.$el)}else{if(c<=i.radius&&!d.data("inside")){d.css("cursor",d.data("cursor")).data("inside",true);b.options.onMouseEnter(b.$el)}else if(c>i.radius&&d.data("inside")){d.css("cursor","default").data("inside",false);b.options.onMouseLeave(b.$el)}}})},"mouseleave.circlemouse":function(c){var d=a(this);d.off("mousemove");if(d.data("inside")){d.data("inside",false);b.options.onMouseLeave(b.$el)}},"click.circlemouse":function(c){var d=a(this);if(!d.data("inside"))return false;else b.options.onClick(b.$el)}})},destroy:function(){this.$el.unbind(".circlemouse").removeData("inside, cursor")}};var c=function(a){if(this.console){console.error(a)}};a.fn.circlemouse=function(b){if(typeof b==="string"){var d=Array.prototype.slice.call(arguments,1);this.each(function(){var e=a.data(this,"circlemouse");if(!e){c("cannot call methods on circlemouse prior to initialization; "+"attempted to call method '"+b+"'");return}if(!a.isFunction(e[b])||b.charAt(0)==="_"){c("no such method '"+b+"' for circlemouse instance");return}e[b].apply(e,d)})}else{this.each(function(){var c=a.data(this,"circlemouse");if(!c){a.data(this,"circlemouse",new a.CircleEventManager(b,this))}})}return this}})(jQuery)


