document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const alertBox = document.getElementById('registerAlert');
    const confirmPasswordInput = document.getElementById('regConfirmPassword');
    const passwordInput = form.password;
    const emailInput = form.email;
    const fullnameInput = form.fullname;

    const validateName = () => {
      const isValid = fullnameInput.value.trim().length >= 3;
      toggleValidation(fullnameInput, isValid);
      return isValid;
    };
  
    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(emailInput.value.trim());
      toggleValidation(emailInput, isValid);
      return isValid;
    };
  
    const validatePassword = () => {
      const isValid = passwordInput.value.trim().length >= 5;
      toggleValidation(passwordInput, isValid);
      return isValid;
    };
  
    const validateConfirmPassword = () => {
      const isMatch = passwordInput.value === confirmPasswordInput.value && confirmPasswordInput.value !== "";
      toggleValidation(confirmPasswordInput, isMatch);
      confirmPasswordInput.setCustomValidity(isMatch ? "" : "Passwords do not match");
      return isMatch;
    };
  
    const toggleValidation = (input, isValid) => {
      input.classList.toggle('is-valid', isValid);
      input.classList.toggle('is-invalid', !isValid);
    };
  
    fullnameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', () => {
      validatePassword();
      validateConfirmPassword(); 
    });
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
  
    form.onsubmit = e => {
      e.preventDefault();
  
      const validName = validateName();
      const validEmail = validateEmail();
      const validPassword = validatePassword();
      const validConfirm = validateConfirmPassword();
  
      if (!form.checkValidity() || !validName || !validEmail || !validPassword || !validConfirm) {
        form.classList.add('was-validated');
        return;
      }
  
      const fullname = fullnameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
  
      const users = JSON.parse(localStorage.getItem('users')) || [];
  
      if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
        showAlert("Email already registered!", "danger");
        return;
      }
  
      users.push({ fullname, email, password });
      localStorage.setItem('users', JSON.stringify(users));
  
      form.reset();
      form.classList.remove('was-validated');
      [fullnameInput, emailInput, passwordInput, confirmPasswordInput].forEach(i => {
        i.classList.remove('is-valid', 'is-invalid');
      });
  
      window.location.href = "login.html";
    };
  
    function showAlert(message, type) {
      alertBox.textContent = message;
      alertBox.className = `alert alert-${type}`;
      alertBox.classList.remove('d-none');
    }
  });
  