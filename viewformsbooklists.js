// Handle the Book List Form submission
document.getElementById('book-list-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the year group input value
    const yearGroup = document.getElementById('year-group').value.trim();

    if (!yearGroup) {
        alert('Please enter a valid year group.');
        return;
    }

    // Construct file path for the specified booklist in the main folder
    const filePath = `/${yearGroup}booklist.pdf`; // Adjusted for main folder path

    // Update the result-container with links for viewing, downloading, and printing the booklist
    document.getElementById('result-container').innerHTML = `
        <h3>Book List for ${capitalizeFirstLetter(yearGroup)}</h3>
        <p><a href="${filePath}" target="_blank">View Book List</a></p>
        <p><a href="${filePath}" download="${yearGroup}booklist.pdf">Download Book List</a></p>
        <p><a href="javascript:window.print()">Print Book List</a></p>
    `;
});

// Handle the Form List submission
document.getElementById('form-list-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the form type input value
    const formType = document.getElementById('form-type').value.trim();

    if (!formType) {
        alert('Please enter a valid form type.');
        return;
    }

    // Construct file path for the specified form
    const filePath = `/Forms/${formType}_form.pdf`; // No change needed here, assuming forms are still in '/Forms'

    // Update the result-container with links for viewing, downloading, and printing the form
    document.getElementById('result-container').innerHTML = `
        <h3>${capitalizeFirstLetter(formType)} Form</h3>
        <p><a href="${filePath}" target="_blank">View Form</a></p>
        <p><a href="${filePath}" download="${formType}_form.pdf">Download Form</a></p>
        <p><a href="javascript:window.print()">Print Form</a></p>
    `;
});

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}