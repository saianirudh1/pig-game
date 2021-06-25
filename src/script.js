'use-strict';

// Elements
const player1 = document.querySelector('.player-0');
const player2 = document.querySelector('.player-1');

const diceEl = document.querySelector('.dice');
const rollButton = document.querySelector('.btn-roll');
const newButton = document.querySelector('.btn-new');
const holdButton = document.querySelector('.btn-hold');
const closeButton = document.querySelector('.close');

const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal-text');
const overlay = document.querySelector('.overlay');

let currScore, activePlayer, scores, playing;

// Functions
const hideModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const init = function () {
  currScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  diceEl.classList.add('hidden');
  hideModal();
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  player1.classList.remove('player-winner');
  player2.classList.remove('player-winner');

  player1.classList.add('player-active');
  player2.classList.remove('player-active');
};

const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player-active');
  player2.classList.toggle('player-active');
};

// Game Logic
init();

rollButton.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `/images/dice-${dice}.png`;

    if (dice !== 1) {
      currScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currScore;
    } else {
      switchPlayer();
    }
  }
});

holdButton.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    scores[activePlayer] += currScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      playing = false;
      modalText.textContent = `Player ${activePlayer + 1} has won! 🎉`;
      modal.classList.toggle('hidden');
      overlay.classList.toggle('hidden');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player-winner');

      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player-active');
    }

    switchPlayer();
  }
});

// Reset game
closeButton.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    hideModal();
  }
});

newButton.addEventListener('click', init);
