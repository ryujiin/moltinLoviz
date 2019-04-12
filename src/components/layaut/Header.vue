<template lang="pug">
header
  v-toolbar(fixed app)
    v-toolbar-side-icon(@click.stop="drawer = !drawer")
    v-toolbar-title Loviz DC
    v-spacer
    v-toolbar-items
      v-btn(icon)
        v-icon search
      v-btn(icon to="/cart")
        v-badge()
          template(v-slot:badge)
            span {{getNumProduct}}
          v-icon shopping_cart
  v-navigation-drawer(absolute, temporary, v-model="drawer" app)
    v-list
      v-list-tile(v-for="item in items" :key="item.title" @click="navegar(item.link)")
        v-list-tile-action
          v-icon {{ item.icon }}
        v-list-tile-content
          v-list-tile-title  {{ item.title }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'home', link: '/' },
        { title: 'Shop', link: '/collection/all' },
        { title: 'Custom', link: 'custom' }
      ]
    }
  },
  computed: {
    ...mapGetters(['getNumProduct', 'getSubtotal', 'getFreeShip', 'getShipStandard', 'getItemsCart'])
  },
  methods: {
    ...mapActions(['pullCart', 'pushProductCustom', 'deleteItemCart']),
    navegar (link) {
      this.$router.push(link)
    },
    verificarShip () {
      // Verifica la cantidad
      if (this.getSubtotal.value < this.getFreeShip) {
        if (!this.getItemsCart.find(i => i.type === 'custom_item')) {
          this.pushProductCustom(this.getShipStandard)
        }
      } else {
        // Tiene un carro con mayor monto que el necesario para el freeShip
        if (this.getItemsCart.find(i => i.type === 'custom_item')) {
          this.deleteItemCart(this.getItemsCart.find(i => i.type === 'custom_item').id)
        }
      }
    }
  },
  mounted () {
    this.pullCart()
  },
  watch: {
    'getSubtotal.value': 'verificarShip'
  }
}
</script>

<style lang="css" scoped>
</style>
