async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.getElementById('comment-body').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            //reloads the page if the request went through
            //to display the new comment
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.getElementById('comment-form').addEventListener('submit', commentFormHandler);