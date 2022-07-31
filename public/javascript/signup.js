async function signupFormHandler(event) {
    event.preventDefault();

    //get input from form and trim whitespace
    const username = document.getElementById('username-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();

    //validate input
    if(username && password) {
        //make fetch call to api route
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        
        //check response data
        if (response.ok) {
            console.log('success');
            //if succesfully logged in, redirect to dashboard
            document.location.replace('/');
        } else {
            //throw error alert
            alert(response.statusText);
        }

    }
}

document.getElementById('signup-form').addEventListener('submit', signupFormHandler);