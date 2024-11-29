<?php
// Start the session (if needed)
session_start();

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Directories where the book lists and forms are stored
$bookListsDir = '../Booklists/';
$formsDir = '../Forms/';

// Predefined lists of available book lists and forms
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

$availableForms = [
    'medical'  => 'medicalform.pdf',
    'registration' => 'registrationform.pdf',
    'uniform' => 'uniformform.pdf'
];

// Handle Add, Update, or Delete actions
$action = isset($_GET['action']) ? $_GET['action'] : '';
$type = isset($_GET['type']) ? $_GET['type'] : '';

// Handle Book List Actions
if ($type === 'booklist') {
    if ($action === 'add') {
        echo "<h2>Add New Book List</h2>";
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Handle file upload for book list
            $yearGroup = $_POST['year-group'];
            $fileName = basename($_FILES['booklist']['name']);
            $targetFile = $bookListsDir . $yearGroup . $fileName;

            if ($_FILES['booklist']['type'] === 'application/pdf') {
                if (move_uploaded_file($_FILES['booklist']['tmp_name'], $targetFile)) {
                    echo "<p>Book list for " . ucfirst($yearGroup) . " added successfully.</p>";
                } else {
                    echo "<p>Error uploading the new book list.</p>";
                }
            } else {
                echo "<p>Please upload a PDF file.</p>";
            }
        }
        ?>

        <form action="manage.php?action=add&type=booklist" method="POST" enctype="multipart/form-data">
            <label for="year-group">Select Year Group:</label>
            <select name="year-group" required>
                <option value="infant1">Infant 1</option>
                <option value="infant2">Infant 2</option>
                <option value="infant3">Infant 3</option>
                <option value="grade1">Grade 1</option>
                <option value="grade2">Grade 2</option>
                <option value="grade3">Grade 3</option>
                <option value="grade4">Grade 4</option>
                <option value="grade5">Grade 5</option>
                <option value="grade6">Grade 6</option>
            </select>
            <br>
            <label for="booklist">Upload Book List (PDF):</label>
            <input type="file" name="booklist" accept="application/pdf" required>
            <br>
            <button type="submit">Add Book List</button>
        </form>

    <?php
    } elseif ($action === 'update') {
        echo "<h2>Update Existing Book List</h2>";

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Handle file upload for book list update
            $yearGroup = $_POST['year-group'];
            $fileName = basename($_FILES['booklist']['name']);
            $targetFile = $bookListsDir . $yearGroup . $fileName;

            if ($_FILES['booklist']['type'] === 'application/pdf') {
                if (move_uploaded_file($_FILES['booklist']['tmp_name'], $targetFile)) {
                    echo "<p>Book list for " . ucfirst($yearGroup) . " updated successfully.</p>";
                } else {
                    echo "<p>Error updating the book list.</p>";
                }
            } else {
                echo "<p>Please upload a PDF file.</p>";
            }
        }

        ?>
        <form action="manage.php?action=update&type=booklist" method="POST" enctype="multipart/form-data">
            <label for="year-group">Select Year Group:</label>
            <select name="year-group" required>
                <?php foreach ($availableBookLists as $yearGroup => $file) : ?>
                    <option value="<?= $yearGroup ?>"><?= ucfirst(str_replace('grade', 'Grade ', str_replace('infant', 'Infant ', $yearGroup))) ?></option>
                <?php endforeach; ?>
            </select>
            <br>
            <label for="booklist">Upload Updated Book List (PDF):</label>
            <input type="file" name="booklist" accept="application/pdf" required>
            <br>
            <button type="submit">Update Book List</button>
        </form>

    <?php
    } elseif ($action === 'delete') {
        echo "<h2>Delete Book List</h2>";

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Handle deletion of book list
            $yearGroup = $_POST['year-group'];
            $filePath = $bookListsDir . $availableBookLists[$yearGroup];

            if (file_exists($filePath)) {
                unlink($filePath);
                echo "<p>Book list for " . ucfirst($yearGroup) . " deleted successfully.</p>";
            } else {
                echo "<p>Book list not found.</p>";
            }
        }

        ?>
        <form action="manage.php?action=delete&type=booklist" method="POST">
            <label for="year-group">Select Year Group to Delete:</label>
            <select name="year-group" required>
                <?php foreach ($availableBookLists as $yearGroup => $file) : ?>
                    <option value="<?= $yearGroup ?>"><?= ucfirst(str_replace('grade', 'Grade ', str_replace('infant', 'Infant ', $yearGroup))) ?></option>
                <?php endforeach; ?>
            </select>
            <br>
            <button type="submit">Delete Book List</button>
        </form>

    <?php
    }
}

// Handle Form Actions (Medical, Registration, Uniform)
elseif ($type === 'form') {
    if ($action === 'add') {
        echo "<h2>Add New Form</h2>";
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Handle file upload for forms
            $formType = $_POST['form-type'];
            $fileName = $formType . '-' . basename($_FILES['form']['name']);
            $targetFile = $formsDir . $fileName;

            if ($_FILES['form']['type'] !== 'application/pdf') {
                echo "<p>Please upload a valid PDF file.</p>";
            } elseif ($_FILES['form']['size'] > 5000000) {
                echo "<p>File size exceeds the maximum limit of 5MB.</p>";
            } elseif (move_uploaded_file($_FILES['form']['tmp_name'], $targetFile)) {
                echo "<p>Form for " . ucfirst($formType) . " added successfully.</p>";
            } else {
                echo "<p>Error uploading the new form.</p>";
            }
        }
        ?>
        <form action="manage.php?action=add&type=form" method="POST" enctype="multipart/form-data">
            <label for="form-type">Select Form Type:</label>
            <select name="form-type" required>
                <option value="medical">Medical</option>
                <option value="registration">Registration</option>
                <option value="uniform">Uniform</option>
            </select>
            <br>
            <label for="form">Upload Form (PDF):</label>
            <input type="file" name="form" accept="application/pdf" required>
            <br>
            <button type="submit">Add Form</button>
        </form>

    <?php
    } elseif ($action === 'update') {
        echo "<h2>Update Existing Form</h2>";

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Handle file upload for form update
            $formType = $_POST['form-type'];
            $fileName = $formType . '-' . basename($_FILES['form']['name']);
            $targetFile = $formsDir . $fileName;

            if ($_FILES['form']['type'] !== 'application/pdf') {
                echo "<p>Please upload a valid PDF file.</p>";
            } elseif ($_FILES['form']['size'] > 5000000) {
                echo "<p>File size exceeds the maximum limit of 5MB.</p>";
            } elseif (move_uploaded_file($_FILES['form']['tmp_name'], $targetFile)) {
                echo "<p>Form for " . ucfirst($formType) . " updated successfully.</p>";
            } else {
                echo "<p>Error updating the form.</p>";
            }
        }

        ?>
        <form action="manage.php?action=update&type=form" method="POST" enctype="multipart/form-data">
            <label for="form-type">Select Form Type:</label>
            <select name="form-type" required>
                <?php foreach ($availableForms as $formType => $file) : ?>
                    <option value="<?= $formType ?>"><?= ucfirst($formType) ?></option>
                <?php endforeach; ?>
            </select>
            <br>
            <label for="form">Upload Updated Form (PDF):</label>
            <input type="file" name="form" accept="application/pdf" required>
            <br>
            <button type="submit">Update Form</button>
        </form>

    <?php
    } elseif ($action === 'delete') {
        echo "<h2>Delete Form</h2>";

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Handle form deletion
            $formType = $_POST['form-type'];
            $filePath = $formsDir . $formType . 'form.pdf';

            if (file_exists($filePath)) {
                unlink($filePath);
                echo "<p>Form for " . ucfirst($formType) . " deleted successfully.</p>";
            } else {
                echo "<p>Form not found.</p>";
            }
        }

        ?>
        <form action="manage.php?action=delete&type=form" method="POST">
            <label for="form-type">Select Form Type to Delete:</label>
            <select name="form-type" required>
                <?php foreach ($availableForms as $formType => $file) : ?>
                    <option value="<?= $formType ?>"><?= ucfirst($formType) ?></option>
                <?php endforeach; ?>
            </select>
            <br>
            <button type="submit">Delete Form</button>
        </form>

    <?php
    }
} else {
    echo "<p>No action selected.</p>";
}
?>
