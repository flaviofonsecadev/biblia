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

// Array com versículos da Bíblia
const bibleVerses = [
  "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna. - João 3:16",
  "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós; é dom de Deus. - Efésios 2:8",
  "E esta é a confiança que temos nele: que, se pedirmos alguma coisa, segundo a sua vontade, ele nos ouve. - 1 João 5:14",
  "Em verdade, em verdade vos digo que aquele que crê em mim tem a vida eterna. - João 6:47",
  "Disse-lhe Jesus: Eu sou o caminho, e a verdade, e a vida. Ninguém vem ao Pai senão por mim. - João 14:6",
  "E conhecereis a verdade, e a verdade vos libertará. - João 8:32",
  "Não te deixes vencer do mal, mas vence o mal com o bem. - Romanos 12:21",
  "Sede, portanto, misericordiosos, como também vosso Pai é misericordioso. - Lucas 6:36"
];

// Função para escolher um versículo aleatório
function randomVerse() {
  const index = Math.floor(Math.random() * bibleVerses.length);
  return bibleVerses[index];
}

// Verifica se o navegador suporta notificações
if ("Notification" in window) {
  // Verifica se o usuário já concedeu permissão para receber notificações
  if (Notification.permission === "granted") {
    // Se o usuário já concedeu permissão, habilita a caixa de seleção
    const checkbox = document.querySelector("#notifications-checkbox");
    checkbox.disabled = false;

    // Verifica se a caixa de seleção foi marcada anteriormente
    const isChecked = localStorage.getItem("notifications") === "true";
    checkbox.checked = isChecked;

    // Função para atualizar a escolha do usuário no localStorage
    function updateNotificationsSetting() {
      localStorage.setItem("notifications", checkbox.checked);
    }

    // Adiciona o evento de mudança na caixa de seleção
    checkbox.addEventListener("change", () => {
      updateNotificationsSetting();
    });

    // Função para mostrar uma notificação com um versículo aleatório
    function showNotification() {
      const verse = randomVerse();
      const notification = new Notification("Versículo do dia", {
        body: verse
      });
    }

    // Chama a função para mostrar a primeira notificação
    showNotification();


    // Define um intervalo para mostrar notificações a cada duas horas
    setInterval(() => {
      // Verifica se o usuário marcou a caixa de seleção
      if (checkbox.checked) {
        showNotification();
      }
    }, 2 * 60 * 60 * 1000); // 2 horas em milissegundos

    // Função para mostrar uma notificação com um versículo aleatório
    function showNotification() {
      // Seleciona aleatoriamente um livro, capítulo e versículo
      const book = books[Math.floor(Math.random() * books.length)];
      const chapter = Math.floor(Math.random() * chapters[book].length) + 1;
      const verse = Math.floor(Math.random() * verses[book][chapter].length) + 1;

      // Cria a mensagem da notificação
      const message = `${book} ${chapter}:${verse} - ${verses[book][chapter][verse]}`;

      // Cria a notificação
      const notification = new Notification('Bíblia Online', {
        body: message
      });

      // Fecha a notificação depois de 5 segundos
      setTimeout(notification.close.bind(notification), 5000);
    }
    
    
    // Seleciona a caixa de seleção para notificações
const notificationCheckbox = document.getElementById('notification-checkbox');

// Salva a escolha do usuário no LocalStorage
notificationCheckbox.addEventListener('change', function() {
  localStorage.setItem('notificationEnabled', this.checked);
});

// Verifica se o usuário marcou a caixa de seleção
const notificationEnabled = localStorage.getItem('notificationEnabled');
if (notificationEnabled !== null) {
  notificationCheckbox.checked = notificationEnabled === 'true';
}


    
// Verifica se o usuário permitiu notificações e configura as notificações
if (notificationEnabled === 'true') {
  if (!('Notification' in window)) {
    console.log('Este navegador não suporta notificações.');
  } else if (Notification.permission === 'granted') {
    // Cria uma notificação com um versículo aleatório a cada duas horas
    setInterval(showRandomVerseNotification, 2 * 60 * 60 * 1000);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        // Cria uma notificação com um versículo aleatório a cada duas horas
        setInterval(showRandomVerseNotification, 2 * 60 * 60 * 1000);
      }
    });
  }
}
    
      }
}
