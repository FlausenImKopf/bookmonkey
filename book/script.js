// declaring variables for book details

const div = document.querySelector("div");

//variable for error handling
const errorEl = document.getElementById("error");

// state
let state = {
  book: [],
};

// Get id for fetch request
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");
console.log(id);

//refresh function
function refresh() {
  fetch(`http://localhost:4730/books/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      state.book = data;
      state.error = "";
      render();
    })
    .catch(() => {
      state.error = {
        description: "Sorry, we couldn't reach the backend.",
      };
      render();
    });
}

// render function
function render() {
  div.innerHTML = "";
  errorEl.innerHTML = "";

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
  div.append(h2, img, h3, p, ul);
}

//functions that are called when the app starts
refresh();
