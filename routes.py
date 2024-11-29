from flask import Blueprint, request, jsonify
from models import db, Event
from datetime import datetime

event_routes = Blueprint('events', __name__)

@event_routes.route('/events', methods=['GET', 'POST'])
def manage_events():
    if request.method == 'POST':
        data = request.get_json()
        new_event = Event(
            title=data['title'],
            description=data['description'],
            date=datetime.strptime(data['date'], '%Y-%m-%d'),
            time=datetime.strptime(data['time'], '%H:%M').time(),
            category=data['category']
        )
        db.session.add(new_event)
        db.session.commit()
        return jsonify({'message': 'Event added successfully'}), 201

    elif request.method == 'GET':
        events = Event.query.all()
        return jsonify([{
            'id': event.id,
            'title': event.title,
            'description': event.description,
            'date': event.date.strftime('%Y-%m-%d'),
            'time': event.time.strftime('%H:%M'),
            'category': event.category
        } for event in events])

@event_routes.route('/events/<int:id>', methods=['PUT', 'DELETE'])
def update_delete_event(id):
    event = Event.query.get_or_404(id)
    if request.method == 'PUT':
        data = request.get_json()
        event.title = data['title']
        event.description = data['description']
        event.date = datetime.strptime(data['date'], '%Y-%m-%d')
        event.time = datetime.strptime(data['time'], '%H:%M').time()
        event.category = data['category']
        db.session.commit()
        return jsonify({'message': 'Event updated successfully'})

    elif request.method == 'DELETE':
        db.session.delete(event)
        db.session.commit()
        return jsonify({'message': 'Event deleted successfully'})
