// O-Level and A-Level subjects data
const oLevelSubjects = [
    { name: "Mathematics", description: "Covers algebra, calculus, and statistics.", instructor: "mr. Jane Dang" },
    { name: "Physics", description: "Covers paper1, paper2, paper3.", instructor: "Mr. Alice Johnson" },
    { name: "Chemistry", description: "Covers paper1, paper2, paper3, paper4.", instructor: "Mr.Alex Waluga" },
    { name: "Entrepreneurship", description: "Has one paper", instructor: "Mrs.Barbrett" },
    { name: "Agriculture", description: "paper1, paper2, paper3", instructor: "MR. James" },
    { name: "Kiswahili", description: "paper1, paper2.", instructor: "Mr. paul Muzaale" },
    { name: "Literature", description: "Covers paper1, paper2.", instructor: "Mr. Anorld" },
    { name: "Fine-art", description: "paper1, paper6,.", instructor: "Mrs. Prossy Nabbona" },
    { name: "Chinese", description: "Covers mechanics, thermodynamics, and waves.", instructor: "Mrs. Winfred Isanga" },
    { name: "Physics", description: "Covers paper1, paper2, paper3.", instructor: "Madam Scovia" },
    { name: "Biology", description: "Covers paper1, paper2, paper3 .", instructor: "Dr. Sarah Smith" }
];

const aLevelSubjects = [
    { name: "Chemistry", description: "Covers organic, inorganic, and physical chemistry.", instructor: "Mr. Mike Brown" },
    { name: "Advanced Mathematics", description: "Covers Paper 1 and paper2 .", instructor: "Mr. Emily Stone" },
    { name: "Advanced Physics", description: "Covers paper1, paper2, paper3 and paper4.", instructor: "Mr. John Grace" },
    { name: "Entrepreneurship", description: "paper1 and paper 2.", instructor: "Mr. Isanga Joram" },
    { name: "Biology", description: "covers paper1 paper2 and paper3.", instructor: "Mrs. Mukyala Christine" },
    { name: "ICT", description: "covers paper1 and paper2.", instructor: "Dr.Scovia Nankya" },
    { name: "General Paper", description: "pper1.", instructor: "Mr. Allan Isabirye" },
    { name: "Geography", description: "paper1 and paper2.", instructor: "Mr.Ian Wafula" },
    { name: "Economics", description: "coverss paper1 and paper2.", instructor: "Madam Mary" }
];

// Function to toggle sections (Subjects / Teachers)
function showSection(section) {
    document.getElementById("subjects-section").style.display = (section === "subjects") ? "block" : "none";
    document.getElementById("teachers-section").style.display = (section === "teachers") ? "block" : "none";

    // Update button active state
    document.querySelectorAll("nav button").forEach(button => {
        button.classList.remove("active");
    });
    document.querySelector(`nav button[onclick="showSection('${section}')"]`).classList.add("active");
}

// Function to generate accordion items dynamically
function generateAccordion(subjects, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear existing content

    subjects.forEach(item => {
        const accordionItem = document.createElement("div");
        accordionItem.classList.add("accordion-item");

        accordionItem.innerHTML = `
            <button class="accordion-header">${item.name}</button>
            <div class="accordion-content">
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>Topics:</strong> ${item.topics}</p>
                <p><strong>Instructor:</strong> ${item.instructor}</p>
                <p><strong>Schedule:</strong> ${item.schedule}</p>
            </div>
        `;

        container.appendChild(accordionItem);
    });

    // Ensure that event listeners are attached correctly after the elements are created
    // event delegation is now used.
    attachAccordionListeners(containerId);
}

// Function to attach event listeners for accordion toggle
function attachAccordionListeners(containerId) {
    const container = document.getElementById(containerId);

    container.addEventListener('click', function (event) {
        if (event.target.classList.contains('accordion-header')) {
            const content = event.target.nextElementSibling;

            // Close other open accordions
            container.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.style.display = 'none';
                }
            });

            // Toggle the clicked accordion
            content.style.display = (content.style.display === 'block') ? 'none' : 'block';
        }
    });
}

// Function to generate the subjects-teachers table
function generateTable(subjects, tableId) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = ''; // Clear existing content

    subjects.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${item.name}</td><td>${item.instructor}</td>`;
        tableBody.appendChild(row);
    });
}

// Load content when page is ready
document.addEventListener("DOMContentLoaded", () => {
    generateAccordion(oLevelSubjects, "o-level-subjects");
    generateAccordion(aLevelSubjects, "a-level-subjects");
    generateTable(oLevelSubjects, "o-level-table");
    generateTable(aLevelSubjects, "a-level-table");

    // Set initial active button
    showSection('subjects');
});