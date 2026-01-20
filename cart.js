const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
const productsHolder = document.getElementById("productsHolder");
const totalPriceEl = document.getElementById("totalPrice")
const noProductsMsg = document.getElementById("noProductsMsg")
const totalProducts = document.getElementById("totalProducts")

function renderCartProducts(products) {

  const totalPrice = products.reduce((total, product) => total + product.price, 0)
  totalPriceEl.textContent = `Total price: $${totalPrice.toFixed(2)}`; 

  productsHolder.innerHTML = "";

  if (products.length === 0) noProductsMsg.textContent = "No items in your cart."
  
  if (products.length > 0) {
    totalProducts.textContent = `Total products: ${products.length}`
  } else {
    totalProducts.textContent = ""
  }

  products.forEach((product, index) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product-container");

    const productImg = document.createElement("img");
    productImg.src = product.image;

    const productTitle = document.createElement("h4");
    productTitle.textContent = product.title;

    const productCategory = document.createElement("p");
    productCategory.textContent = product.category;

    const productPrice = document.createElement("h4");
    productPrice.textContent = "$" + product.price;

    productContainer.appendChild(productImg);
    productContainer.appendChild(productCategory);
    productContainer.appendChild(productTitle);
    productContainer.appendChild(productPrice);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete from cart";
    productContainer.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
      const updatedProducts = products.filter((item, i) => i !== index);
      localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
      renderCartProducts(updatedProducts, true);
    });

    productsHolder.appendChild(productContainer);
  });
}

renderCartProducts(cartProducts, true);

// https://github.com/eris-ismajli/simple-store
