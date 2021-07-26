// Variables
const sendBtn = document.querySelector("#sendBtn");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");
const resetBtn = document.querySelector("#resetBtn");
const form = document.querySelector("#email-form");

// Event Listeners
function eventListeners() {
  // App Initialization
  document.addEventListener("DOMContentLoaded", appInit);

  // Fields Validating
  email.addEventListener("blur", validateField);
  subject.addEventListener("blur", validateField);
  message.addEventListener("blur", validateField);

  // Rest Button
  resetBtn.addEventListener("click", resetTheForm);

  // Submiting The Form And Showing Gif
  form.addEventListener("submit", sendEmail);
}

eventListeners();

// Functions
function appInit() {
  // Disabling Send Button On Load
  sendBtn.disabled = true;
}

// Submiting The Form And Sending Email
function sendEmail(e) {
  e.preventDefault();
  const spinner = document.querySelector("#spinner");
  // Showing The Spinner
  spinner.style.display = "block";

  // Making The Second Gif
  const emailSentImg = document.createElement("img");
  emailSentImg.src = "../img/mail.gif";
  emailSentImg.style.display = "block";

  // Showing The Email Was Successfully Sent
  setTimeout(function () {
    // Hiding The Spinner
    spinner.style.display = "none";

    // Appending The Sent Gif To The Div
    const loaders = document.querySelector("#loaders");
    loaders.appendChild(emailSentImg);

    // Reset The Form And Remove Gif
    setTimeout(() => {
      resetTheForm();
      emailSentImg.remove();
    }, 5000);
  }, 3000);
}

// Form Fields Validating
function validateField() {
  // Validating The Length Of The Field
  validateLength(this);

  // Validating The Email Field
  if (this.type == "email") {
    validateEmail(this);
  }

  const error = document.querySelectorAll(".error");
  // Enabling The Send Btn If Everything Was Correct
  if (email.value !== "" && subject.value !== "" && message.value !== "") {
    if (error.length === 0) {
      sendBtn.disabled = false;
    }
  } else if (
    email.value === "" ||
    subject.value === "" ||
    message.value === ""
  ) {
    sendBtn.disabled = true;
  }
}

// Validating The Length Of Fields
function validateLength(field) {
  if (field.value.length > 0) {
    field.style.borderBottomColor = "green";
    field.classList.remove("error");
  } else {
    field.style.borderBottomColor = "red";
    field.classList.add("error");
  }
}

// Validate Email Field Content
function validateEmail(field) {
  const emailText = field.value;

  if (emailText.includes("@") && emailText.length > 1) {
    field.style.borderBottomColor = "green";
    field.classList.remove("error");
  } else {
    field.style.borderBottomColor = "red";
    field.classList.add("error");
  }
}

function resetTheForm() {
  form.reset();

  sendBtn.disabled = true;
}
