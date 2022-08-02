console.log('edit posts has loaded')

async function saveEditsSubmitHandler(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const contents = document.getElementById('post-body').value;
    //get post ID from data property on delete button
    const postId = document.getElementById('delete-btn').dataset.id;

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
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

document.getElementById('save-btn').addEventListener('click', saveEditsSubmitHandler);