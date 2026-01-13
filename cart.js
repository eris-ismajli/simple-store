import { renderProducts } from "./utils/renderProducts.js"

const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || []

renderProducts(cartProducts, true)