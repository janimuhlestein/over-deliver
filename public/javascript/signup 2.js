async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        console.log("hi");
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check the response status
        if (response.ok) {
            const login = await fetch('/api/users/login', {
                method: 'post',
                body: JSON.stringify({
                    'username': username,
                    'password': password
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (login.ok) {
                setTimeout(() => { document.location.replace('/dashboard') }, 200);
            }
        } else {
            alert("Duplicate username or e-mail, please try again.");
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
