export default function(){
$(document).ready(function () {
  function liElement(name,description){
    return `<li class="list-group-item"><ul class="inner-list"><li><button type="button" class="close" aria-label="Close" data-name="${name}"><span aria-hidden="true">&times;</span></button><span>Name:</span> ${name}</li><li><span>Description:</span> ${description}</li></ul></li>`;
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
  //e.defaultPrevented(); //prevents submit and refreash of page
    e.preventDefault();
  if( !$('#nameInput').val() || !$('#descriptionInput').val()){
    alert("you have not filled in both fields");
  } else {
  let form = $(this);
  $.ajax('/family', {
    method: 'POST',
    dataType: "json",
    data: form.serialize() //serialize merges all form fields for submission
  }).done(function(response){
    $('.family-list').append(liElement(response.name, response.description));
form.trigger('reset'); //cleans up form text input fields
  });
}
});


$('.family-list').on('click', 'button[data-name]', (event) => {
  event.preventDefault();
  if (!confirm('Do you really want to get rid of one of your family!')){
    return false;
  }
  let target = $(event.currentTarget);
  $.ajax({
   method: 'DELETE',
   url:'/family/' + target.data('name')
 }).done( (res)=> {
   console.log(res);
   target.parents('li').remove();
 })
});
});
}
