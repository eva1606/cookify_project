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

        if (response.ok) {
            if (data.permission === 0) {
                window.location.href = 'homeuser.html'; 
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
