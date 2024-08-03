document.addEventListener('DOMContentLoaded', () => {
    const chefId = localStorage.getItem('chefId');
    if (!chefId) {
        console.error("Chef ID not found in localStorage");
        window.location.href = 'login.html';
        return;
    }

    console.log("Chef ID retrieved from localStorage:", chefId);
});
