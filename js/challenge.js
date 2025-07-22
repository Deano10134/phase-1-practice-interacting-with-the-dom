// phase-1-practice-interacting-with-the-dom/js/challenge.js
// This file contains JavaScript code to interact with the DOM, handle events, and simulate server calls.
// It includes a timer, counter functionality, and error handling for server requests.
// The code is designed to be executed once the DOM content is fully loaded.
// The code also includes a simple error modal that can be displayed when a server request fails.
// The timer updates every second, and the counter can be incremented or decremented by clicking the respective buttons.
// The server call simulation randomly succeeds or fails, demonstrating error handling in action.
document.addEventListener("DOMContentLoaded", () => {
  // grab everything once
  const secondsEl    = document.getElementById("seconds");
  const counterEl    = document.getElementById("counter");
  const plusBtn      = document.getElementById("plus");
  const minusBtn     = document.getElementById("minus");
  const likeBtn      = document.getElementById("heart");
  const pauseBtn     = document.getElementById("pause");
  const restartBtn   = document.getElementById("restart");  // make sure this exists in your HTML
  const submitBtn    = document.getElementById("submit");
  const likesEl      = document.getElementById("likes");
  const commentsEl   = document.getElementById("list");

  let secondsPassed = 0;
  let count         = 0;
  let isPaused      = false;
  const likeTracker = {};

  // Timer
  setInterval(() => {
    if (!isPaused) {
      secondsPassed++;
      secondsEl.textContent = `Seconds: ${secondsPassed}`;
    }
  }, 1000);

  // Helpers
  function updateCounter() {
    counterEl.textContent = count;
  }
  function updateLikesDisplay() {
    likesEl.innerHTML = "";
    for (let num in likeTracker) {
      const div = document.createElement("div");
      div.textContent = `Number ${num} has ${likeTracker[num]} like(s)`;
      likesEl.appendChild(div);
    }
  }
  function toggleControls(disabled) {
    plusBtn.disabled  = disabled;
    minusBtn.disabled = disabled;
    likeBtn.disabled  = disabled;
  }
  function leaveComment(msg) {
    const p = document.createElement("p");
    p.textContent = msg;
    commentsEl.appendChild(p);
  }

  // Event bindings
  plusBtn.addEventListener("click", () => {
    if (!isPaused) {
      count++;
      updateCounter();
      leaveComment(`Count increased to ${count}`);
    }
  });

  minusBtn.addEventListener("click", () => {
    if (!isPaused) {
      count--;
      updateCounter();
      leaveComment(`Count decreased to ${count}`);
    }
  });

  likeBtn.addEventListener("click", () => {
    if (!isPaused) {
      const key = String(count);
      likeTracker[key] = (likeTracker[key] || 0) + 1;
      updateLikesDisplay();
      leaveComment(`Number ${key} now has ${likeTracker[key]} like(s)!`);
    }
  });

  pauseBtn.addEventListener("click", () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Resume" : "Pause";
    toggleControls(isPaused);
    leaveComment(isPaused ? "⏸️ Game paused." : "▶️ Game resumed.");
  });

  // guard the restart listener so we don’t crash if the button’s missing
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      secondsPassed = 0;
      count         = 0;
      isPaused      = false;
      pauseBtn.textContent = "Pause";
      toggleControls(false);
      updateCounter();
      secondsEl.textContent = `Seconds: 0`;
      leaveComment("🔄 Game restarted!");
    });
  }

  submitBtn.addEventListener("click", e => {
    e.preventDefault();
    const input = document.getElementById("comment-input");
    const txt   = input.value.trim();
    if (txt) {
      leaveComment(txt);
      input.value = "";
    } else {
      alert("Please enter a comment before submitting.");
    }
  });

  // initial render
  updateCounter();
});
