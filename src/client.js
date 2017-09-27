$(document).ready(function() {

$.ajax('/family',{
  type:"GET",

})

$('form').on('submit', function(e){
  event.preventDefault(); //prevents submit and refreash of page
  let form = $(this);
  $.ajax('/family', {
    type: 'POST',
    data: form.serialize() //serialize merges all form fields for submission
  }).done(function(name){
    console.log(name);
  });
  function appendToList(name,description){

  }
});


});
