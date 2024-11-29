<?php
// Fetch the form type from the query string
$formType = isset($_GET['form-type']) ? $_GET['form-type'] : '';

// Define the path to the forms directory
$formsDir = 'Forms/';

// List of available forms
$availableForms = [
    'medical' => 'medical_form.pdf',
    'registration' => 'registration_form.pdf',
    'uniform' => 'uniform_form.pdf'
];

// Check if the selected form is valid
if (array_key_exists($formType, $availableForms)) {
    $formFile = $availableForms[$formType];
    $filePath = $formsDir . $formFile;
    $formTypeDisplay = ucfirst($formType) . " Form";

    if (file_exists($filePath)) {
        // Display form options
        echo "
        <div class='container'>
            <h1>Download " . $formTypeDisplay . "</h1>
            <p>You can view or download the <strong>" . $formTypeDisplay . "</strong> below:</p>
            <div class='form-list'>
                <ul>
                    <li><a href='$filePath' target='_blank'>View " . $formTypeDisplay . "</a></li>
                    <li><a href='$filePath' download>Download " . $formTypeDisplay . "</a></li>
                    <li><a href='javascript:window.print()'>Print " . $formTypeDisplay . "</a></li>
                </ul>
            </div>
        </div>
        ";
    } else {
        echo "<p>The selected form is not available.</p>";
    }
} else {
    echo "<p>Invalid form type selected.</p>";
}
?>
