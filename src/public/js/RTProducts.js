const socket = io();
const createForm = document.querySelector(".create_form");
const productsContainer = document.querySelector(".products_list");

socket.on("products", (data) => {
  productsContainer.innerHTML = "";
  const fragment = new DocumentFragment();
  data.forEach((item) => {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const pDescription = document.createElement("p");
    const pStock = document.createElement("p");
    const pPrice = document.createElement("p");
    const btn = document.createElement("button");
    div.classList.add("product");
    h3.textContent = `Title: ${item.title}`;
    pDescription.textContent = `Description: ${item.description}`;
    pStock.textContent = `Stock: ${item.stock}`;
    pPrice.textContent = `Price: ${item.price}`;
    btn.textContent = "Delete";
    btn.classList.add("delete_btn");
    btn.id = item.id;
    div.append(h3, pDescription, pStock, pPrice, btn);
    fragment.appendChild(div);
  });
  productsContainer.appendChild(fragment);
});

socket.on("response", (data) => {
  if (data?.success) {
    alert(data.success);
    createForm.reset();
  } else {
    alert(data.error);
  }
});

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const product = Object.fromEntries(new FormData(e.target));
  product.thumbnails = [];
  socket.emit("add", product);
});

productsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete_btn")) {
    socket.emit("delete", e.target.id);
  }
});
