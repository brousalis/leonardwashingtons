(function($) {
  
  var methods = {
      init  : function( options ) {
        
        if( this.length ) {
          
          var settings = {
            // configuration for the mouseenter event
            animMouseenter    : {
              'mText' : {speed : 350, easing : 'easeOutExpo', delay : 140, dir : 1},
              'sText' : {speed : 350, easing : 'easeOutExpo', delay : 0, dir : 1},
              'icon'  : {speed : 350, easing : 'easeOutExpo', delay : 280, dir : 1}
            },
            // configuration for the mouseleave event
            animMouseleave    : {
              'mText' : {speed : 300, easing : 'easeInExpo', delay : 140, dir : 1},
              'sText' : {speed : 300, easing : 'easeInExpo', delay : 280, dir : 1},
              'icon'  : {speed : 300, easing : 'easeInExpo', delay : 0, dir : 1}
            },
            // speed for the item bg color animation
            boxAnimSpeed    : 300,
            // default text color (same defined in the css)
            defaultTextColor  : '#000',
            // default bg color (same defined in the css)
            defaultBgColor    : '#fff'
          };
          
          return this.each(function() {
            
            // if options exist, lets merge them with our default settings
            if ( options ) {
              $.extend( settings, options );
            }
            
            var $el       = $(this),
              // the menu items
              $menuItems    = $el.children('li'),
              // save max delay time for mouseleave anim parameters
            maxdelay  = Math.max( settings.animMouseleave['mText'].speed + settings.animMouseleave['mText'].delay ,
                        settings.animMouseleave['sText'].speed + settings.animMouseleave['sText'].delay
                        ),
              // timeout for the mouseenter event
              // lets us move the mouse quickly over the items,
              // without triggering the mouseenter event
              t_mouseenter;
            
            // save default top values for the moving elements:
            // the elements that animate inside each menu item
            $menuItems.find('.sti-item').each(function() {
              var $el = $(this);
              $el.data('deftop', $el.position().top);
            });
            
            // ************** Events *************
            // mouseenter event for each menu item
            $menuItems.bind('mouseenter', function(e) {
              
              clearTimeout(t_mouseenter);
              
              var $item   = $(this),
                $wrapper  = $item.children('a'),
                wrapper_h = $wrapper.height(),
                // the elements that animate inside this menu item
                $movingItems= $wrapper.find('.sti-item'),
                // the color that the texts will have on hover
                hovercolor  = $item.data('hovercolor');
              
              t_mouseenter  = setTimeout(function() {
                // indicates the item is on hover state
                $item.addClass('sti-current');
                
                $movingItems.each(function(i) {
                  var $item     = $(this),
                    item_sti_type = $item.data('type'),
                    speed     = settings.animMouseenter[item_sti_type].speed,
                    easing      = settings.animMouseenter[item_sti_type].easing,
                    delay     = settings.animMouseenter[item_sti_type].delay,
                    dir       = settings.animMouseenter[item_sti_type].dir,
                    // if dir is 1 the item moves downwards
                    // if -1 then upwards
                    style     = {'top' : dir * wrapper_h + 'px'};
                  
                  if( item_sti_type === 'icon' ) {
                    // this sets another bg image for the icon
                    style.backgroundPosition  = 'bottom left';
                  } else {
                    style.color         = hovercolor;
                  }
                  // we hide the icon, move it up or down, and then show it
                  $item.hide().css(style).show();
                  clearTimeout($item.data('time_anim'));
                  $item.data('time_anim',
                    setTimeout(function() {
                      // now animate each item to its default tops
                      // each item will animate with a delay specified in the options
                      $item.stop(true)
                         .animate({top : $item.data('deftop') + 300 + 'px'}, speed, easing);
                    }, delay)
                  );
                });
              
              }, 100);  

            })
            // mouseleave event for each menu item
            .bind('mouseleave', function(e) {
              
              clearTimeout(t_mouseenter);
              
              var $item   = $(this),
                $wrapper  = $item.children('a'),
                wrapper_h = $wrapper.height(),
                $movingItems= $wrapper.find('.sti-item');
              
              if(!$item.hasClass('sti-current')) 
                return false;   
              
              $item.removeClass('sti-current');
              
              $movingItems.each(function(i) {
                var $item     = $(this),
                  item_sti_type = $item.data('type'),
                  speed     = settings.animMouseleave[item_sti_type].speed,
                  easing      = settings.animMouseleave[item_sti_type].easing,
                  delay     = settings.animMouseleave[item_sti_type].delay,
                  dir       = settings.animMouseleave[item_sti_type].dir;
                
                clearTimeout($item.data('time_anim'));
                
                setTimeout(function() {
                  
                  $item.stop(true).animate({'top' : -dir * wrapper_h + 'px'}, speed, easing, function() {
                    
                    if( delay + speed === maxdelay ) {
                      
                      $movingItems.each(function(i) {
                        var $el       = $(this),
                          style     = {'top' : $el.data('deftop') + 'px'};
                        
                        if( $el.data('type') === 'icon' ) {
                          style.backgroundPosition  = 'top left';
                        } else {
                          style.color         = settings.defaultTextColor;
                        }
                        
                        $el.hide().css(style);
                      });
                      
                    }
                  });
                }, delay);
              });
            });
            
          });
        }
      }
    };
  
  $.fn.iconmenu = function(method) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.iconmenu' );
    }
  };
  
})(jQuery);


/* ===========================================================
 * bootstrap-tooltip.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger != 'manual') {
        eventIn  = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .remove()
          .css({ top: 0, left: 0, display: 'block' })
          .appendTo(inside ? this.$element : document.body)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .css(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , isHTML: function(text) {
      // html string detection logic adapted from jQuery
      return typeof text != 'string'
        || ( text.charAt(0) === "<"
          && text.charAt( text.length - 1 ) === ">"
          && text.length >= 3
        ) || /^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(text)
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.isHTML(title) ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).remove()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.remove()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.remove()
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function () {
      this[this.tip().hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover'
  , title: ''
  , delay: 0
  }

}(window.jQuery);

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

 
