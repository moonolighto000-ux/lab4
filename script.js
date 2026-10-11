document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const eventCards = document.querySelectorAll(".event-card");
  const selectedEventInput = document.getElementById("selectedEventInput");
  const selectedEventError = document.getElementById("selectedEventError");
  
  const form = document.getElementById("registrationForm");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const studentGroupInput = document.getElementById("studentGroup");
  const agreementCheckbox = document.getElementById("agreement");
  
  const charCountSpan = document.getElementById("charCount");
  const resultContainer = document.getElementById("resultContainer");

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
      themeToggleBtn.textContent = "Light Theme";
    } else {
      themeToggleBtn.textContent = "Dark Theme";
    }
  });

  eventCards.forEach(card => {
    const selectBtn = card.querySelector(".select-btn");
    selectBtn.addEventListener("click", () => {
      eventCards.forEach(c => c.classList.remove("selected-event"));
      
      card.classList.add("selected-event");
      
      const eventName = card.getAttribute("data-event-name");
      const eventTime = card.getAttribute("data-event-time");
      selectedEventInput.value = `${eventName} (${eventTime})`;
      
      selectedEventError.classList.remove("visible");
    });
  });

  fullNameInput.addEventListener("input", () => {
    charCountSpan.textContent = fullNameInput.value.length;
    if (fullNameInput.value.trim().length >= 3) {
      clearError(fullNameInput, "nameError");
    }
  });

  emailInput.addEventListener("input", () => {
    if (validateEmail(emailInput.value)) {
      clearError(emailInput, "emailError");
    }
  });

  studentGroupInput.addEventListener("input", () => {
    if (studentGroupInput.value.trim() !== "") {
      clearError(studentGroupInput, "groupError");
    }
  });

  agreementCheckbox.addEventListener("change", () => {
    if (agreementCheckbox.checked) {
      document.getElementById("agreementError").classList.remove("visible");
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    if (!selectedEventInput.value) {
      selectedEventError.classList.add("visible");
      isValid = false;
    } else {
      selectedEventError.classList.remove("visible");
    }

    if (fullNameInput.value.trim().length < 3) {
      showError(fullNameInput, "nameError");
      isValid = false;
    } else {
      clearError(fullNameInput, "nameError");
    }

    if (!validateEmail(emailInput.value)) {
      showError(emailInput, "emailError");
      isValid = false;
    } else {
      clearError(emailInput, "emailError");
    }

    if (studentGroupInput.value.trim() === "") {
      showError(studentGroupInput, "groupError");
      isValid = false;
    } else {
      clearError(studentGroupInput, "groupError");
    }

    if (!agreementCheckbox.checked) {
      document.getElementById("agreementError").classList.add("visible");
      isValid = false;
    } else {
      document.getElementById("agreementError").classList.remove("visible");
    }

    if (isValid) {
      createSuccessResult({
        name: fullNameInput.value.trim(),
        email: emailInput.value.trim(),
        group: studentGroupInput.value.trim(),
        event: selectedEventInput.value
      });

      form.reset();
      charCountSpan.textContent = "0";
      eventCards.forEach(c => c.classList.remove("selected-event"));
      selectedEventInput.value = "";
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showError(inputElement, errorId) {
    inputElement.classList.add("input-error");
    document.getElementById(errorId).classList.add("visible");
  }

  function clearError(inputElement, errorId) {
    inputElement.classList.remove("input-error");
    document.getElementById(errorId).classList.remove("visible");
  }

  function createSuccessResult(data) {
    if (resultContainer.classList.contains("empty-state")) {
      resultContainer.innerHTML = "";
      resultContainer.classList.remove("empty-state");
    }

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("success-item");

    const title = document.createElement("h4");
    title.textContent = `Registration Confirmed: ${data.event}`;

    const pName = document.createElement("p");
    pName.innerHTML = `<strong>Name:</strong> ${data.name}`;

    const pEmail = document.createElement("p");
    pEmail.innerHTML = `<strong>Email:</strong> ${data.email}`;

    const pGroup = document.createElement("p");
    pGroup.innerHTML = `<strong>Group:</strong> ${data.group}`;

    itemDiv.appendChild(title);
    itemDiv.appendChild(pName);
    itemDiv.appendChild(pEmail);
    itemDiv.appendChild(pGroup);

    resultContainer.prepend(itemDiv);
  }
});