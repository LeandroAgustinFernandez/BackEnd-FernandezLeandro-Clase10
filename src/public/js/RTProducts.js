const socket = io();
const createForm = document.querySelector(".create_form");
const productsContainer = document.querySelector(".products_list");

socket.on("products", (productos) => {
  productsContainer.innerHTML = "";
  const fragment = new DocumentFragment();
  productos.forEach((item) => {
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

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const product = Object.fromEntries(new FormData(e.target));
  product.thumbnails = [];
  console.log(product);
  let res = await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  let message = await res.json();
  if (message?.success) {
    alert(message.success);
    createForm.reset();
  } else {
    alert(message.error);
  }
});

productsContainer.addEventListener("click",async (e) => {
  if (e.target.classList.contains("delete_btn")) {
    let res = await fetch(`/api/products/${e.target.id}`,{method: 'delete'})
    let message = await res.json();
    if (message?.success) {
      alert(message.success);
      createForm.reset();
    } else {
      alert(message.error);
    }
  }
});
