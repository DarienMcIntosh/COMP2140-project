// Teacher data in JSON format
const teachersData = [
    {
        "email": "toricarty@yahoo.com",
        "name": "Tori Carty",
        "position": "Principal"
    },
    {
        "email": "cladinecopeland@gmail.com",
        "name": "Claudine Copeland",
        "position": "Vice Principal"
    },
    {
        "email": "sherndiedrick@gmail.com",
        "name": "Sherron Diedrick",
        "position": "Grade Teacher"
    },
    {
        "email": "annsamuda@gmail.com",
        "name": "Ann Samuda",
        "position": "Grade Teacher"
    }
];

// Function to populate teacher dropdown
const teacherDropdown = document.getElementById("teacher-dropdown");

teachersData.forEach(teacher => {
    const option = document.createElement("option");
    option.value = teacher.name;
    option.textContent = teacher.name;
    teacherDropdown.appendChild(option);
});

// Function to display teacher info in the table when selected
teacherDropdown.addEventListener("change", (event) => {
    const selectedTeacherName = event.target.value;
    const teacherInfo = document.getElementById("teacher-info");
    const teacherName = document.getElementById("teacher-name");
    const teacherPosition = document.getElementById("teacher-position");
    const teacherEmail = document.getElementById("teacher-email");
    const emailBtn = document.getElementById("email-btn");

    // Find the selected teacher's data
    const teacher = teachersData.find(t => t.name === selectedTeacherName);

    if (teacher) {
        // Show teacher info
        teacherInfo.classList.remove("hidden");

        // Populate teacher info in table
        teacherName.textContent = teacher.name;
        teacherPosition.textContent = teacher.position;
        teacherEmail.textContent = teacher.email;

        // Set up the email button
        emailBtn.onclick = function () {
            const mailtoLink = `mailto:${teacher.email}`;
            window.location.href = mailtoLink;
        };
    } else {
        teacherInfo.classList.add("hidden");
    }
});