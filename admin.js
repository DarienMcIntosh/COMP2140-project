document.addEventListener('DOMContentLoaded', () => {
    const booklistForm = document.getElementById('add-booklist-form');
    const formForm = document.getElementById('add-form-form');
    const booklistContainer = document.getElementById('booklist-container');
    const formContainer = document.getElementById('form-container');

    // Load existing resources from localStorage
    loadResources();

    // Handle adding a new book list
    booklistForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const year = document.getElementById('booklist-year').value;
        const file = document.getElementById('booklist-file').files[0];

        if (file && year) {
            const newBooklist = { year, file: file.name };
            addResource('booklists', newBooklist);
        }
    });

    // Handle adding a new form
    formForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formType = document.getElementById('form-type').value;
        const file = document.getElementById('form-file').files[0];

        if (file && formType) {
            const newForm = { type: formType, file: file.name };
            addResource('forms', newForm);
        }
    });

    // Function to add a new resource (booklist/form)
    function addResource(type, resource) {
        let resources = JSON.parse(localStorage.getItem(type)) || [];
        resources.push(resource);
        localStorage.setItem(type, JSON.stringify(resources));

        // Reload the page to reflect changes
        loadResources();
    }

    // Function to load resources from localStorage
    function loadResources() {
        booklistContainer.innerHTML = '';
        formContainer.innerHTML = '';

        const booklists = JSON.parse(localStorage.getItem('booklists')) || [];
        const forms = JSON.parse(localStorage.getItem('forms')) || [];

        // Display Booklists
        booklists.forEach((booklist, index) => {
            const booklistDiv = document.createElement('div');
            booklistDiv.innerHTML = `
                <p>${booklist.year} - <a href="Booklists/${booklist.file}" target="_blank">View</a> | <button onclick="deleteResource('booklists', ${index})">Delete</button></p>
            `;
            booklistContainer.appendChild(booklistDiv);
        });

        // Display Forms
        forms.forEach((form, index) => {
            const formDiv = document.createElement('div');
            formDiv.innerHTML = `
                <p>${form.type} - <a href="Forms/${form.file}" target="_blank">View</a> | <button onclick="deleteResource('forms', ${index})">Delete</button></p>
            `;
            formContainer.appendChild(formDiv);
        });
    }

    // Function to delete a resource
    window.deleteResource = (type, index) => {
        let resources = JSON.parse(localStorage.getItem(type)) || [];
        resources.splice(index, 1);
        localStorage.setItem(type, JSON.stringify(resources));

        // Reload the page to reflect changes
        loadResources();
    };
});
