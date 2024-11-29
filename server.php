<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Connect to SQLite database
$database = new SQLite3('school.db');

// Function to log actions
function logChange($action, $event) { 
    $timestamp = date('l, F j, Y \a\t g:i:s A'); 
    $logEntry = "$timestamp - $action: " . json_encode($event) . "\n"; 
    file_put_contents('event_log.txt', $logEntry, FILE_APPEND); 
}

// Endpoint to get events
function getEvents($db) {
    $result = $db->query('SELECT * FROM events');
    $events = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $events[] = $row;
    }
    echo json_encode(["message" => "success", "data" => $events]);
}

// Endpoint to add a new event
function addEvent($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    $sql = 'INSERT INTO events (title, description, date, time, category) VALUES (:title, :description, :date, :time, :category)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':title', $input['title'], SQLITE3_TEXT);
    $stmt->bindValue(':description', $input['description'], SQLITE3_TEXT);
    $stmt->bindValue(':date', $input['date'], SQLITE3_TEXT);
    $stmt->bindValue(':time', $input['time'], SQLITE3_TEXT);
    $stmt->bindValue(':category', $input['category'], SQLITE3_TEXT);
    $result = $stmt->execute();

    if ($result) {
        $event = [
            "id" => $db->lastInsertRowID(),
            "title" => $input['title'],
            "description" => $input['description'],
            "date" => $input['date'],
            "time" => $input['time'],
            "category" => $input['category']
        ];
        logChange('Add', $event);
        echo json_encode(["message" => "success", "id" => $event["id"]]);
    } else {
        echo json_encode(["message" => "error", "error" => $db->lastErrorMsg()]);
    }
}

// Endpoint to update an event
function updateEvent($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $_GET['id'];
    $sql = 'UPDATE events SET title = :title, description = :description, date = :date, time = :time, category = :category WHERE id = :id';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':title', $input['title'], SQLITE3_TEXT);
    $stmt->bindValue(':description', $input['description'], SQLITE3_TEXT);
    $stmt->bindValue(':date', $input['date'], SQLITE3_TEXT);
    $stmt->bindValue(':time', $input['time'], SQLITE3_TEXT);
    $stmt->bindValue(':category', $input['category'], SQLITE3_TEXT);
    $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
    $result = $stmt->execute();

    if ($result) {
        $event = [
            "id" => $id,
            "title" => $input['title'],
            "description" => $input['description'],
            "date" => $input['date'],
            "time" => $input['time'],
            "category" => $input['category']
        ];
        logChange('Update', $event);
        echo json_encode(["message" => "success"]);
    } else {
        echo json_encode(["message" => "error", "error" => $db->lastErrorMsg()]);
    }
}

// Endpoint to delete an event
function deleteEvent($db) {
    $id = $_GET['id'];
    $sql = 'DELETE FROM events WHERE id = :id';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
    $result = $stmt->execute();

    if ($result) {
        logChange('Delete', ["id" => $id]);
        echo json_encode(["message" => "deleted"]);
    } else {
        echo json_encode(["message" => "error", "error" => $db->lastErrorMsg()]);
    }
}

// Determine which function to call based on the request method and action
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'login':
        if ($method == 'POST') {
            handleLogin($database);
        }
        break;
    case 'events':
        if ($method == 'GET') {
            getEvents($database);
        } elseif ($method == 'POST') {
            addEvent($database);
        }
        break;
    case 'updateEvent':
        if ($method == 'PUT') {
            updateEvent($database);
        }
        break;
    case 'deleteEvent':
        if ($method == 'DELETE') {
            deleteEvent($database);
        }
        break;
    default:
        echo json_encode(["message" => "Invalid action or method"]);
        break;
}

// Close the database connection
$database->close();
?>
