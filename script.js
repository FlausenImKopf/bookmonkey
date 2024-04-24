// declaring variables for book list
const ul = document.getElementById("unordered-book-list");

//variable for error handling
const errorEl = document.getElementById("error");

// state
let state = {
  books: [],
};

//refresh function
function refresh() {
  fetch("http://localhost:4730/books")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      state.books = data;
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
  // Tisch abräumen
  ul.innerHTML = "";
  errorEl.innerHTML = "";

  // error handling
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

  // rendering each book
  state.books.forEach((book) => {
    const h2 = document.createElement("h2");
    h2.textContent = book.title;

    const img = document.createElement("img");
    img.setAttribute("src", book.cover);
    img.setAttribute("alt", "A Cover Picture of the book.");

    const span = document.createElement("span");
    span.textContent = "ISBN: " + book.isbn;

    const a = document.createElement("a");
    a.setAttribute("href", `/book/index.html?id=${book.id}`);
    a.append(h2, img);

    const li = document.createElement("li");
    li.append(a, span);

    ul.append(li);
  });
}

//functions that are called when the app starts
refresh();
