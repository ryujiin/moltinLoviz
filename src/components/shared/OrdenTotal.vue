<template lang="pug">
.total
  .seccion
    v-layout(wrap)
      v-flex(xs6)
        .subheading Subtotal
      v-flex(xs6)
        h4.text-xs-right {{getSubtotal.formatted}}
      v-flex(xs6)
        .subheading Shipping
      v-flex(xs6)
        h4.text-xs-right {{getShip}}
  v-divider
  .seccion(v-if="cupon")
    v-layout.caption(row align-center justify-space-between fill-height)
      v-flex.text-xs-center(xs9 class="red--text") {{cupon.name}}:
      v-flex.text-xs-right(xs3)
        span(class="green-text") {{getTotal}}
        span.ml-1(class="red--text")  - {{getDescuento}}
  .seccion
    v-layout.headline(row align-center justify-space-between fill-height)
      v-flex(xs6)
        span Total
      v-flex.text-xs-right(xs6)
        span.caption {{getCart.display_price.without_tax.currency}}
        strong {{getCart.display_price.without_tax.formatted}}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getItemsCart', 'getSubtotal', 'getShip', 'getCart', 'getDescuento', 'getTotal']),
    cupon () {
      return this.getItemsCart.find(i => i.type === 'promotion_item')
    }
  }
}
</script>
