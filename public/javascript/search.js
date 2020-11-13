var speed = document.querySelector("#speed");
var average = document.querySelector('#average');
var quality = document.querySelector('#quality');
var safety = document.querySelector('#safety');
var value = document.querySelector('#value');
var accuracy = document.querySelector('#accuracy');
var category;

async function categorySearchHandler(event, category) {
    event.preventDefault();
    var searchURL;
    if(category==='speed'){
        searchURL = '/api/search/speed';
    } else if(category === 'average') {
        searchURL = '/api/search/average';
    } else if(category === 'quality'){
        searchURL = '/api/search/quality'
    } else if(category === 'safety') {
        searchURL = '/api/search/safety';
    } else if(category === 'value') {
        searchURL = '/api/search/value';
    } else if(category === 'accuracy') {
        searchURL = '/api/search/accuracy';
    }
    const response = await fetch(searchURL, {
        method: 'GET'
    });
    if (response.ok){
        response.json().then(function(data){
             console.log(data);
         });
        
     } else {
         console.log(response.statusText);
         alert(response.statusText);
     }
};

speed.addEventListener('click', function () {
    category = 'speed';
    categorySearchHandler(event, category);
});

average.addEventListener('click', function () {
    category = 'average';
    categorySearchHandler(event, category);
});

quality.addEventListener('click', function () {
    category = 'quality';
    categorySearchHandler(event, category);
});

safety.addEventListener('click', function () {
    category = 'safety';
    categorySearchHandler(event, category);
});

value.addEventListener('click', function () {
    category = 'value';
    categorySearchHandler(event, category);
});

accuracy.addEventListener('click', function () {
    category = 'accuracy';
    categorySearchHandler(event, category);
});


