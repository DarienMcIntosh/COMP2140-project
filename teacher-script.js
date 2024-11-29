document.getElementById("teacher-select").addEventListener("change", function () {
    const teacherSelect = document.getElementById("teacher-select");
    const contactInfo = document.getElementById("contact-info");
    const emailBtn = document.getElementById("email-btn");
    const teacherEmail = document.getElementById("teacher-email");

    const selectedTeacher = teacherSelect.value;

    // Hide the contact info section initially
    contactInfo.classList.add("hidden");

    // Display the appropriate teacher's contact info
    if (selectedTeacher === "teacher1") {
        teacherEmail.textContent = "janedoe@school.com";
        contactInfo.classList.remove("hidden");
    } else if (selectedTeacher === "teacher2") {
        teacherEmail.textContent = "johnsmith@school.com";
        contactInfo.classList.remove("hidden");
    } else if (selectedTeacher === "teacher3") {
        teacherEmail.textContent = "sarahlee@school.com";
        contactInfo.classList.remove("hidden");
    }

    // Set up the email button to generate an email
    emailBtn.onclick = function () {
        const mailtoLink = `mailto:${teacherEmail.textContent}`;
        window.location.href = mailtoLink;
    };
});
});
