import { products } from "./data/products.js"

localStorage.setItem("products", JSON.stringify(products))

let savedProducts = JSON.parse(localStorage.getItem("products"))
const productsList = document.getElementById("productsList")

function renderProducts() {
    savedProducts.forEach((product, index) => {
        const productContainer = document.createElement("div")
        productContainer.classList.add("productCard")
        
        const productImage = document.createElement("img")
        productImage.src = product.image

        productContainer.appendChild(productImage)
        productsList.appendChild(productContainer)
    })
}

renderProducts()