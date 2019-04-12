<template lang="pug">
.cartPage
  v-container(v-if="getItemsCart.length !== 0")
    v-layout(align-center)
      v-flex()
        h1(class="headline text-xs-center") Cart
    v-layout(v-for="item in getItemsCart" :key="item.id" v-if="item.type !== 'custom_item'" align-center justify-space-between row fill-height)
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
        v-card(color="grey lighten-2")
          v-container
            v-layout(align-space-around justify-start column fill-height)
              h3.headline.text-xs-center ORDER SUMMARY
            v-layout(align-center justify-space-between row fill-height)
              strong Subtotal
              .price {{getSubtotal.formatted}}
            v-layout(align-center justify-space-between row fill-height)
              span EST. Shipping*
              .price() {{getShip}}
            v-divider
            v-layout(align-center justify-space-between row fill-height)
              strong ORDER TOTAL
              .price {{getCart.display_price.without_tax.formatted}}
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

export default {
  data () {
    return {
      btn_remove: '',
      btn_change: ''
    }
  },
  computed: {
    ...mapGetters(['getItemsCart', 'getSubtotal', 'getCart', 'getShip'])
  },
  methods: {
    ...mapActions(['deleteItemCart', 'changeItemCart']),
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
    }
  }
}
</script>
