// Chave da API
const API_KEY = "605033950b25954983800461efa3981d";

// Seleciona os elementos do DOM
const bibleContainer = document.getElementById("bible-container");
const searchForm = document.getElementById("search-form");
const bookSelect = document.getElementById("book-select");
const chapterSelect = document.getElementById("chapter-select");
const versionSelect = document.getElementById("version-select");

// Popula as opções do select de livros
for (let i = 1; i <= 66; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.text = `${i} - ${getBookName(i)}`;
  bookSelect.add(option);
}

// Popula as opções do select de capítulos
for (let i = 1; i <= 150; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.text = i;
  chapterSelect.add(option);
}

// Define o evento de envio do formulário de busca
searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita o comportamento padrão do formulário

  const book = bookSelect.value;
  const chapter = chapterSelect.value;
  const version = versionSelect.value;

  // Faz a requisição para a API
  fetch(`https://api.biblia.com/v1/bible/content/${version}.html.json`, {
    method: "POST",
    body: `passage=${book}.${chapter}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Exibe os versículos na página
      const html = data.content.split("\n").map((verse) => {
        const verseNumber = verse.match(/<sup>(\d+)<\/sup>/)[1];
        const verseText = verse.replace(/<[^>]+>/g, "");
        return `<div class="verse"><span class="verse-number">${verseNumber}</span>${verseText}</div>`;
      }).join("");
      bibleContainer.innerHTML = `<div class="version-select">Versão: ${version.toUpperCase()}</div>${html}`;
    })
    .catch((error) => {
      console.error(error);
      bibleContainer.innerHTML = "Ocorreu um erro ao buscar os versículos.";
    });
});

// Função auxiliar para obter o nome do livro a partir do seu número
function getBookName(bookNumber) {
  const books = [
    "Gênesis",
    "Êxodo",
    "Levítico",
    "Números",
    "Deuteronômio",
    "Josué",
    "Juízes",
    "Rute",
    "1 Samuel",
    "2 Samuel",
    "1 Reis",
    "2 Reis",
    "1 Crônicas",
    "2 Crônicas",
    "Esdras",
    "Neemias",
    "Ester",
    "Jó",
    "Salmos",
    "Provérbios",
    "Eclesiastes",
    "Cantares",
    "Isaías",
    "Jeremias",
    "Lamentações",
    "Ezequiel",
    "Daniel",
    "Oseias",
    "Joel",
    "Amós",
    "Obadias",
    "Jonas",
"Naum",
"Habacuque",
"Sofonias",
"Ageu",
"Zacarias",
"Malaquias",
"Mateus",
"Marcos",
"Lucas",
"João",
"Atos",
"Romanos",
"1 Coríntios",
"2 Coríntios",
"Gálatas",
"Efésios",
"Filipenses",
"Colossenses",
"1 Tessalonicenses",
"2 Tessalonicenses",
"1 Timóteo",
"2 Timóteo",
"Tito",
"Filemom",
"Hebreus",
"Tiago",
"1 Pedro",
"2 Pedro",
"1 João",
"2 João",
"3 João",
"Judas",
"Apocalipse",
];
return books[bookNumber - 1];
}
