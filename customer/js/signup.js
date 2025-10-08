 // Ensures the code runs only after the entire page structure is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // 1. Get references to the HTML elements
        const passwordInput = document.getElementById('passwordInput');
        // We target the parent <span> element with the class password-toggle
        const toggleButton = document.querySelector('.password-toggle');
        // And the icon element inside the span
        const toggleIcon = toggleButton.querySelector('i'); 

        // 2. Add a click listener to the icon
        toggleButton.addEventListener('click', function() {
            
            // Check the current type and determine the new type
            const currentType = passwordInput.getAttribute('type');
            const newType = currentType === 'password' ? 'text' : 'password';
            
            // Toggle the type attribute on the input field
            passwordInput.setAttribute('type', newType);

            // Toggle the icon class to match the visibility state
            if (newType === 'text') {
                // Change to open eye when password is visible
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            } else {
                // Change to crossed-out eye when password is hidden
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            }
        });
    });

document.addEventListener('DOMContentLoaded', function() {
    // 💡 Tiyakin na ang mga variables ay nakadeklara dito sa itaas 
    // para makita sila ng lahat ng functions sa loob ng block na ito.
    const form = document.getElementById('signupForm');
    const passwordInput = document.getElementById('passwordInput');
    const passwordFeedback = document.getElementById('passwordFeedback');

    // --- 1. Form Submission Handler ---
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        validateForm(); 
    });

    // --- 2. Main Validation Function (Called on Submit) ---
    function validateForm() {
        let isFormValid = true; 
        
        // I-set ang was-validated class para makita ng Bootstrap ang lahat ng red messages
        form.classList.add('was-validated'); 
        
        // 1. Check all standard required fields (First Name, Last Name, Email)
        if (!form.checkValidity()) {
            isFormValid = false;
        }

        // 2. Check Password Complexity (ang custom check natin)
        if (!validatePassword()) {
            isFormValid = false;
        }

        if (isFormValid) {
            // event.currentTarget.submit(); // Ipadala na ang form sa server (Node.js)
            console.log("Form is valid and ready to submit to Node.js backend!");
        }
    }
    
    // --- 3. Password Complexity Checker (COMPLETE!) ---
    function validatePassword() {
        const password = passwordInput.value;
        let isValid = true; 
        let feedbackMessage = '';

        // 1. CHECK: Character Length (8 to 25)
        if (password.length < 8 || password.length > 25) {
            isValid = false;
            feedbackMessage = 'Password must be between 8 and 25 characters.';
        } 

        // 2. CHECK: At least 1 Uppercase Letter (A-Z)
        const uppercaseRegex = /[A-Z]/;
        if (isValid && !uppercaseRegex.test(password)) {
            isValid = false;
            if (!feedbackMessage) { 
                feedbackMessage = 'Password must include at least one uppercase letter.';
            }
        }
        
        // 3. CHECK: At least 1 Lowercase Letter (a-z)
        const lowercaseRegex = /[a-z]/;
        if (isValid && !lowercaseRegex.test(password)) {
            isValid = false;
            if (!feedbackMessage) { 
                feedbackMessage = 'Password must include at least one lowercase letter.';
            }
        }

        // 4. CHECK: At least 1 Number (0-9)
        const numberRegex = /\d/;
        if (isValid && !numberRegex.test(password)) {
            isValid = false;
            if (!feedbackMessage) { 
                feedbackMessage = 'Password must include at least one number.';
            }
        }
        
        // 5. CHECK: At least 1 Special Character (The final rule!)
        const specialCharRegex = /[!@#$%^&*]/;
        if (isValid && !specialCharRegex.test(password)) {
            isValid = false;
            if (!feedbackMessage) { 
                feedbackMessage = 'Password must include at least one special character (e.g., !@#$%^&*).';
            }
        }
        
        // APLIKAHIN ang classes at i-return ang resulta
        if (isValid) {
            passwordInput.classList.remove('is-invalid');
            passwordInput.classList.add('is-valid');
            passwordFeedback.textContent = '';
        } else {
            passwordInput.classList.remove('is-valid');
            passwordInput.classList.add('is-invalid');
            passwordFeedback.textContent = feedbackMessage;
        }

        return isValid;
    }
});