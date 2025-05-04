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

var i = 0;
var showedProducts = 0;
var clothesProducts = [];
var products = [];

function displayProducts(num, arr, section) {
  const cards = document.getElementById(section);
  for (i = showedProducts; i < showedProducts + num && i < arr.length; i++) {
    cards.innerHTML += `<div class="card col-lg-3 col-md-4 col-sm-12 card border-0" style="width: 18rem">
    <a id="clickedProduct" href="#" onclick="passProductInfo('${i}')"><img src="${arr[i].thumbnail}" class="card-img-top" alt="${
      arr[i].title
    }" style="background-color: #f0eeed; border-radius: 15px;"/></a>
    <div class="card-body text-start">
      <a id="clickedProduct" href="../HTML/productDetails.html" onclick="passProductInfo(${i})"><h5 class="card-title">${arr[i].title}</h5></a>
      <div data-coreui-read-only="true" data-coreui-toggle="rating" data-coreui-value="3"></div>
      <div class="starsContainer d-flex align-items-center justify-content-between" id="starsContainer">
        <div class="d-flex">${displayRate(arr[i].rating.toFixed(1))}</div>
        <div><span class="">${arr[i].rating.toFixed(1)}/</span><span class="totalRate">5</span></div>
      </div>
      <div class="cardFooter mx-0 px-0 border-0 outline-0 d-flex justify-content-between align-items-center">
        <p>${arr[i].price}$</p>
        <button class="add-to-cart-btn border-0 bg-transparent" data-id="${arr[i].id}"
              data-title="${arr[i].title}" data-price="${arr[i].price}"
              data-image="${arr[i].images[0]}" data-discount="${arr[i].discountPercentage}">
            <i class="fa-solid fa-cart-shopping fa-lg"></i>
        </button>
      </div>
    </div>
  </div>`;
  }

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

      const existingItem = cart.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      showAddToCartDialog(item.title);
    });
  });

  showedProducts = i;
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

fetch("https://dummyjson.com/products?limit=0")
  .then((res) => res.json())
  .then((data) => {
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
    localStorage.setItem("products", JSON.stringify(products));
  });

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

function showAddToCartDialog(productName) {
  const dialog = document.getElementById("cart-dialog");
  dialog.textContent = `"${productName}" has been added to your cart`;
  dialog.style.display = "block";

  setTimeout(() => {
    dialog.style.display = "none";
  }, 3000);
}

function passProductInfo(element) {
  console.log(element);
  console.log(products[element]);
  localStorage.setItem("clickedProduct", JSON.stringify(products[element]));
}
