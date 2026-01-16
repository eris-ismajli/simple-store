const cartItems = document.getElementById("cartItems")
const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || []

cartItems.textContent = cartProducts.length

function renderCartProducts(products) {
  const productsHolder = document.getElementById("productsHolder");

  productsHolder.innerHTML = "";

  const cartItems = document.getElementById("cartItems");

  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

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

      const addToCart = document.createElement("button");
      addToCart.textContent = "Add to Cart";

      addToCart.addEventListener("click", () => {
        cartProducts.push(product);
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        cartItems.textContent = cartProducts.length;
      });

      productContainer.appendChild(addToCart);
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      productContainer.appendChild(deleteButton);

      deleteButton.addEventListener("click", () => {
        const updatedProducts = products.filter(
          (item, i) => i !== index
        );
        products = updatedProducts;
        renderCartProducts(updatedProducts);
      });    
    productsHolder.appendChild(productContainer);
  });
}


fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => renderCartProducts(data))
    .catch(error => console.log(error))