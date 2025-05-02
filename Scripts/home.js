fetch("https://dummyjson.com/products?limit=0&select=images&select=category")
    .then((res) => res.json())
    .then((data) => {
        let categories = [];
        const filteredProducts = data.products.filter((product) => product.images.length > 2);
        for (const obj of filteredProducts) {
            if (!categories.includes(obj["category"])) categories.push(obj["category"]);
        }
        console.log("Categories with more than one image", categories);
        categories = categories.sort();
        console.log("Categories with more than one image", categories);
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
