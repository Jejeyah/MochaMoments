
    // Get the elements
    const passwordInput = document.getElementById('passwordInput');
    const passwordToggle = document.getElementById('passwordToggle');
    const toggleIcon = passwordToggle.querySelector('i');

    // Add click event listener to the toggle span
    passwordToggle.addEventListener('click', function() {
        // Check the current type of the input
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        
        // Toggle the type attribute
        passwordInput.setAttribute('type', type);
        
        // Toggle the eye icon (fa-eye-slash for hidden, fa-eye for visible)
        toggleIcon.classList.toggle('fa-eye-slash');
        toggleIcon.classList.toggle('fa-eye');
    });
