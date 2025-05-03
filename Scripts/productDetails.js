let productIndex = 105;

async function displayItem(){
    let dataResponse = await fetch('https://dummyjson.com/products?limit=0');
    data = (await dataResponse.json()).products;   
    console.log(data);

    if(data) {
        productsList = data.filter(item => item.images.length >= 3);
    }
    console.log(productsList);



    if(productsList){
        console.log(productsList[productIndex]);
        
        let content = `
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
                    <h4>rating</h4>
                    <div class="d-flex">
                        <h4>${(productsList[productIndex].price)*(1-((productsList[productIndex].discountPercentage)/100))}</h4>
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
                    
                    <div id="cartItems">
                        <div class="row">
                            <div class="col-2"id="controlCart">
                                <button type="button" class="btn float-start" id="less"><b>-</b></button>
                                <span class="ps-2">1</span>
                                <button type="button" class="btn float-end" id="less"><b>+</b></button>
                            </div>
                            <div class="col-1"></div>
                            <div class="col-8" id="addToCart">
                                <a href="#" target="_blank">Add To Cart</a>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <hr>


            <section id="reviews">
                <h3 id="ratingHeadLine">Rating & Reviews</h3>
                
                
        `;
        
        let reviewsList = productsList[productIndex].reviews;
        reviewsList.forEach(review => {
            content += `
                    <div id="review">
                        <div>
                            <h4>${review.rating}</h4>
                            <i class="fa-solid fa-ellipsis float-end"></i>
                        </div>
                        <div class="d-flex">
                            <h4>${review.reviewerName}</h4>
                            <i class="fa-solid fa-circle-check ms-2 mt-2" style="color: #3fa654;"></i>
                        </div>
                        <p>${review.comment}</p>
                        <p class="mt-3">${review.date}</p>
                    </div>
                </section> 
            `;
        });


        document.getElementById("content").innerHTML = content;
    }
    
}

displayItem();


