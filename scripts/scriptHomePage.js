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

// Ajuste inicial ao carregar a página
adjustAutocompleteWidth();

// Atualiza o tamanho ao redimensionar a janela
window.addEventListener("resize", adjustAutocompleteWidth);

document.querySelector("form").addEventListener("submit", function (event) {
  const searchInput = document.querySelector('input[type="search"]');
  if (!searchInput.value.trim()) {
    event.preventDefault(); // Impede o envio
    alert("Please enter something in the search bar.");
  }
});

// Defina os caminhos relativos para os arquivos HTML das páginas
const links = [
  "../indexPages/indexHealthyPage.html", // Página 1
  "../indexPages/indexDessertPage.html", // Página 2
  "../indexPages/indexDrinkPage.html", // Página 3
  "../indexPages/indexPastaPage.html", // Página 4
];

// Defina os nomes amigáveis das páginas
const pageNames = [
  "Healthy Page", // Nome para Página 1
  "Desserts Page", // Nome para Página 2
  "Drinks Page", // Nome para Página 3
  "Pastas Page", // Nome para Página 4
];

// Seleciona todas as imagens
const images = document.querySelectorAll(".custom-image");

// Adiciona eventos de mouse e clique para cada imagem
images.forEach((image, index) => {
  // Quando o mouse passa sobre a imagem
  image.addEventListener("mouseenter", () => {
    // Cria um elemento de texto dinâmico com o nome da página
    const hoverText = document.createElement("div");
    hoverText.classList.add("hover-text");
    hoverText.textContent = `Go to ${pageNames[index]}`;

    // Adiciona o texto como filho do contêiner da imagem
    image.parentElement.style.position = "relative"; // Garante que o contêiner seja relativo
    image.parentElement.appendChild(hoverText);

    // Estiliza o texto
    hoverText.style.position = "absolute";
    hoverText.style.top = "50%";
    hoverText.style.left = "50%";
    hoverText.style.transform = "translate(-50%, -50%)";
    hoverText.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    hoverText.style.color = "white";
    hoverText.style.padding = "10px 20px";
    hoverText.style.borderRadius = "8px";
    hoverText.style.fontSize = "14px";
    hoverText.style.pointerEvents = "none"; // Impede que o texto interfira no mouse
  });

  // Quando o mouse sai da imagem
  image.addEventListener("mouseleave", () => {
    // Remove o texto dinâmico
    const hoverText = image.parentElement.querySelector(".hover-text");
    if (hoverText) {
      hoverText.remove();
    }
  });

  // Quando a imagem é clicada
  image.addEventListener("click", () => {
    // Obtenha o caminho e o nome correspondente à imagem clicada
    const destination = links[index];
    const pageName = pageNames[index];

    // Mostre uma mensagem de confirmação com o nome amigável
    const confirmation = confirm(`Do you want to go to the ${pageName}?`);

    // Se o usuário confirmar, redirecione para a página
    if (confirmation) {
      window.location.href = destination;
    }
    // Caso contrário, permaneça na página atual
  });
});
