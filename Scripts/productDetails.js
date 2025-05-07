let productIndex = 0;
let productsList = JSON.parse(localStorage.getItem("products"));
let product = JSON.parse(localStorage.getItem("clickedProduct"));
let staticContent = "";
let reviewsList = convertDate(product.reviews);
let contentElement = document.getElementById("content");
let productDetailsElement = "";
let ratingReviewsElement = "";
let FAQsElement = "";
// console.log(product);

function displayItem() {
  if (productsList !== null && product !== null) {
    staticContent = `
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb" class="my-3">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="Home.html" style="text-decoration: none; color: black">Home</a></li>
                <li class="breadcrumb-item"><a href="#" style="text-decoration: none; color: black">Shop</a></li>
                <li class="breadcrumb-item"><a href="#" style="text-decoration: none; color: black">${product.category}</a></li>
                <li class="breadcrumb-item active" aria-current="page">${product.title}</li>
            </ol>
        </nav>



        <!-- Images & Details Section -->
            <section class="row" id="imagesAndDetails">
                <div class="col-5" id="images">
                    <div class="row">
                        <div id="threeImgaes" class="col-3">
                            <img src="${product.images[0]}" class="mainImage img-fluid rounded" alt="0.png">
                            <img src="${product.images[1]}" class="mainImage img-fluid rounded" alt="0.png">
                            <img src="${product.images[2]}" class="mainImage img-fluid rounded" alt="0.png">
                        </div>
                        <div id="oneImgae" class="col-9">
                            <img src="${product.images[0]}" class="mainImage img-fluid rounded" alt="0.png">
                        </div>
                    </div>  
                </div>

                <div class="col-7" id="details">
                    <h1>${product.title}</h1>
                    <div class="d-flex my-2">${displayRate(product.rating)}</div>
                    <div class="d-flex">
                        <h4>${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</h4>
                        <h4 id="priceBeforDiscount">${product.price.toFixed(2)}</h4>
                        <h5 id="discountPercentage">${product.discountPercentage}%</h5>   
                    </div>   
                    <p>${product.description}</p>
                    <hr>

                    <div>
                        <h5>Select Color</h5>
                        <div class="selectColor">
                            <div id="color1"></div>
                            <div id="color2"></div>
                            <div id="color3"></div>
                            <div id="color4"></div>
                        </div>
                    </div>
                    
                    <hr>
                    
                    <div>
                        <h5>Choose Size</h5>
                        <div class="chooseSize">
                            <div id="size1">Small</div>
                            <div id="size2">Meduim</div>
                            <div id="size3">Large</div>
                        </div>
                    </div>


                    <hr>
                    
                    <div class="d-flex">
                            <div class="quantity-control">
                              <button type="button" id="decreaseQty">−</button>
                              <span id="quantityValue">1</span>
                              <button type="button" id="increaseQty">+</button>
                            </div>


                          
                                <button class="add-to-cart-btn border-0 bg-black rounded-pill" style="color: white;" data-id="${product.id}"
                                  data-title="${product.title}" data-price="${product.price}"
                                  data-image="${product.images[0]}" data-discount="${product.discountPercentage}">
                                  Add To Cart
                                </button>
                    </div>

                </div>
            </section>
            <section id="reviews">
        `;
    let dynamicContent = displayRateHTML();

    contentElement.innerHTML = staticContent + dynamicContent;

    // Handle quantity increment/decrement
    let quantity = 1;
    const quantitySpan = document.getElementById("quantityValue");
    const increaseBtn = document.getElementById("increaseQty");
    const decreaseBtn = document.getElementById("decreaseQty");
    increaseBtn.addEventListener("click", () => {
      quantity++;
      quantitySpan.textContent = quantity;
    });

    decreaseBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantitySpan.textContent = quantity;
      }
    });

    document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const item = {
          id: this.dataset.id,
          title: this.dataset.title,
          price: parseFloat(this.dataset.price),
          image: this.dataset.image,
          discount: parseFloat(this.dataset.discount) || 0,
          quantity: quantity,
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = cart.find((i) => i.id === item.id);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          cart.push(item);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        showAddToCartDialog(item.title);

        quantity = 1;
        quantitySpan.textContent = quantity;
      });
    });
  }
}

function showAddToCartDialog(productName) {
  const dialog = document.getElementById("cart-dialog");
  dialog.textContent = `"${productName}" has been added to your cart`;
  dialog.style.display = "block";

  setTimeout(() => {
    dialog.style.display = "none";
  }, 3000);
}

/******************************  Rating System   ******************************************/

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

function displayRateHTML() {
  let content = `<div class="row d-flex mx-2">
                    <div class="col-4 my-2 Product_Details" id="Product_Details">
                        <a id="detailsOfProduct" href="#detailsOfProduct" onclick="clickDetails()"><h5>Product Details</h5></a>
                    </div>
                    <div class="col-4 my-2 Rating_And_Reviews active" id="Rating_And_Reviews">
                        <a id="rating" href="#rating" onclick="clickRating()"><h5>Raing & Reviews</h5></a>
                    </div>
                    <div class="col-4 my-2 FAQs" id="FAQs">
                        <a id="faqs" href="#faqs" onclick="clickFAQs()"><h5>FAQs</h5></a>
                    </div>
              </div>
              <h5 class="m-4">All Reviews <span class="text-black-50">(${reviewsList.length})</span></h5>
              <div class="row" id="reviews">`;
  reviewsList.forEach((review) => {
    content += `
                            <div class="col-6">
                                <div id="review">
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex my-2">${displayRate(review.rating)}</div>
                                        <i class="fa-solid fa-ellipsis"></i>
                                    </div>
                                    <div class="d-flex">
                                        <h4>${review.reviewerName}</h4>
                                        <i class="fa-solid fa-circle-check ms-2 mt-2" style="color: #3fa654;"></i>
                                    </div>
                                    <p>${review.comment}</p>
                                    <p class="mt-3 text-black-50">Posted on ${review.date}</p>
                                </div>
                            </div>
                        `;
  });
  content += `</div>
            </section>`;
  return content;
}

function displayDetailsHTML() {
  let content = "";
  content = `
              <div class="row d-flex mx-2">
                    <div class="col-4 my-2 Product_Details active" id="Product_Details">
                        <a id="detailsOfProduct" href="#detailsOfProduct" onclick="clickDetails()"><h5>Product Details</h5></a>
                    </div>
                    <div class="col-4 my-2 Rating_And_Reviews" id="Rating_And_Reviews">
                        <a id="rating" href="#rating" onclick="clickRating()"><h5>Raing & Reviews</h5></a>
                    </div>
                    <div class="col-4 my-2 FAQs" id="FAQs">
                        <a id="faqs" href="#faqs" onclick="clickFAQs()"><h5>FAQs</h5></a>
                    </div>
              </div>
              <div id="details">
                  <div class="d-flex justify-content-start align-items-center my-4">
                    <h4 class="m-0 p-0">Stock: </h4>
                    <p class="ps-2 fs-5 m-0">${product.stock}</p>
                  </div>
                  <div class="d-flex justify-content-start align-items-center my-4">
                    <h4 class="m-0 p-0">Brand: </h4>
                    <p class="ps-2 fs-5 m-0">${product.brand}</p>
                  </div>
                  <div class="d-flex justify-content-start align-items-center my-4">
                    <h4 class="m-0 p-0">Weight: </h4>
                    <p class="ps-2 fs-5 m-0">${product.weight}</p>
                  </div>
                  <div class="d-flex justify-content-start align-items-center my-4">
                    <h4 class="m-0 p-0">Dimensions: </h4>
                    <p class="ps-2 fs-5 m-0">(${product.dimensions.width} - ${product.dimensions.height} - ${product.dimensions.depth})</p>
                  </div>
                  <div class="d-flex justify-content-start align-items-center my-4">
                    <h4 class="m-0 p-0">Warranty Information: </h4>
                    <p class="ps-2 fs-5 m-0">${product.warrantyInformation}</p>
                  </div>
                  <div class="d-flex justify-content-start align-items-center my-4">
                    <h4 class="m-0 p-0">Shipping Information: </h4>
                    <p class="ps-2 fs-5 m-0">${product.shippingInformation}</p>
                  </div>
                  <div class="d-flex justify-content-start align-items-center my-4">
                    <h4 class="m-0 p-0">Return Policy: </h4>
                    <p class="ps-2 fs-5 m-0">${product.returnPolicy}</p>
                  </div>
              </div>
                        `;

  content += `</div>
            </section>`;
  return content;
}

function displayFAQsHTML() {
  let content = "";
  content = `
              <div class="row d-flex mx-2">
                    <div class="col-4 my-2 Product_Details" id="Product_Details">
                        <a id="detailsOfProduct" href="#detailsOfProduct" onclick="clickDetails()"><h5>Product Details</h5></a>
                    </div>
                    <div class="col-4 my-2 Rating_And_Reviews" id="Rating_And_Reviews">
                        <a id="rating" href="#rating" onclick="clickRating()"><h5>Raing & Reviews</h5></a>
                    </div>
                    <div class="col-4 my-2 FAQs active" id="FAQs">
                        <a id="faqs" href="#faqs" onclick="clickFAQs()"><h5>FAQs</h5></a>
                    </div>
              </div>
              <div id="details">
                  <div class="my-4">
                    <h4 class="m-0 p-0">How long does shipping take?</h4>
                    <p class="fs-5 m-0 text-black-50">Standard shipping takes 3-5 business days; express options deliver in 1-2 days.</p>
                  </div>
                  <div class="my-4">
                    <h4 class="m-0 p-0">What is your return policy?</h4>
                    <p class="fs-5 m-0 text-black-50">Unused items can be returned within 30 days for a full refund.</p>
                  </div>
                  <div class="my-4">
                    <h4 class="m-0 p-0">Are my payment details secure?</h4>
                    <p class="fs-5 m-0 text-black-50">Yes, we use SSL encryption and trusted payment gateways like PayPal and Stripe.</p>
                  </div>
                  <div class="my-4">
                    <h4 class="m-0 p-0">How do I track my order?</h4>
                    <p class="fs-5 m-0 text-black-50">A tracking link will be emailed once your order ships.</p>
                  </div>
                  <div class="my-4">
                    <h4 class="m-0 p-0">Do you offer international shipping?</h4>
                    <p class="fs-5 m-0 text-black-50">Yes! We ship to 50+ countries with calculated duties at checkout.</p>
                  </div>
              </div>
                        `;

  content += `</div>
            </section>`;
  return content;
}

function clickRating() {
  let dynamicContent = displayRateHTML();
  contentElement.innerHTML = staticContent + dynamicContent;
}
function clickDetails() {
  let dynamicContent = displayDetailsHTML();
  contentElement.innerHTML = staticContent + dynamicContent;
}
function clickFAQs() {
  let dynamicContent = displayFAQsHTML();
  contentElement.innerHTML = staticContent + dynamicContent;
}

function convertDate(reviews) {
  let date;

  for (let i = 0; i < reviews.length; i++) {
    date = new Date(reviews[i].date);
    reviews[i].date = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }
  return reviews;
}

displayItem();
productDetailsElement = document.getElementById("Product_Details");
ratingReviewsElement = document.getElementById("Rating_And_Reviews");
FAQsElement = document.getElementById("FAQs");


document.getElementById("confirmLogoutBtn").addEventListener("click", function () {
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});