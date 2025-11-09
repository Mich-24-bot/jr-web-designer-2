// ===============================
// pages.js — Main JavaScript Logic (Font Awesome + Polished)
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  // ✅ Add item to cart
  function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if already exists
    let existing = cart.find(item => item.name === productName);
    if (existing) {
      alert("⚠️ " + productName + " is already in your cart!");
      return;
    }

    // Add new item
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("🛒 " + productName + " added to cart!");
  }

  // ✅ Reset event listeners safely
  document.querySelectorAll(".btn-add-cart").forEach(button => {
    const clone = button.cloneNode(true);
    button.parentNode.replaceChild(clone, button);
  });

  // ✅ Attach "Add to Cart" functionality
  document.querySelectorAll(".btn-add-cart").forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const name = this.getAttribute("data-name");
      const price = parseFloat(this.getAttribute("data-price"));
      addToCart(name, price);
    });
  });

  // ✅ Display cart if on cart.html
  const cartSection = document.getElementById("cart-items");
  if (cartSection) {
    displayCart();
  }

  // ✅ Render cart contents
  function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartSection = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartSection.innerHTML = "";

    if (cart.length === 0) {
      cartSection.innerHTML = `
        <p><i class="fa-solid fa-cart-shopping"></i> Your cart is empty.</p>
      `;
      cartTotal.innerHTML = "<strong>Total: $0</strong>";
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <p><i class="fa-solid fa-shirt"></i> ${item.name} — $${item.price.toFixed(2)}</p>
        <button class="remove-item" data-index="${index}">
          <i class="fa-solid fa-trash"></i> Remove
        </button>
      `;
      cartSection.appendChild(div);
    });

    cartTotal.innerHTML = `
      <strong><i class="fa-solid fa-dollar-sign"></i> Total: $${total.toFixed(2)}</strong>
    `;

    // ✅ Add remove button logic
    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        removeFromCart(index);
      });
    });
  }

  // ✅ Remove item from cart
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  }

  // ✅ Clear all cart items
  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      localStorage.removeItem("cart");
      displayCart();
    });
  }
});
