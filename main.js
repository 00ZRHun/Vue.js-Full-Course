// Create a new component for product-details with a prop of details.

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
})

// 2 arguement in the Vue component
    // FIRST => component name : product
    // SECOND => options object
Vue.component('product', {
    // custom attribute
    props: {
        // built-in props validation
        premium: {
            type: Boolean,
            required: true
        },
        detail: {
            type: String,
            // required
            default: 'Product decription is not mentioned yet.'
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <!-- "image" similar {{ image }} -->
                <!-- <img v-bind:src="image" v-bind:alt="altText"> -->
                <img :src="image" :alt="altText" />
            </div>
            
            <div class="product-info">
                <!-- <h1>Product goes here</h1> -->
                <!-- These double curly bracket called an Expression -->
                    <!-- Used to produce / evaluate a value -->

                <!-- <h1>{{ brand }} {{ product }}</h1> -->
                <h1>{{ title }}</h1>
                <h6>{{ description }}</h6>
                <p v-if="inStock">In Stock</p>
                <p v-else class="outOfStock">Out of Stock</p>
                <!-- <p>User is premium: {{ premium }}</p> -->
                <p>Shipping: {{ shipping }}</p>

                <h6>{{ detail }}</h6>
                <p>{{ sale }}</p>
                <!-- <p v-if='inventory > 10'>In Stock</p>
                <p v-else-if='inventory <= 10 && inventory > 0'>Almost sold out</p>
                <p v-else>Out of Stock</p> -->
                <!-- <p v-show="inStock">In Stock</p> -->
                <!-- <p style=" text-decoration:line-through ">Out of Stock</p> -->
                
                <!-- <p :style="{ textDecoration:inStock? '':'line-through' }">Out of Stock</p> -->
                <!-- <p :style="{ color:inStock? 'red':'' }">Out of Stock</p> -->
            

                <span v-if="onSale">On Sale!</span>
                <!-- <a :href="link" target="_blank">More products like this</a> -->

                <!-- <ul> -->
                    <!-- detail is a nickname / alias for details array -->
                    <!-- <li v-for="detail in details">{{ detail }}</li> -->
                    <!-- <br>
                    <li v-for="size in sizes">{{ size }}</li> -->
                <!-- </ul> -->
                <product-details :details="details"></product-details>

                <ul>
                    <li v-for="size in sizes">{{ size }}</li>
                </ul>

                <!-- style att: 1) camelCase:value; , 2)'kebab-case':value; -->
                <!-- :style="{ 'background-color':variant.variantColor, color:color, 'font-size':fontSize }" -->
                <!-- :style="[styleObject1, styleObject2]" -->
                <!-- <div v-for="variant in variants"  -->
                <div v-for="(variant, index) in variants" 
                    :key="variant.variantID"
                    class="color-box"                    
                    :style="{ 'background-color':variant.variantColor }"
                    @mouseover="updateProduct(index)"
                >
                    <!-- <p v-on:mouseover="updateProduct(variant.variantImage)">{{ variant.variantColor }}</p> -->
                        <!-- v-on:mouseover == @mouseover -->
                    <!-- <p @mouseover="updateProduct(variant.variantImage)">{{ variant.variantColor }}</p> -->
                </div>
                
                <!-- <button v-on:click="cart += 1">Add to Cart</button> -->
                <!-- addToCart == addToCart() -->
                <button v-on:click="addToCart" 
                :disabled="!inStock"
                :class="{ disabledButton:!inStock }"
                    >
                    Add to Cart
                </button>
                <!-- <button v-show="cart>0" @click="removeFromCart">Remove from Cart</button> -->
                <button @click="removeFromCart">Remove from Cart</button>
                <button v-on:click="cart + 0">Reset Cart</button>
            </div>
        </div>
    `,
    // property for data
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            description: 'A pair of warm fuzzy socks',
            // image: './assets/vmSocks-green.jpg',
            selectedVariant: 0,
            altText: 'A pair of socks',
            link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
            // inStock: false,
            inventory: 100,
            onSale: true,
            details: ["80% cotton", "20% polyster", "Gender-neutral"],
            variants: [
                {
                    variantID: 2234,
                    variantColor: "green",
                    variantImage: "./assets/vmSocks-green.jpg",
                    variantQuantity: 10,
                },
                {
                    variantID: 2235,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue.jpg",
                    variantQuantity: 1000,
                },
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            styleObject1: {
                    color: "red",
                    fontSize: '20px',
            },
            styleObject2: {
                    backgroundColor: 'black'
            },
        }
    },
    // methods property
    methods: {
        // anonymous function
        addToCart: function () {
            // this.cart += 1
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantID)
        },
        // updateProduct: function (variantImage) {
            // ES6 shorthand
        // updateProduct(variantImage) {
        updateProduct(index) {
            // this.image = variantImage;
            this.selectedVariant = index
            console.log(index)
        },
        removeFromCart() {
            // if (this.cart > 0)      this.cart -= 1;reduceCart
            // this.$emit('remove-from-cart')
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantID)

        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            // return this.brand + " " + this.product;
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            // console.log(this.variants[this.selectedVariant].variantQuantity);
            return this.variants[this.selectedVariant].variantQuantity;
        },
        // inStock() {
        //     console.log(this.brand + " " + this.product);
        // },
// ??????????????????????????????????????????????????????????????????????????????????????????????????????????????
        sale() {
            // console.log(this.brand + ' ' + this.product + this.onSale?'are':'are not ' + 
            // 'on sale');
            if (this.onSale)        
                return this.brand + ' ' + this.product + ' are on sale';
            return this.brand + ' ' + this.product + ' are not on sale';
        },
// ??????????????????????????????????????????????????????????????????????????????????????????????????????????????        
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    },
})


// var product = 'Socks';

// Vue instance
var app = new Vue({
    el: '#app',
    // downward data sharing
    data: {
        premium: false,
        detail: "This is a product details.",
        // cart: 0,
        cart: [],
    },
    methods: {
        // updateCart() {
        updateCart(id) {
            // this.cart += 1
            this.cart.push(id)
        },
            // for single data
        // removeItem() {
        //     // if (this.cart > 0)      this.cart -= 1;
        //     // if (this.cart > 0)      this.cart.push();
        //     this.cart.pop()
        // },
            // for multiple data
        removeItem(id) {
            for(var i=this.cart.length-1; i>=0; i--){
                if(this.cart[i]===id){
                    this.cart.splice(i, 1);
                    console.log(i)
                    return
                }
                // return
            }
            // this.cart.pop();
            // this.cart.push(id)
        },
    }
});