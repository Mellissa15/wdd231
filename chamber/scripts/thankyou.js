// Function to extract query string values
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || '';
}

// Populate fields on page load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('firstName').textContent = getQueryParam('firstName');
    document.getElementById('lastName').textContent = getQueryParam('lastName');
    document.getElementById('email').textContent = getQueryParam('email');
    document.getElementById('phone').textContent = getQueryParam('phone');
    document.getElementById('organization').textContent = getQueryParam('organization');
    document.getElementById('timestamp').textContent = formatDate(getQueryParam('timestamp'));
});

// Format ISO date string to readable format
function formatDate(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString();
}
