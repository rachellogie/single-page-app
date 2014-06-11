window.PeopleManager = {

  initialize: function () {

    $.getJSON('/api/people', function (data) {
      people_objects = data._embedded.people
      for (var i = 0; i < people_objects.length; i++) {
        var html = JST['templates/show/show_person']({person: people_objects[i]});
        $("main .container").append(html);
      }
    });
  }

};