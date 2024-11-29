const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// In-memory store for events
let events = [
    // Example events
    { id: 1, title: 'Meeting', description: 'Discuss project updates', date: '2024-12-01', time: '10:00', category: 'Work' },
    { id: 2, title: 'Birthday Party', description: 'Celebrate John\'s birthday', date: '2024-12-05', time: '18:00', category: 'Personal' }
];

// Function to log changes to an event
function logChange(action, event) {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric',
        hour12: true,
        timeZone: 'America/New_York'
    };
    const timestamp = now.toLocaleString('en-US', options);
    const logEntry = `${timestamp} - ${action}: ${JSON.stringify(event)}\n`;
    fs.appendFile('event_log.txt', logEntry, (err) => {
        if (err) throw err;
        console.log('Log entry added');
    });
}

// Endpoint to get events
app.get('/events', (req, res) => {
    res.json({
        message: "success",
        data: events
    });
});

// Endpoint to add a new event
app.post('/events', (req, res) => {
    const { title, description, date, time, category } = req.body;
    const newEvent = { title, description, date, time, category, id: events.length + 1 };
    events.push(newEvent);
    logChange('Add', newEvent);
    res.json({ message: "success", id: newEvent.id });
});

// Endpoint to update an event
app.put('/events/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, date, time, category } = req.body;
    const eventIndex = events.findIndex(event => event.id == id);
    if (eventIndex !== -1) {
        const updatedEvent = { id, title, description, date, time, category };
        events[eventIndex] = updatedEvent;
        logChange('Update', updatedEvent);
        res.json({
            message: "success",
            data: updatedEvent
        });
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});

// Endpoint to delete an event
app.delete('/events/:id', (req, res) => {
    const { id } = req.params;
    const eventIndex = events.findIndex(event => event.id == id);
    if (eventIndex !== -1) {
        const deletedEvent = events.splice(eventIndex, 1);
        logChange('Delete', deletedEvent[0]);
        res.json({ message: "deleted", rows: deletedEvent });
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
