async function loginFormHandler(event) { 
    event.preventDefault();

    //get input from form and trim whitespace
    const email = document.getElementById('username-login').value.trim();
    const password = document.getElementById('password-login').value.trim();

    //validate input
    if(email && password) {
        //make fetch call to api route
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        
        //check response data
        if (response.ok) {
            //if succesfully logged in, redirect to dashboard
            document.location.replace('/dashboard');
        } else {
            //throw error alert
            alert(response.statusText);
        }
    }
}

document.getElementById('login-form').addEventListener('submit', loginFormHandler);