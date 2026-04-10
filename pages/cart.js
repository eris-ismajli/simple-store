import { getRatingColor } from "../utils/getRatingColor.js";

const CART_PRODUCTS = "cartProducts";

function getCartProducts() {
  return JSON.parse(localStorage.getItem(CART_PRODUCTS) || []);
}

const savedCartProducts = getCartProducts();

const productsList = document.getElementById("productsList");

function renderCartProducts() {
  productsList.innerHTML = "";
  savedCartProducts.forEach((product, index) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("productCard");
    const productImage = document.createElement("img");
    productImage.src = product.image;

    const category = document.createElement("p");
    category.textContent = product.category;

    const title = document.createElement("h3");
    title.textContent = product.title;

    const rating = document.createElement("p");
    rating.textContent = product.rating;

    const ratingProgressBg = document.createElement("div");
    ratingProgressBg.style.width = "100%";
    ratingProgressBg.style.height = "6px";
    ratingProgressBg.style.backgroundColor = "#e0e0e0";
    ratingProgressBg.style.borderRadius = "3px";
    ratingProgressBg.style.overflow = "hidden";
    ratingProgressBg.style.marginBottom = "8px";

    const ratingProgressBar = document.createElement("div");
    // Calculate width based on rating out of 5
    const ratingPercentage = (product.rating / 5) * 100;
    ratingProgressBar.style.width = `${ratingPercentage}%`;
    ratingProgressBar.style.height = "100%";
    ratingProgressBar.style.backgroundColor = getRatingColor(product.rating);
    ratingProgressBar.style.transition = "width 0.3s ease";

    ratingProgressBg.appendChild(ratingProgressBar);

    const price = document.createElement("h3");
    price.textContent = `$${product.price}`;

    const removeFromCartBtn = document.createElement("button");
    removeFromCartBtn.textContent = "Remove from cart";

    removeFromCartBtn.addEventListener("click", () => {
      savedCartProducts.splice(index, 1);
      localStorage.setItem("cartProducts", JSON.stringify(savedCartProducts));
      renderCartProducts();
    });

    productContainer.append(
      productImage,
      category,
      title,
      rating,
      ratingProgressBg,
      price,
      removeFromCartBtn,
    );

    productsList.appendChild(productContainer);
  });
}

renderCartProducts();
