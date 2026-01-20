const productContainer = document.getElementById("products");

fetch("https://dummyjson.com/products")
  .then(response => response.json())
  .then(data => {
    displayProducts(data.products);
  })
  .catch(error => {
    console.error("Error fetching products:", error);
  });

function displayProducts(products) {
  productContainer.innerHTML = "";

  products.forEach(product => {
    const box = document.createElement("div");
    box.classList.add("box-content");

    box.innerHTML = `
      <h2>${product.title}</h2>
      <div class="box-img" style="background-image:url('${product.thumbnail}')"></div>
      <h3>₹ ${product.price}</h3>
      <p onclick="viewProduct(${product.id})">See more</p>
    `;

    productContainer.appendChild(box);
  });
}

function viewProduct(id) {
  localStorage.setItem("productId", id);
  window.location.href = "product.html";
}

let selectedProduct = null;

function displayProducts(products){
  const box = document.getElementById("products");
  box.innerHTML = "";

  products.forEach(p=>{
    box.innerHTML += `
      <div class="card">
        <img src="${p.thumbnail}">
        <h3>${p.title}</h3>
        <p>₹${p.price}</p>
        <button onclick='seeMore(${JSON.stringify(p)})'>See More</button>
      </div>
    `;
  });
}

function seeMore(product){
  selectedProduct = product;

  document.getElementById("m-img").src = product.thumbnail;
  document.getElementById("m-title").innerText = product.title;
  document.getElementById("m-desc").innerText = product.description;
  document.getElementById("m-brand").innerText = product.brand;
  document.getElementById("m-rating").innerText = product.rating;
  document.getElementById("m-price").innerText = product.price;

  document.getElementById("modal").style.display = "block";
}

function closeModal(){
  document.getElementById("modal").style.display = "none";
}

function addToCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let item = cart.find(i => i.id === selectedProduct.id);
  if(item){
    item.qty++;
  } else {
    cart.push({
      id:selectedProduct.id,
      name:selectedProduct.title,
      price:selectedProduct.price,
      img:selectedProduct.thumbnail,
      qty:1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to Cart");
}

function buyNow(){
  addToCart();
  window.location.href = "cart.html";
}
