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
            const response = await fetch('server.php?action=events'); // Match this with the PHP endpoint
            const data = await response.json();
            console.log('Fetched events:', data); // Debugging line

            if (data.message === "success" && Array.isArray(data.data)) {
                const events = data.data.map(event => ({
                    title: event.title,
                    start: `${event.date}T${event.time}`,
                    description: event.description,
                    category: event.category
                }));
                
                console.log('Mapped events:', events); // Debugging line
                
                const filteredEvents = category === 'all' 
                    ? events 
                    : events.filter(event => event.category === category);
                
                console.log('Filtered events:', filteredEvents); // Debugging line
                
                successCallback(filteredEvents);
            } else {
                console.error('Error fetching events:', data.error || 'Unexpected response format'); // Debugging line
                failureCallback('No events data');
            }
        } catch (error) {
            console.error('Error fetching events:', error); // Debugging line
            failureCallback(error);
        }
    }

    document.getElementById('categoryFilter').addEventListener('change', function() {
        calendar.refetchEvents();
    });
});
