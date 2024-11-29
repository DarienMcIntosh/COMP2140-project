<?php
$conn = new mysqli('localhost', 'root', '', 'school'); // Your database credentials

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>
?>
