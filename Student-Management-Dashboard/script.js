
let students =
    JSON.parse(
        localStorage.getItem("studentHubStudents")
    ) || [];


// ============================================
// SAVE DATA
// ============================================

function saveStudents() {

    localStorage.setItem(
        "studentHubStudents",
        JSON.stringify(students)
    );

}


// ============================================
// HTML ESCAPE
// ============================================

function escapeHTML(value) {

    const element =
        document.createElement("span");

    element.textContent = value;

    return element.innerHTML;
}


// ============================================
// STATISTICS
// ============================================

function calculateStatistics() {

    const total =
        students.length;


    const departments =
        new Set(
            students.map(
                student =>
                    student.department
            )
        );


    let average = 0;


    if (students.length > 0) {

        const totalCgpa =
            students.reduce(
                (sum, student) =>
                    sum +
                    Number(student.cgpa),

                0
            );


        average =
            totalCgpa /
            students.length;
    }


    return {

        total: total,

        departments:
            departments.size,

        average:
            average

    };

}


// ============================================
// HOME PAGE
// ============================================

function loadHomeStats() {

    const stats =
        calculateStatistics();


    const totalElement =
        document.getElementById(
            "homeStudentCount"
        );


    const departmentElement =
        document.getElementById(
            "homeDepartmentCount"
        );


    const cgpaElement =
        document.getElementById(
            "homeAverageCgpa"
        );


    if (totalElement) {

        animateNumber(
            totalElement,
            stats.total
        );
    }


    if (departmentElement) {

        animateNumber(
            departmentElement,
            stats.departments
        );
    }


    if (cgpaElement) {

        cgpaElement.textContent =
            stats.average.toFixed(2);
    }

}


// ============================================
// STUDENT PAGE
// ============================================

const studentForm =
    document.getElementById(
        "studentForm"
    );


if (studentForm) {

    initializeStudentPage();

}


function initializeStudentPage() {


    const studentName =
        document.getElementById(
            "studentName"
        );


    const rollNumber =
        document.getElementById(
            "rollNumber"
        );


    const department =
        document.getElementById(
            "department"
        );


    const semester =
        document.getElementById(
            "semester"
        );


    const cgpa =
        document.getElementById(
            "cgpa"
        );


    const email =
        document.getElementById(
            "email"
        );


    const tableBody =
        document.getElementById(
            "studentTableBody"
        );


    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const departmentFilter =
        document.getElementById(
            "departmentFilter"
        );


    const semesterFilter =
        document.getElementById(
            "semesterFilter"
        );


    const emptyState =
        document.getElementById(
            "emptyState"
        );


    const formTitle =
        document.getElementById(
            "formTitle"
        );


    const submitButton =
        document.getElementById(
            "submitButton"
        );


    const cancelButton =
        document.getElementById(
            "cancelButton"
        );


    let editingId = null;



    // ========================================
    // DISPLAY STUDENTS
    // ========================================

    function displayStudents() {

        tableBody.innerHTML = "";


        const search =
            searchInput.value
                .toLowerCase()
                .trim();


        const selectedDepartment =
            departmentFilter.value;


        const selectedSemester =
            semesterFilter.value;


        const filtered =
            students.filter(
                student => {


                    const matchesSearch =

                        student.name
                            .toLowerCase()
                            .includes(search)

                        ||

                        student.roll
                            .toLowerCase()
                            .includes(search);


                    const matchesDepartment =

                        selectedDepartment ===
                        "all"

                        ||

                        student.department ===
                        selectedDepartment;


                    const matchesSemester =

                        selectedSemester ===
                        "all"

                        ||

                        student.semester ===
                        selectedSemester;


                    return (
                        matchesSearch &&
                        matchesDepartment &&
                        matchesSemester
                    );

                }
            );


        emptyState.style.display =
            filtered.length === 0
                ? "block"
                : "none";


        filtered.forEach(
            student => {

                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `

                    <td>

                        <div class="student-name">

                            ${escapeHTML(
                                student.name
                            )}

                        </div>

                    </td>


                    <td>

                        <span class="roll-number">

                            ${escapeHTML(
                                student.roll
                            )}

                        </span>

                    </td>


                    <td>

                        <span class="department-badge">

                            ${escapeHTML(
                                student.department
                            )}

                        </span>

                    </td>


                    <td>
                        Semester
                        ${escapeHTML(
                            student.semester
                        )}
                    </td>


                    <td>

                        <span class="cgpa">

                            ${escapeHTML(
                                student.cgpa
                            )}

                        </span>

                    </td>


                    <td>

                        ${escapeHTML(
                            student.email
                        )}

                    </td>


                    <td>

                        <button
                            class="edit-btn"
                            data-edit="${student.id}"
                        >
                            Edit
                        </button>


                        <button
                            class="delete-btn"
                            data-delete="${student.id}"
                        >
                            Delete
                        </button>

                    </td>

                `;


                tableBody.appendChild(row);

            }
        );


        updateStudentStats();

    }



    // ========================================
    // ADD / EDIT
    // ========================================

    studentForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                studentName.value.trim();


            const roll =
                rollNumber.value.trim();


            const dept =
                department.value;


            const sem =
                semester.value;


            const studentCgpa =
                parseFloat(
                    cgpa.value
                );


            const studentEmail =
                email.value.trim();


            if (
                !name ||
                !roll ||
                !dept ||
                !sem ||
                !studentEmail
            ) {

                alert(
                    "Please fill all fields."
                );

                return;
            }


            if (
                studentCgpa < 0 ||
                studentCgpa > 10
            ) {

                alert(
                    "CGPA must be between 0 and 10."
                );

                return;
            }


            // EDIT

            if (editingId !== null) {

                students =
                    students.map(
                        student => {

                            if (
                                student.id ===
                                editingId
                            ) {

                                return {

                                    ...student,

                                    name:
                                        name,

                                    roll:
                                        roll,

                                    department:
                                        dept,

                                    semester:
                                        sem,

                                    cgpa:
                                        studentCgpa
                                            .toFixed(2),

                                    email:
                                        studentEmail

                                };

                            }


                            return student;

                        }
                    );


                alert(
                    "Student updated successfully! ✨"
                );

            }


            // ADD

            else {

                const newStudent = {

                    id:
                        Date.now()
                        .toString(),

                    name:
                        name,

                    roll:
                        roll,

                    department:
                        dept,

                    semester:
                        sem,

                    cgpa:
                        studentCgpa
                            .toFixed(2),

                    email:
                        studentEmail

                };


                students.push(
                    newStudent
                );


                alert(
                    "Student added successfully! 🎉"
                );

            }


            saveStudents();

            displayStudents();

            resetForm();

        }
    );



    // ========================================
    // TABLE BUTTONS
    // ========================================

    tableBody.addEventListener(
        "click",
        function(event) {


            const editId =
                event.target.dataset.edit;


            const deleteId =
                event.target.dataset.delete;


            if (editId) {

                editStudent(
                    editId
                );

            }


            if (deleteId) {

                deleteStudent(
                    deleteId
                );

            }

        }
    );



    // ========================================
    // EDIT
    // ========================================

    function editStudent(id) {

        const student =
            students.find(
                student =>
                    student.id === id
            );


        if (!student) {

            return;
        }


        studentName.value =
            student.name;


        rollNumber.value =
            student.roll;


        department.value =
            student.department;


        semester.value =
            student.semester;


        cgpa.value =
            student.cgpa;


        email.value =
            student.email;


        editingId =
            id;


        formTitle.textContent =
            "Edit Student";


        submitButton.textContent =
            "✓ Update Student";


        window.scrollTo({

            top:
                document
                    .querySelector(
                        ".glass-section"
                    )
                    .offsetTop - 100,

            behavior:
                "smooth"

        });

    }



    // ========================================
    // DELETE
    // ========================================

    function deleteStudent(id) {

        const student =
            students.find(
                student =>
                    student.id === id
            );


        if (!student) {

            return;
        }


        const confirmation =
            confirm(
                `Delete ${student.name}?`
            );


        if (!confirmation) {

            return;
        }


        students =
            students.filter(
                student =>
                    student.id !== id
            );


        saveStudents();

        displayStudents();


        alert(
            "Student deleted successfully."
        );

    }



    // ========================================
    // RESET FORM
    // ========================================

    function resetForm() {

        studentForm.reset();

        editingId = null;


        formTitle.textContent =
            "Add New Student";


        submitButton.textContent =
            "+ Add Student";

    }


    cancelButton.addEventListener(
        "click",
        resetForm
    );


    // ========================================
    // SEARCH
    // ========================================

    searchInput.addEventListener(
        "input",
        displayStudents
    );


    departmentFilter.addEventListener(
        "change",
        displayStudents
    );


    semesterFilter.addEventListener(
        "change",
        displayStudents
    );


    displayStudents();

}



// ============================================
// STUDENT STATISTICS
// ============================================

function updateStudentStats() {

    const stats =
        calculateStatistics();


    const total =
        document.getElementById(
            "totalStudents"
        );


    const departments =
        document.getElementById(
            "totalDepartments"
        );


    const average =
        document.getElementById(
            "averageCgpa"
        );


    const count =
        document.getElementById(
            "studentCount"
        );


    if (total) {

        total.textContent =
            stats.total;
    }


    if (departments) {

        departments.textContent =
            stats.departments;
    }


    if (average) {

        average.textContent =
            stats.average.toFixed(2);
    }


    if (count) {

        count.textContent =
            `${stats.total} Student${
                stats.total === 1
                    ? ""
                    : "s"
            }`;
    }

}


// ============================================
// ANALYTICS PAGE
// ============================================

const analyticsStudents =
    document.getElementById(
        "analyticsStudents"
    );


if (analyticsStudents) {

    loadAnalytics();

}


function loadAnalytics() {

    const stats =
        calculateStatistics();


    const departments =
        document.getElementById(
            "analyticsDepartments"
        );


    const cgpa =
        document.getElementById(
            "analyticsCgpa"
        );


    const performanceCgpa =
        document.getElementById(
            "performanceCgpa"
        );


    const progress =
        document.getElementById(
            "cgpaProgress"
        );


    animateNumber(
        analyticsStudents,
        stats.total
    );


    animateNumber(
        departments,
        stats.departments
    );


    cgpa.textContent =
        stats.average.toFixed(2);


    performanceCgpa.textContent =
        stats.average.toFixed(2);


    const percentage =
        (stats.average / 10) * 100;


    setTimeout(
        () => {

            progress.style.width =
                `${percentage}%`;

        },

        200
    );


    loadDepartmentAnalytics();

}



// ============================================
// DEPARTMENT ANALYTICS
// ============================================

function loadDepartmentAnalytics() {

    const container =
        document.getElementById(
            "departmentAnalytics"
        );


    if (!container) {

        return;
    }


    container.innerHTML = "";


    const departmentNames = [
        "ISE",
        "CSE",
        "ECE",
        "ME",
        "AIML"
    ];


    const counts = {};


    departmentNames.forEach(
        department => {

            counts[department] =
                students.filter(
                    student =>
                        student.department ===
                        department
                ).length;

        }
    );


    const max =
        Math.max(
            ...Object.values(counts),
            1
        );


    Object.entries(counts).forEach(
        ([department, count]) => {


            const percentage =
                (count / max) * 100;


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "department-row";


            row.innerHTML = `

                <div class="department-name">
                    ${department}
                </div>

                <div class="department-bar">

                    <div
                        style="width: ${percentage}%"
                    ></div>

                </div>

                <div class="department-number">
                    ${count}
                </div>

            `;


            container.appendChild(row);

        }
    );

}



// ============================================
// NUMBER ANIMATION
// ============================================

function animateNumber(
    element,
    target
) {

    if (!element) {

        return;
    }


    let current = 0;


    const duration = 700;


    const start =
        performance.now();


    function update(time) {

        const progress =
            Math.min(
                (time - start) /
                duration,
                1
            );


        current =
            Math.floor(
                progress * target
            );


        element.textContent =
            current;


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        }

    }


    requestAnimationFrame(
        update
    );

}



// ============================================
// 3D TILT EFFECT
// ============================================

document
    .querySelectorAll(".tilt-card")
    .forEach(card => {


        card.addEventListener(
            "mousemove",
            event => {


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                    centerY) *
                    -4;


                const rotateY =
                    ((x - centerX) /
                    centerX) *
                    4;


                card.style.transform =
                    `
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


// ============================================
// START HOME STATISTICS
// ============================================

loadHomeStats();