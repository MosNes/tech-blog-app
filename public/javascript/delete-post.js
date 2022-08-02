async function deletePostHandler(event) {

  //if the element clicked was a delete button
  if (event.target.dataset.type === "delete-btn") {

    //get post ID from delete button data property
    const postId = event.target.dataset.id;

    const response = await fetch(`api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  }
}

//add event listener to entire your-posts-container to capture all delete buttons
document.getElementById("your-posts-container").addEventListener("click", deletePostHandler);
