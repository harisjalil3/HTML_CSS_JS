// Function to toggle the stylesheet
function toggleStylesheet() {
    const stylesheet = document.getElementById('theme-stylesheet');
    if (stylesheet.getAttribute('href') === 'css/pro.css') {
        stylesheet.setAttribute('href', 'css/neon.css');
        return 'neon'; // Return the current theme
    } else {
        stylesheet.setAttribute('href', 'css/pro.css');
        return 'pro'; // Return the current theme
    }
}

// Function to update the toggle button's style based on the submit button
function updateToggleButton(theme) {
    const toggleButton = document.getElementById('toggle-btn');
    const submitButton = document.getElementById('submit-btn'); // Assuming the submit button has this ID

    // Copy styles from the submit button to the toggle button
    toggleButton.style.backgroundColor = window.getComputedStyle(submitButton).backgroundColor;
    toggleButton.style.color = window.getComputedStyle(submitButton).color;
    toggleButton.style.border = window.getComputedStyle(submitButton).border;

    // Update the toggle button text
    if (theme === 'neon') {
        toggleButton.textContent = 'Switch to Pro Theme';
    } else if (theme === 'pro') {
        toggleButton.textContent = 'Switch to Neon Theme';
    }
}

// Event listener for the toggle button
document.getElementById('toggle-btn').addEventListener('click', function () {
    const currentTheme = toggleStylesheet(); // Toggle the stylesheet
    updateToggleButton(currentTheme); // Update the button style
});