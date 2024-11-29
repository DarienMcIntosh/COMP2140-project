document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('event-form');
    const editForm = document.getElementById('edit-form');
    const eventsTable = document.getElementById('events-table').getElementsByTagName('tbody')[0];

    async function fetchEvents() {
        try {
            const response = await fetch('server.php?action=events');
            const data = await response.json();
            console.log('Fetched events:', data);
            eventsTable.innerHTML = '';

            if (data.message === "success" && Array.isArray(data.data)) {
                data.data.forEach(event => {
                    const row = eventsTable.insertRow();
                    row.insertCell(0).innerText = event.title;
                    row.insertCell(1).innerText = event.description;
                    row.insertCell(2).innerText = event.date;
                    row.insertCell(3).innerText = event.time;
                    row.insertCell(4).innerText = event.category;
                    const actionsCell = row.insertCell(5);

                    const editButton = document.createElement('button');
                    editButton.innerText = 'Edit';
                    editButton.onclick = () => showEditForm(event);
                    actionsCell.appendChild(editButton);

                    const deleteButton = document.createElement('button');
                    deleteButton.innerText = 'Delete';
                    deleteButton.onclick = () => deleteEvent(event.id);
                    actionsCell.appendChild(deleteButton);
                });
            } else {
                console.error('Error fetching events:', data.error);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    async function addEvent(event) {
        console.log('Adding event:', event);
        if (confirm('Are you sure you want to add this event?')) {
            try {
                const response = await fetch('server.php?action=events', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(event),
                });
                if (response.ok) {
                    console.log('Event added successfully');
                    fetchEvents();
                } else {
                    console.error('Error adding event:', response.statusText);
                }
            } catch (error) {
                console.error('Error adding event:', error);
            }
        }
    }

    async function deleteEvent(id) {
        console.log('Deleting event ID:', id);
        if (confirm('Are you sure you want to delete this event?')) {
            try {
                const response = await fetch(`server.php?action=deleteEvent&id=${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    console.log('Event deleted successfully');
                    fetchEvents();
                } else {
                    console.error('Error deleting event:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    }

    async function updateEvent(id, event) {
        console.log('Updating event ID:', id, event);
        if (confirm('Are you sure you want to update this event?')) {
            try {
                const response = await fetch(`server.php?action=updateEvent&id=${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(event),
                });
                if (response.ok) {
                    console.log('Event updated successfully');
                    fetchEvents();
                    editForm.style.display = 'none';
                    form.style.display = 'block';
                } else {
                    console.error('Error updating event:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating event:', error);
            }
        }
    }

    function showEditForm(event) {
        form.style.display = 'none';
        editForm.style.display = 'block';

        document.getElementById('edit-title').value = event.title;
        document.getElementById('edit-description').value = event.description;
        document.getElementById('edit-date').value = event.date;
        document.getElementById('edit-time').value = event.time;
        document.getElementById('edit-category').value = event.category;

        editForm.onsubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(editForm);
            const updatedEvent = {
                title: formData.get('title'),
                description: formData.get('description'),
                date: formData.get('date'),
                time: formData.get('time'),
                category: formData.get('category'),
            };
            updateEvent(event.id, updatedEvent);
        };
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const event = {
            title: formData.get('title'),
            description: formData.get('description'),
            date: formData.get('date'),
            time: formData.get('time'),
            category: formData.get('category'),
        };
        addEvent(event);
        form.reset();
    });

    window.onload = fetchEvents;
});
