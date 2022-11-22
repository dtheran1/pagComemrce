app.component('product', {
    template: /* vue-html */ `
        <section class="product">
          <div class="product__thumbnails">
            <div
              v-for="(image, index) in product.images"
              :key="image"
              class="thumb"
              :class="{ active: activeImage === index }"
              :style="{ backgroundImage: 'url(' + product.images[index].thumbnail + ')' }"
              @click="activeImage = index"
            ></div>
          </div>
          <div class="product__image">
            <img :src="product.images[activeImage].image" :alt="product.name" />
          </div>
        </section>
        <section class="description">
          <h4>
            {{ product.name.toUpperCase() }} {{ product.stock === 0 ? '🤔' :
            '😎' }}
          </h4>
          <span class="badge new" v-if="product.new">Nuevo</span>
          <span class="badge offer" v-if="product.offer">Oferta</span>
          <p class="description__status" v-if="product.stock > 3">
            Quedan {{ product.stock }} unidades disponibles! 🔥
          </p>
          <p class="description__status" v-else-if="product.stock === 3">
            Quedan pocas unidades
          </p>
          <p class="description__status" v-else-if="product.stock === 2">
            Esta apunto de agotarse! 👀
          </p>
          <p class="description__status" v-else-if="product.stock === 1">
            Ultima unidad disponible
          </p>
          <p class="description__status" v-else-if="product.stock === 0">
            Producto Agotado! 😪
          </p>
          <p class="description__price">
            $ {{ new Intl.NumberFormat('es-CO').format(product.price) }}
          </p>
          <p class="description__content"></p>
          <div class="discount">
            <span>Codigo de Descuento:</span>
            <input
              type="text"
              placeholder="Ingresa tu codigo"
              @keyup.enter="applyDiscount($event)"
            />
          </div>
          <button :disabled="product.stock === 0" @click="addToCart()">
            Agregar al carrito
          </button>
        </section>
    `,
    data() {
        return {
            product: {
                name: 'Camara',
                price: 450_000,
                stock: 5,
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
                        atque dolorum corporis, reiciendis eaque temporibus quod magnam amet
                        ea natus delectus? Aut placeat ipsam minus labore voluptas. Porro,
                        vel aliquid!`,
                images: [
                    {
                        image:
                            'https://static.platzi.com/media/tmp/class-files/github/platzi-vuejs/platzi-vuejs-vuejs-02-2/options/images/camara.jpg',
                        thumbnail:
                            'https://static.platzi.com/media/tmp/class-files/github/platzi-vuejs/platzi-vuejs-vuejs-02-2/options/images/camara-thumb.jpg',
                    },
                    {
                        image:
                            'https://static.platzi.com/media/tmp/class-files/github/platzi-vuejs/platzi-vuejs-vuejs-02-2/options/images/camara-2.jpg',
                        thumbnail:
                            'https://static.platzi.com/media/tmp/class-files/github/platzi-vuejs/platzi-vuejs-vuejs-02-2/options/images/camara-2-thumb.jpg',
                    },
                ],
                new: false,
                offer: true,
                quantity: 1,
            },
            activeImage: 0,
            discountCodes: ['PLATZI20', 'DANIELCODE'],

        }
    },
    methods: {
        applyDiscount(event) {
            const discountCodeIndex = this.discountCodes.indexOf(event.target.value);

            if (discountCodeIndex >= 0) {
                this.product.price *= 50 / 100;
                this.discountCodes.splice(discountCodeIndex, 1);
            }
        },

        addToCart() {
            const prodIndex = this.cart.findIndex(
                (prod) => prod.name === this.product.name
            );
            if (prodIndex >= 0) {
                this.cart[prodIndex].quantity += 1;
            } else {
                this.cart.push(this.product);
            }
            this.product.stock -= 1;
        },
    },
})