// Variáveis globais
const API_KEY = "605033950b25954983800461efa3981d"; // Substitua pela sua chave API
const API_BASE_URL = "https://api.biblia.com/v1/bible";

const bibleContainer = document.querySelector("#bible-container");
const versionSelect = document.querySelector("#version-select");
const bookSelect = document.querySelector("#book-select");
const chapterSelect = document.querySelector("#chapter-select");

// Função para buscar as informações da API
async function fetchBible(version, book, chapter) {
  const url = `${API_BASE_URL}/content/${version}.html?passage=${book}${chapter}`;
  const response = await fetch(`${url}&key=${API_KEY}`);
  const data = await response.text();
  return data;
}

// Função para renderizar a Bíblia na página
function renderBible(version, book, chapter) {
  // Limpa o contêiner da Bíblia
  bibleContainer.innerHTML = "";

  // Cria o elemento para exibir a versão selecionada
  const versionEl = document.createElement("div");
  versionEl.classList.add("version-select");
  versionEl.textContent = `Versão selecionada: ${version}`;
  bibleContainer.appendChild(versionEl);

  // Cria o elemento para exibir o nome do livro selecionado
  const bookEl = document.createElement("h2");
  bookEl.textContent = book;
  bibleContainer.appendChild(bookEl);

  // Cria o elemento para exibir o número do capítulo selecionado
  const chapterEl = document.createElement("h3");
  chapterEl.textContent = `Capítulo ${chapter}`;
  bibleContainer.appendChild(chapterEl);

  // Busca as informações da API e renderiza os versículos na página
  fetchBible(version, book, chapter)
    .then(data => {
      // Cria o elemento para exibir os versículos
      const versesEl = document.createElement("div");
      versesEl.classList.add("verses");

      // Adiciona cada versículo ao elemento de versículos
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
      const verseElements = doc.querySelectorAll(".verse");
      for (let i = 0; i < verseElements.length; i++) {
        const verseEl = document.createElement("div");
        verseEl.classList.add("verse");

        const verseNumberEl = document.createElement("span");
        verseNumberEl.classList.add("verse-number");
        verseNumberEl.textContent = `${i + 1}.`;
        verseEl.appendChild(verseNumberEl);

        const verseTextEl = document.createElement("span");
        verseTextEl.classList.add("verse-text");
        verseTextEl.innerHTML = verseElements[i].innerHTML;
        verseEl.appendChild(verseTextEl);

        versesEl.appendChild(verseEl);
      }

      // Adiciona o elemento de versículos ao contêiner da Bíblia
      bibleContainer.appendChild(versesEl);
    })
    .catch(error => {
      console.error("Erro ao buscar informações da API:", error);
      bibleContainer.innerHTML = "Ocorreu um erro ao buscar as informações da Bíblia. Por favor, tente novamente mais tarde.";
    });
}

// Evento para atualizar a Bíblia quando o usuário seleciona uma nova versão, livro ou capítulo
versionSelect.addEventListener("change", () => {
const version = versionSelect.value;
const book = bookSelect.value;
const chapter = chapterSelect.value;
renderBible(version, book, chapter);

// Salva a seleção do usuário na sessão atual
sessionStorage.setItem("version", version);
sessionStorage.setItem("book", book);
sessionStorage.setItem("chapter", chapter);
});

bookSelect.addEventListener("change", () => {
const version = versionSelect.value;
const book = bookSelect.value;
const chapter = chapterSelect.value;
renderBible(version, book, chapter);

// Salva a seleção do usuário na sessão atual
sessionStorage.setItem("version", version);
sessionStorage.setItem("book", book);
sessionStorage.setItem("chapter", chapter);
});

chapterSelect.addEventListener("change", () => {
const version = versionSelect.value;
const book = bookSelect.value;
const chapter = chapterSelect.value;
renderBible(version, book, chapter);

// Salva a seleção do usuário na sessão atual
sessionStorage.setItem("version", version);
sessionStorage.setItem("book", book);
sessionStorage.setItem("chapter", chapter);
});

// Verifica se há seleção salva na sessão anterior e atualiza a página
const savedVersion = sessionStorage.getItem("version");
const savedBook = sessionStorage.getItem("book");
const savedChapter = sessionStorage.getItem("chapter");
if (savedVersion && savedBook && savedChapter) {
versionSelect.value = savedVersion;
bookSelect.value = savedBook;
chapterSelect.value = savedChapter;
renderBible(savedVersion, savedBook, savedChapter);
}
