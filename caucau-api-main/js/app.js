function buscarTodos() {
  fetch("https://api.disneyapi.dev/character")
    .then(response => response.json())
    .then(data => {
      data.data.forEach(personagem => {
        const personagemElement = document.createElement("div");
        personagemElement.innerHTML = `
          <h2>${personagem.name}</h2>
          <img src="${personagem.imageUrl}" alt="${personagem.name}">
        `;
        document.body.appendChild(personagemElement);
      });
    })
    .catch(error => console.error('Erro ao buscar os personagens:', error));
}

function buscarId(personagemId) {
  fetch(`https://api.disneyapi.dev/character/${personagemId}`)
    .then(response => response.json())
    .then(data => {
      const personagem = data.data;
      const personagemElement = document.createElement("div");
      personagemElement.innerHTML = `
        <h2>${personagem.name}</h2>
        <img src="${personagem.imageUrl}" alt="${personagem.name}">
      `;
      document.body.appendChild(personagemElement);
    })
    .catch(error => console.error('Erro ao buscar detalhes do personagem:', error));
}

function getPersonagemByName(personagemName) {
  fetch(`https://api.disneyapi.dev/character?name=${encodeURIComponent(personagemName)}`)
    .then(response => response.json())
    .then(data => {
      const personagem = data.data[0]; 
      const personagemElement = document.createElement("div");
      personagemElement.innerHTML = `
        <h2>${personagem.name}</h2>
        <img src="${personagem.imageUrl}" alt="${personagem.name}">
      `;
      document.body.appendChild(personagemElement);
    })
  .catch(error => console.error('Erro ao buscar o personagem:', error));
}

function getPersonagensWithGraphQL() {
  const query = `
    query {
      characters(filter: { name: "Mickey Mouse" }) {
        items {
          name
          imageUrl
        }
      }
    }
  `;

  fetch("https://api.disneyapi.dev/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  })
    .then(response => response.json())
    .then(data => {
      const personagem = data.data.characters.items[0];
      const personagemElement = document.createElement("div");
      personagemElement.innerHTML = `
        <h2>${personagem.name}</h2>
        <img src="${personagem.imageUrl}" alt="${personagem.name}">
      `;
      document.body.appendChild(personagemElement);
    })
    .catch(error => console.error('Erro na consulta GraphQL:', error));
}

function searchCharacter() {
  const characterName = document.getElementById("searchInput").value;
  fetch(`https://api.disneyapi.dev/character?name=${encodeURIComponent(characterName)}`)
      .then(response => response.json())
      .then(data => {
          const charactersContainer = document.getElementById("charactersContainer");
          charactersContainer.innerHTML = ""; 

          data.data.forEach(character => {
              const characterElement = document.createElement("div");
              characterElement.classList.add("character-card");

              const characterNameElement = document.createElement("h2");
              characterNameElement.textContent = character.name;

              const characterImageElement = document.createElement("img");
              characterImageElement.src = character.imageUrl;
              characterImageElement.alt = character.name;

              const filmsList = document.createElement("ul");
              character.films.forEach(film => {
                  const filmItem = document.createElement("li");
                  filmItem.textContent = film;
                  filmsList.appendChild(filmItem);
              });

              const tvShowsList = document.createElement("ul");
              character.tvShows.forEach(tvShow => {
                  const tvShowItem = document.createElement("li");
                  tvShowItem.textContent = tvShow;
                  tvShowsList.appendChild(tvShowItem);
              });

              const videoGamesList = document.createElement("ul");
              character.videoGames.forEach(videoGame => {
                  const videoGameItem = document.createElement("li");
                  videoGameItem.textContent = videoGame;
                  videoGamesList.appendChild(videoGameItem);
              });

              characterElement.appendChild(characterNameElement);
              characterElement.appendChild(characterImageElement);

              const characterDetailsElement = document.createElement("div");
              characterDetailsElement.classList.add("character-details");
              characterDetailsElement.innerHTML = `
                  <h3>Filmes:</h3>
                  ${filmsList.outerHTML}
                  <h3>Séries de TV:</h3>
                  ${tvShowsList.outerHTML}
                  <h3>Jogos de Vídeo:</h3>
                  ${videoGamesList.outerHTML}
              `;
              characterElement.appendChild(characterDetailsElement);

              charactersContainer.appendChild(characterElement);
          });

          // Exibir o container de personagens após a pesquisa
          charactersContainer.style.display = "block";
          charactersContainer.className='search-container'
         
      })
      .catch(error => console.error('Erro ao buscar o personagem:', error));
}
// buscarTodos();
// buscarId(308);
// getPersonagemByName("Mickey Mouse"); 
// getPersonagensWithGraphQL();

function validacao() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmSenha = document.getElementById('confirmSenha').value;

 
  if (nome === '' || email === '' || senha === '' || confirmSenha === '') {
      alert('Por favor, preencha todos os campos.');
      return;
  }

 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
  }

  
  if (senha.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres.");
      return;
  }

 
  if (confirmSenha !== senha) {
      alert("As senhas não coincidem.");
      return;
  }
}  