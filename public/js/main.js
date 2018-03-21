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
      console.log(data);
      $('.ui.search').search({source: data});
});
