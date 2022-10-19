const usersAndCards = JSON.parse(localStorage.getItem("ids") || "[]");
const idUser = usersAndCards[0].id;
renderCards();

const addBtn = document.getElementById("addButton") as HTMLButtonElement;

const welcome = document.getElementById("NameSpace") as HTMLInputElement;

const deleteBtn = document.getElementById("deleteBtn") as HTMLButtonElement;

welcome.innerHTML = "<b>Welcome, </b>" + usersAndCards[0].name;

addBtn.onclick = () => {
  const data = {
    title: "",
    message: "",
    archive: "false",
  };

  const card = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(`http://localhost:3333/user/${idUser}/errand`, card).catch((e) => {
    console.log(e);
  });

  renderCards();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function editCards(id: string) {
  const titleAuto = document.getElementById("titulo_" + id) as HTMLInputElement;
  const anotacaoAuto = document.getElementById(
    "anotacao_" + id
  ) as HTMLTextAreaElement;

  const data = {
    title: titleAuto.value,
    message: anotacaoAuto.value,
    archive: "false",
  };

  const edit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(`http://localhost:3333/user/${idUser}/errand/${id}`, edit).catch(
    (e) => {
      console.log(e);
    }
  );

  renderCards();
}

//eslint-disable-next-line @typescript-eslint/no-unused-vars
function deleteCards(id: string) {
  const dell = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`http://localhost:3333/user/${idUser}/errand/${id}`, dell).then((res) =>
    res.text()
  );

  renderCards();
}

function renderCards() {
  fetch(`http://localhost:3333/user/${idUser}`)
    .then((reponse) => reponse.json())
    .then((user) => {
      const cardsEle = document.querySelector("#cards") as HTMLElement;
      cardsEle.innerHTML = "";
      user.map(
        (card: {
          idErrand: string;
          title: string;
          message: string;
          archive: string;
        }) => {
          const cardEle = document.createElement("div");
          cardEle.classList.add("card");
          cardEle.innerHTML =
            '<textarea type="textarea" onblur=editCards(' +
            '"' +
            card.idErrand +
            '"' +
            ') class="titulo" id="titulo_' +
            card.idErrand +
            '" placeholder="Titulo" style="resize: none;" size="18" maxlength="18">' +
            card.title +
            "</textarea>" +
            '<textarea type="textarea" onblur=editCards(' +
            '"' +
            card.idErrand +
            '"' +
            ') class="anotacao" id="anotacao_' +
            card.idErrand +
            '" placeholder="Escreva sua anotação aqui" style="resize: none;">' +
            card.message +
            "</textarea>" +
            '<div class="editaButtons">' +
            '<button id="excluirBtn" data-bs-toggle="modal" onClick=filterCards(' +
            '"' +
            card.idErrand +
            '"' +
            ') data-bs-target="#exampleModal"class="excluirButton"(' +
            '"' +
            card.idErrand +
            '"' +
            ')"></button>' +
            "</div>";
          cardsEle.append(cardEle);
        }
      );
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function filterCards(id: string) {
  deleteBtn.onclick = () => {
    deleteCards(id);
  };
}
