let productIndex = 0;
let productsList = JSON.parse(localStorage.getItem("products"));
let product = JSON.parse(localStorage.getItem("clickedProduct"));
console.log(product);



function displayItem() {
  
  if (productsList) {
    let content = `
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb" class="my-3">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="Home.html" style="text-decoration: none; color: black">Home</a></li>
                <li class="breadcrumb-item"><a href="#" style="text-decoration: none; color: black">Shop</a></li>
                <li class="breadcrumb-item"><a href="#" style="text-decoration: none; color: black">${productsList[productIndex].category}</a></li>
                <li class="breadcrumb-item active" aria-current="page">${productsList[productIndex].title}</li>
            </ol>
        </nav>



        <!-- Images & Details Section -->
            <section class="row" id="imagesAndDetails">
                <div class="col-5" id="images">
                    <div class="row">
                        <div id="threeImgaes" class="col-3">
                            <img src="${productsList[productIndex].images[0]}" class="mainImage img-fluid rounded" alt="0.png">
                            <img src="${productsList[productIndex].images[1]}" class="mainImage img-fluid rounded" alt="0.png">
                            <img src="${productsList[productIndex].images[2]}" class="mainImage img-fluid rounded" alt="0.png">
                        </div>
                        <div id="oneImgae" class="col-9">
                            <img src="${productsList[productIndex].images[0]}" class="mainImage img-fluid rounded" alt="0.png">
                        </div>
                    </div>  
                </div>

                <div class="col-7" id="details">
                    <h1>${productsList[productIndex].title}</h1>
                    <div class="d-flex my-2">${displayRate(productsList[productIndex].rating)}</div>
                    <div class="d-flex">
                        <h4>${productsList[productIndex].price * (1 - productsList[productIndex].discountPercentage / 100)}</h4>
                        <h4 id="priceBeforDiscount">${productsList[productIndex].price}</h4>
                        <h5 id="discountPercentage">${productsList[productIndex].discountPercentage}%</h5>   
                    </div>   
                    <p>${productsList[productIndex].description}</p>
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
                                <button type="button">−</button>
                                <span>1</span>
                                <button type="button">+</button>
                            </div>

                            <div id="addToCart">
                                <a href="#" target="_blank">Add To Cart</a>
                            </div>
                    </div>

                </div>
            </section>
            


            <section id="reviews">

                <div class="row d-flex mx-2">
                    <div class="col-4 my-2" id="Product_Details">
                        <a href="#"><h5>Product Details</h5></a>
                    </div>
                    <div class="col-4 my-2" id="Rating_And_Reviews">
                        <a href="#"><h5>Raing & Reviews</h5></a>
                    </div>
                    <div class="col-4 my-2" id="FAQs">
                        <a href="#"><h5>FAQs</h5></a>
                    </div>
                </div>


                <h5 class="m-4">All Reviews</h5>
                
                <div class="row" id="reviews">
                    
        `;

    let reviewsList = productsList[productIndex].reviews;
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
                        <p class="mt-3">${review.date}</p>
                    </div>
                </div>
            `;
    });

    content += `
                </div>
            </section>`;

    document.getElementById("content").innerHTML = content;
  }
}

displayItem();

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
