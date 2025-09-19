// Load current year + last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Get directory container
const directory = document.getElementById("directory");

// Fetch and display members
async function loadMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Network response was not ok");
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        directory.innerHTML = `<p>Sorry, we couldn’t load the members right now.</p>`;
        console.error("Fetch error:", error);
    }
}

// Display members in cards or list
function displayMembers(members) {
    directory.innerHTML = ""; // clear current content

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        // Set membership level class for color styling
        let membershipClass = "";
        switch (member.Membership.toLowerCase()) {
            case "gold":
                membershipClass = "gold-member";
                break;
            case "silver":
                membershipClass = "silver-member";
                break;
            default:
                membershipClass = "member";
        }

        card.innerHTML = `
      <img src="${member.logo}" alt="${member.Name} logo" loading="lazy">
      <h2>${member.Name}</h2>
      <p><strong>Industry:</strong> ${member.Industry}</p>
      <p><strong>Address:</strong> ${member["Physical Address"]}</p>
      <p><strong>Phone:</strong> ${member.Phone}</p>
      <p><strong>Representative:</strong> ${member.Representative}</p>
      <p><strong>Member Since:</strong> ${member.MemberSince}</p>
      <p class="membership ${membershipClass}">Membership Level: ${member.Membership}</p>
      <p><a href="${member.Website}" target="_blank" rel="noopener">Visit Website</a></p>
    `;

        directory.appendChild(card);
    });
}

// Initial load
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

