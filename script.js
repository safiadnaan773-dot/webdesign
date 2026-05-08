// ================= SIDEBAR TOGGLE =================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// ================= ENDPOINT TOGGLE =================

const toggleButtons = document.querySelectorAll(".toggle-btn");

toggleButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const body =
      button.parentElement.nextElementSibling;

    if (body.style.display === "block") {
      body.style.display = "none";
    }
    else {
      body.style.display = "block";
    }

  });

});

// ================= COPY BUTTON =================

const copyButtons = document.querySelectorAll(".copy-btn");

copyButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const code =
      button.parentElement
      .querySelector("pre code")
      .innerText;

    navigator.clipboard.writeText(code);

    button.innerText = "Copied!";

    setTimeout(() => {
      button.innerText = "Copy Request";
    }, 2000);

  });

});

// ================= CODE TABS =================

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {

  button.addEventListener("click", () => {

    tabButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    tabContents.forEach((content) => {
      content.classList.remove("active");
    });

    button.classList.add("active");

    document
      .getElementById(button.dataset.tab)
      .classList.add("active");

  });

});

// ================= SEARCH =================

const searchInput = document.getElementById("searchInput");

const searchableCards =
  document.querySelectorAll(".searchable");

searchInput.addEventListener("keyup", () => {

  const value =
    searchInput.value.toLowerCase();

  searchableCards.forEach((card) => {

    const text =
      card.innerText.toLowerCase();

    if (text.includes(value)) {
      card.style.display = "block";
    }
    else {
      card.style.display = "none";
    }

  });

});

// ================= DARK MODE =================

const themeToggle =
  document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

  if (
    document.body.classList.contains("light-mode")
  ) {
    themeToggle.innerHTML =
      '<i class="bi bi-sun-fill"></i>';
  }
  else {
    themeToggle.innerHTML =
      '<i class="bi bi-moon-fill"></i>';
  }

});

// ================= FAKE DATABASE =================
let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" }
];

// ================= API SIMULATION =================
function sendRequest() {

  const endpoint = document.getElementById("endpointInput").value;
  const method = document.getElementById("methodInput").value;
  const body = document.getElementById("bodyInput").value;
  const responseBox = document.getElementById("responseBox");

  responseBox.innerText = "Loading...";

  setTimeout(() => {

    try {

      // GET USERS
      if (endpoint === "/users" && method === "GET") {
        responseBox.innerText = JSON.stringify(users, null, 2);
      }

      // POST USER
      else if (endpoint === "/users" && method === "POST") {

        const data = JSON.parse(body || "{}");

        if (!data.name) throw "Name required";

        const newUser = {
          id: users.length + 1,
          name: data.name
        };

        users.push(newUser);

        responseBox.innerText = JSON.stringify({
          message: "User created",
          user: newUser
        }, null, 2);
      }

      // DELETE USER
      else if (endpoint.startsWith("/users/") && method === "DELETE") {

        const id = parseInt(endpoint.split("/")[2]);

        users = users.filter(u => u.id !== id);

        responseBox.innerText = JSON.stringify({
          message: "User deleted",
          remaining: users
        }, null, 2);
      }

      else {
        responseBox.innerText = JSON.stringify({
          error: "Endpoint not found"
        }, null, 2);
      }

    }

    catch (err) {
      responseBox.innerText = JSON.stringify({
        error: err.toString()
      }, null, 2);
    }

  }, 800);
}
