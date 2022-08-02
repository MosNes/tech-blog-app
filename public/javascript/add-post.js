async function newPostHandler(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const contents = document.getElementById('post-body').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            contents
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert(response.statusText);
    }
}

document.getElementById('new-post-form').addEventListener('submit', newPostHandler);