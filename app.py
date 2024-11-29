from flask import Flask, g, request, jsonify, session
import sqlite3
from flask_cors import CORS
DATABASE = 'school_events.db' 

def get_db(): 
    db = getattr(g, '_database', None) 
    if db is None: 
        db = g._database = sqlite3.connect(DATABASE) 
    return db
from flask import Flask, g, request, jsonify, session
import sqlite3
from flask_cors import CORS

DATABASE = 'school_events.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

app = Flask(__name__)
app.secret_key = 'your_secret_key'
CORS(app)

def connect_db():
    return sqlite3.connect('backend/school_events.db')

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS Event (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                date TEXT NOT NULL,
                time TEXT NOT NULL,
                category TEXT NOT NULL
            )
        ''')
        db.commit()

init_db()

@app.route('/')
def home():
    return "Welcome to the School Events Manager!"

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Users WHERE username=? AND password=?', (username, password))
    user = cursor.fetchone()
    conn.close()
    if user:
        session['user_id'] = user[0]
        return jsonify({'message': 'Login successful!'})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/events', methods=['POST'])
def add_event():
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'}), 403
    data = request.get_json()
    title = data['title']
    description = data['description']
    date = data['date']
    time = data['time']
    category = data['category']
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO Event (title, description, date, time, category)
        VALUES (?, ?, ?, ?, ?)
    ''', (title, description, date, time, category))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Event added successfully!'})

@app.route('/events', methods=['GET'])
def get_events():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Event')
    events = cursor.fetchall()
    conn.close()
    event_list = [{'id': row[0], 'title': row[1], 'description': row[2], 'date': row[3], 'time': row[4], 'category': row[5]} for row in events]
    return jsonify(event_list)

@app.route('/events/<int:event_id>', methods=['GET', 'PUT', 'DELETE'])
def modify_event(event_id):
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'}), 403
    conn = connect_db()
    cursor = conn.cursor()
    if request.method == 'GET':
        cursor.execute('SELECT * FROM Event WHERE id=?', (event_id,))
        event = cursor.fetchone()
        conn.close()
        return jsonify({'id': event[0], 'title': event[1], 'description': event[2], 'date': event[3], 'time': event[4], 'category': event[5]})
    elif request.method == 'PUT':
        data = request.get_json()
        cursor.execute('''
            UPDATE Event SET title=?, description=?, date=?, time=?, category=? WHERE id=?
        ''', (data['title'], data['description'], data['date'], data['time'], data['category'], event_id))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Event updated successfully!'})
    elif request.method == 'DELETE':
        cursor.execute('DELETE FROM Event WHERE id=?', (event_id,))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Event deleted successfully!'})

@app.after_request
def log_request(response):
    if 'user_id' in session and request.method in ['POST', 'PUT', 'DELETE']:
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO EventLog (user_id, method, endpoint, data)
            VALUES (?, ?, ?, ?)
        ''', (session['user_id'], request.method, request.path, str(request.get_json())))
        conn.commit()
        conn.close()
    return response

if __name__ == '__main__':
    app.run(debug=True, port=5003)


app = Flask(__name__)
app.secret_key = 'your_secret_key'
CORS(app)

def connect_db():
    return sqlite3.connect('backend/school_events.db')

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS Event (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                date TEXT NOT NULL,
                location TEXT
            )
        ''')
        db.commit()

init_db()


@app.route('/')
def home():
    return "Welcome to the School Events Manager!"

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Users WHERE username=? AND password=?', (username, password))
    user = cursor.fetchone()
    conn.close()
    if user:
        session['user_id'] = user[0]
        return jsonify({'message': 'Login successful!'})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/events', methods=['POST'])
def add_event():
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'}), 403
    data = request.get_json()
    title = data['title']
    description = data['description']
    date = data['date']
    time = data['time']
    category = data['category']
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO Event (title, description, date, time, category)
        VALUES (?, ?, ?, ?, ?)
    ''', (title, description, date, time, category))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Event added successfully!'})

@app.route('/events', methods=['GET'])
def get_events():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Event')
    events = cursor.fetchall()
    conn.close()
    event_list = [{'id': row[0], 'title': row[1], 'description': row[2], 'date': row[3], 'time': row[4], 'category': row[5]} for row in events]
    return jsonify(event_list)

@app.route('/events/<int:event_id>', methods=['PUT', 'DELETE'])
def modify_event(event_id):
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'}), 403
    conn = connect_db()
    cursor = conn.cursor()
    if request.method == 'PUT':
        data = request.get_json()
        cursor.execute('''
            UPDATE Event SET title=?, description=?, date=?, time=?, category=? WHERE id=?
        ''', (data['title'], data['description'], data['date'], data['time'], data['category'], event_id))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Event updated successfully!'})
    elif request.method == 'DELETE':
        cursor.execute('DELETE FROM Event WHERE id=?', (event_id,))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Event deleted successfully!'})

@app.after_request
def log_request(response):
    if 'user_id' in session and request.method in ['POST', 'PUT', 'DELETE']:
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO EventLog (user_id, method, endpoint, data)
            VALUES (?, ?, ?, ?)
        ''', (session['user_id'], request.method, request.path, str(request.get_json())))
        conn.commit()
        conn.close()
    return response

if __name__ == '__main__':
    app.run(debug=True, port=5003)
