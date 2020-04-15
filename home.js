// var product = 'Socks';

// Vue instance
var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        description: 'A pair of warm fuzzy socks',
        image: './assets/vmSocks-green.jpg',
        altText: 'A pair of socks',
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        inStock: true,
        inventory: 100,
        onSale: false,
        details: ["80% cotton", "20% polyster", "Gender-nuetral"],
        variants: [
            {
                variantID: 2234,
                variantColor: "green",
                variantImage: "./assets/vmSocks-green.jpg",
            },
            {
                variantID: 2235,
                variantColor: "blue",
                variantImage: "./assets/vmSocks-blue.jpg",
            },
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0,
    },
    methods: {
        addToCart: function () {
            this.cart += 1;
        },
        // updateProduct: function (variantImage) {
            // ES6 shorthand
        updateProduct(variantImage) {
            this.image = variantImage;
        },
        minusToCart() {
            this.cart -= 1;
        },
    },
    
})