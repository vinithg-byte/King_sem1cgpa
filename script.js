const subjectContainer =
    document.getElementById("subjectContainer");

const addBtn =
    document.getElementById("addBtn");

const calculateBtn =
    document.getElementById("calculateBtn");

const resetBtn =
    document.getElementById("resetBtn");

const cgpaDisplay =
    document.getElementById("cgpa");

const gradeMessage =
    document.getElementById("gradeMessage");


/* -----------------------------
   DEFAULT SEMESTER 1 SUBJECTS
------------------------------ */

const defaultSubjects = [

    {
        name: "Tamil",
        credit: 1,
        grade: 8
    },

    {
        name: "English",
        credit: 2,
        grade: 8
    },

    {
        name: "Maths",
        credit: 4,
        grade: 8
    },

    {
        name: "Physics",
        credit: 3,
        grade: 9
    },

    {
        name: "Chemistry",
        credit: 3,
        grade: 9
    },

    {
        name: "Python",
        credit: 3,
        grade: 8
    },

    {
        name: "Lab 1",
        credit: 2,
        grade: 10
    },

    {
        name: "Lab 2",
        credit: 2,
        grade: 10
    },

    {
        name: "Lab 3",
        credit: 2,
        grade: 9
    }

];


/* -----------------------------
   CREATE SUBJECT ROW
------------------------------ */

function createRow(subject = null){

    const row =
        document.createElement("div");

    row.classList.add("subject-row");

    row.innerHTML = `

        <input
            type="text"
            placeholder="Subject Name"
            value="${subject ? subject.name : ""}"
        >

        <input
            type="number"
            placeholder="Credits"
            min="1"
            max="10"
            value="${subject ? subject.credit : ""}"
        >

        <select>

            <option value="">
                Select Grade
            </option>

            <option value="10"
                ${subject && subject.grade == 10
                    ? "selected" : ""}
            >
                O
            </option>

            <option value="9"
                ${subject && subject.grade == 9
                    ? "selected" : ""}
            >
                A+
            </option>

            <option value="8"
                ${subject && subject.grade == 8
                    ? "selected" : ""}
            >
                A
            </option>

            <option value="7"
                ${subject && subject.grade == 7
                    ? "selected" : ""}
            >
                B+
            </option>

            <option value="6"
                ${subject && subject.grade == 6
                    ? "selected" : ""}
            >
                B
            </option>

            <option value="5"
                ${subject && subject.grade == 5
                    ? "selected" : ""}
            >
                C
            </option>

            <option value="0"
                ${subject && subject.grade == 0
                    ? "selected" : ""}
            >
                RA
            </option>

        </select>

        <button class="delete-btn">
            Delete
        </button>
    `;

    const deleteBtn =
        row.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {

        row.remove();

        calculateCGPA();

    });

    subjectContainer.appendChild(row);

}


/* -----------------------------
   LOAD DEFAULT SUBJECTS
------------------------------ */

function loadDefaultSubjects(){

    subjectContainer.innerHTML = "";

    defaultSubjects.forEach(subject => {

        createRow(subject);

    });

}


/* -----------------------------
   ADD NEW EMPTY SUBJECT
------------------------------ */

function addSubject(){

    createRow();

}


/* -----------------------------
   CALCULATE CGPA
------------------------------ */

function calculateCGPA(){

    const rows =
        document.querySelectorAll(".subject-row");

    let totalCredits = 0;

    let totalPoints = 0;

    let validSubjects = 0;

    rows.forEach(row => {

        const subjectName =
            row.children[0].value.trim();

        const credits =
            parseFloat(row.children[1].value);

        const grade =
            parseFloat(row.children[2].value);

        /* VALIDATION */

        if(
            subjectName !== "" &&
            !isNaN(credits) &&
            !isNaN(grade)
        ){

            totalCredits += credits;

            totalPoints +=
                credits * grade;

            validSubjects++;

        }

    });


    /* NO VALID SUBJECTS */

    if(validSubjects === 0){

        cgpaDisplay.innerText = "0.00";

        gradeMessage.innerText =
            "Please enter valid subject details";

        return;

    }


    /* CALCULATE */

    let cgpa =
        totalPoints / totalCredits;

    cgpa = cgpa.toFixed(2);

    cgpaDisplay.innerText = cgpa;


    /* PERFORMANCE MESSAGE */

    if(cgpa >= 9){

        gradeMessage.innerText =
            "Outstanding Performance";

    }

    else if(cgpa >= 8){

        gradeMessage.innerText =
            "Excellent Performance";

    }

    else if(cgpa >= 7){

        gradeMessage.innerText =
            "Very Good Performance";

    }

    else if(cgpa >= 6){

        gradeMessage.innerText =
            "Good Performance";

    }

    else if(cgpa >= 5){

        gradeMessage.innerText =
            "Average Performance";

    }

    else{

        gradeMessage.innerText =
            "Need Improvement";

    }

}


/* -----------------------------
   RESET CALCULATOR
------------------------------ */

function resetCalculator(){

    loadDefaultSubjects();

    cgpaDisplay.innerText = "0.00";

    gradeMessage.innerText = "";

}


/* -----------------------------
   BUTTON EVENTS
------------------------------ */

addBtn.addEventListener(
    "click",
    addSubject
);

calculateBtn.addEventListener(
    "click",
    calculateCGPA
);

resetBtn.addEventListener(
    "click",
    resetCalculator
);


/* -----------------------------
   INITIAL LOAD
------------------------------ */

loadDefaultSubjects();