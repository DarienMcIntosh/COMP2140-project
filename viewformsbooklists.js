// Handle the Book List Form submission
document.getElementById('book-list-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var yearGroup = document.getElementById('year-group').value;
    var filePath = 'Booklists/' + yearGroup + 'booklist.pdf'; // Construct file path

    // Display the book list options in the result-container
    document.getElementById('result-container').innerHTML = `
        <h3>Book List for ${capitalizeFirstLetter(yearGroup)}</h3>
        <p><a href="${filePath}" target="_blank">View Book List</a></p>
        <p><a href="${filePath}" download>Download Book List</a></p>
        <p><a href="javascript:window.print()">Print Book List</a></p>
    `;
});

// Handle the Form submission
document.getElementById('form-list-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var formType = document.getElementById('form-type').value;
    var filePath = 'Forms/' + formType + '_form.pdf'; // Construct file path

    // Display the form options in the result-container
    document.getElementById('result-container').innerHTML = `
        <h3>${capitalizeFirstLetter(formType)} Form</h3>
        <p><a href="${filePath}" target="_blank">View Form</a></p>
        <p><a href="${filePath}" download>Download Form</a></p>
        <p><a href="javascript:window.print()">Print Form</a></p>
    `;
});

// Helper function to capitalize the first letter of the string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
