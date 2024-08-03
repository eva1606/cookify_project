document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        console.log('Login Response:', data); // Log response for debugging

        if (response.ok) {
            localStorage.setItem('chefId', data.user_id); // Store chefId in localStorage
            if (data.permission === 0) {
                console.log('Redirecting to homeuser.html');
                window.location.href = 'homeuser.html'; 
            } else if (data.permission === 1) {
                console.log('Redirecting to chefpage.html');
                window.location.href = 'chefpage.html';
            } else {
                alert('You do not have permission to access this page.');
            }
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error during login request:', error);
        alert('An error occurred during login.');
    }
});
