const cartItems = document.getElementById("cartItems");
const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

const productTitleInput = document.getElementById("productTitleInput");
const productCategoryInput = document.getElementById("productCategoryInput");
const productPriceInput = document.getElementById("productPriceInput");
const productImageInput = document.getElementById("productImageInput");
const addProductBtn = document.getElementById("addProductBtn");

let products = JSON.parse(localStorage.getItem("products")) || [];

cartItems.textContent = cartProducts.length;

function renderProducts(products) {
  const productsHolder = document.getElementById("productsHolder");

  productsHolder.innerHTML = "";

  const cartItems = document.getElementById("cartItems");

  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

  products.forEach((product, index) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product-container");

    productContainer.addEventListener("click", () => {
      window.location.href = `./pages/product.html?id=${product.id}`;
    });

    const productImg = document.createElement("img");
    productImg.src = product.image;

    const productTitle = document.createElement("h4");
    productTitle.textContent = product.title;

    const productCategory = document.createElement("p");
    productCategory.textContent = product.category;

    const productPrice = document.createElement("h4");
    productPrice.textContent = "$" + product.price;

    productContainer.appendChild(productImg);
    productContainer.appendChild(productCategory);
    productContainer.appendChild(productTitle);
    productContainer.appendChild(productPrice);

    const addToCart = document.createElement("button");
    addToCart.textContent = "Add to Cart";

    addToCart.addEventListener("click", (e) => {
      e.stopPropagation();
      cartProducts.push(product);
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      cartItems.textContent = cartProducts.length;
    });

    productContainer.appendChild(addToCart);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    productContainer.appendChild(deleteButton);

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const updatedProducts = products.filter((item, i) => i !== index);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      renderProducts(updatedProducts);
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    productContainer.appendChild(editButton);

    editButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const newTitle = prompt("Update title", product.title);
      const newCategory = prompt("Update category", product.category);
      const newPrice = parseInt(prompt("Update price", product.price));

      if (
        newTitle.trim() === "" ||
        newCategory.trim() === "" ||
        newPrice === null ||
        isNaN(newPrice)
      ) {
        alert("Please provide valid data");
        return;
      }

      product.title = newTitle;
      product.category = newCategory;
      product.price = newPrice;

      localStorage.setItem("products", JSON.stringify(products))

      renderProducts(products);
    });

    productsHolder.appendChild(productContainer);
  });
}

addProductBtn.addEventListener("click", () => {
  let productTitle = productTitleInput.value;
  const productCategory = productCategoryInput.value;
  const productPrice = productPriceInput.value;
  const imageFile = productImageInput.files[0];

  if (
    !imageFile ||
    productTitle.trim() === "" ||
    productCategory.trim() === "" ||
    productPrice === null
  ) {
    alert("Please provide sufficient data");
    return;
  }

  const newProduct = {
    id: Date.now(),
    title: productTitle,
    category: productCategory,
    price: productPrice,
    image: URL.createObjectURL(imageFile),
  };

  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products))
  renderProducts(products);

  productTitleInput.value = "";
  productCategoryInput.value = "";
  productPriceInput.value = null;
  productImageInput.value = "";
});

renderProducts(products)

localStorage.setItem("hasFetched", false)
const hasFetched = localStorage.getItem("hasFetched")

if (!hasFetched) {
  localStorage.setItem("hasFetched", true)
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("products", JSON.stringify(data));
      const products = JSON.parse(localStorage.getItem("products")) || [];
      renderProducts(products);
    })
    .catch((error) => console.log(error));
}
