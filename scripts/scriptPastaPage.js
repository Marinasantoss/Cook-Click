const suggestions = [
  "Apple Pie",
  "Banana Smoothie",
  "Carrot Cake",
  "Cheeseburger",
  "Chicken Empanada",
  "Chocolate Mousse",
  "Coffee",
  "Feijoada (Brazilian Black Bean Stew)",
  "Ice Cream",
  "Juice (Grape)",
  "Lasagna",
  "Leek Quiche",
  "Pineapple",
  "Pizza",
  "Risotto",
  "Sorbet",
  "Stir-fried Noodles (Yakissoba)",
  "Tapioca",
  "Waffles",
  "Zucchini",
];

const searchInput = document.getElementById("search-input");
const suggestionsBox = document.getElementById("autocomplete-suggestions");

document.querySelector("form").addEventListener("submit", function (event) {
  const searchInput = document.querySelector('input[type="search"]');
  if (!searchInput.value.trim()) {
    event.preventDefault(); // Impede o envio
    alert("Please enter something in the search bar.");
  }
});

searchInput.addEventListener("input", function () {
  const query = searchInput.value.trim().toLowerCase();
  suggestionsBox.innerHTML = ""; // Limpa sugestões anteriores

  if (query) {
    const filteredSuggestions = suggestions.filter((item) =>
      item.toLowerCase().includes(query)
    );

    if (filteredSuggestions.length > 0) {
      suggestionsBox.style.display = "block"; // Mostra o box
      filteredSuggestions.forEach((suggestion) => {
        const suggestionItem = document.createElement("div");
        suggestionItem.textContent = suggestion;
        suggestionItem.classList.add("suggestion-item");

        // Adiciona evento de clique para preencher o input
        suggestionItem.addEventListener("click", () => {
          searchInput.value = suggestion;
          suggestionsBox.innerHTML = ""; // Limpa sugestões
          suggestionsBox.style.display = "none"; // Esconde o box
        });

        suggestionsBox.appendChild(suggestionItem);
      });
    }
  } else {
    suggestionsBox.style.display = "none"; // Esconde o box
  }
});

// Esconde o box quando o input perde o foco
searchInput.addEventListener("blur", () => {
  setTimeout(() => {
    suggestionsBox.style.display = "none";
  }, 200);
});

const autocompleteBox = document.querySelector(".autocomplete-box");

function adjustAutocompleteWidth() {
  if (window.innerWidth <= 768) {
    // Para dispositivos móveis
    autocompleteBox.style.width = "calc(100% - 50px)";
  } else {
    // Para desktops
    autocompleteBox.style.width = "calc(20% - 50px)";
  }
}

document
  .getElementById("mark-done-button")
  .addEventListener("click", function () {
    const recipeTitle = document.querySelector(".recipe-title");
    recipeTitle.style.textDecoration = "line-through";
    recipeTitle.style.color = "green";
    this.disabled = true; // Desabilita o botão após clicar
    this.textContent = "Receita concluída!";
  });

let timer;
let seconds = 0;
let isRunning = false;

const timerDisplay = document.getElementById("timer-display");
const startButton = document.getElementById("start-timer");
const pauseButton = document.getElementById("pause-timer");
const resetButton = document.getElementById("reset-timer");

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

function updateDisplay() {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  timerDisplay.textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;

    timer = setInterval(() => {
      seconds++;
      updateDisplay();
    }, 1000);
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
  }
}

function resetTimer() {
  clearInterval(timer);
  seconds = 0;
  isRunning = false;
  updateDisplay();
  startButton.disabled = false;
  pauseButton.disabled = true;
}
