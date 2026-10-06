/* =====================================================
   ATIYAB WEB JOURNEY
   INTERACTIONS
===================================================== */


/* =====================================================
   WELCOME SCREEN
===================================================== */

const welcomeScreen =
    document.getElementById("welcomeScreen");

const mainWebsite =
    document.getElementById("mainWebsite");

const startButton =
    document.getElementById("startButton");


if (
    startButton &&
    welcomeScreen &&
    mainWebsite
) {

    startButton.addEventListener(
        "click",
        function () {

            welcomeScreen.classList.add(
                "hide"
            );


            setTimeout(
                function () {

                    mainWebsite.classList.remove(
                        "hidden"
                    );


                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                },
                400
            );

        }
    );

}


/* =====================================================
   THEME
===================================================== */

const themeButton =
    document.getElementById(
        "themeButton"
    );


const savedTheme =
    localStorage.getItem(
        "atiyab-web-theme"
    );


if (savedTheme === "light") {

    document.body.classList.add(
        "light"
    );


    if (themeButton) {

        themeButton.textContent =
            "☾";

        themeButton.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    }

}
else {

    if (themeButton) {

        themeButton.textContent =
            "☀";

        themeButton.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    }

}


/* =====================================================
   THEME BUTTON
===================================================== */

if (themeButton) {

    themeButton.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "light"
            );


            const isLight =
                document.body.classList.contains(
                    "light"
                );


            localStorage.setItem(
                "atiyab-web-theme",
                isLight
                    ? "light"
                    : "dark"
            );


            themeButton.textContent =
                isLight
                    ? "☾"
                    : "☀";


            themeButton.setAttribute(
                "aria-label",
                isLight
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            );

        }
    );

}


/* =====================================================
   SMOOTH NAVIGATION
===================================================== */

const navigationLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


navigationLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior:
                            "smooth",

                        block:
                            "start"
                    });

                }

            }
        );

    }
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".project-card, .practice-card, .explore-card"
    );


revealElements.forEach(
    function (element, index) {

        element.classList.add(
            "reveal"
        );


        element.style.transitionDelay =
            `${Math.min(index * 70, 350)}ms`;

    }
);


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    function (element) {

        observer.observe(
            element
        );

    }
);


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );


function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach(
        function (section) {

            const sectionTop =
                section.offsetTop -
                180;


            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                window.scrollY >=
                sectionTop &&

                window.scrollY <
                sectionBottom
            ) {

                currentSection =
                    section.getAttribute(
                        "id"
                    );

            }

        }
    );


    navItems.forEach(
        function (item) {

            const isActive =
                item.getAttribute(
                    "href"
                ) ===
                "#" + currentSection;


            item.classList.toggle(
                "active",
                isActive
            );

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


updateActiveNavigation();


/* =====================================================
   3D CARD TILT
===================================================== */

const tiltCards =
    document.querySelectorAll(
        ".project-card, .explore-card"
    );


tiltCards.forEach(
    function (card) {


        card.addEventListener(
            "mousemove",
            function (event) {


                if (
                    window.innerWidth <
                    800
                ) {

                    return;

                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    (
                        (x / rect.width) -
                        0.5
                    ) * 5;


                const rotateX =
                    (
                        (y / rect.height) -
                        0.5
                    ) * -5;


                card.style.transform =
                    `translateY(-10px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =====================================================
   INTERACTIVE CARD FEEDBACK
===================================================== */

const interactiveCards =
    document.querySelectorAll(
        ".project-card, .practice-card, .explore-card, .primary-button, .secondary-button"
    );


interactiveCards.forEach(
    function (element) {

        element.addEventListener(
            "mouseenter",
            function () {

                element.style.willChange =
                    "transform";

            }
        );


        element.addEventListener(
            "mouseleave",
            function () {

                element.style.willChange =
                    "auto";

            }
        );

    }
);


/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log(
    "%c✦ Welcome to Atiyab's Web Development Journey",
    "color:#5f7cff;font-weight:800;font-size:14px;"
);


console.log(
    "%c◆ Black. White. Royal Blue. Build. Learn. Repeat.",
    "color:#8ea3ff;font-weight:600;"
);