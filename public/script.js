console.log("Script loaded");

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-button');
    const winPopup = document.getElementById('win-popup');
    const okButton = document.getElementById('ok-button');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
  
    let cardValues = [];
    let selectedCards = [];
    let matchedCards = 0;
  
    function initializeCards() {
      cardValues = Array.from({ length: 18 }, (_, i) => i + 1).flatMap(val => [val, val]);
      shuffleCards();
      renderCards();
      console.log("Initializing cards");
      console.log("Card values:", cardValues);

    }
  
    function shuffleCards() {
      for (let i = cardValues.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardValues[i], cardValues[j]] = [cardValues[j], cardValues[i]];
      }
    }
  
    function renderCards() {
      gameBoard.innerHTML = ''; // Clear the game board
      cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.dataset.value = value;
        card.dataset.index = index;
        card.textContent = '?';
        card.addEventListener('click', () => handleCardClick(card));
        gameBoard.appendChild(card);
      });
    }
  
    function handleCardClick(card) {
      if (selectedCards.length < 2 && !card.classList.contains('matched') && !selectedCards.includes(card)) {
        revealCard(card);
        selectedCards.push(card);
        if (selectedCards.length === 2) {
          checkMatch();
        }
      }
    }
  
    function revealCard(card) {
      card.classList.remove('hidden');
      card.textContent = card.dataset.value;
    }
  
    function hideCard(card) {
      card.classList.add('hidden');
      card.textContent = '?';
    }
  
    function checkMatch() {
      const [card1, card2] = selectedCards;
      if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;
        if (matchedCards === cardValues.length) {
          showWinPopup();
        }
      } else {
        setTimeout(() => {
          hideCard(card1);
          hideCard(card2);
        }, 1000);
      }
      selectedCards = [];
    }
  
    function showWinPopup() {
      winPopup.classList.remove('hidden');
      overlay.classList.add('visible');
    }
  
    function hideWinPopup() {
      winPopup.classList.add('hidden');
      overlay.classList.remove('visible');
    }
  
    okButton.addEventListener('click', hideWinPopup);
  
    resetButton.addEventListener('click', () => {
      matchedCards = 0;
      selectedCards = [];
      hideWinPopup();
      initializeCards();
    });
  
    // Initialize the game on load
    initializeCards();
  });
  