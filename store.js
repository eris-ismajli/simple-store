import { renderProducts } from "./utils/renderProducts.js"

const cartItems = document.getElementById("cartItems")
const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || []

cartItems.textContent = cartProducts.length

fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => renderProducts(data))
    .catch(error => console.log(error))