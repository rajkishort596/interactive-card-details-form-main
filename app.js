//selecting card details to display
const cardHolderName = document.querySelector(".card-holder-name");
const cardNumber = document.querySelector(".card-number");
const cardExpiry = document.querySelector(".card-expiry-value");
const cardCVC = document.querySelector(".card-cvc");
//selecting all errors

const nameError = document.querySelector(".name-error");
const cardNumberError = document.querySelector(".card-number-error");
const expiryError = document.querySelector(".expiry-error");
const CVCError = document.querySelector(".cvc-error");
const submitError = document.querySelector(".submit-error");

//selecting input of card details
const holderNameInput = document.getElementById("holder-name");
const expiryInput = document.querySelectorAll(".expiry");
const cardNumberInput = document.getElementById("card-number");
const cvcInput = document.getElementById("card-cvc");
//Error and correct border
const errorBorder = "2px solid  hsl(0, 100%, 66%)";
const correctBorder = "2px solid  hsl(249, 99%, 64%)";

//-------------------Validate name---------------------------------------
const validateName = () => {
  let name = holderNameInput.value;
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (name.length < 3) {
    nameError.textContent = "Too Sort Name";
    nameError.style.visibility = "visible";
    holderNameInput.style.border = errorBorder;
    return false;
  } else if (!nameRegex.test(name)) {
    nameError.textContent = "Letters only";
    nameError.style.visibility = "visible";
    holderNameInput.style.border = errorBorder;
    return false;
  } else {
    cardHolderName.textContent = holderNameInput.value;
    nameError.style.visibility = "hidden";
    holderNameInput.style.border = correctBorder;
    return true;
  }
};
holderNameInput.addEventListener("input", validateName);
//----------------validate card number-----------------------------------
const validateCardNumber = () => {
  let numberRegex = /^[0-9]+$/;
  let number = cardNumberInput.value.replace(/\s/g, ""); // Remove existing spaces

  if (number == "") {
    cardNumber.textContent = number;
    cardNumberError.textContent = "can't be blank";
    cardNumberError.style.visibility = "visible";
    cardNumberInput.style.border = errorBorder;
    return false;
  } else if (!numberRegex.test(number)) {
    cardNumberError.textContent = "Wrong format, numbers only";
    cardNumberError.style.visibility = "visible";
    cardNumberInput.style.border = errorBorder;
    return false;
  } else if (number.length > 16) {
    cardNumberError.textContent = "can't be more than 16";
    cardNumberError.style.visibility = "visible";
    cardNumberInput.style.border = errorBorder;
    return false;
  } else {
    // Use replace with regex to add a space after every 4 digits
    let formattedNumber = number.replace(/(\d{4})/g, "$1 ").trim();

    // Update the input field value with the formatted number
    cardNumberInput.value = formattedNumber;

    // Update the displayed card number
    cardNumber.textContent = formattedNumber;

    cardNumberError.style.visibility = "hidden";
    cardNumberInput.style.border = correctBorder;
    return true;
  }
};
cardNumberInput.addEventListener("input", validateCardNumber);

//------------------------validate expiry month----------------------------------
const validateExpiryMonth = () => {
  let expiry = expiryInput[0].value;
  if (expiry == "") {
    expiryError.textContent = "Can't be blank";
    expiryError.style.visibility = "visible";
    expiryInput[0].style.border = errorBorder;
    return false;
  } else if (expiry > 12 || expiry < 1) {
    expiryError.textContent = "enter valid month";
    expiryError.style.visibility = "visible";
    expiryInput[0].style.border = errorBorder;
    return false;
  } else if (isNaN(expiry)) {
    expiryError.textContent = "digits only";
    expiryError.style.visibility = "visible";
    expiryInput[0].style.border = errorBorder;
    return false;
  } else {
    cardExpiry.textContent = expiryInput[0].value + "/" + expiryInput[1].value;
    expiryError.style.visibility = "hidden";
    expiryInput[0].style.border = correctBorder;
    return true;
  }
};
expiryInput[0].addEventListener("input", validateExpiryMonth);
//----------------------validate expiry year----------------------------------------
const date = new Date();
let currentYear = date.getFullYear();
currentYear = currentYear.toString();
currentYear = currentYear.substring(2, 4);
currentYear = parseInt(currentYear, 10);
const validatExpiryYear = () => {
  let expiry = expiryInput[1].value;
  if (expiry == "") {
    expiryError.textContent = "Can't be blank";
    expiryError.style.visibility = "visible";
    expiryInput[1].style.border = errorBorder;
    return false;
  } else if (expiry > currentYear + 5 || expiry < currentYear) {
    expiryError.textContent = "enter valid year";
    expiryError.style.visibility = "visible";
    expiryInput[1].style.border = errorBorder;
    return false;
  } else if (isNaN(expiry)) {
    expiryError.textContent = "digits only";
    expiryError.style.visibility = "visible";
    expiryInput[1].style.border = errorBorder;
    return false;
  } else {
    cardExpiry.textContent = expiryInput[0].value + "/" + expiryInput[1].value;
    expiryError.style.visibility = "hidden";
    expiryInput[1].style.border = correctBorder;
    return true;
  }
};
expiryInput[1].addEventListener("input", validatExpiryYear);

//--------------------validating cvc error--------------------------------
const validateCVC = () => {
  let cvc = cvcInput.value.trim();
  cardCVC.textContent = cvc;
  if (cvc == "") {
    CVCError.textContent = "Can't be blank";
    CVCError.style.visibility = "visible";
    cvcInput.style.border = errorBorder;
    return false;
  } else if (isNaN(cvc)) {
    CVCError.textContent = "digits only";
    CVCError.style.visibility = "visible";
    cvcInput.style.border = errorBorder;
    return false;
  } else if (cvc.length != 3) {
    CVCError.textContent = "must be 3 digits";
    CVCError.style.visibility = "visible";
    cvcInput.style.border = errorBorder;
    return false;
  } else {
    CVCError.style.visibility = "hidden";
    cvcInput.style.border = correctBorder;
    return true;
  }
};
//when  entire form is empty
const setFormError = () => {
  console.log(submitError);
};
//selecting complete state
const completeState = document.querySelector(".complete-state");
//selecting my form
const myForm = document.querySelector("#myform");
cvcInput.addEventListener("input", validateCVC);
const validateForm = (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();
  if (
    holderNameInput.value.trim() === "" &&
    cardNumberInput.value.trim() === "" &&
    expiryInput[0].value.trim() === "" &&
    expiryInput[1].value.trim() === "" &&
    cvcInput.value.trim() === ""
  ) {
    submitError.textContent = "please fill this form";
    submitError.style.visibility = "visible";
    // Hide the error after 2 seconds
    setTimeout(() => {
      submitError.style.visibility = "hidden";
    }, 2000);
    return false;
  }
  if (
    validateName() &&
    validateCardNumber() &&
    validateExpiryMonth() &&
    validatExpiryYear() &&
    validateCVC()
  ) {
    myForm.style.display = "none";
    completeState.style.display = "flex";
    return true;
  } else {
    myForm.style.display = "block";
    completeState.style.display = "none";
    return false;
  }
};
// Attach the validateForm function to the form's submit event
myForm.addEventListener("submit", validateForm);
