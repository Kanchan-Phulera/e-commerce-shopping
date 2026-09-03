// MOBILE MENU

const menuBtn = document.getElementById("menu-btn");
const navItem = document.querySelector(".nav-item");

if (menuBtn && navItem) {
  menuBtn.addEventListener("click", function () {
    navItem.classList.toggle("active");
  });
}

// ACTIVE NAV LINK

const currentPage = window.location.pathname.split("/").pop() || "index.html";

const navLinks = document.querySelectorAll(".nav-item a");

navLinks.forEach(function (link) {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// PRODUCT CLICK

const products = document.querySelectorAll(".pro");

products.forEach(function (product) {
  product.addEventListener("click", function (event) {
    // Don't open product page if cart is clicked
    if (event.target.closest(".cart")) {
      return;
    }

    // Get product information
    const image = product.querySelector("img").src;

    const name = product.querySelector(".des h5").innerText;

    const price = product.querySelector(".des h4").innerText;

    // Save product information
    localStorage.setItem("productImage", image);
    localStorage.setItem("productName", name);
    localStorage.setItem("productPrice", price);

    // Open single product page
    window.location.href = "sproduct.html";
  });
});

/* single product */

const mainImage = document.getElementById("MainImg");

if (mainImage) {
  // Get saved product information
  const image = localStorage.getItem("productImage");

  const name = localStorage.getItem("productName");

  const price = localStorage.getItem("productPrice");

  // Show product image
  if (image) {
    mainImage.src = image;
  }

  // Show product name
  const productName = document.querySelector(".single-pro-details h4");

  if (productName && name) {
    productName.innerText = name;
  }

  // Show product price
  const productPrice = document.querySelector(".single-pro-details h2");

  if (productPrice && price) {
    productPrice.innerText = price;
  }
}

/* add to cart */

const addToCart = document.getElementById("addToCart");

if (addToCart) {
  addToCart.addEventListener("click", function () {
    const image = localStorage.getItem("productImage");

    const name = localStorage.getItem("productName");

    const price = localStorage.getItem("productPrice");

    const quantity = Number(
      document.querySelector(".single-pro-details input").value,
    );

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
        quantity: quantity,
      };

      cart.push(product);
    }

    // Save cart
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
  });
}

/* show cart product */
/* show cart product */

const cartItems = document.getElementById("cartItems");

if (cartItems) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach(function (product, index) {

    const price = parseFloat(
      String(product.price).replace(/[^0-9.]/g, "")
    );

    const total = price * product.quantity;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <img src="${product.image}" width="80" height="80">
      </td>

      <td>
        ${product.name}
      </td>

      <td>
        ${product.price}
      </td>

      <td>
        <button onclick="decreaseQuantity(${index})">-</button>

        <span class="cart-quantity">
          ${product.quantity}
        </span>

        <button onclick="increaseQuantity(${index})">+</button>
      </td>

      <td>
        $${total.toFixed(2)}
      </td>

      <td>
        <button onclick="removeFromCart(${index})">
          Remove
        </button>
      </td>
    `;

    cartItems.appendChild(row);
  });
}
   

/* increase quantity */

function increaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index]) {
    cart[index].quantity++;
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  location.reload();
}

/* decrease quantity */

function decreaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index] && cart[index].quantity > 1) {
    cart[index].quantity--;
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  location.reload();
}

/* remove product */

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  location.reload();
}


/* blog */
const readMoreButtons =
  document.querySelectorAll(".read-more");

readMoreButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const page =
      button.getAttribute("data-page");

    window.location.href = page;

  });

});

/* shop */
const shopNow = document.getElementById("shopNow");

shopNow.addEventListener("click", function () {
    window.location.href = "shop.html";
});