async function newEditHandler(click) {
    click.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const title = document.querySelector('#review-title').value;
    const service = document.querySelector("#service").value;
    const text = document.querySelector("#review-text").value;
    const safety = document.querySelector("#safety").title;
    const quality = document.querySelector("#quality").title;
    const accuracy = document.querySelector("#accuracy").title;
    const speed = document.querySelector("#speed").title;
    const value = document.querySelector("#value").title;
    const average = ((parseInt(safety) + parseInt(quality) + parseInt(accuracy) + parseInt(speed) + parseInt(value)) / 5).toFixed(2);

    const response = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            text,
            service,
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

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.getElementById("create").addEventListener('click', newEditHandler);