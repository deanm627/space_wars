'use strict';

const peopleList = document.getElementById('peopleList');
const planetList = document.getElementById('planetList');
const starshipList = document.getElementById('starshipList');
const result = document.getElementById('result');
const starshipListDetails = document.getElementById('starshipListDetails');

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded");

    const peopleUrl = 'https://swapi.dev/api/people/';
    get(peopleUrl).then(function(response) {
        makeList(response, peopleList);
    });

    peopleList.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedItemUrl = peopleList.querySelector('select').value;
        get(selectedItemUrl).then(function(response) {
            displayResult(response);
        });
    });

    const planetUrl = "https://swapi.dev/api/planets/";
    get(planetUrl).then(function(response) {
        makeList(response, planetList);
    });

    planetList.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedItemUrl = planetList.querySelector('select').value;
        get(selectedItemUrl).then(function(response) {
            displayResult(response);
        });
    });

    const starshipUrl = "https://swapi.dev/api/starships/";
    get(starshipUrl).then(function(response) {
        makeList(response, starshipList);
    });

    let selectedStarshipObj = "";
    starshipList.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedItemUrl = starshipList.querySelector('select').value;
        get(selectedItemUrl).then(function(response) {
            selectedStarshipObj = response;
            // displayResult(response);
            displayOptionsList(response, starshipListDetails);
        });
    });

    starshipListDetails.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedStarshipDetail = starshipListDetails.querySelector('select').value;
        const selectedStarshipObjArr = Object.entries(selectedStarshipObj);
        let itemToDisplay = document.createElement('p');
        for (let i=0; i<selectedStarshipObjArr.length; i++) {
            if (selectedStarshipObjArr[i][0] === selectedStarshipDetail) {
                itemToDisplay = selectedStarshipObjArr[i][1];
            }
        }
        result.append(itemToDisplay);
    });

});

function makeList(obj, category) {
    let selectList = document.createElement('select');
    for (let i=0; i<obj.results.length; i++) {
        let listItem = document.createElement('option');
        listItem.value = obj.results[i].url;
        listItem.text = obj.results[i].name;
        selectList.appendChild(listItem);
    };
    category.append(selectList);
};

// function displayResult(obj) {
//     const resultArr = Object.entries(obj);
//     const objList = document.createElement('ul');
//     for (let i=0; i<resultArr.length; i++) {
//         let objProp = document.createElement('li');
//         objProp.textContent = resultArr[i][0] + ": "
//         for (let j=1; j<resultArr[i].length; j++) {
//             objProp.textContent = objProp.textContent + " " + resultArr[i][j] + " ";
//         };
//         objList.appendChild(objProp);
//     };
//     result.append(objList);
// };

function displayOptionsList(obj, category) {
    console.log(obj);
    const keyListArr = Object.keys(obj);
    console.log(keyListArr);
    const filteredArr = keyListArr.filter((key) => key !== "name" && key !== "created" && key !== "edited" && key !== "url");
    let selectList = document.createElement('select');
    for (let i=0; i<filteredArr.length; i++) {
        let listItem = document.createElement('option');
        listItem.value = filteredArr[i];
        listItem.text = filteredArr[i];
        selectList.appendChild(listItem);
    };
    category.append(selectList);
    const button = document.createElement('button');
    button.type = "submit";
    button.textContent = "Submit";
    category.append(button);
};