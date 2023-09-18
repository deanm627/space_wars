'use strict';

const peopleList = document.getElementById('peopleList');
const planetList = document.getElementById('planetList');
const starshipList = document.getElementById('starshipList');
const result = document.getElementById('result');
const peopleListDetails = document.getElementById('peopleListDetails');
const planetListDetails = document.getElementById('planetListDetails');
const starshipListDetails = document.getElementById('starshipListDetails');
const firstList = document.querySelectorAll('.firstList');
const secondList = document.querySelectorAll('.secondList');


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

    let selectedPeopleObj = "";
    peopleList.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedItemUrl = peopleList.querySelector('select').value;
        get(selectedItemUrl).then(function(response) {
            selectedPeopleObj = response;
            displayOptionsList(response, peopleListDetails);
        });
    });

    peopleListDetails.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedPeopleDetail = peopleListDetails.querySelector('select').value;
        const selectedPeopleObjArr = Object.entries(selectedPeopleObj);
        const itemToDisplay = document.getElementById('itemToDisplay');
        for (let i=0; i<selectedPeopleObjArr.length; i++) {
            if (selectedPeopleObjArr[i][0] === selectedPeopleDetail) {
                itemToDisplay.innerText = selectedPeopleObjArr[i][1];
            };
        };
    });

    let selectedPlanetObj = "";
    planetList.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedItemUrl = planetList.querySelector('select').value;
        get(selectedItemUrl).then(function(response) {
            selectedPlanetObj = response;

            displayOptionsList(response, planetListDetails);
        });
    });

    planetListDetails.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedPlanetDetail = planetListDetails.querySelector('select').value;
        const selectedPlanetObjArr = Object.entries(selectedPlanetObj);
        const itemToDisplay = document.getElementById('itemToDisplay');
        for (let i=0; i<selectedPlanetObjArr.length; i++) {
            if (selectedPlanetObjArr[i][0] === selectedPlanetDetail) {
                itemToDisplay.innerText = selectedPlanetObjArr[i][1];
            };
        };
    });

    let selectedStarshipObj = "";
    starshipList.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedItemUrl = starshipList.querySelector('select').value;
        get(selectedItemUrl).then(function(response) {
            selectedStarshipObj = response;
            displayOptionsList(response, starshipListDetails);
        });
    });

    starshipListDetails.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedStarshipDetail = starshipListDetails.querySelector('select').value;
        const selectedStarshipObjArr = Object.entries(selectedStarshipObj);
        const itemToDisplay = document.getElementById('itemToDisplay');
        for (let i=0; i<selectedStarshipObjArr.length; i++) {
            if (selectedStarshipObjArr[i][0] === selectedStarshipDetail) {
                itemToDisplay.innerText = selectedStarshipObjArr[i][1];
            };
        };
    });

});

function makeList(obj, category) {
    const selectList = document.createElement('select');
    for (let i=0; i<obj.results.length; i++) {
        const listItem = document.createElement('option');
        listItem.value = obj.results[i].url;
        listItem.text = obj.results[i].name;
        selectList.appendChild(listItem);
    };
    category.append(selectList);
    const button = document.createElement('button');
    button.type = "submit";
    button.textContent = "Submit";
    category.append(button);
    return;
};

function displayOptionsList(obj, category) {
    const keyListArr = Object.keys(obj);
    const filteredArr = keyListArr.filter((key) => key !== "name" && key !== "created" && key !== "edited" && key !== "url" && key !== "model");
    const list = document.createElement('select');
    for (let i=0; i<filteredArr.length; i++) {
        const listItem = document.createElement('option');
        listItem.value = filteredArr[i];
        listItem.text = filteredArr[i];
        list.appendChild(listItem);
    };
    category.append(list);
    const button = document.createElement('button');
    button.type = "submit";
    button.textContent = "Submit";
    category.append(button);
    return;
};