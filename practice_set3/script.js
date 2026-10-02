
function checkEvenOdd() {

    let input = document.getElementById("numberInput");

    let number = Number(input.value);

    let result = document.getElementById("result");


    if (input.value === "") {

        result.innerHTML =
            "⚠️ Please enter a number.";

        return;
    }


    if (number % 2 === 0) {

        result.innerHTML =
            "🎉 " + number + " is an EVEN number!";

    } else {

        result.innerHTML =
            "✨ " + number + " is an ODD number!";

    }
}


/* =====================================
   QUESTION 2
   COLOR CHANGER
===================================== */

let colors = [
    "#7b2ff7",
    "#ff4b91",
    "#ff9f43",
    "#00b894",
    "#0984e3",
    "#e84393",
    "#6c5ce7"
];

let colorNames = [
    "Purple",
    "Pink",
    "Orange",
    "Green",
    "Blue",
    "Magenta",
    "Violet"
];

let colorIndex = 0;


function changeColor() {

    let button =
        document.getElementById("colorButton");

    let preview =
        document.getElementById("colorPreview");

    let colorName =
        document.getElementById("colorName");


    colorIndex++;

    if (colorIndex >= colors.length) {

        colorIndex = 0;

    }


    button.style.backgroundColor =
        colors[colorIndex];

    button.style.backgroundImage = "none";


    preview.style.backgroundColor =
        colors[colorIndex];


    colorName.innerHTML =
        "Current Color: " +
        colorNames[colorIndex];

}


/* =====================================
   QUESTION 3
   CALCULATOR
===================================== */

function calculate(operator) {

    let firstInput =
        document.getElementById("num1");

    let secondInput =
        document.getElementById("num2");

    let num1 =
        Number(firstInput.value);

    let num2 =
        Number(secondInput.value);

    let result =
        document.getElementById("calcResult");


    if (
        firstInput.value === "" ||
        secondInput.value === ""
    ) {

        result.innerHTML =
            "⚠️ Enter both numbers.";

        return;
    }


    let answer;


    if (operator === "+") {

        answer = num1 + num2;

    }

    else if (operator === "-") {

        answer = num1 - num2;

    }

    else if (operator === "*") {

        answer = num1 * num2;

    }

    else if (operator === "/") {

        if (num2 === 0) {

            result.innerHTML =
                "⚠️ Cannot divide by zero.";

            return;
        }

        answer = num1 / num2;

    }


    result.innerHTML =
        "✨ Result = " + answer;

}


/* =====================================
   QUESTION 4
   TODAY'S DATE
===================================== */

function displayDate() {

    let today = new Date();


    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];


    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    let day =
        days[today.getDay()];

    let date =
        today.getDate();

    let month =
        months[today.getMonth()];

    let year =
        today.getFullYear();


    let dayElement =
        document.getElementById("dayName");

    let dateElement =
        document.getElementById("dateNumber");

    let monthElement =
        document.getElementById("monthYear");


    if (dayElement) {

        dayElement.innerHTML = day;

        dateElement.innerHTML = date;

        monthElement.innerHTML =
            month + " " + year;

    }

}


/* Run date function */

displayDate();