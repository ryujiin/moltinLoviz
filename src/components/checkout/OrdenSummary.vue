<template lang="pug">
.marco
  v-layout(v-for="item in getItemsCart" :key="item.id" align-center justify-space-between row fill-height v-if="item.type==='cart_item'")
    v-flex(xs4 grow pa-2)
      v-img(:src="item.image.href")
    v-flex(xs6)
      v-badge
        template(v-slot:badge)
          span {{item.quantity}}
        span {{item.name}}
    v-flex(xs2)
      h4.text-xs-right {{item.meta.display_price.without_tax.value.formatted}}
  v-divider
  .seccion
    CodePromo
  v-divider
  OrdenTotal
</template>

<script>
import { mapGetters } from 'vuex'
import CodePromo from '@/components/checkout/CodePromo.vue'
import OrdenTotal from '@/components/shared/OrdenTotal.vue'

export default {
  components: {
    CodePromo, OrdenTotal
  },
  computed: {
    ...mapGetters(['getCart', 'getItemsCart', 'getSubtotal', 'getShip'])
  }
}
</script>

<style>
.seccion{
  padding: 10px 0;
}
</style>
