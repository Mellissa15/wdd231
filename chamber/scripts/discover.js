document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container");

    fetch("data/discover.json")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item, index) => {
                const card = document.createElement("section");
                card.classList.add("card");
                card.innerHTML = `
          <h2>${item.title}</h2>
          <figure>
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <figcaption>${item.title}</figcaption>
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
        `;
                cardContainer.appendChild(card);
            });
        });

    // Last visit message
    const visitMsg = document.getElementById("visitor-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
    let message = "";

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        message = days === 0
            ? "Back so soon! Awesome!"
            : `You last visited ${days} day${days > 1 ? "s" : ""} ago.`;
    }

    localStorage.setItem("lastVisit", now);
    visitMsg.textContent = message;

    // Last modified
    document.getElementById("last-modified").textContent =
        `Last Modified: ${document.lastModified}`;
});

