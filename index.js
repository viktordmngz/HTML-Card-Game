// Create an object array to hold your cards
const cardObjectDefinitions = [
  {id:1, imagePath: '/images/card-KingHearts.png'},
  {id:2, imagePath: '/images/card-QueenDiamonds.png'},
  {id:3, imagePath: '/images/card-JackClubs.png'},
  {id:4, imagePath: '/images/card-AceSpades.png'}
]

// Card-back image path element
const cardBackImgPath = '/images/card-back-Blue.png'

// Card-container reference for grid cells and their properties
const cardContainerElem = document.querySelector('.card-container')

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

createCards();

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
  const cardElem = document.createElement('div')
  const cardInnerElem = document.createElement('div')
  const cardFrontElem = document.createElement('div')
  const cardBackElem = document.createElement('div')

  // Creates the front and back images for each card
  const cardFrontImg = createElement('img')
  const cardBackImg = createElement('img')
  
  //--CLASSES--
  // Add 'card' class to the card element
  addClassToElement(cardElem, 'card')
  // Add an Id to our card element using the id's we set earlier
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
function addChildElement(parentElem, childElem) {
  parentElem.appendChild(childElem)
}

// Map cards to appropriate grid cells
function addCardToGridCell(card){

  // uses the id from this file to set the class name
  const cardPositionClassName = mapCardIdToGridCell(card)
  
  // grabs from our HTML file using the class name we just found
  const cardPosElem = document.querySelector(cardPositionClassName)

  // adds the class as a child element to the 'card' class
  addChildElement(cardPosElem,card)

  /*
    If done correctly, this should result in the following configuration:

    King of Hearts      Queen of Diamonds

    Jack of Clubs       Ace of Spades
  */
}
function mapCardIdToGridCell(card){
  switch (card.id) {
    case 1:
      return '.card-position-a';
      break;
    case 2:
      return '.card-position-b';
      break;
    case 3:
      return '.card-position-c';
      break;
    case 4:
      return '.card-position-d';
  }

}