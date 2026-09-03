/* =========================
   LOGIN PAGE
========================= */

const loginForm = document.querySelector(".login-form");
const loginContainer = document.querySelector(".login-container");
const homePage = document.querySelector(".homepage");

if (loginContainer && homePage) {
  if (localStorage.getItem("isLoggedIn") === "true") {
    loginContainer.style.display = "none";
    homePage.style.display = "block";
  }
}

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    localStorage.setItem("isLoggedIn", "true");

    if (loginContainer) {
      loginContainer.style.display = "none";
    }

    if (homePage) {
      homePage.style.display = "block";
    }
  });
}


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menu-btn");
const navItem = document.querySelector(".nav-item");

if (menuBtn && navItem) {
  menuBtn.addEventListener("click", function () {
    navItem.classList.toggle("active");
  });
}


/* =========================
   ACTIVE NAV LINK
========================= */

const currentPage =
  window.location.pathname.split("/").pop() || "index.html";

const navLinks = document.querySelectorAll(".nav-item a");

navLinks.forEach(function (link) {

  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }

});


/* =========================
   PRODUCT CLICK
========================= */
/* =========================
   PRODUCT CLICK
========================= */

const products = document.querySelectorAll(".pro");

products.forEach(function (product) {

  product.addEventListener("click", function (event) {

    // If cart icon/button is clicked, don't open product page
    if (event.target.closest(".cart")) {
      return;
    }

    const imageElement = product.querySelector("img");
    const nameElement = product.querySelector(".des h5");
    const priceElement = product.querySelector(".des h4");

    // Check if product data exists
    if (!imageElement) {
      console.log("Product image not found");
      return;
    }

    if (!nameElement) {
      console.log("Product name not found");
      return;
    }

    if (!priceElement) {
      console.log("Product price not found");
      return;
    }

    // Get product information
    const image = imageElement.src;
    const name = nameElement.textContent.trim();
    const price = priceElement.textContent.trim();

    // Save product information
    localStorage.setItem("productImage", image);
    localStorage.setItem("productName", name);
    localStorage.setItem("productPrice", price);

    console.log("Product saved:");
    console.log(name);
    console.log(price);
    console.log(image);

    // Open product page
    window.location.href = "./sproduct.html";

  });

});


/* =========================
   SINGLE PRODUCT PAGE
========================= */

const mainImage = document.getElementById("MainImg");

if (mainImage) {

  // Get saved product information
  const image = localStorage.getItem("productImage");
  const name = localStorage.getItem("productName");
  const price = localStorage.getItem("productPrice");

  // Show image
  if (image) {
    mainImage.src = image;
  }

  // Show product name
  const productName =
    document.querySelector(".single-pro-details h4");

  if (productName && name) {
    productName.innerText = name;
  }

  // Show product price
  const productPrice =
    document.querySelector(".single-pro-details h2");

  if (productPrice && price) {
    productPrice.innerText = price;
  }

}


/* =========================
   ADD TO CART
========================= */

const addToCart = document.getElementById("addToCart");

if (addToCart) {

  addToCart.addEventListener("click", function () {

    const image = localStorage.getItem("productImage");
    const name = localStorage.getItem("productName");
    const price = localStorage.getItem("productPrice");

    const quantityInput =
      document.querySelector(".single-pro-details input");

    let quantity = 1;

    if (quantityInput) {
      quantity = Number(quantityInput.value);

      if (quantity < 1 || isNaN(quantity)) {
        quantity = 1;
      }
    }

    // Get existing cart
    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists
    const existingProduct = cart.find(function (product) {
      return product.name === name;
    });

    if (existingProduct) {

      existingProduct.quantity += quantity;

    } else {

      const product = {
        image: image,
        name: name,
        price: price,
        quantity: quantity
      };

      cart.push(product);

    }

    // Save cart
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Product added to cart!");

  });

}


/* =========================
   SHOW CART PRODUCTS
========================= */

const cartItems = document.getElementById("cartItems");

if (cartItems) {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  cartItems.innerHTML = "";

  cart.forEach(function (product, index) {

    // Convert price to number
    const price = parseFloat(
      String(product.price).replace(/[^0-9.]/g, "")
    ) || 0;

    // Calculate total
    const total =
      price * Number(product.quantity);

    // Create row
    const row =
      document.createElement("tr");

    row.innerHTML = `

      <td>
        <img
          src="${product.image}"
          width="80"
          height="80"
          alt="${product.name}"
        >
      </td>

      <td>
        ${product.name}
      </td>

      <td>
        ${product.price}
      </td>

      <td>

        <button
          onclick="decreaseQuantity(${index})">
          -
        </button>

        <span class="cart-quantity">
          ${product.quantity}
        </span>

        <button
          onclick="increaseQuantity(${index})">
          +
        </button>

      </td>

      <td>
        ₹${total.toFixed(2)}
      </td>

      <td>

        <button
          onclick="removeFromCart(${index})">
          Remove
        </button>

      </td>

    `;

    cartItems.appendChild(row);

  });

}


/* =========================
   INCREASE QUANTITY
========================= */

function increaseQuantity(index) {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index]) {

    cart[index].quantity =
      Number(cart[index].quantity) + 1;

  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  location.reload();
}


/* =========================
   DECREASE QUANTITY
========================= */

function decreaseQuantity(index) {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  if (
    cart[index] &&
    Number(cart[index].quantity) > 1
  ) {

    cart[index].quantity =
      Number(cart[index].quantity) - 1;

  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  location.reload();
}


/* =========================
   REMOVE PRODUCT
========================= */

function removeFromCart(index) {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index]) {
    cart.splice(index, 1);
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  location.reload();
}


/* =========================
   BLOG
========================= */

const readMoreButtons =
  document.querySelectorAll(".read-more");

readMoreButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const page =
      button.getAttribute("data-page");

    if (page) {
      window.location.href = page;
    }

  });

});


/* =========================
   SHOP NOW
========================= */

const shopNow =
  document.getElementById("shopNow");

if (shopNow) {

  shopNow.addEventListener("click", function () {

    window.location.href = "./shop.html";

  });

}