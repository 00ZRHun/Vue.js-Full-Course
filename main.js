// global channel
var eventBus = new Vue();

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

                <product-tabs :reviews="reviews"></product-tabs>
            </div>
            
            <div class="product-info">
            
            <!-- <h1>Product goes here</h1> -->
            <!-- These double curly bracket called an Expression -->
            <!-- Used to produce / evaluate a value -->
            
            <!-- <h1>{{ brand }} {{ product }}</h1> -->
            <h1>{{ title }}</h1>
            <h6>{{ description }}</h6>

            <!-- <info-tabs :shipping="shipping" 
                       :inStock="inStock" 
                       :inventory="inventory" 
                       :outOfStock="outOfStock" 
                       :premium="premium" 
                       :onSale="onSale" 
                       :detail="detail" 
                       :size="size"
            > -->
            <info-tabs :shipping="shipping"
                       :inStock="inStock" 
                       :detail="detail" 
                       :description="description" 
                       :sale="sale" 
                       :onSale="onSale" 
                       :details="details" 
                       :sizes="sizes"
            >
            </info-tabs>

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
                <button v-on:click="this.cart=[]">Reset Cart</button>        
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
            reviews: [],
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
        /* addReview(productReview) {
            this.reviews.push(productReview)
        }, */
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
    // lifecycle hook( the place to put code which want to run )
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})


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


Vue.component('product-review', {
    template: `
    <!-- @submit.prevent => prevent page from reloading( the default behaviour ) -->
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="this.errors.length">
            <b>Please correct the following error(s):</b>
            <ul v-for="error in errors">
                <li>{{ error }}</li>
            </ul>
        </p>

        <p>
            <label for="name">Name</label>
            <input id="name" v-model="name">
        </p>

        <p>
            <label for="review">Review</label>
            <!-- <textarea id="review" v-model="review" required></textarea> -->
            <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
            <label for="rating">Rating</label>
            <!-- v-model.number => number modifier -->
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>

        <p>
            <label for="recommend">Would you recommend this product?</label>
            <input type="radio" name="yes" id="yes" value="recommend" v-model="recommend">
            <label for="yes">Yes</label>
            <input type="radio" name="no" id="no" value="not recommend" v-model="recommend">
            <label for="no">No</label>
        </p>

        <p>
            <input type="submit" value="Submit">
        </p>
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: [],
        }
    },
    methods: {
        onSubmit() {
            this.errors = []
            // array( use '=' )
                // '=' is an assignment( for var, arr )
            /* let productReview = [
                name = this.name,
                review = this.review,
                rating = this.rating
            ] */
            // object( use ':' )
            // forms validation
            if( this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }

                // this.$emit('review-submitted', productReview)
                eventBus.$emit('review-submitted', productReview)

                
// ???? Assignment( = ) ?????
                name = null
                review = null
                rating = null
                recommend = null
            }
            else {                
                if(!this.name)   this.errors.push('Name required! ')
                if(!this.review)   this.errors.push('Review required! ')
                if(!this.rating)   this.errors.push('Rating required! ')
                if(!this.recommend)   this.errors.push('Recommend required! ')

                // alert(this.error)
                // this.error.length = 0
            }
        }
    }
})


Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <span class="tab"
                  :class="{ activeTab : selectedTab===tab }"
                  v-for="(tab, index) in tabs"
                  :key="index"
                  @click="selectedTab = tab">
                {{ tab }}
            </span>

            <div v-show="selectedTab === 'Review'">
                <h2>Reviews</h2>
                <!-- <p v-if="reviews.length==0">There are no review yet.</p> -->
                <p v-if="!reviews.length">There are no review yet.</p>
                <!-- <p v-else> -->
                    <ul v-else v-for="review in reviews">
                        <!-- <li>Name : {{ review[0] }}</li>
                        <li>Review : {{ review[1] }}</li>
                        <li>Rating : {{ review[2] }}</li> -->
                        <li>Name : {{ review.name }}</li>
                        <li>Review : {{ review.review }}</li>
                        <li>Rating : {{ review.rating }}</li>
                        <li>Recommend : {{ review.recommend }}</li>
                        <br/>
                    </ul>
                    
                <!-- </p> -->
            </div>

            <!-- <product-review v-show="selectedTab === 'Make a Review'"
                            @review-submitted="addReview"></product-review> -->
            <product-review v-show="selectedTab === 'Make a Review'"></product-review>
        </div>
    `,
    data() {
        return {
            tabs: ['Review', 'Make a Review'],
            selectedTab: 'Review',
        }
    }
})


Vue.component('info-tabs', {
    props: {
    /* [
        shipping, inStock, inventory, outOfStock, premium, onSale, detail, size
    ] */
        shipping: {
            required : true
        },
        inStock: {
            type: Number,
            required : true
        },
        detail: {
            type: String,
            required : true
        },
        description: {
            type: String,
            required : true
        },
        sale: {
            type: String,
            required : true
        },
        details: {
            type: Array,
            required : true
        },
        // inventory: {
        //     type: Number,
        //     required : true
        // },
       
        // premium: {
        //     type: Boolean,
        //     required : true
        // },
        onSale: {
            type: Boolean,
            required : true
        },
        sizes: {
            type: Array,
            required : true
        },
    },  
    template: `
        <div>
            <span class="tab"
                  :class="{activeTab : tab===selectedTab}"      
                  v-for="(tab, index) in tabs"
                  :key=index
                  @click="selectedTab = tab"
            >
                  {{ tab }}
            </span>
            
            <p v-show="selectedTab==='Shipping'">Shipping: {{ shipping }}</p>

            <div v-show="selectedTab==='Details'">
                <p v-if="inStock">In Stock</p>
                <p v-else class="outOfStock">Out of Stock</p>
                <!-- <p>User is premium: {{ premium }}</p> -->
                
                <!-- <h6>{{ detail }}</h6> -->
                <h6>{{ description }}</h6>
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
            </div>
        </div>    
    `,
    data() {
        return {
            tabs: ['Shipping', 'Details'],
            selectedTab: 'Shipping'
        }

    }
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