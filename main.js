// github.com/eris-ismajli/simple-store

import { products } from "./data/products.js";

const PRODUCTS = "products";
const CART_PRODUCTS = "cartProducts";

if (!getProducts()) {
  localStorage.setItem(PRODUCTS, JSON.stringify(products));
}

if (!getCartProducts()) {
  localStorage.setItem(CART_PRODUCTS, JSON.stringify([]));
}

function getProducts() {
  return JSON.parse(localStorage.getItem(PRODUCTS) || []);
}

function getCartProducts() {
  return JSON.parse(localStorage.getItem(CART_PRODUCTS) || []);
}

function setCartProducts(newCartProducts) {
  localStorage.setItem(CART_PRODUCTS, JSON.stringify(newCartProducts));
}

function getRatingColor(rating) {
  let color = ""

  if (rating <= 1.5 && rating > 0) {
    color = "red"
  } else if (rating <= 3.5) {
    color = "orange"
  } else if (rating <= 5) {
    color = "green"
  } else {
    color = "gray"
  }

  return color
}

const savedProducts = getProducts();
const savedCartProducts = getCartProducts();

const productsList = document.getElementById("productsList");
const cartItems = document.getElementById("cartItems");

cartItems.textContent = savedCartProducts.length;

function renderProducts() {
  savedProducts.forEach((product, index) => {
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

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";

    addToCartBtn.addEventListener("click", () => {
      savedCartProducts.push(product);
      setCartProducts(savedCartProducts);
      cartItems.textContent = savedCartProducts.length;

      addToCartBtn.style.backgroundColor = "green"
      addToCartBtn.textContent = "Added to Cart"

      setTimeout(() => {
        addToCartBtn.style.backgroundColor = ""
        addToCartBtn.textContent = "Add to Cart"
      }, 2000);
    });

    productContainer.append(
      productImage,
      category,
      title,
      rating,
      ratingProgressBg,
      price,
      addToCartBtn,
    );

    productsList.appendChild(productContainer);
  });
}

renderProducts();

// notepad-eris.vercel.app/js-class
