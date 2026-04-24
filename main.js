// notepad-eris.vercel.app/js-class

import { products } from "./data/products.js";
import { getRatingColor } from "./utils/getRatingColor.js";

const PRODUCTS = "products";
const CART_PRODUCTS = "cartProducts";

const DELETE = "delete";
const EDIT = "edit";

if (!getProducts()) {
  localStorage.setItem(PRODUCTS, JSON.stringify(products));
}

if (!getCartProducts()) {
  localStorage.setItem(CART_PRODUCTS, JSON.stringify([]));
}

function getProducts() {
  return JSON.parse(localStorage.getItem(PRODUCTS) || "[]");
}

function getCartProducts() {
  return JSON.parse(localStorage.getItem(CART_PRODUCTS) || "[]");
}

function setCartProducts(newCartProducts) {
  localStorage.setItem(CART_PRODUCTS, JSON.stringify(newCartProducts));
}

function setProducts(newProducts) {
  localStorage.setItem(PRODUCTS, JSON.stringify(newProducts));
}

let savedProducts = getProducts();
const savedCartProducts = getCartProducts();

const productsList = document.getElementById("productsList");
const cartItems = document.getElementById("cartItems");
const categoryFilters = document.getElementById("categoryFilters");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalConfirmBtn = document.getElementById("modalConfirmBtn");
const modalCancelBtn = document.getElementById("modalCancelBtn");
const modalEditInputs = document.getElementById("modalEditInputs");
const editTitleInput = document.getElementById("editTitleInput");
const editCategoryInput = document.getElementById("editCategoryInput");

const addTitleInput = document.getElementById("addTitleInput");
const addPriceInput = document.getElementById("addPriceInput");
const addCategoryInput = document.getElementById("addCategoryInput");
const addDescriptionInput = document.getElementById("addDescriptionInput");
const addProductBtn = document.getElementById("addProductBtn");

let indexToDelete = null;
let indexToEdit = null;

let userWantsTo = "";

const categories = [
  "All",
  "Bags",
  "Electronics",
  "Shoes",
  "Home & Kitchen",
  "Apparel",
  "Accessories",
  "Sports",
];

function handleCategoryFilters() {
  categories.forEach((category) => {
    const filterButton = document.createElement("button");
    filterButton.textContent = category;

    filterButton.addEventListener("click", () => {
      savedProducts = products.filter(
        (product) => product.category === category || category === "All",
      );
      renderProducts();
    });

    categoryFilters.appendChild(filterButton);
  });
}

handleCategoryFilters();

function toggleModalVisibility(showModal, message = "") {
  modal.style.display = showModal ? "block" : "none";
  modalTitle.textContent = message;
}

cartItems.textContent = savedCartProducts.length;

function renderProducts() {
  productsList.innerHTML = "";
  savedProducts.forEach((product, index) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("productCard");

    productContainer.addEventListener("click", () => {
      window.location.href = `./pages/product.html?id=${product.id}`;
    });

    const productImage = document.createElement("img");
    productImage.src = product.image;

    const category = document.createElement("p");
    category.textContent = product.category;

    const title = document.createElement("h3");
    title.textContent = product.title;

    const rating = document.createElement("p");
    rating.textContent = product.rating && product.rating;

    const ratingProgressBg = document.createElement("div");
    ratingProgressBg.style.width = "100%";
    ratingProgressBg.style.height = "6px";
    ratingProgressBg.style.backgroundColor = "#e0e0e0";
    ratingProgressBg.style.borderRadius = "3px";
    ratingProgressBg.style.overflow = "hidden";
    ratingProgressBg.style.marginBottom = "8px";

    const ratingProgressBar = document.createElement("div");
    // Calculate width based on rating out of 5
    const ratingPercentage = (product.rating / 5) * 100;
    ratingProgressBar.style.width = `${ratingPercentage}%`;
    ratingProgressBar.style.height = "100%";
    ratingProgressBar.style.backgroundColor = getRatingColor(product.rating);
    ratingProgressBar.style.transition = "width 0.3s ease";

    ratingProgressBg.appendChild(ratingProgressBar);

    const price = document.createElement("h3");
    price.textContent = `$${product.price}`;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";

    addToCartBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      savedCartProducts.push(product);
      setCartProducts(savedCartProducts);
      cartItems.textContent = savedCartProducts.length;

      addToCartBtn.style.backgroundColor = "green";
      addToCartBtn.textContent = "Added to Cart";

      setTimeout(() => {
        addToCartBtn.style.backgroundColor = "";
        addToCartBtn.textContent = "Add to Cart";
      }, 2000);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      modalEditInputs.style.display = "none";

      const modalMessage = "Are you sure you want to delete this product?";

      toggleModalVisibility(true, modalMessage);

      indexToDelete = index;
      userWantsTo = DELETE;
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      const modalMessage = "Update Product";
      toggleModalVisibility(true, modalMessage);

      modalEditInputs.style.display = "block";
      editTitleInput.value = product.title;
      editTitleInput.focus();

      indexToEdit = index;
      userWantsTo = EDIT;
    });

    productContainer.append(
      productImage,
      category,
      title,
      rating,
      ratingProgressBg,
      price,
      addToCartBtn,
      deleteBtn,
      editBtn,
    );

    productsList.appendChild(productContainer);
  });
}

addProductBtn.addEventListener("click", () => {
  const productTitle = addTitleInput.value;
  const productPrice = addPriceInput.value;
  const productCategory = addCategoryInput.value;
  const productDescription = addDescriptionInput.value;

  if (
    productTitle.trim() === "" ||
    productPrice.trim() === "" ||
    productCategory.trim() === "" ||
    productDescription.trim() === ""
  ) {
    alert("Please fill in all the fields")
    return
  }

  const newProduct = {
    id: Date.now(),
    title: productTitle,
    category: productCategory,
    price: productPrice,
    description: productDescription,
    image: ""
  }

  savedProducts.push(newProduct)
  setProducts(savedProducts)

  renderProducts()

});

modalCancelBtn.addEventListener("click", () => {
  toggleModalVisibility(false);

  indexToDelete = null;
  indexToEdit = null;
  userWantsTo = "";
});

modalConfirmBtn.addEventListener("click", () => {
  toggleModalVisibility(false);

  if (userWantsTo === DELETE) {
    savedProducts.splice(indexToDelete, 1);
    indexToDelete = null;
  } else if (userWantsTo === EDIT) {
    const updatedTitle = editTitleInput.value;
    const updatedCategory = editCategoryInput.value;

    if (updatedTitle.trim() === "" || updatedCategory.trim() === "") {
      alert("Please fill in all the fields");
      return;
    }

    const productToUpdate = savedProducts[indexToEdit];

    productToUpdate.title = updatedTitle;
    productToUpdate.category = updatedCategory;

    indexToEdit = null;
  }

  setProducts(savedProducts);
  renderProducts();

  userWantsTo = "";
});

renderProducts();

// notepad-eris.vercel.app/js-class
