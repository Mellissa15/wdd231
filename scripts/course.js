const courses = [
    { code: "WDD 130", name: "Web Fundamentals", credits: 1, completed: true },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, completed: true },
    { code: "WDD 231", name: "Front-End Frameworks", credits: 3, completed: false },
    { code: "CSE 110", name: "Programming Principles", credits: 2, completed: false }
];

const cardContainer = document.getElementById("courseCards");
const totalCreditsSpan = document.getElementById("totalCredits");

function renderCourses(filteredCourses) {
    cardContainer.innerHTML = "";
    let totalCredits = 0;

    filteredCourses.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("course-card");
        if (course.completed) div.classList.add("completed");

        div.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
    `;

        totalCredits += course.credits;
        cardContainer.appendChild(div);
    });

    totalCreditsSpan.textContent = totalCredits;
}

document.getElementById("allBtn").addEventListener("click", () => {
    renderCourses(courses);
});
document.getElementById("wddBtn").addEventListener("click", () => {
    renderCourses(courses.filter(c => c.code.startsWith("WDD")));
});
document.getElementById("cseBtn").addEventListener("click", () => {
    renderCourses(courses.filter(c => c.code.startsWith("CSE")));
});

renderCourses(courses); // Load all by default
