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
var filteredProducts = [];

function displayProducts(num, arr, section) {
  const cards = document.getElementById(section);
  for (i = showedProducts; i < showedProducts + num && i < arr.length; i++) {
    cards.innerHTML += `<div class="card col-lg-3 col-md-4 col-sm-12 card border-0" style="width: 18rem">
    <a href="../HTML/productDetails.html"><img src="${arr[i].thumbnail}" class="card-img-top" alt="${
      arr[i].title
    }" style="background-color: #f0eeed; border-radius: 15px;"/></a>
    <div class="card-body text-start">
      <a href=""><h5 class="card-title">${arr[i].title}</h5></a>
      <div data-coreui-read-only="true" data-coreui-toggle="rating" data-coreui-value="3"></div>
      <div class="starsContainer d-flex align-items-center justify-content-between" id="starsContainer">
        <div class="d-flex">${displayRate(arr[i].rating.toFixed(1))}</div>
        <div><span class="">${arr[i].rating.toFixed(1)}/</span><span class="totalRate">5</span></div>
      </div>
      <div class="cardFooter mx-0 px-0 border-0 outline-0 d-flex justify-content-between align-items-center">
        <p>${arr[i].price}$</p>
        <a href="#" class="btn"><i class="fa-solid fa-cart-shopping fa-lg"></i></a>
      </div>
    </div>
  </div>`;
  }
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

fetch("https://dummyjson.com/products?limit=0&select=id,title,category,price,rating,images,thumbnail")
  .then((res) => res.json())
  .then((data) => {
    clothesProducts = data.products.filter((product) => {
      if (
        (product.images.length > 2 && GeneralCategories.men.includes(product.category)) ||
        (product.images.length > 2 && GeneralCategories.women.includes(product.category))
      )
        return product;
    });
    filteredProducts = data.products.filter((product) => product.images.length > 2);
    displayProducts(8, filteredProducts, "topSellingCards");
    displayProducts(8, filteredProducts, "newArrivalCards");
  });

const newArrival = document.getElementById("viewAllNewArrival");
const topSelling = document.getElementById("viewTopSelling");
newArrival.addEventListener("click", function () {
  displayProducts(8, filteredProducts, "newArrivalCards");
  newArrival.style.display = "none";
});
topSelling.addEventListener("click", function () {
  displayProducts(8, filteredProducts, "topSellingCards");
  topSelling.style.display = "none";
});
