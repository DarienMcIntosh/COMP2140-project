const dragArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.header');

let button = document.querySelector('.button');
let input = document.querySelector('input');

let file;

button.onclick = () => {
    input.click();
};

// When browse
input.addEventListener('change', function() {
    file = this.files[0];
    dragArea.classList.add('active');
    displayFile();
});

// When file is inside the drag area
dragArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dragText.textContent = 'Release to upload';
    dragArea.classList.add('active');
});

// When file leaves the drag area
dragArea.addEventListener('dragleave', () => {
    dragText.textContent = 'Drag & Drop';
    dragArea.classList.remove('active');
});

// When file is dropped in the drag area
dragArea.addEventListener('drop', (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    dragArea.classList.add('active');
    displayFile();
});

function displayFile() {
    let fileType = file.type;
    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'audio/mpeg'];

    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let mediaTag;

            if (fileType.startsWith('image/')) {
                mediaTag = `<img src="${fileURL}" alt="">`;
            } else if (fileType.startsWith('video/')) {
                mediaTag = `<video controls src="${fileURL}"></video>`;
            } else if (fileType.startsWith('audio/')) {
                mediaTag = `<audio controls src="${fileURL}"></audio>`;
            }

            dragArea.innerHTML = mediaTag;

            // Upload file to the server
            uploadFile(file);
        };
        fileReader.readAsDataURL(file);
    } else {
        alert('This file is not supported');
        dragArea.classList.remove('active');
    }
}

function uploadFile(file) {
    let formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        alert('File uploaded successfully');
    }).catch(error => {
        console.error('Error uploading file:', error);
        alert('Error uploading file');
    });
}

