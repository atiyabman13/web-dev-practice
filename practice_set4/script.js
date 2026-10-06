const nameForm =
    document.getElementById("nameForm");

const nameInput =
    document.getElementById("nameInput");

const nameResult =
    document.getElementById("nameResult");

const clearName =
    document.getElementById("clearName");

const checkStorage =
    document.getElementById("checkStorage");

const storageMessage =
    document.getElementById("storageMessage");



/* Function to display saved name */

const displayName = (name) => {

    nameResult.className =
        "result-box green-result";

    nameResult.innerHTML = `

        <div class="result-icon">
            ✦
        </div>

        <div>

            <strong>
                Hey, ${escapeHTML(name)}! 👋
            </strong>

            <p>
                Your name is saved in localStorage.
            </p>

        </div>

    `;
};



/* Prevent HTML injection */

const escapeHTML = (value) => {

    const element =
        document.createElement("span");

    element.textContent =
        value;

    return element.innerHTML;
};



/* Check whether a name was already saved */

const savedName =
    localStorage.getItem(
        "divyaJSPageUserName"
    );


if (savedName) {

    nameInput.value =
        savedName;

    displayName(
        savedName
    );
}



/* Save name */

nameForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const name =
            nameInput.value.trim();


        if (!name) {

            nameResult.className =
                "result-box red-result";

            nameResult.innerHTML = `

                <div class="result-icon">
                    !
                </div>

                <div>

                    <strong>
                        Please enter your name.
                    </strong>

                    <p>
                        Type something before saving.
                    </p>

                </div>

            `;

            nameInput.focus();

            return;
        }


        localStorage.setItem(
            "divyaJSPageUserName",
            name
        );


        displayName(name);


        storageMessage.textContent =
            "Saved successfully! Refresh the page to test localStorage.";

    }
);



/* Clear saved name */

clearName.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "divyaJSPageUserName"
        );


        nameInput.value = "";


        nameResult.className =
            "result-box neutral-result";


        nameResult.innerHTML = `

            <div class="result-icon">
                ◎
            </div>

            <div>

                <strong>
                    Name cleared
                </strong>

                <p>
                    Your saved name has been removed.
                </p>

            </div>

        `;


        storageMessage.textContent =
            "";

    }
);



/* Check localStorage */

checkStorage.addEventListener(
    "click",
    () => {

        const value =
            localStorage.getItem(
                "divyaJSPageUserName"
            );


        if (value) {

            storageMessage.textContent =
                `localStorage value: "${value}"`;

        } else {

            storageMessage.textContent =
                "No name is saved right now.";

        }

    }
);



/* =========================================
   2. JSON + API FETCH
========================================= */

const quoteButton =
    document.getElementById(
        "quoteButton"
    );

const quoteText =
    document.getElementById(
        "quoteText"
    );

const quoteAuthor =
    document.getElementById(
        "quoteAuthor"
    );

const quoteStatus =
    document.getElementById(
        "quoteStatus"
    );



/* Fetch quote */

const getQuote = async () => {

    quoteButton.disabled =
        true;

    quoteButton.textContent =
        "↻ Fetching quote...";

    quoteStatus.textContent =
        "Connecting to the API...";


    try {

        const response =
            await fetch(
                "https://dummyjson.com/quotes/random"
            );


        if (!response.ok) {

            throw new Error(
                "API request failed"
            );

        }


        /*
            Convert JSON response
            into a JavaScript object.
        */

        const data =
            await response.json();


        /*
            Display JSON data
        */

        quoteText.textContent =
            data.quote;

        quoteAuthor.textContent =
            `— ${data.author}`;


        quoteStatus.textContent =
            "Quote fetched successfully from the API.";

    }


    catch (error) {

        console.error(
            "API Error:",
            error
        );


        quoteStatus.textContent =
            "Unable to fetch quote. Check your internet connection.";

    }


    finally {

        quoteButton.disabled =
            false;

        quoteButton.textContent =
            "↻  Get Fresh Quote";

    }

};



quoteButton.addEventListener(
    "click",
    getQuote
);



/* =========================================
   3. FORM VALIDATION
   Validate email using JavaScript
========================================= */

const emailForm =
    document.getElementById(
        "emailForm"
    );

const emailInput =
    document.getElementById(
        "emailInput"
    );

const emailResult =
    document.getElementById(
        "emailResult"
    );



emailForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const email =
            emailInput.value.trim();


        /*
            Email validation pattern
        */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        if (
            emailPattern.test(email)
        ) {

            emailResult.className =
                "result-box green-result";


            emailResult.innerHTML = `

                <div class="result-icon">
                    ✓
                </div>

                <div>

                    <strong>
                        Valid email address!
                    </strong>

                    <p>
                        Format accepted for
                        ${escapeHTML(email)}
                    </p>

                </div>

            `;

        }


        else {

            emailResult.className =
                "result-box red-result";


            emailResult.innerHTML = `

                <div class="result-icon">
                    !
                </div>

                <div>

                    <strong>
                        Invalid email address
                    </strong>

                    <p>
                        Please use a format like
                        name@example.com
                    </p>

                </div>

            `;


            emailInput.focus();

        }

    }
);



/* =========================================
   4. ES6 ARROW FUNCTIONS
   Filter numbers greater than 50
========================================= */

const numberForm =
    document.getElementById(
        "numberForm"
    );

const numberInput =
    document.getElementById(
        "numberInput"
    );

const numberOutput =
    document.getElementById(
        "numberOutput"
    );

const numberMessage =
    document.getElementById(
        "numberMessage"
    );



numberForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const input =
            numberInput.value.trim();


        if (!input) {

            numberOutput.innerHTML =
                "<span>No numbers entered.</span>";

            return;

        }


        /*
            Convert input into an array.
        */

        const parts =
            input
                .split(",")
                .map(
                    (item) =>
                        item.trim()
                );


        /*
            Convert strings into numbers.
        */

        const numbers =
            parts.map(
                Number
            );


        /*
            Check invalid values.
        */

        const invalid =
            numbers.some(
                (number) =>
                    !Number.isFinite(number)
            );


        if (invalid) {

            numberOutput.innerHTML =
                "<span>Please enter only numbers separated by commas.</span>";

            numberMessage.textContent =
                "Example: 12, 56, 78, 34, 99";

            return;

        }


        /*
            ES6 ARROW FUNCTION

            Keep only numbers
            greater than 50.
        */

        const filteredNumbers =
            numbers.filter(
                (number) =>
                    number > 50
            );


        if (
            filteredNumbers.length === 0
        ) {

            numberOutput.innerHTML =
                "<span>No numbers greater than 50.</span>";

            numberMessage.textContent =
                "Try entering a number greater than 50.";

            return;

        }


        /*
            Display filtered numbers.
        */

        numberOutput.innerHTML =
            filteredNumbers
                .map(
                    (number) => `

                        <span class="number-chip">
                            ${number}
                        </span>

                    `
                )
                .join("");


        numberMessage.textContent =
            `Found ${filteredNumbers.length} number(s) greater than 50.`;

    }
);