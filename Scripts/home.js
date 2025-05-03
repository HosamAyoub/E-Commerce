fetch("https://dummyjson.com/products?limit=0&select=id,title,price,rating,images,thumbnail")
  .then((res) => res.json())
  .then((data) => {
    const filteredProducts = data.products.filter((product) => product.images.length > 2);
    const cards = document.getElementById("cards");
    for (const element of filteredProducts) {
      cards.innerHTML += `<div class="col-lg-3 col-md-4 col-sm-12 card border-0" style="width: 18rem">
              <a href="#"><img src="${element.thumbnail}" class="card-img-top" alt="${element.title}" /></a>
              <div class="card-body text-start">
                <a href=""><h5 class="card-title">${element.title}</h5></a>
                <div data-coreui-read-only="true" data-coreui-toggle="rating" data-coreui-value="3"></div>
                <div class="starsContainer">
                  <i class="starss fa-solid fa-star"></i>
                  <i class="starss fa-solid fa-star"></i>
                  <i class="starss fa-solid fa-star"></i>
                  <i class="starss fa-solid fa-star"></i>
                  <i class="fa-solid fa-star-half"></i>
                  <span class="ms-2">4.5/</span><span class="totalRate">5</span>
                </div>
                <div class="cardFooter mx-0 px-0 border-0 outline-0 d-flex justify-content-between align-items-center">
                  <p>${element.price}$</p>
                  <a href="#" class="btn"><i class="fa-solid fa-cart-shopping fa-lg"></i></a>
                </div>
              </div>
            </div>`;
    }
  });
const x = [];

const GeneralCategories = {
  accessories: ["sports-accessories", "sunglasses"],
  care: ["fragrances", "skin-care"],
  electronics: ["laptops", "mobile-accessories", "smartphones", "tablets"],
  furniture: ["furniture", "home-decoration", "kitchen-accessories"],
  groceries: ["groceries"],
  mens: ["mens-shirts", "mens-shoes", "mens-watches"],
  vehicles: ["motorcycle", "vehicle"],
  women: ["tops", "womens-bags", "womens-dresses", "womens-jewellery", "womens-shoes", "womens-watches"],
};
