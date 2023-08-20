//INPUTS
const input_year = document.getElementById("year");
const input_month = document.getElementById("month");
const input_day = document.getElementById("day");


//OUTPUTS
const output_year = document.getElementById("YY");
const output_month = document.getElementById("MM");
const output_day = document.getElementById("DD");

//FORM
const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);

const date = new Date();
let day = date.getDate();
let month = 1 + date.getMonth();
let year = date.getFullYear();

const months = [31, 28 , 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function validate() {
  const inputs = document.querySelectorAll("input");
  let validator = true;
  let hasInvalidInput = false;
  
  inputs.forEach((i) => {
      const parent = i.parentElement;
      
      if (!i.value) {
          i.style.borderColor = "red";
          parent.querySelector("label").style.color = "red";
          parent.querySelector("small").innerText = "This field is required.";
          validator = false;
          hasInvalidInput = true;
      } else if (i === input_year && (parseInt(i.value) > year || parseInt(i.value) < 0)) {
          i.style.borderColor = "red";
          parent.querySelector("label").style.color = "red";
          parent.querySelector("small").innerText = "Year cannot be in the future or negative.";
          validator = false;
      } else if (input_month.value > 12 || input_month.value <= 0) {
          input_month.style.borderColor = "red";
          input_month.parentElement.querySelector("label").style.color = "red";
          input_month.parentElement.querySelector("small").innerText = "Month must be between 1 and 12.";
          validator = false;
      } else if (input_day.value > 31 || input_day.value <= 0) {
          input_day.style.borderColor = "red";
          input_day.parentElement.querySelector("label").style.color = "red";
          input_day.parentElement.querySelector("small").innerText = "Day must be between 1 and 31.";
          validator = false;
      } else if (input_month.value === "2" && input_day.value > 28) {
          // Check for February and limit day to 28
          input_day.style.borderColor = "red";
          input_day.parentElement.querySelector("label").style.color = "red";
          input_day.parentElement.querySelector("small").innerText = "February has 28 days.";
          validator = false;
      } else if (input_month.value === "4" || input_month.value === "6" || input_month.value === "9" || input_month.value === "11") {
          // Check for months with 30 days and limit day to 30
          if (input_day.value > 30) {
              input_day.style.borderColor = "red";
              input_day.parentElement.querySelector("label").style.color = "red";
              input_day.parentElement.querySelector("small").innerText = "This month has 30 days.";
              validator = false;
          }
      } else {
          i.style.borderColor = "black";
          parent.querySelector("small").innerText = "";
      }
  });
  
  if (hasInvalidInput) {
    inputs.forEach((i) => {
      if (!i.value) {
        const parent = i.parentElement;
        parent.querySelector("label").style.color = "red"; 
      }
    });
  }

  return validator && !hasInvalidInput;
}


function handleSubmit(e) {
  e.preventDefault();
  if (validate()) {
    if (input_day.value > day) {
      day = day + months[month-1];
      month = month - 1;
    }
    if (input_month.value > month) {
      month = month + 12;
      year = year - 1;
    }

    const d = day - input_day.value;
    const m = month - input_month.value;
    const y = year - input_year.value;

    output_day.innerHTML =d;
    output_month.innerHTML =m;
    output_year.innerHTML =y;

    localStorage.setItem("calculatedAgeYears", y);
    localStorage.setItem("calculatedAgeMonths", m);
    localStorage.setItem("calculatedAgeDays", d);


  }
}
