const gems = document.querySelector(".gems");
const score = document.querySelector("#score");
let gemList = [];

// Create new gem object
class Gem {
  constructor(color) {
    this.color = color;
    this.element = document.createElement("div");
    this.element.className = `gem ${color}`;
    this.element.addEventListener("click", () => this.swap());
    gems.appendChild(this.element);
  }

  // Swap gem with the one to the right
  swap() {
    let index = gemList.indexOf(this);
    if (index < gemList.length - 1) {
      let temp = this.color;
      this.color = gemList[index + 1].color;
      gemList[index + 1].color = temp;
      this.element.className = `gem ${this.color}`;
      gemList[index + 1].element.className = `gem ${gemList[index + 1].color}`;
      checkMatches();
    }
  }
}

// Generate random gem color
function randomColor() {
  let colors = ["red", "green", "blue"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Generate new game with random gem colors
function newGame() {
  gemList.forEach((gem) => gem.element.remove());
  gemList = [];
  for (let i = 0; i < 16; i++) {
    let gem = new Gem(randomColor());
    gemList.push(gem);
  }
  checkMatches();
  updateScore(0);
}

// Check for matches and remove them
function checkMatches() {
  let removed = false;
  for (let i = 0; i < gemList.length - 2; i++) {
    if (
      gemList[i] &&
      gemList[i].color == gemList[i + 1].color &&
      gemList[i + 1].color == gemList[i + 2].color
    ) {
      gemList[i].element.remove();
      gemList[i + 1].element.remove();
      gemList[i + 2].element.remove();
      gemList.splice(i, 3);
      i -= 3;
      removed = true;
    }
  }
  if (removed) {
    updateScore(score.textContent + 10);
    checkMatches();
  }
}

// Update score
function updateScore(newScore) {
score.textContent = newScore;
}

// Start new game
newGame();
