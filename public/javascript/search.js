async function allSearchResult() {

    const search = await fetch (`api/search`, {
        method: 'GET',
        body: JSON.stringify({
            title,
            text,
            service, 
            average, 
            quality, 
            value, 
            speed, 
            safety, 
            accuracy
        })
    })

    if (search.ok) {
        console.log(search)
    }
    else {
        alert(search.statusText);
    }

}

document.getElementById("searchAll").addEventListener('click', allSearchResult);