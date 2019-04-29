<template lang="pug">
.cartPage
  v-container(v-if="getItemsCart.length !== 0")
    v-layout(align-center)
      v-flex()
        h1(class="headline text-xs-center") Cart
    v-layout.mb-4(v-for="item in getItemsCart" :key="item.id" align-center justify-space-between row fill-height v-if="item.type==='cart_item'")
      v-flex(xs9)
        v-layout(align-center justify-start row fill-height)
          v-flex(xs5)
            v-img(:src="item.image.href")
          v-flex(xs7)
            v-container
              h5 {{item.name}}
              strong {{item.meta.display_price.without_tax.value.formatted}}
      v-flex(xs3 class="text-xs-center")
        v-layout(justify-center)
          v-btn(flat icon color="red lighten-2" small
                @click="cambio({id: item.id, cantidad: item.quantity - 1})" :loading="btn_change === item.id")
            v-icon remove
          v-btn(flat icon color="red lighten-2" disabled small) {{item.quantity}}
          v-btn(flat icon color="green lighten-2" small
                @click="cambio({id: item.id, cantidad: item.quantity + 1})" :loading="btn_change === item.id")
            v-icon add
        v-btn(small flat color="primary" @click="remove(item.id)" :loading="btn_remove === item.id") remove
    v-layout(align-space-around justify-start column fill-height)
      v-flex
        v-card(color="#eee")
          v-container
            v-layout(align-space-around justify-start column fill-height)
              h3.headline.text-xs-center ORDER SUMMARY
            OrdenTotal
      v-btn(large block color="deep-orange" class="white--text" to="/checkout") Go to Checkout
      v-btn(large block color="light-blue accent-2" class="white--text") Continue Shopping
  v-container(v-else)
    v-layout(align-center justify-center column fill-height)
      h1(class="headline text-xs-center") Cart
      h2 Your cart is empty, let's go shopping!
      v-btn(large color="deep-orange" class="white--text") Keep Shopping
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OrdenTotal from '@/components/shared/OrdenTotal.vue'

export default {
  components: {
    OrdenTotal
  },
  data () {
    return {
      btn_remove: '',
      btn_change: ''
    }
  },
  computed: {
    ...mapGetters(['getItemsCart', 'getSubtotal', 'getCart', 'getShip', 'getFreeShip', 'getMetodos', 'getDescuento'])
  },
  methods: {
    ...mapActions(['deleteItemCart', 'changeItemCart', 'pushProductCustom']),
    remove (id) {
      this.btn_remove = id
      this.deleteItemCart(id).then(res => {
        this.btn_remove = ''
      })
    },
    cambio (data) {
      this.btn_change = data.id
      this.changeItemCart(data).then(res => {
        this.btn_change = ''
      })
    },
    verificarShip () {
      // Funcion se va encargar de verificar el monto total y si tiene envio gratis o no
      if (this.getSubtotal.value < this.getFreeShip) {
        if (!this.getItemsCart.find(i => i.type === 'custom_item')) {
          this.pushProductCustom(this.getMetodos.find(i => i.sku === 'stand-ship'))
        }
      } else {
        // Tiene un carro con mayor monto que el necesario para el freeShip
        if (this.getItemsCart.find(i => i.type === 'custom_item')) {
          this.deleteItemCart(this.getItemsCart.find(i => i.type === 'custom_item').id)
        }
      }
    }
  },
  watch: {
    'getSubtotal.value': 'verificarShip'
  }
}
</script>
