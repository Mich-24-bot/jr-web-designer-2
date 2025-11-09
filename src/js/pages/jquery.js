// ===============================
// jquery.js — Shop & Cart Logic (Final Version)
// ===============================

$(document).ready(function () {
  // =====================================
  // ✅ Add Item to Cart
  // =====================================
  function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Prevent duplicates
    const exists = cart.find(item => item.name === name);
    if (exists) {
      showToast(`⚠️ ${name} is already in your cart.`);
      return;
    }

    // Add new product
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    showToast(`🛒 ${name} added to cart!`);
  }

  // =====================================
  // ✅ Toast Notification (User Feedback)
  // =====================================
  function showToast(message) {
    // Remove any existing toast first
    $(".toast").remove();

    const $toast = $(`
      <div class="toast">
        ${message}
      </div>
    `);

    $("body").append($toast);

    $toast.fadeIn(200).delay(1500).fadeOut(400, function () {
      $(this).remove();
    });
  }

  // =====================================
  // ✅ Handle "Add to Cart" Button Click
  // =====================================
  $(".btn-add-cart").off("click").on("click", function (e) {
    e.preventDefault();

    const name = $(this).data("name");
    const price = parseFloat($(this).data("price"));

    addToCart(name, price);
  });

  // =====================================
  // ✅ Display Cart Items
  // =====================================
  function displayCart() {
    const $cartItems = $("#cart-items");
    const $cartTotal = $("#cart-total");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    $cartItems.empty();

    if (cart.length === 0) {
      $cartItems.html(`<p>Your cart is empty 🛍️</p>`);
      $cartTotal.html(`<strong>Total: $0</strong>`);
      return;
    }

    // Render each cart item
    $.each(cart, function (index, item) {
      total += item.price;
      $cartItems.append(`
        <div class="cart-item">
          <p><i class="fa-solid fa-shirt"></i> ${item.name} — $${item.price.toFixed(2)}</p>
          <button class="remove-item" data-index="${index}">
            <i class="fa-solid fa-trash"></i> Remove
          </button>
        </div>
      `);
    });

    // Update total
    $cartTotal.html(`<strong>Total: $${total.toFixed(2)}</strong>`);
  }

  // =====================================
  // ✅ Remove Single Item
  // =====================================
  $(document).on("click", ".remove-item", function () {
    const index = $(this).data("index");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
    showToast("🗑️ Item removed!");
  });

  // =====================================
  // ✅ Clear Entire Cart
  // =====================================
  $("#clear-cart").on("click", function () {
    if (confirm("Are you sure you want to clear your cart?")) {
      localStorage.removeItem("cart");
      displayCart();
      showToast("🧹 Cart cleared!");
    }
  });

  // =====================================
  // ✅ Initialize Cart Display (on cart.html)
  // =====================================
  if ($("#cart-items").length) {
    displayCart();
  }

});
