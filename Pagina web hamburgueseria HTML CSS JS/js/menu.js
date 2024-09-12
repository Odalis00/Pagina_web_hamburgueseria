document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const contadorProductos = document.getElementById("contador-productos");
  const carrito = document.querySelector(".carrito");
  const cart = document.querySelector(".cart");
  let cartData = {};

  // Manejar el clic en los botones de agregar al carrito
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      addToCart(name, price);
    });
  });

  function addToCart(name, price) {
    if (!cartData[name]) {
      cartData[name] = { price: price, quantity: 0 };
    }
    cartData[name].quantity += 1;
    updateCartDisplay();
    updateProductCount();
  }

  function updateCartDisplay() {
    cartItems.innerHTML = "";
    let total = 0;

    for (const [name, item] of Object.entries(cartData)) {
      const listItem = document.createElement("li");

      const quantitySpan = document.createElement("span");
      quantitySpan.textContent = `x${item.quantity}`;
      quantitySpan.className = "quantity";

      const nameSpan = document.createElement("span");
      nameSpan.textContent = `${name} - $${item.price.toFixed(2)}`;

      const removeButton = document.createElement("button");
      removeButton.className = "remove-btn";
      removeButton.innerHTML = "&times;"; // Icono de eliminar
      removeButton.addEventListener("click", () => {
        delete cartData[name];
        updateCartDisplay();
        updateProductCount();
      });

      listItem.appendChild(nameSpan);
      listItem.appendChild(quantitySpan);
      listItem.appendChild(removeButton);

      cartItems.appendChild(listItem);

      total += item.price * item.quantity;
    }

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  function updateProductCount() {
    const totalQuantity = Object.values(cartData).reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    contadorProductos.textContent = totalQuantity;
  }

  // Alternar la visibilidad del carrito
  carrito.addEventListener("click", () => {
    if (cart.style.display === "block") {
      cart.style.display = "none";
    } else {
      cart.style.display = "block";
    }
  });

  // Ocultar el carrito al hacer clic en el botón de cerrar
  document.getElementById("close-cart").addEventListener("click", () => {
    cart.style.display = "none";
  });
});
