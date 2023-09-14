'use strict';

const peopleList = document.getElementById('peopleList');
const planetList = document.getElementById('planetList');
const starshipList = document.getElementById('starshipList');
const personSubmitButton = document.getElementById('personSubmitButton');
const planetSubmitButton = document.getElementById('planetSubmitButton');
const starshipSubmitButton = document.getElementById('starshipSubmitButton');

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded");

    const peopleUrl = 'https://swapi.dev/api/people/';
    get(peopleUrl).then(function(response) {
        makeList(response, peopleList);
    });

    const planetUrl = "https://swapi.dev/api/planets/";
    get(planetUrl).then(function(response) {
        makeList(response, planetList);
    });

    const starshipUrl = "https://swapi.dev/api/starships/";
    get(starshipUrl).then(function(response) {
        makeList(response, starshipList);
    });
});

function makeList(obj, category) {
    let selectList = document.createElement('select');
    for (let i=0; i<obj.results.length; i++) {
        let listItem = document.createElement('option');
        listItem.value = obj.results[i].name;
        listItem.text = obj.results[i].name;
        selectList.appendChild(listItem);
    };
    category.append(selectList);
};