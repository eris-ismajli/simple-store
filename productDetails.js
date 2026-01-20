const params = new URLSearchParams(window.location.search)

const productId = params.get("id")

const products = JSON.parse(localStorage.getItem("products"))

const product = products.find(product => product.id === Number(productId))
