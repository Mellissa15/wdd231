// Load current year + last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Fetch and display members
const directory = document.getElementById("directory");

async function loadMembers() {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    directory.innerHTML = ""; // clear
    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo">
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
      <p class="membership">Membership Level: ${member.membership}</p>
    `;
        directory.appendChild(card);
    });
}

loadMembers();

// Toggle views
document.getElementById("grid-btn").addEventListener("click", () => {
    directory.classList.add("grid-view");
    directory.classList.remove("list-view");
});

document.getElementById("list-btn").addEventListener("click", () => {
    directory.classList.add("list-view");
    directory.classList.remove("grid-view");
});
