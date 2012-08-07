//= require jquery
//= require jquery-ui

$(document).ready(function() {

  $('.button_to').submit(function() {
    if(!confirm('Are you sure?')) return false
  });

  $('#slide_picture').live('change', function() {
    $('#new_slide').submit();
  });

});
