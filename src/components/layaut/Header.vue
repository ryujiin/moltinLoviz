<template lang="pug">
header
  v-toolbar(fixed app)
    v-toolbar-side-icon(@click.stop="drawer = !drawer")
    v-toolbar-title Loviz DC
    v-spacer
    v-toolbar-items
      v-btn(icon)
        v-icon search
      v-btn(icon)
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
    ...mapGetters(['getNumProduct'])
  },
  methods: {
    ...mapActions(['pullCart']),
    navegar (link) {
      console.log(link)
      this.$router.push(link)
    }
  },
  mounted () {
    this.pullCart()
  }
}
</script>

<style lang="css" scoped>
</style>
