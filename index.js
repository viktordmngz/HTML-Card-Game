/* --CURRENTLY INCOMPLETE--
Start Date: 09/09/2024 (MM/DD/YYYY)
Last Updated: 09/11/2024 (MM/DD/YYYY)
Originally Coded By: Gavin Lon (https://github.com/GavinLonDigital/HuntTheAceJSGame)
  Followed the JavaScript Tutorial on YouTube (https://youtu.be/Bj6lC93JMi0?si=IImtSoFegHA4P-Du)

This is part of my development as a web developer. I chose this project as a starting point and will
be designing my own card game using what I have learned from this tutorial.

While I did follow the tutorial, I did change a few names of the variables and functions because they were
a little too cumbersome in the video.

Please enjoy and check the original source GitHub repository (linked above) to see if there are any licenses
on the use of this code.
*/

// Create an object array to hold your cards
const cardObjectDefinitions = [
  {id:1, imagePath: '/images/card-KingHearts.png'},
  {id:2, imagePath: '/images/card-QueenDiamonds.png'},
  {id:3, imagePath: '/images/card-JackClubs.png'},
  {id:4, imagePath: '/images/card-AceSpades.png'}
]

//--GLOBAL VARIABLES--
// Card-back image path element
const cardBackImgPath = '/images/card-back-Blue.png'

// Card-container reference for grid cells and their properties
const cardContainerElem = document.querySelector('.card-container')

// Empty array to store the cards in for use in other functions
let cards = [];

// Play Game button element
const playGameButtonElem = document.getElementById('playGame');

// Grid position variables
const collapsedGridAreaTemplate = '"a a" "a a"';
const cardCollectionCellClass = '.card-pos-a';

// Number of cards --> will be used to shuffle the cards
const numCards = cardObjectDefinitions.length;

// Card positions --> will be used to shuffle the cards
const cardPositions = [];

/* 
Reference to our HTML elements.
We will now add these elements to our HTML via this file.
This will let us do things like shuffling the cards around.
*/
{/* <div class="card">
  <div class="card-inner">
    <div class="card-front">
      <img src="/images/card-JackClubs.png" alt="Jack of Clubs" class="card-img">
    </div>
    <div class="card-back">
      <img src="/images/card-back-Blue.png" alt="Card back" class="card-img">
    </div>
  </div>
</div> */}

// Load game when the "Play Game" button is pushed
loadGame();

// Function to load cards into the game
function loadGame() {
  // Creates the card elements
  createCards();

  // Fills the array with every element from the HTML
    // Every element belonging to 'card' class
  cards = document.querySelectorAll('.card');

  // Click-action for "Play Game" button
  playGameButtonElem.addEventListener('click', ()=>startGame());

}

// Function to start the game with initialized values
function startGame(){
  // alert('Game has started');
  initNewGame();
  startRound();
}

// Initialize a new game
function initNewGame(){

}

// Sets up the cards in an initial position
// Resets the score to 0
function startRound(){
  initNewRound();
  collectCards();
  flipCards(true);
}

// New round function
  // Sets score to 0
function initNewRound(){

}

//--INITIALIZE CARD POSITIONS--
// Function to store the card positions
function initCardPositions(card) {
  cardPositions.push(card.id);
}

//--PLACING THE CARDS IN THE MIDDLE--
// Place the cards in a single stack in the middle of the screen
function collectCards(){
  transformGridArea(collapsedGridAreaTemplate);
  addCardsToGridAreaCell(cardCollectionCellClass);
}

// Takes the grid area in the HTML and turns it into the new layout
function transformGridArea(areas){
  cardContainerElem.style.gridTemplateAreas = areas;
}

// Place the cards in a stack
function addCardsToGridAreaCell(cellPosClassName){
  const cellPosElem = document.querySelector(cellPosClassName);

  // Each card in the HTML adds a new element below the 'cell-pos-a/b/c/d' class element
  cards.forEach((card,index)=>{
    addChildElement(cellPosElem,card);
  })
}

//--FLIPPING THE CARDS OVER--
// Function that will flip the card if it is face up
function flipCard(card, flipToBack){
  
  // Look at the first class under the 'card' class
  const innerCardElem = card.firstChild;

  // If flipToBack is TRUE and 'flip-it' class is not present, add 'flip-it'
  if(flipToBack && !innerCardElem.classList.contains('flip-it')) {
    innerCardElem.classList.add('flip-it');
  }
  // Else if 'flip-it' is present, remove it
  else if(innerCardElem.classList.contains('flip-it')) {
    innerCardElem.classList.remove('flip-it');
  }
  
}

// Function to flip all of the cards at the start of the game
function flipCards(flipToBack){
  cards.forEach((card,index)=>{
    // setTimeout method flips each card at a different time
      // Used to create an animation effect
    setTimeout(() => {
      flipCard(card, flipToBack);
    }, index * 100);
  })
}

//--SHUFFLING THE CARDS--
// Function to shuffle the cards
  // Set the ID's randomly
function shuffleCards(){
  const id = setInterval(shuffle, 12);
  let shuffleCount = 0;

  // function to keep track of number of shuffles
    // calls the function to shuffle the cards
  function shuffle() {
    
    randomizeCardPos();
    
    if(shuffleCount == 7) {
      clearInterval(id);
      // Once the cards have been shuffled, reset 
      dealCards();
    }
    else{
      shuffleCount++;
    }
  }
}

// Shuffles the cards
function randomizeCardPos() {

  // Math.random() returns a number 0 <= x < 1
    // This number * numCards gives us 0 <= x < 4
    // random1 and random2 are integers from 1 <= x < 5
  const random1 = Math.floor(Math.random()*numCards) + 1;
  const random2 = Math.floor(Math.random()*numCards) + 1;

  // temp will be set to be an item one place before random1 (positions 0-->4)
  const temp = cardPositions[random1-1]

  // swap temp item with another item in the array
  cardPositions[random1-1] = cardPositions[random2 - 1];
  cardPositions[random2-1] = temp;
}

//--CREATING THE CARD ELEMENTS--
// Loops through the cardObjectDefinitions array --> 
  // creates the cards-->
    // adds them to their appropriate grid position
function createCards() {
  cardObjectDefinitions.forEach((cardItem)=>{
    createCard(cardItem)
  })
}

// --ADDING TO OUR HTML--
// Creates cards dynamically
function createCard(cardItem){
  
  //--ELEMENTS--
  // Creates the div elements for the cards
  const cardElem = createElement('div')
  const cardInnerElem = createElement('div')
  const cardFrontElem = createElement('div')
  const cardBackElem = createElement('div')

  // Creates the front and back images for each card
  const cardFrontImg = createElement('img')
  const cardBackImg = createElement('img')
  
  //--CLASSES AND IDs--
  // Add 'card' class to the card element
  addClassToElement(cardElem, 'card')

  // Add an Id to the card element using the id's we set earlier
  addIdToElement(cardElem, cardItem.id)

  // Add the other classes to the card element
  addClassToElement(cardInnerElem, 'card-inner')
  addClassToElement(cardFrontElem, 'card-front')
  addClassToElement(cardBackElem, 'card-back')

  // Add class to the img element of the card
  addClassToElement(cardBackImg, 'card-img')
  addClassToElement(cardFrontImg, 'card-img')
  
  //--ATTRIBUTES--
  // Add src attribute to the card element
  addSrcToImageElement(cardBackImg, cardBackImgPath)
  addSrcToImageElement(cardFrontImg, cardItem.imagePath)

  //--ORDER OF ELEMENTS--
  // Adding img child elements to the parent 'div' elements
  addChildElement(cardBackElem, cardBackImg)
  addChildElement(cardFrontElem, cardFrontImg)

  // Adding the other elements to their appropriate parent elements
  addChildElement(cardInnerElem, cardFrontElem)
  addChildElement(cardInnerElem, cardBackElem)
  addChildElement(cardElem, cardInnerElem)

  //--INITIALIZING GRID POSITIONS--
  // Adding the card to a grid cell
  addCardToGridCell(cardElem)

  //--INITIALIZING CARD POSITIONS--
  // Store the card positions when the game is loaded
  initCardPositions(cardElem)

}

//--FUNCTIONS TO BE USED TO CREATE THE CARDS--
// Creates HTML element
function createElement(elemType){
  return document.createElement(elemType)
}

// Add a class to an element
function addClassToElement(elem, className) {
  elem.classList.add(className)
}

// Add an ID to an element
function addIdToElement(elem,id){
  elem.id = id
}

// Add 'src' attribute to our element
function addSrcToImageElement(imgElem, src) {
  imgElem.src = src
}

// Add child elements/organize parent-child elements
function addChildElement(parentElem, childElem){
  parentElem.appendChild(childElem)
}

// Map cards to appropriate grid cells
function addCardToGridCell(card){

  // uses the id from this file to set the class name
  const cardPositionClassName = mapCardIdToGridCell(card)
  
  // grabs from our HTML file using the class name we just found
  const cardPosElem = document.querySelector(cardPositionClassName)

  // adds the 'card' class as a child element to the 'card-pos-a/b/c/d' class
  addChildElement(cardPosElem,card)

  /*
    If done correctly, this should result in the following configuration:

    King of Hearts      Queen of Diamonds

    Jack of Clubs       Ace of Spades
  */
}
function mapCardIdToGridCell(card){
  if(card.id == 1) {
      return '.card-pos-a';
  } else if(card.id == 2) {
    return '.card-pos-b';
  } else if(card.id == 3) {
    return '.card-pos-c';
  }
    else if(card.id == 4) {
      return '.card-pos-d';
  }
}
