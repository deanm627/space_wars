'use strict';

document.addEventListener('DOMContentLoaded', function () {
    
    const starWarsPerson = document.getElementById('starWarsPerson');
    let peopleList = document.createElement('ul');

    fetch('https://swapi.dev/api/people/1/')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            starWarsPerson.innerText = data.name;
        });

    // This returns all the names in a list
    //
    fetch('https://swapi.dev/api/people/')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            for (let i=0; i<data.results.length; i++) {
                let listItem = document.createElement('li');
                listItem.innerText = data.results[i].name;
                peopleList.append(listItem);
            }
            starWarsPerson.appendChild(peopleList);
        });
});