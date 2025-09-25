const pickle = document.getElementById('pickle');
const scoreEl = document.getElementById('score');
const leaderboardEl = document.getElementById('leaderboard');

let score = 0;
let maxHeight = 350;
let isHolding = false;
let currentHeight = 0;
let speed = 1; // pixels per frame

// Load leaderboard from localStorage
let leaderboard = JSON.parse(localStorage.getItem('pickledLeaderboard')) || [];

function updateLeaderboard() {
  leaderboardEl.innerHTML = '';
  leaderboard.sort((a,b) => b - a).slice(0,5).forEach(score => {
    const li = document.createElement('li');
    li.textContent = score;
    leaderboardEl.appendChild(li);
  });
}

// Reset game
function resetGame() {
  if(score > 0) {
    leaderboard.push(score);
    localStorage.setItem('pickledLeaderboard', JSON.stringify(leaderboard));
    updateLeaderboard();
  }
  score = 0;
  scoreEl.textContent = score;
  currentHeight = 0;
  pickle.style.bottom = '0px';
}

// Game loop
function gameLoop() {
  if(isHolding && currentHeight < maxHeight) {
    currentHeight += speed;
    pickle.style.bottom = currentHeight + 'px';
    score = Math.floor(currentHeight);
    scoreEl.textContent = score;
  }
  requestAnimationFrame(gameLoop);
}

// Event listeners
document.addEventListener('keydown', (e) => {
  if(e.code === 'Space') {
    isHolding = true;
    e.preventDefault();
  }
});

document.addEventListener('keyup', (e) => {
  if(e.code === 'Space') {
    isHolding = false;
    resetGame();
    e.preventDefault();
  }
});

// Initialize
updateLeaderboard();
gameLoop();
