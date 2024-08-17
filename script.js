const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0;
let score = 0;

const gameContainer = document.getElementById('game-container');
const restartButton = document.getElementById('restart-button');
const scoreDisplay = document.getElementById('score-display');

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCard(cardValue) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-value', cardValue);
    card.addEventListener('click', flipCard);
    gameContainer.appendChild(card);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.getAttribute('data-value');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value');

    if (isMatch) {
        disableCards();
        score++;
        updateScore();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('match');
    secondCard.classList.add('match');
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
    matchedCards += 2;

    if (matchedCards === cards.length) {
        alert(`축하합니다! 게임을 완료했습니다. 최종 점수: ${score}점`);
    }
}

function updateScore() {
    scoreDisplay.textContent = `현재 점수: ${score}점 / 최대 점수: 8점`;
}

function startGame() {
    matchedCards = 0;
    score = 0; // 점수 초기화
    gameContainer.innerHTML = '';
    shuffle(cards);

    cards.forEach(cardValue => createCard(cardValue));
    updateScore(); // 초기 점수 표시
}

restartButton.addEventListener('click', startGame);
startGame();
