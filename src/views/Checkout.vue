<template lang="pug">
.checkout
  button(class="order-summary-toggle" @click="show = !show")
    span.wrap
      v-layout(align-center justify-space-between row fill-height)
        v-flex
          v-icon(color="blue lighten-2") shopping_basket
          span(class="info--text") Show order summary
          v-btn(icon)
            v-icon(color="blue lighten-2") {{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
        v-flex
          .title(class="text-xs-right") {{getCart.display_price.without_tax.formatted}}
  v-slide-y-transition
    v-card(v-show="show")
      .wrap
        v-layout(v-for="item in getItemsCart" :key="item.id" align-center justify-space-between row fill-height)
          v-flex(xs2 grow pa-2)
            v-img(:src="item.image.href")
          v-flex(xs8)
            v-badge
              template(v-slot:badge)
                span {{item.quantity}}
              span {{item.name}}
          v-flex(xs2)
            h4.text-xs-right {{item.meta.display_price.without_tax.value.formatted}}
        v-divider
        v-layout
          span Have a promo code?
        v-layout(align-center row fill-height)
          v-flex(xs10)
            v-text-field(label="Gift card or discount code")
          v-flex(xs2)
            v-btn(disabled) Apply
        v-divider
        v-layout(row align-center justify-space-between fill-height)
          v-flex(xs9)
            span Subtotal
          v-flex(xs3)
            h4.text-xs-right {{getSubtotal.formatted}}
        v-layout(row align-center justify-space-between fill-height)
          v-flex(xs9)
            span Shipping
          v-flex(xs3)
            h4.text-xs-right {{getShip}}
        v-divider
        v-layout(row align-center justify-space-between fill-height)
          v-flex(xs9)
            span Total
          v-flex.text-xs-right(xs3)
            span {{getCart.display_price.without_tax.currency}}
            strong {{getCart.display_price.without_tax.formatted}}
  .wrap
    .step
      v-layout
        .headline Contact information
        .help
          | Already have an account?
          v-btn(small) Log in
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters(['getCart', 'getItemsCart', 'getSubtotal', 'getShip'])
  }
}
</script>

<style lang="css" scoped>
.order-summary-toggle{
  background: #fafafa;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  padding: 2px 0;
  flex-shrink: 0;
  text-align: left;
  width: 100%;
}
.wrap {
  display: block;
  margin: 0 auto;
  max-width: 40em;
  zoom: 1;
}
</style>
