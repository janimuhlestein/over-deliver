async function newCommentHandler(click) {
  //  click.preventDefault();
    const text = document.querySelector('#comment').value;
    var review_id = window.location.href.split('/');
    console.log(review_id);
    review_id = review_id[5];

    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
            review_id,
            text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }

    document.getElementById("submit-comment").addEventListener('click', newCommentHandler);
}