'use strict';

$(function() {
  $('#tabs').tabs();
  $('#dialog').dialog({
    autoOpen: false,
    hide: {
      effect: 'explode',
      duration: 500
    }
  });
});

$(document).tooltip();

$('#dissimilarity [name="image1"]').change(function(e) {
  var file = e.target.files[0]
  var url = URL.createObjectURL(file);
  $('#dissimilarity .image1').attr('src', url);
});

$('#dissimilarity [name="image2"]').change(function(e) {
  var file = e.target.files[0]
  var url = URL.createObjectURL(file);
  $('#dissimilarity .image2').attr('src', url);
});

$('#dissimilarity .submit').on('click', function(e) {
  e.preventDefault();
  if (!$('#dissimilarity .image1').attr('src') || !$('#dissimilarity .image2').attr('src')) {
    $('#dialog').dialog('open');
    return false;
  }
  var formData = new FormData($('#dissimilarity .form')[0]);
  $.ajax({
    url: '/opencv/dissimilarity',
    type: 'POST',
    data: formData,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function(data) {
      console.log(data);
      if (data.dissimilarity) {
        $('#dissimilarity .result b').html(data.dissimilarity.toFixed(2));
      } else {
        $('#dissimilarity .result b').html('nil');
      }
    },
    error: function(data) {
    }
  });
  return false;
});

$('#findpairs [name="image1"]').change(function(e) {
  var file = e.target.files[0]
  var url = URL.createObjectURL(file);
  $('#dissimilarity .image1').attr('src', url);
});

$('#findpairs [name="image2"]').change(function(e) {
  var file = e.target.files[0]
  var url = URL.createObjectURL(file);
  $('#dissimilarity .image2').attr('src', url);
});

$('#findpairs .submit').on('click', function(e) {
  e.preventDefault();
  if (!$('#dissimilarity .image1').attr('src') || !$('#dissimilarity .image2').attr('src')) {
    $('#dialog').dialog('open');
    return false;
  }
  var formData = new FormData($('#findpairs .form')[0]);
  $.ajax({
    url: '/opencv/findpairs',
    type: 'POST',
    data: formData,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function(data) {
      console.log(data);
      if (data.match) {
        $('#findpairs .result b').html(JSON.stringify(data.match));
      } else {
        $('#findpairs .result b').html('nil');
      }
    },
    error: function(data) {
    }
  });
  return false;
});

$('#matchtemplate [name="image1"]').change(function(e) {
  var file = e.target.files[0]
  var url = URL.createObjectURL(file);
  $('#matchtemplate .image1').attr('src', url);
});

$('#matchtemplate [name="image2"]').change(function(e) {
  var file = e.target.files[0]
  var url = URL.createObjectURL(file);
  $('#matchtemplate .image2').attr('src', url);
});

$('#matchtemplate .submit').on('click', function(e) {
  e.preventDefault();
  if (!$('#matchtemplate .image1').attr('src') || !$('#matchtemplate .image2').attr('src')) {
    $('#dialog').dialog('open');
    return false;
  }
  var formData = new FormData($('#matchtemplate .form')[0]);
  $.ajax({
    url: '/opencv/matchtemplate',
    type: 'POST',
    data: formData,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function(data) {
      console.log(data.match);
      $('#matchtemplate .image3').attr('src', '/output.jpg');
    },
    error: function(data) {
    }
  });
  return false;
});

$('#cascadedetect [name="image1"]').change(function(e) {
  var file = e.target.files[0]
  var url = URL.createObjectURL(file);
  $('#cascadedetect .image1').attr('src', url);
});

$('#cascadedetect .submit').on('click', function(e) {
  e.preventDefault();
  if (!$('#cascadedetect .image1').attr('src')) {
    $('#dialog').dialog('open');
    return false;
  }
  var formData = new FormData($('#cascadedetect .form')[0]);
  $.ajax({
    url: '/opencv/cascadedetect',
    type: 'POST',
    data: formData,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function(data) {
      console.log(data.match);
      $('#cascadedetect .image2').attr('src', '/output.jpg');
    },
    error: function(data) {
    }
  });
  return false;
});
