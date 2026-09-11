
// FastAPI URL
const API_URL = "https://student-management-backend-v4v1.onrender.com";


// ============================================================
// 1. ADD STUDENT
// ============================================================

async function addStudent() {

    const name = document.getElementById("name").value;
    const course = document.getElementById("course").value;
    const marks = document.getElementById("marks").value;

    if (!name || !course || !marks) {
        alert("Please enter all student details");
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/students?name=${encodeURIComponent(name)}&course=${encodeURIComponent(course)}&marks=${marks}`,
            {
                method: "POST"
            }
        );

        const data = await response.json();

        alert(data.message);

        if (response.ok) {
            document.getElementById("name").value = "";
            document.getElementById("course").value = "";
            document.getElementById("marks").value = "";

            getAllStudents();
        }

    } catch (error) {

        alert("Cannot connect to FastAPI");

        console.error(error);
    }
}


// ============================================================
// 2. GET ALL STUDENTS
// ============================================================

async function getAllStudents() {

    try {

        const response = await fetch(`${API_URL}/students`);

        const data = await response.json();

        const studentList = document.getElementById("studentList");

        studentList.innerHTML = "";

        if (!data.data) {
            studentList.innerHTML = "<p>No students found</p>";
            return;
        }

        data.data.forEach(student => {

            studentList.innerHTML += `
                <div class="student">

                    <p><strong>ID:</strong> ${student.id}</p>

                    <p><strong>Name:</strong> ${student.name}</p>

                    <p><strong>Course:</strong> ${student.course}</p>

                    <p><strong>Marks:</strong> ${student.marks}</p>

                </div>
            `;

        });

    } catch (error) {

        alert("Cannot connect to FastAPI");

        console.error(error);
    }
}


// ============================================================
// 3. SEARCH / GET ONE STUDENT
// ============================================================

async function searchStudent() {

    const id = document.getElementById("searchId").value;

    if (!id) {
        alert("Please enter Student ID");
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/students/${id}`
        );

        const data = await response.json();

        const result = document.getElementById("searchResult");

        result.innerHTML = "";

        if (!data.data) {

            result.innerHTML = `<p>${data.message}</p>`;

            return;
        }

        const student = data.data[0];

        result.innerHTML = `
            <div class="student">

                <p><strong>ID:</strong> ${student.id}</p>

                <p><strong>Name:</strong> ${student.name}</p>

                <p><strong>Course:</strong> ${student.course}</p>

                <p><strong>Marks:</strong> ${student.marks}</p>

            </div>
        `;

    } catch (error) {

        alert("Cannot connect to FastAPI");

        console.error(error);
    }
}


// ============================================================
// 4. UPDATE STUDENT
// ============================================================

async function updateStudent() {

    const id = document.getElementById("updateId").value;
    const name = document.getElementById("updateName").value;
    const course = document.getElementById("updateCourse").value;
    const marks = document.getElementById("updateMarks").value;

    if (!id || !name || !course || !marks) {

        alert("Please enter all details");

        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/students/${id}?name=${encodeURIComponent(name)}&course=${encodeURIComponent(course)}&marks=${marks}`,
            {
                method: "PUT"
            }
        );

        const data = await response.json();

        alert(data.message);

        if (response.ok) {

            document.getElementById("updateId").value = "";
            document.getElementById("updateName").value = "";
            document.getElementById("updateCourse").value = "";
            document.getElementById("updateMarks").value = "";

            getAllStudents();
        }

    } catch (error) {

        alert("Cannot connect to FastAPI");

        console.error(error);
    }
}


// ============================================================
// 5. DELETE STUDENT
// ============================================================

async function deleteStudent() {

    const id = document.getElementById("deleteId").value;

    if (!id) {

        alert("Please enter Student ID");

        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/students/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        alert(data.message);

        if (response.ok) {

            document.getElementById("deleteId").value = "";

            getAllStudents();
        }

    } catch (error) {

        alert("Cannot connect to FastAPI");

        console.error(error);
    }
}

