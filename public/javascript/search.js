//const { debug } = require("console");

var speed = document.querySelector("#speed");
var average = document.querySelector('#average');
var quality = document.querySelector('#quality');
var safety = document.querySelector('#safety');
var value = document.querySelector('#value');
var accuracy = document.querySelector('#accuracy');
var results = document.querySelector('#results');
var category;

displayResults = (data)=>{
    console.log(data.length);
   // debugger;
   if(data.length>0){
    for(let i = 0; i<data.length; i++){
        //get data and create the elements
        var service = document.createElement('p');
         service.textContent = data[i].service;
         results.appendChild(service);
         var title = document.createElement('p');
         title.textContent = data[i].title;
         results.appendChild(title);
         var text = document.createElement('p');
         text.textContent=data[i].text;
         results.appendChild(text);
         var average = document.createElement('p');
         average.textContent= 'Average: ';
         var quality = document.createElement('p');
         quality.textContent = 'Quality: ';
         var value = document.createElement('p');
         value.textContent = 'Value: ';
         var speed = document.createElement('p');
         speed.textContent = 'Speed: ';
         var safety = document.createElement('p');
         safety.textContent = 'Safety: ';
         var accuracy = document.createElement('p');
         accuracy.textContent = 'Accuracy: ';
         //create the stars
         //average
        var num = parseInt(data[i].average);
        var noNum = 5-num;
    
         for(let i=0; i<num; i++){
             var stars = document.createElement('span');
             stars.innerHTML = '<span class = "fa fa-star" style="color:gold"></span>'
             average.appendChild(stars);
         }
         for(let i=0; i<noNum; i++){
             var nostars = document.createElement('span');
             nostars.innerHTML='<span class = "fa fa-star"></span>';
            average.appendChild(nostars);
         }
         results.appendChild(average); 
         //quality
        num = parseInt(data[i].quality);
        noNum = 5-num;
    
         for(let i=0; i<num; i++){
             var stars = document.createElement('span');
             stars.innerHTML = '<span class = "fa fa-star" style="color:gold"></span>'
             quality.appendChild(stars);
         }
         for(let i=0; i<noNum; i++){
             var nostars = document.createElement('span');
             nostars.innerHTML='<span class = "fa fa-star"></span>';
            quality.appendChild(nostars);
         }
         results.appendChild(quality); 

         //value
         num = parseInt(data[i].value);
        noNum = 5-num;
    
         for(let i=0; i<num; i++){
             var stars = document.createElement('span');
             stars.innerHTML = '<span class = "fa fa-star" style="color:gold"></span>'
             value.appendChild(stars);
         }
         for(let i=0; i<noNum; i++){
             var nostars = document.createElement('span');
             nostars.innerHTML='<span class = "fa fa-star"></span>';
            value.appendChild(nostars);
         }
         results.appendChild(value); 

         //speed
         num = parseInt(data[i].speed);
        noNum = 5-num;
    
         for(let i=0; i<num; i++){
             var stars = document.createElement('span');
             stars.innerHTML = '<span class = "fa fa-star" style="color:gold"></span>'
             speed.appendChild(stars);
         }
         for(let i=0; i<noNum; i++){
             var nostars = document.createElement('span');
             nostars.innerHTML='<span class = "fa fa-star"></span>';
            speed.appendChild(nostars);
         }
         results.appendChild(speed); 

         //safety
         num = parseInt(data[i].safety);
        noNum = 5-num;
    
         for(let i=0; i<num; i++){
             var stars = document.createElement('span');
             stars.innerHTML = '<span class = "fa fa-star" style="color:gold"></span>'
             safety.appendChild(stars);
         }
         for(let i=0; i<noNum; i++){
             var nostars = document.createElement('span');
             nostars.innerHTML='<span class = "fa fa-star"></span>';
            safety.appendChild(nostars);
         }
         results.appendChild(safety); 

         //accuracy
         num = parseInt(data[i].accuracy);
        noNum = 5-num;
    
         for(let i=0; i<num; i++){
             var stars = document.createElement('span');
             stars.innerHTML = '<span class = "fa fa-star" style="color:gold"></span>'
             accuracy.appendChild(stars);
         }
         for(let i=0; i<noNum; i++){
             var nostars = document.createElement('span');
             nostars.innerHTML='<span class = "fa fa-star"></span>';
            accuracy.appendChild(nostars);
         }
         results.appendChild(accuracy); 
        } 
    } else {
        var service = document.createElement('p');
         service.textContent = data.service;
         results.appendChild(service);
         var title = document.createElement('p');
         title.textContent = data.title;
         results.appendChild(title);
         var text = document.createElement('p');
         text.textContent=data.text;
         results.appendChild(text);
         var average = document.createElement('p');
         average.textContent= 'Average: ';
         var quality = document.createElement('p');
         quality.textContent = 'Quality: ';
         var value = document.createElement('p');
         value.textContent = 'Value: ';
         var speed = document.createElement('p');
         speed.textContent = 'Speed: ';
         var safety = document.createElement('p');
         safety.textContent = 'Safety: ';
         var accuracy = document.createElement('p');
         accuracy.textContent = 'Accuracy: ';
         //create the stars
         //average
        var num = parseInt(data.average);
        var noNum = 5-num;
    
         for(let i=0; i<num; i++){
             var stars = document.createElement('span');
             stars.innerHTML = '<span class = "fa fa-star" style="color:gold"></span>'
             average.appendChild(stars);
         }
         for(let i=0; i<noNum; i++){
             var nostars = document.createElement('span');
             nostars.innerHTML='<span class = "fa fa-star"></span>';
            average.appendChild(nostars);
         }
         results.appendChild(average); 
         //quality
        num = parseInt(data.quality);
        noNum = 5-num;
    
         for(let i=0; i<num; i++){
             var stars = document.createElement('span');
             stars.innerHTML = '<span class = "fa fa-star" style="color:gold"></span>'
             quality.appendChild(stars);
         }
         for(let i=0; i<noNum; i++){
             var nostars = document.createElement('span');
             nostars.innerHTML='<span class = "fa fa-star"></span>';
            quality.appendChild(nostars);
         }
         results.appendChild(quality); 

         //value
         num = parseInt(data.value);
        noNum = 5-num;
    
         for(let i=0; i<num; i++){
             var stars = document.createElement('span');
             stars.innerHTML = '<span class = "fa fa-star" style="color:gold"></span>'
             value.appendChild(stars);
         }
         for(let i=0; i<noNum; i++){
             var nostars = document.createElement('span');
             nostars.innerHTML='<span class = "fa fa-star"></span>';
            value.appendChild(nostars);
         }
         results.appendChild(value); 

         //speed
         num = parseInt(data.speed);
        noNum = 5-num;
    
         for(let i=0; i<num; i++){
             var stars = document.createElement('span');
             stars.innerHTML = '<span class = "fa fa-star" style="color:gold"></span>'
             speed.appendChild(stars);
         }
         for(let i=0; i<noNum; i++){
             var nostars = document.createElement('span');
             nostars.innerHTML='<span class = "fa fa-star"></span>';
            speed.appendChild(nostars);
         }
         results.appendChild(speed); 

         //safety
         num = parseInt(data.safety);
        noNum = 5-num;
    
         for(let i=0; i<num; i++){
             var stars = document.createElement('span');
             stars.innerHTML = '<span class = "fa fa-star" style="color:gold"></span>'
             safety.appendChild(stars);
         }
         for(let i=0; i<noNum; i++){
             var nostars = document.createElement('span');
             nostars.innerHTML='<span class = "fa fa-star"></span>';
            safety.appendChild(nostars);
         }
         results.appendChild(safety); 

         //accuracy
         num = parseInt(data.accuracy);
        noNum = 5-num;
    
         for(let i=0; i<num; i++){
             var stars = document.createElement('span');
             stars.innerHTML = '<span class = "fa fa-star" style="color:gold"></span>'
             accuracy.appendChild(stars);
         }
         for(let i=0; i<noNum; i++){
             var nostars = document.createElement('span');
             nostars.innerHTML='<span class = "fa fa-star"></span>';
            accuracy.appendChild(nostars);
         }
         results.appendChild(accuracy); 
        } 
};

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
    };
    console.log(searchURL);
    const response = await fetch(searchURL, {
        method: 'GET'
    });
    if (response.ok){
        response.json().then(function(data){
             displayResults(data);
         });
        
     } else {
         console.log(response.statusText);
         alert(response.statusText);
     }
};

speed.addEventListener('click', function () {
    $('#results').empty();
    category = 'speed';
    categorySearchHandler(event, category);
});

average.addEventListener('click', function () {
    $('#results').empty();
    category = 'average';
    categorySearchHandler(event, category);
});

quality.addEventListener('click', function () {
    $('#results').empty();
    category = 'quality';
    categorySearchHandler(event, category);
});

safety.addEventListener('click', function () {
    $('#results').empty();
    category = 'safety';
    categorySearchHandler(event, category);
});

value.addEventListener('click', function () {
    $('#results').empty();
    category = 'value';
    categorySearchHandler(event, category);
});

accuracy.addEventListener('click', function () {
    $('#results').empty();
    category = 'accuracy';
    categorySearchHandler(event, category);
});

var provider = document.querySelector('#provider');
var reviews = document.querySelector("#reviews");
var service;

async function providerSearchHandler(event, service) {
    event.preventDefault();
    var searchURL = '/api/search/reviews/' + service;
    const response = await fetch(searchURL, {
        method: 'GET'
    });
    if (response.ok){
        response.json().then(function(data){
           //console.log(data);
             displayResults(data);
         });
        
     } else {
         console.log(response.statusText);
         alert(response.statusText);
     };
};

reviews.addEventListener('click', function (){
    $('#results').empty();
    var service = $('#provider').val().trim();
    providerSearchHandler(event, service);
});

var show = document.querySelector("#show");
async function allReviewsSearchHandler(event) {
    event.preventDefault();
    var searchURL = '/api/reviews';
    const response = await fetch(searchURL,{
        method: 'GET'
    });
    if (response.ok){
        response.json().then(function(data){
            // console.log(data);
            $('#results').empty();
            displayResults(data);
         });
        
     } else {
         console.log(response.statusText);
         alert(response.statusText);
     };
};
show.addEventListener('click', allReviewsSearchHandler); 
