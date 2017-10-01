export default function(){
$(document).ready(function () {
  function liElement(name,description){
    return `<li class="list-group-item"><ul class="inner-list"><li><button type="button" class="close float-left" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button><span>Name:</span> ${name}</li><li><span>Description:</span> ${description}</li></ul></li>`;
  }
  function appendFamilyList(family) {
  var list = [];
  for(var i in family){
  list.push(liElement(family[i].name, family[i].description));
  }
  $('.family-list').append(list);
  }

$.get('/family', function(data){
  appendFamilyList(data);
});

$('form').on('submit', function(e){
  event.preventDefault(); //prevents submit and refreash of page
  let form = $(this);
  $.ajax('/family', {
    method: 'POST',
    dataType: "json",
    data: form.serialize() //serialize merges all form fields for submission
  }).done(function(response){
    $('.family-list').append(liElement(response.name, response.description));
form.trigger('reset'); //cleans up form text input fields
  });
});
});

}
