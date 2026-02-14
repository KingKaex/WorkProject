let score = 0;
const heart = document.getElementById("heart");
const scoreText = document.getElementById("score");
const game = document.getElementById("game");
const surprise = document.getElementById("surprise");
const playArea = document.getElementById("play-area");
const ending = document.getElementById("ending");
const envelope = document.getElementById("envelope");

let x = 50;
let y = 50;
let speedX = 2;
let speedY = 2;

function moveHeart() {
  const areaWidth = playArea.clientWidth;
  const areaHeight = playArea.clientHeight;
  const heartSize = 60;

  x += speedX;
  y += speedY;

  if (x <= 0 || x + heartSize >= areaWidth) {
    speedX *= -1;
  }
  if (y <= 0 || y + heartSize >= areaHeight) {
    speedY *= -1;
  }

  heart.style.left = x + "px";
  heart.style.top = y + "px";

  requestAnimationFrame(moveHeart);
}

heart.addEventListener("click", () => {
  score++;
  scoreText.textContent = `Hearts: ${score} / 5`;

  // Speed up a little each catch
  speedX *= 1.1;
  speedY *= 1.1;

  if (score >= 5) {
    game.classList.add("hidden");
    surprise.classList.remove("hidden");
    startSlideshow();
  }
});

function startSlideshow() {
  let slides = document.querySelectorAll(".slide");
  let index = 0;

  const interval = setInterval(() => {
    slides[index].classList.remove("active");
    index++;
    if (index < slides.length) {
      slides[index].classList.add("active");
    } else {
      clearInterval(interval);
      setTimeout(() => ending.classList.remove("hidden"), 1500);
    }
  }, 2500);
}

envelope.addEventListener("click", () => {
  for (let i = 0; i < 80; i++) {
    const h = document.createElement("div");
    h.className = "flood-heart";
    h.textContent = "💖";
    h.style.left = Math.random() * 100 + "vw";
    h.style.animationDelay = Math.random() * 1.5 + "s";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 3000);
  }
});

moveHeart();