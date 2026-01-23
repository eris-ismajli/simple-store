const params = new URLSearchParams(window.location.search);

const productId = params.get("id");
const products = JSON.parse(localStorage.getItem("products"));
const product = products.find((product) => product.id === Number(productId));

const cartProducts = JSON.parse(localStorage.getItem("cartProducts"))
const cartItems = document.getElementById("cartItems")

cartItems.textContent = cartProducts.length;

if (!product) {
  alert("Product not found");
} else {
  const productImage = document.getElementById("productImage");
  const productTitle = document.getElementById("productTitle");
  const productPrice = document.getElementById("productPrice");
  const productDesc = document.getElementById("productDesc");

  const addToCart = document.getElementById("addToCart");

  addToCart.addEventListener("click", (e) => {
    e.stopPropagation();
    cartProducts.push(product);
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    cartItems.textContent = cartProducts.length;
  });

  productImage.src = product.image;
  productTitle.textContent = product.title;
  productPrice.textContent = `$${product.price.toFixed(2)}`;
  productDesc.textContent = product.description;
}
