document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('events-container');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let allEvents = [];

    fetch('project.json')
        .then(res => res.json())
        .then(data => {
            allEvents = data;
            displayEvents(allEvents);
        })
        .catch(() => {
            container.innerHTML = "<p>Could not load events.</p>";
        });

    function displayEvents(events) {
        if (!container) return;
        container.innerHTML = '';
        events.forEach(event => {
            const card = document.createElement('div');
            card.className = 'event-card';
            card.innerHTML = `
        <h3>${event.title}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p>${event.description}</p>
      `;
            container.appendChild(card);
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            const filtered = filter === 'all' ? allEvents : allEvents.filter(e => e.category === filter);
            displayEvents(filtered);
        });
    });
});
