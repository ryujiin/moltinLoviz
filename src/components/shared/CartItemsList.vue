<template lang="pug">
v-layout(v-for="item in getItemsCart" :key="item.id" align-center justify-space-between row fill-height v-if="item.type==='cart_item'")
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getItemsCart'])
  }
}
</script>
