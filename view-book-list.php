<?php
// Start the session (if needed)
session_start();

// Fetch year group from the query string
$yearGroup = isset($_GET['year-group']) ? $_GET['year-group'] : '';

// Define the path to the booklists directory
$bookListsDir = 'Booklists/'; // This path is correct relative to the PHP file

// List of available book lists for each year group
$availableBookLists = [
    'infant1' => 'infant1booklist.pdf',
    'infant2' => 'infant2booklist.pdf',
    'infant3' => 'infant3booklist.pdf',
    'grade1'  => 'grade1booklist.pdf',
    'grade2'  => 'grade2booklist.pdf',
    'grade3'  => 'grade3booklist.pdf',
    'grade4'  => 'grade4booklist.pdf',
    'grade5'  => 'grade5booklist.pdf',
    'grade6'  => 'grade6booklist.pdf'
];

// Check if the selected year group is valid
if (array_key_exists($yearGroup, $availableBookLists)) {
    $bookFile = $availableBookLists[$yearGroup];
    $filePath = $bookListsDir . $bookFile;
    $yearGroupDisplay = ucfirst(str_replace('grade', 'Grade ', str_replace('infant', 'Infant ', $yearGroup)));

    if (file_exists($filePath)) {
        // Display book list options
        echo "
        <div class='container'>
            <h1>View " . $yearGroupDisplay . " Book List</h1>
            <p>Here is the book list for <strong>" . $yearGroupDisplay . "</strong>:</p>
            <div class='book-list'>
                <ul>
                    <li><a href='$filePath' target='_blank'>View " . ucfirst($yearGroup) . " Book List</a></li>
                    <li><a href='$filePath' download>Download " . ucfirst($yearGroup) . " Book List</a></li>
                    <li><a href='javascript:window.print()'>Print Book List</a></li>
                </ul>
            </div>
        </div>
        ";
    } else {
        echo "<p>The book list for this year group is not available.</p>";
    }
} else {
    echo "<p>Invalid year group selected.</p>";
}
?>
