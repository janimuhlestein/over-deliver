async function voteFormHandler(review_id) {
    const response = await fetch(`/api/votes/`, {
        method: 'POST',
        body: JSON.stringify({
            review_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}