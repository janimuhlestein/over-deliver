async function newFormHandler() {

    const title = document.querySelector('#review-title').value;
    const provider = document.querySelector("#service").value;
    const service = provider
    const text = document.querySelector("#review-text").value;
    const safety = document.querySelector("#safety").title;
    const quality = document.querySelector("#quality").title;
    const accuracy = document.querySelector("#accuracy").title;
    const speed = document.querySelector("#speed").title;
    const value = document.querySelector("#value").title;
    const average = ((parseInt(safety) + parseInt(quality) + parseInt(accuracy) + parseInt(speed) + parseInt(value)) / 5).toFixed(2);

    const response = await fetch(`/api/ratings`, {
        method: 'POST',
        body: JSON.stringify({
            provider,
            average,
            quality,
            value,
            speed,
            accuracy,
            safety
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const review = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            text,
            service
        })
    })

    if ((response.ok) && (review.ok)) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.getElementById("create").addEventListener('click', newFormHandler);