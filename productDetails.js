const params = new URLSearchParams(window.location.search)

const productId = params.get("id")

const products = JSON.parse(localStorage.getItem("products"))

const product = products.find(product => product.id === Number(productId))

const productImage = document.getElementById("productImage")
const productTitle = document.getElementById("productTitle")
const productPrice = document.getElementById("productPrice")
const productDesc = document.getElementById("productDesc")

productImage.src = product.image
productTitle.textContent = product.title
productPrice.textContent = product.productPrice
productDesc.textContent = product.description
