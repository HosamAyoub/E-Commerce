let productsList = JSON.parse(localStorage.getItem("products"));

/********************************* Gategory Filtering ***********************************/
const GeneralCategories = {
  accessories: ["sports-accessories", "sunglasses"],
  care: ["fragrances", "skin-care"],
  electronics: ["laptops", "mobile-accessories", "smartphones", "tablets"],
  furniture: ["furniture", "home-decoration", "kitchen-accessories"],
  groceries: ["groceries"],
  men: ["mens-shirts", "mens-shoes", "mens-watches"],
  vehicles: ["motorcycle", "vehicle"],
  women: ["tops", "womens-bags", "womens-dresses", "womens-jewellery", "womens-shoes", "womens-watches"],
};

function passCategory(category) {
  let categorizedList = [];
  for (const [key, value] of Object.entries(GeneralCategories)) {
    if (key === category) {
      productsList.forEach((product) => {
        value.forEach((val) => {
          if (product.category === val) {
            categorizedList.push(product);
          }
        });
      });
    }
  }

  console.log(categorizedList);
  //==> pass categorized to displey function
  displayProducts(categorizedList);
}

/********************************* Search ***********************************/

let searchInput = document.getElementById("searchInput") ?? "";
let searchedProductsList = [];

searchInput.addEventListener("keypress", function (event) {
  let searchText = searchInput.value.toUpperCase();
  if (event.key === "Enter") {
    event.preventDefault();
    search(searchText);
  }
});

function search(searchText) {
  if (searchText !== "") {
    displayProducts(
      productsList.filter(
        (product) =>
          product.title.toUpperCase().includes(searchText) ||
          product.description.toUpperCase().includes(searchText) ||
          product.brand?.toUpperCase().includes(searchText) ||
          product.category.toUpperCase().includes(searchText)
      )
    );
  }
}

/********************************* Price Filtering ***********************************/

const rangeMin = document.getElementById("rangeMin");
const rangeMax = document.getElementById("rangeMax");
const sliderRange = document.getElementById("slider-range");
const minValDisplay = document.getElementById("minValDisplay");
const maxValDisplay = document.getElementById("maxValDisplay");

let min;
let max;
let debounceTimer;
function updateSlider() {
  min = parseInt(rangeMin.value);
  max = parseInt(rangeMax.value);
  if (min > max) {
    [min, max] = [max, min];
    rangeMin.value = min;
    rangeMax.value = max;
  }

  const percentMin = (min / 1000) * 100;
  const percentMax = (max / 1000) * 100;
  sliderRange.style.left = percentMin + "%";
  sliderRange.style.width = percentMax - percentMin + "%";

  minValDisplay.value = min;
  maxValDisplay.value = max;

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => passMinAndMaxPrices(min, max), 200);
  //   passMinAndMaxPrices(min, max);
}

rangeMin.addEventListener("input", updateSlider);
rangeMax.addEventListener("input", updateSlider);
// window.addEventListener("DOMContentLoaded", updateSlider);

function passMinAndMaxPrices(minPrice, maxPrice) {
  let filteredList = [];
  productsList.forEach((product) => {
    if (product.price >= minPrice && product.price <= maxPrice) {
      filteredList.push(product);
    }
  });

  //   console.log(filteredList);
  //==> pass filteredList to display function
  displayProducts(filteredList);
}

function displayProducts(arr) {
  const cards = document.getElementById("filteredProducts");
  cards.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    cards.innerHTML += `<div class="card col-lg-3 col-md-4 col-sm-12 card border-0" style="width: 18rem">
    <a id="clickedProduct" href="productDetails.html" onclick="passProductInfo('${i}')"><img src="${arr[i].thumbnail}" class="card-img-top" alt="${
      arr[i].title
    }" style="background-color: #f0eeed; border-radius: 15px;"/></a>
    <div class="card-body text-start">
      <a id="clickedProduct" href="productDetails.html" onclick="passProductInfo('${i}')"><h5 class="card-title">${arr[i].title}</h5></a>
      <div data-coreui-read-only="true" data-coreui-toggle="rating" data-coreui-value="3"></div>
      <div class="starsContainer d-flex align-items-center justify-content-between" id="starsContainer">
        <div class="d-flex">${displayRate(arr[i].rating.toFixed(1))}</div>
        <div><span class="">${arr[i].rating.toFixed(1)}/</span><span class="totalRate">5</span></div>
      </div>
      <div class="cardFooter mx-0 px-0 border-0 outline-0 d-flex justify-content-between align-items-center">
        <p>${(arr[i].price * (1 - arr[i].discountPercentage / 100)).toFixed(2)}$</p>
        <button id="productButton${arr[i].id}" class="add-to-cart-btn border-0 bg-transparent" data-id="${arr[i].id}"
              data-title="${arr[i].title}" data-price="${(arr[i].price * (1 - arr[i].discountPercentage / 100)).toFixed(2)}"
              data-image="${arr[i].images[0]}" data-discount="${arr[i].discountPercentage}">
            <i class="fa-solid fa-cart-shopping fa-lg"></i>
        </button>
      </div>
    </div>
  </div>`;
  }

  checkPayedProducts();

  BuyProduct();
}

function displayRate(rate) {
  let result = "";
  let i = 0;
  // Full stars
  for (i = 0; i < Math.floor(rate); i++) {
    result += `<i class="fa-solid fa-star text-warning"></i>`;
  }

  // trimming star
  if (rate % 1 !== 0) {
    result += `
        <span class="half-star" style="
          display: inline-block;
          position: relative;
          width: 1em;
          margin-right: 0.15em;
        ">
          <i class="fa-solid fa-star text-warning" style="
            position: absolute;
            clip-path: inset(0 ${100 - Math.round((rate % 1) * 100)}% 0 0);
            border: none;
            outline: none;
          "></i>
          <i class="fa-solid fa-star text-black" style="
            position: absolute;
            clip-path: inset(0 0 0 ${Math.round((rate % 1) * 100)}%);
            border: none;
            outline: none;
          "></i>
        </span>`;
    for (i += 1; i < 5; i++) {
      result += `<i class="fa-solid fa-star text-black"></i>`;
    }
  } else {
    for (; i < 5; i++) {
      result += `<i class="fa-solid fa-star text-black"></i>`;
    }
  }

  return result;
}

function checkPayedProducts() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  for (const element of cart) {
    if (document.querySelector(`#productButton${element.id}`) !== null) document.querySelector(`#productButton${element.id}`).style.color = "green";
  }
}

function BuyProduct() {
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.replaceWith(btn.cloneNode(true));
  });
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const item = {
        id: this.dataset.id,
        title: this.dataset.title,
        price: parseFloat(this.dataset.price),
        image: this.dataset.image,
        discount: parseFloat(this.dataset.discount) || 0,
        quantity: 1,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItemIndex = cart.findIndex((i) => i.id === item.id);

      if (existingItemIndex !== -1) {
        // Remove from cart
        cart.splice(existingItemIndex, 1);
        showDeleteFromCartDialog(item.title);
        document.querySelector(`#productButton${item.id}`).style.color = "black";
      } else {
        // Add to cart
        cart.push(item);
        showAddToCartDialog(item.title);
        document.querySelector(`#productButton${item.id}`).style.color = "green";
        console.log(item.id);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
}

function showAddToCartDialog(productName) {
  const dialog = document.getElementById("cart-dialog");
  dialog.textContent = `"${productName}" has been added to your cart`;
  dialog.classList.remove("alert-danger");
  dialog.classList.add("alert-success");
  dialog.style.display = "block";

  setTimeout(() => {
    dialog.style.display = "none";
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  let urlParams = new URLSearchParams(window.location.search).toString();
  urlParams = urlParams.substring(0, urlParams.length - 1);

  if (urlParams === "search") {
    search(localStorage.getItem("searchText"));
  } else if (urlParams !== "") {
    passCategory(urlParams);
  } else {
    updateSlider();
  }
});
