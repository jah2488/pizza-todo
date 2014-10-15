var template = _.template($('#todo').html()); // grab the template
var apiUrl   = 'http://tiny-pizza-server.herokuapp.com/collections/todo-items';
//Our api url


$('input[type=submit]').on('click', function (event) {
  //Whenever the user clicks the create button in the form

  event.preventDefault(); //Dont let the browser submit the form

  var fieldValues = $('input.field').serializeArray();

  //Turn everything into an array of js objects and not DOM objects

  var formObject = {}; // Create me an empty object


  fieldValues.forEach(function (field) {
    formObject[field.name] = field.value;
  });
  //Fill my form object with the name:value pair of each form field.

  $.ajax({
    method: 'POST',
    url: apiUrl,
    data: formObject
    //Send a POST request to our API to save the data from the form.
  }).done(function (data) { $('input.field').val('') });
  //Clear all the data in the form after its done.
});


var previousCount = 0;

setInterval(function () {
  $.ajax({url: apiUrl}).done(function (allTheTodos) {
  // Do a GET request on our API to return all previously saved TODOs

     if(allTheTodos.length > previousCount) {
        previousCount = allTheTodos.length;

        var finishedTemplates = _.map(allTheTodos, function (todo) {
          return template(todo);
        });

        $('#todos').html(finishedTemplates);
     }

     //Map over every todo we have and turn it into a template

     //Replace the contents of our todos container with all of the template-ed todos
   })
}, 1000);
//Everyone 1s run this anonymous function
