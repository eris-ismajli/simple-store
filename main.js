import { products } from "./data/products.js"

if (!getProducts()) {
    localStorage.setItem("products", JSON.stringify(products))
}

if (!getCartProducts()) {
    localStorage.setItem("cartProducts", JSON.stringify([]))
}

function getProducts() {
    return JSON.parse(localStorage.getItem("products") || [])
}

function getCartProducts() {
    return JSON.parse(localStorage.getItem("cartProducts") || [])
}

function setCartProducts(newCartProducts) {
    localStorage.setItem("cartProducts", JSON.stringify(newCartProducts))
}

const savedProducts = getProducts()
const savedCartProducts = getCartProducts()

const productsList = document.getElementById("productsList")
const cartItems = document.getElementById("cartItems")

cartItems.textContent = savedCartProducts.length

function renderProducts() {
    savedProducts.forEach((product, index) => {
        const productContainer = document.createElement("div")
        productContainer.classList.add("productCard")
        
        const productImage = document.createElement("img")
        productImage.src = product.image

        const addToCartBtn = document.createElement("button")
        addToCartBtn.textContent = "Add to Cart"

        addToCartBtn.addEventListener("click", () => {
            savedCartProducts.push(product)
            setCartProducts(savedCartProducts)
            cartItems.textContent = savedCartProducts.length
        })

        productContainer.appendChild(productImage)
        productContainer.appendChild(addToCartBtn)
        productsList.appendChild(productContainer)
    })
}

renderProducts()

// notepad-eris.vercel.app/js-class