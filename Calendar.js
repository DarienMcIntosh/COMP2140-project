document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: fetchEvents
    });
    calendar.render();

    async function fetchEvents(info, successCallback, failureCallback) {
        const category = document.getElementById('categoryFilter').value;
        try {
            const response = await fetch('http://localhost:3000/events');
            const data = await response.json();
            const events = data.data.map(event => ({
                title: event.title,
                start: `${event.date}T${event.time}`,
                description: event.description,
                category: event.category
            }));

            const filteredEvents = category === 'all' 
                ? events 
                : events.filter(event => event.category === category);

            successCallback(filteredEvents);
        } catch (error) {
            failureCallback(error);
        }
    }

    document.getElementById('categoryFilter').addEventListener('change', function() {
        calendar.refetchEvents();
    });
});
