//variables
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const isbn = document.getElementById("isbn");
const abstract = document.getElementById("abstract");
const numPages = document.getElementById("numPages");
const publisher = document.getElementById("publisher");
const price = document.getElementById("price");
const cover = document.getElementById("cover");

const main = document.querySelector("main");
const addNewBookForm = document.getElementById("add-new-book-form");
const errorEl = document.getElementById("error");

// state
let state = {
  book: null,
};

function fetchNewBook() {
  fetch(`http://localhost:4730/books/${isbn.value}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network Error`);
      }
      return response.json();
    })
    .then((data) => {
      state.book = data;
      state.error = "";
      render();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      state.error = {
        description: "Sorry, we couldn't reach the backend.",
      };
      render();
    });
}

// add a new book
function addNewBook() {
  const newBook = {
    title: title.value,
    subtitle: subtitle.value,
    isbn: isbn.value,
    abstract: abstract.value,
    numPages: numPages.value,
    author: author.value,
    publisher: publisher.value,
    price: price.value,
    cover: cover.value,
  };

  fetch("http://localhost:4730/books", {
    method: "POST",
    body: JSON.stringify(newBook),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json();
    })
    .then(() => {
      fetchNewBook();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      state.error = {
        description: "Sorry, we couldn't reach the backend.: " + error,
      };
      console.log(state.error);
    });
}

function render() {
  errorEl.innerHTML = "";

  //error handling
  if (state.error) {
    errorEl.textContent = state.error.description;
    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.addEventListener("click", () => {
      state.error = "";
      render();
    });
    errorEl.append(closeButton);
  }
  setTimeout(function () {
    errorEl.innerHTML = "";
  }, 6000);

  if (!state.book) {
    return;
  }

  main.innerHTML = "";

  const h2 = document.createElement("h2");
  h2.textContent = state.book.title;

  const img = document.createElement("img");
  img.setAttribute("src", state.book.cover);
  img.setAttribute("alt", "A Cover Picture of the book.");

  const h3 = document.createElement("h3");
  h3.textContent = state.book.author;

  const p = document.createElement("p");
  p.textContent = state.book.abstract;

  const ul = document.createElement("ul");

  const li1 = document.createElement("li");
  li1.textContent = state.book.publisher;

  const li2 = document.createElement("li");
  li2.textContent = state.book.numPages;

  const li3 = document.createElement("li");
  li3.textContent = state.book.isbn;

  const li4 = document.createElement("li");
  li4.textContent = state.book.price;

  ul.append(li1, li2, li3, li4);
  main.append(h2, img, h3, p, ul);
}

render();

addNewBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addNewBook();
});
