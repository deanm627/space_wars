'use strict';

document.addEventListener('DOMContentLoaded', function () {
    
    const starWarsPerson = document.getElementById('starWarsPerson');

    fetch('https://swapi.dev/api/people/1/')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
                starWarsPerson.innerText = data.name;
        });
});