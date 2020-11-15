async function newCommentHandler(click) {
    click.preventDefault();
    const text = document.querySelector('#comment').value;

    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
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