$(function(){

	var calendarView = $("#events_calendar_rit"), fullcal = $('#events_calendar_rit')

    fullcal.fullCalendar({
        events: 'https://www.google.com/calendar/feeds/iov1bp0pabuug21to4hrvrp1gs%40group.calendar.google.com/public/basic',    
        eventClick: function(event) {
            // opens events in a popup window
            window.open(event.url, 'gcalevent', 'width=700,height=600');
            return false;
        }        
    });

    // Get a datepicker when you click on the calendar header
    $(document).on("click", "#events_calendar_rit .datepicker", function(){
        var self = $(this);
        if(!self.data("has-initialized-datepicker")){
            self.datepicker({autoclose: true, startView: 'year'}).
                on('changeMonth', function(ev){
                    var d = new Date(ev.date);
                    fullcal.fullCalendar('gotoDate', d);
                    self.datepicker("remove");
                    self.data("has-initialized-datepicker", false);
                });
            self.datepicker("setDate", fullcal.fullCalendar('getDate'));
            self.data("has-initialized-datepicker", true);
        }
        self.datepicker("show");
    });

});