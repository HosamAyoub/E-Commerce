let productIndex = 0;

async function displayItem() {
  let dataResponse = await fetch("https://dummyjson.com/products?limit=0");
  data = (await dataResponse.json()).products;
  console.log(data);

  if (data) {
    productsList = data.filter((item) => item.images.length >= 3);
  }
  console.log(productsList);

  if (productsList) {
    console.log(productsList[productIndex]);

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
                            <img src="${productsList[productIndex].images[0]}" class="img-fluid rounded" alt="0.png">
                            <img src="${productsList[productIndex].images[1]}" class="img-fluid rounded" alt="0.png">
                            <img src="${productsList[productIndex].images[2]}" class="img-fluid rounded" alt="0.png">
                        </div>
                        <div id="oneImgae" class="col-9">
                            <img src="${productsList[productIndex].images[0]}" class="img-fluid rounded" alt="0.png">
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
            </section>


            

            <!-- Footer -->
            <br><br><br><br><br>
            <footer class="mt-5">

                    <div class="position-relative">
                        <div class="position-absolute top-0 start-50 translate-middle bg-black" id="offer">
                            <div class="row">
                                <div class="col-7">
                                    <h1 class="text-white">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
                                </div>
                                <div class="col-5" id="toEmail">
                                    <div class="d-flex">
                                        <i class="fa-solid fa-envelope"></i>
                                        <input type="email" class="form-control" placeholder="Enter your email address">
                                    </div>
                                    <div><a href="#"><p>Subscribe to Newsletter</p></a></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row pt-5 m-5">
                        <div class="col-3 pt-5 mt-5">
                            <h1>SHOP.CO</h1>
                            <p>
                                We have all products that suits your need.
                            </p>
                            <div>
                                <a href="#"><i class="ms-2 fa-brands fa-twitter"></i></a>
                                <a href="#"><i class="ms-2 fa-brands fa-facebook"></i></a>
                                <a href="#"><i class="ms-2 fa-brands fa-instagram"></i></a>
                            </div>
                        </div>

                        <div class="col-3 pt-5 mt-5">
                            <h5>COMPANY</h5>
                            <a href="#" class="text-decoration-none" style="color: rgb(113, 112, 112);"><p>About</p></a>
                            <a href="#" class="text-decoration-none" style="color: rgb(113, 112, 112);"><p>Features</p></a>
                            <a href="#" class="text-decoration-none" style="color: rgb(113, 112, 112);"><p>Works</p></a>
                            <a href="#" class="text-decoration-none" style="color: rgb(113, 112, 112);"><p>Career</p></a>
                        </div>
                        <div class="col-3 pt-5 mt-5">
                            <h5>HELP</h5>
                            <a href="#" class="text-decoration-none" style="color: rgb(113, 112, 112);"><p>Customers Support</p></a>
                            <a href="#" class="text-decoration-none" style="color: rgb(113, 112, 112);"><p>Delivery Details</p></a>
                            <a href="#" class="text-decoration-none" style="color: rgb(113, 112, 112);"><p>Terms & Conditions</p></a>
                            <a href="#" class="text-decoration-none" style="color: rgb(113, 112, 112);"><p>Privacy Poicy</p></a>
                        </div>
                        <div class="col-3 pt-5 mt-5">
                            <h5>FAQ</h5>
                            <a href="#" class="text-decoration-none" style="color: rgb(113, 112, 112);"><p>Acount</p></a>
                            <a href="#" class="text-decoration-none" style="color: rgb(113, 112, 112);"><p>Mange Deliveries</p></a>
                            <a href="#" class="text-decoration-none" style="color: rgb(113, 112, 112);"><p>Orders</p></a>
                            <a href="#" class="text-decoration-none" style="color: rgb(113, 112, 112);"><p>Payments</p></a>
                        </div>
                    </div>


                    

                    <div class="mt-3 p-4">
                        <hr>
                        <div class="d-flex justify-content-between">
                            <div>
                                <p>Shop.Co &copy; 2000-2025. All Rights Reserved</p>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                        
                    </div>

                    
                </footer>
        


        `;

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
