function goToNextPage() {
    window.location.href = 'Login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    const button = document.getElementById('getStartedButton');

    // Ensure the button appears after the logo animation
    setTimeout(() => {
        button.style.display = 'block';
    }, 1500);
});
