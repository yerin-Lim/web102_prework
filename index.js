/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
        // create a new div element, which will become the game card
        // add the class game-card to the list
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        // append the game to the games-container

    for(let i = 0; i < games.length; i++) {
        games[i];
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `
            <img class = "game-img" src = "${games[i].img}">

            <div class = "info">
                <h1>${games[i].name}</h1>
                <p>${games[i].description}</p>
                <p>backers: ${games[i].backers}</p>
            </div>
        `;
        gamesContainer.appendChild(gameCard);
    } 

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<div> ${totalContributions.toLocaleString('en-US')} </div>`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalAmountRaised = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
}, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `<div> $${totalAmountRaised.toLocaleString('en-US')} </div>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalNumberOfGames = GAMES_JSON.length;

gamesCard.innerHTML = `<div> ${totalNumberOfGames.toLocaleString('en-US')} </div>`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfunded = GAMES_JSON.filter ( (game) => { return game.goal > game.pledged})

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let funded = GAMES_JSON.filter ( (game) => { return game.goal <= game.pledged})

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(funded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfunded = GAMES_JSON.filter ( (game) => { return game.goal > game.pledged})
let funded = GAMES_JSON.filter ( (game) => { return game.goal <= game.pledged})

let numberOfUnfundedGames = unfunded.length;
let numberOfFundedGames = funded.length;

// create a string that explains the number of unfunded games using the ternary operator
const displayStrOne = `A total of $${totalAmountRaised.toLocaleString('en-US')} has been raised for ${numberOfFundedGames} game. Currently, ${numberOfUnfundedGames} game remains unfunded. We need your help to fund theses amazing games!`;

const displayStr = `A total of $${totalAmountRaised.toLocaleString('en-US')} has been raised for ${numberOfFundedGames} games. Currently, ${numberOfUnfundedGames} game remain unfunded. We need your help to fund theses amazing games!`;

let displayString = numberOfUnfundedGames <= 1 ? displayStrOne : displayStr;

// create a new DOM element containing the template string and append it to the description container

const ele = document.createElement("p");
ele.innerText = displayString;
descriptionContainer.appendChild(ele);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  [...GAMES_JSON].sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [first, second, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element

const firstGame = document.createElement("p");
firstGame.innerText = first.name;
firstGameContainer.appendChild(firstGame);

// do the same for the runner up item

const secondGame = document.createElement("p");
secondGame.innerText = second.name;
secondGameContainer.appendChild(secondGame);

//customization: add a sorting game names by alphabetically

function sortGamesAtoZ() {
    deleteChildElements(gamesContainer);
    const sortedGamesAlphabet = [...GAMES_JSON].sort( (item1, item2) => {
        return item1.name.localeCompare(item2.name);
    });
    addGamesToPage(sortedGamesAlphabet);;
}

const sortAtoZ = document.getElementById("sortAtoZ-btn");
sortAtoZ.addEventListener("click", sortGamesAtoZ);

//customization: add a sorting unfunded games by difference between the goal and pledged to show which unfunded game is the closest to be funded

function sortGamesCloseToFunded() {
    deleteChildElements(gamesContainer);
    const gamesCloseToFunded = GAMES_JSON.filter( (game) => { return game.goal > game.pledged}).sort( (item1, item2) => {
        return (item1.goal - item1.pledged) - (item2.goal - item2.pledged);
    });
    for(let i = 0; i < gamesCloseToFunded.length; i++) {
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `
            <img class = "game-img" src = "${gamesCloseToFunded[i].img}">

            <div class = "info">
                <h1>${gamesCloseToFunded[i].name}</h1>
                <p>${gamesCloseToFunded[i].description}</p>
                <p>backers: ${gamesCloseToFunded[i].backers}</p>
                <p>Remaining balance: $${gamesCloseToFunded[i].goal -gamesCloseToFunded[i].pledged}</p>
            </div>
        `;
        gamesContainer.appendChild(gameCard);
    }  
}

const sortCloseToFunded = document.getElementById("sortCloseToFunded-btn");
sortCloseToFunded.addEventListener("click", sortGamesCloseToFunded);