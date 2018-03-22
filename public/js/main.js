$('#calendar').fullCalendar({
  events: [
    {
      title  : 'event1',
      start  : '2018-03-17',
      end    : '2018-03-25'
    }
  ]
});

$.get("/schools", function(data, status){
      $('.ui.search').search({source: data, onSelect: function (result,response) {
            
      }});
});


var deleteLabel = function(e) {
  $(e).parent().remove();
};