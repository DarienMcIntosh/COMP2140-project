<?php
include 'connect.php'; // Use the existing connect.php file for the database connection

// Query to fetch teachers' data from the database
$sql = "SELECT name, position, email FROM teachers";
$result = $conn->query($sql);

// Start the HTML output
echo '<div class="container">';
echo '<h1>Teachers List</h1>';

// Check if there are any results
if ($result->num_rows > 0) {
    // Start the table
    echo "<table>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Email</th>
            </tr>";
    
    // Loop through each teacher and display their data in the table
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . htmlspecialchars($row['name']) . "</td>
                <td>" . htmlspecialchars($row['position']) . "</td>";
        
        // Make the email clickable (if an email exists)
        if ($row['email']) {
            echo "<td><a href='mailto:" . htmlspecialchars($row['email']) . "'>" . htmlspecialchars($row['email']) . "</a></td>";
        } else {
            echo "<td>No email provided</td>";
        }
        
        echo "</tr>";
    }
    // End the table
    echo "</table>";
} else {
    // Display a message if there are no results
    echo "<p>No data available</p>";
}

// Close the container
echo '</div>';

// Close the database connection
$conn->close();
?>
?>
