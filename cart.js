const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

function renderProducts(products) {
  const productsHolder = document.getElementById("productsHolder");

  productsHolder.innerHTML = "";

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
      renderProducts(updatedProducts, true);
    });

    productsHolder.appendChild(productContainer);
  });
}

renderProducts(cartProducts, true);

// https://github.com/eris-ismajli/simple-store
