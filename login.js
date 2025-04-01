document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const socialButtons = document.querySelectorAll('.social-login-btn');
    const forgotPassword = document.querySelector('.forgot-password');
    const registerLink = document.querySelector('.register-link a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Show loading state
            const submitButton = document.querySelector('.login-btn-form');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
            submitButton.disabled = true;
            
            // Simulate API request with timeout
            setTimeout(function() {
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Show prank message
                alert('This is a demo application. No actual login functionality exists.\n\nYou can return to the home page to try the Ghibli image transformer!');
                
                // Redirect back to home page
                window.location.href = 'index.html';
            }, 1500);
        });
    }
    
    // Handle social login buttons
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('This is a demo application. Social login is not available.');
        });
    });
    
    // Handle forgot password link
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This is a demo application. Password recovery is not available.');
        });
    }
    
    // Handle register link
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This is a demo application. Registration is not available.');
        });
    }
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
});
