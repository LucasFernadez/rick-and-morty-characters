let currentPage = 1;
const characterList = document.getElementById('character-list');
const nextButton = document.getElementById('next-page');
const prevButton = document.getElementById('prev-page');

async function fetchCharacters(page) {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
    const data = await res.json();

    renderCharacters(data.results);
    updateButtons(data.info.pages);
  } catch (error) {
    console.error('Error al cargar personajes:', error);
  }
}

function renderCharacters(personajes) {
  characterList.innerHTML = '';

  personajes.forEach(personaje => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${personaje.image}" alt="${personaje.name}" width="200" height="200" style="border-radius: 10px;">
      <h3>${personaje.name}</h3>
      <p>${personaje.species}</p>
    `;
    li.style.listStyle = 'none';
    li.style.margin = '20px';
    li.style.textAlign = 'center';
    li.style.display = 'inline-block';

    characterList.appendChild(li);
  });
}

function updateButtons(totalPages) {
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

nextButton.addEventListener('click', () => {
  currentPage++;
  fetchCharacters(currentPage);
});

prevButton.addEventListener('click', () => {
  currentPage--;
  fetchCharacters(currentPage);
});

fetchCharacters(currentPage);
