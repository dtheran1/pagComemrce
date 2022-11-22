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
          <bagde :product="product"></bagde>
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
          <p class="description__price" :style="{color: price_color}" >
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
          <button :disabled="product.stock === 0" @click="sendToCart()">
            Agregar al carrito
          </button>
        </section>
    `,
  props: ['product'],
  emits: ['sendtocart'],
  setup(props, { emit }) {
    const productState = reactive({
      activeImage: 0,
      price_color: 'rgb(104,104,209)'
    });

    const sendToCart = () => {
      emit('sendtocart', props.product)
    }

    const discountCodes = ref(['PLATZI20', 'DANIELCODE']);
    function applyDiscount(event) {
      const discountCodeIndex = discountCodes.value.indexOf(
        event.target.value
      );
      if (discountCodeIndex >= 0) {
        props.product.price *= 50 / 100;
        discountCodes.value.splice(discountCodeIndex, 1);
      }
    }

    watch(() => props.product.stock, (stock) => {//Vue espera una propiedad reactiva no una referencia como este caso, por eso como primer parametro pasamos una function anonima que nos devuelva la propiedad que queremos observar en el objeto reactive,
      if (stock <= 1) {
        productState.price_color = 'rgb(188, 30, 67)'
      }
    });


    return {
      ...toRefs(productState),
      applyDiscount,
      sendToCart

    }
  }
})