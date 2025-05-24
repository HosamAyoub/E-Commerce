document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const alertBox = document.getElementById("loginAlert");
  const emailInput = form.email;
  const passwordInput = form.password;

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

  const toggleValidation = (input, isValid) => {
    input.classList.toggle("is-valid", isValid);
    input.classList.toggle("is-invalid", !isValid);
  };

  emailInput.addEventListener("input", validateEmail);
  passwordInput.addEventListener("input", validatePassword);

  form.onsubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      form.classList.add("was-validated");
      return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      sessionStorage.setItem("loginSuccess", "true");
      alertBox.classList.add("d-none");
      window.location.href = "index.html";
    } else {
      const userExists = users.some((u) => u.email === email);

      if (userExists) {
        alertBox.textContent = "Incorrect password.";
      } else {
        alertBox.textContent = "User not found. Please sign up first.";
      }

      alertBox.className = "alert alert-danger mt-2";
      alertBox.classList.remove("d-none");
    }
  };
});
