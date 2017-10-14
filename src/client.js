export default function(){
$(document).ready(function () {
  let warnDisplay = false;
  function liElement(id,name,description){
    return `<li class="list-group-item"><ul class="inner-list"><li><button type="button" class="close" aria-label="Close" data-id=${id} data-name=${name} data-description=${description}><span aria-hidden="true">&times;</span></button><span>Name:</span> ${name}</li><li><span>Description:</span> ${description}</li></ul></li>`;
  }
  function appendFamilyList(family) {
  var list = [];
  for(var i in family){
  list.push(liElement(family[i]._id, family[i].name, family[i].description));
  }
  $('.family-list').append(list);
  }

$.get('/family', function(data){
  appendFamilyList(data);
});

$('form').validate({
  messages: {
    name: "Please provide a valid name",
    description: "Please provide a valid description"
  },
  highlight: function(element, errorClass, validClass) {
            $(element).closest('form').addClass('was-validated');
            //adds bootstraps was validated to form when validated
        }
});
$('form').on('submit', function(e){
  //e.defaultPrevented(); //prevents submit and refreash of page
    e.preventDefault();
  let form = $(this);
  if(form.valid()){
  $.ajax('/family', {
    method: 'POST',
    dataType: "json",
    data: form.serialize() //serialize merges all form fields for submission
  }).done(function(response){
    $('.family-list').append(liElement(response[0]._id, response[0].name, response[0].description));
form.trigger('reset'); //cleans up form text input fields
form.removeClass('was-validated');
  });
}
});


$('.family-list').on('click', 'button[data-id]', (event) => {
  event.preventDefault();
  if(!warnDisplay){
  warnDisplay = true;
let target = $(event.currentTarget);
  $('.warn').append( `<div class="container"><div class='row alert alert-danger alert-dismissible fade show' role='alert'>
<div class="col-md-10 col-sm-8">
  Do you really want to get rid of one of your <strong>family</strong>!
</div>
  <div class='col-md-2 col-sm-4'>
  <button type="button" class="btn btn-success" data-dismiss="alert">Yes</button>
<button type="button" class="btn btn-danger" data-dismiss="alert">No</button>
</div>
</div></div>` );
$('.alert').on('click', '.btn-success', function () {
  console.log("clicked yes");
  $.ajax({
   method: 'DELETE',
   url:'/family/' + target.data('id')
 }).done( (res)=> {
   console.log(res);
   target.parents('li').remove();
   warnDisplay = false;
 })

 });
 $('.alert').on('click', '.btn-danger', function () {
   warnDisplay = false;
 });
 }
});



});
}
