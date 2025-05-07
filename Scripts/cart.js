document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  renderCartItems(cart);
  updateSummary(cart);

  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("fullname").value;
      const email = document.getElementById("email").value;
      const address = document.getElementById("address").value;

      showConfirmDialog(name);
      const modal = bootstrap.Modal.getInstance(document.getElementById("checkoutModal"));
      if (modal) modal.hide();
      localStorage.removeItem("cart");
      cart = [];
      renderCartItems(cart);
      updateSummary(cart);
    });
  }

  const topBar = document.getElementById("topBar");
  const closeBtn = document.getElementById("topBarDismiss");
  const signUpBtn = document.getElementById("topBarClose");

  closeBtn?.addEventListener("click", () => (topBar.style.display = "none"));
  signUpBtn?.addEventListener("click", () => (topBar.style.display = "none"));
});

function renderCartItems(cart) {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  if (!cart.length) {
    cartItemsContainer.innerHTML = `<p>Your cart is empty.</p>`;
    return;
  }

  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item d-flex align-items-center justify-content-between";

    const itemTotal = item.price * item.quantity;

    itemElement.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${item.image}" class="cart-img me-3" alt="${item.title}" />
        <div>
          <h6>${item.title}</h6>
          <p class="mb-0">$${item.price} x <span class="item-qty">${item.quantity}</span></p>
          <strong>$<span class="item-total">${itemTotal.toFixed(2)}</span></strong>
        </div>
      </div>
      <div class="cart-item-right">
        <button class="btn-trash"><i class="fas fa-trash-alt"></i></button>
        <div class="quantity-control">
          <button type="button" class="decrease-btn">−</button>
          <span class="item-qty">${item.quantity}</span>
          <button type="button" class="increase-btn">+</button>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(itemElement);

    const qtySpan = itemElement.querySelector(".quantity-control .item-qty");
    const totalSpan = itemElement.querySelector(".item-total");

    // Delete item
    itemElement.querySelector(".btn-trash").addEventListener("click", () => {
      cart = cart.filter((i) => i.id !== item.id);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems(cart);
      updateSummary(cart);
    });

    // Increase quantity
    itemElement.querySelector(".increase-btn").addEventListener("click", () => {
      item.quantity += 1;
      qtySpan.textContent = item.quantity;
      totalSpan.textContent = (item.price * item.quantity).toFixed(2);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateSummary(cart);
    });

    // Decrease quantity
    itemElement.querySelector(".decrease-btn").addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity -= 1;
        qtySpan.textContent = item.quantity;
        totalSpan.textContent = (item.price * item.quantity).toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateSummary(cart);
      }
    });
  });

}

function updateSummary(cart) {
  const subtotalElem = document.getElementById("subtotal");
  const discountElem = document.getElementById("discount");
  const deliveryElem = document.getElementById("delivery");
  const totalElem = document.getElementById("total");

  let originalSubtotal = 0;
  let subtotal = 0;
  let discount = 0;

  cart.forEach((item) => {
    console.log(item);
    const discountPercent = !isNaN(parseFloat(item.discount)) ? parseFloat(item.discount) : 0;
    const discountedPrice = item.price * (1 - discountPercent / 100);

    originalSubtotal += item.price * item.quantity;
    subtotal += discountedPrice * item.quantity;
    discount += (item.price - discountedPrice) * item.quantity;
  });

  delivery = subtotal > 0 ? 10 : 0;
  const total = subtotal - discount + delivery;

  subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
  discountElem.textContent = `-$${discount.toFixed(2)}`;
  deliveryElem.textContent = `$${delivery.toFixed(2)}`;
  totalElem.textContent = `$${total.toFixed(2)}`;
}

function showConfirmDialog(userName) {
  const dialog = document.getElementById("confirm-dialog");
  dialog.textContent = `Thank you ${userName}, your order is being processed.`;
  dialog.style.display = "block";

  setTimeout(() => {
    dialog.style.display = "none";
  }, 3000);
}
