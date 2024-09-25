/* --CURRENTLY INCOMPLETE--
Start Date: 09/09/2024 (MM/DD/YYYY)
Last Updated: 09/19/2024 (MM/DD/YYYY)
Originally Coded By: Gavin Lon (https://github.com/GavinLonDigital/HuntTheAceJSGame)
  Followed the JavaScript Tutorial on YouTube (https://youtu.be/Bj6lC93JMi0?si=IImtSoFegHA4P-Du)

This is part of my development as a web developer. I chose this project as a starting point and will
be designing my own card game using what I have learned from this tutorial.

While I did follow the tutorial, I did change a few names of the variables and functions because they were
a little too cumbersome in the video.

Please enjoy and check the original source GitHub repository (linked above) to see if there are any licenses
on the use of this code.
*/

// Create an object array to hold the card image links and their IDs
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
  // Will be used for building cards as well
const cardContainerElem = document.querySelector('.card-container')

// Empty array to store the cards in for use in other functions
let cards = [];

// Play Game button element
const playGameButtonElem = document.getElementById('playGame');

// Score Container element
const scoreContainerElem = document.querySelector('.header-score-container')
const scoreElem = document.querySelector('.score')

// Round Container element
const roundContainerElem = document.querySelector('.header-round-container')
const roundElem = document.querySelector('.round')



// Grid position variables for stacking the cards
const collapsedGridAreaTemplate = '"a a" "a a"';
const cardCollectionCellClass = '.card-pos-a';

// Number of cards --> will be used to shuffle the cards
const numCards = cardObjectDefinitions.length;

// Card positions --> will be used to shuffle the cards and
  //                  put them back in the grid cells
let cardPositions = [];

// Game-state variables
let gameInProgress = false;
let shufflingInProgress = false;
let cardsRevealed = false;
let roundNum = 0;
let totalScore = 0;
let tempRoundScore = 0;
const maxRounds = 4;

// Game-status element
const currentGameStateElem = document.querySelector('.current-status');
const winColor = "green";
const loseColor = "darkred";


// Called to start the game
loadGame();

// -----------------------------------------

// ---FUNCTIONS START HERE---

// Function for the user's choice of a card
function chooseCard(card)
{
  if (canChooseCard())
  {
    evaluateCardChoice(card)
    flipCard(card,false)

    setTimeout(() => {
      flipCards(false);
      updateStatusElement(currentGameStateElem,"block","black","Revealing card positions...")
    
      endRound()

    }, 3000)
    cardsRevealed = true
  }
}

// Checks if the user selected the Ace
function canChooseCard()
{
  // If the game is in progress and the cards are not being
    // shuffled or revealed, then canChooseCard() is true
  return gameInProgress == true && !shufflingInProgress && !cardsRevealed
}

// Evaluate the user's choice
function evaluateCardChoice (card)
{
  if (card.id == 4)
  {
    updateScore();
    outputFeedback(true);
  }
  else
  {
    outputFeedback(false);
  }

}

// Output when the user makes a selection
function outputFeedback(hit)
{
  if (hit)
  {
    updateStatusElement(currentGameStateElem,"block",winColor,"Nailed It!! - You Win!! :)")

  }
  else
  {
    updateStatusElement(currentGameStateElem,"block", loseColor, "Sorry :( You did not find the Ace")
  }
}

// Updates a status element
function updateStatusElement(elem, display, color, innerHTML)
{
  elem.style.display = display

    //* if the function is called with more than 2 arguments, it is most
    // likely to change the text and inner HTML. However, there will
    // be times where we only wish to change the display style
    // so we will want to only pass 2 arguments
      //* Example of Method Overloading
  if (arguments.length > 2)
  {
    elem.style.color = color;
    elem.innerHTML = innerHTML;
  }

}

// Calculates the score to be added based on what round it is
function calculateScoreToAdd(round){
  
  
  if (roundNum == 1)
  {
    return 50
  }
  else if(roundNum == 2)
  {
    return 100
  }
  else if(roundNum == 3)
  {
    return 150
  }
  else if(roundNum == 4)
  {
    return 200
  }
}

// Adds the round score to the total score
function calculateScore()
{
  const roundScore = calculateScoreToAdd(roundNum);
  totalScore += roundScore
}


// Updates score
function updateScore()
{
  calculateScore()

  // Updates the score element immediately after finding the ace.
    // updateScoreAnimation();
  updateStatusElement(scoreElem,"block","black",`Score&nbsp<span class='badge'>${totalScore}</span>`)
}

// Score Animation
/* function updateScoreAnimation(){
  // Time for the animation in ms
  const totalDuration = 2000;

  // Frame rate (60fps = 1000ms/60)
  const frameRate = 1000/60;

  // Total frames used
  const totalFrames = Math.round(totalDuration/frameRate);

  // Ease-out function to slow the animation as it nears the end
  const easeOutQuad = t => t*(2-t);

  const countUp = el => {
    let frame = 0;
    const countTo = totalScore;

    const counter = setInterval( () => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      const currentCount = Math.round( countTo * progress);

      if (countTo !== currentCount) {
        tempRoundScore = currentCount;
      }

      if (frame === totalFrames) {
        clearInterval( counter );
      }
    }, frameRate);
  };

  const runAnimations = () => {
    const badgeElement = document.querySelectorAll('.badge');
    badgeElement.forEach( countUp );
  };
} */

//--ENDGAME FUNCTIONS--
// Ends the round if the card chosen is the Ace
function endRound(){
  setTimeout(()=>{
    if (roundNum < maxRounds){
      updateStatusElement(scoreElem,"block","black",`Score&nbsp<span class="badge">${totalScore}</span>`)
      startRound()
    }
    else {
      gameOver()
      return
    }
  }, 3000)
}

// Game Over Function
function gameOver(){
  // Hide the round and score elements
  updateStatusElement(scoreContainerElem,"none")
  updateStatusElement(roundContainerElem,"none")

  const gameOverMessage = `Game Over! Final Score - <b><span class="badge">${totalScore}</span></b>
                          <p>Click 'Play Game' button to start a new game</p>`;

  updateStatusElement(currentGameStateElem,"block","black",gameOverMessage);

  gameInProgress = false;
  playGameButtonElem.disabled = false;


}

// -----------------------------------------

// GAME LOADING FUNCTIONS
// Load cards into the game
function loadGame() {
  // Creates the card elements
  createCards();

  // Fills the array with every element from the HTML
    // Every element belonging to 'card' class
  cards = document.querySelectorAll('.card');

  // Click-action for "Play Game" button
  playGameButtonElem.addEventListener('click', ()=>startGame());

  // Hide the score and round elements
  updateStatusElement(scoreContainerElem,"none")
  updateStatusElement(roundContainerElem,"none")

}

// Function to start the game with initialized values
function startGame(){
  // alert('Game has started');
  initNewGame();
  startRound();
}

// Initialize a new game
function initNewGame(){
  roundNum = 0;
  totalScore = 0;
  
  shufflingInProgress = false;

  updateStatusElement(scoreContainerElem, "flex");
  updateStatusElement(roundContainerElem, "flex");

  updateStatusElement(scoreElem, "block", 'black',`Score <span class='badge'>${totalScore}</span>`);
  updateStatusElement(roundElem, "block", 'black',`Round <span class='badge'>${roundNum}</span>`);

}

// New round function
// Sets score to 0
function initNewRound(){
  roundNum++;
  playGameButtonElem.disabled = true;
  
  gameInProgress = true;
  shufflingInProgress = true;
  cardsRevealed = false;
  
  updateStatusElement(currentGameStateElem, "block", "black", "Shuffling..." )
  
  updateStatusElement(roundElem, "block", "black", `Round <span class='badge'>${roundNum}</span>`)

  // updateStatusElement(currentGameStateElem, "block", "black", "Try again.")
  
}

// Sets up a new round
  // 1. Initialize the round score and number
  // 2. Stack the cards for shuffling
  // 3. Flip the cards over so the player can't see
  // 4. Shuffle and deal
function startRound(){
  initNewRound();
  collectCards();
  flipCards(true);
  shuffleCards();
}


// Event Listener for each card
function clickEventHandler(card){
  card.addEventListener('click', ()=>chooseCard(card))
}



// -----------------------------------------

//--INITIALIZE CARD POSITIONS--
// Function to animate the cards flying in at the start of the game
function cardFlyIn(){
  const id = setInterval(flyIn,5)
  let cardCount = 0;

  let count = 0;
  
  function flyIn(){
    count++
    if(cardCount == numCards){
      clearInterval(id)
    }
    if (count == 1 || count == 250 || count == 500 || count == 750){
      cardCount++
      let card = document.getElementById(cardCount)
      card.classList.remove("fly-in")
    }
  }
}

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


// -----------------------------------------

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


// -----------------------------------------

//--SHUFFLING THE CARDS--
// Animation -- Functions for shuffling cards
function removeAnimationShuffle(){
  cards.forEach((card)=>{
    card.classList.remove("shuffle-left");
    card.classList.remove("shuffle-right");
  })
}
function animateShuffle(shuffleCount){
  const random1 = Math.floor(Math.random()*numCards) + 1;
  const random2 = Math.floor(Math.random()*numCards) + 1;
  
  let card1 = document.getElementById(random1);
  let card2 = document.getElementById(random2);

  if (shuffleCount % 6 == 0){
    // Change the z-index when the shuffle count is divisible by 4
    card1.classList.toggle("shuffle-left");
    card1.style.zIndex = 100
  }
  
  if(shuffleCount % 10 == 0){
    card2.classList.toggle("shuffle-right");
    card2.style.zIndex = 200
  }
}

// Function to shuffle the cards
  // Set the ID's randomly
function shuffleCards(){
  const id = setInterval(shuffle, 12);
  let shuffleCount = 0;

  // function to keep track of number of shuffles
    // calls the function to shuffle the cards
  function shuffle() {
    
    randomizeCardPos();
    animateShuffle(shuffleCount);
    
    if(shuffleCount < 500)
    {
      shuffleCount++;
    }
    else{
      clearInterval(id);
      shufflingInProgress = false;
      removeAnimationShuffle();
      // Once the cards have been shuffled, reset 
      dealCards();
      updateStatusElement(currentGameStateElem,"block", "black", "Please select a card you think is the Ace of Spades...")
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

//--DEALING THE CARDS--
// Function to deal the cards
function dealCards(){
  // Should reassign the card IDs
  const areasTemplate = returnGridAreasMappedToCardPos();
  transformGridArea(areasTemplate);
  
  addCardsToAppropriateCell();

}

// Generating a new grid template based on the random
  // positions stored in the cards array from the
  // randomized card position function.
  function returnGridAreasMappedToCardPos(){
  let firstPart = "";
  let secondPart = "";
  let areas = "";


  // cardPositions array holds the random positions that were found
    // using the randomizeCardPos function
  cards.forEach((card,index)=>{
    if(cardPositions[index] == 1)
      {
     areas = areas + "a "
    }
    else if(cardPositions[index] == 2)
    {
      areas = areas + "b "
    }
    else if(cardPositions[index] == 3)
      {
        areas = areas + "c "
      }
      else if(cardPositions[index] == 4)
    {
      areas = areas + "d "
    }
    // Index = 1 and Index = 3 are the end of the lines
      // When index == 1, we are at the end of the first line
      // When index == 3, we are at the end of the second line
    if (index == 1)
      {
        firstPart = areas.substring(0, areas.length - 1);
        areas = "";
      }
      else if (index == 3)
        {
          secondPart = areas.substring(0, areas.length - 1);
        }
      })
      return `"${firstPart}" "${secondPart}"`
    }



//--CREATING ALL OF THE CARD ELEMENTS--
// Loops through the cardObjectDefinitions array --> 
  // creates the cards-->
    // adds them to their appropriate grid position
function createCards() {
  cardObjectDefinitions.forEach((cardItem)=>{
    createCard(cardItem)
  })
}

// -----------------------------------------

/* Reference to our HTML elements.
    We will now add these elements to our HTML via this file.
    This will let us do things like shuffling the cards around. */
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


// --ADDING TO OUR HTML--
// Create a card dynamically and add it to our HTML
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

  //--ADD EVENT LISTENER ELEMENT--
  // Add the click listener
  clickEventHandler(cardElem)

}


//--FUNCTIONS TO BE USED IN createCard() FUNCTION--
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
  // Used for img elements
function addSrcToImageElement(imgElem, src) {
  imgElem.src = src
}

// Add child elements/organize parent-child elements
function addChildElement(parentElem, childElem){
  parentElem.appendChild(childElem)
}

// Function to add cards to the grid cell
  /* Ensures cards are returned to one of the 4 grid cells we originally
     had before they are collapsed and stacked */
  function addCardsToAppropriateCell(){
      cards.forEach((card) => {
        addCardToGridCell(card);
      })
  }

// Map cards to appropriate grid cells
function addCardToGridCell(card){

  // Uses the id from this file to set the class name
  const cardPositionClassName = mapCardIdToGridCell(card)
  
  // grabs from our HTML file using the class name we just found
  const cardPosElem = document.querySelector(cardPositionClassName)

  // adds the 'card' class as a child element to the 'card-pos-a/b/c/d' class
  addChildElement(cardPosElem,card)

  /*
    Before Randomization function -->
    If done correctly, this should result in the following configuration:

    King of Hearts      Queen of Diamonds

    Jack of Clubs       Ace of Spades
  */
}

// Using the card ID property to set the class name for positioning
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
