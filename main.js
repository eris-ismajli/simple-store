// https://github.com/eris-ismajli/simple-store

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
    rating.textContent = `rating: ${product.rating}`;

    const price = document.createElement("h3");
    price.textContent = product.price;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";

    addToCartBtn.addEventListener("click", () => {
      savedCartProducts.push(product);
      setCartProducts(savedCartProducts);
      cartItems.textContent = savedCartProducts.length;
    });

    productContainer.append(
      productImage,
      category,
      title,
      rating,
      price,
      addToCartBtn,
    );

    productsList.appendChild(productContainer);
  });
}

renderProducts();

// notepad-eris.vercel.app/js-class
