export default function(){
$(document).ready(function () {

  function appendToList(family) {
  console.log("appendToList");
  var list = [];
  for(var i in family){
  list.push('<li class="list-group-item">'+ family[i]+'</li>');
  }
  console.log(list);
  $('.family-list').append(list);
  }

$.get('/family', function(data){
  appendToList(data);
});

$('form').on('submit', function(e){
  event.preventDefault(); //prevents submit and refreash of page
alert("yes you clicked me");
  let form = $(this);
  $.ajax('/family', {
    type: 'POST',
    data: form.serialize() //serialize merges all form fields for submission
  }).done(function(data){
$('.family-list').append("<li>Hello World</li>");
  });
});
});

}
