window.PeopleManager = {

  initialize: function () {


    var form = JST['templates/show/form']();
    $("main .container").prepend(form);

    $.getJSON('/api/people', function (data) {
      people_objects = data._embedded.people
      for (var i = 0; i < people_objects.length; i++) {
        var html = JST['templates/show/show_person']({person: people_objects[i]});
        $("main .container").append(html);
      }
    });


    $("input[type='submit']").on("click", function (event) {
      event.preventDefault();
      var attributes_array = $(".create-form").serializeArray();

      var attributes_hash = {}
      for (var i = 0; i < attributes_array.length; i++) {
        attributes_hash[attributes_array[i].name] = attributes_array[i].value;
      }

      var json_attributes = JSON.stringify(attributes_hash);


      var formPost = $.ajax({
        type: 'POST',
        url: '/api/people',
        data: json_attributes,
        dataType: 'json'
      });

      formPost.done(function () {
        var html = JST['templates/show/show_person']({person: attributes_hash});
        $("main .container").append(html);
      }.bind(this));







      $('form')[0].reset();
    });
  }

};