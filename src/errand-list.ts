const usersAndCards = JSON.parse(localStorage.getItem('users') || '[]');
const indexUser = JSON.parse(localStorage.getItem('indexUserLogged') || '[]');
const cards = usersAndCards[indexUser].cards;
renderCards();

const addBtn = document.getElementById('addButton') as HTMLButtonElement;

const welcome = document.getElementById('NameSpace') as HTMLInputElement;

const deleteBtn = document.getElementById('deleteBtn') as HTMLButtonElement;

welcome.innerHTML = '<b>Welcome, </b>' + usersAndCards[indexUser].username;

addBtn.onclick = () => {
  const card = {
    id: null,
    title: '',
    description: '',
  };

  cards.push(card);
  renderCards();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function editCards(index: string) {
  const titleAuto = document.getElementById(
    'titulo_' + index
  ) as HTMLInputElement;
  const bufferOne = titleAuto.value;

  const anotacaoAuto = document.getElementById(
    'anotacao_' + index
  ) as HTMLTextAreaElement;
  const bufferTwo = anotacaoAuto.value;

  cards[index].title = bufferOne;
  cards[index].description = bufferTwo;

  renderCards();
  saveCards();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function deleteCards(index: string) {
  cards.splice(index, 1);
  saveCards();
  renderCards();
}

function saveCards() {
  usersAndCards[indexUser].cards = cards;
  localStorage.setItem('users', JSON.stringify(usersAndCards));
}

function renderCards() {
  const cardsEle = document.querySelector('#cards') as HTMLElement;
  cardsEle.innerHTML = '';
  cards.map(
    (
      card: {id: unknown; title: string; description: string},
      index: string
    ) => {
      card.id = index;
      const cardEle = document.createElement('div');
      cardEle.classList.add('card');
      cardEle.innerHTML =
        '<textarea type="textarea" onblur="editCards(' +
        index +
        ')" class="titulo" id="titulo_' +
        index +
        '" placeholder="Titulo" style="resize: none;" size="18" maxlength="18">' +
        card.title +
        '</textarea>' +
        '<textarea type="textarea" onblur="editCards(' +
        index +
        ')" class="anotacao" id="anotacao_' +
        index +
        '" placeholder="Escreva sua anotação aqui" style="resize: none;">' +
        card.description +
        '</textarea>' +
        '<div class="editaButtons">' +
        '<button id="excluirBtn" data-bs-toggle="modal" onClick=filterCards(' +
        index +
        ') data-bs-target="#exampleModal"class="excluirButton"(' +
        index +
        ')"></button>' +
        '</div>';
      cardsEle.append(cardEle);
    }
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function filterCards(index: string) {
  deleteBtn.onclick = () => {
    deleteCards(index);
  };
}
