const savedProducts = JSON.parse(localStorage.getItem("products") || "[]");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const product = savedProducts.find((p) => p.id == id)

const productImg = document.getElementById("productImg")
const productTitle = document.getElementById("productTitle")
const productCategory = document.getElementById("productCategory")
const productDescription = document.getElementById("productDescription")
const productRating = document.getElementById("productRating")
const productPrice = document.getElementById("productRating")

productImg.src = product.image
productTitle.textContent = product.title
productCategory.textContent = product.category
productDescription.textContent = product.description
productRating.textContent = product.rating
productPrice.textContent = product.price