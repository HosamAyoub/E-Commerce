document.addEventListener("DOMContentLoaded", function () {
  const user = sessionStorage.getItem("loggedInUser");

  const loginSuccess = sessionStorage.getItem("loginSuccess");
  if (loginSuccess) {
    showLoginMessage();
    sessionStorage.removeItem("loginSuccess");
  }
});

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

let i = 0;
let showedProducts = 0;
let clothesProducts = [];
let products = [];
let topReviewsList = [];

async function fetchData() {
  const response = await fetch("https://dummyjson.com/products?limit=0");
  data = await response.json();
  clothesProducts = data.products.filter((product) => {
    if (
      (product.images.length > 2 && GeneralCategories.men.includes(product.category)) ||
      (product.images.length > 2 && GeneralCategories.women.includes(product.category))
    )
      return product;
  });
  products = data.products.filter((product) => product.images.length > 2);
  displayProducts(8, products, "topSellingCards");
  displayProducts(8, products, "newArrivalCards");
  getTopReviews();
  topReviewsList = convertDate(topReviewsList);
  // console.log(topReviewsList);

  displayCarouselRates("carouselSection1");
  displayCarouselRates("carouselSection2");
  displayCarouselRates("carouselSection3");
  displayCarouselRates("carouselSection4");
  displayCarouselRates("carouselSection5");
  displayCarouselRates("carouselSection6");
  localStorage.setItem("products", JSON.stringify(products));
}

fetchData();

function displayProducts(num, arr, section) {
  const cards = document.getElementById(section);
  for (i = showedProducts; i < showedProducts + num && i < arr.length; i++) {
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

  showedProducts = i;
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
        // console.log(item.id);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
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

function hideRate(rate) {
  for (let i = 0; i < rate; i++) {
    starsArray[i].style.color = "black";
  }
}

function resetRate() {
  for (let i = 0; i < 5; i++) {
    starsArray[i].style.color = "black";
  }
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

function showDeleteFromCartDialog(productName) {
  const dialog = document.getElementById("cart-dialog");
  dialog.textContent = `"${productName}" has been deleted from your cart`;
  dialog.classList.remove("alert-success");
  dialog.classList.add("alert-danger");
  dialog.style.display = "block";

  setTimeout(() => {
    dialog.style.display = "none";
  }, 3000);
}

function passProductInfo(index) {
  localStorage.setItem("clickedProduct", JSON.stringify(products[index]));
}

function getTopReviews() {
  // let temp = JSON.parse(localStorage.getItem("products"));
  for (const element of products) {
    for (const review of element.reviews) {
      if (review.rating === 5) {
        // console.log(review);
        topReviewsList.push(review);
      }
    }
  }
}

function displayCarouselRates(section) {
  let content = `<div class="row justify-content-center" id="reviews">`;
  for (let index = 0; index < 4; index++) {
    content += `
                            <div class="col-lg-3 col-md-4 col-sm-12">
                                <div id="review">
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex my-2">${displayRate(topReviewsList[topReviewsList.length - 1].rating)}</div>
                                        <i class="fa-solid fa-ellipsis"></i>
                                    </div>
                                    <div class="d-flex">
                                        <h4>${topReviewsList[topReviewsList.length - 1].reviewerName}</h4>
                                        <i class="fa-solid fa-circle-check ms-2 mt-2" style="color: #3fa654;"></i>
                                    </div>
                                    <p>${topReviewsList[topReviewsList.length - 1].comment}</p>
                                    <p class="mt-3 text-black-50">Posted on ${topReviewsList[topReviewsList.length - 1].date}</p>
                                </div>
                            </div>
                        `;
    // console.log(topReviewsList[topReviewsList.length - 1]);
    topReviewsList.pop();
  }
  content += `</div>`;
  document.getElementById(section).innerHTML = content;
}

function convertDate(reviews) {
  let date;

  for (let i = 0; i < reviews.length; i++) {
    date = new Date(reviews[i].date);
    reviews[i].date = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }
  return reviews;
}

const newArrival = document.getElementById("viewAllNewArrival");
const topSelling = document.getElementById("viewTopSelling");
newArrival.addEventListener("click", function () {
  displayProducts(8, products, "newArrivalCards");
  newArrival.style.display = "none";
});
topSelling.addEventListener("click", function () {
  displayProducts(8, products, "topSellingCards");
  topSelling.style.display = "none";
});



/*********************************** Search *****************************************/
let searchInput = document.getElementById("searchInput") ?? "";
let searchIcon = document.getElementById("searchIcon");
let searchedProductsList = [];

searchInput.addEventListener("keypress", function (event) {
  searchText = searchInput.value.toUpperCase();
  if (event.key === "Enter") {
    event.preventDefault();
    window.location.href = "shopPage.html?search";
    localStorage.setItem("searchText", searchText);
  }
});

searchIcon.addEventListener("click", function (event) {
  searchText = searchInput.value.toUpperCase();
  console.log(searchText);
  event.preventDefault();
  window.location.href = "shopPage.html?search";
  localStorage.setItem("searchText", searchText);
});

searchIcon.addEventListener("click", function (event) {
  searchText = searchInput.value.toUpperCase();
  console.log(searchText);
  event.preventDefault();
  window.location.href = "shopPage.html?search";
  localStorage.setItem("searchText", searchText);
});

document.getElementById("logoutLink").addEventListener("click", function (e) {
  e.preventDefault();
  const user = sessionStorage.getItem("loggedInUser");
  if (user) {
    const modal = new bootstrap.Modal(document.getElementById('logoutModal'));
    modal.show();
  } else {
    window.location.href = "login.html";
  }
});

document.getElementById("confirmLogoutBtn").addEventListener("click", function () {
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});


function showLoginMessage() {
  const messageDiv = document.getElementById("loginMessage");
  messageDiv.style.display = "block";
  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 3000);
}