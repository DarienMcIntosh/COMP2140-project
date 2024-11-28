function attemptLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");

    // Simple validation for demonstration
    if (username === "user123" && password === "password") {
        loginMessage.style.color = "#28a745";
        loginMessage.textContent = "Login successful! Redirecting to the Media Uploader...";

        // Save authentication status (you may use more secure methods in a real application)
        localStorage.setItem('authenticated', 'true');

        // Redirect to the dashboard after a short delay
        setTimeout(() => {
            window.location.href = 'upload.html';
        }, 1500);
    } else {
        loginMessage.style.color = "#dc3545";
        loginMessage.textContent = "Invalid username or password. Please try again.";
    }
}