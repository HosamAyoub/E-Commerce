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


function passCategory(category){
    let categorizedList = [];
    for (const [key, value] of Object.entries(GeneralCategories)){ 
        if(key === category){
            productsList.forEach(product => {
                value.forEach(val=>{
                    if(product.category === val){
                        categorizedList.push(product);
                    }
                })
            })
        }
    } 
    
    console.log(categorizedList);
    //==> pass categorized to displey function 
}


/********************************* Search ***********************************/

let searchInput = document.getElementById("searchInput") ?? "";
let searchedProductsList = [];


searchInput.addEventListener('input', function(){

    searchText = searchInput.value.toUpperCase();

    if(searchText !== "") {
        console.log(searchText);
        console.log(typeof searchText);
        
        searchedProductsList = productsList.filter(product => 
            product.title.toUpperCase().includes(searchText) ||  
            product.description.toUpperCase().includes(searchText) ||
            product.brand?.toUpperCase().includes(searchText) ||
            product.category.toUpperCase().includes(searchText)
        );
    }else {
        // If no search input, use all products with 3+ images
        searchedProductsList = productsList;
    }

    console.log(searchedProductsList);
    //==> pass searchedProductsList to displey function
});





/********************************* Price Filtering ***********************************/

const rangeMin = document.getElementById('rangeMin');
const rangeMax = document.getElementById('rangeMax');
const sliderRange = document.getElementById('slider-range');
const minValDisplay = document.getElementById('minValDisplay');
const maxValDisplay = document.getElementById('maxValDisplay');

let min;
let max;

function updateSlider() {
    min = parseInt(rangeMin.value);
    max = parseInt(rangeMax.value);
    if (min > max) {
      [min, max] = [max, min];
      rangeMin.value = min;
      rangeMax.value = max;
    }

    // const percentMin = (min / 100) * 100;
    // const percentMax = (max / 100) * 100;
    // sliderRange.style.left = percentMin + '%';
    // sliderRange.style.width = (percentMax - percentMin) + '%';

    minValDisplay.value = min;
    maxValDisplay.value = max;


    passMinAndMaxPrices(min,max);
}

rangeMin.addEventListener('input', updateSlider);
rangeMax.addEventListener('input', updateSlider);
window.addEventListener('DOMContentLoaded', updateSlider);




function passMinAndMaxPrices(minPrice,maxPrice){
    let filteredList = [];
    productsList.forEach(product=>{
        if(product.price >= minPrice && product.price <= maxPrice){
            filteredList.push(product)
        }
    })

    console.log(filteredList);
    //==> pass filteredList to display function
}


