async function voteFormHandler(review_id, user_id) {
    console.log(review_id, user_id)
    const response = await fetch(`/api/votes/`, {
        method: 'POST',
        body: JSON.stringify({
            review_id,
            user_id
        })
    });
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.vote-post-button').addEventListener('click', voteFormHandler);