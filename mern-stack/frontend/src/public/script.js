const toggleButtons = document.querySelectorAll(".toggle-form");
const formContent = document.querySelector(".form-content");
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");

toggleButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Toggle the active class on both forms
    loginForm.classList.toggle("active");
    signupForm.classList.toggle("active");

    // Adjust the sliding position of the form content
    if (signupForm.classList.contains("active")) {
      formContent.style.transform = "translateX(-50%)"; // Slide to show signup form
    } else {
      formContent.style.transform = "translateX(0%)"; // Slide back to login form
    }
  });
});
